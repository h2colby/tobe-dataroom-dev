import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface DocumentWrapperProps {
  children: ReactNode;
}

export default function DocumentWrapper({ children }: DocumentWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
