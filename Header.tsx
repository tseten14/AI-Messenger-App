
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <h1 className="text-2xl font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091A9.117 9.117 0 0112.25 12a9.117 9.117 0 01-3.203-.568l-3.543 3.091V16.658c-.34-.02-.68-.045-1.02-.072A1.99 1.99 0 013.75 14.9v-4.285c0-.97.616-1.813 1.5-2.097V6.5c0-1.02.823-1.875 1.875-1.875h10.5c1.052 0 1.875.855 1.875 1.875v2.011z" />
        </svg>
        Sherpa Chat
      </h1>
    </header>
  );
};

export default Header;
