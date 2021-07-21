import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CheckoutCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <CardContent>
              <Typography component="h5" variant="h5">
                {props.product.name.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                ${props.product.name.cost}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
