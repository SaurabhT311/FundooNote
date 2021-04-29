import React, { useEffect, useState } from "react";
import CreateNotes from "../createNotes/createNotes";
import DisplayAllNotes from "../displayNotes/displayNotes"
import Services from "../../services/noteService";
import ArchiveNote from '../ArchiveNote/archiveNote';
import TrashNote from '../TrashNotes/TrashNote'
const service = new Services();

function Notes(props) {
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);


    const getNotes = () => {
        service.getNote().then((result) => {
            let dataInArray = result.data.data.filter(result => result.isArchive === false);
            let arr = dataInArray.reverse();
            console.log("arr is:",arr);
            setDisplay(arr);
        }).catch((error) => {
            console.log("error");
        });
    };
    return (
        <div className="mainContent" >
            <CreateNotes get={getNotes} />
            <DisplayAllNotes
                noteShow={display}
                get={getNotes}
            />
        </div>
    );
}

export default Notes;