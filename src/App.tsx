import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
// import './App.css';
import AppRouter from './router';

const App: FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default hot(App);
