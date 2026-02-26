//TODO: 
//- allow showing raw data


//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size

import data from './js/data.js'
import settings from './js/settings.js'
import Passive from './js/mewgenerics/passive.js'
import keybinds from './js/keybinds.js'
import table from "./js/ui/table.js"

async function sortByLangName(object) {
	const langToId = {}
	for (const id in object) {
		if (data.mewgenie.blacklist.passives.includes(id)) {
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
	await data.init();

	for (const passiveName in data.passives) {
		if (data.mewgenie.blacklist.passives.includes(passiveName)) {
			continue
		}
		table.add(new Passive(passiveName))
	}

}

init()
keybinds()
