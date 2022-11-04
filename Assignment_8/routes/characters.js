const express = require("express");
const router = express.Router();
const data = require("../data");
const characterData = data.characters;

router.get("/:id", async function (req, res) {
  if(req.params.id===undefined){
    res.status(400);
    res.render("characters/errorpage",{title:"Error",error:"Input undefined"} );
    return;
  }
  if(req.params.id.trim().length==""){
    res.status(400);
    res.render("characters/errorpage",{title:"Error",error:"Empty input provided"} );
    return;
  }
  try {
    const character = await characterData.getCharacterByID(req.params.id);
    if(character.length===0){
      res.status(404);
    res.render("characters/errorpage",{title:"Error",error:"Character not found"} );
    return;
    }
    else{
      const result = {
        title: character.name,
        character: character,
      };
    
      res.render("characters/single", result);
    }
    
  } catch (e) {
    res.status(404);
    res.render("characters/errorpage",{title:"Error",error:"Character not found"} );
  }
});
module.exports = router;
