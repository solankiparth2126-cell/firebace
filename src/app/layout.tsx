import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MoneyFlow Pro | Personal Accounting',
  description: 'Manage your finances with AI-driven insights',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10">
              <SidebarTrigger />
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  JS
                </div>
              </div>
            </header>
            <main className="p-6 md:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}