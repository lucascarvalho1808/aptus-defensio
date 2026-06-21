import type { Metadata } from 'next';

import AppShell from '@/components/layout/AppShell';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aptus Defensio',
  description: 'Sistema de gestão acadêmica Aptus Defensio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
