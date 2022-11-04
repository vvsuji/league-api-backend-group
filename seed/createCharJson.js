import axios from 'axios';
import db from '../db/connection.js';
import Character from '../models/Character.js';

const insertData = async (characters) => {
	await db.dropDatabase();

	for (const char in characters) {
		let urlString = `http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion/${char}.json`;

		let response = await axios.get(urlString);

		// Add passive image
		response.data.data[
			char
		].passive.passive_image = `http://ddragon.leagueoflegends.com/cdn/img/champion/passive/${char}_P.png`;

		console.log(response.data.data[char]);
		console.log(response.data.data[char].passive);

		// Add spells
		// response.data.data[char].spells.forEach((spell) => {
		// 	spell.spell_image = `http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${spell.id}.png`;
		// });

		// Add loading image
		// response.data.data[
		// 	char
		// ].image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${char}_0.jpg`;

		// response.data.data[
		// 	char
		// ].image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${char}_0.jpg`;

		// response.data.data[
		// 	char
		// ].image_square = `http://ddragon.leagueoflegends.com/cdn/img/champion/${char}.png`;

		// await Character.create(response.data[char]);
	}

	// await db.close();
};

const fetchCharacters = async () => {
	let characters = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json`,
	);
	insertData(characters.data.data);
};

fetchCharacters();
