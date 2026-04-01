"use client";

import { InteractiveMap } from '@/components/InteractiveMap';
import { getAllLocations, getLocationById } from '@/lib/locations-data';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function MapContent() {
  const allLocations = getAllLocations();
  
  // Get individual locations
  const derry = getLocationById('derry');
  const castleRock = getLocationById('castle-rock');
  const jerusalemsLot = getLocationById('jerusalems-lot');

  // Generic blur placeholder para usar como fallback
  const blurDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Mapa", href: "/map", isCurrent: true }
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
        
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">
          Maine de Stephen King
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-center text-muted-foreground">
          Explore os principais locais ficcionais que sustentam o universo de Stephen King
        </p>
        
        <div className="mb-6">
          <InteractiveMap locations={allLocations} fullscreen={true} />
        </div>
        
        <div className="mt-6 p-4 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-2">
            Sobre os principais locais de Stephen King
          </h2>
          <p className="text-sm mb-6 text-muted-foreground">
            Muitas histórias de Stephen King se passam em cidades ficcionais do Maine, criando um universo em que personagens e eventos frequentemente se cruzam.
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
                Uma cidade sinistra assombrada pela entidade conhecida como Pennywise. Eventos violentos ocorrem em ciclos de 27 anos, e a cidade tem uma energia sombria que faz as pessoas ignorarem tragédias.
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
                Pequena cidade com história sombria, Castle Rock é cenário de inúmeros acontecimentos estranhos e sobrenaturais: calma na superfície, mas cheia de segredos.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              {jerusalemsLot?.imageUrl && (
                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                  <Image 
                    src={jerusalemsLot.imageUrl} 
                    alt={"Jerusalem's Lot, Maine"} 
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
                {"Jerusalem's Lot"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Também conhecida como Salem&apos;s Lot, essa pequena cidade foi tomada por vampiros liderados por Kurt Barlow, com uma história maligna que remonta à fundação e gira em torno da sinistra Casa Marsten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 