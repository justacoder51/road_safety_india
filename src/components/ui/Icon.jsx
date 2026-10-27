import { ArrowRight, ArrowUpRight, Bike, BookOpen, Camera, Car, ChartNoAxesCombined, Check, ChevronDown, ClipboardCheck, Construction, ContactRound, FileText, Footprints, Gauge, HeartHandshake, HeartPulse, Info, Menu, Route, Scale, Search, Settings2, ShieldCheck, Target, Users, X } from 'lucide-react';
const icons = { ArrowRight, ArrowUpRight, Bike, BookOpen, Camera, Car, ChartNoAxesCombined, Check, ChevronDown, ClipboardCheck, Construction, ContactRound, FileText, Footprints, Gauge, HeartHandshake, HeartPulse, Info, Menu, Route, Scale, Search, Settings2, ShieldCheck, Target, Users, X };
export default function Icon({ name, size = 24, ...props }) {
  const Component = icons[name] || FileText;
  return <Component size={size} strokeWidth={1.65} aria-hidden="true" {...props} />;
}
