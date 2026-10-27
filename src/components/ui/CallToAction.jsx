import { Link } from 'react-router-dom';
import Icon from './Icon';
export default function CallToAction() {
  return <section className="cta"><div><p className="eyebrow">From evidence to action</p><h2>Measure lives saved,<br />not just actions taken.</h2><p>Set clear goals, track progress and evaluate what works, so road safety investments lead to safer journeys.</p><Link className="button button-primary" to="/action-plan">View the action plan <Icon name="ArrowRight" size={19} /></Link></div><Icon className="cta-symbol" name="Route" size={210} /></section>;
}
