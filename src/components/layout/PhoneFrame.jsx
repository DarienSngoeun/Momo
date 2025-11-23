import { useEffect, useState } from 'react';

export function PhoneFrame({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On actual mobile devices, render without frame
  if (isMobile) {
    return <>{children}</>;
  }

  // On desktop/tablet, show phone frame
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      {/* Phone mockup */}
      <div className="relative">
        {/* Phone frame */}
        <div 
          className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl"
          style={{
            width: '400px',
            height: '820px',
          }}
        >
          {/* Screen bezel */}
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50" />
            
            {/* Status bar icons (left side - time) */}
            <div className="absolute top-2 left-8 z-50 text-xs font-semibold text-gray-900">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            
            {/* Status bar icons (right side - signal, wifi, battery) */}
            <div className="absolute top-2 right-8 z-50 flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 22h20V2z"/>
              </svg>
              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-5 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
                <path d="M20 10h2v4h-2" strokeWidth="2"/>
              </svg>
            </div>

            {/* App content */}
            <div className="absolute inset-0 overflow-hidden flex flex-col">
              {children}
            </div>

            {/* Home indicator (iPhone style) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50" />
          </div>

          {/* Power button */}
          <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l" />
          
          {/* Volume buttons */}
          <div className="absolute left-0 top-28 w-1 h-10 bg-gray-800 rounded-r" />
          <div className="absolute left-0 top-40 w-1 h-10 bg-gray-800 rounded-r" />
        </div>

        {/* Phone shadow */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-30 bg-gray-900" />
      </div>
    </div>
  );
}

