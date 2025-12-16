import React, { useEffect, useRef } from 'react';
import { send } from '@emailjs/browser';

type Props = {
  name1: string;
  name2: string;
  result: { status: string; percentage: number };
};

// This component is intentionally silent (no UI). It will send the email
// automatically once when mounted with the provided props. It also sends
// multiple parameter keys so common template variable names will be populated.
export default function EmailSender({ name1, name2, result }: Props) {
  const sentRef = useRef(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

  const canSend = Boolean(serviceId && templateId && publicKey);

  useEffect(() => {
    // Send only once per mount
    if (sentRef.current) return;
    sentRef.current = true;

    // Don't send if EmailJS isn't configured
    if (!canSend) {
      console.warn('EmailJS configuration missing. Skipping send.');
      return;
    }

    // Also avoid sending empty mails if names are missing. This can happen
    // during HMR reloads or accidental mounts — require both names to be set.
    if (!name1 || !name2 || !name1.trim() || !name2.trim()) {
      console.warn('EmailSender: names are empty; skipping send to avoid empty emails.');
      return;
    }

    const templateParams: Record<string, string> = {
      // multiple variants to match different template variable names
      name_1: name1,
      name1: name1,
      name_2: name2,
      name2: name2,
      status: result.status,
      result: result.status,
      percentage: String(result.percentage),
      percent: String(result.percentage),
      message: `${name1} & ${name2} → ${result.status} (${result.percentage}%)`,
      combined: `${name1} & ${name2}`,
    };

    // Debug: print the params we will send so you can verify they contain
    // the names and computed result in the browser console.
    // Using console.log instead of console.debug so it shows by default.
    console.log('EmailSender: templateParams =>', templateParams);

    // Fire-and-forget; per request we won't show success/failure UI.
    send(serviceId, templateId, templateParams, publicKey).catch((err) => {
      // keep an unobtrusive console trace for developer debugging
      console.error('Email send error (silent):', err);
    });
  }, [name1, name2, result, canSend, serviceId, templateId, publicKey]);

  return null;
}
