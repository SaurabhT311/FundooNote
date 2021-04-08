import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import { IconButton } from '@material-ui/core';
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from '@material-ui/icons/Archive';
import './iconButtons.css';

const useStyles = makeStyles((theme) => ({

    optionButton: {
        width: "100%"
    },
    button: {
        padding: "10px",
    },
    

}));

function IconButtons() {
    const classes = useStyles();
    return (
        <div className={classes.optionButton}>
            <div className='optionfield'>
                <IconButton className={classes.button} title="Remind me">
                    <AddAlertIcon  />
                </IconButton>
                <IconButton className={classes.button} title="collaborator">
                    <PersonAddIcon />
                </IconButton>
                <IconButton className={classes.button} title="change color">
                    <ColorLensOutlinedIcon />
                </IconButton>
                <IconButton className={classes.button} title="Add image">
                    <ImageOutlinedIcon />
                </IconButton>
                <IconButton className={classes.button} title="Archive">
                    <ArchiveIcon/>
                </IconButton>
                <IconButton className={classes.button} title="More">
                    <MoreVertOutlinedIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default IconButtons;