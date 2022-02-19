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

const isTrash = (note) => {
  return note.deleted == true;
};