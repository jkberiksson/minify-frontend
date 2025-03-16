import Header from './components/Header';
import './globals.css';

import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({
    weight: '400',
    subsets: ['latin'],
});

export const metadata = {
    title: 'Minifizer - Shrink, Compress, and Thumbnail Your Videos!',
    description:
        'Say goodbye to bulky videos! Minifizer makes video compression easy and fast, with a thumbnail generated from the first frame—all in one click!',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`bg-gray-200 text-black ${inconsolata.className}`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
