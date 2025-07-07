import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';
import FaceTheHydraTracker from './FaceTheHydraTracker.jsx';
import { StrictMode } from 'https://esm.sh/react';

const root = document.getElementById('root');
ReactDOM.render(
  React.createElement(StrictMode, null, React.createElement(FaceTheHydraTracker)),
  root
);
