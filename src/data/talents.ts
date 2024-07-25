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
  FrostBurst,
  Subversion,
  Telekinesis,
  MagicStealing,
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
},{
  id: MagicScrollId.Poisoning,
  name: "Maléfice de poison",
},{
  id: MagicScrollId.Bleeding,
  name: "Maléfice de saignement",
},{
  id: MagicScrollId.Necrosis,
  name: "Maléfice de nécrose",
},{
  id: MagicScrollId.Permutation,
  name: "Permutation",
},{
  id: MagicScrollId.Stinging,
  name: "Piqûre",
},{
  id: MagicScrollId.FrostBurst,
  name: "Rafale de givre",
},{
  id: MagicScrollId.Subversion,
  name: "Subversion",
},{
  id: MagicScrollId.Telekinesis,
  name: "Télékinésie",
},{
  id: MagicScrollId.MagicStealing,
  name: "Vol de magie",
},];

export { magicScrolls };