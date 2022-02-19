function createNoteEl(note) {
  // create note
  const div = document.createElement("div");
  const noteDetail = document.createElement("div");
  const title = document.createElement("p");
  const body = document.createElement("p");
  const actions = document.createElement("div");
  const deleteCont = document.createElement("div")
  const deleteLink = document.createElement("a"); //completar
  const paletteCont = document.createElement("div");
  const paletteClick = document.createElement("p");
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
  div.classList.add("indNote");
  noteDetail.className = "note__detail";
  title.className = "content-xs black";
  title.textContent = note.title;
  body.className = "content-md";
  body.textContent = note.body;
  div.style.backgroundColor = note.color;
  actions.className = "note__actions container-left__item"; // completar
  actions.style.width = "120px";
  paletteCont.classList.add("palette__container");
  paletteClick.innerHTML = `<img
                              src="./images/palette.svg"
                              class="trash"
                            />`
  deleteCont.classList.add("delete__container");
  deleteLink.innerHTML = `<img
                          src="./images/trash.svg"
                          class="trash"
                        />`

  // Build template
  noteDetail.append(title, body);
  deleteCont.append(deleteLink);
  paletteCont.append(paletteClick);
  actions.append(paletteCont, deleteCont);
  div.append(noteDetail, actions, palette);

  // Event listeners
  deleteLink.addEventListener("click", (event) => {
    event.preventDefault();
    deleteNote(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(notes);
  });
  
  // changeColor.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   // cambiar el div class de la paleta, usar linea 107
  // });
  
  return div;
}

const isTrash = (note) => {
  return note.deleted == true;
};
