//TODO: 
//- mewbox-unboxer should output the stat icons in a fixed size
//- deja vu has three upgrade tiers. support for buttons for any number of tiers
//	- allow for name overrides in upgrades
//- split by classes
//- allow showing raw data
//- 

const lang = "en"

const statTypes = [
	"str",
	"dex",
	"con",
	"int",
	"cha",
	"spd",
	"lck",
]

const data = {
	passives: null,
}

const blacklist = {
	passives: [
		"EyeCatchin",
		"DeathChill",
		"LongStrider",
		"VoidSoul",
		"STARTER_PLACEHOLDER_Butcher",
		"STARTER_PLACEHOLDER_Colorless",
		"STARTER_PLACEHOLDER_Druid",
		"STARTER_PLACEHOLDER_Fighter",
		"STARTER_PLACEHOLDER_Hunter",
		"STARTER_PLACEHOLDER_Jester",
		"STARTER_PLACEHOLDER_Mage",
		"STARTER_PLACEHOLDER_Medic",
		"STARTER_PLACEHOLDER_Monk",
		"STARTER_PLACEHOLDER_Necromancer",
		"STARTER_PLACEHOLDER_Psychic",
		"STARTER_PLACEHOLDER_Tank",
		"STARTER_PLACEHOLDER_Thief",
		"STARTER_PLACEHOLDER_Tinkerer",
	]
}

async function loadData() {
	const response = await fetch("mewbox-data/passives.json");
	data.passives = await response.json();
}

async function getStatName(shortName) {
	switch (shortName) {
		case "str":
			return "Strength";
		case "dex":
			return "Dexterity";
		case "con":
			return "Constitution";
		case "int":
			return "Intelligence";
		case "cha":
			return "Charisma";
		case "spd":
			return "Speed";
		case "lck":
			return "Luck";
	}
	console.error("Couldn't index stat called: " + shortName)
}


