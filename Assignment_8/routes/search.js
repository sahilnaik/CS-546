const express = require("express");
const router = express.Router();
const data = require("../data");
const searchData = data.search;

router.get("/", async (req, res) => {

  res.render("characters/home", {
    title: "Character Finder"
  });
  });


router.post("/search", async function (req, res) {
  const characterName = req.body["searchTerm"];
  if(characterName===undefined){
    res.status(400);
    res.render("characters/errorpage",{title:"Error",error:"Input undefined"} );
    return;
  }
  if(characterName.trim() === ""){
    res.status(400);
    res.render("characters/errorpage",{title:"Error",error:"Empty input provided"} );
    return;
  }
  
  try {
    const allCharacters = await searchData.searchCharacters(characterName);
    if(allCharacters.length===0){
      const result = {
        title: `Character Not Found`,
        allCharacters: allCharacters,
        characterName: characterName,
      };
      res.render("characters/search", result);
    }
    else{
      const result = {
        title: `Characters Found`,
        allCharacters: allCharacters,
        characterName: characterName,
      };
      res.render("characters/search", result);
    }
    
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
