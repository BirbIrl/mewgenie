import Active from "/js/mewgenerics/active.js"
import data from "/js/data.js"
import settings from "/js/ui/settings.js"

export function sortByLangName(object, mewgenericType, blacklist) {
	const langToMewGeneric = {}
	for (const id in object) {
		if (blacklist && blacklist.includes(id)) {
			continue
		}
		const lastChar = id.charAt(id.length - 1)
		// this is the line of code you're looking for, sorry
		if (mewgenericType == Active && (lastChar == "2" || lastChar == "3")) {
			continue
		}
		const mewgeneric = new mewgenericType(id)
		const name = mewgeneric.getName()
		if (name && mewgeneric.get("class") && mewgeneric.getDescription())
			langToMewGeneric[name] = mewgeneric
	}

	const sorted = []
	for (const mewgeneric of Object.keys(langToMewGeneric).sort()) {
		sorted.push(langToMewGeneric[mewgeneric])
	}
	return sorted
}
