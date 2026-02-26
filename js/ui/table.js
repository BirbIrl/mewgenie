import { show } from '/js/ui/sidebar.js'

//TODO this is dumb, i should just have an object for the main content/sidebar maybe?

export async function addToTable(skill) {
	const name = skill.getName()
	const collar = skill.get("class")
	if (name && collar) {
		const main = document.createElement("div");
		main.className = "main-element";
		const thumbnail = document.createElement("div")
		thumbnail.className = "main-element-thumbnail-passive"
		thumbnail.appendChild(await skill.makeThumbnail(1.5));
		main.appendChild(thumbnail)
		main.skill = skill
		main.appendChild(document.createTextNode(name));
		main.addEventListener("click", elementOnClick);

		return main;
	}
	console.warn("Couldn't load " + skill.id + " with traits name: " + name + " and class: " + collar)
}


async function elementOnClick(event) {
	const skill = event.currentTarget.skill
	show(new skill.constructor(skill.id, document.getElementById("sidebar")?.skill?.tier))
}
