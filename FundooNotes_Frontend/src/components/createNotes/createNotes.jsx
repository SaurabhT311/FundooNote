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

 function CreateNotes(){
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const clickNote = () => {
      setOpen(false);
    };

    const submitNote = () => {
      if(title=='' )
      {
        console.log("Enter data to add");
        setOpen(false);
      }
      else{
        const token=localStorage.getItem("token");
        console.log("token is", token);
        console.log("title:", title);
        console.log("data:",description);
        let data={
          Title:title,
          Description:description
        }
        console.log("data is:",data);
        service.createNote(data,token).then((result)=>{
            console.log("result is:",result);
        }).catch((error)=>{
          console.log("error");
        });
      } 
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
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="note Input">
                  <InputBase
                    placeholder="Take a note..."
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="toolbar">
                <NoteOptions/>
                
                <div className="close-button">
                  <Button
                    size="small"
                    onClick={() => {submitNote()}}>Close</Button>  
                </div>
                </div>
            </div>
           )}
        </div>
      );
    };


    export default CreateNotes;
    

    