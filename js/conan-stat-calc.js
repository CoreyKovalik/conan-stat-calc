// Initial Points //
let characterLevel_html    = document.getElementsByClassName("character-level")[0];
let unspentPoints_html     = document.getElementsByClassName("unspent-points")[0];
let currentExperience_html = document.getElementsByClassName("current-experience")[0];
let strength_html          = document.getElementsByClassName("strength current-level")[0];
let agility_html           = document.getElementsByClassName("agility current-level")[0];
let vitality_html          = document.getElementsByClassName("vitality current-level")[0];
let accuracy_html          = document.getElementsByClassName("accuracy current-level")[0];
let grit_html              = document.getElementsByClassName("grit current-level")[0];
let encumbrance_html       = document.getElementsByClassName("encumbrance current-level")[0];
let survival_html          = document.getElementsByClassName("survival current-level")[0];
adjustPoints();

// Initial playerStats //
let health_html              = document.getElementsByClassName("health")[0];
let stamina_html             = document.getElementsByClassName("stamina")[0];
let encumbrance_heading_html = document.getElementsByClassName("encumbrance-heading")[0];
let encumbrance_player_html  = document.getElementsByClassName("encumbrance-player")[0];
let melee_html               = document.getElementsByClassName("melee")[0];
let ranged_html              = document.getElementsByClassName("ranged")[0];
let armor_html               = document.getElementsByClassName("armor")[0];
let dmg_resist_html          = document.getElementsByClassName("dmg-resist")[0];
adjustPlayerStats();

// Update & adjustment functions //
function update(statString) {
  adjustPoints();
  adjustBonuses(statString);
  calcPlayerStats();
  adjustPlayerStats();
  adjustProgress(statString);
}

function adjustPoints() {
  stats.lifetimePoints             = stats.unspentPoints + stats.spentPoints;

  characterLevel_html.innerText    = stats.characterLevel;
  unspentPoints_html.innerText     = stats.unspentPoints;
  currentExperience_html.innerText = stats.currentExperience;
  strength_html.innerText          = stats.strength.value;
  agility_html.innerText           = stats.agility.value;
  vitality_html.innerText          = stats.vitality.value;
  accuracy_html.innerText          = stats.accuracy.value;
  grit_html.innerText              = stats.grit.value;
  encumbrance_html.innerText       = stats.encumbrance.value;
  survival_html.innerText          = stats.survival.value;
}

function adjustPlayerStats() {
  health_html.innerText              = stats.playerStats.health.value;
  stamina_html.innerText             = stats.playerStats.stamina.value;
  encumbrance_heading_html.innerText = stats.playerStats.encumbrance.value;
  encumbrance_player_html.innerText  = stats.playerStats.encumbrance.value;
  melee_html.innerText               = Math.round(stats.playerStats.melee.value) + "%";
  ranged_html.innerText              = Math.round(stats.playerStats.ranged.value) + "%";
  armor_html.innerText               = stats.playerStats.armor.value;
  dmg_resist_html.innerText          = precisionRound(stats.playerStats.damageResistance.value, 1) + "%";
}

// Increase/Decrease stat functions
function levelUp() {
  if (stats.characterLevel == 60) return false;
  stats.characterLevel += 1;
  setCurrentExperience(stats.characterLevel);
  stats.unspentPoints += adjustAttrPoints(stats.characterLevel);
  stats.availableFeats += adjustFeatPoints(stats.characterLevel);
  update();
  console.log("Level Up!");
}

function levelDown() {
  if (stats.characterLevel == 1) return false;
  if (stats.characterLevel == 60) {
    document.getElementsByClassName("level-up")[0].disabled = false;
    document.getElementsByClassName("max-level")[0].disabled = false;
  }
  if (stats.unspentPoints < adjustAttrPoints(stats.characterLevel)) {
    return alert("You must first remove attributes before leveling down your Exile.  You cannot remove what you've already spent!");
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
  if (stat == 50)
    return false;
  if (cost > stats.unspentPoints)
    return false;

  stat += 1;
  stats.unspentPoints -= cost;
  stats.spentPoints += cost;
  stats[statString].value = stat;
  update(statString);
  console.log(name + " Up!");
}

function statDown(statString) {
  let stat = stats[statString].value;
  if (stat == 0) return false;

  stat -= 1;
  let name = capitalizeFirst(statString);
  let cost = getAttrCost(stat);
  stats.unspentPoints += cost;
  stats.spentPoints -= cost;
  stats[statString].value = stat;
  update(statString);
  console.log(name + " down :(");
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

for (var i = 0; i < statButtons.length; i++) {
  statButtons[i].addEventListener("mouseup", mouseReleaseStat);
  statButtons[i].addEventListener("mouseleave", mouseReleaseStat);
}

var levelUp_html   = document.getElementsByClassName("level-up")[0];
var levelDown_html = document.getElementsByClassName("level-down")[0];

function createLevelButton(element, buttonFunc) {
  element.addEventListener("click", buttonFunc);
  element.addEventListener("mousedown", mouseHold.bind(null, buttonFunc));
}

createLevelButton(levelUp_html, levelUp);
createLevelButton(levelDown_html, levelDown);

document.getElementsByClassName("max-level")[0].addEventListener("click", function() {
  maxOutLevel();
});

//Reset buttons - all points and levels reverted to base values  +function createStatButtons(stat) {
document.getElementsByClassName("reset-all")[0].addEventListener("click", resetAll);
document.getElementsByClassName("reset-attributes")[0].addEventListener("click", resetAttributes);

function createStatButtons(stat) {
  document.getElementsByClassName(stat + "-up")[0].addEventListener("click", statUp.bind(null, stat));
  document.getElementsByClassName(stat + "-up")[0].addEventListener("mousedown", mouseHoldStatUp.bind(null, stat));
  document.getElementsByClassName(stat + "-down")[0].addEventListener("click", statDown.bind(null, stat));
  document.getElementsByClassName(stat + "-down")[0].addEventListener("mousedown", mouseHoldStatDown.bind(null, stat));
}

let currentActive = "strength";

stats.allStats.forEach(function(attribute, i) {
  createStatButtons(attribute);

  document.getElementsByClassName("reset-attribute")[i].addEventListener("click", function() {
    resetAttribute(stats.allStats[i]);
  });
  document.getElementsByClassName("max-attribute")[i].addEventListener("click", function() {
    maxOutAttribute(stats.allStats[i]);
  });

  //cache attr-div & progress-bar for each attribute. then,
  let hoverElementsForToggle = [];
  hoverElementsForToggle[0] = document.getElementsByClassName("attr-div " + stats.allStats[i])[0];
  hoverElementsForToggle[1] = document.getElementsByClassName("progress-bar " + stats.allStats[i])[0];

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