import React, { useEffect } from 'react';

export default function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  return (
    <div className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
}
