import { Badge, Bold, Italic, List, Row } from "../components";
import { DisplayElement } from "../components/DisplayElement";
import { DisplayStatus } from "../components/DisplayStatus";
import { SummaryState } from "../features/summary/SummarySlice";
import { DisplayDamage } from "../features/talents/DisplayAttack";
import { ElementId, Status } from "./inventory";
import { AccuracyAttack, addModifier, BoxType, DamageAttack, DamageType, HealStatus, ResumeAttack, Talent, WeaponModifier } from "./talents";
import { GiftId } from "./character";
import { DisplayItemImage } from "../components/DisplayItemImage";


export enum TechniqueId {
  Stun = 1,
  DefensiveAttack = 2,
  HypnoticAttack = 3,
  IncisiveAttack = 4,
  MysticAttack = 5,
  HeavyAttack = 6,
  ShapAttack = 7,
  QuickAttack = 8,
  SacredAttack = 9,
  SneakAttack = 10,
  Sweep = 11,
  ShieldBash = 12,
  Dislocate = 13,
  Cut = 14,
  Execute = 15,
  ChainAttack = 16,
  ProjectileLaunch = 17,
  Devastate = 18,
  Siphon = 19,
  LongRangeShot = 20,
  Torment = 21,
  AthleticLeap = 22,
  SuddenDisappearance = 23,
  IgniteArrow = 24,
  Incant = 25,
  Inspire = 26,
  FutureRead = 27,
  DefensiveMeditation = 28,
  BloodSacrifice = 29,
  SetTrap = 30,
  FirstAid = 31,
  IntuitiveSearch = 32,
  StimulatingTreatment = 33,
  DevotedSupport = 34,
  MysticalSubterfuge = 35,
  MagicOverload = 36,
  Protect = 37,
  Retirement = 38,
  Hitback = 39,
  Ambidexterity = 40,
  Cavalry = 41,
  Ambush = 42,
  CombatMagic = 43,
  BeastMastery = 44,
  Vigilance = 45,
}

const getUsageCostModifierLabel = (modifier?: number) =>
  (modifier && ` ${(modifier > 0 && " + ") || " - "} ${modifier} PA`) || "";


const getPrimaryWeaponUsageCost = (summary: SummaryState, modifier?: number) => {
  return (summary.primaryWeapon?.usageCost && addModifier(summary.primaryWeapon?.usageCost, modifier))
    ?? `(Coût Arme${getUsageCostModifierLabel(modifier)})`;
}

const getPrimaryWeaponRange = (summary: SummaryState) =>
  summary.primaryWeapon?.range || "Portée Arme";

function PrincipalWeaponAttack({ summary, modifier }: Readonly<{ summary: SummaryState, modifier?: WeaponModifier }>) {
  return (
    <span>
      <span>Attaque de l'arme principale </span>
      <ResumeAttack weapon={summary?.primaryWeapon} modifier={modifier} />
    </span>
  );
}

