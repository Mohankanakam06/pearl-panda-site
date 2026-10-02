import PandaFace from './interactive/PandaFace';

const items = [['home', 'Home'], ['projects', 'Work'], ['services', 'Services'], ['industries', 'Industries'], ['about', 'Studio']];

export default function BottomBar({ activeSection, onNavigate }) {
  return <div className="studio-dock-wrap"><nav className="studio-dock" aria-label="Section navigation">
    <button onClick={() => onNavigate('home')} className="studio-dock__panda" aria-label="Panda mascot — back to top" data-cursor="TOP"><PandaFace mini activeSection={activeSection} /></button>
    {items.map(([id, label], index) => <button key={id} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'location' : undefined} className={`studio-dock__item ${activeSection === id ? 'is-active' : ''}`}><span className="studio-dock__number">0{index + 1}</span><span>{label}</span></button>)}
  </nav></div>;
}

