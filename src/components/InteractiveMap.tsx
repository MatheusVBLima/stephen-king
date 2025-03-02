"use client";

import { useState } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { FictionalLocation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface InteractiveMapProps {
  locations: FictionalLocation[];
  fullscreen?: boolean;
}

export function InteractiveMap({ locations, fullscreen = false }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<FictionalLocation | null>(null);
  
  // Center of Maine state
  const MAINE_CENTER: [number, number] = [44.693947, -69.381927];
  
  const mapHeight = fullscreen ? 'calc(100vh - 150px)' : '500px';
  const initialZoom = fullscreen ? 8 : 7;

  // Set a Stephen King theme for the map markers
  const getMarkerColor = (location: FictionalLocation) => {
    return location.importance === 'major' ? '#ef4444' : '#3b82f6';
  };

  // Generic blur placeholder para usar como fallback
  const blurDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <div className="w-full space-y-4">
      <div className="relative" style={{ height: mapHeight, width: '100%' }}>
        <Map
          defaultCenter={MAINE_CENTER}
          defaultZoom={initialZoom}
          metaWheelZoom={true}
          twoFingerDrag={true}
        >
          <ZoomControl />
          
          {locations.map((location) => (
            <Marker
              key={location.id}
              width={40}
              anchor={location.coordinates}
              color={getMarkerColor(location)}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
        </Map>

        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 md:max-w-md md:left-4 md:right-auto">
            <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {selectedLocation.name}
                  </CardTitle>
                  <Badge variant={selectedLocation.importance === 'major' ? 'destructive' : 'default'}>
                    {selectedLocation.importance === 'major' ? 'Major' : 'Minor'} Location
                  </Badge>
                </div>
                <CardDescription>
                  First Appearance: {selectedLocation.firstAppearance}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedLocation.imageUrl && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-3">
                    <Image 
                      src={selectedLocation.imageUrl} 
                      alt={`Image of ${selectedLocation.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                    />
                  </div>
                )}
                <p className="text-sm">{selectedLocation.description}</p>
                {selectedLocation.books.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Featured in:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation.books.map((book, index) => (
                        <Badge key={index} variant="outline">
                          {book}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setSelectedLocation(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 