import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CastleRockWorks } from "@/components/castle-rock-works"
import { DerryWorks } from "@/components/derry-works"
import { SalemsLotWorks } from "@/components/salems-lot-works"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">Stephen King's Works</h1>

        <Tabs defaultValue="castle-rock" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-8">
            <TabsTrigger value="castle-rock" className="text-xs md:text-sm">
              Castle Rock
            </TabsTrigger>
            <TabsTrigger value="derry" className="text-xs md:text-sm">
              Derry
            </TabsTrigger>
            <TabsTrigger value="salems-lot" className="text-xs md:text-sm">
              Salem's Lot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="castle-rock">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Works Set in Castle Rock</h2>
            <p className="mb-4 text-sm md:text-base">
              Below is the list of works set in Castle Rock, with details about format and publication year:
            </p>
            <CastleRockWorks />
          </TabsContent>

          <TabsContent value="derry">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Works Set in Derry</h2>
            <p className="mb-4 text-sm md:text-base">
              Below is the list of works set in Derry, with details about format and publication year:
            </p>
            <DerryWorks />
          </TabsContent>

          <TabsContent value="salems-lot">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Works Set in Salem's Lot</h2>
            <p className="mb-4 text-sm md:text-base">
              Below is the list of works set in Salem's Lot, with details about format and publication year:
            </p>
            <SalemsLotWorks />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

