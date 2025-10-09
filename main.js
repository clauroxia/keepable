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

function createColorChart(ev, src) {
	// Clear previous colors
	colorChart.innerHTML = "";
	let times = 10;
	const colors = [
		"#ffffff",
		"#f28b82",
		"#fbbc04",
		"#fff475",
		"#ccff90",
		"#a7ffeb",
		"#cbf0f8",
		"#aecbfa",
		"#d7aefb",
		"#fdcfe8",
	];

	for (let i = 0; i < times; i++) {
		const colorSquare = document.createElement("div");
		if (i === 0) {
			colorSquare.classList.add("border-gray");
		}
		colorSquare.style.backgroundColor = colors[i];
		colorSquare.dataset.color = colors[i];
		colorSquare.addEventListener("click", (e) => pickNoteColor(e, ev, src));
		colorChart.append(colorSquare);
	}
}

function pickNoteColor(e, ev, src) {
	e.preventDefault();
	colorValue = e.target.dataset.color;
	const paletteContainer = ev.target.closest(".js-palette-container");
	const path = paletteContainer.querySelector("svg path");
	// Change icon color and palette background
	paletteContainer.classList.toggle("bg-gray");

	if (src === form) {
		path.setAttribute("fill", colorValue);
	} else if (src === activeNotes) {
		const noteEl = paletteContainer.closest(".js-single-note");
		paletteContainer.classList.toggle("white-transparent");
		const currentFill = path.getAttribute("fill");
		const newFill = currentFill === "#999B9E" ? "#FFFFFF" : "#999B9E";
		path.setAttribute("fill", newFill);
		// Change note color
		noteEl.style.backgroundColor = colorValue;
		const noteIndex = parseInt(noteEl.dataset.index);
		notes[noteIndex].color = colorValue;
		localStorage.setItem("notes", JSON.stringify(notes));
	}

	colorChart.classList.toggle("visible");
	colorChart.classList.toggle("hidden");
}

function positionColorChartTooltip(e) {
	// Positioning
	const rect = e.target.getBoundingClientRect();
	const tooltipRect = colorChart.getBoundingClientRect();

	// Add scroll to get the real absolute position
	const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const left = rect.left + scrollLeft + (rect.width - tooltipRect.width) / 2;
	const top = rect.top + scrollTop - tooltipRect.height - 16;

	colorChart.style.left = `${left}px`;
	colorChart.style.top = `${top}px`;
}

function togglePaletteMode(ev, src) {
	const paletteContainer = ev.target.closest(".js-palette-container");

	if (src === activeNotes) {
		paletteContainer.classList.toggle("white-transparent");
	}
	paletteContainer.classList.toggle("bg-gray");
	const path = paletteContainer.querySelector("svg path");
	const currentFill = path.getAttribute("fill");
	const newFill = currentFill === "#999B9E" ? "#FFFFFF" : "#999B9E";
	path.setAttribute("fill", newFill);
}

function formReset(title, content) {
	const paletteContainer = form.querySelector(".js-palette-container");
	const path = paletteContainer.querySelector("svg path");

	// Reset form and icon color
	title.value = "";
	content.value = "";
	colorValue = "#ffffff";
	path.setAttribute("fill", "#999B9E");
}

renderNotes(notes);
