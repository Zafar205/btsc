import React from 'react';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
  showLocation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  showNavigation = true,
  showLocation = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav 
        title={title} 
        subtitle={subtitle}
        showNavigation={showNavigation}
        showLocation={showLocation}
      />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
