"use client";

import { InteractiveMap } from '@/components/InteractiveMap';
import { getAllLocations, getLocationById } from '@/lib/locations-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MapPage() {
  const allLocations = getAllLocations();
  
  // Get individual locations
  const derry = getLocationById('derry');
  const castleRock = getLocationById('castle-rock');
  const jerusalemsLot = getLocationById('jerusalems-lot');

  // Generic blur placeholder para usar como fallback
  const blurDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            asChild 
            className="mb-6"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">Stephen King's Maine</h1>
        <p className="max-w-2xl mx-auto mb-8 text-center text-muted-foreground">
          Explore the main fictional locations that form the backbone of Stephen King's universe
        </p>
        
        <div className="mb-6">
          <InteractiveMap locations={allLocations} fullscreen={true} />
        </div>
        
        <div className="mt-6 p-4 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-2">About Stephen King's Key Locations</h2>
          <p className="text-muted-foreground mb-6">
            Stephen King's fictional Maine is primarily defined by three iconic towns: Derry, Castle Rock, and Jerusalem's Lot (Salem's Lot). 
            These locations appear in multiple stories, creating an interconnected universe that fans call the "King Multiverse".
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 border rounded-lg">
              {derry?.imageUrl && (
                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                  <Image 
                    src={derry.imageUrl} 
                    alt="Derry, Maine" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                </div>
              )}
              <h3 className="text-lg font-medium mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                Derry
              </h3>
              <p className="text-sm text-muted-foreground">
                A sinister town haunted by the entity known as Pennywise. Violent events occur here in 27-year cycles, and the town has a dark energy that makes people ignore tragic events.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              {castleRock?.imageUrl && (
                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                  <Image 
                    src={castleRock.imageUrl} 
                    alt="Castle Rock, Maine" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                </div>
              )}
              <h3 className="text-lg font-medium mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                Castle Rock
              </h3>
              <p className="text-sm text-muted-foreground">
                A small town with a dark history, Castle Rock is the setting for numerous strange occurrences and supernatural events, appearing calm on the surface but harboring deep secrets.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              {jerusalemsLot?.imageUrl && (
                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                  <Image 
                    src={jerusalemsLot.imageUrl} 
                    alt="Jerusalem's Lot, Maine" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                </div>
              )}
              <h3 className="text-lg font-medium mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                Jerusalem's Lot
              </h3>
              <p className="text-sm text-muted-foreground">
                Also known as Salem's Lot, this small town was overrun by vampires led by Kurt Barlow, with an evil history dating back to its founding and centered around the ominous Marsten House.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 