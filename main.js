//TODO:
// show sources of abilities, passives, where they can be acquired (leve up/other abilities)

//Known issues:
//- mewgenie-unboxer should output the stat icons in a fixed size
//- icons in sidebar are broken
import data from './js/data.js'
import table from "./js/ui/table.js"

// load groups
import passives from './js/groups/passives.js'
import actives from './js/groups/actives.js'


// enable keybinds
import './js/keybinds.js'


async function init() {
	await data.loadPassives();

	await passives.init()

	table.showGroup(passives)

	await data.loadAbilities();
	actives.init()

	items.init()

}

init()
