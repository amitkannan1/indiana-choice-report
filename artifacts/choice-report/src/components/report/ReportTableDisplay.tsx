import type { ReportTable } from "@workspace/api-client-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export function ReportTableDisplay({ table }: { table: ReportTable }) {
  if (!table.headers || !table.rows) return null;

  return (
    <Card className="my-8 overflow-hidden shadow-md border-border/60">
      <div className="p-4 sm:p-6 bg-muted/30 border-b border-border/50">
        <h4 className="text-lg font-bold text-primary font-sans">{table.title}</h4>
        {table.description && (
          <p className="text-sm text-muted-foreground mt-1">{table.description}</p>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          {table.footnote && (
            <TableCaption className="text-left px-6 pb-4 mt-0 italic text-muted-foreground border-t border-border/50 pt-3">
              {table.footnote}
            </TableCaption>
          )}
          <TableHeader className="bg-primary/5">
            <TableRow className="hover:bg-transparent">
              {table.headers.map((header, i) => (
                <TableHead 
                  key={i} 
                  className={`font-semibold text-primary h-12 ${i > 0 && !isNaN(Number(table.rows[0]?.[i]?.replace(/[^0-9.-]+/g,""))) ? 'text-right' : ''}`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-muted/10'}>
                {row.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex}
                    className={`${cellIndex > 0 && !isNaN(Number(cell.replace(/[^0-9.-]+/g,""))) ? 'text-right font-medium' : ''}`}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
