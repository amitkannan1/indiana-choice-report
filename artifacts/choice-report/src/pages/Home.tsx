import { useGetReportMetadata, useGetReportSections, useGetReportTables, useGetReportStats } from "@workspace/api-client-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ReportTableDisplay } from "@/components/report/ReportTableDisplay";
import { ReportStatDisplay } from "@/components/report/ReportStatDisplay";
import { Loader2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: metadata, isLoading: metaLoading } = useGetReportMetadata();
  const { data: sections = [], isLoading: sectionsLoading } = useGetReportSections();
  const { data: tables = [], isLoading: tablesLoading } = useGetReportTables();
  const { data: stats = [], isLoading: statsLoading } = useGetReportStats();

  const isLoading = metaLoading || sectionsLoading || tablesLoading || statsLoading;

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
          <p className="text-lg font-medium text-primary">Loading Annual Report Data...</p>
        </div>
      </PublicLayout>
    );
  }

  // Sort sections
  const sortedSections = [...sections].sort((a, b) => a.sectionOrder - b.sectionOrder);

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          {/* landing page hero official government building architecture */}
          <img 
            src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 space-y-6 max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              {metadata?.reportYear} Academic Year
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-serif leading-tight">
              {metadata?.reportTitle || "Annual Choice Report"}
            </h1>
            {metadata?.reportDescription && (
              <p className="text-lg sm:text-xl text-primary-foreground/80 font-light max-w-2xl">
                {metadata.reportDescription}
              </p>
            )}
            {metadata?.publishedDate && (
              <p className="text-sm text-primary-foreground/60">
                Published: {metadata.publishedDate}
              </p>
            )}
          </div>
          <div className="hidden lg:block flex-shrink-0 relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl"></div>
            <img 
              src={`${import.meta.env.BASE_URL}images/indiana-seal.png`} 
              alt="Seal" 
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-start relative">
        
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 self-start">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-bold text-primary mb-4 font-sans uppercase tracking-wider text-sm">Table of Contents</h3>
            <nav className="space-y-1 relative border-l-2 border-muted ml-2">
              {sortedSections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#section-${section.key}`}
                  className="block pl-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-r-md transition-colors font-medium"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Sections Content */}
        <div className="flex-1 max-w-4xl space-y-24 pb-24">
          {sortedSections.map((section, index) => {
            const sectionStats = stats.filter(s => s.sectionKey === section.key).sort((a, b) => a.statOrder - b.statOrder);
            const sectionTables = tables.filter(t => t.sectionKey === section.key).sort((a, b) => a.tableOrder - b.tableOrder);

            return (
              <motion.section 
                key={section.id} 
                id={`section-${section.key}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-28"
              >
                <div className="flex items-center gap-4 mb-8 border-b pb-4">
                  <div className="bg-accent/20 text-accent-foreground font-bold h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <h2 className="text-3xl font-bold text-primary m-0">{section.title}</h2>
                </div>

                {/* Render Stats first if any */}
                {sectionStats.length > 0 && (
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${sectionStats.length > 2 ? 'lg:grid-cols-3' : ''} gap-6 mb-10`}>
                    {sectionStats.map(stat => (
                      <ReportStatDisplay key={stat.id} stat={stat} />
                    ))}
                  </div>
                )}

                {/* Render Text Content */}
                {section.content && (
                  <div 
                    className="prose prose-lg max-w-none text-foreground/80 prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary prose-strong:text-foreground prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3"
                    dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br/>') }}
                  />
                )}

                {/* Render Tables */}
                {sectionTables.length > 0 && (
                  <div className="mt-12 space-y-12">
                    {sectionTables.map(table => (
                      <ReportTableDisplay key={table.id} table={table} />
                    ))}
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
