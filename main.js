//TODO: 
//- allow showing raw data


//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size

import data from './js/data.js'
import settings from './js/settings.js'
import Passive from './js/mewgenerics/passive.js'
import keybinds from './js/keybinds.js'
import table from "./js/ui/table.js"
import filter from "./js/ui/filter.js"

async function sortByLangName(object) {
	const langToId = {}
	for (const id in object) {
		if (data.mewgenie.blacklist.passives.includes(id)) {
			continue
		}
		langToId[data.passives[id].name[settings.lang]] = id
	}

	const sorted = []
	for (const id of Object.keys(langToId).sort()) {
		sorted.push(langToId[id])
	}
	return sorted
}



async function init() {
	await data.init();
	await table.init()

	for (const passiveName of await sortByLangName(data.passives)) {
		if (data.mewgenie.blacklist.passives.includes(passiveName)) {
			continue
		}
		const passive = new Passive(passiveName)
		table.groups["passives"].byId[passive.get("class")].add(passive)
	}

}

init()
keybinds()
