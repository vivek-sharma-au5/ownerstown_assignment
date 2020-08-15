var express = require("express");
var router = express.Router();
var superheroData = require("../superHerosDetails.json");

router.post("/superhero", async (req, res) => {
  var keyPad = [
    "",
    "",
    "ABC",
    "DEF",
    "GHI",
    "JKL",
    "MNO",
    "PQRS",
    "TUV",
    "WXYZ",
  ];
  const superHeros = [
    "SUPERMAN",
    "THOR",
    "ROBIN",
    "IRONMAN",
    "GHOSTRIDER",
    "CAPTAINAMERICA",
    "FLASH",
    "WOLVERINE",
    "BATMAN",
    "HULK",
    "BLADE",
    "PHANTOM",
    "SPIDERMAN",
    "BLACKWIDOW",
    "HELLBOY",
    "PUNISHER",
  ];

  var data = [];

  function getAllWords(number, curr, output, n) {
    if (curr == n) {
      data.push(output.join(""));
      return;
    }

    for (let i = 0; i < keyPad[number[curr]].length; i++) {
      if (number[curr] == 0 || number[curr] == 1) {
        return;
      }
      output.push(keyPad[number[curr]][i]);
      getAllWords(number, curr + 1, output, n);
      output.pop();
    }
  }

  function printWords(number, n) {
    getAllWords(number, 0, [], n);
  }

  var number = req.body.code;
  const n = number.length;
  printWords(number, n);

  var result = data.filter((value) => superHeros.includes(value));
  var final = superheroData.filter((ele) => ele.name === result.join(""));
  res.send(final);
  console.log(final);
});

module.exports = router;
