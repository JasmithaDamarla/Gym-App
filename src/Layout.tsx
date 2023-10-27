import { ReactNode } from 'react';
import Header from './components/HomePage';
import Footer from './components/HomePage'; 

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
