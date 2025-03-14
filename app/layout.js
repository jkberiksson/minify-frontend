import './globals.css';

export const metadata = {
    title: 'Minify - Care of Carl',
    description: 'An application to compress your videos easily and efficiently.',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className='bg-gray-200 text-black'>{children}</body>
        </html>
    );
}
