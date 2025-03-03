import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getBooksByLocation } from '@/lib/books-data';

export default function JerusalamsLotWorks() {
  const works = getBooksByLocation('jerusalems-lot');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="jerusalems-lot" />
    </div>
  );
}

