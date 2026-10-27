import { createContext, useContext, useEffect, useState } from 'react';
import { assetUrl } from './assets';
const DataContext = createContext(null);
const names = ['india-statistics', 'road-user-data', 'road-type-data', 'international-policies', 'indian-policies', 'action-plan', 'sources', 'definitions', 'report-manifest'];
export function DataProvider({ children }) {
  const [state, setState] = useState({ data: null, error: null });
  useEffect(() => {
    const controller = new AbortController();
    Promise.all(names.map(async name => {
      const response = await fetch(assetUrl(`data/${name}.json`), { signal: controller.signal });
      if (!response.ok) throw new Error(`Unable to load ${name}`);
      return [name, await response.json()];
    })).then(entries => {
      const data = Object.fromEntries(entries);
      if (data['india-statistics']?.kpis?.length !== 3 || data['sources']?.length !== 21 || data['international-policies']?.length !== 6) throw new Error('The content files are incomplete.');
      setState({ data, error: null });
    }).catch(error => { if (error.name !== 'AbortError') setState({ data: null, error: error.message }); });
    return () => controller.abort();
  }, []);
  if (state.error) return <main className="container py-24"><h1 className="text-4xl font-bold">The research could not be loaded.</h1><p className="mt-4">Please reload the page to try again. The content files may be temporarily unavailable.</p><button className="button button-primary mt-6" onClick={() => window.location.reload()}>Reload page</button></main>;
  if (!state.data) return <div className="container py-24" role="status">Loading road safety research…</div>;
  return <DataContext.Provider value={state.data}>{children}</DataContext.Provider>;
}
export const useData = () => useContext(DataContext);
