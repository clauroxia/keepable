function renderTrash(notes) {
	const notesList = document.querySelector(".js-trash-notes");
	notesList.innerHTML = "";
	const activeNotes = notes.filter((note) => !note.deleted);
	const deletedNotes = notes.filter((note) => note.deleted);

	if (notes.length === 0 || activeNotes.length === notes.length) {
		notesList.innerHTML = `<p class="content-lg white m-auto mt-40">No deleted notes</p>`;
		return;
	}

	deletedNotes
		.sort((a, b) => b.deletedAt - a.deletedAt)
		.forEach((note) => {
			const noteEl = createNoteEl(note, "trash");
			notesList.append(noteEl);
		});
}

function restoreNote(note) {
	note.deleted = false;
	delete note.deletedAt;
	localStorage.setItem("notes", JSON.stringify(notes));
}

renderTrash(notes);
