import React, { useState } from 'react';
import './createNotes.css';
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Button from '@material-ui/core/Button';
import NoteOptions from '../noteIcon/iconButtons';
import { InputBase } from '@material-ui/core';
import Service from "../../services/noteService";

const service = new Service();


function CreateNotes(props) {


  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState(props.updateTitle);
  const [description, setDescription] = useState(props.updateDesc);
  const [update, setUpdate] = useState(props.setUpdated);
  const [noteId, setNoteId] = useState(props.editId);

  const clickNote = () => {
    setOpen(false);
  };

  const submitNote = () => {
    if (title === '' && description === '') {
      console.log("Enter data to add");
      setOpen(true);
    }
    let noteData = {
      Title: title,
      Description: description
    }
    const token = localStorage.getItem("token")
    service.createNote(noteData, token).then((result) => {
      console.log("result is:", result.data.data._id);
    }).catch((error) => {
      console.log("error");
    });
    setTitle('');
    setOpen(true);
  }

  return (
    <div className="notes">
      {open ? (
        <div className="contain note_container">
          <div className="note" onClick={clickNote}>
            Take a note...
              </div>

          <IconButton>
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton>
            <BrushOutlinedIcon />
          </IconButton>
          <IconButton>
            <ImageOutlinedIcon />
          </IconButton>
        </div>
      ) : (
        <div
          className="contain container_input"
        >
          <div className="note_title">
            <div className="title Input">
              <InputBase
                placeholder="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="note Input">
              <InputBase
                placeholder="Take a note..."
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="toolbar">
            <NoteOptions
              get={props.get}
              setUpdated={update}
              dialogOff={props.dialogOff}
              editId={props.editId}
            />
            <div className="close-button">
              <Button
                size="small"
                onClick={() => { submitNote() }}
              >Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CreateNotes;


