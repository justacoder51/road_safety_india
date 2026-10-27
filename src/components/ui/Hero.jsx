import RoadScene from './RoadScene';
export default function Hero({ eyebrow, title, description, children, home = false }) {
  return <section className={`hero ${home ? 'home-hero' : ''}`}><div className="hero-art"><RoadScene /></div><div className="container hero-inner"><div className="hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-description">{description}</p>{children}</div></div></section>;
}
