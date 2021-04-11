import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import { IconButton } from '@material-ui/core';
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from '@material-ui/icons/Archive';
import './iconButtons.css';
import ColorPalette from './ColorPalette';

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
                    <AddAlertIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.button} title="collaborator">
                    <PersonAddIcon fontSize="small"/>
                </IconButton>
                <IconButton className={classes.button} title="change color">
                    <ColorPalette />
                </IconButton>
                <IconButton className={classes.button} title="Add image">
                    <ImageOutlinedIcon fontSize="small"/>
                </IconButton>
                <IconButton className={classes.button} title="Archive">
                    <ArchiveIcon fontSize="small"/>
                </IconButton>
                <IconButton className={classes.button}  title="More">
                    <MoreVertOutlinedIcon fontSize="small" />
                </IconButton>

            </div>
        </div>
    )
}

export default IconButtons;






