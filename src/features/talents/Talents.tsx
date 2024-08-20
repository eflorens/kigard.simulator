import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardGroup, DropdownList } from "../../components";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { allMagicScrolls } from "../../data/magicScrolls";
import { allTechniques } from "../../data/techniques";
import { selectEvolution, setTalent, TalentType } from "../evolution/evolutionSlice";
import { DisplayTalent } from "./DisplayTalent";
import { selectSummary } from "../summary/SummarySlice";
import { Talent } from "../../data/talents";

export function ChooseTalent<T extends Talent>({ index, description, talent, source, onChange }
    : Readonly<{ index: number, description: string, talent?: T, source: T[], onChange: (index: number, talent?: T) => void }>) {
  return <DropdownList
    hasEmpty
    source={source}
    title="name"
    render={item => item && <><DisplayItemImage id={52} name={item.name} /><span>{item.name}</span></>}
    onChange={t => onChange(index, t)}
    size="sm"
    value={talent}
    description={description}
    search />;
}

export function Talents() {
  const { talents, experience: { rank } } = useAppSelector(selectEvolution);
  const summary = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const onTalentChange = (index: number, talent?: Talent & { type: TalentType}) => {
    dispatch(setTalent({ index, talent }));
  }

  const allTalents = useMemo(() => {
    return [
      ...allTechniques.map(t => ({ ...t, type: TalentType.Technique })),
      ...allMagicScrolls.map(t => ({ ...t, type: TalentType.MagicScroll }))
    ];
  }, []);

  return (
    <CardGroup className="group-col-2">
      {Array.from({ length: rank + 1 }, (_, i) => i).map(index => {
        const talent = allTalents.find(t => talents[index] && t.id === talents[index].id && t.type === talents[index].type)
          || undefined;

        return (
          <DisplayTalent
            key={index}
            title={<ChooseTalent index={index} description="Choisir une technique" talent={talent} source={allTalents} onChange={onTalentChange} />}
            hideSubTitle={!talent}
            usageCost={talent?.usageCost && ((typeof talent.usageCost === "function" && talent.usageCost(summary)) || talent.usageCost as (number | string))}
            manaCost={talent?.manaCost}
            reusable={talent?.reusable}
            range={talent?.range && ((typeof talent?.range === "function" && talent.range(summary)) || talent.range as { min: number, max: number })}
            area={talent?.area}
            element={talent?.element}
            required={talent?.required}
            resume={talent?.resume && ((typeof talent.resume === "function" && talent.resume(summary)) || talent.resume as (React.ReactNode | string))}
            description={talent?.getDescription(summary)}
          />
        )
      })}
    </CardGroup>
  );
}