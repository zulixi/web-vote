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

for(let i =0; i < 10; i++){
  let tmp = [category[Math.floor(Math.random()*10)%category.length], times[Math.floor(Math.random()*10)%times.length], gender[Math.floor(Math.random()*10)%gender.length], generation[Math.floor(Math.random()*10)%generation.length]];
  let str = ["category", "times", "gender", "generation"];

  datas.push([{
    "category": tmp[0],
    "times": tmp[1],
    "gender": tmp[2],
    "generation": tmp[3]
  }]);

  let map = counter.get(category[0]) || new Map();
  if(map.has(tmp[0])){
    map.set(tmp[0], map.get(tmp[0]+1))
  }
  map.set(tmp[0], 1);

  for(let i = 0; i < tmp.length; i++){
    
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

router.get('/api/v1/', (req, res, next) => {
  res.json({
    datas
  });
});

module.exports = router;
