import './monster.scss'
import Conditions from './Conditions'
// import Circles from './Circles'
import Stats from './Stats'
import Actions from './Actions'
import BaseStats from './BaseStats'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaSkull } from 'react-icons/fa'
// import { GiConcentrationOrb } from 'react-icons/gi';
import AbilityScores from './AbilityScores'
import { Button } from 'react-bootstrap'

const Monster = props => {
  const monster = props.monster

  return (
    <section className={`wrapper ${props.cardStyle}`}>
      <article
        // Determines if a monster has 0 hit points
        className={monster.hit_points === 0 ? 'card monster-card m-3 dead' : 'card monster-card m-3'}
        onMouseDown={props.handlePointerEvent}
        onTouchStart={props.handlePointerEvent}
      >
        {/* 
          If a monster is dead, show a "Dead Screen", with a button that allows the user to revive the monster with 1 hp.
         */}
        {props.monster.hit_points === 0 && <DeadScreen monster={monster} handleSetHp={props.handleSetHp} />}

        <Conditions monster={monster} battleOrder={props.battleOrder} setbattleOrder={props.setbattleOrder} />
        {/* <Circles monster={monster} /> */}

        <section>
          <section className="monster-card-header mt-3">
            <h1 className="name">
              {monster.name}{' '}
              {/* {isConcentrating && (
                <GiConcentrationOrb
                  size={'1.5rem'}
                  title="concentrating"
                /> */}
            </h1>
          </section>

          <BaseStats monster={monster} />

          <AbilityScores monster={monster} />

          <Stats monster={monster} />

          {monster.special_abilities[0].name && <Traits monster={monster} />}
        </section>

        {/* ACTIONS */}
        <section className="actions-section dmd-card-row">
          <h2 className="actions-header">
            Actions{' '}
            <AiOutlineInfoCircle
              onClick={() => {
                props.handleShowInfo(monster)
              }}
            />
          </h2>

          <Actions
            monster={monster}
            handleRollDice={props.handleRollDice}
            battleOrder={props.battleOrder}
            setbattleOrder={props.setbattleOrder}
          />
        </section>

        {/* INITIATIVE */}
        <div className="initiative-div d-flex justify-content-center align-items-center mb-2">{monster.initiative}</div>
      </article>
    </section>
  )
}

const Traits = ({ monster }) => {
  return (
    <section className="dmd-card-traits">
      {monster.special_abilities &&
        monster.special_abilities.map(({ name, desc }) => (
          <section className="dmd-card-row py-1" key={name}>
            <p className="ability-text m-0">
              <span className="ability-title">{name}.</span> {desc}
            </p>
          </section>
        ))}
    </section>
  )
}

const DeadScreen = props => {
  return (
    <section className="dead-screen">
      <FaSkull className="dead-icon" />
      <Button variant="outline" className="card-btn reset-dead" onClick={() => props.handleSetHp(props.monster, 1)}>
        Revive
      </Button>
    </section>
  )
}

export default Monster
