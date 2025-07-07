
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import React from 'https://esm.sh/react';

const App = () => {
  return (
    React.createElement('div', { style: { padding: '2rem', fontFamily: 'sans-serif' } },
      React.createElement('h1', { style: { color: 'darkgreen' } }, 'Face the Hydra Tracker'),
      React.createElement('p', null, 'This is a live React-based placeholder.'),
      React.createElement('p', null, 'In a real Vite build, this would be your compiled app.')
    )
  );
};

createRoot(document.getElementById('root')).render(React.createElement(App));
