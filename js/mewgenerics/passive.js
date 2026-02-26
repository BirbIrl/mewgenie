import Mewgeneric from '/js/mewgenerics/mewgeneric.js'
import data from '/js/data.js'
import { show } from '/js/sidebar.js'

/* Todo: instead of using get every time just load the entire class except for numbered keys and then overwrite them with the tier selected*/
export class Passive extends Mewgeneric {
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

	/**
	 * @param {Mewgeneric} skill
	 */
	async makeElement() {
		const name = this.getName()
		const collar = this.get("class")
		if (name && collar) {
			const main = document.createElement("div");
			main.className = "main-element";
			main.skill = this;
			main.addEventListener("click", elementOnClick);

			const thumbnail = document.createElement("div");
			thumbnail.className = "main-thumbnail-passive";

			const ability = document.createElement("img");
			ability.className = "main-thumbnail-passive-ability";
			ability.src = "mewgenie-data/passiveIcons/" + this.getIcon() + ".svg"
			thumbnail.appendChild(ability);

			const shell = document.createElement("img");
			shell.className = "main-thumbnail-passive-shell";
			shell.src = "mewgenie-data/shells/shellPassive" + collar + ".svg";
			thumbnail.appendChild(shell);

			main.appendChild(thumbnail);
			main.appendChild(document.createTextNode(name));

			return main;
		}
		console.warn("Couldn't load " + this.id + " with traits name: " + name + " and class: " + collar)
	}
}


async function elementOnClick(event) {
	show(new Passive(event.currentTarget.skill.id, document.getElementById("sidebar")?.skill?.tier))
}

export default Passive
