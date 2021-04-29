import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconOptions from '../noteIcon/iconButtons'
import '../displayNotes/displayNotes.css'
import { Button, Dialog, InputBase, Typography } from '@material-ui/core';
// import CreateNotes from '../createNotes/createNotes';
import Service from "../../services/noteService";
const service = new Service();



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


export default function UpdateNotes(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState("");
    const [update, setUpdate] = useState(false)
    const [description, setDescription] = useState("");
    const [noteId, setNoteId] = useState("");

    useEffect(() => {
        // e.stopPropagation();
        // updateNote();
            setUpdate(props.setEdited)
            setTitle(props.noteCard.Title);
            console.log("title:",props.noteCard.Title);
            setNoteId(props.noteCard._id);
            console.log("id is:",props.noteCard._id);
            setDescription(props.noteCard.Description);
            console.log("desc:",props.noteCard.Description);
          }, [props]);

    // })


    const updateNote = () => {
        if(title===' ' && description ===' '){
            console.log("enter some data");
            return null;
        }
        let noteData = {
            Title: title,
            Description: description
        }
        if(props.setEdited){
        console.log("notedata", noteData);
        console.log("id is:",noteId);
        service.updateNote(noteData,noteId).then((result) => {
        console.log("note is updated", result);
        props.get();
        }).catch((error) => {
            console.log("error", error);
        })
    
        setTitle('');
        setOpen(true);}
    }


    return (
        <Dialog
            open={props.open}
            onClose={props.close}>
            <div className="note_title">
                <div className="title Input">
                    <InputBase className={classes.textField}
                        placeholder="Title"
                        fullWidth
                        multiline
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="note Input">
                    <InputBase
                        className={classes.textField}
                        placeholder="Take a note..."
                        fullWidth
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className="toolbar">
                <IconOptions
                    // get={props.get}
                    // noteId={props._id}
                />
                <div className="close-button">
                    <Button
                        size="small"
                        onClick={() => {
                            updateNote();
                        }}>
                        Close
                     </Button>
                </div> 
                </div>                    
        </Dialog>
    );
}


