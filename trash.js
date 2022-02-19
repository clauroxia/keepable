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



renderTrash(notes);