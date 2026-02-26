class Data {
	async init() {
		const passivesResponse = await fetch("../mewgenie-data/passives.json");
		this.passives = await passivesResponse.json();
		const mewgenieResponse = await fetch("../mewgenie-data/mewgenie.json");
		this.mewgenie = await mewgenieResponse.json();
	}

}


export default new Data()
