import data from "/js/data.js"

/** @param {any} obj1 
 * @param {any} obj2 */
function recursivelyApply(obj1, obj2) {
	for (const key in obj2) {
		const field = obj2[key]
		if (field instanceof Object) {
			if (!(obj1[key] instanceof Object)) {
				obj1[key] = {}
			}
			recursivelyApply(obj1[key], field)
			continue
		}
		obj1[key] = obj2[key]
	}
} //untested


class Settings {
	constructor() {
		this.defaultConfig = {
			lang: "en",
			collars: {
				Colorless: true,
				Fighter: true,
				Hunter: true,
				Mage: true,
				Tank: true,
				Medic: false,
				Thief: false,
				Necromancer: false,
				Tinkerer: false,
				Butcher: false,
				Druid: false,
				Psychic: false,
				Monk: false,
				Jester: false,
			},
			showDisorders: true,
		}
		this.config = structuredClone(this.defaultConfig)
		this.load()
		this.cache = structuredClone(this.config)
		this.registerElements()
		for (const collarName in this.config.collars) {
			if (this.config.collars[collarName]) {
				this.showCollar(collarName, true)
			}
		}
		this.applyCache()
	}

	registerElements() {
		this.elements = {
			/**@type {Object<string,HTMLElement>} */
			collars: {
			},
		}
		for (const collarName in this.config.collars) {
			const element = document.getElementById("overlay-settings-show-class-" + collarName)
			this.elements.collars[collarName] = element
			element.addEventListener("click", () => {
				if (this.cache.collars[collarName]) {
					this.coverCollar(collarName)
				} else {
					this.showCollar(collarName, true)
				}
				this.notify()
			})
		}

		const showDisorders = document.getElementById("overlay-settings-show-class-Disorder")
		this.elements.showDisorders = showDisorders
		showDisorders.addEventListener("change", () => {
			//@ts-ignore
			this.cache.showDisorders = showDisorders.checked
			this.notify()
		})

		const applyButton = document.getElementById("overlay-settings-apply")
		this.elements.applyButton = applyButton
		applyButton.addEventListener("click", () => {
			this.save()
			location.reload()
		})

		const defaultButton = document.getElementById("overlay-settings-default")
		this.elements.defaultButton = defaultButton
		defaultButton.addEventListener("click", () => {
			this.cache = this.defaultConfig
			this.save()
			location.reload()
		})

		this.elements.flags = {}
		for (const lang in data.mewgenie.languages) {
			const flag = document.getElementById("overlay-settings-flag-" + lang)
			this.elements.flags[lang] = flag
			flag.addEventListener("click", () => {
				this.selectFlag(lang)
			})

		}
	}

	notify() { //the lion doesn't concern himself with perf
		if (JSON.stringify(this.config) == JSON.stringify(this.cache)) {
			this.elements.applyButton.classList.toggle("hidden", true)
		} else {
			this.elements.applyButton.classList.toggle("hidden", false)
		}

		if (JSON.stringify(this.defaultConfig) == JSON.stringify(this.cache)) {
			this.elements.defaultButton.classList.toggle("hidden", true)
		} else {
			this.elements.defaultButton.classList.toggle("hidden", false)
		}
	}

	save() {
		window.localStorage.setItem("config", JSON.stringify(this.cache))
	}
	load() {
		const storage = window.localStorage
		const config = storage.getItem("config")
		if (config) {
			recursivelyApply(this.config, JSON.parse(config))
		}
	}
	reset() {
		window.localStorage.clear()

	}
	/** @param {string} lang */
	selectFlag(lang) {
		const flag = this.elements.flags[lang]
		for (const lang in this.elements.flags) {
			this.elements.flags[lang].classList.toggle("active", false)
		}
		flag.classList.toggle("active", true)
		this.cache.lang = lang
		this.notify()
	}


	/** @param {string} collarName */
	collarChain(collarName) {
		switch (collarName) {
			case "Tank":
				this.showCollar("Medic")
				return
			case "Medic":
				this.showCollar("Thief")
				return
			case "Thief":
				this.showCollar("Necromancer")
				return
			case "Necromancer":
				this.showCollar("Tinkerer")
				this.showCollar("Druid")
				return
			case "Tinkerer":
				this.showCollar("Butcher")
				return
			case "Druid":
				this.showCollar("Psychic")
				return
			case "Psychic":
			case "Butcher":
				if (this.cache.collars.Psychic && this.cache.collars.Butcher) {
					this.showCollar("Monk")
					this.showCollar("Jester")
				}
		}
	}

	applyCache() {
		const collars = this.cache.collars
		for (const collarName in collars) {
			if (collars[collarName]) {
				this.showCollar(collarName)
			} else {
				this.coverCollar(collarName)
			}
		}
		this.elements.showDisorders.checked = this.cache.showDisorders
		this.selectFlag(this.cache.lang)
	}
	/** @param {string} collarName 
	 * @param {boolean} [fully] */
	showCollar(collarName, fully) {
		this.elements.collars[collarName].classList.toggle("hidden", false)
		if (fully) {
			this.elements.collars[collarName].classList.toggle("covered", false)
			this.cache.collars[collarName] = true
			this.collarChain(collarName)
		}
	}

	/** @param {string} collarName */
	coverCollar(collarName) {
		this.elements.collars[collarName].classList.toggle("covered", true)
		this.cache.collars[collarName] = false
	}

}

export default new Settings()
