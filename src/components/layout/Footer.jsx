import { Link } from 'react-router-dom';
import { navigation } from '../../utils/navigation';
export default function Footer() {
  return <footer><div className="system-strip"><div className="container flex flex-wrap justify-center gap-x-6 gap-y-2">{['Safe speeds','Safe roads','Safe vehicles','Safer road users','Post-crash care'].map(label => <span key={label}>{label}</span>)}</div></div><div className="container footer-main"><div><Link to="/" className="footer-brand">Road Safety <span>India</span></Link><p>Evidence for safer journeys.<br />Based on the supplied research report, 27 October 2026.</p></div><nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav><p className="footer-note">Police-reported counts and modeled estimates are distinct.<br /><Link to="/sources#definitions">Read the definitions and limitations →</Link></p></div></footer>;
}
