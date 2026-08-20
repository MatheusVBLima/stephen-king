import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getCatalogWorksForLocation } from '@/lib/imported-content';

export default function JerusalamsLotWorks() {
  const works = getCatalogWorksForLocation('jerusalems-lot');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="jerusalems-lot" />
    </div>
  );
}

