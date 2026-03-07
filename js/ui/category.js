import Mewgeneric from '/js/mewgenerics/mewgeneric.js'
import sidebar from '/js/ui/sidebar.js'

class Element {
	/** @param {Mewgeneric} mewgeneric */
	constructor(mewgeneric) {
		this.mewgeneric = mewgeneric
		this.hidden = false
		const name = mewgeneric.getName()
		const element = document.createElement("div");
		element.className = "table-element";
		element.appendChild(mewgeneric.makeThumbnail(1.5))
		element.appendChild(document.createTextNode(name));
		this.showOnSidebar = () => {
			//@ts-ignore
			sidebar.show(new mewgeneric.constructor(mewgeneric.id, document.getElementById("sidebar")?.mewgeneric?.tier))
		}
		element.addEventListener("click", this.showOnSidebar);
		element.tabIndex = 0
		//@ts-ignore
		element.object = this
		this.dom = element
	}
	show() {
		this.dom.classList.toggle("hidden", false)
	}
	hide() {
		this.dom.classList.toggle("hidden", true)
	}
}

class Category {
	/** @param {string} name
	 * @param {string} id
	 * @param {string} [iconPath]
	 */
	constructor(name, id, iconPath) {
		this.name = name
		this.id = id
		this.hidden = false
		/** @type {Element[]} */
		this.elements = []

		const category = document.createElement("div")
		this.dom = category
		category.className = "table-category"

		const header = document.createElement("div")
		this.header = header
		header.className = "table-category-header"
		header.addEventListener("click", this.toggle);
		//@ts-ignore
		header.toggle = this.toggle
		header.tabIndex = 0
		category.appendChild(header)

		const triangle = document.createElement("img")
		this.triangle = triangle
		triangle.src = "./assets/triangle.svg"
		triangle.className = "table-category-header-triangle"
		header.appendChild(triangle)

		const title = document.createElement("a")
		title.textContent = name
		header.appendChild(title)

		if (iconPath) {
			const icon = document.createElement("img")
			icon.src = iconPath
			icon.className = "table-category-header-icon"
			header.appendChild(icon)
		}

		const contents = document.createElement("div")
		this.contents = contents
		contents.classList.add("table-category-contents", "hidden")
		category.appendChild(contents)

	}
	/** @param {Mewgeneric} mewgeneric */
	async add(mewgeneric) {
		const element = new Element(mewgeneric)
		this.contents.appendChild(element.dom)
		this.elements.push(element)
	}

	focus() {
		this.header.focus()
	}

	toggleOn = () => {
		this.contents.classList.toggle("hidden", false);
		this.triangle.classList.toggle("active", true);
	}

	toggleOff = () => {
		this.contents.classList.toggle("hidden", true);
		this.triangle.classList.toggle("active", false);
	}

	toggle = () => {
		this.contents.classList.toggle("hidden");
		this.triangle.classList.toggle("active");
	}

	show() {
		this.hidden = false;
		this.dom.classList.toggle("hidden", false)
	}
	hide() {
		this.hidden = true;
		this.dom.classList.toggle("hidden", true)
	}
}


export default Category
