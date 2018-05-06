// Initial Points //

let characterLevel_html = document.getElementById("characterLevel");
    characterLevel_txt = document.createTextNode(stats.characterLevel);
characterLevel_html.appendChild(characterLevel_txt);

let unspentPoints_html = document.getElementById("unspentPoints");
    unspentPoints_txt = document.createTextNode(stats.unspentPoints);
unspentPoints_html.appendChild(unspentPoints_txt);

let currentExperience_html = document.getElementById("currentExperience");
    currentExperience_txt = document.createTextNode(stats.currentExperience);
currentExperience_html.appendChild(currentExperience_txt);

let strength_html = document.getElementById("strength");
    strength_txt = document.createTextNode(stats.strength.value);
strength_html.appendChild(strength_txt);

let agility_html = document.getElementById("agility");
    agility_txt = document.createTextNode(stats.agility.value);
agility_html.appendChild(agility_txt);

let vitality_html = document.getElementById("vitality");
    vitality_txt = document.createTextNode(stats.vitality.value);
vitality_html.appendChild(vitality_txt);

let accuracy_html = document.getElementById("accuracy");
    accuracy_txt = document.createTextNode(stats.accuracy.value);
accuracy_html.appendChild(accuracy_txt);

let grit_html = document.getElementById("grit");
    grit_txt = document.createTextNode(stats.grit.value);
grit_html.appendChild(grit_txt);

let encumbrance_html = document.getElementById("encumbrance");
    encumbrance_txt = document.createTextNode(stats.encumbrance.value);
encumbrance_html.appendChild(encumbrance_txt);

let survival_html = document.getElementById("survival");
    survival_txt = document.createTextNode(stats.survival.value);
survival_html.appendChild(survival_txt);

// Initial playerStats //

let health_html = document.getElementById("health");
    health_txt = document.createTextNode(stats.playerStats.health.value);
health_html.appendChild(health_txt);

let stamina_html = document.getElementById("stamina");
    stamina_txt = document.createTextNode(stats.playerStats.stamina.value);
stamina_html.appendChild(stamina_txt);

let encumbr_player_html = document.getElementById("encumbr-player");
    encumbr_player_html2 = document.getElementsByClassName("encumbrance-heading")[0];
    encumbr_player_txt = document.createTextNode(stats.playerStats.encumbrance.value);
    encumbr_player_txt2 = document.createTextNode(stats.playerStats.encumbrance.value);
encumbr_player_html.appendChild(encumbr_player_txt);
encumbr_player_html2.appendChild(encumbr_player_txt2);

let melee_html = document.getElementById("melee");
    melee_txt = document.createTextNode(Math.round(stats.playerStats.melee.value));
melee_html.appendChild(melee_txt);

let ranged_html = document.getElementById("ranged");
    ranged_txt = document.createTextNode(Math.round(stats.playerStats.ranged.value));
ranged_html.appendChild(ranged_txt);

let armor_html = document.getElementById("armor");
    armor_txt = document.createTextNode(stats.playerStats.armor.value);
armor_html.appendChild(armor_txt);

let dmg_resist_html = document.getElementById("dmg-resist");
    dmg_resist_txt = document.createTextNode(precisionRound(stats.playerStats.damageResistance.value, 1) + "%");
dmg_resist_html.appendChild(dmg_resist_txt);

// Update & adjustment functions //

function update(statString) {
  adjustPoints();
  adjustBonuses(statString);
  calcPlayerStats();
  adjustPlayerStats();
  adjustProgress(statString);
}

function adjustPlayerStats() {
  health_html.removeChild(health_txt);
  health_txt = document.createTextNode(stats.playerStats.health.value);
  health_html.appendChild(health_txt);

  stamina_html.removeChild(stamina_txt);
  stamina_txt = document.createTextNode(stats.playerStats.stamina.value);
  stamina_html.appendChild(stamina_txt);

  encumbr_player_html.removeChild(encumbr_player_txt);
  encumbr_player_txt = document.createTextNode(stats.playerStats.encumbrance.value);
  encumbr_player_html.appendChild(encumbr_player_txt);

  melee_html.removeChild(melee_txt);
  melee_txt = document.createTextNode(Math.round(stats.playerStats.melee.value));
  melee_html.appendChild(melee_txt);

  ranged_html.removeChild(ranged_txt);
  ranged_txt = document.createTextNode(Math.round(stats.playerStats.ranged.value));
  ranged_html.appendChild(ranged_txt);

  armor_html.removeChild(armor_txt);
  armor_txt = document.createTextNode(stats.playerStats.armor.value);
  armor_html.appendChild(armor_txt);

  dmg_resist_html.removeChild(dmg_resist_txt);
  dmg_resist_txt = document.createTextNode(precisionRound(stats.playerStats.damageResistance.value, 1) + "%");
  dmg_resist_html.appendChild(dmg_resist_txt);
}

