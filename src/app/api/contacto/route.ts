import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'node:dns';
import { z } from 'zod';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

// --- Validación estricta del body ---
const ASUNTOS = [
  'Quiero más información',
  'Petición de oración',
  'Otro',
] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Falta el nombre')
    .max(100),
  email: z
    .string()
    .trim()
    .email('Email inválido')
    .max(200),
  asunto: z.enum(ASUNTOS), // solo acepta las 3 opciones reales del <select>
  notes: z
    .string()
    .trim()
    .min(1, 'Falta el mensaje')
    .max(2000),
});

// --- Rate limiting simple en memoria (por instancia del servidor) ---
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

// --- Evita inyección de headers SMTP (email/asunto viajan en headers) ---
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

// --- Escapa HTML de todo lo que el usuario mandó, antes de meterlo en el body del mail ---
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers
        .get('x-forwarded-for')
        ?.split(',')[0]
        ?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          message:
            'Demasiados envíos, esperá un minuto e intentá de nuevo',
        },
        { status: 429 },
      );
    }

    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: 'Datos inválidos',
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { name, email, asunto, notes } = parsed.data;

    if (
      !process.env.EMAIL_SMTP ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        'Faltan variables de entorno en el servidor.',
      );
      return NextResponse.json(
        {
          message:
            'Error de configuración del servidor',
        },
        { status: 500 },
      );
    }

    const smtpHost = process.env.EMAIL_SMTP; // smtp.hostinger.com

    // Resolvemos IPv4 a mano: nodemailer no tiene una opción "family" real,
    // y si tu red local tiene IPv6 rota (muy común), intenta esa ruta y
    // falla con EHOSTUNREACH como te pasó en la captura.
    let connectHost = smtpHost;
    try {
      const { address } = await dns.promises.lookup(
        smtpHost,
        { family: 4 },
      );
      connectHost = address;
    } catch (dnsError) {
      console.error(
        'No se pudo resolver IPv4 para el host SMTP:',
        dnsError,
      );
    }

    const smtpOptions: SMTPTransport.Options = {
      host: connectHost,
      port: 465, // recomendado por Hostinger: SSL directo, más seguro que STARTTLS en 587
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // email completo: info@bioiglesia.com
        pass: process.env.EMAIL_PASS, // contraseña del BUZÓN, no la de hPanel
      },
      tls: {
        servername: smtpHost, // necesario porque "host" ahora es una IP
        minVersion: 'TLSv1.2',
      },
    };

    const transporter =
      nodemailer.createTransport(smtpOptions);

    const safeEmail = sanitizeHeaderValue(email);
    const safeAsunto = sanitizeHeaderValue(asunto);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@bioiglesia.com',
      replyTo: safeEmail,
      subject: `Nuevo mensaje web: ${safeAsunto}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #c05621;">Nuevo mensaje desde la web de Bioiglesia</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(safeAsunto)}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 8px;">
            <p style="white-space: pre-wrap;">${escapeHtml(notes)}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Correo enviado exitosamente' },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Error al enviar el correo con Nodemailer:',
      error,
    );
    return NextResponse.json(
      {
        message:
          'Error interno del servidor al enviar el correo',
      },
      { status: 500 },
    );
  }
}
