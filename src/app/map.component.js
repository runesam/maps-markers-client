// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MarkerComponent from './marker.component';

type Props = {
    markers: [],
    zoom?: number,
    apiKey: string,
    classes: { root: {} },
    center?: { lat: number, lng: number },
};

class MapComponent extends PureComponent<Props> {
    static defaultProps = {
        center: {
            lat: 51.1657,
            lng: 10.4515,
        },
        zoom: 7,
    };

    render() {
        const {
            zoom,
            apiKey,
            center,
            classes,
            markers,
        } = this.props;

        return apiKey ? (
            <Grid container justify="center" className={classes.root}>
                <GoogleMapReact
                    center={center}
                    defaultZoom={zoom}
                    bootstrapURLKeys={{ key: apiKey }}
                >
                    {markers.map(marker => (
                        <MarkerComponent
                            key={marker.id}
                            lat={marker.lat}
                            lng={marker.lng}
                            name={marker.name}
                        />
                    ))}
                </GoogleMapReact>
            </Grid>
        ) : (<CircularProgress />);
    }
}

const styles = () => ({
    root: {
        height: '50vh',
        width: '100%',
    },
});

export default withStyles(styles)(MapComponent);
