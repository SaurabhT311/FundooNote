import React, { useEffect, useState } from "react";
import CreateNotes from "../createNotes/createNotes";
import DisplayAllNotes from "../displayNotes/displayNotes"
import Services from "../../services/noteService";
const service = new Services();

function Notes(props) {
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);


    const getNotes = () => {
        service.getNote().then((result) => {
            let dataInArray = result.data.data;
            let arr = dataInArray.reverse();
            console.log(arr);
            setDisplay(arr);
        }).catch((error) => {
            console.log("error");
        });
    };
    return (
        <div className="mainContent" >
            <CreateNotes />
            <DisplayAllNotes
                noteShow={display}
            />
        </div>
    );
}

export default Notes;