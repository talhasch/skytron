import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { history, configuredStore } from './store';

import 'typeface-ibm-plex-sans';
import './app.global.scss';


// Prevent dropped file from opening in window
document.addEventListener(
  'dragover',
  event => {
    event.preventDefault();
    return false;
  },
  false
);

document.addEventListener(
  'drop',
  event => {
    event.preventDefault();
    return false;
  },
  false
);


const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root')
  );
});

