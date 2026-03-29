import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateReportSection, useUpdateReportTable, useUpdateReportStat, useUpdateReportMetadata } from "@workspace/api-client-react";
import { getGetReportSectionsQueryKey, getGetReportTablesQueryKey, getGetReportStatsQueryKey, getGetReportMetadataQueryKey } from "@workspace/api-client-react";
import type { ReportSection, ReportTable, ReportStat, ReportMetadata } from "@workspace/api-client-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function EditSectionDialog({ section, open, onOpenChange }: { section: ReportSection | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateSection, isPending } = useUpdateReportSection({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetReportSectionsQueryKey() });
        toast({ title: "Section Updated", description: "The report section has been saved successfully." });
        onOpenChange(false);
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message || "Failed to update section.", variant: "destructive" });
      }
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (section && open) {
      setTitle(section.title);
      setContent(section.content);
    }
  }, [section, open]);

  const handleSave = () => {
    if (section) {
      updateSection({ id: section.id, data: { title, content } });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Section: {section?.key}</DialogTitle>
          <DialogDescription>Update the narrative text content for this section. HTML tags are supported.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditTableDialog({ table, open, onOpenChange }: { table: ReportTable | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateTable, isPending } = useUpdateReportTable({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetReportTablesQueryKey() });
        toast({ title: "Table Updated", description: "The data table has been saved successfully." });
        onOpenChange(false);
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message || "Failed to update table.", variant: "destructive" });
      }
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [footnote, setFootnote] = useState("");
  const [headersText, setHeadersText] = useState("");
  const [rowsText, setRowsText] = useState("");

  useEffect(() => {
    if (table && open) {
      setTitle(table.title);
      setDescription(table.description || "");
      setFootnote(table.footnote || "");
      setHeadersText(table.headers.join(" | "));
      setRowsText(table.rows.map(row => row.join(" | ")).join("\n"));
    }
  }, [table, open]);

  const handleSave = () => {
    if (!table) return;
    
    // Parse the text back into arrays
    const headers = headersText.split("|").map(s => s.trim());
    const rows = rowsText.split("\n")
      .map(row => row.trim())
      .filter(row => row.length > 0)
      .map(row => row.split("|").map(cell => cell.trim()));

    updateTable({ 
      id: table.id, 
      data: { title, description, footnote, headers, rows } 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Table: {table?.key}</DialogTitle>
          <DialogDescription>
            Edit table structure. Use the pipe character <kbd className="mx-1 px-1 bg-muted rounded">|</kbd> to separate columns.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="t-title">Table Title</Label>
              <Input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-desc">Description (Optional)</Label>
              <Input id="t-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headers">Headers (Pipe separated)</Label>
            <Input 
              id="headers" 
              value={headersText} 
              onChange={(e) => setHeadersText(e.target.value)} 
              className="font-mono text-sm"
              placeholder="e.g. Grade | Period One | Period Two | Total"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="rows">Data Rows (One row per line, pipe separated columns)</Label>
            </div>
            <Textarea 
              id="rows" 
              value={rowsText} 
              onChange={(e) => setRowsText(e.target.value)} 
              className="min-h-[250px] font-mono text-sm leading-relaxed whitespace-pre"
              wrap="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="t-foot">Footnote (Optional)</Label>
            <Input id="t-foot" value={footnote} onChange={(e) => setFootnote(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Table
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditStatDialog({ stat, open, onOpenChange }: { stat: ReportStat | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateStat, isPending } = useUpdateReportStat({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetReportStatsQueryKey() });
        toast({ title: "Statistic Updated", description: "The key stat has been saved successfully." });
        onOpenChange(false);
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message || "Failed to update statistic.", variant: "destructive" });
      }
    }
  });

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (stat && open) {
      setLabel(stat.label);
      setValue(stat.value);
      setDescription(stat.description || "");
    }
  }, [stat, open]);

  const handleSave = () => {
    if (stat) {
      updateStat({ id: stat.id, data: { label, value, description } });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Statistic: {stat?.key}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="s-label">Label (e.g. Total Students)</Label>
            <Input id="s-label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-value">Value (e.g. 76,067)</Label>
            <Input id="s-value" value={value} onChange={(e) => setValue(e.target.value)} className="text-lg font-bold" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-desc">Description (Optional)</Label>
            <Textarea id="s-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Stat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
