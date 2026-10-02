import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';
import '../../styles/widgets.css';

const stats = [{ value: 3, title: 'Website types', note: 'From portfolio to full application' }, { value: 6, title: 'Core industries', note: 'A digital presence shaped around you' }, { value: 5, title: 'Monthly inclusions', note: 'Planning through monthly overview' }];

export default function LiveStatsStrip() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  useEffect(() => {
    const reset = () => ref.current?.querySelectorAll('[data-count]').forEach((element) => { element.textContent = String(element.dataset.count).padStart(2, '0'); });
    reset();
    if (reduced || !visible) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('[data-count]').forEach((element) => {
        const counter = { value: 0 };
        gsap.to(counter, { value: Number(element.dataset.count), duration: 1.15, ease: 'power4.out', onUpdate: () => { element.textContent = String(Math.round(counter.value)).padStart(2, '0'); } });
      });
      gsap.fromTo('.stats-signal', { scaleY: 0.8 }, { scaleY: 1, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, ref);
    return () => { ctx.revert(); reset(); };
  }, [reduced, visible]);

  return (
    <section ref={ref} className="live-stats" aria-label="Pearl Panda service coverage" data-visible={visible}>
      <div className="live-stats__label"><span className="widget-led" /> A considered offering <small>Built around your business</small></div>
      <div className="live-stats__grid">
        {stats.map((stat, index) => <div key={stat.title} className="live-stats__item"><span className="live-stats__number" data-count={stat.value} aria-hidden="true">{String(stat.value).padStart(2, '0')}</span><div><h2><span className="sr-only">{stat.value} </span>{stat.title}</h2><p>{stat.note}</p></div><svg className="stats-signal" viewBox="0 0 72 32" fill="none" aria-hidden="true"><path d={index === 1 ? 'M2 26 12 26 12 18 24 18 24 10 40 10 40 4 70 4' : 'M2 25 12 21 20 24 28 12 37 17 45 8 53 12 70 3'} stroke="currentColor" strokeWidth="2" /></svg></div>)}
      </div>
    </section>
  );
}

