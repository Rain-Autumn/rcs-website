'use client';

import { useState } from 'react';
import type { Locale } from '@/content/i18n';
import type { Certification } from '@/types/team';

const labels = {
  fr: { access: 'ACCÈS ÉQUIPE', password: 'Mot de passe équipe', unlock: 'OUVRIR LE FORMULAIRE', denied: 'Mot de passe incorrect.', identity: 'Identité', name: 'Nom public', type: 'Type de rôle', roles: 'Rôles localisés', bios: 'Présentations localisées', specialties: 'Domaines, séparés par des virgules', certifications: 'Certifications', provider: 'Organisme', certTitle: 'Intitulé', issued: 'Date d’émission', credentialId: 'Identifiant (facultatif)', credentialUrl: 'Lien de vérification (facultatif)', addCert: 'AJOUTER UNE CERTIFICATION', remove: 'RETIRER', submit: 'AJOUTER LE MEMBRE', sending: 'AJOUT…', success: 'Membre ajouté sous la référence', error: 'L’ajout a échoué. Vérifie les champs.' },
  en: { access: 'TEAM ACCESS', password: 'Team password', unlock: 'OPEN FORM', denied: 'Incorrect password.', identity: 'Identity', name: 'Public name', type: 'Role type', roles: 'Localised roles', bios: 'Localised profiles', specialties: 'Fields, separated by commas', certifications: 'Certifications', provider: 'Provider', certTitle: 'Title', issued: 'Issue date', credentialId: 'Credential ID (optional)', credentialUrl: 'Verification link (optional)', addCert: 'ADD CERTIFICATION', remove: 'REMOVE', submit: 'ADD MEMBER', sending: 'ADDING…', success: 'Member added under reference', error: 'Unable to add member. Check the fields.' },
  nl: { access: 'TEAMTOEGANG', password: 'Teamwachtwoord', unlock: 'FORMULIER OPENEN', denied: 'Onjuist wachtwoord.', identity: 'Identiteit', name: 'Publieke naam', type: 'Roltype', roles: 'Gelokaliseerde rollen', bios: 'Gelokaliseerde profielen', specialties: 'Domeinen, gescheiden door komma’s', certifications: 'Certificeringen', provider: 'Organisatie', certTitle: 'Titel', issued: 'Uitgiftedatum', credentialId: 'Referentie (optioneel)', credentialUrl: 'Verificatielink (optioneel)', addCert: 'CERTIFICERING TOEVOEGEN', remove: 'VERWIJDEREN', submit: 'LID TOEVOEGEN', sending: 'TOEVOEGEN…', success: 'Lid toegevoegd met referentie', error: 'Lid toevoegen mislukt. Controleer de velden.' },
} as const;

const emptyCertification = (): Certification => ({ provider: '', title: '', issued: '', credentialId: '', credentialUrl: '' });

export function TeamMemberForm({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const [unlocked, setUnlocked] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([emptyCertification()]);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password') || '');
    const response = await fetch('/api/team-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (response.ok) { setUnlocked(true); setMessage(''); } else setMessage(copy.denied);
    event.currentTarget.reset();
  }

  function updateCertification(index: number, field: keyof Certification, value: string) {
    setCertifications((current) => current.map((certification, position) => position === index ? { ...certification, [field]: value } : certification));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'), type: form.get('type'),
      roleFr: form.get('roleFr'), roleEn: form.get('roleEn'), roleNl: form.get('roleNl'),
      bioFr: form.get('bioFr'), bioEn: form.get('bioEn'), bioNl: form.get('bioNl'),
      specialties: String(form.get('specialties') || '').split(',').map((value) => value.trim()).filter(Boolean),
      certifications: certifications.filter((certification) => certification.provider || certification.title),
    };
    const response = await fetch('/api/team-members', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({})) as { id?: string };
    if (response.ok && result.id) { setState('success'); setMessage(`${copy.success} ${result.id}.`); setTimeout(() => window.location.reload(), 1200); }
    else { setState('error'); setMessage(copy.error); }
  }

  if (!unlocked) return <form className="research-login team-login" onSubmit={unlock}>
    <p className="eyebrow">LOCK // {copy.access}</p>
    <label><span>{copy.password}</span><input name="password" type="password" required autoComplete="current-password" /></label>
    <button className="mechanical-button mechanical-button--dark" type="submit">{copy.unlock}<span aria-hidden="true">↳</span></button>
    <p className="research-form-message" role="status">{message}</p>
  </form>;

  return <form className="research-form team-form" onSubmit={submit}>
    <fieldset><legend>01 // {copy.identity}</legend><div className="research-form-grid">
      <label><span>{copy.name}</span><input name="name" required minLength={2} maxLength={120} /></label>
      <label><span>{copy.type}</span><select name="type" defaultValue="member"><option value="direction">DIRECTION</option><option value="member">MEMBER</option><option value="collaborator">COLLABORATOR</option></select></label>
      <label><span>FR // {copy.roles}</span><input name="roleFr" required minLength={2} maxLength={160} /></label>
      <label><span>EN // {copy.roles}</span><input name="roleEn" required minLength={2} maxLength={160} /></label>
      <label><span>NL // {copy.roles}</span><input name="roleNl" required minLength={2} maxLength={160} /></label>
      <label><span>{copy.specialties}</span><input name="specialties" required minLength={2} maxLength={800} /></label>
      <label><span>FR // {copy.bios}</span><textarea name="bioFr" required minLength={20} maxLength={2000} rows={5} /></label>
      <label><span>EN // {copy.bios}</span><textarea name="bioEn" required minLength={20} maxLength={2000} rows={5} /></label>
      <label className="span-two"><span>NL // {copy.bios}</span><textarea name="bioNl" required minLength={20} maxLength={2000} rows={5} /></label>
    </div></fieldset>
    <fieldset><legend>02 // {copy.certifications}</legend><div className="team-cert-editor">
      {certifications.map((certification, index) => <div className="team-cert-fields" key={index}>
        <span className="team-cert-index">CERT-{String(index + 1).padStart(2, '0')}</span>
        <label><span>{copy.provider}</span><input value={certification.provider} onChange={(event) => updateCertification(index, 'provider', event.target.value)} maxLength={120} /></label>
        <label><span>{copy.certTitle}</span><input value={certification.title} onChange={(event) => updateCertification(index, 'title', event.target.value)} maxLength={240} /></label>
        <label><span>{copy.issued}</span><input type="month" value={certification.issued} onChange={(event) => updateCertification(index, 'issued', event.target.value)} /></label>
        <label><span>{copy.credentialId}</span><input value={certification.credentialId} onChange={(event) => updateCertification(index, 'credentialId', event.target.value)} maxLength={160} /></label>
        <label className="span-two"><span>{copy.credentialUrl}</span><input type="url" value={certification.credentialUrl} onChange={(event) => updateCertification(index, 'credentialUrl', event.target.value)} maxLength={500} /></label>
        {certifications.length > 1 && <button className="team-cert-remove" type="button" onClick={() => setCertifications((current) => current.filter((_, position) => position !== index))}>{copy.remove}</button>}
      </div>)}
    </div><button className="mechanical-button" type="button" disabled={certifications.length >= 20} onClick={() => setCertifications((current) => [...current, emptyCertification()])}>{copy.addCert}<span aria-hidden="true">＋</span></button></fieldset>
    <button className="mechanical-button mechanical-button--dark" type="submit" disabled={state === 'sending'}>{state === 'sending' ? copy.sending : copy.submit}<span aria-hidden="true">↳</span></button>
    <p className={`research-form-message is-${state}`} role="status">{message}</p>
  </form>;
}
