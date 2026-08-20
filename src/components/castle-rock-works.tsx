import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getCatalogWorksForLocation } from '@/lib/imported-content';

export default function CastleRockWorks() {
  const works = getCatalogWorksForLocation('castle-rock');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="castle-rock" />
    </div>
  );
}

