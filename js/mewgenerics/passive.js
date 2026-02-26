import { Mewgeneric } from './mewgeneric.js'
import { data } from '../data.js'

/* Todo: instead of using get every time just load the entire class except for numbered keys and then overwrite them with the tier selected*/
export class Passive extends Mewgeneric {
	constructor(skillId, tier) {
		super(skillId);
		this.data = data.passives[this.id];
		this.tier = tier ?? 1;

		this.maxTier = 1
		while (this.data[this.maxTier + 1]) {
			this.maxTier++
		}
		if (this.tier > this.maxTier)
			this.tier = this.maxTier

	}

	get(key, tier) {
		tier = tier ?? this.tier
		var value;
		for (let i = tier; i > 0; i--) {
			if (this.data[i]) {
				value = this.data[i][key]
				if (value)
					return value
			}
		}
		return this.data[key]
	}


}
