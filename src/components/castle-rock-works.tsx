import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getBooksByLocation } from '@/lib/books-data';

export default function CastleRockWorks() {
  const works = getBooksByLocation('castle-rock');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="castle-rock" />
    </div>
  );
}

