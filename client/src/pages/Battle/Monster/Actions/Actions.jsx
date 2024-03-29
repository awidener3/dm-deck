import { useState } from 'react'
import { GiPocketBow, GiBattleAxe, GiTwirlCenter, GiThrownSpear } from 'react-icons/gi'
import useSound from 'use-sound'
import diceSfx from 'assets/audio/dice-roll.mp3'
import MeleeRangeButtons from './MeleeRangeButtons'
import SpellButtons from './SpellButtons'

const Actions = ({ monster, handleRollDice, battleOrder, setbattleOrder }) => {
  // Dice roll sound effect
  const [playSfx] = useSound(diceSfx)

  const processActions = actions => {
    let newActions = []

    actions.forEach(action => {
      let newAction = {
        desc: action.desc,
        attack_bonus: action.attack_bonus
      }

      // Process name - checks to see if an actions name has brackets after (i.e. Recharge [5-6])
      if (action.name.match(/\(([^)]*)\)/)) {
        let extraInfo = action.name.match(/\(([^)]*)\)/)
        newAction.name = action.name.replace(extraInfo[0], '').trim()
        newAction.name_subtext = extraInfo[0]
      } else {
        newAction.name = action.name
      }

      // Process action type
      if (action.desc.includes('Melee or Ranged Weapon Attack')) {
        let strArr = action.desc.split(' ')
        newAction.attack_reach = strArr[strArr.indexOf('reach') + 1]
        newAction.attack_range = strArr[strArr.indexOf('range') + 1]
        newAction.attack_type = 'Melee or Ranged'
      } else if (action.desc.includes('Melee Weapon Attack')) {
        let strArr = action.desc.split(' ')
        newAction.attack_reach = strArr[strArr.indexOf('reach') + 1]
        newAction.attack_type = 'Melee'
      } else if (action.desc.includes('Ranged Weapon Attack')) {
        let strArr = action.desc.split(' ')
        newAction.attack_range = strArr[strArr.indexOf('range') + 1]
        newAction.attack_type = 'Ranged'
      } else if (action.damage_dice) {
        newAction.attack_type = 'Spell'
        let strArr = action.desc.split(' ')
        if (strArr.includes('DC'))
          newAction.saving_throw = `DC ${strArr[strArr.indexOf('DC') + 1]} ${strArr[strArr.indexOf('DC') + 2]
            .slice(0, 3)
            .toUpperCase()}`
      } else {
        newAction.attack_type = 'Info'
      }

      // Process damage and bonus damage dice
      if (action.damage_dice) {
        if (action.damage_dice.includes('+')) {
          let dice = action.damage_dice.split('+')
          const damageDice = dice[0].split('d')
          const bonusDice = dice[1].split('d')
          newAction.damage = {
            damage_dice_num: Number(damageDice[0]),
            damage_dice_sides: Number(damageDice[1]),
            damage_dice_bonus: action.damage_bonus,
            damage_dice_text: dice[0]
          }
          newAction.bonus_damage = {
            bonus_dice_num: Number(bonusDice[0]),
            bonus_dice_sides: Number(bonusDice[1]),
            bonus_dice_text: dice[1]
          }
        } else if (action.damage_dice) {
          const damageDice = action.damage_dice.split('d')
          newAction.damage = {
            damage_dice_num: Number(damageDice[0]),
            damage_dice_sides: Number(damageDice[1]),
            damage_dice_bonus: action.damage_bonus,
            damage_dice_text: action.damage_dice
          }
        }
      }

      // Add to actions array to be set as action state for the current monster
      newActions.push(newAction)
    })
    return newActions
  }

  const [actions] = useState(() => processActions(monster.actions))

  // Roll a d20 and add monsters attack bonus, if any
  const handleToHit = attack_bonus => {
    playSfx()
    handleRollDice(20, 1, attack_bonus)
  }

  // damage dice * dice num + damage bonus
  const handleDealDamage = ({ damage }) => {
    playSfx()
    handleRollDice(damage.damage_dice_sides, damage.damage_dice_num, damage.damage_dice_bonus)
  }

  const handleConditions = ({ action_target, condition }) => {
    // check if the target is self + isn't currently active
    if (action_target === 'self' && !monster.conditions.includes(condition)) {
      let updatedArray = battleOrder.map(creature => {
        if (creature.name === monster.name) {
          return {
            ...monster,
            conditions: [...monster.conditions, condition]
          }
        }
        return creature
      })
      setbattleOrder([...updatedArray])
    }
    // otherwise, select a creature to apply the effect to
  }

  return actions.map(action => (
    <section key={action.name} className="action">
      {action.attack_type === 'Info' ? (
        <p className="action-description">
          <span className="action-title">{action.name}</span>
          {'. '}
          {action.desc}
        </p>
      ) : (
        <>
          <div className="d-flex align-items-center m-0">
            <div className="d-flex alignt-items-center me-1">
              {action.attack_type === 'Melee' ? (
                <GiBattleAxe />
              ) : action.attack_type === 'Ranged' ? (
                <GiPocketBow className="ranged-icon me-1" />
              ) : action.attack_type === 'Melee or Ranged' ? (
                <GiThrownSpear />
              ) : (
                <GiTwirlCenter />
              )}{' '}
            </div>

            <div>
              <h4 className="action-title">{action.name}</h4>
              {action.name_subtext ? <p className="action-subtext">{action.name_subtext}</p> : null}
            </div>
          </div>

          <div>
            {action.attack_type === 'Melee' ||
            action.attack_type === 'Ranged' ||
            action.attack_type === 'Melee or Ranged' ? (
              <MeleeRangeButtons action={action} handleToHit={handleToHit} handleDealDamage={handleDealDamage} />
            ) : action.damage ? (
              <SpellButtons action={action} handleDealDamage={handleDealDamage} />
            ) : (
              <button
                id="addStatusBtn"
                className="action-btn btn btn-outline-secondary card-btn btn-sm ms-1"
                onClick={() => handleConditions(action)}
              >
                <GiTwirlCenter /> View Action
              </button>
            )}
          </div>
        </>
      )}
    </section>
  ))
}

export default Actions
