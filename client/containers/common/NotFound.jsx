import React from 'react';

export default function NotFound() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <h1
        className="text-center title"
        style={{
          color: '#f3f3f3',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        404 PAGE NOT FOUND
      </h1>
      <img
        style={{ width: '100%', height: '100%' }}
        src="/media/page-not-found.jpg"
        alt="landing page image"
      />
    </div>
  );
}
