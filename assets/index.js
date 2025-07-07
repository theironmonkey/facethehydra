
import React, { useState } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';

const heroCardNames = [
  "Axe of the Warmonger", "Bow of the Hunter", "Cloak of the Philosopher", "Lash of the Tyrant", "Spear of the General",
  "The Avenger", "The Champion", "The Destined", "The Explorer", "The General", "The Harvester", "The Hunter",
  "The Philosopher", "The Protector", "The Provider", "The Savant", "The Slayer", "The Tyrant",
  "The Vanquisher", "The Warmonger", "The Warrior"
];

const App = () => {
  const [life, setLife] = useState(20);
  const [drawCount, setDrawCount] = useState(2);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [locked, setLocked] = useState(false);

  const toggleHero = (name) => {
    if (locked) return;
    setSelectedHeroes(prev =>
      prev.includes(name) ? prev.filter(h => h !== name) : prev.length < 2 ? [...prev, name] : prev
    );
  };

  return React.createElement('div', null, [
    React.createElement('h1', { key: 'h' }, 'Face the Hydra Tracker'),
    React.createElement('div', { key: 'heroes' },
      React.createElement('p', null, 'Select up to 2 Hero Cards:'),
      heroCardNames.map(name =>
        React.createElement('button', {
          key: name,
          onClick: () => toggleHero(name),
          style: {
            backgroundColor: selectedHeroes.includes(name) ? '#2563eb' : '#e5e7eb',
            color: selectedHeroes.includes(name) ? 'white' : '#111827'
          }
        }, name)
      )
    ),
    !locked && React.createElement('button', {
      key: 'lock',
      onClick: () => setLocked(true),
      style: { marginTop: '1rem', backgroundColor: '#111827' }
    }, 'Lock Heroes'),
    React.createElement('div', { key: 'life', style: { marginTop: '2rem' } }, [
      React.createElement('p', { key: 'label' }, `Player Life: ${life}`),
      React.createElement('button', { key: 'dec', onClick: () => setLife(life - 1) }, '-'),
      React.createElement('button', { key: 'inc', onClick: () => setLife(life + 1) }, '+')
    ]),
    React.createElement('div', { key: 'start', style: { marginTop: '2rem' } }, [
      React.createElement('label', { key: 'lbl' }, 'Starting Heads: '),
      React.createElement('input', {
        key: 'input',
        type: 'number',
        value: drawCount,
        onChange: e => setDrawCount(parseInt(e.target.value) || 0)
      })
    ])
  ]);
};

createRoot(document.getElementById("root")).render(React.createElement(App));
