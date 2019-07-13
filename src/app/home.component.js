// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import MapComponent from './map.component';
import NewMarkerDialogComponent from './newMarkerDialog.component';
import MarkerOperationsComponent from './markerOperations.component';

import { getUser } from '../module/promise.module';

type state = {
    error: string,
    open: boolean,
    marker?: Object,
    user: {
        key: string,
        markers: Array<{
            id: string,
            lat: number,
            lng: number,
            name: string,
        }>,
    },
}

class HomeComponent extends PureComponent<{}, state> {
    state = {
        error: '',
        open: false,
        marker: null,
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

    handleEditMarker = (marker: {}) => {
        this.setState({ marker }, () => {
            this.toggleDialog();
        });
    };

    handleUpdateMarker = (marker: { idToReplace: string }) => {
        const { user } = this.state;
        this.toggleDialog();

        const userCopy = JSON.parse(JSON.stringify(user));
        const markerIndex = userCopy.markers.findIndex(item => item.id === marker.idToReplace);
        if (~markerIndex) {
            userCopy.markers[markerIndex] = marker;
            this.setState({ user: userCopy, marker: null });
        }
    };

    handleDeleteMarker = (marker: { id: string }) => {
        const { user } = this.state;

        const userCopy = JSON.parse(JSON.stringify(user));
        userCopy.markers = userCopy.markers.filter(item => item.id !== marker.id);
        this.setState({ user: userCopy });
    };

    render() {
        const {
            open,
            error,
            marker,
            user: { key, markers },
        } = this.state;

        return (
            <Grid container justify="space-around">
                <NewMarkerDialogComponent
                    open={open}
                    apiKey={key}
                    marker={marker}
                    handleClose={this.toggleDialog}
                    handleAddMarker={this.handleAddMarker}
                    handleUpdateMarker={this.handleUpdateMarker}
                />
                <Grid item xs={5}>
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
                <Grid item xs={6}>
                    <Grid container justify="flex-start">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.toggleDialog}
                        >
                            add marker
                        </Button>
                    </Grid>
                    <br />
                    <Divider light />
                    <br />
                    <Grid container wrap="wrap">
                        {markers.map(item => (
                            <MarkerOperationsComponent
                                key={item.id}
                                marker={item}
                                handleEditMarker={this.handleEditMarker}
                                handleDeleteMarker={this.handleDeleteMarker}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default HomeComponent;
