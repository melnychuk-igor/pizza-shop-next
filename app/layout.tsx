import { Nunito } from 'next/font/google';

import './globals.css';
import { Providers } from '@/shared/components/shared/providers';
import { cn } from '@/shared/lib/utils';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={cn(nunito.className, 'min-h-full')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
