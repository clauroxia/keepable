const form = document.querySelector(".js-form");
const activeNotes = document.querySelector(".js-active-notes");
const colorChart = document.createElement("div");
colorChart.classList.add("palette__color-table", "hidden");
document.body.append(colorChart);
let colorValue = "#ffffff";
let currentPaletteBtn = null;
let currentPaletteSrc = null;
let lastEvent = null;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const { title, content } = event.target.elements;

	if (!title.value.trim() && !content.value.trim()) {
		alert("Please add a title or content to your note.");
		formReset(title, content);
		return;
	}

	const newNote = {
		id: crypto.randomUUID(),
		title: title.value.trim(),
		content: content.value.trim(),
		pinned: false,
		color: colorValue,
		deleted: false,
	};

	createNote(newNote);
	renderNotes(notes);
	formReset(title, content);
});

form.addEventListener("click", (e) => handlePaletteClick(e, form));
activeNotes.addEventListener("click", (e) =>
	handlePaletteClick(e, activeNotes)
);
activeNotes.addEventListener("click", (e) => handlePinClick(e));

// Create note
function createNote(note) {
	notes.push(note);
	localStorage.setItem("notes", JSON.stringify(notes));
}

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
		notesList.append(noteEl);
	});
}

// Reset form and icon color
function formReset(title, content) {
	const paletteContainer = form.querySelector(".js-palette-container");
	const path = paletteContainer.querySelector("svg path");
	title.value = "";
	content.value = "";
	colorValue = "#ffffff";
	path.setAttribute("fill", "#999B9E");
	changeFormColor(colorValue);
}

document.addEventListener("click", (ev) => {
	// There is no palette open → do nothing
	if (!colorChart.classList.contains("visible")) return;

	// Click inside the current color chart or the current palette button → do nothing
	if (
		ev.target.closest(".palette__color-table") ||
		ev.target.closest(".js-palette-button")
	) {
		return;
	}

	// Click outside → close the color chart
	closeColorChart(lastEvent, currentPaletteSrc);
	currentPaletteBtn = currentPaletteSrc = lastEvent = null;
});

renderNotes(notes);
