import { Link } from 'react-router-dom';
import { useData } from '../../utils/data';
import Icon from './Icon';
export default function Roadmap() {
  const phases = useData()['action-plan'];
  return <section className="roadmap"><div className="section-heading"><div><p className="eyebrow">Action plan</p><h2>A practical roadmap for India.</h2><p className="muted">Build on what works. Adapt to local contexts. Sustain delivery.</p></div></div><div className="grid gap-5 md:grid-cols-3">{phases.map((phase,i) => <Link className="phase-preview" to={`/action-plan#${phase.id}`} key={phase.id}><span className="phase-number">0{i+1}</span><span className="icon-disc teal"><Icon name={phase.icon} size={27} /></span><h3>{phase.horizon}</h3><p>{phase.title}</p><span className="text-link">View priorities <Icon name="ArrowRight" size={17} /></span></Link>)}</div></section>;
}
