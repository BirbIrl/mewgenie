import table from "/js/ui/table.js"

class Filter {
	constructor() {
		this.dom = document.getElementById("filter")
		this.dom.addEventListener('input', this.update)
	}
	filter() {
		const filter = this.getFilterString().toLowerCase()
		for (const category of table.activeGroup.byOrder) {
			let empty = true
			for (const element of category.elements) {
				element.hide()
				const name = element.mewgeneric.getName().toLowerCase()
				const description = element.mewgeneric.getDescription().toLowerCase()
				if (name.includes(filter) || description.includes(filter)) {
					empty = false
					element.show()
				}
			}
			if (empty) {
				category.hide()
			}
		}
	}
	unFilter() {
		for (const category of table.activeGroup.byOrder) {
			for (const element of category.elements) {
				element.show()
			}
			category.show()
		}

	}
	/** @returns {string} */
	getFilterString() {
		// @ts-ignore
		return this.dom.value
	}

	update = async () => {
		const categories = table.activeGroup.byOrder
		if (this.getFilterString()) {
			this.filter()
			for (const category of categories) {
				category.toggleOn()
			}
		} else {
			this.unFilter()
			for (const category of categories) {
				category.toggleOff()
			}
		}
	}
}

export default new Filter()
