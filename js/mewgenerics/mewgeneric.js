import { settings } from '../settings.js'
export class Mewgeneric {

	constructor(id) {
		this.id = id
	}
	get() { }
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
}
