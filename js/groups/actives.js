import Category from "/js/ui/category.js"
import Group from "/js/groups/group.js"
import table, { Table } from "/js/ui/table.js"
import data from "/js/data.js"
import settings from "/js/ui/settings.js"
import { sortByLangName } from "/js/util.js"
import Active from "/js/mewgenerics/active.js"

class Actives extends Group {
	/** @param {Table} table  */
	constructor(table) {
		super("actives", table)
		this.add(new Category("Work In progress!", "wip"))
	}

	async init() {
		for (const collarId of data.mewgenie.collarOrder) {
			if (settings.config.collars[collarId]) {
				this.add(new Category(data.mewgenie.collars[collarId].name[settings.config.lang], collarId, "./mewgenie-data/collarIcons/" + collarId + ".svg"))
			}
		}

		for (const active of sortByLangName(data.abilities, Active, data.mewgenie.blacklist.abilities)) {
			const category = this.byId[active.get("class")]
			if (category) {
				category.add(active)
			}
		}
		this.showButton()
	}
}

export default new Actives(table)
