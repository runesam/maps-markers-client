// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import RootContainer from './app';

declare var module: { hot: { accept: function } };
declare var document: {
    createElement: function,
    body: {
        appendChild: function,
        style: {
            margin: string,
            padding: string,
            backgroundColor: string,
        },
    },
};

const appDom = document.createElement('div');

document.body.appendChild(appDom);
document.body.style.margin = '0px';
document.body.style.padding = '15px';
document.body.style.backgroundColor = '#1d1d1d';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        appDom,
    );
};

render(RootContainer);

if (module.hot) {
    module.hot.accept('./app/index.js', () => {
        const NextRootContainer = require('./app').default;
        render(NextRootContainer);
    });
}
