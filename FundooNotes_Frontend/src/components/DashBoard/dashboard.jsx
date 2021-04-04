import React from 'react';
import clsx from 'clsx';
import './dashboard.css';
import { makeStyles, themeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from "@material-ui/icons/Search";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },


  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    border: '1px solid lightgray',
  },


  hide: {
    display: 'none',
  },


  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
  },


  drawerOpen: {
    width: "230px",
    borderRight: "lightgray solid 1px",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    borderRight: "none",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  drawerButton: {
    borderTopRightRadius: "80px",
    borderBottomRightRadius: "80px",
    borderTopLeftRadius: "80px",
    borderBottomLeftRadius: "80px",
  },

}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState(true);
  const [reminder, setReminder] = React.useState(false);
  const [editLabel, setEditLabel] = React.useState(false);
  const [archive, setArchive] = React.useState(false)
  const [bin, setBin] = React.useState(false)

  const drawerOpen = () => {
    setOpen(true);
  };

  const drawerClose = () => {
    setOpen(false);
  };

  const drawerOpenClose = () => {
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="white"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            onClick={drawerOpenClose}
            position="fixed"
            edge="start"
          >
            <MenuIcon />
          </IconButton>


          <div className="header__logo">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt=""
            />
          </div>


          <div className="header__title">Fundoo</div>

          <div className="header__input">
            <SearchIcon className="header__inputButton" />
            <input placeholder="Search" type="text" />
          </div>


        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        onMouseOver={drawerOpen}
        onMouseLeave={drawerClose}
        color="transparent"

        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className="Drawer">
          <List>
            <div className="drawerButton">
              <ListItem button
                className={classes.drawerButton}
                style={{ backgroundColor: note ? "#feefc3" : "transparent" }}>

                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Notes" />
              </ListItem>
            </div>



            <div className="drawerButton">
              <ListItem button
                className={classes.drawerButton}
                style={{ backgroundColor: reminder ? "#feefc3" : "transparent" }}>

                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Reminder" />
              </ListItem>
            </div>

            <div className="drawerButton">
              <ListItem button
                className={classes.drawerButton}
                style={{ backgroundColor: editLabel ? "#feefc3" : "transparent" }}>

                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Edit labels" />
              </ListItem>
            </div>


            <div className="drawerButton">
              <ListItem
                button
                className={classes.drawerButton}
                style={{ backgroundColor: archive ? "#feefc3" : "transparent" }}>
                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Archive" />
              </ListItem>
            </div>


            <div className="drawerButton">
              <ListItem
                button
                className={classes.drawerButton}
                style={{ backgroundColor: bin ? "#feefc3" : "transparent" }}>
                <ListItemIcon className="drawer_icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d=" M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Bin" />
              </ListItem>
            </div>

          </List>
        </div>

      </Drawer>
      <div>
      </div>
    </div>
  );
}