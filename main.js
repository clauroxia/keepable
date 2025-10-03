// Submit note
const form = document.querySelector(".js-note-form");
const paletheButton = document.querySelector(".js-palette-button");
const path = paletheButton.querySelector("svg path");
let colorValue = "#ffffff";

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const { title, body } = event.target.elements;
	const newNote = {
		title: title.value,
		body: body.value,
		color: colorValue,
		deleted: false,
	};

	createNote(newNote);
	renderNotes(notes);
	formReset();
});

const container = document.querySelector(".js-container");
const colorTable = document.createElement("div");

container.addEventListener("click", (e) => {
	if (e.target.closest(".js-palette-button")) {
		e.preventDefault();

		if (!colorTable.classList.contains("visible")) {
			colorTable.classList.remove("hidden");
			colorTable.classList.add("visible", "palette__color-table");
			document.body.append(colorTable);
			createColorTable();
			positionColorTableTooltip(e);
		} else {
			colorTable.classList.remove("visible");
			colorTable.classList.add("hidden");
		}
	}
});

function createColorTable() {
	// Clear previous colors
	colorTable.innerHTML = "";
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

		colorSquare.addEventListener("click", (e) => {
			e.preventDefault();
			colorValue = e.target.dataset.color;
			path.setAttribute("fill", colorValue);
			colorTable.classList.remove("visible");
			colorTable.classList.add("hidden");
		});

		colorTable.append(colorSquare);
	}
}

function positionColorTableTooltip(e) {
	// Positioning
	const rect = e.target.getBoundingClientRect();
	const tooltipRect = colorTable.getBoundingClientRect();

	// Add scroll to get the real absolute position
	const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const left = rect.left + scrollLeft + (rect.width - tooltipRect.width) / 2;
	const top = rect.top + scrollTop - tooltipRect.height - 16;

	colorTable.style.left = `${left}px`;
	colorTable.style.top = `${top}px`;
}

function formReset() {
	title.value = "";
	body.value = "";
	colorValue = "#ffffff";
	path.setAttribute("fill", "#999B9E");
}

renderNotes(notes);
