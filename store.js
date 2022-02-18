// Data store

const initialNotes = [
  {
    title: "This is the title",
    body: "This is the body for the note",
    color: "#FFFFFF",
    deleted: false,
  },
  {
    title: "This is the title",
    body: "This is the body for the note",
    color: "#FBBC04",
    deleted: false,
  },
  {
    title: "This is the title",
    body: "This is the body for the note",
    color: "#FFF475",
    deleted: true,
  },
];

// Get notes from storage or setup new ones
const notesFromStorage = JSON.parse(localStorage.getItem("expenses"));
const notes = notesFromStorage || initialNotes;


//Create note
function createNote(note) {
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Delete note
function deleteNote(note) {
  const index = notes.indexOf(note);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
};
