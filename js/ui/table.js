import Group from "/js/groups/group.js";


export class Table {
	constructor() {
		this.dom = document.getElementById("table")
	}

	/** @param {Group} [group]*/
	async showGroup(group) {
		this.dom.textContent = "";
		if (group) {
			for (const category of group.byOrder) {
				this.dom.appendChild(category.dom)
			}
			this.activeGroup = group
		}
	}
}


export default new Table()
