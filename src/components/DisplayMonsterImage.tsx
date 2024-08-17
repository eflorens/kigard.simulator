
function DisplayMonsterImage({ id, name }: Readonly<{ id: number; name: string; }>) {
  return <img src={`https://tournoi.kigard.fr/images/vue/monstre/${id}.gif`} alt={name} />;
}

export function Treant({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={29} name="Tréant" />
      {hasLabel && <span className="ms-1">Tréant</span>}
    </span>
  )
}

export function StoneGolem({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={16} name="Golem de pierre" />
      {hasLabel && <span className="ms-1">Golem de pierre</span>}
    </span>
  )
}

export function IceElemental({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={63} name="Elémentaire de glace" />
      {hasLabel && <span className="ms-1">Elémentaire de glace</span>}
    </span>
  )
}

export function CrystalGuardian({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={89} name="Gardien de cristal" />
      {hasLabel && <span className="ms-1">Gardien de cristal</span>}
    </span>
  )
}

export function Ghost({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={72} name="Fantôme" />
      {hasLabel && <span className="ms-1">Fantôme</span>}
    </span>
  )
}

export function Ghoul({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={77} name="Goule" />
      {hasLabel && <span className="ms-1">Goule</span>}
    </span>
  )
}

export function Skeleton({ hasLabel }: Readonly<{ hasLabel?: boolean }>) {
  return (
    <span>
      <DisplayMonsterImage id={19} name="Squelette" />
      {hasLabel && <span className="ms-1">Squelette</span>}
    </span>
  )
}
