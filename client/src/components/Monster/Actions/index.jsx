import React from "react";
import { GiPocketBow, GiBattleAxe, GiTwirlCenter } from "react-icons/gi";
import useSound from "use-sound";
import diceSfx from "../../../assets/audio/dice-roll.mp3";
import MeleeRangeButtons from "./MeleeRangeButtons";

const Actions = ({ monster, handleRollDice, sortedData, setSortedData }) => {
  const [playSfx] = useSound(diceSfx);

  // d20 + attack bonus
  const handleToHit = (attack_bonus) => {
    playSfx();
    handleRollDice(20, 1, attack_bonus);
  };

  // damage dice * dice num + damage bonus
  const handleDealDamage = (action) => {
    playSfx();
    let damage_dice = 0;
    let damage_dice_num = 0;

    if (action.damage_dice) {
      const dice = action.damage_dice.split("d");
      damage_dice = Number(dice[1]);
      damage_dice_num = Number(dice[0]);
    } else {
      damage_dice = 0;
      damage_dice_num = 0;
    }
    let damage_modifier = action.damage_bonus || 0;
    handleRollDice(damage_dice, damage_dice_num, damage_modifier);
  };

  const handleConditions = ({ action_target, condition }) => {
    // check if the target is self + isn't currently active
    if (action_target === "self" && !monster.conditions.includes(condition)) {
      let updatedArray = sortedData.map((creature) => {
        if (creature.name === monster.name) {
          return {
            ...monster,
            conditions: [...monster.conditions, condition],
          };
        }
        return creature;
      });
      setSortedData([...updatedArray]);
    }
    // otherwise, select a creature to apply the effect to
  };

  return monster.actions.map((action) => (
    <div
      key={action.name}
      className="d-flex justify-content-between align-items-center mb-2"
    >
      <p className="action-title m-0">
        {action.desc.startsWith("Melee") ? (
          <GiBattleAxe />
        ) : action.desc.startsWith("Ranged") ? (
          <GiPocketBow className="ranged-icon me-1" />
        ) : (
          <GiTwirlCenter />
        )}{" "}
        {action.name}
      </p>
      <div>
        {action.desc.startsWith("Melee") ||
        action.desc.startsWith("Ranged") ||
        action.damage_dice ? (
          <MeleeRangeButtons
            action={action}
            handleToHit={handleToHit}
            handleDealDamage={handleDealDamage}
          />
        ) : (
          <button
            id="addStatusBtn"
            className="action-btn btn btn-outline-secondary btn-sm ms-1"
            onClick={() => handleConditions(action)}
          >
            <GiTwirlCenter /> Add Status
          </button>
        )}
      </div>
    </div>
  ));
};

export default Actions;
