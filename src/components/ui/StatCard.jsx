import Icon from './Icon';
import { formatNumber } from '../../utils/formatters';
export default function StatCard({ item }) {
  return <article className="stat-card"><span className={`icon-disc ${item.tone}`}><Icon name={item.icon} size={31} /></span><div><p className="stat-value">{formatNumber(item.value)}</p><p className="stat-label">{item.label}</p></div></article>;
}
