// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Place from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';

type Props = {
    name: string,
    classes: { root: {} },
};

const MarkerComponent = (props: Props) => {
    const { name, classes } = props;
    return (
        <Grid container alignItems="center" justify="center" direction="column" className={classes.root}>
            <span>{name}</span>
            <Place />
        </Grid>
    );
};

const styles = theme => ({
    root: {
        '& > span': {
            padding: 7,
            fontWeight: 600,
            borderRadius: 8,
            marginBottom: 3,
            color: theme.palette.white.main,
            backgroundColor: theme.palette.black.main,
        },
    },
});

export default withStyles(styles)(MarkerComponent);
