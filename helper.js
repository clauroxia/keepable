function createNoteEl(note, type) {
	const div = document.createElement("div");
	const noteDetail = document.createElement("div");
	const title = document.createElement("p");
	const content = document.createElement("p");
	const actions = document.createElement("div");
	const leftCont = document.createElement("div");
	const leftIcon = document.createElement("a");
	const rightCont = document.createElement("div");
	const rightIcon = document.createElement("a");

	//setup elements
	div.classList.add("single-note", "js-single-note");
	noteDetail.classList.add("flex", "flex-column", "gap-2_5");
	title.classList.add("content-xs", "h-5");
	title.textContent = note.title;
	content.classList.add("content-xm");
	content.textContent = note.content;
	div.style.backgroundColor = note.color;
	actions.classList.add("note__actions");

	if (type === "notes") {
		leftCont.classList.add(
			"icon-container",
			"white-transparent",
			"js-palette-container"
		);
		leftIcon.classList.add("js-palette-button", "icon");
		leftIcon.innerHTML = `<svg
														width="18"
														height="18"
														viewBox="0 0 18 18"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M7.18216 0.177016C3.68755 0.859058 0.871467 3.66809 0.182388 7.15213C-1.11842 13.7264 4.81258 18.6273 9.28104 17.9347C10.7295 17.7097 11.4397 16.0152 10.7752 14.7108C9.96309 13.1147 11.1233 11.2514 12.9163 11.2514H15.7183C16.9769 11.2514 17.9965 10.2108 18 8.95567C17.9824 3.41496 12.9409 -0.944486 7.18216 0.177016ZM3.37465 11.2514C2.75237 11.2514 2.24962 10.7487 2.24962 10.1264C2.24962 9.50412 2.75237 9.00138 3.37465 9.00138C3.99693 9.00138 4.49968 9.50412 4.49968 10.1264C4.49968 10.7487 3.99693 11.2514 3.37465 11.2514ZM4.49968 6.75134C3.8774 6.75134 3.37465 6.2486 3.37465 5.62632C3.37465 5.00405 3.8774 4.5013 4.49968 4.5013C5.12196 4.5013 5.6247 5.00405 5.6247 5.62632C5.6247 6.2486 5.12196 6.75134 4.49968 6.75134ZM8.99979 4.5013C8.37751 4.5013 7.87476 3.99856 7.87476 3.37629C7.87476 2.75401 8.37751 2.25127 8.99979 2.25127C9.62207 2.25127 10.1248 2.75401 10.1248 3.37629C10.1248 3.99856 9.62207 4.5013 8.99979 4.5013ZM13.4999 6.75134C12.8776 6.75134 12.3749 6.2486 12.3749 5.62632C12.3749 5.00405 12.8776 4.5013 13.4999 4.5013C14.1222 4.5013 14.6249 5.00405 14.6249 5.62632C14.6249 6.2486 14.1222 6.75134 13.4999 6.75134Z"
															fill="#999B9E"
														/>
													</svg>`;
		rightCont.classList.add("icon-container", "white-transparent");
		rightIcon.classList.add("js-delete-button", "icon");
		rightIcon.innerHTML = `<img
														src="./images/trash.svg"
														/>`;
	}

	if (type === "trash") {
		leftCont.classList.add("icon-container", "white-transparent");
		leftIcon.classList.add("icon");
		leftIcon.innerHTML = `<img
														src="./images/trash.svg"
													/>`;
		rightCont.classList.add("icon-container", "white-transparent");
		rightIcon.classList.add("icon");
		rightIcon.innerHTML = `<img
														src="./images/restore.svg"
														/>`;
	}

	// Build template
	noteDetail.append(title, content);
	rightCont.append(rightIcon);
	leftCont.append(leftIcon);
	actions.append(leftCont, rightCont);
	div.append(noteDetail, actions);

	if (type === "notes") {
		rightIcon.addEventListener("click", (event) => {
			event.preventDefault();
			deleteNote(note);
			renderNotes(notes);
		});
	}

	if (type === "trash") {
		rightIcon.addEventListener("click", (event) => {
			event.preventDefault();
			restoreNote(note);
			renderTrash(notes);
		});
		leftIcon.addEventListener("click", (event) => {
			event.preventDefault();
			deleteNote(note);
			renderTrash(notes);
		});
	}

	return div;
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
		const noteId = noteEl.dataset.id;
		const note = notes.find((n) => n.id === noteId);
		if (note) {
			note.color = colorValue;
			localStorage.setItem("notes", JSON.stringify(notes));
		}
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

const isTrash = (note) => {
	return note.deleted == true;
};