// Generate collection of Talent from TechniqueId
export const allTechniques: Talent[] = [{
  id: TechniqueId.Stun,
  name: "Assommer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Masse, gant ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec <Bold>3<DisplayStatus status={Status.Stunned} hasLabel /></Bold></span>
    </span>
  )
}, {
  id: TechniqueId.DefensiveAttack,
  name: "Attaque défensive",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ criticalFactor: 1 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <PrincipalWeaponAttack summary={summary} modifier={{ criticalFactor: 1 }} />
          <span> et gagne 1<DisplayStatus status={Status.Defense} hasLabel /></span>
        </span>
      </Row>
      <Row>
        <span><Bold>Critique</Bold> : au lieu des dégâts augmentés, <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> supplémentaire</span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.HypnoticAttack,
  name: "Attaque hypnotique",
  manaCost: true,
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: Math.floor(summary.magicAttack / 2) }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} modifier={{ accuracy: Math.floor(summary.magicAttack / 2) }} />
      </Row>
      <Row>
        <span>Ne déclenche pas les <Bold>réactions (Riposter, Protéger, Retraite)</Bold> ni le statut <Bold><DisplayStatus status={Status.Defense} /></Bold></span>
      </Row>
      <Row>
        <span><Bold>Critique</Bold> : déprogramme les <Bold>réactions</Bold> (de la cible) et retire <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.IncisiveAttack,
  name: "Attaque incisive",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Dague, Epée ou Lance",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => {
    const ignoredArmor = (summary.observation + summary.discretion) / 10;
    return (
      <>
        <Row>
          <PrincipalWeaponAttack summary={summary} />
        </Row>
        <Row>
          <span><Bold>Réussite</Bold> : ignore <Bold>{ignoredArmor} d'ARM</Bold></span>
        </Row>
        <Row>
          <span><Bold>Critique</Bold> : ignore <Bold>{ignoredArmor * 2} d'ARM</Bold></span>
        </Row>
      </>
    );
  },
}, {
  id: TechniqueId.MysticAttack,
  name: "Attaque mystique",
  usageCost: getPrimaryWeaponUsageCost,
  manaCost: true,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <span>Gagne <Bold>2 niveaux de statut</Bold> au choix parmi ceux actifs sur l'attaquant, ou <Bold>3</Bold> sur un <Bold>jet de {summary.magicDefense} réussi</Bold></span>
        </Row>
        <Row>
          <span>
            <span>Attaque ensuite de l'arme principale</span>
            <ResumeAttack weapon={summary?.primaryWeapon} />
          </span>
        </Row>
        <Row>
          <Italic>Note : L'augmentation de statut est facultative.</Italic>
        </Row>
        <Row>
          <span>
            <Italic>Statuts éligibles : </Italic>
            <DisplayStatus status={Status.Aegis} />
            <DisplayStatus status={Status.Endurance} />
            <DisplayStatus status={Status.Hability} />
            <DisplayStatus status={Status.Immunity} />
            <DisplayStatus status={Status.Impact} />
            <DisplayStatus status={Status.Inspiration} />
            <DisplayStatus status={Status.Regeneration} />
            <DisplayStatus status={Status.MysticalSubterfuge} />
            <DisplayStatus status={Status.Force} />
            <DisplayStatus status={Status.Vivacious} />
            <DisplayStatus status={Status.Will} />
            <DisplayStatus status={Status.Overload} />
          </span>
        </Row>
      </>
    )
  }
}, {
  id: TechniqueId.HeavyAttack,
  name: "Attaque puissante",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Epée, Masse ou Hache",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: Math.floor(summary.strength * 3 / 2), accuracy: -15 }} />,
  getDescription: (summary) => (
    <PrincipalWeaponAttack summary={summary} modifier={{ baseDamage: Math.floor(summary.strength * 3 / 2), accuracy: -15 }} />
  ),
}, {
  id: TechniqueId.ShapAttack,
  name: "Attaque précise",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée, Lance, Arc ou Fouet",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span>avec un <Bold>Avantage</Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.QuickAttack,
  name: "Attaque rapide",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, -2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée ou Arc",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -30 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} modifier={{ accuracy: -30 }} />
      </Row>
      <Row>
        <span>Si la cible a le <Bold>statut <DisplayStatus status={Status.Exposed} hasLabel /></Bold>, inflige <Bold>1<DisplayStatus status={Status.Exposed} hasLabel /></Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.SacredAttack,
  name: "Attaque sacrée",
  usageCost: getPrimaryWeaponUsageCost,
  manaCost: true,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4 }} />,
  getDescription: (summary) => {
    const baseDamage = 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4;
    return (
      <span>
        <span>Attaque de <DisplayElement element={ElementId.Light} hasLabel /> de l'arme principale </span>
        <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage }} />
      </span>
    )
  },
}, {
  id: TechniqueId.SneakAttack,
  name: "Attaque sournoise",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Dague ou Gant",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: summary.strength / 2 + summary.dexterity, criticalFactor: 2 }} />,
  getDescription: (summary) => {
    const baseDamage = summary.strength / 2 + summary.dexterity;
    return <PrincipalWeaponAttack summary={summary} modifier={{ baseDamage, criticalFactor: 2 }} />
  },
}, {
  id: TechniqueId.Sweep,
  name: "Balayer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  area: "Arc de 3",
  required: "Arme 2 mains de contact",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> sur <Bold>un arc de 3 cases</Bold>, dans le sens horaire</span>
    </span>
  ),
}, {
  id: TechniqueId.ShieldBash,
  name: "Coup de bouclier",
  usageCost: 3,
  range: { min: 1, max: 1 },
  required: "Bouclier (main gauche)",
  resume: (summary) => <ResumeAttack weapon={summary?.secondaryWeapon} modifier={{ baseDamage: summary.constitution, forceWeapon: true }} />,
  getDescription: (summary) => (
    <span>
      <span>Attaque du bouclier avec <Bold>2 <DisplayStatus status={Status.Stunned} hasLabel /></Bold> </span>
      <ResumeAttack weapon={summary?.secondaryWeapon} modifier={{ baseDamage: summary.constitution, forceWeapon: true }} />
    </span>
  ),
}, {
  id: TechniqueId.Dislocate,
  name: "Disloquer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Masse, Hache, Lance ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec <Bold>3<DisplayStatus status={Status.Piercing} hasLabel /></Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.Cut,
  name: "Entailler",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée ou Hache",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec <Bold>3<DisplayStatus status={Status.Bleeding} hasLabel /></Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.Execute,
  name: "Exécuter",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <PrincipalWeaponAttack summary={summary} />
          <span> avec un <Bold>Avantage</Bold> si la cible est <Bold>agonisante</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Si la cible est <Bold>vaincue</Bold>, le <Bold>coût est réduit à 0 PA</Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.ChainAttack,
  name: "Enchaîner",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Epée, Masse, Lance, Gant ou Fouet",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -15 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Deux attaques de l'arme principale </span>
          <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -15 }} />
        </span>
      </Row>
      <Row>
        <span>Le statut <Bold>Impact</Bold> n'est pas déclenché par ces attaques</span>
      </Row>
      <Row>
        <span>Confère <Bold>+4 <DisplayStatus status={Status.Impact} hasLabel /></Bold> si chaque attaque obtient <Bold>Une réussite ou un critique</Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.ProjectileLaunch,
  name: "Lancer un projectile",
  usageCost: 3,
  range: { min: 1, max: 3 },
  resume: (summary) => {
    const baseDamage = (summary.strength + summary.dexterity) / 2;

    return (
      <Bold>
        <AccuracyAttack accuracy={summary.accuracy} />
        <DamageAttack
          className="mx-2"
          blocked={Math.floor(baseDamage / 2)}
          base={Math.floor(baseDamage)}
          critical={Math.floor(baseDamage * 3 / 2)}
        />
      </Bold>
    )
  },
  getDescription: (summary) => {
    const baseDamage = (summary.strength + summary.dexterity) / 2;
    return (
      <>
        <Row>
          <span>Attaque d'un <Bold>projectile</Bold> de l'inventaire</span>
        </Row>
        <Row>
          <span>
            <span>Base de dégâts : </span>
            <Bold>{Math.floor(baseDamage)} </Bold>
            <Bold>[Bloqué : {Math.floor(baseDamage / 2)}] </Bold>
            <Bold>[Critique : {Math.floor(baseDamage * 3 / 2)}] </Bold>
          </span>
        </Row>
        <Row>
          <span>Le <Bold>projectile</Bold> sera considéré comme une arme</span>
        </Row>
      </>
    )
  },
}, {
  id: TechniqueId.Devastate,
  name: "Ravager",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} />
      </Row>
      <Row>
        <span>
          <span>Les statuts suivants ont leurs effets <Bold>doublés pendant l'action</Bold> </span>
          <span>
            <DisplayStatus status={Status.Stunned} />
            <DisplayStatus status={Status.Piercing} />
            <DisplayStatus status={Status.Impact} />
          </span>
        </span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.Siphon,
  name: "Siphonner",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  required: "ni Arc ni Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> et vole <Bold>{summary.mind / 5} PM</Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.LongRangeShot,
  name: "Tir lointain",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: (summary) => (summary.primaryWeapon?.range && { min: summary.primaryWeapon.range.min, max: summary.primaryWeapon.range.max + 1 })
    || "Portée Arme + 1",
  required: "Arc ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec une <Bold>portée maximale augmentée  de 1 case</Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.Torment,
  name: "Tourmenter",
  usageCost: getPrimaryWeaponUsageCost,
  range: { min: 1, max: 1 },
  manaCost: true,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Attaque de <DisplayElement element={ElementId.Dark} hasLabel /> de l'arme principale </span>
          <ResumeAttack weapon={summary?.primaryWeapon} />
          <span> avec <Bold>3<DisplayStatus status={Status.Terror} hasLabel /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>Chaque niveau de <Bold>Terreur</Bold> déjà existant donne <Bold>+5 de Précision (maximum +30)</Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.AthleticLeap,
  name: "Bond athlétique",
  usageCost: 4,
  range: { min: 2, max: 2 },
  area: BoxType.Empty,
  resume: (summary) => <Badge pill><Bold>+ {summary.constitution / 5} <DisplayStatus status={Status.Impact} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Permet de <Bold>bondir</Bold> sur la case ciblée</span>
      </Row>
      <Row>
        <span>Confère également <Bold>{summary.constitution / 5} <DisplayStatus status={Status.Impact} hasLabel /></Bold></span>
      </Row>
      <Row>
        <Italic>Note : subit les effets du statut <Bold><DisplayStatus status={Status.Restrained} /></Bold></Italic>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.SuddenDisappearance,
  name: "Disparition soudaine",
  usageCost: 2,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Réalise une <Bold>disparition</Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Un <Bold><DisplayItemImage id={365} name="fumigène" /> fumigène</Bold> peut être utilisé pour obtenir <Bold>+30 en DIS</Bold> pendant l'action</span>
        </span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.IgniteArrow,
  name: "Enflammer une flèche",
  usageCost: 2,
  range: { min: 0, max: 1 },
  area: [BoxType.Fire, "Soi-même"],
  resume: (<></>),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Consomme une flèche de l'inventaire et prépare une munition <Bold>flèche enflammée</Bold> pour 3 tours,</span>
          <span> qui sera automatiquement utilisée lors de la prochaine attaque avec l'arc à la place d'une flèche normale</span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Sur une source de feu (Brasero, Campement, Incendie) le coût de cette action est <Bold>réduit à 0 PA</Bold></span>
        </span>
      </Row>
      <Row>
        <Italic>Note : la munition est perdue si le perso deséquipe ou échange son arme en main</Italic>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.Incant,
  name: "Incanter",
  usageCost: 3,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Réalise une <Bold>méditation</Bold></span>
          <span> et remplit un emplacement de <Bold>Mémoire</Bold> avec un <Bold>sort aléatoire</Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <Italic>Note : les sorts possibles dépendent du Domaine où se trouve le personnage,</Italic>
          <Italic> mais incluent toujours <Bold>Piqûre, Exaltation</Bold> et <Bold>Envoûtement</Bold></Italic>
        </span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.Inspire,
  name: "Inspirer",
  usageCost: 6,
  area: "Soi-même",
  resume: (summary) => <Badge pill><Bold>+ {summary.charisma / 5} <DisplayStatus status={Status.Inspiration} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Confère à soi-même et aux personnages alliés adjacents <Bold>{summary.charisma / 5} <DisplayStatus status={Status.Inspiration} hasLabel /></Bold></span>
      </Row>
      <Row>
        <Italic>Note : les personnages alliés sont ceux qui appartiennent au même clan ou qui ont un lien d'empathie, ainsi que tout leurs compagnons</Italic>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.FutureRead,
  name: "Lire l'avenir",
  usageCost: 0,
  range: { min: 0, max: 4 },
  resume: (summary) => <Badge pill><Bold><AccuracyAttack accuracy={summary.magicAttack + summary.observation} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Permet de connaître le <Bold>prochain tirage des dés de PA</Bold> de sa cible</span>
          <span> ainsi que <Bold>l'horaire de son prochain tour</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Requiert de réussir une touche avec <Bold>{summary.magicAttack + summary.observation}</Bold></span>
      </Row>
      <Row>
        <span>Si la cible n'est pas un allié, elle se défend avec <Bold>(DM + DIS)</Bold></span>
      </Row>
      <Row>
        <span>Les dés les plus à droite seront perdus si la cible est <Bold>en surcharge</Bold> ou <Bold>agonisante</Bold> à son activation</span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.DefensiveMeditation,
  name: "Méditation défensive",
  usageCost: 3,
  area: "Soi-même",
  resume: () => <Badge pill><Bold>+ 1 <DisplayStatus status={Status.Defense} /></Bold></Badge>,
  getDescription: () => (
    <span>
      <span>Réalise une <Bold>méditation</Bold> et gagne <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold></span>
    </span>
  )
}, {
  id: TechniqueId.BloodSacrifice,
  name: "Offrir son sang",
  usageCost: 0,
  area: "Soi-même",
  resume: () => (
    <span>
      <Badge pill><Bold><DisplayElement element={ElementId.Dark} /> -10PV</Bold></Badge>
      <Badge pill><Bold>+2 <DisplayStatus status={Status.Bleeding} /></Bold></Badge>
    </span>
  ),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Inflige à l'utilisateur <Bold><DisplayDamage value={10} type={DamageType.Pure} element={ElementId.Dark} /></Bold></span>
          <span> et <Bold>2 <DisplayStatus status={Status.Bleeding} hasLabel /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>Réalise ensuite une <Bold>méditation</Bold></span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.SetTrap,
  name: "Poser un piège",
  usageCost: 3,
  range: { min: 1, max: 1 },
  area: BoxType.Empty,
  discreet: true,
  resume: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 1 },
    };
    return <ResumeAttack weapon={noWeapon} modifier={{ baseDamage: summary.dexterity, baseAccuracy: summary.discretion }} />
  },
  getDescription: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 1 },
    };
    return (
      <>
        <Row>
          <span>
            <span>Pose un <Bold>piège</Bold> sur une case vide, qui sera <Bold>invisible</Bold> sauf pour les personnages alliés</span>
          </span>
        </Row>
        <Row>
          <span>Unpiège peut être découvert lors d'un <Bold>action de recherche</Bold>, lors de laquelle sa <Bold>Dis ({summary.discretion})</Bold> aide à le cacher</span>
        </Row>
        <Row>
          <span>
            <span>Un piège se déclenche lorsqu'un personnage entre sur la case piégée ou la fouille. </span>
            <span>Ceci se résoud comme une attaque. </span>
            <span>L'<Bold>Obs</Bold> est urilisée pour se défendre (au lieu de l'Esq)</span>
          </span>
        </Row>
        <Row>
          <span>
            <span>Il inflige des dégats physiques </span>
            <ResumeAttack weapon={noWeapon} modifier={{ baseDamage: summary.dexterity, baseAccuracy: summary.discretion }} />
          </span>
        </Row>
        <Row>
          <span>L'objet utilisé pour le piège compte ses bonus de DGT et de PRE ainsi que ses statuts, comme une arme</span>
        </Row>
        <Row>
          <span>Les objets servants à poser des pièges sont <DisplayItemImage id={16} name="Flèche" /> et <DisplayItemImage id={352} name="Piège à ours" /></span>
        </Row>
      </>
    )
  },
}, {
  id: TechniqueId.FirstAid,
  name: "Premier soin",
  usageCost: 2,
  range: { min: 0, max: 1 },
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.accuracy - 30} />
      <HealStatus
        className="mx-2"
        blocked={Math.floor(summary.intelligence / 2)}
        base={summary.intelligence}
        critical={Math.floor(3 * summary.intelligence / 2)}
      />
    </span>
  ),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Réalise un </span>
          <Bold>soin de {summary.intelligence} </Bold>
          <span> avec une <Bold>PRE  de {summary.accuracy - 30} %</Bold></span>
          <Bold>[Bloqué: {Math.floor(summary.intelligence / 2)}] </Bold>
          <Bold>[Critique : {Math.floor(3 * summary.intelligence / 2)}] </Bold>
        </span>
      </Row>
      <Row>
        <span>
          <span><Bold>Réussite</Bold> : retire <Bold>1 de <DisplayStatus status={Status.Poisoned} hasLabel /> ou de <DisplayStatus status={Status.Burning} hasLabel /></Bold> (le plus haut niveau)</span>
        </span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.IntuitiveSearch,
  name: "Recherche intuitive",
  usageCost: 1,
  area: "Soi-même",
  discreet: true,
  resume: (<></>),
  getDescription: () => (
    <span>Réalise une <Bold>recherche</Bold></span>
  ),
}, {
  id: TechniqueId.StimulatingTreatment,
  name: "Soin stimulant",
  usageCost: 4,
  range: { min: 0, max: 1 },
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.accuracy} />
      <HealStatus
        className="mx-2"
        blocked={Math.floor(summary.intelligence / 2)}
        base={summary.intelligence}
        critical={Math.floor(3 * summary.intelligence / 2)}
      />
      <Badge pill><Bold>+1 <DisplayStatus status={Status.Defense} /></Bold></Badge>
    </span>
  ),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Réalise un </span>
          <Bold>soin de {summary.intelligence} </Bold>
          <span> avec une <Bold>PRE  de {summary.accuracy} %</Bold></span>
          <Bold>[Bloqué: {Math.floor(summary.intelligence / 2)}] </Bold>
          <Bold>[Critique : {summary.intelligence}] </Bold>
          <span>et confère <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> à la cible</span>
        </span>
      </Row>
      <Row>
        <span>
          <span><Bold>Critique</Bold> : au lieu des soins augmentés, <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> supplémentaire.</span>
        </span>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.DevotedSupport,
  name: "Soutien dévoué",
  usageCost: 3,
  range: { min: 1, max: 2 },
  resume: (summary) => <Badge pill><Bold>+ {(summary.charisma / 5) + (summary.gifts.includes(GiftId.MUTUALAID) ? 1 : 0)} <DisplayStatus status={Status.Inspiration} /> PA</Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Réalise un <Bold>soutien</Bold> qui confère <Bold>{(summary.charisma / 5) + (summary.gifts.includes(GiftId.MUTUALAID) ? 1 : 0)}</Bold> au lieu de 2</span>
      </Row>
      <Row>
        <Italic>Note : Le don <Bold>Entraide</Bold> fonctionne normalement</Italic>
      </Row>
    </>
  ),
}, {
  id: TechniqueId.MysticalSubterfuge,
  name: "Subterfuge mystique",
  usageCost: 4,
  manaCost: true,
  area: "Soi-même",
  resume: () => <Badge pill><Bold>+3 <DisplayStatus status={Status.MysticalSubterfuge} /></Bold></Badge>,
  getDescription: () => (
    <span>
      <span>Confère <Bold>3 <DisplayStatus status={Status.MysticalSubterfuge} hasLabel /></Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.MagicOverload,
  name: "Surcharge magique",
  usageCost: 0,
  manaCost: 3,
  area: "Soi-même",
  resume: (summary) => <Badge pill><Bold>+ {summary.intelligence / 5} <DisplayStatus status={Status.Overload} /></Bold></Badge>,
  getDescription: (summary) => (
    <span>
      <span>Confère <Bold>{summary.intelligence / 5} <DisplayStatus status={Status.Overload} hasLabel /></Bold></span>
    </span>
  ),
}, {
  id: TechniqueId.Protect,
  name: "Protéger",
  usageCost: 2,
  range: { min: 1, max: 1 },
  resume: () => <Badge pill><Bold><DisplayStatus status={Status.Protect} /></Bold></Badge>,
  getDescription: () => (
    <>
      <Row>
        <span>Permet de <Bold>protéger <DisplayStatus status={Status.Protect} /></Bold> sa cible jusqu'au prochain tour de l'utilisateur (le protecteur)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que le <Bold>personnage protégé</Bold> est ciblé par une action hostile (attaque, technique ou sort), </span>
          <span>le <Bold>protecteur</Bold> prend sa place et devient ainsi la nouvelle cible</span>
        </span>
        <List>
          <li>La protection n'est pas déclenchée si le protecteur n'est <Bold>plus adjacent</Bold> au protégé</li>
          <li>Elle est annulée au prochain tour du protecteur, même si elle n'a pas été déclenchée</li>
          <li>Si la technique est utilisée sur une cible <Bold>déjà protégée</Bold>, l'utilisateur devient <Bold>le nouveau protecteur</Bold></li>
        </List>
      </Row>
    </>
  )
}, {
  id: TechniqueId.Retirement,
  name: "Retraite",
  usageCost: 2,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>Permet de préparer <Bold>une retraite</Bold> pour le tour en cours (expire à l'activation)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que l'utilisateur est la cible d'une attaque ou d'un sort hostile, après la résolution des effets, </span>
          <span> il <Bold>se déplace dans la direction choisie, ou si impossible, dans une des 2 directions adjacentes</Bold></span>
        </span>
      </Row>
      <Row>
        <span>En cas de blocage ou d'esquive, et si un déplacement a bien été effectué, l'attaquant subit <Bold>+2 <DisplayStatus status={Status.Exposed} hasLabel /></Bold></span>
      </Row>
    </>
  )
}, {
  id: TechniqueId.Hitback,
  name: "Riposter",
  usageCost: 2,
  area: "Soi-même",
  required: "Arme de corps-à-corps",
  resume: () => <Badge pill><Bold><DisplayStatus status={Status.Hitback} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Permet de préparer <Bold>une riposte <DisplayStatus status={Status.Hitback} /></Bold> pour le tour en cours (expire à l'activation)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que l'utilisateur est la cible d'une attaque ou d'un sort hostile par un personnage adjacent, </span>
          <span>il <Bold>riposte par une attaque normale</Bold> <PrincipalWeaponAttack summary={summary} /></span>
        </span>
      </Row>
      <Row>
        <span>Une riposte <Bold>ne déclenche pas</Bold> d'actions programmées(<Bold>Riposter, Protéger</Bold>)</span>
      </Row>
      <Row>
        <span>L'utilisateur doit toujours être <Bold>équipé d'une arme de corps-à-corps</Bold> au moment de riposter</span>
      </Row>
    </>
  )
}, {
  id: TechniqueId.Ambidexterity,
  name: "Ambidextrie",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Quand vous attaquez avec l'une de vos armes, </span>
          <span>la prochaine attaque ce tour avec l'autre arme vous coûte <Bold>1 PA de moins </Bold> </span>
          <span>et bénéficie d'un <Bold>bonus de 15% PRE</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Cet effet ne peut se declencher <Bold>qu'une seule fois par main</Bold></span>
      </Row>
      <Row>
        <Italic>Note : Fonctionne avec les attaques de bases et les techniques d'attaque</Italic>
      </Row>
    </>
  )
}, {
  id: TechniqueId.Cavalry,
  name: "Cavalerie",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>Permet d'utiliser les <Bold>Sortilèges</Bold> et les <Bold>Techniques d'attaque</Bold> sur une monture</span>
      </Row>
      <Row>
        <span>Le malus passe de -30% à <Bold>-15%</Bold></span>
      </Row>
      <Row>
        <span>
          <span>Pour chaque case parcourure (jusqu'à 3 maximum), </span>
          <span>la prochaine attaque de ce tour aura <Bold>+15% en Précision</Bold> (jusqu'à +45% maximum)</span>
        </span>
      </Row>
      <Row>
        <span>Ce bonus requiert d'attaque avec une <Bold>Epée</Bold>, une <Bold>Lance</Bold>, une <Bold>Masse</Bold>, une <Bold>Hache</Bold> ou un <Bold>Bouclier</Bold></span>
      </Row>
    </>
  )
}, {
  id: TechniqueId.Ambush,
  name: "Embuscade",
  resume: (<></>),
  getDescription: (summary) => (
    <>
      <Row>
        <span>Opère si vous avez le statut <Bold><DisplayStatus status={Status.Furtivity} hasLabel /></Bold></span>
      </Row>
      <Row>
        <span>
          <span>Lors d'une attaque (physique ou magique), <Bold>{Math.floor(summary.discretion / 2)}%</Bold> </span>
          <span>s'ajoute à l'attribut pour attaquer ou pour défendre</span>
        </span>
      </Row>
    </>
  )
}, {
  id: TechniqueId.CombatMagic,
  name: "Magie de combat",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Quand vous infligez des <Bold>dégâts physiques, </Bold></span>
          <span>vous gagnez <Bold>+[5 dégâts infligés/5] <DisplayStatus status={Status.Overload} /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Quand vous infligez des <Bold>dégâts magiques, </Bold></span>
          <span>vous gagnez <Bold>+[5 dégâts infligés/5] <DisplayStatus status={Status.Impact} /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Chacun de ses effets se déclenchent maximum une fois par tour</span>
        </span>
      </Row>
    </>
  )
}, {
  id: TechniqueId.BeastMastery,
  name: "Maîtrise des Bêtes",
  resume: (<></>),
  getDescription: () => (
    <span>Vous pouvez déployer un maximum  de <Bold>3 compagnons animaux</Bold> (au lieu d'un seul)</span>
  )
}, {
  id: TechniqueId.Vigilance,
  name: "Vigilance",
  resume: (<></>),
  getDescription: (summary) => (
    <>
      <Row>
        <span>Opère lorsque vous avez l'<Bold>Avantage</Bold> ou que votre adversaire a le <Bold>Désavantage</Bold></span>
      </Row>
      <Row>
        <span>
          <span>Lors d'une attaque (physique ou magique), <Bold>{Math.floor(summary.observation / 2)}%</Bold> </span>
          <span>s'ajoute à l'attribut pour attaquer ou pour défendre</span>
        </span>
      </Row>
    </>
  )
},
];