import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconOptions from '../noteIcon/iconButtons';
import '../displayNotes/displayNotes.css'
import { Typography } from '@material-ui/core';
import UpdateNotes from '../updateNotes/updateNote';



const useStyles = makeStyles((theme) => ({
    textField: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px"
    },
}));


export default function DisplayAllNotes(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [noteId, setNoteId] = useState("");
    const [clr, setClr] = useState("#fafafa");
    const [note, setNote] = useState({})


    const handleOpen = (result) => {
        setNote(result);
        console.log("result is:", result);
        setOpen(true);
        setNoteId(result._id);
        setEdit(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="notes_container">
            {props.noteShow
                .map((result) => (
                    <div className="note_box">
                        <div className="input_box" onClick={(e) => handleOpen(result)}>
                            <h3 className={classes.textField}>{result.Title}</h3>
                            <Typography className={classes.textField}>{result.Description}</Typography>
                        </div>
                        <div className="option_container">
                            <div className="icon_option"
                                onMouseEnter={(e) => {
                                    setClr(clr);
                                }}
                            >
                                <IconOptions
                                    noteCard={result}
                                    editId={result._id}
                                    setEdited={edit}
                                    setClr={setClr}
                                />
                            </div>

                        </div>
                    </div>
                ))}
            <div>
                <UpdateNotes
                    open={open}
                    noteCard={note}
                    setEdited={edit}
                    editId={noteId}
                    close={handleClose}
                    get={props.get}
                // title={title}
                // description={description}
                />
            </div>
        </div>
    );
}