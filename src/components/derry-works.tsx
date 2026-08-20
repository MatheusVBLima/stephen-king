import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getCatalogWorksForLocation } from '@/lib/imported-content';

export default function DerryWorks() {
  const works = getCatalogWorksForLocation('derry');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="derry" />
    </div>
  );
}

