import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardGroup, DropdownList } from "../../components";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { magicScrolls } from "../../data/magicScrolls";
import { techniques } from "../../data/techniques";
import { selectEvolution, setTalent, TalentType } from "../evolution/evolutionSlice";
import { DisplayTalent } from "./DisplayTalent";
import { selectSummary } from "../summary/SummarySlice";
import { Talent } from "../../data/talents";

interface TalentProps extends Talent {
  type: TalentType;
}

function ChooseTalent({ index, talent, source, onChange }
    : Readonly<{ index: number, talent?: TalentProps, source: TalentProps[], onChange: (index: number, talent?: { id: number, type: TalentType }) => void }>) {
  return <DropdownList
    hasEmpty
    source={source}
    title="name"
    render={item => item && <><DisplayItemImage id={52} name={item.name} /><span>{item.name}</span></>}
    onChange={t => onChange(index, t && { id: t.id, type: t.type })}
    size="sm"
    value={talent}
    description="Aucun parchemin"
    search />;
}

function DisplayTalents() {
  const { talents, experience: { rank } } = useAppSelector(selectEvolution);
  const summary = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const onChange = (index: number, talent?: { id: number, type: TalentType }) => {
    dispatch(setTalent({ index, talent }));
  }

  const allTalents = useMemo(() => {
    return [
      ...techniques.map(t => ({ ...t, type: TalentType.Technique })),
      ...magicScrolls.map(t => ({ ...t, type: TalentType.MagicScroll }))
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
            title={<ChooseTalent index={index} talent={talent} source={allTalents} onChange={onChange} />}
            hideSubTitle={!talent}
            usageCost={talent?.usageCost && ((typeof talent.usageCost === "function" && talent.usageCost(summary)) || talent.usageCost as (number | string))}
            manaCost={talent?.manaCost}
            reusable={talent?.reusable}
            range={talent?.range && ((typeof talent?.range === "function" && talent.range(summary)) || talent.range as { min: number, max: number })}
            area={talent?.area}
            element={talent?.element}
            required={talent?.required}
            description={talent?.getDescription(summary)}
          />
        )
      })}
    </CardGroup>
  );
}

export function Talents() {
  return <DisplayTalents />
}