
class Filter {
	constructor() {
		this.dom = document.getElementById("filter")
	}
	filter() {
	}
	unFilter() {

	}
	/** @returns {string} */
	getFilterString() {
		// @ts-ignore
		return this.dom.value
	}

	update() {
		let filter = this.getFilterString()
		if (filter) {
			this.filter()
		} else {
			this.unFilter()
		}
	}
}

export default new Filter()
