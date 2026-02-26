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
	}
}

export async function init() {
	document.addEventListener('keydown', keybindHandler);

}
export default init;
