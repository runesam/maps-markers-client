// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Place from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';

type Props = {
    text: string,
    classes: { root: {} },
};

const MarkerComponent = (props: Props) => {
    const { text, classes } = props;
    return (
        <Grid container alignItems="center" direction="column" className={classes.root}>
            <span>{text}</span>
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
