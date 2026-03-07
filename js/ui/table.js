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
		this.btn = btn
		btn.className = "header-button hidden"
		btn.textContent = String(this.name).charAt(0).toUpperCase() + String(this.name).slice(1);
		btn.addEventListener("click", () => { this.table.showGroup(this) })
		document.getElementById("header-buttons").appendChild(btn)
	}

	showButton() {
		this.btn.classList.toggle("hidden", false)
	}


}

class Passives extends Group {
	/** @param {Table} table  */
	constructor(table) {
		super("passive", table)
	}
	async init() {
		for (const collarId of data.mewgenie.collarOrder) {
			if (collarId == "Disorder" && settings.config.showDisorders) {
				this.add(new Category("Disorders", collarId))
			}
			if (settings.config.collars[collarId]) {
				this.add(new Category(data.mewgenie.collars[collarId].name[settings.config.lang], collarId, "./mewgenie-data/collarIcons/" + collarId + ".svg"))
			}
		}
		this.showButton()
	}
}
class Table {
	constructor() {
		this.dom = document.getElementById("table")
		this.groups = {
			"passives": new Passives(this),
		}
		this.activeGroup = this.groups.passives
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
