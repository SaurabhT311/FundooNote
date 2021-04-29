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



// const useStyles = makeStyles((theme) => ({

//     textField: {
//         wordWrap: "break-word",
//         margin: "4px 4px 4px 4px"
//     },
//     dialogBox: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     dialogOptions: {
//         width: "100%",
//         display: "flex",
//         justifyContent: "flex-start",
//     },
// }));


export default function ArchiveNotes(props) {

    // const classes = useStyles();
    // const [open, setOpen] = useState(false);
    // const [update, setUpdate] = useState(false);
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [noteId, setNoteId] = useState("");
    // const [data, setData] = useState([]);
    const [archiveNote,setArchiveNote]=useState([])
    let archive=true;

    useEffect(()=>{
        getArchiveNote();
    },[])

    // const dialogOpen = (e, data) => {
    //     e.stopPropagation();
    //     setUpdate(true);
    //     setTitle(data.Title);
    //     console.log("title:", data.Title);
    //     setDescription(data.Description)
    //     console.log("desc:", data.Description);
    //     setOpen(true);
    //     setNoteId(data._id);
    //     console.log("id:",data._id);
    // }

    // const dialogClose = () => {
    //     setOpen(false);
    // }


    const getArchiveNote=()=>{
        service.getNote().then((data)=>{
            let notedata=data.data.data;
            let arr=notedata.reverse();
            console.log("archive list is:",arr);
            setArchiveNote(arr);
        }).catch((error)=>{
            console.log("error");
        })
    }      
    //    setTitle('');
    //     setNoteId('');
        // setOpen(true);


    // const Note = () => {
    //     return (
    //         <div className="notes_container">
    //             {data
    //                 .filter((data) => data.isArchive === true)
    //                 .map((data)=>(
    //                     <div className="note_box">
    //                         <div className="input_box" onClick={(e) => dialogOpen(e, data)}>
    //                             {/* <div className="input_box" onClick={(e) => dialogOpen(result)}> */}
    //                             <h3 className={classes.textField}>{data.Title}</h3>
    //                             <Typography className={classes.textField}>{data.Description}</Typography>
    //                         </div>
    //                         <div className="option_container">
    //                             <div className="icon_option">
    //                                 <IconOptions
    //                                     setUpdated={update}
    //                                     updateId={data._id}
    //                                     get={getArchiveNote}
    //                                     archive={archive}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
                    
    //         </div>
    //     );
    // }

    return (

        <div className="mainContent">
            {/* <div className="displayNotes"> */}
                {/* <Note /> */}
            {/* </div> */}
            <div>
            <DisplayAllNotes
               noteCard={archiveNote}
               getNote={getArchiveNote}
               archive={archive}
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

                            
