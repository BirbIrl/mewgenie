//TODO: 
//- allow showing raw data


//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size

import data from './js/data.js'
import keybinds from './js/keybinds.js'
import table from "./js/ui/table.js"




import passives from './js/groups/passives.js'
import actives from './js/groups/actives.js'
import items from './js/groups/items.js'


async function init() {
	await data.loadPassives();

	await passives.init()

	table.showGroup(passives)

	actives.init()
	items.init()

}

init()
keybinds()
