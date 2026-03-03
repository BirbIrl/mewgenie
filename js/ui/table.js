import Category from '/js/ui/category.js'
import settings from '/js/ui/settings.js'
import data from '/js/data.js'

class Group {
	/** @param {string} name */
	constructor(name) {
		this.name = name
		/** @type {Object<string,Category>}*/
		this.byId = {}
		/** @type {Category[]}*/
		this.byOrder = []
	}

	/** @param {Category} category */
	add(category) {
		this.byId[category.id] = category
		this.byOrder.push(category)
	}

}

class Table {
	constructor() {
		this.dom = document.getElementById("table")
		/** @type {Object<string,Group>}*/
		this.groups = {
			"passives": new Group("passives")
		}
		this.activeGroup = this.groups.passives
	}

	async init() {
		const passives = this.groups["passives"]
		for (const collarId of data.mewgenie.collarOrder) {
			if (collarId == "Disorder" && settings.config.showDisorders) {
				passives.add(new Category("Disorders", collarId))
			}
			if (settings.config.collars[collarId]) {
				passives.add(new Category(data.mewgenie.collars[collarId].name[settings.config.lang], collarId, "./mewgenie-data/collarIcons/" + collarId + ".svg"))
			}
		}

		this.showGroup(passives)
	}

	/** @param {Group} group*/
	async showGroup(group) {
		this.dom.textContent = "";
		for (const category of group.byOrder) {
			this.dom.appendChild(category.dom)
		}
	}
}


export default new Table()
