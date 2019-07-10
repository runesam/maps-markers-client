// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MarkerComponent from './marker.component';

type Props = {
    zoom?: number,
    classes: { root: {} },
    user: { key: string, markers: [] },
    center?: { lat: number, lng: number },
};

class MapComponent extends PureComponent<Props> {
    static defaultProps = {
        center: {
            lat: 52.52,
            lng: 13.40,
        },
        zoom: 12,
    };

    render() {
        const {
            zoom,
            center,
            classes,
            user: { key, markers },
        } = this.props;

        return key ? (
            <Grid container justify="center" className={classes.root}>
                <GoogleMapReact
                    defaultZoom={zoom}
                    defaultCenter={center}
                    bootstrapURLKeys={{ key }}
                >
                    {markers.map(marker => (
                        <MarkerComponent
                            lat={marker.lat}
                            lng={marker.lng}
                            key={marker.text}
                            text={marker.text}
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
