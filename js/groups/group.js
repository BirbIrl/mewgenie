import { Table } from "/js/ui/table.js"
import Category from "/js/ui/category.js"
import filter from "/js/ui/filter.js"

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
		btn.addEventListener("click", () => { this.table.showGroup(this); filter.update() })
		document.getElementById("header-buttons").appendChild(btn)
	}

	showButton() {
		this.btn.classList.toggle("hidden", false)
	}

}

export default Group
