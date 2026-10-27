import { Link } from 'react-router-dom';
import { useData } from '../utils/data';
import Hero from '../components/ui/Hero';
import Icon from '../components/ui/Icon';
import StatCard from '../components/ui/StatCard';
import SourceLink from '../components/ui/SourceLink';
import RoadScene from '../components/ui/RoadScene';

const features = [
  { title:'Who is most at risk?', text:'Explore the people and road users most affected by road crashes in India.', to:'/india-data#road-users', icon:'Users', variant:'people' },
  { title:'Lessons from other countries', text:'See what has worked elsewhere, and what India can learn and adapt.', to:'/global-lessons', icon:'Gauge', variant:'lessons' },
  { title:'A safer system for India', text:'Practical, evidence-informed actions to prevent crashes and save lives.', to:'/action-plan', icon:'Route', variant:'system' },
];
export default function Overview() {
  const stats = useData()['india-statistics'];
  return <><Hero home eyebrow="Understanding road safety in India" title={<>Safer roads.<br />Fewer lives lost.</>} description="Explore the scale, the evidence, and the solutions that can save lives."><div className="hero-buttons"><Link to="/india-data" className="button button-primary">Explore India’s data <Icon name="ArrowRight" size={20} /></Link><Link to="/global-lessons" className="button button-outline">Learn what works <Icon name="ArrowRight" size={20} /></Link></div></Hero><section className="container overview-stats" aria-label="India road safety statistics for 2024"><div className="grid gap-4 md:grid-cols-3">{stats.kpis.map(item => <StatCard item={item} key={item.id} />)}</div><div className="stat-attribution"><SourceLink ids={stats.sourceIds} label="MoRTH police-reported data · 2024" /></div></section><section className="feature-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">The people behind the data</p><h2>Behind every number is a person.</h2></div><p className="muted max-w-md">Protecting everyday journeys means understanding the risks and designing a safer system for everyone.</p></div><div className="grid gap-5 md:grid-cols-3">{features.map(feature => <Link className="feature-card" to={feature.to} key={feature.title}><RoadScene compact variant={feature.variant} /><div className="feature-content"><h3>{feature.title}</h3><p className="muted">{feature.text}</p><span className="round-arrow"><Icon name="ArrowRight" size={20} /></span></div></Link>)}</div></div></section></>;
}
