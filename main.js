// Submit note
const form = document.querySelector(".js-form");
const activeNotes = document.querySelector(".js-active-notes");
const colorChart = document.createElement("div");
colorChart.classList.add("palette__color-table", "hidden");
document.body.append(colorChart);
let colorValue = "#ffffff";

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const { title, content } = event.target.elements;
	const newNote = {
		title: title.value,
		content: content.value,
		color: colorValue,
		deleted: false,
	};

	if (!title.value && !content.value) {
		alert("Please add a title or content to your note.");
		return;
	}
	createNote(newNote);
	renderNotes(notes);
	formReset(title, content);
});

form.addEventListener("click", (e) => handlePaletteClick(e, form));
activeNotes.addEventListener("click", (e) =>
	handlePaletteClick(e, activeNotes)
);

function handlePaletteClick(ev, src) {
	if (ev.target.closest(".js-palette-button")) {
		ev.preventDefault();

		if (!colorChart.classList.contains("visible")) {
			openColorChart(ev, src);
		} else {
			closeColorChart(ev, src);
		}
	}
}

function openColorChart(ev, src) {
	colorChart.classList.remove("hidden");
	colorChart.classList.add("visible");
	createColorChart(ev, src);
	positionColorChartTooltip(ev);
	togglePaletteMode(ev, src);
}

function closeColorChart(ev, src) {
	colorChart.classList.remove("visible");
	colorChart.classList.add("hidden");
	togglePaletteMode(ev, src);
}

// Create note
function createNote(note) {
	notes.push(note);
	localStorage.setItem("notes", JSON.stringify(notes));
}

// Reset form and icon color
function formReset(title, content) {
	const paletteContainer = form.querySelector(".js-palette-container");
	const path = paletteContainer.querySelector("svg path");

	title.value = "";
	content.value = "";
	colorValue = "#ffffff";
	path.setAttribute("fill", "#999B9E");
}

renderNotes(notes);
