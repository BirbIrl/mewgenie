import Sidebar from '/js/ui/sidebar.js'
/**
 * @param {KeyboardEvent} event - The keyboard event object.
 */
async function keybindHandler(event) {
	let key = event.key
	if (!isNaN(Number.parseInt(key))) {
		if (key == 0) {
			key = 10
		}
		const mewgeneric = document.getElementById("sidebar")?.mewgeneric;
		if (mewgeneric) {
			Sidebar.show(new mewgeneric.constructor(mewgeneric.id, key)) //TODO make this not hardcoded like a dummy
		}
	} else if (event.key == "Enter") {
		const active = document.activeElement
		if (active.classList.contains("table-category-header")) {

			active.toggle()
		} else if (active.classList.contains("table-element")) {
			active.show()
		}
	}
}

export async function init() {
	document.addEventListener('keydown', keybindHandler);

}
export default init;
