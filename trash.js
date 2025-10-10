function renderTrash(notes) {
	const notesList = document.querySelector(".js-trash-notes");
	notesList.innerHTML = "";
	const activeNotes = notes.filter((note) => !note.deleted);

	if (notes.length === 0 || activeNotes.length === notes.length) {
		notesList.innerHTML = `<p class="content-lg white m-auto mt-40">No deleted notes</p>`;
		return;
	}

	notes.forEach((note) => {
		if (isTrash(note)) {
			const noteEl = createNoteEl(note, "trash");
			notesList.append(noteEl);
		}
	});
}

renderTrash(notes);
