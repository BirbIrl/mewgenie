import Mewgeneric from '/js/mewgenerics/mewgeneric.js'
import data from '/js/data.js'

/* Todo: instead of using get every time just load the entire class except for numbered keys and then overwrite them with the tier selected*/
export class Active extends Mewgeneric {
	/** @param {string} skillId
	* @param {number} [tier] */
	constructor(skillId, tier) {
		super(skillId);
		this.tier = tier ?? 1;
		this.data = data.abilities[this.id];
		this.upgradeData = data.abilities[this.id + 2]

		if (this.upgradeData) {
			this.maxTier = 2
		} else {
			this.maxTier = 1
		}

	}

	/** @param {string} key 
	 * @param {number} [tier]
	 * @returns {any} */
	get(key, tier) {
		tier = tier ?? this.tier
		if (tier == 1) {
			return this.data?.meta?.[key] ?? this.data[key]
		} else if (tier == 2) {
			return this.upgradeData?.meta?.[key] ?? this.upgradeData[key]
		}
		throw Error("Actives don't support tier: " + tier)
	}

	getIcon() {
		return this.get("ability_icon") || this.id
	}
	/** @param {number} scale 
	 * @returns {HTMLElement}
	*/
	makeThumbnail(scale) {
		/* 
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
		*/

		const thumbnail = document.createElement("div");

		const ability = document.createElement("img");
		ability.style.transform = "translate(-50%, -40%) scale(" + scale + ")";
		ability.src = "mewgenie-data/abilityIcons/" + this.getIcon() + ".svg"

		return thumbnail


	}
}



export default Active
