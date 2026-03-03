import settings from "/js/ui/settings.js";

class Tab {
	/**@param {Overlay} overlay 
	 * @param {String} name */
	constructor(overlay, name) {
		this.name = name
		this.button = document.createElement("div");
		this.button.className = "overlay-header-button"
		this.button.tabIndex = 1
		this.button.textContent = name.charAt(0).toUpperCase() + name.slice(1);
		this.button.addEventListener("click", () => { overlay.showTab(this) })
		this.dom = document.getElementById("overlay-" + name)
		if (!this.dom) {
			throw Error("Couldn't find matching dom for " + name)
		}
		overlay.header.appendChild(this.button)
	}
}

class Overlay {
	constructor() {
		this.dom = document.getElementById("overlay")
		this.header = this.dom.getElementsByClassName("overlay-header")[0]
		/** @type {Object.<string, Tab>} */
		this.tabs = {}

		this.registerTab("settings")
		this.registerTab("about")
		this.makeExitButton()
		this.registerSettingsButton()
		this.settings = settings
		this.dom.classList.toggle("hidden", false)
	}
	/** @param {string} name  */
	registerTab(name) {
		this.tabs[name] = new Tab(this, name)
	}

	/**@param {Tab} tabToFocus  */
	showTab(tabToFocus) {
		for (const tabName in this.tabs) {
			const tab = this.tabs[tabName]
			if (tab == tabToFocus) {
				tab.dom.classList.toggle("hidden", false)
			} else {
				tab.dom.classList.toggle("hidden", true)
			}
		}
	}

	/** @param {boolean} [force]  */
	toggle(force) {
		this.dom.classList.toggle("hidden", force)
		if (!this.dom.classList.contains("hidden")) {
			this.showTab(this.tabs["settings"])
		}
	}

	registerSettingsButton() {
		document.getElementById("settings").addEventListener("click", () => { this.toggle() })
	}

	makeExitButton() {
		const exit = document.createElement("div")
		exit.className = "overlay-header-button"
		exit.style = "margin-left:auto"
		exit.tabIndex = 1
		exit.textContent = "X"
		exit.addEventListener("click", () => { this.dom.classList.toggle("hidden", true) })
		this.header.appendChild(exit)
	}

}

export default new Overlay()
