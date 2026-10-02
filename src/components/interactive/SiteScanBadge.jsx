import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RotateCcw, ScanLine } from 'lucide-react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';
import '../../styles/widgets.css';

export default function SiteScanBadge({ onOpenContact }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [run, setRun] = useState(0);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    if (!visible) return;
    if (reduced) { setScanned(true); return; }
    setScanned(false);
    const timer = window.setTimeout(() => setScanned(true), 1600);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, run]);

  return (
    <aside ref={ref} className="site-scan" data-visible={visible}>
      <div className="site-scan__copy"><span className="widget-kicker"><ScanLine size={16} strokeWidth={1.2} /> A fresh pair of eyes</span><h3>A closer look<br /><span>at your website.</span></h3><p>Let’s look at speed, search visibility and the mobile experience. Ask about a free site health scan.</p><button className="btn-brutal bg-gold text-ink px-5 py-3" onClick={() => onOpenContact('Free site health scan')}>Take a closer look <ArrowUpRight size={18} /></button></div>
      <div className="site-scan__browser" key={run}>
        <div className="site-scan__toolbar"><span>+</span><span>Your website / scan preview</span><button type="button" onClick={() => setRun(run + 1)} aria-label="Replay scan preview"><RotateCcw size={15} /></button></div>
        <div className="site-scan__canvas"><svg className="site-scan__mock" viewBox="0 0 360 150" fill="none" aria-hidden="true"><path d="M20 40h180M20 53h120M20 80h85M20 91h150M20 102h130M260 115V35h64v80zM268 102h48M288 109h8" stroke="currentColor" strokeWidth="1" /><path d="M20 128C58 121 80 144 117 119S170 109 206 85" stroke="var(--color-primary)" strokeWidth="1.5" /></svg>{visible && !scanned && <div className="site-scan__line" aria-hidden="true" />}<div className="site-scan__stamps" data-scanned={scanned} aria-hidden="true">{['Speed', 'SEO', 'Mobile'].map((label, index) => <span key={label} style={{ '--stamp-delay': `${index * 0.12}s` }}>{label} ↗</span>)}</div></div>
        <div className="site-scan__verdict" role="status">{scanned ? 'Three perspectives. A clearer picture.' : 'A preview of what we look at…'}</div>
        <p className="site-scan__disclaimer">Illustrative preview. No website has been scanned.</p>
      </div>
    </aside>
  );
}
