import axios from 'axios';
import db from '../db/connection.js';
import Character from '../models/Character.js';

const extractDataWeWant = (characters) => {
	return characters.map((characterObj) => {
		const charName = characterObj.id;
		return {
			name: charName,
			title: characterObj.title,
			blurb: characterObj.blurb,
			lore: characterObj.lore,
			tags: characterObj.tags,
			partype: characterObj.partype,
			passive: {
				name: characterObj.name,
				description: characterObj.description,
				passive_image: `http://ddragon.leagueoflegends.com/cdn/img/champion/passive/${charName}_P.png`,
			},
			// For each spell, extract an object of data we want
			spells: characterObj.spells.map((spell) => ({
				id: spell.id,
				name: spell.name,
				description: spell.description,
				spell_image: [
					`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${spell.id}.png`,
				],
			})),
			image_loading: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${charName}_0.jpg`,
			image_splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${charName}_0.jpg`,
			image_square: `http://ddragon.leagueoflegends.com/cdn/img/champion/${charName}.png`,
		};
	});
};

const insertData = async (characters) => {
	await db.dropDatabase();

	const reqPromises = Object.keys(characters).map((char) => {
		return axios.get(
			`http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion/${char}.json`,
		);
	});

	const characterData = await (
		await Promise.all(reqPromises)
	).map((char) => {
		const champName = Object.keys(char.data.data)[0];
		return char.data.data[champName];
	});
	// Now that we have *all* the data, extract just the data that we want
	const dataWeWant = extractDataWeWant(characterData);

	await Character.create(dataWeWant);
	await db.close();
};

const fetchCharacters = async () => {
	const characters = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json`,
	);
	insertData(characters.data.data);
};

fetchCharacters();
