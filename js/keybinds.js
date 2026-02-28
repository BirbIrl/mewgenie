import table from '/js/ui/table.js'
import Sidebar from '/js/ui/sidebar.js'
/** @param {KeyboardEvent} event */
async function keybindHandler(event) {
	const code = event.code
	const key = event.key
	const active = document.activeElement

	if (code == "Escape") {
		table.activeGroup.byOrder[0].focus()
		return
	}

	if (active.id == "filter") {
		return
	}

	let num = Number.parseInt(key)
	if (!isNaN(num)) {
		if (num == 0) {
			num = 10
		}
		//@ts-ignore
		const mewgeneric = document.getElementById("sidebar")?.mewgeneric;
		if (mewgeneric) {
			Sidebar.show(new mewgeneric.constructor(mewgeneric.id, num)) //TODO make this not hardcoded like a dummy
		}
	} else if (code == "Enter") {
		if (active.classList.contains("table-category-header")) {
			//@ts-ignore
			active.toggle()
		} else if (active.classList.contains("table-element")) {
			//@ts-ignore
			active.show()
		}
	}
	else if (code == "KeyH") {
		const categories = table.activeGroup.byOrder
		for (const category of categories) {
			category.toggleOff()
		}
	}
	else if (code == "KeyO") {
		const categories = table.activeGroup.byOrder
		for (const category of categories) {
			category.toggleOn()
		}
	}
	else if (code == "KeyC") {
		const filter = document.getElementById("filter")
		//@ts-ignore
		filter.value = null
	}
}

/** @param {KeyboardEvent} event */
async function keybindUpHandler(event) {
	const code = event.code
	if (code == "KeyF") {
		const filter = document.getElementById("filter")
		filter.focus()
	}
}

export async function init() {
	document.addEventListener('keydown', keybindHandler);
	document.addEventListener('keyup', keybindUpHandler);

}
export default init;
