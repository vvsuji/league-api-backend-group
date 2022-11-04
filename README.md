## About

REST API for League of Legends with full CRUD functionality

## How to Use

go to https://league-api-production.up.railway.app/characters to view a json file of all of the characters plus the info from the model

## Model for Characters

```
  const Character = new Schema({
  name: { type: String },
  title: { type: String },
  blurb: { type: String },
  image_loading: { type: String },
  image_splash: { type: String },
  tags: [{ type: String }],
  partype: { type: String },
});
```

## Resources

League of Legends API :
http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json
