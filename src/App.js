import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PenIcon from "@material-ui/icons/Create";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import AddPostForm from "./components/AddPostForm";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./actions/post";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

function App() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                className={classes.container}
              />
              <Typography
                variant="h6"
                color="secondary"
                className={classes.title}
              >
                <Link to="/posts">My Blogs</Link>
              </Typography>
              <Button
                onClick={handleOpen}
                color="primary"
                variant="outlined"
                startIcon={<PenIcon />}
              >
                New Post
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/posts" component={PostsList} />
                <Route exact path="/posts/:id" component={PostDetails} />
              </Switch>
              <Redirect from="/" to="/posts" />
            </Grid>
          </Grid>
          <AddPostForm open={open} handleClose={handleClose} />
        </Container>
      </Router>
    </>
  );
}

export default App;
