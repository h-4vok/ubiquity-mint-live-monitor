import React from 'react';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const PageNotFound = () => {
const classes = useStyles();
  return (
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4">
            404
          </Typography>
            Page not found.
          <Typography variant="subtitle1">
          </Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
            startIcon={<Home />}
          >
            Home
          </Button>
        </div>
      </Paper>
  )
}


export default PageNotFound;