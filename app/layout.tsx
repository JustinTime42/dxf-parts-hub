import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
// import { AuthProvider } from '@/contexts/AuthContext';

const meta = {
  title: 'DXF Parts Hub | Create Custom DXF Files for CNC Cutting | Try for Free',
  description: 'DXF Parts Hub - Simplify your CNC cutting process with our extensive library of DXF templates for machine shops. Create custom DXF files for flanges, brackets, squares, and more in seconds. Boost productivity and efficiency with our easy-to-use CNC software. Try it for free!',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['CAD', 'CNC', 'Machine Shops', 'DXF Files', 'CAD Design', 'CNC Cutter Tables', 'CNC Software', 'CNC Productivity'],
    authors: [{ name: 'Justin Schneider', url: 'https:/routeworks.app/' }],
    creator: 'Route Works LLC',
    publisher: 'Route Works LLC',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@_JustinTime42',
      creator: '@_JustinTime42',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-gray-900 loading">
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          {/* <Footer /> */}
          <Suspense>
            <Toaster />
          </Suspense>
          <Footer />
      </body>
    </html>
  );
}