function adjustPoints() {
  stats.lifetimePoints = stats.unspentPoints + stats.spentPoints;

  characterLevel_html.removeChild(characterLevel_txt);
  characterLevel_txt = document.createTextNode(stats.characterLevel);
  characterLevel_html.appendChild(characterLevel_txt);

  unspentPoints_html.removeChild(unspentPoints_txt);
  unspentPoints_txt = document.createTextNode(stats.unspentPoints);
  unspentPoints_html.appendChild(unspentPoints_txt);

  currentExperience_html.removeChild(currentExperience_txt);
  currentExperience_txt = document.createTextNode(stats.currentExperience);
  currentExperience_html.appendChild(currentExperience_txt);

  strength_html.removeChild(strength_txt);
  strength_txt = document.createTextNode(stats.strength.value);
  strength_html.appendChild(strength_txt);

  agility_html.removeChild(agility_txt);
  agility_txt = document.createTextNode(stats.agility.value);
  agility_html.appendChild(agility_txt);

  vitality_html.removeChild(vitality_txt);
  vitality_txt = document.createTextNode(stats.vitality.value);
  vitality_html.appendChild(vitality_txt);

  accuracy_html.removeChild(accuracy_txt);
  accuracy_txt = document.createTextNode(stats.accuracy.value);
  accuracy_html.appendChild(accuracy_txt);

  grit_html.removeChild(grit_txt);
  grit_txt = document.createTextNode(stats.grit.value);
  grit_html.appendChild(grit_txt);

  encumbrance_html.removeChild(encumbrance_txt);
  encumbrance_txt = document.createTextNode(stats.encumbrance.value);
  encumbrance_html.appendChild(encumbrance_txt);

  survival_html.removeChild(survival_txt);
  survival_txt = document.createTextNode(stats.survival.value);
  survival_html.appendChild(survival_txt);
}

// Alert helper function //
  // alert on point limitations

function limitAlert(event, level) {
  switch (event) {
    case "min":
    alert("Minimum " + level + " level reached!");
    break;
    case "max":
    alert("Maximum " + level + " level reached!");
    clearInterval(mouseHoldInterval);
    break;
    case "nopoints":
    alert("Not enough points!");
    break;
  }
}

// Increase/Decrease stat functions

function levelUp() {
  if (stats.characterLevel == 60) return limitAlert("max","exile");
  stats.characterLevel += 1;
  setCurrentExperience(stats.characterLevel);
  stats.unspentPoints += adjustAttrPoints(stats.characterLevel);
  stats.availableFeats += adjustFeatPoints(stats.characterLevel);
  update();
  console.log("Level Up!");
}

function levelDown() {
  if (stats.characterLevel == 1) return limitAlert("min","exile");
  if (stats.unspentPoints < adjustAttrPoints(stats.characterLevel)) {
    return alert("First remove attributes before leveling down your Exile!  You cannot remove what you've already spent!");
  }
  stats.unspentPoints -= adjustAttrPoints(stats.characterLevel);
  stats.availableFeats -= adjustFeatPoints(stats.characterLevel);
  stats.characterLevel -= 1;
  setCurrentExperience(stats.characterLevel);
  update();
  console.log("Level Down :(");
}

function statUp(statString) {
let stat = stats[statString].value;
let name = capitalizeFirst(statString);
let cost = getAttrCost(stat);
  if (stat == 50) return limitAlert("max", statString);
  else if (cost > stats.unspentPoints) {
    return limitAlert("nopoints");
  }
  else {
    stat += 1;
    stats.unspentPoints -= cost;
    stats.spentPoints += cost;
    stats[statString].value = stat;
    update(statString);
    console.log(name + " Up!");
  }
}

function statDown(statString) {
  let stat = stats[statString].value;
  if (stat === 0) return limitAlert("min", statString);
  else {
    stat -= 1;
    let name = capitalizeFirst(statString);
    let cost = getAttrCost(stat);
    stats.unspentPoints += cost;
    stats.spentPoints -= cost;
    stats[statString].value = stat;
    update(statString);
    console.log(name + " down :(");
  }
}

// Helper Functions //

let mouseHoldInterval = 0;

function mouseHold(level) {
  mouseHoldInterval = setInterval(level, 120);
}

function mouseHoldStatUp(statString) {
  mouseHoldInterval = setInterval(function() {statUp(statString);}, 120);
}

function mouseHoldStatDown(statString) {
  mouseHoldInterval = setInterval(function() {statDown(statString);}, 120);
}

