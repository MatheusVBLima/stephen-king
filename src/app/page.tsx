"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CastleRockWorks from "@/components/castle-rock-works";
import DerryWorks from "@/components/derry-works";
import SalemsLotWorks from "@/components/salems-lot-works";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("castle-rock");
  const [isLoading, setIsLoading] = useState(true);

  // Detectar o fragmento da URL quando o componente for montado
  useEffect(() => {
    // Função para obter o fragmento da URL sem o # e atualizar a tab ativa
    const updateTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (hash === 'derry' || hash === 'castle-rock' || hash === 'salems-lot')) {
        setActiveTab(hash);
      }
      // Depois de verificar o hash, desativar o estado de loading
      setIsLoading(false);
    };

    // Verificar o fragmento quando a página carregar
    updateTabFromHash();

    // Adicionar um listener para quando o fragmento mudar (navegação pelo histórico)
    window.addEventListener('hashchange', updateTabFromHash);

    // Cleanup do listener
    return () => {
      window.removeEventListener('hashchange', updateTabFromHash);
    };
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-5xl md:mb-10">Stephen King's Works By Location</h1>
        
        {isLoading ? (
          <div className="w-full">
            {/* Tabs skeleton */}
            <div className="grid w-full grid-cols-3 p-1 mb-4 rounded-md md:mb-8 bg-muted">
              <div className="flex items-center justify-center m-1 rounded-sm h-9 bg-muted">
                <Skeleton className="w-20 h-4" />
              </div>
              <div className="flex items-center justify-center m-1 rounded-sm h-9 bg-muted">
                <Skeleton className="w-12 h-4" />
              </div>
              <div className="flex items-center justify-center m-1 rounded-sm h-9 bg-muted">
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
            
            {/* Descrição da localidade skeleton */}
            <div className="mb-12 text-center">
              <Skeleton className="h-10 mx-auto mb-4 w-72" />
              <div className="max-w-3xl p-6 mx-auto rounded-lg bg-background/50">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-4/5 h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            </div>
            
            {/* Tabela de obras skeleton */}
            <div>
              <div className="flex py-3 mb-4 border-b">
                <Skeleton className="w-24 h-4 mx-4" />
                <Skeleton className="flex-1 w-32 h-4 mx-4" />
                <Skeleton className="w-16 h-4 mx-4" />
                <Skeleton className="flex-1 w-48 h-4 mx-4" />
              </div>
              
              {/* Linhas da tabela skeleton - repete para várias obras */}
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex py-4 border-b">
                  <Skeleton className="w-12 h-4 mx-4" />
                  <Skeleton className="flex-1 w-40 h-4 mx-4" />
                  <Skeleton className="w-24 h-4 mx-4" />
                  <Skeleton className="flex-1 w-64 h-4 mx-4" />
                </div>
              ))}
              
              <div className="mt-6 text-center">
                <Skeleton className="w-64 h-4 mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-8">
              <TabsTrigger 
                value="castle-rock" 
                id="castle-rock" 
                className="text-xs md:text-sm"
              >
                Castle Rock
              </TabsTrigger>
              <TabsTrigger 
                value="derry" 
                id="derry" 
                className="text-xs md:text-sm"
              >
                Derry
              </TabsTrigger>
              <TabsTrigger 
                value="salems-lot" 
                id="salems-lot" 
                className="text-xs md:text-sm"
              >
                Salem's Lot
              </TabsTrigger>
            </TabsList>

            <TabsContent value="castle-rock">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Works Set in Castle Rock</h2>
                <div className="max-w-3xl p-6 mx-auto rounded-lg bg-stone-900">
                  <p className="leading-relaxed">
                    Castle Rock is one of the most important fictional towns in Stephen King's universe, serving as the backdrop for numerous supernatural events and memorable characters across decades of stories. First appearing in "The Dead Zone" (1979), Castle Rock has become a cornerstone of King's fictional Maine topography.
                  </p>
                </div>
              </div>
              <CastleRockWorks />
            </TabsContent>

            <TabsContent value="derry">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Works Set in Derry</h2>
                  <div className="max-w-3xl p-6 mx-auto rounded-lg bg-stone-900">
                  <p className="leading-relaxed ">
                    Derry is a dark and frightening fictional town in Stephen King's universe, most famously known as the home of Pennywise the Dancing Clown from "IT". First appearing in the 1981 short story "The Bird and the Album", Derry has been the setting for numerous supernatural events and is based on King's portrayal of Bangor, Maine.
                  </p>
                </div>
              </div>
              <DerryWorks />
            </TabsContent>

            <TabsContent value="salems-lot">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Works Set in Salem's Lot</h2>
                <div className="max-w-3xl p-6 mx-auto rounded-lg bg-stone-900">
                  <p className="leading-relaxed">
                    Salem's Lot (Jerusalem's Lot) is a fictional town infested with vampires in Stephen King's universe. Featured in King's second published novel in 1975, the town has become one of his most iconic settings and is referenced throughout many of his other works, completing his trinity of fictional Maine towns alongside Castle Rock and Derry.
                  </p>
                </div>
              </div>
              <SalemsLotWorks />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  )
}

