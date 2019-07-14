// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import MapComponent from './map.component';
import { getGeoForAddress, addMarker, updateMarker } from '../module/promise.module';

type state = {
    error: string,
    address: string,
    searching: boolean,
    markers: Array<{}>,
};

type props = {
    open: boolean,
    apiKey: string,
    handleClose: Function,
    marker?: { id: string },
    handleAddMarker: Function,
    handleUpdateMarker: Function,
    classes: { root: {}, error: {} },
};

export class NewMarkerDialog extends PureComponent<props, state> {
    static defaultProps = {
        marker: null,
    };

    state = {
        error: '',
        markers: [],
        address: '',
        searching: false,
    };

    onDialogClose = () => this.setState({
        error: '',
        markers: [],
        address: '',
        searching: false,
    });

    handleChange = (e: { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSearch = () => {
        const { address } = this.state;
        this.setState({ searching: true }, () => {
            getGeoForAddress(address)
                .then(({ data: markers }) => this.setState({ markers, error: '' }))
                .catch(({ response: error }) => this.setState({ error, markers: [] }))
                .finally(() => this.setState({ searching: false }));
        });
    };

    handleAddAddress = () => {
        const { markers } = this.state;
        const { handleAddMarker } = this.props;

        addMarker(markers[0])
            .then(({ data }) => handleAddMarker(data))
            .catch(({ response: error }) => this.setState({ error, markers: [] }));
    };

    handleUpdateAddress = () => {
        const { marker } = this.props;
        const { markers } = this.state;

        if (marker && marker.id) {
            const { handleUpdateMarker } = this.props;
            const markerToUpdate = {
                ...markers[0],
                idToReplace: marker.id,
            };
            updateMarker(markerToUpdate)
                .then(({ data }) => handleUpdateMarker(data))
                .catch(({ response: error }) => this.setState({ error, markers: [] }));
        }
    };

    render() {
        const {
            open,
            apiKey,
            marker,
            classes,
            handleClose,
        } = this.props;

        const {
            error,
            markers,
            address,
            searching,
        } = this.state;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.root}
                onExiting={this.onDialogClose}
                aria-labelledby="new marker dialog"
                aria-describedby="new marker dialog input"
            >
                <Grid container direction="column">
                    <Typography color="primary" variant="h6">
                        {marker ? 'Edit Marker' : 'New Marker'}
                    </Typography>
                    <TextField
                        name="address"
                        label="address"
                        margin="normal"
                        value={address}
                        disabled={searching}
                        onChange={this.handleChange}
                        placeholder="please type the address here"
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        disabled={searching || !address}
                        onClick={this.handleSearch}
                    >
                        search
                    </Button>
                    {Boolean(markers.length) && (
                        <>
                            <br key="newLine" />
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={marker ? this.handleUpdateAddress : this.handleAddAddress}
                            >
                                {`${marker ? 'Update' : 'Add'} this address`}
                            </Button>
                        </>
                    )}
                    {error && (
                        <>
                            <br />
                            <pre className={classes.error}>
                                {JSON.stringify(error, undefined, 4)}
                            </pre>
                        </>
                    )}
                    <br />
                    <MapComponent
                        apiKey={apiKey}
                        markers={markers}
                        center={markers[0]}
                    />
                </Grid>
            </Dialog>
        );
    }
}

const styles = theme => ({
    root: {
        '& label': {
            color: theme.palette.primary.main,
        },
    },
    error: {
        maxWidth: '100%',
        overflow: 'scroll',
        color: theme.palette.secondary.main,
    },
});

export default withStyles(styles)(NewMarkerDialog);