class Skill {
	constructor(skillId, tier) {
		this.id = skillId
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

	getIcon() {
		let icon = this.get("icon")
		return icon ?? this.id
	}

}

async function makeStatsElement(skill) {
	const stats = skill.get("stats")
	const shield = skill.get("shield")


	const div = document.createElement("div");
	div.className = "sidebar-element-stats";
	if (shield) {
		let span = document.createElement("span")
		span.style = "white-space: nowrap"
		span.appendChild(document.createTextNode("+" + shield + " "));
		const img = document.createElement("img")
		img.title = "Shield"
		img.className = "mewbox-icon"
		img.src = "mewbox-data/fontIcons/Shield.svg"
		span.appendChild(img)
		div.appendChild(span)
	}
	if (!stats) {
		return div
	}
	for (const statName of statTypes.values()) {
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
		img.title = await getStatName(statName)
		img.className = "mewbox-icon"
		img.src = "mewbox-data/fontIcons/" + statName + ".svg"
		span.appendChild(img)
		div.appendChild(span)
	}
	return div

}


/**
 * @param {Skill} skill
 */
async function makeTierToggle(skill) {
	const field = document.createElement("div");
	field.className = "sidebar-tierChanger"

	if (skill.maxTier < 2) {
		return field
	}
	for (let i = 1; i <= skill.maxTier; i++) {
		const toggle = document.createElement("div");
		toggle.classList.add("sidebar-tierChanger-button")
		toggle.classList.add("toggle")
		toggle.textContent = i
		toggle.addEventListener("click", () => {
			show(new Skill(skill.id, i))
		})
		field.appendChild(toggle)
	}
	return field

}
/**
 * @param {Skill} skill
 */
async function show(skill) {
	if (blacklist.passives.includes(skill.id)) {
		return
	}


	const name = skill.get("name")[lang]
	const collar = skill.get("class")
	const desc = skill.get("desc")[lang]
	console.log(name, desc, skill.tier)
	console.log(skill)

	if (name && collar) {
		const sidebar = document.getElementById("sidebar");
		const element = sidebar.getElementsByClassName("sidebar-element")[0]
		element.innerHTML = ""

		const thumbnail = document.createElement("div");
		thumbnail.className = "sidebar-element-thumbnail-passive";

		if (skill.tier > 1 && collar != "Disorder") {
			const crown = document.createElement("img");
			crown.className = "sidebar-element-thumbnail-passive-shell";
			crown.src = "./mewbox-data/shells/shellPassiveUpgradeCrown.svg"
			thumbnail.appendChild(crown);
		}

		const ability = document.createElement("img");
		ability.className = "sidebar-element-thumbnail-passive-ability";
		ability.src = "mewbox-data/passiveIcons/" + skill.getIcon() + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "sidebar-element-thumbnail-passive-shell";
		shell.src = "mewbox-data/shells/shellPassive" + collar + ".svg";
		thumbnail.appendChild(shell);

		if (skill.tier > 1 && collar != "Disorder") {
			const pip = document.createElement("img");
			pip.className = "sidebar-element-thumbnail-passive-shell";
			pip.src = "./mewbox-data/shells/shellPassiveUpgradePip.svg"
			thumbnail.appendChild(pip);
		}

		element.appendChild(thumbnail);

		const title = document.createElement("div");
		title.className = "sidebar-element-name";
		title.textContent = name
		element.appendChild(title);


		const stats = await makeStatsElement(skill)
		if (stats) {
			element.appendChild(stats);
		}


		const description = document.createElement("div");
		description.className = "sidebar-element-description";
		description.textContent = desc
		element.appendChild(description);




		let tierToggle = sidebar.getElementsByClassName("sidebar-tierChanger")[0]
		if (skill.id != sidebar.skill?.id) {
			if (tierToggle) {
				sidebar.removeChild(tierToggle)
			}
			tierToggle = await makeTierToggle(skill)
			sidebar.appendChild(tierToggle)
		}

		const tierToggles = tierToggle.getElementsByClassName("sidebar-tierChanger-button")
		Array.from(tierToggles).forEach((tierToggle, index) => {
			tierToggle.classList.remove("active")
			if (index + 1 == skill.tier)
				tierToggle.classList.add("active")
		});
		sidebar.prepend(element)
		sidebar.skill = skill

		return
	}
	console.warn("Couldn't load " + skill.id + " with traits name: " + name + " and class: " + collar)


}


async function elementOnClick(event) {
	show(new Skill(event.currentTarget.skill.id, document.getElementById("sidebar")?.skill?.tier))
}


/**
 * @param {Skill} skill
 */
async function makeElement(skill) {
	if (blacklist.passives.includes(skill.id)) {
		return
	}
	const name = skill.get("name")[lang]
	const collar = skill.get("class")
	if (name && collar) {
		const main = document.createElement("div");
		main.className = "main-element";
		main.skill = skill;
		main.addEventListener("click", elementOnClick);

		const thumbnail = document.createElement("div");
		thumbnail.className = "main-thumbnail-passive";

		const ability = document.createElement("img");
		ability.className = "main-thumbnail-passive-ability";
		ability.src = "mewbox-data/passiveIcons/" + skill.getIcon() + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "main-thumbnail-passive-shell";
		shell.src = "mewbox-data/shells/shellPassive" + collar + ".svg";
		thumbnail.appendChild(shell);

		main.appendChild(thumbnail);
		main.appendChild(document.createTextNode(name));

		return main;
	}
	console.warn("Couldn't load " + skill.id + " with traits name: " + name + " and class: " + collar)
}

async function sortByLangName(object) {
	const langToId = {}
	for (const id in object) {
		if (blacklist.passives.includes(id)) {
			continue
		}
		langToId[object[id].name[lang]] = id
	}

	const sorted = []
	for (const id of Object.keys(langToId).sort()) {
		sorted.push(langToId[id])
	}
	return sorted

}

/**
 * @param {KeyboardEvent} event - The keyboard event object.
 */
async function keybindHandler(event) {
	let key = event.key
	if (!isNaN(Number.parseInt(key))) {
		if (key == 0) {
			key = 10
		}
		console.log(Number.parseInt(key))
		const skill = document.getElementById("sidebar")?.skill;
		if (skill) {
			show(new Skill(skill.id, key))
		}
	}
}

document.addEventListener('keydown', keybindHandler);

async function init() {
	await loadData();

	for (const passiveName of await sortByLangName(data.passives)) {
		const child = await makeElement(
			new Skill(passiveName)
		);
		if (child) {
			document.getElementById("main").appendChild(child)
		}
	}

}


init()
