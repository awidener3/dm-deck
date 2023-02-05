import { useState } from 'react'
import { ModalTitle, ModalBody, Button, FormSelect, FormLabel, FormGroup } from 'react-bootstrap'
import { rollDie } from 'utils/diceRolls'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FaDiceD20, FaCheck } from 'react-icons/fa'
import { RiHeartFill, RiShieldFill } from 'react-icons/ri'
import AbilityOption from './AbilityOption'
import Conditions from '../Monster/Conditions'
import './selectedMonster.scss'

const SelectedMonster = ({ monster, setSelectedMonster, battleOrder, setbattleOrder, handleCloseMonstersModal }) => {
  const [hpModifier, setHpModifier] = useState('')
  const [modifier, setModifier] = useState(0)
  const [condition, setCondition] = useState('')
  const [savingThrowResult, setSavingThrowResult] = useState(0)

  // Saving Throw
  const changeModifier = e => {
    let updatedModifier = getModifier(e.target.value)
    setModifier(updatedModifier)
  }

  const getModifier = ability => {
    return Math.floor((monster[`${ability}`] - 10) / 2)
  }

  const renderOptions = () => {
    const abilityArray = [
      ['STR', 'strength'],
      ['DEX', 'dexterity'],
      ['CON', 'constitution'],
      ['INT', 'intelligence'],
      ['WIS', 'wisdom'],
      ['CHA', 'charisma']
    ]

    return (
      <>
        {abilityArray.map((ability, index) => (
          <AbilityOption
            key={abilityArray[index][1]}
            monster={monster}
            short={abilityArray[index][0]}
            long={abilityArray[index][1]}
          />
        ))}
      </>
    )
  }

  const handleRollSavingThrow = () => {
    const d20 = rollDie(20)
    const result = d20 + Number(modifier)
    setSavingThrowResult(result)
  }

  const changeCondition = e => {
    setCondition(e.target.value)
  }

  const handleAddCondition = e => {
    const updatedArray = battleOrder.slice()
    updatedArray.forEach(item => {
      if (item.name === monster.name && !item.conditions.includes(condition)) {
        item.conditions.push(condition)
      }
    })
    setbattleOrder([...updatedArray])
  }

  const handleAddHp = () => {
    const updatedArray = battleOrder.slice()
    updatedArray.forEach(item => {
      if (item.name === monster.name) {
        item.hit_points = Number(item.hit_points) + Number(hpModifier)
      }
    })
    setbattleOrder([...updatedArray])
  }

  const handleSubtractHp = () => {
    const updatedArray = battleOrder.slice()
    updatedArray.forEach(item => {
      if (item.name === monster.name) {
        if (Number(item.hit_points) - Number(hpModifier) <= 0) {
          item.hit_points = 0
        } else {
          item.hit_points = Number(item.hit_points) - Number(hpModifier)
        }
      }
    })
    setbattleOrder([...updatedArray])
  }

  return (
    <>
      <ModalTitle className="text-center">
        <h1 className="m-1">{monster.name}</h1>
      </ModalTitle>

      <ModalBody>
        <section className="d-flex justify-content-around border-bottom py-2">
          <div className="hp-adjust-container d-flex flex-column">
            <Button variant="success" size="sm" onClick={handleAddHp}>
              Heal
            </Button>
            <input
              type="number"
              className="number-input"
              name="hitpoints"
              id="hitpoints"
              min={0}
              pattern="[0-9]*"
              placeholder="0"
              inputMode="numeric"
              value={hpModifier}
              onChange={e => setHpModifier(e.target.value)}
            />
            <Button variant="danger" size="sm" onClick={handleSubtractHp}>
              Damage
            </Button>
          </div>
          <div id="monster-stats" className="d-flex flex-column justify-content-center">
            <p>
              <RiHeartFill className="hp-icon" size="2.5rem" /> {monster.hit_points}
            </p>
            <p>
              <RiShieldFill className="ac-icon" size="2.5rem" /> {monster.armor_class}
            </p>
          </div>
        </section>

        <section className="d-flex justify-content-center my-2">
          {/* saving throws */}
          <FormGroup className="d-flex flex-column mx-1">
            <FormLabel>Saving Throws</FormLabel>
            <FormSelect name="saving-throws" onChange={changeModifier} id="saving-throws">
              <option value="">Select...</option>
              {renderOptions()}
            </FormSelect>
            <Button variant="outline" className="card-btn mt-2" onClick={handleRollSavingThrow}>
              Roll
            </Button>
            <div className="dice-input-wrapper">
              <FaDiceD20 className="input-icon" />
              <input
                type="number"
                className="dice-input mt-2"
                name="save"
                id="save"
                placeholder="0"
                value={savingThrowResult}
                readOnly
              />
            </div>
          </FormGroup>

          {/* conditions */}

          <FormGroup className="d-flex flex-column mx-1 flex-grow-1">
            <FormLabel>Conditions</FormLabel>
            <FormSelect name="conditions" id="conditions" onChange={changeCondition}>
              <option defaultValue="">Select...</option>
              <option value="blind">Blinded</option>
              <option value="charmed">Charmed</option>
              <option value="deafened">Defeaned</option>
              <option value="frightened">Frightened</option>
              <option value="grappled">Grappled</option>
              <option value="incapacitated">Incapacitated</option>
              <option value="invisible">Invisible</option>
              <option value="paralyzed">Paralyzed</option>
              <option value="petrified">Petrified</option>
              <option value="poisoned">Poisoned</option>
              <option value="prone">Prone</option>
              <option value="restrained">Restrained</option>
              <option value="stunned">Stunned</option>
              <option value="unconcious">Unconscious</option>
            </FormSelect>
            <Button variant="outline" className="card-btn mt-2" onClick={handleAddCondition}>
              Add
            </Button>
            <Conditions monster={monster} battleOrder={battleOrder} setbattleOrder={setbattleOrder} />
          </FormGroup>
        </section>

        {/* back/forward buttons */}
        <section className="d-flex justify-content-between mt-4 mx-3">
          <Button variant="outline" className="card-btn m-1" onClick={() => setSelectedMonster('')}>
            <IoMdArrowRoundBack size={'1.5rem'} />
          </Button>
          <Button
            variant="outline-success"
            className="m-1"
            onClick={() => {
              setSelectedMonster('')
              handleCloseMonstersModal()
            }}
          >
            <FaCheck size={'1.5rem'} />
          </Button>
        </section>
      </ModalBody>
    </>
  )
}

export default SelectedMonster
