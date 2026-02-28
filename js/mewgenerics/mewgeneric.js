import settings from '/js/settings.js'
/** @interface */
export class Mewgeneric {

	/** @param {string} id 
	 * @param {number} tier */
	constructor(id, tier = 1) {
		this.id = id
		this.maxTier = 1
		this.tier = tier
	}
	/** @param {string} key 
	 * @param {number} [tier]
	 * @returns {any} */
	get(key, tier) { throw "this is an interface" }
	/** @param {number} scale 
	 * @returns {Promise<HTMLElement>}
	 */
	async makeThumbnail(scale) { throw "this is an interface" }
	getIcon() {
		let icon = this.get("icon")
		return icon ?? this.id
	}
	/**
	 * @returns {String}
	 */
	getName() {
		return this.get("name")[settings.lang]
	}
	/**
	 * @returns {String}
	 */
	getDescription() {
		return this.get("desc")[settings.lang]
	}

	async makeMainElement() { }

	async makeSidebarThumbnail() { }
}

export default Mewgeneric
