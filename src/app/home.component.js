// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';

import MapComponent from './map.component';
import promise from '../module/promise.module';

type state = {
    user: { key: string, markers: [] }
}

class HomeComponent extends PureComponent<{}, state> {
    state = {
        user: {},
    };

    componentDidMount() {
        promise().then(user => this.setState({ user }));
    }

    render() {
        const { user } = this.state;
        return (
            <Grid container justify="center">
                <Grid item xs={10}>
                    <Grid container justify="center">
                        <MapComponent user={user} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default HomeComponent;
