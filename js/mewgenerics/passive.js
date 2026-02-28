import Mewgeneric from '/js/mewgenerics/mewgeneric.js'
import data from '/js/data.js'

/* Todo: instead of using get every time just load the entire class except for numbered keys and then overwrite them with the tier selected*/
export class Passive extends Mewgeneric {
	/** @param {string} skillId
	* @param {number} tier */
	constructor(skillId, tier) {
		super(skillId);
		this.data = data.passives[this.id];
		this.tier = tier ?? 1;

		this.maxTier = 1
		while (this.data[this.maxTier + 1]) {
			this.maxTier++
		}
		if (this.tier > this.maxTier)
			this.tier = this.maxTier

	}

	/** @param {string} key 
	 * @param {number} [tier]
	 * @returns {any} */
	get(key, tier) {
		tier = tier ?? this.tier
		var value;
		for (let i = tier; i > 0; i--) {
			if (this.data[i]) {
				value = this.data[i][key]
				if (value)
					return value
			}
		}
		return this.data[key]
	}
	/** @param {number} scale 
	 * @returns {Promise<HTMLElement>}
	*/
	async makeThumbnail(scale) {
		const collar = this.get("class")
		const thumbnail = document.createElement("div");

		if (this.tier > 1 && collar != "Disorder") {
			const crown = document.createElement("img");
			crown.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
			crown.src = "./mewgenie-data/shells/shellPassiveUpgradeCrown" + collar + ".svg"
			crown.className = "thumbnail-passive";
			thumbnail.appendChild(crown);
		}

		const ability = document.createElement("img");
		ability.style.transform = "translate(-50%, -40%) scale(" + scale + ")";
		ability.src = "mewgenie-data/passiveIcons/" + this.getIcon() + ".svg"
		ability.className = "thumbnail-passive";
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
		shell.src = "mewgenie-data/shells/shellPassive" + collar + ".svg";
		shell.className = "thumbnail-passive";
		thumbnail.appendChild(shell);

		if (this.tier > 1 && collar != "Disorder") {
			const pip = document.createElement("img");
			pip.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
			pip.src = "./mewgenie-data/shells/shellPassiveUpgradePip.svg"
			pip.className = "thumbnail-passive";
			thumbnail.appendChild(pip);
		}
		return thumbnail


	}
}



export default Passive
