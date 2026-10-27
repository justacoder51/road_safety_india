import { Link } from 'react-router-dom';
import { useData } from '../../utils/data';
export default function SourceLink({ ids = [], label = 'Sources', section }) {
  const sources = useData().sources;
  return <span className="source-note">{label}{ids.length ? ': ' : ''}{ids.map((id, index) => {
    const source = sources.find(item => item.id === id);
    return <span key={id}>{index > 0 && ', '}<Link to={`/sources#${id}`} title={source?.title}>{source?.title || id}</Link></span>;
  })}{section && <> · Report §{section}</>}</span>;
}
