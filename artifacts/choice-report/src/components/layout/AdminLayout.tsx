import { ReactNode } from "react";
import { Link } from "wouter";
import { LogOut, LayoutDashboard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
  username?: string;
}

export function AdminLayout({ children, username }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-card text-card-foreground shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-md">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold m-0 font-sans">Report Admin Portal</h1>
              <p className="text-xs text-muted-foreground">Manage Content & Settings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
              <FileText className="h-4 w-4" />
              View Live Report
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                {username}
              </span>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/api/logout'}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
