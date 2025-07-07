
import React, { useState, useEffect } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';

const heroCardNames = [
  "Axe of the Warmonger", "Bow of the Hunter", "Cloak of the Philosopher", "Lash of the Tyrant", "Spear of the General",
  "The Avenger", "The Champion", "The Destined", "The Explorer", "The General", "The Harvester", "The Hunter",
  "The Philosopher", "The Protector", "The Provider", "The Savant", "The Slayer", "The Tyrant",
  "The Vanquisher", "The Warmonger", "The Warrior"
];

const initialDeck = [
  ...Array(11).fill({ name: "Hydra Head", type: "Head" }),
  ...Array(5).fill({ name: "Disorienting Glower", type: "Sorcery" }),
  ...Array(5).fill({ name: "Distract the Hydra", type: "Sorcery" }),
  ...Array(4).fill({ name: "Hydra’s Impenetrable Hide", type: "Sorcery" }),
  ...Array(3).fill({ name: "Neck Tangle", type: "Sorcery" }),
  ...Array(6).fill({ name: "Unified Lunge", type: "Sorcery" })
];

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getCardImage = (name) =>
  `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}&format=image`;

const App = () => {
  const [life, setLife] = useState(() => parseInt(localStorage.getItem('life')) || 20);
  const [heroes, setHeroes] = useState(() => JSON.parse(localStorage.getItem('heroes') || '[]'));
  const [tapped, setTapped] = useState(() => JSON.parse(localStorage.getItem('tapped') || '{}'));
  const [locked, setLocked] = useState(() => !!localStorage.getItem('locked'));
  const [deck, setDeck] = useState(() => shuffle(initialDeck));
  const [heads, setHeads] = useState([]);
  const [graveyard, setGraveyard] = useState([]);

  useEffect(() => localStorage.setItem('life', life), [life]);
  useEffect(() => localStorage.setItem('heroes', JSON.stringify(heroes)), [heroes]);
  useEffect(() => localStorage.setItem('tapped', JSON.stringify(tapped)), [tapped]);
  useEffect(() => {
    if (locked) localStorage.setItem('locked', 'true');
    else localStorage.removeItem('locked');
  }, [locked]);

  const toggleHero = (name) => {
    if (locked) return;
    setHeroes(prev =>
      prev.includes(name)
        ? prev.filter(h => h !== name)
        : prev.length < 2 ? [...prev, name] : prev
    );
  };

  const toggleTap = (name) => {
    setTapped(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const drawCard = () => {
    if (deck.length === 0) return;
    const [top, ...rest] = deck;
    setDeck(rest);
    if (top.type === "Head") {
      setHeads(h => [...h, top]);
    } else {
      setGraveyard(g => [...g, top]);
    }
  };

  const killHead = (index) => {
    const killed = heads[index];
    const newHeads = heads.filter((_, i) => i !== index);
    const [d1, d2, ...rest] = deck;
    const toAdd = [d1, d2].filter(Boolean);

    setHeads([...newHeads, ...toAdd.filter(c => c.type === 'Head')]);
    setGraveyard(prev => [...prev, killed, ...toAdd.filter(c => c.type === 'Sorcery')]);
    setDeck(rest);
  };

  const resetGame = () => {
    setLife(20);
    setHeroes([]);
    setTapped({});
    setLocked(false);
    setDeck(shuffle(initialDeck));
    setHeads([]);
    setGraveyard([]);
    localStorage.clear();
  };

  return React.createElement('div', { className: 'container' }, [
    React.createElement('h1', { key: 'h1' }, 'Face the Hydra'),

    React.createElement('div', { key: 'heroes' }, [
      React.createElement('h2', null, 'Choose Up to 2 Heroes'),
      heroCardNames.map((name) =>
        (!locked || heroes.includes(name)) &&
        React.createElement('div', {
          key: name,
          className: 'card hero',
          onClick: () => toggleHero(name)
        }, [
          React.createElement('img', {
            src: getCardImage(name),
            className: tapped[name] ? 'tapped' : '',
            alt: name
          }),
          React.createElement('p', null, name),
          locked &&
            React.createElement('button', {
              onClick: (e) => {
                e.stopPropagation();
                toggleTap(name);
              }
            }, tapped[name] ? 'Untap' : 'Tap')
        ])
      ),
      !locked &&
        React.createElement('button', {
          onClick: () => setLocked(true),
          className: 'btn'
        }, 'Lock Heroes')
    ]),

    React.createElement('div', { key: 'life' }, [
      React.createElement('h2', null, `Life: ${life}`),
      React.createElement('button', { onClick: () => setLife(l => l - 1) }, '-'),
      React.createElement('button', { onClick: () => setLife(l => l + 1) }, '+')
    ]),

    React.createElement('div', { key: 'draw' }, [
      React.createElement('button', { onClick: drawCard }, 'Hydra’s Turn')
    ]),

    React.createElement('div', { key: 'heads' }, [
      React.createElement('h2', null, 'Hydra Heads'),
      heads.length === 0 ? React.createElement('p', null, 'No heads') :
        heads.map((h, i) =>
          React.createElement('div', { key: i, className: 'card' }, [
            React.createElement('p', null, h.name),
            React.createElement('button', { onClick: () => killHead(i) }, 'Kill')
          ])
        )
    ]),

    React.createElement('div', { key: 'graveyard' }, [
      React.createElement('h2', null, 'Graveyard'),
      graveyard.map((c, i) =>
        React.createElement('div', { key: i, className: 'card gray' }, c.name)
      )
    ]),

    React.createElement('button', {
      onClick: resetGame,
      className: 'btn reset'
    }, 'Reset Game')
  ]);
};

createRoot(document.getElementById("root")).render(React.createElement(App));
