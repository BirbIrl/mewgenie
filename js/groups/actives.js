import Category from "/js/ui/category.js"
import Group from "/js/groups/group.js"
import table, { Table } from "/js/ui/table.js"

class Actives extends Group {
	/** @param {Table} table  */
	constructor(table) {
		super("actives", table)
		this.add(new Category("Work In progress!", "wip"))
	}
	async init() {
		this.showButton()
	}
}

export default new Actives(table)
