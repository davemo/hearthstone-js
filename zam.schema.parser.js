hearthstoneCards.map(function(c) {
  return {
    id: c.id,
    name: c.name,
    description: c.description,
    image_url: "http:\/\/wow.zamimg.com\/images\/hearthstone\/cards\/enus\/medium\/" + c.image + ".png",
    hero: heroNameFor(c.classs),
    quality: qualityFor(c.quality),
    category: categoryFor(c.type),
    mana: c.cost,
    attack: c.attack || null,
    health: c.health || c.durability || null,
    collectible: Boolean(c.collectible),
    set: setFor(c.set)
  };
});

var effectListMapper = function(description) {
  var effects = [ "battlecry", "charge", "deathrattle", "divine_shield", "enrage", "secret", "stealth", "taunt", "windfury"];
  return effects.map(function(e) {
    if(_.str.contains(description.toLowerCase(e)) {
      return {
        effect: e,
        extra: ""
      };
    }
  });
};// compact()

var heroNameFor = function (id) {
  switch(id) {
    case 1:
      return "warrior"
    case 2:
      return "paladin"
    case 3:
      return "hunter"
    case 4:
      return "rogue"
    case 5:
      return "priest"
    case 7:
      return "shaman"
    case 8:
      return "mage"
    case 9:
      return "warlock"
    case 11:
      return "druid"
    default:
      return null;
  }
};

var qualityFor = function(qualityId) {
  switch(qualityId) {
    // free, common, rare, epic, legendary
    case 0:
      return "free"
    case 1:
      return "common"
    case 3:
      return "rare"
    case 4:
      return "epic"
    case 5:
      return "legendary"
    default:
      return null;
  }
};

var categoryFor = function(typeId) {
  switch(typeId) {
    // minion, spell, secret, weapon
    case 4:
      return "minion";
    case 5:
      return "spell";
    case 7:
      return "weapon";
    default:
      return null;
  }
};

var raceFor = function(raceId) {
  switch(raceId) {
    case 17:
      return "mech";
    case 20:
      return "beast";
    case 15:
      return "demon";
    default:
      return null;
  };
};

var setFor = function(setId) {
  switch(setId) {
    case 2:
      return "basic";
    case 3:
      return "expert";
    case 12:
      return "naxxramas";
    case 13:
      return "gvg";
    default:
      return null;
  };
};
