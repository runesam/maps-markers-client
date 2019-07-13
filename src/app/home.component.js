// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';

import MapComponent from './map.component';
import NewMarkerDialogComponent from './newMarkerDialog.component';

import { getUser } from '../module/promise.module';

type state = {
    error: string,
    open: boolean,
    user: { key: string, markers: Array<{}> },
}

class HomeComponent extends PureComponent<{}, state> {
    state = {
        error: '',
        open: false,
        user: { key: '', markers: [] },
    };

    componentDidMount() {
        getUser()
            .then(({ data: user }) => this.setState({ user }))
            .catch(({ response: error }) => this.setState({ error }));
    }

    toggleDialog = () => this.setState(({ open }) => ({ open: !open }));

    handleAddMarker = (marker: {}) => {
        const { user } = this.state;
        this.toggleDialog();

        const userCopy = JSON.parse(JSON.stringify(user));
        userCopy.markers.push(marker);

        this.setState({ user: userCopy });
    };

    render() {
        const { user: { key, markers }, error, open } = this.state;

        return (
            <Grid container justify="center">
                <NewMarkerDialogComponent
                    open={open}
                    apiKey={key}
                    handleClose={this.toggleDialog}
                    handleAddMarker={this.handleAddMarker}
                />
                <Grid item xs={10}>
                    <Grid container justify="flex-end">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.toggleDialog}
                        >
                            add marker
                        </Button>
                    </Grid>
                    <br />
                    <Grid container justify="center">
                        {error && (
                            <pre>{JSON.stringify(error, undefined, 4)}</pre>
                        )}
                        <MapComponent
                            apiKey={key}
                            markers={markers}
                            center={markers.length ? markers[0] : undefined}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default HomeComponent;
