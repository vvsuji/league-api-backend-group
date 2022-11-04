import axios from 'axios';
import db from '../db/connection.js';
import Character from '../models/Character.js';
// import characters from './characters.json' assert { type: 'json' };

const insertData = async (characters) => {
	const charactersData = [];

	for (const char in characters) {
		// let spells = characters[char].spells.id;

		charactersData.push({
			name: char,
			title: characters[char].title,
			blurb: characters[char].blurb,
			lore: characters[char].lore,
			tags: characters[char].tags,
			partype: characters[char].partype,
			passive: {
				name: characters[char].name,
				description: characters[char].description,
				passive_image: `http://ddragon.leagueoflegends.com/cdn/img/champion/passive/${char}_P.png`,
			},
			spells: [
				{
					id: characters[char].id,
					name: characters[char].name,
					description: characters[char].description,
					spell_image: [
						`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${spells}.png`, //iterate thru for each champs spell, 4 of them
					],
				},
			],
			image_loading: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${char}_0.jpg`,
			image_splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${char}_0.jpg`,
			image_square: `http://ddragon.leagueoflegends.com/cdn/img/champion/${char}.png`,
		});
	}

	// reset database
	await db.dropDatabase();
	// insert data
	await Character.create(charactersData);
	// close db connection
	await db.close();
};

const fetchCharacters = async () => {
	let characters = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json`,
	);
	insertData(characters.data.data);
};

fetchCharacters();
