import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
    title: 'Nova Print',
    description: 'An lightweight and intuitive alternative to Duet Web Control',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={nunito.className}>{children}</body>
        </html>
    );
}
