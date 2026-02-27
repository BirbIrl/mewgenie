import Sidebar from '/js/ui/sidebar.js'
import Category from '/js/ui/category.js'
import data from '/js/data.js'
/*
 
			<div class="table-category">
				<div class="table-category-header">
					<img src="./assets/triangle.svg" class="table-category-header-triangle">
					Tinkerer
					<img src="./mewgenie-data/collarIcons/Tinkerer.svg" class="table-category-header-icon">
				</div>
				<div class="table-category-contents">Hyello</div>
			</div>

			<div class="table-category">
				<div class="table-category-header">
					<img src="./assets/triangle.svg" class="table-category-header-triangle">
					Butcher
					<img src="./mewgenie-data/collarIcons/Butcher.svg" class="table-category-header-icon">
				</div>
				<div class=="table-category-contents">Hyello</div>
			</div>
	*/

class Table {
	constructor() {
		this.dom = document.getElementById("table")
		this.groups = {
			"passives": {
				order: []
			}
		}
	}

	async init() {
		for (const collarId of data.mewgenie.collarOrder) {
			if (collarId == "Disorder") {
				this.groups["passives"][collarId] = new Category("Disorders")
			} else {
				this.groups["passives"][collarId] = new Category(collarId, "./mewgenie-data/collarIcons/" + collarId + ".svg")
			}
			this.groups["passives"].order.push(collarId)
		}

		this.showGroup("passives")
	}

	async showGroup(name) {
		this.dom.textContent = "";
		for (const category of this.groups[name].order) {
			this.dom.appendChild(this.groups[name][category].dom)
		}
	}
}


export default new Table()
