'use client';

import { useState } from 'react';
import type { Locale } from '@/content/i18n';

const labels = {
  fr: { access: 'ACCÈS PUBLICATION', password: 'Mot de passe', unlock: 'OUVRIR LE FORMULAIRE', unlocking: 'VÉRIFICATION…', denied: 'Mot de passe incorrect.', locked: 'Trop de tentatives. Réessayez dans', seconds: 'secondes.', title: 'Titre', question: 'Question étudiée', context: 'Contexte', hypotheses: 'Hypothèses', methodology: 'Méthodologie', tools: 'Outils et environnements', data: 'Données collectées', results: 'Résultats', limitations: 'Limites de l’étude', conclusion: 'Conclusions', status: 'État du projet', evidence: 'Nature des données', pdf: 'Rapport PDF', pdfHelp: 'PDF uniquement — 8 Mio maximum', submit: 'PUBLIER LA RECHERCHE', sending: 'PUBLICATION…', success: 'Recherche publiée sous la référence', error: 'La publication a échoué. Vérifie les champs et le PDF.' },
  en: { access: 'PUBLICATION ACCESS', password: 'Password', unlock: 'OPEN FORM', unlocking: 'VERIFYING…', denied: 'Incorrect password.', locked: 'Too many attempts. Try again in', seconds: 'seconds.', title: 'Title', question: 'Research question', context: 'Context', hypotheses: 'Hypotheses', methodology: 'Methodology', tools: 'Tools and environments', data: 'Collected data', results: 'Results', limitations: 'Study limitations', conclusion: 'Conclusions', status: 'Project status', evidence: 'Data type', pdf: 'PDF report', pdfHelp: 'PDF only — 8 MiB maximum', submit: 'PUBLISH RESEARCH', sending: 'PUBLISHING…', success: 'Research published under reference', error: 'Publication failed. Check the fields and PDF.' },
  nl: { access: 'PUBLICATIETOEGANG', password: 'Wachtwoord', unlock: 'FORMULIER OPENEN', unlocking: 'CONTROLEREN…', denied: 'Onjuist wachtwoord.', locked: 'Te veel pogingen. Probeer opnieuw over', seconds: 'seconden.', title: 'Titel', question: 'Onderzoeksvraag', context: 'Context', hypotheses: 'Hypothesen', methodology: 'Methodologie', tools: 'Tools en omgevingen', data: 'Verzamelde gegevens', results: 'Resultaten', limitations: 'Beperkingen van de studie', conclusion: 'Conclusies', status: 'Projectstatus', evidence: 'Soort gegevens', pdf: 'PDF-rapport', pdfHelp: 'Alleen PDF — maximaal 8 MiB', submit: 'ONDERZOEK PUBLICEREN', sending: 'PUBLICEREN…', success: 'Onderzoek gepubliceerd met referentie', error: 'Publicatie mislukt. Controleer de velden en PDF.' },
} as const;

export function ResearchProposalForm({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const [unlocked, setUnlocked] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthenticating(true);
    const form = event.currentTarget;
    const password = String(new FormData(form).get('password') || '');
    try {
      const response = await fetch('/api/research-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const payload = await response.json().catch(() => ({})) as { retryAfter?: number };
      if (response.ok) { setUnlocked(true); setMessage(''); }
      else if (response.status === 429) setMessage(`${copy.locked} ${Math.max(1, payload.retryAfter || 1)} ${copy.seconds}`);
      else setMessage(copy.denied);
    } catch {
      setMessage(copy.denied);
    } finally {
      form.reset();
      setAuthenticating(false);
    }
  }

  async function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    const response = await fetch('/api/research-publications', { method: 'POST', body: new FormData(event.currentTarget) });
    const payload = await response.json().catch(() => ({})) as { id?: string };
    if (response.ok && payload.id) { setState('success'); setMessage(`${copy.success} ${payload.id}.`); setTimeout(() => window.location.reload(), 1200); }
    else { setState('error'); setMessage(copy.error); }
  }

  if (!unlocked) return <form className="research-login" onSubmit={unlock}>
    <p className="eyebrow">LOCK // {copy.access}</p>
    <label><span>{copy.password}</span><input name="password" type="password" required autoComplete="current-password" /></label>
    <button className="mechanical-button mechanical-button--dark" type="submit" disabled={authenticating}>{authenticating ? copy.unlocking : copy.unlock}<span aria-hidden="true">↳</span></button>
    <p className="research-form-message" role="status">{message}</p>
  </form>;

  const fields = [['question', copy.question], ['context', copy.context], ['hypotheses', copy.hypotheses], ['methodology', copy.methodology], ['tools', copy.tools], ['data', copy.data], ['results', copy.results], ['limitations', copy.limitations], ['conclusion', copy.conclusion]] as const;
  return <form className="research-form" onSubmit={publish} encType="multipart/form-data">
    <input type="hidden" name="locale" value={locale} />
    <fieldset><legend>01 // RESEARCH</legend><div className="research-form-grid">
      <label className="span-two"><span>{copy.title}</span><input name="title" required minLength={5} maxLength={200} /></label>
      {fields.map(([name, label]) => <label className={name === 'question' ? 'span-two' : undefined} key={name}><span>{label}</span><textarea name={name} required minLength={name === 'tools' || name === 'data' || name === 'results' || name === 'limitations' || name === 'conclusion' ? 2 : 20} maxLength={5000} rows={name === 'question' ? 4 : 7} /></label>)}
    </div></fieldset>
    <fieldset><legend>02 // CLASSIFICATION</legend><div className="research-form-grid">
      <label><span>{copy.status}</span><select name="status" defaultValue="published"><option value="in-preparation">IN PREPARATION</option><option value="in-progress">IN PROGRESS</option><option value="published">PUBLISHED</option></select></label>
      <div><span className="research-field-label">{copy.evidence}</span><div className="research-check-grid">{['measured', 'reproduced', 'external', 'estimated'].map((kind) => <label key={kind}><input type="checkbox" name="evidence" value={kind} /><span>{kind.toUpperCase()}</span></label>)}</div></div>
    </div></fieldset>
    <fieldset><legend>03 // PDF</legend><label className="research-file-zone"><input name="pdf" type="file" accept="application/pdf,.pdf" required /><strong>{copy.pdf}</strong><span>{copy.pdfHelp}</span><small>PDF / MAX 8 MiB</small></label></fieldset>
    <button className="mechanical-button mechanical-button--dark" type="submit" disabled={state === 'sending'}>{state === 'sending' ? copy.sending : copy.submit}<span aria-hidden="true">↳</span></button>
    <p className={`research-form-message is-${state}`} role="status">{message}</p>
  </form>;
}
