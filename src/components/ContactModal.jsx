import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUpRight, Check, Download, X } from 'lucide-react';
import gsap from 'gsap';
import PandaFace from './interactive/PandaFace';
import useReducedMotion from '../hooks/useReducedMotion';
import { motion } from '../lib/motion';

const services = ['1. Basic Portfolio Website', '2. Website with Backend', '3. Full Backend Website', 'Social Media — Monthly Package', 'Website + Social Media Combo (Combined Option)'];
const industries = ['Cafés & Restaurants', 'Events & Event Companies', 'Real Estate', 'Retail & Local Businesses', 'Creators & Personal Brands', 'Startups & Small Businesses'];
const initialPackage = (value) => {
  const text = typeof value === 'string' ? value.toLowerCase() : '';
  if (text.includes('combo') || text.includes('combined')) return services[4];
  if (text.includes('social')) return services[3];
  if (text.includes('full') || text.includes('custom')) return services[2];
  if (text.includes('backend') || text.includes('business website')) return services[1];
  if (text.includes('basic') || text.includes('portfolio') || text.includes('starter')) return services[0];
  return services[4];
};

function EnquiryDialog({ onClose, initialService }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const validationFrame = useRef(0);
  const downloadUrls = useRef([]);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ service: initialPackage(initialService), industry: industries[0], name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const savedOverflow = document.body.style.overflow;
    const savedPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const background = [...document.body.children].filter((element) => element !== overlayRef.current).map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    headingRef.current?.focus({ preventScroll: true });
    const handleKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')].filter((element) => !element.disabled && element.getClientRects().length);
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(validationFrame.current);
      gsap.killTweensOf(dialog);
      downloadUrls.current.forEach((url) => URL.revokeObjectURL(url));
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = savedOverflow;
      document.body.style.paddingRight = savedPadding;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: motion.duration.reveal, stagger: motion.stagger, ease: motion.ease.reveal });
    }, dialogRef);
    return () => ctx.revert();
  }, [ready, reduced]);

  const update = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) {
      if (!reduced) gsap.fromTo(dialogRef.current, { x: -5 }, { x: 0, duration: 0.08, repeat: 3, yoyo: true, clearProps: 'transform' });
      validationFrame.current = requestAnimationFrame(() => document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus());
      return;
    }
    setReady(true);
    dialogRef.current.scrollTop = 0;
  };
  const download = () => {
    const text = `PEARL PANDA — PROJECT ENQUIRY\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nService: ${form.service}\nIndustry: ${form.industry}\n\nRequirements:\n${form.message.trim() || 'To be discussed.'}\n\nPlease share current rates, scope options and package details.\n\nPrepared locally. This brief has not been sent.\n`;
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    downloadUrls.current.push(url);
    link.href = url;
    link.download = 'pearl-panda-project-brief.txt';
    link.click();
    setDownloaded(true);
  };
  return createPortal(
    <div ref={overlayRef} className="contact-overlay" data-lenis-prevent onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-title" aria-describedby="contact-description" className="contact-dialog">
        <button onClick={onClose} className="contact-close" aria-label="Close enquiry dialog"><X size={21} aria-hidden="true" /></button>
        {ready ? <div className="contact-success">
          <PandaFace celebrate />
          <span className="contact-kicker contact-reveal">A first step, thoughtfully taken.</span>
          <h2 id="contact-title" ref={headingRef} tabIndex={-1} className="contact-reveal">Your brief<br /><em>is ready.</em></h2>
          <p id="contact-description" className="contact-reveal">Thanks, {form.name.trim().split(' ')[0]}. Your {form.service.replace(/^\d\. /, '')} enquiry is ready to share.</p>
          <div className="contact-note contact-reveal"><Check size={18} aria-hidden="true" /><p>This brief is prepared on your device. It has not been sent to Pearl Panda. Download it to keep and share your requirements.</p></div>
          <button onClick={download} className="btn-brutal contact-submit contact-reveal"><Download size={18} aria-hidden="true" />Download your brief</button>
          <p role="status" className="contact-download-status">{downloaded ? 'Download started. Your brief is ready to share.' : 'Current rates, scope and deliverables are confirmed before work begins.'}</p>
          <button onClick={() => setReady(false)} className="contact-edit">Edit your details <ArrowUpRight size={16} aria-hidden="true" /></button>
        </div> : <>
          <div className="contact-heading contact-reveal"><span className="contact-kicker">A note to Pearl Panda</span><h2 id="contact-title" ref={headingRef} tabIndex={-1}>Let’s make<br /><em>something matter.</em></h2><p id="contact-description">Tell us where you are, and where you’d like to go. We’ll help you find a thoughtful way forward.</p></div>
          <form onSubmit={submit} noValidate>
            <div className="contact-field contact-reveal"><label htmlFor="contact-service">What can we help with?</label><select id="contact-service" value={form.service} onChange={(event) => update('service', event.target.value)}>{services.map((service) => <option key={service}>{service}</option>)}</select></div>
            <div className="contact-field contact-reveal"><label htmlFor="contact-industry">Your corner of the world</label><select id="contact-industry" value={form.industry} onChange={(event) => update('industry', event.target.value)}>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select></div>
            <div className="contact-field-grid contact-reveal">{[['name', 'Your name', 'text', 'Alex Morgan'], ['email', 'Email address', 'email', 'alex@business.com']].map(([key, label, type, placeholder]) => <div className="contact-field" key={key}><label htmlFor={`contact-${key}`}>{label} <span aria-hidden="true">*</span></label><input id={`contact-${key}`} name={key} type={type} required autoComplete={key} value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `contact-${key}-error` : undefined} />{errors[key] && <span className="contact-error" id={`contact-${key}-error`} role="alert">{errors[key]}</span>}</div>)}</div>
            <div className="contact-field contact-reveal"><label htmlFor="contact-message">A little about your idea <span>(optional)</span></label><textarea id="contact-message" rows={3} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Your business, your audience, what comes next…" /></div>
            <p className="contact-pricing contact-reveal">Website projects are priced around your needs; social media is a monthly service. We’ll confirm the scope, timeline and current rates before anything begins.</p>
            <button type="submit" className="btn-brutal contact-submit contact-reveal" data-cursor="LET’S GO">Prepare my enquiry <ArrowRight size={18} aria-hidden="true" /></button>
            <p className="contact-local-note">This form creates a downloadable brief. It does not send an enquiry.</p>
          </form>
        </>}
      </section>
    </div>, document.body
  );
}

export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  return isOpen ? <EnquiryDialog onClose={onClose} initialService={initialService} /> : null;
}

