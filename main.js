
// Submit note
const form = document.querySelector(".js-note-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const {title, body, color} = event.target.elements;
  const newNote = {
    title: title.value,
    body: body.value,
    color: "#FFFFFF",
    deleted: false,
  };
  createNote(newNote);
  // location.assign("/");???
});

//change color from note


// Render notes

function renderNotes(notes) {
  const notesList = document.querySelector(".js-notes");

  notesList.innerHTML = "";

  notes.forEach((note) => {
    if (!isTrash(note)) {
      const noteEl = createNoteEl(note);
      notesList.append(noteEl);
    };
  });
};

const changeColor = (note, colorSel) => {
  note.style.backgroundColor = colorSel;
  note.color = colorSel;
}

renderNotes(notes);
// descomentar para probar
