import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Character = new Schema({
	name: { type: String },
	title: { type: String },
	lore: { type: String },
	blurb: { type: String },
	tags: [{ type: String }],
	partype: { type: String },
	passive: {
		name: { type: String },
		description: { type: String },
		passive_image: { type: String },
	},
	spells: [
		{
			id: { type: String },
			name: { type: String },
			description: { type: String },
			spell_image: [{ type: String }],
		},
	],
	image_loading: { type: String },
	image_splash: { type: String },
	image_square: { type: String },
});

export default mongoose.model('characters', Character);
