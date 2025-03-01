import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getBooksByLocation } from '@/lib/books-data';

export default function SalemsLotWorks() {
  const works = getBooksByLocation('salems-lot');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="salems-lot" />
    </div>
  );
}

