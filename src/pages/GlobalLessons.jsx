import { useData } from '../utils/data';
import Hero from '../components/ui/Hero';
import PolicyCard from '../components/ui/PolicyCard';
import Roadmap from '../components/ui/Roadmap';
import CallToAction from '../components/ui/CallToAction';
export default function GlobalLessons() {
  const policies=useData()['international-policies'];
  return <><Hero eyebrow="Global lessons" title={<>Learn globally.<br />Adapt locally.</>} description="Evidence-informed approaches for safer roads in India."><p className="hero-footnote">Policies need local design, sustained delivery and evaluation.</p></Hero><div className="container page-content"><div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">{policies.map(policy=><PolicyCard key={policy.id} policy={policy} />)}</div><p className="source-note mt-5">Foreign outcomes are evidence to assess, not guaranteed results for India. Research report §5–6.</p><div className="section-space"><Roadmap /></div><div className="section-space"><CallToAction /></div></div></>;
}
