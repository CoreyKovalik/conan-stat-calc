const expArray = [0,275,1325,3675,7825,14325,23675,36400,53000,74000,99925,131300,168625,212450,263275,321600,387975,462900,546900,640475,744175,858500,983975,1121100,1270400,1432400,1607625,1796600,1999825,2217825,2451125,2700225,2965650,3247925,3547575,3865100,4201025,4555875,4930175,5324425,5739150,6174875,6632125,7111400,7613225,8138125,8686600,9259175,9856375,10478725,11126725,11800925,12501825,13229925,13985775,14769875,15582750,16424900,17296850,18199150,19132275];

var stats = {
  "characterLevel": 1,
  "unspentPoints": 1,
  "spentPoints": 0,
  "lifetimePoints": 1,
  "availableFeats": 0,
  "currentExperience": "0 / 275",
  "allStats": ["strength", "agility", "vitality", "accuracy", "grit", "encumbrance", "survival"],
  "strength": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "agility": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "vitality": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "accuracy": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "grit": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "encumbrance": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "survival": {
    "value": 0,
    "_10": false,
    "_20": false,
    "_30": false,
    "_40": false,
    "_50": false
  },
  "playerStats": {
    "health": {
      "value": 200,
      "base": 200
    },
    "stamina": {
      "value": 100,
      "base": 100
    },
    "encumbrance": {
      "value": 70,
      "base": 70
    },
    "melee": {
      "value": 100,
      "base": 100
    },
    "ranged": {
      "value": 100,
      "base": 100
    },
    "armor": {
      "value": 0,
      "base": 0
    },
    "damageResistance": {
      "value": 0,
      "base": 0
    }
  }
}

function resetAll() {
  stats.strength.value = stats.agility.value = stats.vitality.value = stats.accuracy.value = stats.grit.value = stats.encumbrance.value = stats.survival.value = stats.spentPoints = stats.availableFeats = 0;
  stats.characterLevel = stats.unspentPoints = stats.lifetimePoints = 1;
  stats.currentExperience = "0 / 275";
  stats.playerStats.health.value = stats.playerStats.health.base;
  stats.playerStats.stamina.value = stats.playerStats.melee.value = stats.playerStats.ranged.value = stats.playerStats.stamina.base;
  stats.playerStats.encumbrance.value = stats.playerStats.encumbrance.base;
  stats.playerStats.armor.value = stats.playerStats.damageResistance.value = stats.playerStats.armor.base;
  for (var i = 0; i < 7; i++) {
    update(stats.allStats[i]);
  }
  alert("All levels, stats, and points are reset.");
}

function setCurrentExperience(currentlevel) {
  if (currentlevel < 1 || currentlevel > 60) {
    return;
  }
  stats.currentExperience = expArray[currentlevel - 1].toLocaleString() + " / " + expArray[currentlevel].toLocaleString();
  return expArray[currentlevel -1];
}

function getAttrCost(currentlevel) {
  let i = 0;
  let comparelvl = 0;
  let cost = 0;
  while (i < 10) {
    if (currentlevel < comparelvl + 5) return cost + 1;
    else i++, cost++, comparelvl += 5;
  }
}

function adjustAttrPoints(currentlevel) {
  let i = 0;
  let comparelvl = 0;
  let attrPoints = 0;
  while (i < 13) {
    if (currentlevel <= comparelvl + 5) return attrPoints + 1;
    else i++, attrPoints++, comparelvl += 5;
  }
}

function adjustFeatPoints(currentlevel) {
  let i = 0, x = 1;
  let comparelvl = 0;
  let featPoints = 0;
  while (i < 13) {
    if (currentlevel < comparelvl + 5) {
      featPoints ++;
      while (x < 7) {
        if (currentlevel == x * 10) return featPoints * 3;
        x++;
      }
      return featPoints;
    }
    else i++, featPoints++, comparelvl += 5;
  }
}

//Checks current attributes and determines attribute bonuses @ lvls 10,20,30,40,50

function adjustBonuses(statString) {
  if (statString == null) return false;
    for (var i = 1; i <= 5; i++) {
    let teir = "_" + i + "0";
    let lvl = i * 10;
    stats[statString].value >= lvl ? stats[statString][teir] = true : stats[statString][teir] = false;
  }
}

//Math calculations for playerStats based on attributes and certain bonus perks

function calcPlayerStats() {
  stats.playerStats.health.value = (8 * stats.vitality.value) + stats.playerStats.health.base;
  stats.playerStats.stamina.value = (3 * stats.grit.value) + stats.playerStats.stamina.base;
  stats.playerStats.encumbrance.value = (7 * stats.encumbrance.value) + stats.playerStats.encumbrance.base;
  stats.playerStats.melee.value = (100 * 0.025 * stats.strength.value) + stats.playerStats.melee.base;
  stats.playerStats.ranged.value = (100 * 0.025 * stats.accuracy.value) + stats.playerStats.ranged.base;
    if(stats.accuracy._30) stats.playerStats.ranged.value += 10;
  stats.playerStats.armor.value = (2 * stats.agility.value) + stats.playerStats.armor.base;
    if(stats.grit._30) stats.playerStats.armor.value += 15;
  stats.playerStats.damageResistance.value = stats.playerStats.armor.value * 0.003 * 100;
}

function adjustProgress(statString) {
  if (statString == null) return false;

  let statProgress = (stats[statString].value / 50) * 100;
  document.getElementById("progress-" + statString).setAttribute("style", "width:" + statProgress + "%;");

  for (var i = 1; i <= 5; i++) {
    let teir = "_" + i + "0";
    if (stats[statString][teir]) document.getElementById("progress-bar-" + statString).classList.add("perk-" + i);
    else document.getElementById("progress-bar-" + statString).classList.remove("perk-" + i);
  }
}