import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  session = null,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

