import table from '/js/ui/table.js'
import Sidebar from '/js/ui/sidebar.js'
import filter from '/js/ui/filter.js'
import overlay from '/js/ui/overlay.js'
/** @param {KeyboardEvent} event */
async function keybindHandler(event) {
	const code = event.code
	const key = event.key
	const active = document.activeElement

	if (code == "Escape") {
		if (!overlay.dom.classList.contains("hidden")) {
			overlay.dom.classList.toggle("hidden", true)
		}
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
	}

	switch (code) {
		case "Enter":
			//@ts-ignore
			active.click()
			return
		case "KeyH":
			for (const category of table.activeGroup.byOrder) {
				category.toggleOff()
			}
			return
		case "KeyO":
			for (const category of table.activeGroup.byOrder) {
				category.toggleOn()
			}
			return
		case "KeyS":
			overlay.toggle()
			if (!overlay.dom.classList.contains("hidden")) {
				//@ts-ignore
				overlay.header.children[0].focus()
			}
			return
		case "KeyC":
			//@ts-ignore
			filter.dom.value = null
	}
}

/** @param {KeyboardEvent} event */
async function keybindUpHandler(event) {
	const code = event.code
	if (code == "KeyF") {
		filter.dom.focus()
	}
}

export async function init() {
	document.addEventListener('keydown', keybindHandler);
	document.addEventListener('keyup', keybindUpHandler);

}
export default init;
