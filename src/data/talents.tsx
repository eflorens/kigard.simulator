import { DisplayAttack, DisplayDamageType } from "../features/talents/DisplayAttack";
import { DisplayElement } from "../components/DisplayElement";
import { DisplayStatus } from "../components/DisplayStatus";
import { SummaryState } from "../features/summary/SummarySlice";
import { ElementId, Status } from "./inventory";
import { DisplaySupport } from "../features/talents/DisplaySupport";
import { DisplayTouch } from "../components/DisplayTouch";
import { Bold, Card, CardBody, CardHeader, Col, Italic, Nav, NavItem, Row, Underline } from "../components";

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

export enum DamageType {
  Pure,
  Physical,
  Magic,
}

export enum BoxType {
  Empty = "empty",
  Tree = "tree",
  Rock = "rock",
  CrystalWall = "crystalWall",
  IceWall = "iceWall",
  Remains = "remains",
}

export interface Talent {
  id: number;
  name: string;
  usageCost: number | string;
  reusable?: boolean;
  range: { min: number, max: number };
  area?: BoxType | { x: number, y: number };
  element?: ElementId;
  getDescription: (summary: SummaryState) => React.ReactNode | string;
}

const getMagicPower = (summary: SummaryState) => (summary.magicPower + summary.intelligence);

