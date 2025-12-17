import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${className}`}>{children}</span>
  );
};

export default Badge;
