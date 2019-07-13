// @flow
import Grid from '@material-ui/core/Grid';
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import { deleteMarker } from '../module/promise.module';

type props = {
    marker: {
        id: string,
        lat: number,
        lng: number,
        name: string,
    },
    handleEditMarker: Function,
    handleDeleteMarker: Function,
}

export class MarkersOperations extends PureComponent<props> {
    handleEdit = () => {
        const { marker, handleEditMarker } = this.props;
        handleEditMarker(marker);
    };

    handleDelete = () => {
        const { marker, handleDeleteMarker } = this.props;
        deleteMarker(marker)
            .then(res => handleDeleteMarker(res.data));
    };

    render() {
        const { marker: { name, lat, lng } } = this.props;
        return (
            <Grid item xs={6}>
                <Typography variant="body1">{name}</Typography>
                <Typography variant="body2">{`Latitude: ${lat}`}</Typography>
                <Typography variant="body2">{`Longitude: ${lng}`}</Typography>
                <br />
                <Grid container justify="space-between">
                    <Grid item xs={5}>
                        <Button
                            variant="contained"
                            onClick={this.handleEdit}
                        >
                            Edit
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.handleDelete}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <Divider light />
                <br />
            </Grid>
        );
    }
}

export default MarkersOperations;
