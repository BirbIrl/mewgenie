/*
 
				<div class="overlay-header-button" id="overlay-header-button-settings" tabindex="1"> Settings </div>
				<div class="overlay-header-button" id="overlay-header-button-keybinds" tabindex="1"> Keybinds </div>
				<div class="overlay-header-button hidden" id="overlay-header-button-changelog" tabindex="1"> Changelog
				</div>
				<div class="overlay-header-button" id="overlay-header-button-about" tabindex="1"> About </div>
				<div class="overlay-header-button" id="overlay-header-button-close" style="margin-left:auto"
					tabindex="1"> X </div>
	*/
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

	registerSettingsButton() {
		document.getElementById("settings").addEventListener("click", () => { this.dom.classList.toggle("hidden") })
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
