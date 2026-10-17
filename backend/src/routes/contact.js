import { Router } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { nombre: 100, apellido: 100, telefono: 30, email: 254, mensaje: 2000 };

export function validateContact(body) {
  const data = {};
  const errors = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = body?.[field];
    if (value !== undefined && value !== null && typeof value !== 'string') {
      errors[field] = 'Debe ser texto';
      continue;
    }
    data[field] = (value ?? '').trim();
    if (data[field].length > max) {
      errors[field] = `Maximo ${max} caracteres`;
    }
  }
  if (!errors.email) {
    if (!data.email) errors.email = 'El email es obligatorio';
    else if (!EMAIL_RE.test(data.email)) errors.email = 'Email invalido';
  }
  if (data.telefono && !/^[+\d\s()-]*$/.test(data.telefono)) {
    errors.telefono = 'Telefono invalido';
  }
  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function createContactRouter({ messagesFile }) {
  const router = Router();
  let queue = Promise.resolve();

  async function append(entry) {
    let list = [];
    try {
      list = JSON.parse(await fs.readFile(messagesFile, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    list.push(entry);
    await fs.mkdir(path.dirname(messagesFile), { recursive: true });
    await fs.writeFile(messagesFile, JSON.stringify(list, null, 2));
  }

  router.post('/contact', async (req, res, next) => {
    const { data, errors, valid } = validateContact(req.body);
    if (!valid) {
      return res.status(400).json({ error: 'Datos invalidos', fields: errors });
    }
    const entry = { id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() };
    // Serializa escrituras para no perder mensajes concurrentes.
    queue = queue.then(() => append(entry));
    try {
      await queue;
      res.status(201).json({ ok: true, id: entry.id, message: '¡Gracias por tu mensaje!' });
    } catch (err) {
      queue = Promise.resolve();
      next(err);
    }
  });

  return router;
}
