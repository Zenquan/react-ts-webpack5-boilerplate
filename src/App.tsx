import React, { Suspense } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import { routes } from './router';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<div className="loading">loading...</div>}>
        <Switch>
          {routes &&
            routes.map((route: any, index: number) => {
              const { path, component } = route;
              return <Route path={path} component={component} key={index} />;
            })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
