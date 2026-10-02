import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, RotateCcw } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/widgets.css';

const questions = [
  { title: 'Where would you like to begin?', options: [
    ['website', 'A website', 'Give my business a home online.'],
    ['social', 'Social media', 'Keep my content consistent every month.'],
    ['both', 'The whole presence', 'Bring my website and social together.'],
  ] },
  { title: 'How much should your website do?', options: [
    ['simple', 'Tell my story', 'Pages, work, services and a way to get in touch.'],
    ['dynamic', 'Work with live information', 'Database, dynamic content and enquiry forms.'],
    ['app', 'Run an experience', 'Logins, bookings, customer portals or workflows.'],
  ] },
  { title: 'What should happen after launch?', options: [
    ['launch', 'Focus on the launch', 'Start with the website project.'],
    ['monthly', 'Keep showing up', 'Add monthly content planning and publishing support.'],
    ['discuss', 'Let’s work it out', 'Talk through the right scope together.'],
  ] },
];

function recommendation(answers) {
  if (answers[0] === 'social') return { service: 'Social Media — Monthly Package', copy: 'Monthly ideas, branded creatives, captions, publishing support and a monthly overview, adapted to your industry.' };
  if (answers[0] === 'both' || answers[2] === 'monthly') return { service: 'Website + Social Media Combo', copy: 'A website project plus an ongoing monthly social media service, with one consistent visual direction.' };
  if (answers[1] === 'app') return { service: 'Full Backend Website', copy: 'A complete web application with backend, database, login / authentication and application-specific functionality.' };
  if (answers[1] === 'dynamic') return { service: 'Website with Backend', copy: 'Frontend connected to backend and database for dynamic information, forms and required functionality.' };
  return { service: 'Basic Portfolio Website', copy: 'A clean responsive informational website with essential pages, navigation, contact / CTA sections and deployment.' };
}

export default function PandaQuiz({ onOpenContact }) {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);
  const headingRef = useRef(null);
  const result = step === 3 ? recommendation(answers) : null;

  useEffect(() => {
    ScrollTrigger.refresh();
    if (started) headingRef.current?.focus({ preventScroll: true });
  }, [step, started]);

  const next = () => {
    if (!answers[step]) { setError(true); return; }
    setStarted(true);
    setError(false);
    setStep(step + 1);
  };

  return (
    <div className="panda-quiz">
      <div className="widget-kicker"><span className="widget-led" /> Find your starting point <span>Three considered questions</span></div>
      <div className="panda-quiz__progress" role="progressbar" aria-label="Quiz progress" aria-valuenow={step} aria-valuemin={0} aria-valuemax={3}>
        <span style={{ transform: `scaleX(${step / 3})` }} />
      </div>
      {result ? (
        <div className="panda-quiz__result">
          <span className="widget-kicker text-gold"><Check size={16} /> Your starting point</span>
          <h3 ref={headingRef} tabIndex={-1}>{result.service}</h3>
          <p>{result.copy}</p>
          <p className="panda-quiz__note">A helpful starting point. Scope, deliverables and current rates are confirmed together.</p>
          <div className="panda-quiz__actions">
            <button className="btn-brutal bg-gold text-ink px-5 py-3" onClick={() => onOpenContact(result.service)}>Let’s talk scope <ArrowUpRight size={18} /></button>
            <button className="widget-text-button" onClick={() => { setAnswers([]); setStep(0); }}><RotateCcw size={15} /> Start again</button>
          </div>
        </div>
      ) : (
        <>
          <div className="panda-quiz__heading"><span>0{step + 1} / 03</span><h3 ref={headingRef} tabIndex={-1}>{questions[step].title}</h3></div>
          <fieldset className={`panda-quiz__options ${error ? 'panda-quiz__options--error' : ''}`}>
            <legend className="sr-only">{questions[step].title}</legend>
            {questions[step].options.map(([value, label, detail]) => (
              <label key={value} className="panda-quiz__option" data-selected={answers[step] === value}>
                <input type="radio" name={`panda-quiz-${step}`} checked={answers[step] === value} onChange={() => { setAnswers((previous) => { const copy = [...previous]; copy[step] = value; return copy; }); setError(false); }} />
                <span className="panda-quiz__check" aria-hidden="true">{answers[step] === value ? <Check size={15} /> : '+'}</span>
                <strong>{label}</strong><small>{detail}</small>
              </label>
            ))}
          </fieldset>
          <div className="panda-quiz__actions">
            {step > 0 && <button className="widget-text-button" onClick={() => { setError(false); setStep(step - 1); }}><ArrowLeft size={16} /> Back</button>}
            <span className="panda-quiz__feedback" role="status">{error ? 'Choose one option to continue.' : answers[step] ? 'A little more about what you need.' : 'Choose what feels right for your business.'}</span>
            <button className="btn-brutal bg-gold text-ink px-5 py-3" onClick={next}>{step === 2 ? 'Find my fit' : 'Continue'} <ArrowUpRight size={18} /></button>
          </div>
        </>
      )}
    </div>
  );
}

