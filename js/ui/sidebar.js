import data from '/js/data.js'


export class Sidebar {
	constructor() {
		this.dom = document.getElementById("sidebar")
	}

	/**
	 * @param {Mewgeneric} mewgeneric
	 */
	async makeDescription(mewgeneric) {
		let description = document.createElement("div");
		description.className = "sidebar-element-description";
		let desc = mewgeneric.getDescription();

		for (var result of desc.matchAll(/\[img:(.*?)\]/g)) {
			desc = desc.replace(result[0], '<img title="' + result[1] + ' " class="mewgenie-icon" src="mewgenie-data/fontIcons/' + result[1] + '.svg">')
		}

		for (var result of desc.matchAll(/\[s:(..*?)\]/g)) {
			desc = desc.replace(result[0], '<i style="color: #FFFA; font-size: ' + result[1] + 'em">(')
		}

		for (var result of desc.matchAll(/\[\/s\]/g)) {
			desc = desc.replace(result[0], ')</i>')
		}

		description.innerHTML = desc;
		return description
	}

	/**
	 * @param {Mewgeneric} mewgeneric
	 */
	async makeTierToggle(mewgeneric) {
		const field = document.createElement("div");
		field.className = "sidebar-tierChanger"

		if (mewgeneric.maxTier < 2) {
			return field
		}
		for (let i = 1; i <= mewgeneric.maxTier; i++) {
			const toggle = document.createElement("div");
			toggle.classList.add("sidebar-tierChanger-button")
			toggle.classList.add("toggle")
			toggle.textContent = i
			toggle.addEventListener("click", () => {
				this.show(new mewgeneric.constructor(mewgeneric.id, i))
			})
			field.appendChild(toggle)
		}
		return field

	}

	/**
	 * @param {Mewgeneric} mewgeneric
	 */
	async makeStatsElement(mewgeneric) {
		const stats = mewgeneric.get("stats")
		const shield = mewgeneric.get("shield")
		const divine_shield = mewgeneric.get("divine_shield")


		const div = document.createElement("div");
		div.className = "sidebar-element-stats";
		if (shield) {
			let span = document.createElement("span")
			span.style = "white-space: nowrap"
			span.appendChild(document.createTextNode("+" + shield + " "));
			const img = document.createElement("img")
			img.title = "Shield"
			img.className = "mewgenie-icon"
			img.src = "mewgenie-data/fontIcons/shield.svg"
			span.appendChild(img)
			div.appendChild(span)
		}
		if (divine_shield) {
			let span = document.createElement("span")
			span.style = "white-space: nowrap"
			span.appendChild(document.createTextNode("+" + divine_shield + " "));
			const img = document.createElement("img")
			img.title = "Divine Shield"
			img.className = "mewgenie-icon"
			img.src = "mewgenie-data/fontIcons/divineshield.svg"
			span.appendChild(img)
			div.appendChild(span)
		}
		if (!stats) {
			return div
		}

		for (const statName in data.mewgenie.stats) {
			let amount = stats[statName]
			if (!amount) {
				continue
			}
			let span = document.createElement("span")
			span.style = "white-space: nowrap"
			if (div.childNodes.length > 0) {
				div.appendChild(document.createTextNode(", "));
			}
			if (amount > 0) {
				amount = "+" + amount
			}
			span.appendChild(document.createTextNode(amount + " "));
			const img = document.createElement("img")
			img.title = data.mewgenie.stats[statName]
			img.className = "mewgenie-icon"
			img.src = "mewgenie-data/fontIcons/" + statName + ".svg"
			span.appendChild(img)
			div.appendChild(span)
		}
		return div
	}


	/**
	 * @param {Mewgeneric} mewgeneric
	 */
	async show(mewgeneric) {
		const name = mewgeneric.getName()
		const collar = mewgeneric.get("class")

		if (name && collar) {
			const element = this.dom.getElementsByClassName("sidebar-element")[0]
			element.innerHTML = ""



			const thumbnail = document.createElement("div")
			thumbnail.className = "sidebar-element-thumbnail-passive"
			thumbnail.appendChild(await mewgeneric.makeThumbnail(2.5));
			element.appendChild(thumbnail)

			const title = document.createElement("div");
			title.className = "sidebar-element-name";
			title.textContent = name
			element.appendChild(title);


			const stats = await this.makeStatsElement(mewgeneric)
			if (stats) {
				element.appendChild(stats);
			}


			const description = await this.makeDescription(mewgeneric)
			element.appendChild(description);




			let tierToggle = this.dom.getElementsByClassName("sidebar-tierChanger")[0]
			if (mewgeneric.id != this.dom.mewgeneric?.id) {
				if (tierToggle) {
					this.dom.removeChild(tierToggle)
				}
				tierToggle = await this.makeTierToggle(mewgeneric)
				this.dom.appendChild(tierToggle)
			}

			const tierToggles = tierToggle.getElementsByClassName("sidebar-tierChanger-button")
			Array.from(tierToggles).forEach((tierToggle, index) => {
				tierToggle.classList.remove("active")
				if (index + 1 == mewgeneric.tier)
					tierToggle.classList.add("active")
			});

			this.dom.prepend(element)
			this.dom.mewgeneric = mewgeneric

			return
		}
		console.warn("Couldn't load " + mewgeneric.id + " with traits name: " + name + " and class: " + collar)


	}
}


export default new Sidebar()
