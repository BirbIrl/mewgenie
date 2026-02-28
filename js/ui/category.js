import Mewgeneric from '/js/mewgenerics/mewgeneric.js'
import sidebar from '/js/ui/sidebar.js'
class Category {
	/** @param {string} name
	 * @param {string} id
	 * @param {string} [iconPath]
	 */
	constructor(name, id, iconPath) {
		this.table = document.getElementById("table")
		this.name = name
		this.id = id

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

		this.table.appendChild(category)
	}
	/** @param {Mewgeneric} mewgeneric */
	async add(mewgeneric) {
		const name = mewgeneric.getName()
		const collar = mewgeneric.get("class")
		if (!name || !collar) {
			console.warn("Couldn't load " + mewgeneric.id + " with traits name: " + name + " and class: " + collar)
			return
		}
		const element = document.createElement("div");
		element.className = "table-element";
		const thumbnail = document.createElement("div")
		thumbnail.className = "table-element-thumbnail-passive"
		thumbnail.appendChild(await mewgeneric.makeThumbnail(1.5));
		element.appendChild(thumbnail)
		//@ts-ignore
		element.mewgeneric = mewgeneric
		element.appendChild(document.createTextNode(name));
		//@ts-ignore
		element.show = () => {
			//@ts-ignore
			sidebar.show(new mewgeneric.constructor(mewgeneric.id, document.getElementById("sidebar")?.mewgeneric?.tier))
		}
		//@ts-ignore
		element.addEventListener("click", element.show);
		element.tabIndex = 0


		this.contents.appendChild(element)

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
}


export default Category
