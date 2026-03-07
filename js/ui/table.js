import Category from '/js/ui/category.js'
import settings from '/js/ui/settings.js'
import data from '/js/data.js'

class Group {
	/** @param {string} name
	 *	@param {Table} table 
	 * */
	constructor(name, table) {
		this.name = name
		this.table = table
		/** @type {Object<string,Category>}*/
		this.byId = {}
		/** @type {Category[]}*/
		this.byOrder = []
		this.registerButton()
	}

	/** @param {Category} category */
	add(category) {
		this.byId[category.id] = category
		this.byOrder.push(category)
	}

	registerButton() {
		const btn = document.createElement("div")
		btn.className = "header-button"
		btn.textContent = String(this.name).charAt(0).toUpperCase() + String(this.name).slice(1);
		btn.addEventListener("click", () => { this.table.showGroup(this) })
		document.getElementById("header-buttons").appendChild(btn)
	}


}

class Table {
	constructor() {
		this.dom = document.getElementById("table")
		/** @type {Object<string,Group>}*/
		this.groups = {
			"passives": new Group("passives", this),
			"actives": new Group("actives", this),
			"items": new Group("items", this),
		}
		this.activeGroup = this.groups.passives
	}

	async init() {
		const passives = this.groups.passives
		for (const collarId of data.mewgenie.collarOrder) {
			if (collarId == "Disorder" && settings.config.showDisorders) {
				passives.add(new Category("Disorders", collarId))
			}
			if (settings.config.collars[collarId]) {
				passives.add(new Category(data.mewgenie.collars[collarId].name[settings.config.lang], collarId, "./mewgenie-data/collarIcons/" + collarId + ".svg"))
			}
		}

	}

	/** @param {Group} [group]*/
	async showGroup(group) {
		this.dom.textContent = "";
		if (group) {
			for (const category of group.byOrder) {
				this.dom.appendChild(category.dom)
			}
		}
	}
}


export default new Table()
