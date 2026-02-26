//TODO: 
//- allow showing raw data


//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size

import { data } from './js/data.js'
import { settings } from './js/settings.js'
import { Mewgeneric } from './js/mewgenerics/mewgeneric.js'
import { Passive } from './js/mewgenerics/passive.js'

const statTypes = [
	"str",
	"dex",
	"con",
	"int",
	"cha",
	"spd",
	"lck",
]


const elements = {
	passives: {}
}

const blacklist = {
	passives: [
		"EyeCatchin",
		"DeathChill",
		"LongStrider",
		"VoidSoul",
		"Deathless",
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
	const passivesResponse = await fetch("mewgenie-data/passives.json");
	data.passives = await passivesResponse.json();
	const mewgenieResponse = await fetch("mewgenie-data/mewgenie.json");
	data.mewgenie = await mewgenieResponse.json();
}

function getStatName(shortName) {
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
		img.className = "mewgenie-icon"
		img.src = "mewgenie-data/fontIcons/shield.svg"
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
		img.title = getStatName(statName)
		img.className = "mewgenie-icon"
		img.src = "mewgenie-data/fontIcons/" + statName + ".svg"
		span.appendChild(img)
		div.appendChild(span)
	}
	return div

}
/**
 * @param {Mewgeneric} skill
 */
async function makeDescription(skill) {
	let description = document.createElement("div");
	description.className = "sidebar-element-description";
	let desc = skill.getDescription();

	console.log(desc)
	for (var result of desc.matchAll(/\[img:(.*?)\]/g)) {
		desc = desc.replace(result[0], '<img title="' + result[1] + ' " class="mewgenie-icon" src="mewgenie-data/fontIcons/' + result[1] + '.svg">')
	}

	for (var result of desc.matchAll(/\[s:(..*?)\]/g)) {
		desc = desc.replace(result[0], '<i style="color: #FFFA; font-size: ' + result[1] + 'em">(')
		console.log(desc)
	}

	for (var result of desc.matchAll(/\[\/s\]/g)) {
		desc = desc.replace(result[0], ')</i>')
	}

	description.innerHTML = desc;
	return description
}


/**
 * @param {Mewgeneric} skill
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
			show(new Passive(skill.id, i))
		})
		field.appendChild(toggle)
	}
	return field

}
/**
 * @param {Mewgeneric} skill
 */
async function show(skill) {
	if (blacklist.passives.includes(skill.id)) {
		return
	}


	const name = skill.getName()
	const collar = skill.get("class")

	if (name && collar) {
		const sidebar = document.getElementById("sidebar");
		const element = sidebar.getElementsByClassName("sidebar-element")[0]
		element.innerHTML = ""

		const thumbnail = document.createElement("div");
		thumbnail.className = "sidebar-element-thumbnail-passive";

		if (skill.tier > 1 && collar != "Disorder") {
			const crown = document.createElement("img");
			crown.className = "sidebar-element-thumbnail-passive-shell";
			console.log(collar)
			crown.src = "./mewgenie-data/shells/shellPassiveUpgradeCrown" + collar + ".svg"
			thumbnail.appendChild(crown);
		}

		const ability = document.createElement("img");
		ability.className = "sidebar-element-thumbnail-passive-ability";
		ability.src = "mewgenie-data/passiveIcons/" + skill.getIcon() + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "sidebar-element-thumbnail-passive-shell";
		shell.src = "mewgenie-data/shells/shellPassive" + collar + ".svg";
		thumbnail.appendChild(shell);

		if (skill.tier > 1 && collar != "Disorder") {
			const pip = document.createElement("img");
			pip.className = "sidebar-element-thumbnail-passive-shell";
			pip.src = "./mewgenie-data/shells/shellPassiveUpgradePip.svg"
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


		const description = await makeDescription(skill)
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
	show(new Passive(event.currentTarget.skill.id, document.getElementById("sidebar")?.skill?.tier))
}


/**
 * @param {Mewgeneric} skill
 */
async function makeElement(skill) {
	if (blacklist.passives.includes(skill.id)) {
		return
	}
	const name = skill.getName()
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
		ability.src = "mewgenie-data/passiveIcons/" + skill.getIcon() + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "main-thumbnail-passive-shell";
		shell.src = "mewgenie-data/shells/shellPassive" + collar + ".svg";
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
		langToId[object[id].name[settings.lang]] = id
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
		const skill = document.getElementById("sidebar")?.skill;
		if (skill) {
			show(new Passive(skill.id, key))
		}
	}
}

document.addEventListener('keydown', keybindHandler);


async function init() {
	await loadData();

	for (const passiveName in data.passives) {
		const child = await makeElement(
			new Passive(passiveName)
		);
		if (child) {
			document.getElementById("main").appendChild(child)
		}
	}

}


init()
