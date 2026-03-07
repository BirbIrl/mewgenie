import data from "/js/data.js"
import settings from "/js/ui/settings.js"

export function sortByLangName(object) {
	const langToId = {}
	for (const id in object) {
		if (data.mewgenie.blacklist.passives.includes(id)) {
			continue
		}
		langToId[data.passives[id].name[settings.config.lang]] = id
	}

	const sorted = []
	for (const id of Object.keys(langToId).sort()) {
		sorted.push(langToId[id])
	}
	return sorted
}
