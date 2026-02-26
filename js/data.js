export const data = {
	passives: null,
}


export const blacklist = {
	passives: [
		"EyeCatchin",
		"DeathChill",
		"LongStrider",
		"VoidSoul",
		"Deathless",
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


export const statTypes = [
	"str",
	"dex",
	"con",
	"int",
	"cha",
	"spd",
	"lck",
]


export async function loadData() {
	const passivesResponse = await fetch("../mewgenie-data/passives.json");
	data.passives = await passivesResponse.json();
	const mewgenieResponse = await fetch("../mewgenie-data/mewgenie.json");
	data.mewgenie = await mewgenieResponse.json();
}
