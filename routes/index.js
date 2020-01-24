const express = require('express');
const router = express.Router();
let datas = [];
let counter = new Map();
// key category

//create data
const category = ["IT", "WEB", "GAME", "OTHER"];
const times = ["once", "twice", "thrice", "more"];
const gender = ["man", "woman", "other"];
const generation = ["eccStudent", "student", "teacher", "bender", "other"];
const genre = ["category", "times", "gender", "generation"];

for (let i = 0; i < 10; i++) {
  let tmp = [category[Math.floor(Math.random() * 10) % category.length], times[Math.floor(Math.random() * 10) % times.length], gender[Math.floor(Math.random() * 10) % gender.length], generation[Math.floor(Math.random() * 10) % generation.length]];

  datas.push([{
    "category": tmp[0],
    "times": tmp[1],
    "gender": tmp[2],
    "generation": tmp[3]
  }]);


  for(let j = 0; j < genre.length; j++){
    const promise = new Promise((resolve, reject) => {
      const map = counter.get(genre[j]) || new Map();

    if (map.has(tmp[j])) {
      map.set(tmp[j], map.get(tmp[j]) + 1);
    } else {
      map.set(tmp[j], 1);
    }

    counter.set(genre[j], map);
    resolve(counter);
    }).then((data) => {

    });
  }
}



/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


//GET form page
router.get('/form', (req, res, next) => {
  res.render('form');
});

router.post('/form', (req, res, next) => {
  datas.push(req.body);
  res.redirect('/form');

});

router.get('/api/v1/vote', (req, res, next) => {
  res.json(datas);
});

router.get('/api/v1/counter', (req, res, next) => {
  res.json([...counter].map((kv) => [...kv].map((keyValue) => [...keyValue])));
});


module.exports = router;
