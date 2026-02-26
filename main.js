//TODO: 
//- allow showing raw data


//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size

import { data, loadData, blacklist } from './js/data.js'
import settings from './js/settings.js'
import Passive from './js/mewgenerics/passive.js'
import keybinds from './js/keybinds.js'

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



async function init() {
	await loadData();

	for (const passiveName in data.passives) {
		if (blacklist.passives.includes(passiveName)) {
			continue
		}
		const child =
			await (new Passive(passiveName).makeElement())
		if (child) {
			document.getElementById("main").appendChild(child)
		}
	}

}


init()
keybinds()
