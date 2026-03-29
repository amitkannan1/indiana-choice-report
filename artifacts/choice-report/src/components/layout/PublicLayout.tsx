import { ReactNode } from "react";
import { Link } from "wouter";
import { Download, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <img 
                src={`${import.meta.env.BASE_URL}images/indiana-seal.png`} 
                alt="Indiana State Seal" 
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
                Indiana Department of Education
              </span>
              <h1 className="text-lg sm:text-xl font-bold font-serif text-white m-0">
                Choice Scholarship Program
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.in.gov/doe/files/2024-2025-Annual-Choice-Report.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="secondary" className="font-semibold shadow-md hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download Original PDF
              </Button>
            </a>
            <Link href="/admin" className="text-primary-foreground/70 hover:text-white text-sm font-medium transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}images/indiana-seal.png`} 
            alt="Indiana State Seal" 
            className="h-12 w-12 object-contain opacity-50 grayscale"
          />
          <p>
            Data contained in this report was provided by IDOE's Office of Information Technology.
            <br />
            For questions concerning the Choice Scholarship Program, please email choiceschool@doe.in.gov.
          </p>
          <div className="mt-4 flex gap-4 text-xs">
            <Link href="/admin" className="hover:text-primary hover:underline">Admin Portal</Link>
            <span>&bull;</span>
            <a href="https://www.in.gov/doe/students/indiana-choice-scholarship-program/" target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">Official IDOE Website</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
