import { Poppins } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import Sidebar from '@/components/Sidebar';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
    title: 'Nova Print',
    description: 'An lightweight and intuitive alternative to Duet Web Control',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body className={`flex h-screen w-screen bg-neutral-50 text-neutral-700 ${poppins.className}`}>
            <Sidebar />
            <main className="min-h-screen flex-1">{children}</main>
        </body>
    </html>
);

export default RootLayout;
