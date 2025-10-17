// Get notes from storage or setup new ones
const notes = JSON.parse(localStorage.getItem("notes")) || [];

function handlePaletteClick(ev, src) {
	const paletteBtn = ev.target.closest(".js-palette-button");
	if (!paletteBtn) return;
	ev.preventDefault();

	// There is a palette open and user clicked another palette button
	if (
		colorChart.classList.contains("visible") &&
		currentPaletteBtn !== paletteBtn
	) {
		closeColorChart(lastEvent, currentPaletteSrc);
		openColorChart(ev, src);
		currentPaletteBtn = paletteBtn;
		currentPaletteSrc = src;
		lastEvent = ev;
		return;
	}

	// Alternate open/close if user clicked the same palette button
	if (colorChart.classList.contains("visible")) {
		closeColorChart(ev, src);
		currentPaletteBtn = currentPaletteSrc = lastEvent = null;
	} else {
		openColorChart(ev, src);
		currentPaletteBtn = paletteBtn;
		currentPaletteSrc = src;
		lastEvent = ev;
	}
}

function closeColorChart(ev, src) {
	colorChart.classList.remove("visible");
	colorChart.classList.add("hidden");
	togglePaletteMode(ev, src);
}

function openColorChart(ev, src) {
	colorChart.classList.remove("hidden");
	colorChart.classList.add("visible");
	createColorChart(ev, src);
	positionColorChartTooltip(ev);
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

function handlePinClick(e) {
	const pinBtn = e.target.closest(".js-pin-button");
	if (!pinBtn) return;

	e.preventDefault();
	const noteEl = pinBtn.closest(".js-single-note");
	const noteId = noteEl.dataset.id;
	const note = notes.find((n) => n.id === noteId);
	if (note) {
		pinNote(note);
		togglePinColor(e, note.pinned);
	}
}

function pinNote(note) {
	note.pinned = !note.pinned;
	localStorage.setItem("notes", JSON.stringify(notes));
}

function togglePinColor(ev, isPinned) {
	const pinContainer = ev.target.closest(".js-pin-container");
	const path = pinContainer.querySelector("svg path");
	if (isPinned) {
		path.setAttribute("fill", "#999B9E");
	} else {
		path.setAttribute("fill", "#FFFFFF");
	}
}

// Delete note
function deleteNote(note) {
	if (note.deleted) {
		const index = notes.indexOf(note);
		notes.splice(index, 1);
	} else {
		note.deleted = true;
		note.deletedAt = Date.now();
	}
	localStorage.setItem("notes", JSON.stringify(notes));
}
