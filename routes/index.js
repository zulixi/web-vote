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

  for (let j = 0; j < genre.length; j++) {
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
  res.redirect('/form')
  // res.render('index', { title: 'Express' });
});

//GET form page
router.get('/form', (req, res, next) => {
  res.render('formDev');
});

router.post('/form', (req, res, next) => {
  datas.push(req.body);
  

  setData(genre[0], req.body.category);
  setData(genre[1], req.body.times);
  setData(genre[2], req.body.gender);
  setData(genre[3], req.body.generation);
  res.render('result');
});

function setData(str, str2){
  const promise2 = new Promise((resolve, reject) => {
    const map = counter.get(str) || new Map();

    if(map.has(str2)){
      map.set(str2, map.get(str2) +1);
    }else{
      map.set(str2, 1);
    }

    counter.set(str, map);
    resolve(counter)
  }).then(data => {
    console.log(data);
  })
}

router.get('/api/v1/vote', (req, res, next) => {
  res.json(datas);
});

router.get('/api/v1/counter', (req, res, next) => {
  res.json([...counter].map((kv) => [...kv].map((keyValue) => [...keyValue])));
});

router.get('/api/v1/cnt', (req, res, next) => {
  let arr = new Array();
  //TODO map 
  // let map = new Map();

  Array.from(counter).map(keyValue => {
    Array.from(keyValue).map(kv => {
      let tmp = new Array();
      let temp = new Array();
      Array.from(kv).map(item => {

        if (!isNaN(item[1])) {
          tmp.push(item[1]);
          temp.push(item[0]);
        }

      });
      if (tmp.length > 0) {
        arr.push([tmp, temp]);
      }
    });
  });
  // const genre = ["category", "times", "gender", "generation"];

  res.json({
    "category": arr[0],
    "times": arr[1],
    "gender": arr[2],
    "generation": arr[3]
  });
});

router.get('/post', (req, res, next) => {
  res.render('result');
});

module.exports = router;
