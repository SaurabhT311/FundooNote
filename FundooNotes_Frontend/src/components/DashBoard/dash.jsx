import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { styles } from "./material-ui.styles";

const useStyles = makeStyles(styles);

export default function MiniDrawer(){
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography>Header</Typography>
          </Toolbar>
        </AppBar>
        {/* empty Toolbar */}
        <Toolbar />
        <div className={classes.container}>
          <Drawer
            variant="permanent"
            // {/* overriding default styles */}
            classes={{
              paper: classes.drawer,
            }}
          >
            Drawer
          </Drawer>
          <main className={classes.main}>Content</main>
        </div>
        <div className={classes.footer}>
          <Typography>Footer</Typography>
        </div>
      </div>
    );
  }