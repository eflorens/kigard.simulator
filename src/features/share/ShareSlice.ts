import { createSelector } from "@reduxjs/toolkit";
import { Improvements, selectEvolution } from "../evolution/evolutionSlice";
import { Inventory, OneItemPerHand, selectInventory, ShareInventory } from "../inventory/inventorySlice";
import { BreedId } from "../../data/character";
import { Item, Weapon } from "../../data/inventory";

export interface Simulator {
  breed: BreedId,
  improvements: Improvements,
  inventory: ShareInventory,
}

export const selectShare = createSelector([selectEvolution, selectInventory], ({ breed, experience }, inventory) => {

  const share = ({ enchantment, item, settings }: Inventory<Item | Weapon>) => {
    if (!item) {
      return undefined;
    }

    return {
      id: item.id,
      enchantmentId: enchantment?.id,
      settingsId: [settings?.first?.id, settings?.second?.id].filter(s => !!s) as number[],
    };
  }

  const leftHand = (inventory.hands as OneItemPerHand)?.leftHand;
  const rightHand = (inventory.hands as OneItemPerHand)?.rightHand;
  const hands = !leftHand && !rightHand ? inventory.hands as Inventory<Weapon> : undefined;

  const simulator: Simulator = {
    breed: breed,
    improvements: {
      strength: experience.strength.improvements,
      dexterity: experience.dexterity.improvements,
      intelligence: experience.intelligence.improvements,
      constitution: experience.constitution.improvements,
      mind: experience.mind.improvements,
      charisma: experience.charisma.improvements,
      accuracy: experience.accuracy.improvements,
      dodge: experience.dodge.improvements,
      magicAttack: experience.magicAttack.improvements,
      magicDefense: experience.magicDefense.improvements,
      observation: experience.observation.improvements,
      discretion: experience.discretion.improvements,
    },
    inventory: {
      head: (inventory.head?.item && share(inventory.head)) || undefined,
      hands: (hands?.item && share(hands)) || undefined,
      leftHand: (leftHand?.item && share(leftHand)) || undefined,
      rightHand: (rightHand?.item && share(rightHand)) || undefined,
      bust: (inventory?.bust && share(inventory.bust)) || undefined,
      feet: (inventory?.feet && share(inventory.feet)) || undefined,
      fetish: (inventory?.fetish && share(inventory.fetish)) || undefined,
      magicScrolls: {
        rightHand: Object.entries(inventory?.magicScrolls.rightHand)
          .map((scroll) => scroll[1]?.id)
          .filter(scroll => !!scroll),
        leftHand: Object.entries(inventory?.magicScrolls.leftHand)
          .map((scroll) => scroll[1]?.id)
          .filter(scroll => !!scroll),
      }
    }
  };

  console.log(simulator);

  return simulator;
});