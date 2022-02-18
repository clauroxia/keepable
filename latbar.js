const notesSelec = document.querySelector(".js-notes-menu");
const trashSelec = document.querySelector(".js-trash-menu");

notesSelec.addEventListener("click", () => 
  // container.class.toggle(blabla)
  renderNotes(notes)
);

trashSelec.addEventListener("click", () =>
  // container.class.toggle(blabla)
  renderTrash(notes)
);