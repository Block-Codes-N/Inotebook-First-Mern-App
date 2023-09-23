import NoteContext from "./noteContext"; // Importing the NoteContext from "./noteContext"
import { useState } from "react";

const NoteState = (props) => {
  // Defining a functional component called NoteState which takes props
  const notesInitial = [
    {
      _id: "65094c474a47126b828747cc",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:47.883Z",
      __v: 0,
    },
    {
      _id: "65094c484a47126b828747ce",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:48.510Z",
      __v: 0,
    },
    {
      _id: "65094c494a47126b828747d0",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    },
    {
      _id: "65094c494a47126b8287547d0",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    },
    {
      _id: "65094c494a471265b828747d0",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    },
    {
      _id: "65094c494a471426b828747d0",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    },
    {
      _id: "65094c494a47126b4828747d0",
      user: "6501c4e35a545427722d3ab3",
      title: "Here is my title for my notes to be published",
      tags: "personal",
      description:
        "my description is here to be continued her is the functionality",
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial); //

  return (
    // Returning the NoteContext.Provider with a value containing the 'state' and 'update' function
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState; // Exporting the NoteState component as the default export
