import data from "/js/data.js"
import Passive from "/js/mewgenerics/passive.js"
import Category from "/js/ui/category.js"
import Group from "/js/groups/group.js"
import settings from "/js/ui/settings.js"
import table, { Table } from "/js/ui/table.js"
import { sortByLangName } from "/js/util.js"

class Passives extends Group {
	/** @param {Table} table  */
	constructor(table) {
		super("passives", table)
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

		for (const passiveName of sortByLangName(data.passives)) {
			if (data.mewgenie.blacklist.passives.includes(passiveName)) {
				continue
			}
			const passive = new Passive(passiveName, 1)
			const category = this.byId[passive.get("class")]
			if (category) {
				category.add(passive)
			}
		}
		this.showButton()
	}

}

export default new Passives(table)
