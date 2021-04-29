import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconOptions from '../noteIcon/iconButtons'
import '../displayNotes/displayNotes.css'
import DisplayAllNotes from '../displayNotes/displayNotes';
import { Button, Dialog, InputBase, Typography } from '@material-ui/core';
// import CreateNotes from '../createNotes/createNotes';
import Service from "../../services/noteService";
// import UpdateNotes from '../updateNotes/updateNote';
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


export default function TrashNotes(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [noteId, setNoteId] = useState("");
    const [data, setData] = useState([]);
    const [trash,setTrash]=useState(true)

    useEffect(()=>{
        getTrashNote();
    },[])

    const dialogOpen = (e, result) => {
        e.stopPropagation();
        setUpdate(true);
        setTitle(result.Title);
        console.log("title:", result.Title);
        setDescription(result.Description)
        console.log("desc:", result.Description);
        setOpen(true);
        setNoteId(result._id);
        // console.log("id:",result._id);
    }

    const dialogClose = () => {
        setOpen(false);
    }


    const getTrashNote=()=>{
        service.getNote().then((result)=>{
            let data=result.data.data;
            let arr=data.reverse();
            console.log("archive list is:",arr);
            setData(arr);
        }).catch((error)=>{
            console.log("error");
        })
    }      
       setTitle('');
        setNoteId('');
        setOpen(true);


    const Note = () => {
        return (
            <div className="notes_container">
                {data
                    .filter((result) => result.isTrash === false)
                    .map((result)=>(
                        <div className="note_box">
                            <div className="input_box" onClick={(e) => dialogOpen(e, result)}>
                                {/* <div className="input_box" onClick={(e) => dialogOpen(result)}> */}
                                <h3 className={classes.textField}>{result.Title}</h3>
                                <Typography className={classes.textField}>{result.Description}</Typography>
                            </div>
                            <div className="option_container">
                                <div className="icon_option">
                                    <IconOptions
                                        setUpdated={update}
                                        updateId={result._id}
                                        get={getTrashNote}
                                        trash={trash}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    
            </div>
        );
    }

    return (

        <div className="mainContent">
            <div className="displayNotes">
                <Note />
            </div>
            <div>
            <DisplayAllNotes
                setUpdated={update}
                get={getTrashNote}
                dialogOff={dialogClose}
                updateTitle={title}
                updateDesc={description}
                trash={props.trash}
                className={classes.dialogBox}
            />
            </div>
        </div>
    );
    }



            /* <div>
                <UpdateNotes
                result={note}
                open={update}
                close={dialogClose}
                get={props.get}
                    />
            </div> */
            /* <div>
                <Dialog
                    open={open}
                    onClose={dialogClose}>
                    <div className="note_title">
                        <div className="title Input">
                            <InputBase className={classes.textField}
                                placeholder="Title"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="note Input">
                            <InputBase
                                className={classes.textField}
                                placeholder="Take a note..."
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="toolbar">
                        <IconOptions
                            get={props.get}
                        />
                        <div className="close-button">
                            <Button
                                size="small"
                                onClick={() => {
                                    updateNote()
                                }}
                            >
                                Close
                                 </Button>
                        </div>
                    </div>
                </Dialog>
            </div> */
//         </div>
//         </div>
//     );
// }

                            
