import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconOptions from '../noteIcon/iconButtons'
import './displayNotes.css'
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

    textField: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px"
    },
    dialogBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
      dialogOptions: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      },
}));


export default function DisplayAllNotes(props) {
    const classes = useStyles();

    return (
        <div className="displayNotes">
            <div className="notes_container">
                {props.noteShow.map((result) => (
                    <div className="note_box">
                        <div className="input_box">
                            <h3 className={classes.textField}>{result.Title}</h3>
                            <Typography className={classes.textField}>{result.Description}</Typography>
                        </div>
                        <div className="option_container">
                            <div className="icon_option">
                                <IconOptions />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


