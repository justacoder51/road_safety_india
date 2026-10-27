import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { DataProvider } from './utils/data';
import { navigation } from './utils/navigation';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
const Overview = lazy(() => import('./pages/Overview'));
const IndiaData = lazy(() => import('./pages/IndiaData'));
const GlobalLessons = lazy(() => import('./pages/GlobalLessons'));
const ActionPlan = lazy(() => import('./pages/ActionPlan'));
const Sources = lazy(() => import('./pages/Sources'));
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `${navigation.find(item => item.to === pathname)?.label || 'Page not found'} | Road Safety India`;
    const timer = window.setTimeout(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
      else { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return <DataProvider><Navbar /><main id="main" tabIndex={-1}><Suspense fallback={<div className="container py-24" role="status">Loading page…</div>}><RouteEffects /><Routes><Route path="/" element={<Overview />} /><Route path="/india-data" element={<IndiaData />} /><Route path="/global-lessons" element={<GlobalLessons />} /><Route path="/action-plan" element={<ActionPlan />} /><Route path="/sources" element={<Sources />} /><Route path="*" element={<section className="container py-24"><p className="eyebrow">Page not found</p><h1 className="text-5xl font-bold">Let’s get you back on track.</h1><Link to="/" className="button button-primary mt-8">Return to overview</Link></section>} /></Routes></Suspense></main><Footer /></DataProvider>;
}
