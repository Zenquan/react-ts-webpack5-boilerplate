import React, { lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

export const routes: Array<{
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
  path?: string;
}> = [
  {
    component: lazy(() => import(/* webpackChunkName: "home" */ './pages/home-page')),
    path: '/',
  },
  {
    component: lazy(() => import(/* webpackChunkName: "not-found" */ './pages/not-found')),
  },
];