function mouseReleaseStat() {
  clearInterval(mouseHoldInterval);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


// Apply mouseup/mouseleave event listeners to all stat buttons
// that clear the mouseHoldInterval for modifying stats

let statButtons = document.getElementsByClassName("stat-button");

for (let button of statButtons) {
  button.addEventListener("mouseup", mouseReleaseStat);
  button.addEventListener("mouseleave", mouseReleaseStat);
}

//Event Listeners on all buttons top to bottom //
  //character level
document.getElementById("levelUp").addEventListener("click", levelUp);
document.getElementById("levelUp").addEventListener("mousedown", function() {
  mouseHold(levelUp);
});
document.getElementById("levelDown").addEventListener("click", levelDown);
document.getElementById("levelDown").addEventListener("mousedown", function() {
  mouseHold(levelDown);
});

  //strength level
document.getElementById("strUp").addEventListener("click", function() {
  statUp("strength");
});
document.getElementById("strUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("strength");
});
document.getElementById("strDown").addEventListener("click", function() {
  statDown("strength");
});
document.getElementById("strDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("strength");
});

  //agility level
document.getElementById("agiUp").addEventListener("click", function() {
  statUp("agility");
});
document.getElementById("agiUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("agility");
});
document.getElementById("agiDown").addEventListener("click", function() {
  statDown("agility");
});
document.getElementById("agiDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("agility");
});

  //vitality
document.getElementById("vitUp").addEventListener("click", function() {
  statUp("vitality");
});
document.getElementById("vitUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("vitality");
});
document.getElementById("vitDown").addEventListener("click", function() {
  statDown("vitality");
});
document.getElementById("vitDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("vitality");
});

  //accuracy
document.getElementById("accUp").addEventListener("click", function() {
  statUp("accuracy");
});
document.getElementById("accUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("accuracy");
});
document.getElementById("accDown").addEventListener("click", function() {
  statDown("accuracy");
});
document.getElementById("accDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("accuracy");
});

  //grit
document.getElementById("gritUp").addEventListener("click", function() {
  statUp("grit");
});
document.getElementById("gritUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("grit");
});
document.getElementById("gritDown").addEventListener("click", function() {
  statDown("grit");
});
document.getElementById("gritDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("grit");
});

  //encumbrance
document.getElementById("encumbUp").addEventListener("click", function() {
  statUp("encumbrance");
});
document.getElementById("encumbUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("encumbrance");
});
document.getElementById("encumbDown").addEventListener("click", function() {
  statDown("encumbrance");
});
document.getElementById("encumbDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("encumbrance");
});

  //survival
document.getElementById("survUp").addEventListener("click", function() {
  statUp("survival");
});
document.getElementById("survUp").addEventListener("mousedown", function() {
  mouseHoldStatUp("survival");
});
document.getElementById("survDown").addEventListener("click", function() {
  statDown("survival");
});
document.getElementById("survDown").addEventListener("mousedown", function() {
  mouseHoldStatDown("survival");
});

//Reset buttons - all points and levels reverted to base values
document.getElementById("reset-all").addEventListener("click", resetAll);
document.getElementById("reset-attributes").addEventListener("click", resetAttributes);

let currentActive = "strength";

stats.allStats.forEach(function(attribute, i) {
  document.getElementsByClassName("reset-attribute")[i].addEventListener("click", function() {
    resetAttribute(stats.allStats[i]);
  });
  document.getElementsByClassName("max-attribute")[i].addEventListener("click", function() {
    maxOutAttribute(stats.allStats[i]);
  });

  //cache attr-div & progress-bar-stat for each attribute. then,
  let hoverElementsForToggle = [];
  hoverElementsForToggle[0] = document.getElementsByClassName("attr-div " + stats.allStats[i])[0]
  hoverElementsForToggle[1] = document.getElementsByClassName("progress-bar-stat " + stats.allStats[i])[0]

  // mouseover on hoverElements to toggle active class on current 'mouseover' attribute
  hoverElementsForToggle.forEach(function(element) {
    element.addEventListener("mouseover", function () {
      if (stats.allStats[i] != currentActive) {
      document.getElementsByClassName("bonuses " + stats.allStats[i])[0].classList.add("active");
      document.getElementsByClassName("bonuses " + currentActive)[0].classList.remove("active");
      currentActive = stats.allStats[i];
      }
    });
  });

});

document.getElementsByClassName("max-level")[0].addEventListener("click", function() {
  maxOutLevel();
  // document.getElementsByClassName("max-level")[0].classList.toggle("hide");
});


// why let works and var does not?

// for (let i = 0; i < 7; i++) {
//     document.getElementsByClassName("reset-attribute")[i].addEventListener("click", function() {
//       resetAttribute(stats.allStats[i]);
//   });
// }