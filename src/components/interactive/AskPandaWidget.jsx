import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageSquare, Minus, Send, X } from 'lucide-react';
import useReducedMotion from '../../hooks/useReducedMotion';
import '../../styles/widgets.css';

const greeting = 'Hey, I’m Panda. Pick a question and I’ll help you find a good starting point for your website or social media.';
const replies = [
  { label: 'What does a website cost?', answer: 'Website services are quoted according to the selected website type and project requirements. Rates are not fixed on the website. Contact Pearl Panda for current pricing and package details.', contact: true },
  { label: 'Show me café websites', answer: 'For cafés and restaurants, we can adapt the website around your menu, food showcase, location, reservations or enquiries and offers. Social content can include food photography, menu highlights, reels and ambience.', navigate: true },
  { label: 'What’s in monthly social?', answer: 'The monthly package covers content planning, branded social creatives, captions and copy, scheduling or publishing approved content where included, and a simple monthly overview. Deliverables are confirmed before work begins.' },
  { label: 'Book a call', answer: 'Let’s talk about your business, audience and requirements. Open an enquiry and choose the service you’re interested in.', contact: true },
];

export default function AskPandaWidget({ onOpenContact, onNavigate, isContactOpen = false }) {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState({ answer: greeting });
  const [question, setQuestion] = useState('');
  const [typed, setTyped] = useState(greeting);
  const [typing, setTyping] = useState(false);
  const reduced = useReducedMotion();
  const closeRef = useRef(null);
  const launcherRef = useRef(null);
  const panelRef = useRef(null);

  const close = (restore = true) => {
    setOpen(false);
    if (restore) launcherRef.current?.focus({ preventScroll: true });
  };
  const contact = () => { close(false); onOpenContact('General Inquiry'); };

  useEffect(() => {
    if (isContactOpen) setOpen(false);
  }, [isContactOpen]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const keydown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); launcherRef.current?.focus({ preventScroll: true }); }
    };
    const panel = panelRef.current;
    panel?.addEventListener('keydown', keydown);
    return () => panel?.removeEventListener('keydown', keydown);
  }, [open]);

  useEffect(() => {
    if (!open || reduced || !question) { setTyped(reply.answer); setTyping(false); return; }
    setTyped('');
    setTyping(true);
    let length = 0;
    const timer = window.setInterval(() => {
      length += 5;
      setTyped(reply.answer.slice(0, length));
      if (length >= reply.answer.length) { window.clearInterval(timer); setTyping(false); }
    }, 18);
    return () => window.clearInterval(timer);
  }, [reply, open, reduced, question]);

  if (isContactOpen) return null;

  return (
    <div className="ask-panda" data-open={open}>
      {open && <section ref={panelRef} id="ask-panda-panel" className="ask-panda__panel" role="dialog" aria-modal="false" aria-labelledby="ask-panda-title" data-lenis-prevent>
        <div className="ask-panda__header"><div><span className="widget-led" /><h2 id="ask-panda-title">Ask Panda</h2><span>Service guide</span></div><button ref={closeRef} onClick={() => close()} aria-label="Close Ask Panda"><X size={20} /></button></div>
        <div className="ask-panda__body">
          <div className="ask-panda__intro"><span>PP / 01</span><p>A little clarity.<br />A good place to start.</p></div>
          {question && <p className="ask-panda__question">{question} <ArrowUpRight size={16} /></p>}
          <div className="ask-panda__answer"><span className="ask-panda__prompt" aria-hidden="true">PANDA &gt;</span><p aria-hidden="true">{typed}{typing && <span className="ask-panda__caret">▌</span>}</p><p className="sr-only" aria-live="polite">{typing ? '' : reply.answer}</p></div>
          {!typing && (reply.contact || reply.navigate) && <button className="ask-panda__action" onClick={reply.navigate ? () => { close(false); onNavigate?.('projects'); } : contact}>{reply.navigate ? 'Explore selected work' : 'Open an enquiry'} <ArrowUpRight size={16} /></button>}
          <div className="ask-panda__replies" aria-label="Suggested questions">{replies.map((item) => <button key={item.label} onClick={() => { if (item.label === 'Book a call') { contact(); return; } setQuestion(item.label); setReply(item); }}><span>{item.label}</span><Send size={13} /></button>)}</div>
          <p className="ask-panda__note">A scripted guide to our services. Current rates and scope are confirmed with the team.</p>
        </div>
      </section>}
      <button ref={launcherRef} className="ask-panda__launcher" data-cursor="ASK" aria-expanded={open} aria-controls="ask-panda-panel" aria-label={open ? 'Minimize Ask Panda' : 'Open Ask Panda service guide'} onClick={() => open ? close() : setOpen(true)}>{open ? <Minus size={18} strokeWidth={1.4} /> : <MessageSquare size={18} strokeWidth={1.4} />}<span>Ask Panda</span><b aria-hidden="true">↗</b></button>
    </div>
  );
}

