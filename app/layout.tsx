import { Poppins } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { ControllerProvider } from '@/utils/Controller';
import Sidebar from '@/components/Sidebar';
import '@/globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: 'Nova Print',
  description: 'A lightweight 3D printer interface',
  manifest: '/manifest.json',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`flex h-screen w-screen bg-neutral-50 text-neutral-700 ${poppins.className}`}>
      <ControllerProvider>
        <Sidebar />
        <main className="min-h-screen flex-1">{children}</main>
      </ControllerProvider>
    </body>
  </html>
);

export default RootLayout;
