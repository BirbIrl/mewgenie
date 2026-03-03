class Data {

	async init() {
		const mewgenieResponse = await fetch("../mewgenie-data/mewgenie.json");
		this.mewgenie = await mewgenieResponse.json();

	}
	async loadPassives() {
		const passivesResponse = await fetch("../mewgenie-data/passives.json");
		this.passives = await passivesResponse.json();
	}

}

const data = new Data()
await data.init()

export default data
