import Passive from '/js/mewgenerics/passive.js'
/**
 * @param {Mewgeneric} skill
 */
async function makeDescription(skill) {
	let description = document.createElement("div");
	description.className = "sidebar-element-description";
	let desc = skill.getDescription();

	for (var result of desc.matchAll(/\[img:(.*?)\]/g)) {
		desc = desc.replace(result[0], '<img title="' + result[1] + ' " class="mewgenie-icon" src="mewgenie-data/fontIcons/' + result[1] + '.svg">')
	}

	for (var result of desc.matchAll(/\[s:(..*?)\]/g)) {
		desc = desc.replace(result[0], '<i style="color: #FFFA; font-size: ' + result[1] + 'em">(')
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




// i need to refactor this...
/**
 * @param {Mewgeneric} skill
 */
export async function show(skill) {


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
