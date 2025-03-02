import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Page not found", href: "#", isCurrent: true }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="w-full max-w-md mx-auto mb-6">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
      </div>
      <h2 className="mb-4 text-3xl font-bold">Page not found</h2>
      <p className="max-w-md mb-6 text-muted-foreground">
        The work you are looking for was not found or does not exist.
      </p>
      <Button asChild>
        <Link href="/">
          <Home className="w-4 h-4 mr-2" />
          Return to home page
        </Link>
      </Button>
    </div>
  );
} 