import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css/normalize.css';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://46d5dabc4f68439cb8f3d5dae12d3742@o460252.ingest.sentry.io/4504446220435456',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
