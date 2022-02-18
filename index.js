function createNoteEl(note) {
  // create note
  const div = document.createElement("div");
  const noteDetail = document.createElement("div");
  const title = document.createElement("p");
  const body = document.createElement("p");
  const actions = document.createElement("div");
  const changeColor = document.createElement("a");
  const deleteLink = document.createElement("a"); //completar
  const palette = document.createElement("div");
  
  // add colors to palette

  let times = 10;
  let count = 1;
  for (let i = 0; i < times; i++) {
    const color = document.createElement("div");
    color.classList.add(`color${count}`);
    color.classList.add("paletteColor");
    palette.append(color);
    count++;
  }

  //setup elements
  div.classList.add("note");
  noteDetail.className = "note__detail";
  title.className = "heading--xs bold";
  title.textContent = note.title;
  body.className = "heading--xs bold";
  body.textContent = note.body;
  div.style.backgroundColor = note.color;
  actions.className = "note__actions"; // completar

  // Build template
  noteDetail.append(title, body);
  actions.append(changeColor, deleteLink);
  div.append(noteDetail, actions, palette);

  // Event listeners
  deleteLink.addEventListener("click", (event) => {
    event.preventDefault();
    deleteNote(note);
    localStorage.setItem("expenses", JSON.stringify(notes));
    renderNotes(notes);

    // changeColor.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   // cambiar el div class de la paleta, usar linea 107
    // });
  });
  
  return div;
};

// Submit note
const form = document.querySelector(".js-note-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const {title, body} = event.target.elements;
  const newNote = {
    title: title.value,
    body: body.value,
    color: color.value,
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

function renderTrash(notes) {
  const notesList = document.querySelector(".js-notes");

  notesList.innerHTML = "";

  notes.forEach((note) => {
    if (isTrash(note)) {
      const noteEl = createNoteEl(note);
      notesList.append(noteEl)
    };
  });
};

const isTrash = (note) => {
  return note.deleted == true;
};

const changeColor = (note, colorSel) => {
  note.style.backgroundColor = colorSel;
  note.color = colorSel;
}

// renderNotes(notes)
// descomentar para probar