const magicScrolls: Talent[] = [{
  id: MagicScrollId.FireBall,
  name: "Boule de feu",
  reusable: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
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
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Ice,
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
  usageCost: 4,
  range: { min: 1, max: 2 },
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
  usageCost: 4,
  range: { min: 1, max: 4 },
  getDescription: (summary: SummaryState) => (
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
  usageCost: 4,
  range: { min: 1, max: 5 },
  reusable: true,
  getDescription: (summary: SummaryState) => (
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
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
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
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col><Bold>Sur case centrale, si libre</Bold> : Génère <Bold>un incendie</Bold> de <Bold>{mag / 5}</Bold> intensité.</Col>
        </Row>
        <Row>
          <Col><Bold>Sur décor d'arbre ou d'herbe</Bold> : Devient <Bold>un incendie</Bold> de <Bold>{mag / 5}</Bold> intensité.</Col>
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
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Fire,
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
  usageCost: 6,
  element: ElementId.Light,
  range: { min: 1, max: 1 },
  getDescription: (summary) => (
    <>
      <Row>
        <Col><DisplayAttack
          element={ElementId.Light}
          damage={{ value: Math.floor(getMagicPower(summary) * 1.5), type: DamageType.Magic }}
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
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
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
  usageCost: 4,
  range: { min: 0, max: 3 },
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Poisoned }]}
    />),
}, {
  id: MagicScrollId.Bleeding,
  name: "Maléfice de saignement",
  usageCost: 4,
  range: { min: 0, max: 3 },
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Bleeding }]}
    />),
}, {
  id: MagicScrollId.Necrosis,
  name: "Maléfice de nécrose",
  usageCost: 4,
  range: { min: 0, max: 3 },
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Necrosis }]}
    />),
}, {
  id: MagicScrollId.Permutation,
  name: "Permutation",
  usageCost: "(distance x 3)",
  range: { min: 1, max: 2 },
  getDescription: () => (
    <>
      <Row><Col>Echange sa position avec celle de la cible.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
}, {
  id: MagicScrollId.Stinging,
  name: "Piqûre",
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
  getDescription: (summary) => (
    <Row>
      <Col>
        <DisplayAttack
          damage={{ value: getMagicPower(summary), type: DamageType.Magic }}
        />
        <span> avec +20 de MM.</span>
      </Col>
    </Row>
  ),
}, {
  id: MagicScrollId.FrostBurst,
  name: "Rafale de givre",
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 3 },
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
  usageCost: 4,
  range: { min: 1, max: 3 },
  getDescription: (summary) => {
    const value = getMagicPower(summary) / 5;
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
  usageCost: 4,
  range: { min: 1, max: 3 },
  getDescription: (summary) => (
    <Row>
      <Col>Deplace la cible <Bold>vers une case vide adjacente.</Bold></Col>
    </Row>
  )
}, {
  id: MagicScrollId.MagicStealing,
  name: "Vol de magie",
  usageCost: 4,
  range: { min: 1, max: 3 },
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
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Endurance }]}
    />
  ),
}, {
  id: MagicScrollId.Devotion,
  name: "Dévotion",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Force }]}
    />
  ),
}, {
  id: MagicScrollId.Discipline,
  name: "Discipline",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Will }]}
    />
  ),
}, {
  id: MagicScrollId.Aegis,
  name: "Egide",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Aegis }]}
    />
  ),
}, {
  id: MagicScrollId.Exaltation,
  name: "Exaltation",
  usageCost: 4,
  range: { min: 0, max: 3 },
  reusable: true,
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
  usageCost: 4,
  range: { min: 0, max: 3 },
  getDescription: (summary) => (
    <span>Soigne <Bold>{getMagicPower(summary)} PV</Bold></span>
  )
}, {
  id: MagicScrollId.Instinct,
  name: "Instinct",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Hability }]}
    />
  ),
}, {
  id: MagicScrollId.Invisibility,
  name: "Invisibilité",
  usageCost: 4,
  range: { min: 0, max: 2 },
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
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Immunity }]}
    />
  ),
}, {
  id: MagicScrollId.Reflex,
  name: "Réflexes",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Vivacious }]}
    />
  ),
}, {
  id: MagicScrollId.Regeneration,
  name: "Régénération",
  usageCost: 4,
  range: { min: 0, max: 2 },
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Regeneration }]}
    />
  ),
}, {
  id: MagicScrollId.CrystalWall,
  name: "Mur de cristal",
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
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
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
  getDescription: () => (
    <>
      <Row>
        <Col>Génère <Bold>des ronces</Bold> (dure environ 48h).</Col>
      </Row>
      <Nav>
        <NavItem>Entre sur une <Bold>case adjacente</Bold> inflige <Bold><DisplayStatus status={Status.Poisoned} hasLabel /></Bold></NavItem>
        <NavItem><Bold>Arracher (1PA)</Bold> inflige <Bold>+4 <DisplayStatus status={Status.Poisoned} /></Bold></NavItem>
      </Nav>
      <DisplayTouch semiSuccess="Elément fragile (-1PA pour Détruire)." critical="Elément solide (+1PA pour Détruire)" />
    </>
  ),
}, {
  id: MagicScrollId.ForestSummon,
  name: "Invocation de la forêt",
  usageCost: 8,
  area: BoxType.Tree,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un arbre en un <Bold>Tréant</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Tréant - Invocation majeur</Bold>
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
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
            />
          </CardBody>
        </Card >
      </>
    )
  },
}, {
  id: MagicScrollId.RockSummon,
  name: "Invocation de la roche",
  usageCost: 8,
  area: BoxType.Rock,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un rocher en un <Bold>Golem de pierre</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Golem de pierre - Invocation majeur</Bold>
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
              <Col>PRE : <Bold>{Math.floor(1 * mag)}</Bold></Col>
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
  id: MagicScrollId.CrystalSummon,
  name: "Invocation du cristal",
  usageCost: 8,
  area: BoxType.CrystalWall,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col>Transforme un mur de cristal en un <Bold>Golem de cristal</Bold>.</Col>
        </Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Golem de cristal - Invocation majeur</Bold>
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
              <Col>PRE : <Bold>Math.floor({1 * mag}</Bold></Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{1 * mag}</Bold></Col>
            </Row>
            <Row>
              <Col>DM : <Bold>{1 * mag}</Bold></Col>
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
  id: MagicScrollId.FrostSummon,
  name: "Invocation du givre",
  usageCost: 8,
  area: BoxType.IceWall,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un mur de glace en un <Bold>Elementaire de glace</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Elementaire de glace - Invocation majeur</Bold>
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
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)}
            />
          </CardBody >
        </Card >
      </>
    )
  },
}, {
  id: MagicScrollId.SoulsAwakening,
  name: "Réveil des âmes",
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève un <Bold>Fantôme</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Fantôme - Invocation mineure</Bold>
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
              <Col>PRE : <Bold>{1 * mag}</Bold>  </Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{1 * mag}</Bold>   </Col>
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
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève une <Bold>Goule</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil de la Goule - Invocation mineure</Bold>
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
              <Col>PRE : <Bold>{1 * mag}</Bold></Col>
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
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève un <Bold>Squelette</Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du Squelette - Invocation mineure</Bold>
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
  usageCost: "(distance x 2)",
  range: { min: 1, max: 3 },
  getDescription: () => (
    <>
      <Row><Col>Se <Bold>téléporte</Bold> sur la case.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
},];

export { magicScrolls };