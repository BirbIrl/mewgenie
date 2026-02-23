//TODO: mewbox-unboxer should output the stat icons in a fixed size

const lang = "en"
var upgraded = false

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

async function makeStatsElement(skillName) {
	const skill = data.passives[skillName]
	const collar = skill["class"]
	var specs
	if (collar == "Disorder") {
		specs = skill
	} else if (upgraded) {
		specs = skill[2]
	} else {
		specs = skill[1]
	}
	var stats = specs.stats


	const div = document.createElement("div");
	div.className = "sidebar-stats";
	if (specs.shield) {
		console.log("Hi!")
		let span = document.createElement("span")
		span.style = "white-space: nowrap"
		span.appendChild(document.createTextNode("+" + specs.shield + " "));
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

async function makeUpgradeToggle() {
	const toggle = document.createElement("div");
	toggle.className = "sidebar-upgradeToggle"
	toggle.textContent = "Toggle Upgrade"
	toggle.addEventListener("click", () => {
		upgraded = !upgraded;
		show(document.getElementById("sidebar").skillName)
	})
	return toggle

}
async function show(skillName) {
	if (blacklist.passives.includes(skillName)) {
		return
	}
	const name = data.passives[skillName].name[lang]
	const collar = data.passives[skillName]["class"]


	let desc
	if (collar != "Disorder" && upgraded) {
		desc = data.passives[skillName][2].desc[lang]
	} else {
		desc = data.passives[skillName].desc[lang]

	}
	if (!!name && !!collar) {


		const sidebar = document.getElementById("sidebar");
		sidebar.innerHTML = ""
		sidebar.skillName = skillName

		const thumbnail = document.createElement("div");
		thumbnail.className = "sidebar-thumbnail-passive";

		if (upgraded) {
			const crown = document.createElement("img");
			crown.className = "sidebar-thumbnail-passive-shell";
			crown.src = "./mewbox-data/shells/shellPassiveUpgradeCrown.svg"
			thumbnail.appendChild(crown);
		}

		const ability = document.createElement("img");
		ability.className = "sidebar-thumbnail-passive-ability";
		ability.src = "mewbox-data/passiveIcons/" + skillName + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "sidebar-thumbnail-passive-shell";
		shell.src = "mewbox-data/shells/shellPassive" + collar + ".svg";
		thumbnail.appendChild(shell);

		if (upgraded) {
			const pip = document.createElement("img");
			pip.className = "sidebar-thumbnail-passive-shell";
			pip.src = "./mewbox-data/shells/shellPassiveUpgradePip.svg"
			thumbnail.appendChild(pip);
		}

		sidebar.appendChild(thumbnail);

		const title = document.createElement("div");
		title.className = "sidebar-name";
		title.textContent = name
		sidebar.appendChild(title);


		const stats = await makeStatsElement(skillName)
		if (!!stats) {
			sidebar.appendChild(stats);
		}


		const description = document.createElement("div");
		description.className = "sidebar-description";
		description.textContent = desc
		sidebar.appendChild(description);

		if (collar != "Disorder") {
			sidebar.appendChild(await makeUpgradeToggle())
		}


		return
	}
	console.warn("Couldn't load " + skillName + " with traits name: " + name + " and class: " + collar)


}


async function elementOnClick(event) {
	const skillName = event.currentTarget.skillName
	upgraded = false
	show(skillName)
}

async function makeElement(skillName) {
	if (blacklist.passives.includes(skillName)) {
		return
	}
	const name = data.passives[skillName].name[lang]
	const collar = data.passives[skillName]["class"]
	if (!!name && !!collar) {
		const main = document.createElement("div");
		main.className = "main-element";
		main.skillName = skillName;
		main.addEventListener("click", elementOnClick);
		const thumbnail = document.createElement("div");
		thumbnail.className = "main-thumbnail-passive";

		const ability = document.createElement("img");
		ability.className = "main-thumbnail-passive-ability";
		ability.src = "mewbox-data/passiveIcons/" + skillName + ".svg"
		thumbnail.appendChild(ability);

		const shell = document.createElement("img");
		shell.className = "main-thumbnail-passive-shell";
		shell.src = "mewbox-data/shells/shellPassive" + collar + ".svg";
		thumbnail.appendChild(shell);

		main.appendChild(thumbnail);
		main.appendChild(document.createTextNode(name));

		return main;
	}
	console.warn("Couldn't load " + skillName + " with traits name: " + name + " and class: " + collar)
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
	console.log(sorted)
	return sorted

}

await loadData();




for (const passiveName of await sortByLangName(data.passives)) {
	const child = await makeElement(passiveName);
	if (!!child) {
		document.getElementById("main").appendChild(child)
	}
}

console.log(data.passives.Omniscience)
console.log(data.passives)
