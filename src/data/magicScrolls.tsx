import { Badge, Bold, Card, CardBody, CardHeader, Col, CrystalGuardian, Ghost, Ghoul, IceElemental, Italic, List, Row, Skeleton, StoneGolem, Treant, Underline } from "../components";
import { DisplayElement } from "../components/DisplayElement";
import { DisplayStatus } from "../components/DisplayStatus";
import { DisplayTouch } from "../components/DisplayTouch";
import { SummaryState } from "../features/summary/SummarySlice";
import { DisplayAttack, DisplayDamageType } from "../features/talents/DisplayAttack";
import { DisplaySupport } from "../features/talents/DisplaySupport";
import { ElementId, Status } from "./inventory";
import { Talent, DamageType, BoxType, ResumeEffect, AccuracyAttack, HealStatus } from "./talents";

export enum MagicScrollId {
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

const getMagicPower = (summary: SummaryState) => (summary.magicPower + summary.intelligence);

export const magicScrolls: Talent[] = [{
  id: MagicScrollId.FireBall,
  name: "Boule de feu",
  reusable: true,
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Fire} status={[{ value: 2, status: Status.Burning }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      element={ElementId.Fire}
      damage={{ value: getMagicPower(summary), type: DamageType.Magic }}
      status={[{
        value: 2,
        status: Status.Burning,
      }]}
    />
  ),
}, {
  id: MagicScrollId.Freezing,
  name: "Congélation",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Ice,
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} element={ElementId.Ice} status={[{ value: getMagicPower(summary) / 5, status: Status.Freeze }]} />,
  getDescription: (summary) => {
    return (
      <>
        <Row><Col><Bold>Sur personnage :</Bold> Inflige <Bold>{getMagicPower(summary) / 5} <DisplayStatus status={Status.Freeze} hasLabel />.</Bold></Col></Row>
        <Row><Col><Bold>Sur case libre :</Bold> Génère <Bold>un block de glace.</Bold> (5PA pour détruire, dure environ 48h).</Col></Row>
        <Row><Col><DisplayTouch semiSuccess="Elément fragile (-1PA pour le détruire)." critical="Elément solide (+1PA pour le détruire)" /></Col></Row>
      </>
    )
  }
}, {
  id: MagicScrollId.LifeDrain,
  name: "Drain de vie",
  reusable: true,
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Dark} />,
  getDescription: (summary) => (
    <>
      <Row>
        <Col>
          <DisplayAttack
            element={ElementId.Dark}
            damage={{ value: getMagicPower(summary), type: DamageType.Magic }}
          />
        </Col>
      </Row>
      <Row><Col>Soigne le lanceur de <Bold>30% des dégâts infligés</Bold>, <Bold>+5%</Bold> par <DisplayStatus status={Status.Bleeding} hasLabel /> sur la cible (<Bold>max de 30%</Bold>).</Col></Row>
    </>
  ),
}, {
  id: MagicScrollId.Restraining,
  name: "Entrave",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 4 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Restrained }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{
        value: getMagicPower(summary) / 5,
        status: Status.Restrained,
      }]}
    />
  ),
}, {
  id: MagicScrollId.Bewitchment,
  name: "Envoûtement",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 5 },
  reusable: true,
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: 2, status: Status.Bewitched }]} />,
  getDescription: () => (
    <DisplayAttack
      status={[{
        value: 2,
        status: Status.Bewitched,
      }]}
    />
  ),
}, {
  id: MagicScrollId.Thunder,
  name: "Foudre",
  manaCost: true,
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Thunder} />,
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col>
            <DisplayAttack
              damage={{ value: mag, type: DamageType.Magic }} element={ElementId.Thunder} />
            <span> à la cible centrale.</span>
          </Col>
        </Row>
        <Row>
          <Col>Inflige <span>{Math.floor(mag / 2)}</span> aux personnages adjacents.</Col>
        </Row>
        <Row>
          <Col><Italic>Note : ne déclenche les réactions <Bold>(Retraite, Riposter, Protéger)</Bold> que sur la cible principale.</Italic></Col>
        </Row>
      </>
    );
  },
}, {
  id: MagicScrollId.Burning,
  name: "Incendie",
  manaCost: true,
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: 2, status: Status.Burning }, { value: getMagicPower(summary) / 5, status: Status.Fire }]} />,
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col><Bold>Sur case centrale, si libre</Bold> : Génère <Bold>un <DisplayStatus status={Status.Fire} hasLabel /></Bold> de <Bold>{mag / 5} <DisplayStatus status={Status.Fire} /></Bold> intensité.</Col>
        </Row>
        <Row>
          <Col><Bold>Sur décor d'arbre ou d'herbe</Bold> : Devient <Bold>un <DisplayStatus status={Status.Fire} hasLabel /></Bold> de <Bold>{mag / 5} <DisplayStatus status={Status.Fire} /></Bold> intensité.</Col>
        </Row>
        <Row>
          <Col><Bold>Sur personnage</Bold> : <DisplayAttack status={[{ value: 2, status: Status.Burning, }]} />.</Col>
        </Row>
      </>
    )
  },
}, {
  id: MagicScrollId.Incineration,
  name: "Incinération",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Fire,
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.magicAttack} />
      <Badge pill><Bold>4x <DisplayStatus status={Status.Burning} /> PV <DisplayElement element={ElementId.Fire} /></Bold></Badge>
    </span>
  ),
  getDescription: () => {
    return (
      <>
        <Row>
          <Col>Inflige <Bold> (4x niveau <DisplayStatus status={Status.Burning} hasLabel /> sur cible) <DisplayDamageType type={DamageType.Pure} /> de <DisplayElement element={ElementId.Fire} hasLabel /></Bold>.</Col>
        </Row>
        <Row>
          <Col>Retire <Bold>Toute la Brûlure</Bold>.</Col>
        </Row>
        <DisplayTouch semiSuccess="-50% de dégats" critical="+50% de dégats" />
      </>
    );
  }
}, {
  id: MagicScrollId.Judgement,
  name: "Jugement",
  manaCost: true,
  usageCost: 6,
  element: ElementId.Light,
  range: { min: 1, max: 1 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence * 1.5} modifier={{ damage: summary.magicPower }} element={ElementId.Light} />,
  getDescription: (summary) => (
    <>
      <Row>
        <Col><DisplayAttack
          element={ElementId.Light}
          damage={{ value: Math.floor(summary.intelligence * 1.5) + summary.magicPower, type: DamageType.Magic }}
        /></Col>
      </Row>
      <Row>
        <Col>MM <Bold>augmentée de 2% par niveau de statuts positifs de la cible.</Bold></Col>
      </Row>
    </>
  ),
}, {
  id: MagicScrollId.CrystalSpear,
  name: "Lance de cristal",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <ResumeEffect
      attack={summary.magicAttack}
      damage={summary.intelligence}
      modifier={{ damage: summary.magicPower }}
      self={[{ value: 2, status: Status.Aegis }]}
    />
  ),
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <Col><DisplayAttack damage={{ value: getMagicPower(summary), type: DamageType.Magic }} /></Col>
        </Row>
        <Row>
          <Col>Confère au lanceur <Bold>2 <DisplayStatus status={Status.Aegis} hasLabel /></Bold></Col>
        </Row>
      </>
    );
  },
}, {
  id: MagicScrollId.Poisoning,
  name: "Maléfice de poison",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Poisoned }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Poisoned }]}
    />),
}, {
  id: MagicScrollId.Bleeding,
  name: "Maléfice de saignement",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Bleeding }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Bleeding }]}
    />),
}, {
  id: MagicScrollId.Necrosis,
  name: "Maléfice de nécrose",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Necrosis }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Necrosis }]}
    />),
}, {
  id: MagicScrollId.Permutation,
  name: "Permutation",
  manaCost: true,
  usageCost: "(distance x 3)",
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row><Col>Echange sa position avec celle de la cible.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
}, {
  id: MagicScrollId.Stinging,
  name: "Piqûre",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ attack: 20, damage: summary.magicPower }} />,
  getDescription: (summary) => (
    <span>
      <DisplayAttack
        damage={{ value: getMagicPower(summary), type: DamageType.Magic }}
      />
      <span> avec +20 de MM.</span>
    </span>
  ),
}, {
  id: MagicScrollId.FrostBurst,
  name: "Rafale de givre",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Ice} status={[{ value: 2, status: Status.Freeze }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      element={ElementId.Ice}
      damage={{ value: getMagicPower(summary), type: DamageType.Magic }}
      status={[{ value: 2, status: Status.Freeze }]}
    />
  ),
}, {
  id: MagicScrollId.Subversion,
  name: "Subversion",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => {
    const value = getMagicPower(summary) / 10;
    return (
      <ResumeEffect
        attack={summary.magicAttack}
        status={[{ value, status: Status.Terror }]}
        self={[{ value, status: Status.Will }]}
      />
    )
  },
  getDescription: (summary) => {
    const value = getMagicPower(summary) / 10;
    return (
      <>
        <DisplayAttack
          status={[{ value, status: Status.Terror }]}
        />
        <span> et confère au lanceur <Bold>{value} <DisplayStatus status={Status.Will} hasLabel /></Bold></span>
      </>
    )
  }
}, {
  id: MagicScrollId.Telekinesis,
  name: "Télékinésie",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <Row>
      <Col>Deplace la cible <Bold>vers une case vide adjacente.</Bold></Col>
    </Row>
  )
}, {
  id: MagicScrollId.MagicStealing,
  name: "Vol de magie",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <Col>Vole <Bold>{getMagicPower(summary) / 5} PM</Bold> et <Bold>dissipe 2 <DisplayStatus status={Status.Aegis} hasLabel />.</Bold></Col>
        </Row>
        <Row>
          <Col>Regagne <Bold>2 PM</Bold> par  <Bold>Niveau de <DisplayStatus status={Status.Aegis} hasLabel /> dissipé</Bold>.</Col>
        </Row>
        <DisplayTouch semiSuccess="-1 statut disspé" critical="+1 statut disspé" />
      </>
    )
  }
}, {
  id: MagicScrollId.Armor,
  name: "Armure",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Endurance }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Endurance }]}
    />
  ),
}, {
  id: MagicScrollId.Devotion,
  name: "Dévotion",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Force }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Force }]}
    />
  ),
}, {
  id: MagicScrollId.Discipline,
  name: "Discipline",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Will }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Will }]}
    />
  ),
}, {
  id: MagicScrollId.Aegis,
  name: "Egide",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Aegis }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Aegis }]}
    />
  ),
}, {
  id: MagicScrollId.Exaltation,
  name: "Exaltation",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  reusable: true,
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Exalted }]} />,
  getDescription: (summary) => (
    <>
      <DisplaySupport
        status={[{ value: getMagicPower(summary) / 5, status: Status.Exalted }]}
      />
      <DisplayTouch semiSuccess="-2 statuts" critical="+2 statuts" />
    </>
  ),
}, {
  id: MagicScrollId.Healing,
  name: "Guérison",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <HealStatus
        blocked={Math.floor(summary.intelligence / 2) + summary.magicPower}
        base={summary.intelligence + summary.magicPower}
        critical={Math.floor(summary.intelligence * 1.5) + summary.magicPower} />
    </span>
  ),
  getDescription: (summary) => (
    <span>Soigne <Bold>{getMagicPower(summary)} PV</Bold></span>
  )
}, {
  id: MagicScrollId.Instinct,
  name: "Instinct",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Hability }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Hability }]}
    />
  ),
}, {
  id: MagicScrollId.Invisibility,
  name: "Invisibilité",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: 4, status: Status.Furtivity }]} />,
  getDescription: (summary) => (
    <>
      <DisplaySupport
        status={[{ value: 4, status: Status.Furtivity }]}
      />
      <DisplayTouch semiSuccess="-2 statuts" critical="+2 statuts" />
      <Italic>Note : Ne fonctionne pas sur un personnage sur une monture.</Italic>
    </>
  ),
}, {
  id: MagicScrollId.Purification,
  name: "Purification",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Immunity }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Immunity }]}
    />
  ),
}, {
  id: MagicScrollId.Reflex,
  name: "Réflexes",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Vivacious }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Vivacious }]}
    />
  ),
}, {
  id: MagicScrollId.Regeneration,
  name: "Régénération",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Regeneration }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Regeneration }]}
    />
  ),
}, {
  id: MagicScrollId.CrystalWall,
  name: "Mur de cristal",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} self={[{ value: 1, status: Status.Aegis }]} />,
  getDescription: () => (
    <>
      <Row>
        <Col>Génère <Bold>un mur de cristal</Bold> (5PA pour Détruire, dure environ 48h).</Col>
      </Row>
      <Row>
        <Col>Confère au lanceur 1 <Bold><DisplayStatus status={Status.Aegis} hasLabel /></Bold></Col>
      </Row>
      <DisplayTouch semiSuccess="Elément fragile (-1PA pour Détruire)." critical="Elément solide (+1PA pour Détruire)" />
    </>
  ),
}, {
  id: MagicScrollId.BramblesWall,
  name: "Mur de ronces",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row>
        <Col>Génère <Bold>des ronces</Bold> (dure environ 48h).</Col>
      </Row>
      <Row>
        <List>
          <li>Entrer sur une <Bold>case adjacente</Bold> inflige <Bold>+2 <DisplayStatus status={Status.Poisoned} /></Bold></li>
          <li><Bold>Arracher (1PA)</Bold> inflige <Bold>+4 <DisplayStatus status={Status.Poisoned} /></Bold></li>
        </List>
      </Row>
      <Row>
        <DisplayTouch semiSuccess="Elément fragile (-1PA pour Détruire)." critical="Elément solide (+1PA pour Détruire)" />
      </Row>
    </>
  ),
}, {
  id: MagicScrollId.ForestSummon,
  name: "Invocation de la forêt",
  manaCost: true,
  usageCost: 8,
  area: BoxType.Tree,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Treant /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un arbre en un <Bold><Treant hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <Treant hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.7 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{Math.floor(1.5 * mag)}</Bold></Col>
            </Row>
            <Row></Row>
            <Row>
              <Col>DGT : <Bold>         +4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Vulnérabilité <DisplayElement element={ElementId.Fire} /> 30%</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>DGT : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Attaque puissante</Bold></Col>
            </Row>
          </CardBody>
        </Card >
        <Row>
          <DisplayTouch
            critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
            semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
          />
        </Row>
      </>
    )
  },
}, {
  id: MagicScrollId.RockSummon,
  name: "Invocation de la roche",
  manaCost: true,
  usageCost: 8,
  area: BoxType.Rock,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><StoneGolem /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un rocher en un <Bold><StoneGolem hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <StoneGolem hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>ARM : <Bold>+6</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>ARM : <Bold>+3</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Stunned }]} /></Bold></Col>
            </Row>
          </CardBody>
        </Card>
        <Row>
          <DisplayTouch
            critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
            semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
          />
        </Row>
      </>
    )
  },
}, {
  id: MagicScrollId.CrystalSummon,
  name: "Invocation du cristal",
  manaCost: true,
  usageCost: 8,
  area: BoxType.CrystalWall,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><CrystalGuardian /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col>Transforme un mur de cristal en un <Bold><CrystalGuardian hasLabel /></Bold>.</Col>
        </Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <CrystalGuardian hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>DM : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col>RES : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Lance de cristal</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col>RES : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Résonnance</Bold>: les statuts positifs réçus sont également appliqués à son maître.</Col>
            </Row>
          </CardBody>
        </Card>
        <Row>
          <DisplayTouch
            critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
            semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
          />
        </Row>
      </>
    )
  },
}, {
  id: MagicScrollId.FrostSummon,
  name: "Invocation du givre",
  manaCost: true,
  usageCost: 8,
  area: BoxType.IceWall,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><IceElemental /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un mur de glace en un <Bold><IceElemental hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <IceElemental hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>PRE : <Bold>{Math.floor(1.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>MM : <Bold>{Math.floor(1.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Rafale de givre</Bold></Col></Row>
            <Row>
              <Col><Bold>Résistance <DisplayElement element={ElementId.Ice} hasLabel /> 20%</Bold></Col></Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col>
                <Bold>Résistance <DisplayElement element={ElementId.Ice} hasLabel /> 20%</Bold>
              </Col>
            </Row>
            <Row>
              <Col>
                <Bold><DisplayAttack status={[{ value: 1, status: Status.Freeze }]} /></Bold>
              </Col>
            </Row>
          </CardBody >
        </Card >
        <Row>
          <DisplayTouch
            critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
            semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
          />
        </Row>
      </>
    )
  },
}, {
  id: MagicScrollId.SoulsAwakening,
  name: "Réveil des âmes",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Ghost /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève un <Bold><Ghost hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <Ghost hasLabel /> - Invocation mineure</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.2 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold>  </Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{mag}</Bold>   </Col>
            </Row>
            <Row>
              <Col>ESQ : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>DM : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Vulnérabilité <DisplayElement element={ElementId.Light} hasLabel /> 30%</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Siphonner</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col><Bold>Vol de magie</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Terror }]} /></Bold></Col>
            </Row>
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
            />
          </CardBody>
        </Card>
      </>
    )
  },
}, {
  id: MagicScrollId.FleshAwakening,
  name: "Réveil des chairs",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Ghoul /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève une <Bold><Ghoul hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil de la <Ghoul hasLabel /> - Invocation mineure</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.3 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.2 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Vulnérabilité <DisplayElement element={ElementId.Light} hasLabel /> 30%</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Necrosis }]} /></Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col><Bold>Attaque défensive</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Terror }]} /></Bold></Col>
            </Row>
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
            />
          </CardBody>
        </Card>
      </>
    )
  },
}, {
  id: MagicScrollId.BonesAwakening,
  name: "Réveil des ossements",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Skeleton /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève un <Bold><Skeleton hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <Skeleton hasLabel /> - Invocation mineure</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.2 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.2 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{Math.floor(1.5 * mag)}</Bold></Col>
            </Row>
            <Bold>Vulnérabilité <DisplayElement element={ElementId.Light} hasLabel /> 30%</Bold>
            <Row>
              <Col>DGT : <Bold>+3</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col><Bold>Attaque précise</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Terror }]} /></Bold></Col>
            </Row>
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
            />
          </CardBody>
        </Card>
      </>
    )
  },
}, {
  id: MagicScrollId.Teleportation,
  name: "Téléportation",
  manaCost: true,
  usageCost: "(distance x 2)",
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row><Col>Se <Bold>téléporte</Bold> sur la case.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
},];