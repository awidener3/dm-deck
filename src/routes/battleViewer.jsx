import { useParams } from 'react-router-dom'
import { act, useEffect, useState } from 'react'
import sampleBattles from '../../data/sample_data/sample_battles.json'
import srdMonsters from '../../data/srd_monsters.json'

const battleState = id => {
  const battles = JSON.parse(localStorage.getItem('battles'))

  if (battles.length) {
    const data = battles.find(battle => battle.id === id)

    return data || {}
  }
}

export default function BattleViewer() {
  let { battleId } = useParams()
  const [battle, setBattle] = useState([])
  const [enemies, setEnemies] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // get data
    const data = sampleBattles.find(battle => battle.id === battleId)

    if (data) {
      setBattle(data)

      if (data.enemies.length) {
        const enemies = []

        for (const enemy of data.enemies) {
          const enemyData = srdMonsters.monsters.find(data => data.id === enemy.id)
          if (enemyData) {
            const copy = JSON.parse(JSON.stringify(enemyData))
            copy.nickname = enemy.nickname
            copy.current_hit_points = enemy.current_hit_points

            enemies.push(copy)
          }
        }

        if (enemies.length) {
          setEnemies(enemies)
        }
      }
    }
  }, [setBattle, setEnemies])

  const handleChangeCard = amount => {
    let newIndex = index + amount
    if (newIndex < 0) {
      newIndex = enemies.length - 1
    }

    if (newIndex === enemies.length) {
      newIndex = 0
    }

    setIndex(newIndex)
  }

  return (
    <>
      <p>Battle viewer stuff goes here, this is "{battle.title}"</p>

      <p>
        {index + 1} / {enemies.length}
      </p>

      <section id="cardContent">{enemies.length && <Card data={enemies[index]} />}</section>

      <menu id="cardNavigation">
        <li>
          <button onClick={() => handleChangeCard(-1)}>Back</button>
        </li>
        <li>
          <button onClick={() => handleChangeCard(1)}>Next</button>
        </li>
      </menu>
    </>
  )
}

function Card({ data }) {
  const [cardData, setCardData] = useState(data)
  const stats = [
    { field: 'strength', name: 'STR' },
    { field: 'dexterity', name: 'DEX' },
    { field: 'constitution', name: 'CON' },
    { field: 'intelligence', name: 'INT' },
    { field: 'wisdom', name: 'WIS' },
    { field: 'charisma', name: 'CHA' }
  ]

  console.log(cardData)

  useEffect(() => {
    setCardData(data)
  }, [data, setCardData])

  const handleChange = e => {
    const { name, value } = e.target
    setCardData({ ...cardData, [name]: value })
  }
  const handleContentEditable = (name, value) => {
    setCardData({ ...cardData, [name]: value })
  }

  const getModifier = value => Math.floor((value - 10) / 2)
  const formatModifier = value => `(${value >= 0 ? '+' : ''}${value})`
  const getDamageBonus = value => {
    if (value >= 0) {
      return `+ ${value.toString()}`
    } else {
      const numWithoutMinus = value.toString().slice(1)
      return `- ${numWithoutMinus}`
    }
  }
  const rollDice = (numDice, diceMax, modifier) => {
    const dieRolls = []

    for (let i = 1; i <= numDice; i++) {
      dieRolls.push(Math.floor(Math.random() * diceMax) + 1)
    }

    const totalRoll = dieRolls.reduce((a, b) => a + b, 0)

    console.log(
      dieRolls.includes(20) ? '🌟' : '🎲',
      dieRolls,
      `${totalRoll} + (${modifier}) = `,
      totalRoll + modifier
    )
  }

  return (
    <article className="card">
      <header className="card-header">
        <span className="card-armor-class">{cardData.armor_class}</span>

        <h2
          contentEditable
          onInput={e => handleContentEditable('nickname', e.target.textContent)}
          name="nickname"
          suppressContentEditableWarning={true}>
          {data.nickname || data.name}
        </h2>

        <span className="card-hit-points">
          <input
            type="number"
            name="current_hit_points"
            id="current_hit_points"
            onChange={handleChange}
            min={0}
            value={cardData.current_hit_points}
          />
        </span>
      </header>

      <section className="card-section">
        <dl className="card-stats">
          {stats.map(stat => (
            <div key={stat.name}>
              <dt>{stat.name}</dt>
              <dd>
                <button
                  type="button"
                  onClick={() => rollDice(1, 20, getModifier(cardData[stat.field]))}>
                  {cardData[stat.field]} {formatModifier(getModifier(cardData[stat.field]))}
                </button>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card-section full">
        <fieldset>
          <legend>Actions</legend>

          <ul>
            {cardData.actions.map(action => (
              <li key={action.name} className="card-action">
                {action.name}{' '}
                <menu>
                  {action?.attack_bonus && (
                    <li>
                      <button
                        type="button"
                        onClick={() => rollDice(1, 20, action.attack_bonus || 0)}>
                        {getDamageBonus(action.attack_bonus)} to hit
                      </button>
                    </li>
                  )}
                  {action?.damage_dice && (
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          const numDice = Number(action.damage_dice.split('d')[0])
                          const diceType = Number(action.damage_dice.split('d')[1])

                          rollDice(numDice, diceType, action.damage_bonus || 0)
                        }}>
                        {action.damage_dice} {getDamageBonus(action.damage_bonus)}
                      </button>
                    </li>
                  )}
                </menu>
              </li>
            ))}
          </ul>
        </fieldset>
      </section>
    </article>
  )
}
