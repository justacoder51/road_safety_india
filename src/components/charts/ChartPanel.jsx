import SourceLink from '../ui/SourceLink';
export default function ChartPanel({ id, title, description, sourceIds, section, children, table }) {
  return <section className="panel chart-panel" id={id}><h2>{title}</h2><p className="muted chart-description">{description}</p>{children}<SourceLink ids={sourceIds} section={section} /><details className="data-table-disclosure"><summary>View accessible data table</summary><div className="table-scroll">{table}</div></details></section>;
}
