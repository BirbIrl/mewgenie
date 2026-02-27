import sidebar from '/js/ui/sidebar.js'
class Category {
	constructor(name, iconPath) {
		this.table = document.getElementById("table")

		const category = document.createElement("div")
		this.dom = category
		category.className = "table-category"

		const header = document.createElement("div")
		header.className = "table-category-header"
		header.addEventListener("click", this.toggle);
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
		element.mewgeneric = mewgeneric
		element.appendChild(document.createTextNode(name));
		element.addEventListener("click", elementOnClick);


		this.contents.appendChild(element)

	}

	toggle = () => {
		this.contents.classList.toggle("hidden");
		this.triangle.classList.toggle("active");
	}
}


async function elementOnClick(event) {
	const mewgeneric = event.currentTarget.mewgeneric
	sidebar.show(new mewgeneric.constructor(mewgeneric.id, document.getElementById("sidebar")?.mewgeneric?.tier))
}

export default Category
