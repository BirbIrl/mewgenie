export const data = {
	passives: null,
	mewgenie: null,
}



export async function loadData() {
	const passivesResponse = await fetch("../mewgenie-data/passives.json");
	data.passives = await passivesResponse.json();
	const mewgenieResponse = await fetch("../mewgenie-data/mewgenie.json");
	data.mewgenie = await mewgenieResponse.json();
}

export default data
