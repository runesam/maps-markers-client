// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const palette = {
    white: { main: '#FFFFFF' },
    black: { main: '#000000' },
    grayed: { main: '#aaaaaa' },
    primary: { main: '#004c93' },
    secondary: { main: '#c70000' },
};

const animateMe = {
    '-webkit-transition': 'all 300ms ease-out 0s',
    '-moz-transition': 'all 300ms ease-out 0s',
    '-o-transition': 'all 300ms ease-out 0s',
    transition: 'all 300ms ease-out 0s',
};

export const themeProperties = {
    palette,
    animateMe,
    typography: {
        useNextVariants: true,
        h4: { color: palette.white.main },
        h6: { color: palette.grayed.main },
        body1: { color: palette.white.main },
        body2: { color: palette.grayed.main },
    },
    overrides: {
        MuiDialog: {
            paper: {
                margin: 15,
                padding: 16,
                width: '100%',
            },
        },
        MuiDivider: {
            light: {
                backgroundColor: palette.grayed.main,
            },
        },
    },
};

const theme = createMuiTheme(themeProperties);

const Theme = ({ children }: { children: typeof React.Children }) => (
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
);

Theme.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Theme;
