import { ResponsiveWorksDisplay } from './responsive-works-display';
import { getBooksByLocation } from '@/lib/books-data';

export default function DerryWorks() {
  const works = getBooksByLocation('derry');
  
  return (
    <div className="py-8">
      <ResponsiveWorksDisplay works={works} location="derry" />
    </div>
  );
}

