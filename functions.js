// Get notes from storage or setup new ones
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// Render notes
function renderNotes(notes) {
	const notesList = document.querySelector(".js-active-notes");
	notesList.innerHTML = "";
	const activeNotes = notes.filter((note) => !note.deleted);
	const deletedNotes = notes.filter((note) => note.deleted);

	if (notes.length === 0 || deletedNotes.length === notes.length) {
		notesList.innerHTML = `<p class="content-lg white m-auto mt-40">No notes to keep</p>`;
		return;
	}

	activeNotes.reverse().forEach((note) => {
		const noteEl = createNoteEl(note, "notes");
		noteEl.dataset.id = note.id;
		notesList.append(noteEl);
	});
}

// Delete note
function deleteNote(note) {
	if (isTrash(note)) {
		const index = notes.indexOf(note);
		notes.splice(index, 1);
	} else {
		note.deleted = true;
		note.deletedAt = Date.now();
	}
	localStorage.setItem("notes", JSON.stringify(notes));
}
