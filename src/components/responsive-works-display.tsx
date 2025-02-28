import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface Work {
  year: number
  title: string
  format: string
  notes: string
}

interface ResponsiveWorksDisplayProps {
  works: Work[]
}

export function ResponsiveWorksDisplay({ works }: ResponsiveWorksDisplayProps) {
  return (
    <>
      <div className="hidden md:block rounded-md border  overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead>Publication Year</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {works.map((work) => (
              <TableRow key={`${work.year}-${work.title}`}>
                <TableCell className="font-medium">{work.year}</TableCell>
                <TableCell>{work.title}</TableCell>
                <TableCell>{work.format}</TableCell>
                <TableCell>{work.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {works.map((work) => (
          <Card key={`${work.year}-${work.title}`} >
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Year:</div>
                <div className="font-medium">{work.year}</div>

                <div className="text-muted-foreground">Title:</div>
                <div className="font-medium">{work.title}</div>

                <div className="text-muted-foreground">Format:</div>
                <div>{work.format}</div>

                <div className="text-muted-foreground">Notes:</div>
                <div className="col-span-2 mt-1 text-sm">{work.notes}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

