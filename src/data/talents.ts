enum MagicScrollId {
  FireBall = 1,
  Freezing = 2,
  LifeDrain = 3,
  Restraining = 4,
  Bewitchment = 5,
  Thunder = 6,
  Burning = 7,
  Incineration = 8,
  Judgement = 9,
  CrystalSpear = 10,
  Poisoning = 11,
  Bleeding = 12,
  Necrosis = 13,
  Permutation = 14,
  Stinging = 15,
  FrostBurst = 16,
  Subversion = 17,
  Telekinesis = 18,
  MagicStealing = 19,
  Armor = 20,
  Devotion = 21,
  Discipline = 22,
  Aegis = 23,
  Exaltation = 24,
  Healing = 25,
  Instinct = 26,
  Invisibility = 27,
  Purification = 28,
  Reflex = 29,
  Regeneration = 30,
  CrystalWall = 31,
  BramblesWall = 32,
  ForestSummon = 33,
  RockSummon = 34,
  CrystalSummon = 35,
  FrostSummon = 36,
  SoulsAwakening = 37,
  FleshAwakening = 38,
  BonesAwakening = 39,
  Teleportation = 40,
}

export interface Talent {
  id: number;
  name: string;
  reusable?: boolean;
}

const magicScrolls: Talent[] = [{
  id: MagicScrollId.FireBall,
  name: "Boule de feu",
  reusable: true,
}, {
  id: MagicScrollId.Freezing,
  name: "Congélation",
}, {
  id: MagicScrollId.LifeDrain,
  name: "Drain de vie",
  reusable: true,
}, {
  id: MagicScrollId.Restraining,
  name: "Entrave",
}, {
  id: MagicScrollId.Bewitchment,
  name: "Envoûtement",
  reusable: true,
}, {
  id: MagicScrollId.Thunder,
  name: "Foudre",
}, {
  id: MagicScrollId.Burning,
  name: "Incendie",
}, {
  id: MagicScrollId.Incineration,
  name: "Incinération",
}, {
  id: MagicScrollId.Judgement,
  name: "Jugement",
}, {
  id: MagicScrollId.CrystalSpear,
  name: "Lance de cristal",
}, {
  id: MagicScrollId.Poisoning,
  name: "Maléfice de poison",
}, {
  id: MagicScrollId.Bleeding,
  name: "Maléfice de saignement",
}, {
  id: MagicScrollId.Necrosis,
  name: "Maléfice de nécrose",
}, {
  id: MagicScrollId.Permutation,
  name: "Permutation",
}, {
  id: MagicScrollId.Stinging,
  name: "Piqûre",
}, {
  id: MagicScrollId.FrostBurst,
  name: "Rafale de givre",
}, {
  id: MagicScrollId.Subversion,
  name: "Subversion",
}, {
  id: MagicScrollId.Telekinesis,
  name: "Télékinésie",
}, {
  id: MagicScrollId.MagicStealing,
  name: "Vol de magie",
}, {
  id: MagicScrollId.Armor,
  name: "Armure",
}, {
  id: MagicScrollId.Devotion,
  name: "Dévotion",
}, {
  id: MagicScrollId.Discipline,
  name: "Discipline",
}, {
  id: MagicScrollId.Aegis,
  name: "Egide",
}, {
  id: MagicScrollId.Exaltation,
  name: "Exaltation",
}, {
  id: MagicScrollId.Healing,
  name: "Guérison",
}, {
  id: MagicScrollId.Instinct,
  name: "Instinct",
}, {
  id: MagicScrollId.Invisibility,
  name: "Invisibilité",
}, {
  id: MagicScrollId.Purification,
  name: "Purification",
}, {
  id: MagicScrollId.Reflex,
  name: "Exaltation",
}, {
  id: MagicScrollId.Regeneration,
  name: "Régénération",
}, {
  id: MagicScrollId.CrystalWall,
  name: "Mur de cristal",
}, {
  id: MagicScrollId.BramblesWall,
  name: "Mur de ronces",
}, {
  id: MagicScrollId.ForestSummon,
  name: "Invocation de la forêt",
}, {
  id: MagicScrollId.RockSummon,
  name: "Invocation de la roche",
}, {
  id: MagicScrollId.CrystalSummon,
  name: "Invocation du cristal",
}, {
  id: MagicScrollId.FrostSummon,
  name: "Invocation du givre",
}, {
  id: MagicScrollId.SoulsAwakening,
  name: "Réveil des âmes",
}, {
  id: MagicScrollId.FleshAwakening,
  name: "Réveil des chairs",
}, {
  id: MagicScrollId.BonesAwakening,
  name: "Réveil des ossements",
}, {
  id: MagicScrollId.Teleportation,
  name: "Téléportation",
},];

export { magicScrolls };