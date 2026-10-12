'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { site, waLink } from '@/lib/site';
import { track } from '@/lib/analytics';

// Values are matched by the homepage occasion cards, which link to /contact/?event=<value>.
const events = [
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Destination wedding', label: 'Destination wedding' },
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Corporate event', label: 'Corporate' },
  { value: 'Baby shower', label: 'Baby shower' },
  { value: 'House warming', label: 'House warming' },
  { value: 'Naming ceremony', label: 'Naming ceremony' },
  { value: 'Other celebration', label: 'Something else' },
];

// No backend needed on a static site: the enquiry is composed into a WhatsApp message to Shreyas.
export default function EnquiryForm({ defaultEvent = 'Wedding' }: { defaultEvent?: string }) {
  const [note, setNote] = useState('');
  const [invalid, setInvalid] = useState<{ name?: boolean; phone?: boolean }>({});
  const [selected, setSelected] = useState(defaultEvent);

  // A "Plan your birthday" card links here with ?event=Birthday; preselect that occasion.
  useEffect(() => {
    const event = new URLSearchParams(window.location.search).get('event');
    if (event && events.some((ev) => ev.value === event)) setSelected(event);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || '').trim();
    const name = get('name');
    const phone = get('phone');

    setInvalid({ name: !name, phone: !phone });
    if (!name || !phone) {
      setNote('Please share your name and phone number so we can reach you.');
      (e.currentTarget.elements.namedItem(name ? 'phone' : 'name') as HTMLInputElement).focus();
      return;
    }

    const event = get('event');
    const date = get('date') ? get('date').split('-').reverse().join('/') : '';
    const lines = [
      `Hello Sehras, I would like to enquire about ${event ? 'a ' + event.toLowerCase() : 'an event'}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      date && `Event date: ${date}`,
      get('city') && `City / destination: ${get('city')}`,
      get('guests') && `Expected guests: ${get('guests')}`,
      get('message') && `Details: ${get('message')}`,
    ].filter(Boolean);

    track('generate_lead', { method: 'whatsapp_form', event_type: event, guests: get('guests') || undefined });
    setNote(`Thank you. WhatsApp is opening so you can send your enquiry to ${site.founder}.`);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    e.currentTarget.reset();
    setSelected(defaultEvent);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <fieldset className="field">
        <legend>What are you celebrating?</legend>
        <div className="chip-group">
          {events.map((ev) => (
            <label key={ev.value} className="chip">
              <input type="radio" name="event" value={ev.value} checked={ev.value === selected} onChange={() => setSelected(ev.value)} />
              <span>{ev.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <div className={`field float${invalid.name ? ' invalid' : ''}`}>
          <input type="text" id="name" name="name" required placeholder=" " autoComplete="name" aria-invalid={!!invalid.name} />
          <label htmlFor="name">Your name</label>
        </div>
        <div className={`field float${invalid.phone ? ' invalid' : ''}`}>
          <input type="tel" id="phone" name="phone" required placeholder=" " autoComplete="tel" inputMode="tel" aria-invalid={!!invalid.phone} />
          <label htmlFor="phone">Phone number</label>
        </div>
      </div>
      <div className="form-row">
        <div className="field float">
          <input type="date" id="date" name="date" className="has-value" />
          <label htmlFor="date">Event date</label>
        </div>
        <div className="field float">
          <input type="text" id="city" name="city" placeholder=" " autoComplete="address-level2" />
          <label htmlFor="city">City / destination</label>
        </div>
      </div>
      <div className="field float">
        <select id="guests" name="guests" className="has-value" defaultValue="">
          <option value="">Select</option>
          <option>Under 50</option>
          <option>50 – 100</option>
          <option>100 – 250</option>
          <option>250 – 500</option>
          <option>500 – 1000</option>
          <option>1000+</option>
        </select>
        <label htmlFor="guests">Expected guests</label>
      </div>
      <div className="field float">
        <textarea id="message" name="message" rows={3} placeholder=" " />
        <label htmlFor="message">Tell us a little about your vision</label>
      </div>
      <button type="submit" className="btn btn-gold btn-wide">
        Send enquiry via WhatsApp <span className="btn-arrow">→</span>
      </button>
      <p className="form-note" role="status" aria-live="polite">{note}</p>
    </form>
  );
}
