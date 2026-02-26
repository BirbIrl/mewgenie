import Sidebar from '/js/ui/sidebar.js'

class Table {
	constructor() {
		this.dom = document.getElementById("table")
	}
	async add(mewgeneric) {
		const name = mewgeneric.getName()
		const collar = mewgeneric.get("class")
		if (!name || !collar) {
			console.warn("Couldn't load " + mewgeneric.id + " with traits name: " + name + " and class: " + collar)
			return
		}
		const table = document.createElement("div");
		table.className = "table-element";
		const thumbnail = document.createElement("div")
		thumbnail.className = "table-element-thumbnail-passive"
		thumbnail.appendChild(await mewgeneric.makeThumbnail(1.5));
		table.appendChild(thumbnail)
		table.mewgeneric = mewgeneric
		table.appendChild(document.createTextNode(name));
		table.addEventListener("click", elementOnClick);


		this.dom.appendChild(table)

	}
}


async function elementOnClick(event) {
	const mewgeneric = event.currentTarget.mewgeneric
	Sidebar.show(new mewgeneric.constructor(mewgeneric.id, document.getElementById("sidebar")?.mewgeneric?.tier))
}
export default new Table()
