import { Form, FormGroup, FormText, FormControl, FormLabel, Table } from 'react-bootstrap'
import { getXp } from '../../utils/basicRuleCalculations'
import { Link } from 'react-router-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import './battleBuilder.scss'
import { useState } from 'react'

const CreateBattleForm = ({
  setBattleName,
  battleName,
  heroes,
  selectedHeroes,
  selectedNpcs,
  monsters,
  selectedMonsters,
  handleSelectHero,
  handleSelectMonster,
  handleSelectNpc,
  handleRemoveHero,
  handleRemoveNpc,
  handleRemoveMonster
}) => {
  const [monsterSearchInput, setMonsterSearchInput] = useState('')
  const [npcSearchInput, setNpcSearchInput] = useState('')
  const [heroTableVisible, setHeroTableVisible] = useState(false)
  const [npcTableVisible, setNpcTableVisible] = useState(false)
  const [monsterTableVisible, setMonsterTableVisible] = useState(false)

  const handleMonsterSearchChange = e => {
    setMonsterSearchInput(e.target.value)
  }

  const handleNpcSearchChange = e => {
    setNpcSearchInput(e.target.value)
  }

  const toggleTable = table => {
    switch (table) {
      case 'hero':
        heroTableVisible ? setHeroTableVisible(false) : setHeroTableVisible(true)
        break
      case 'npc':
        npcTableVisible ? setNpcTableVisible(false) : setNpcTableVisible(true)
        break
      case 'monster':
        monsterTableVisible ? setMonsterTableVisible(false) : setMonsterTableVisible(true)
        break
      default:
        break
    }
  }

  return (
    <section className="m-md-4 container">
      <Form className="battle-form">
        <FormGroup>
          <FormLabel>Encounter Name</FormLabel>
          <FormControl
            type="text"
            className="form-control battle-name-input"
            placeholder="Name your encounter..."
            maxLength={30}
            value={battleName}
            onChange={e => setBattleName(e.target.value)}
          />
          <FormText>25 characters max.</FormText>
        </FormGroup>
      </Form>

      <section className="table-header" onClick={() => toggleTable('hero')}>
        <FormLabel className="mt-2">{heroTableVisible ? <FaChevronUp /> : <FaChevronDown />} Hero Select</FormLabel>
        <Link to={'/character-builder'} className="add-character-btn btn btn-success">
          + Create New Character
        </Link>
      </section>

      {heroTableVisible && (
        <HeroTable
          heroes={heroes}
          selectedHeroes={selectedHeroes}
          handleSelectHero={handleSelectHero}
          handleRemoveHero={handleRemoveHero}
        />
      )}

      {/* NPC table */}
      <section className="table-header" onClick={() => toggleTable('npc')}>
        <FormLabel className="mt-2">
          {npcTableVisible ? <FaChevronUp /> : <FaChevronDown />} NPC Select (Optional)
        </FormLabel>
      </section>

      {npcTableVisible && (
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Search for an NPC"
            className="form-control monster-search-input"
            onChange={handleNpcSearchChange}
            value={npcSearchInput}
          />
          <NpcTable
            npcs={monsters}
            npcSearchInput={npcSearchInput}
            selectedNpcs={selectedNpcs}
            handleSelectNpc={handleSelectNpc}
            handleRemoveNpc={handleRemoveNpc}
          />
        </FormGroup>
      )}

      {/* Monsters */}
      <section className="table-header" onClick={() => toggleTable('monster')}>
        <FormLabel className="mt-2">
          {monsterTableVisible ? <FaChevronUp /> : <FaChevronDown />} Monster Select
        </FormLabel>
      </section>

      {monsterTableVisible && (
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Search for a monster"
            className="form-control monster-search-input"
            onChange={handleMonsterSearchChange}
            value={monsterSearchInput}
          />
          <MonsterTable
            monsters={monsters}
            selectedMonsters={selectedMonsters}
            monsterSearchInput={monsterSearchInput}
            handleSelectMonster={handleSelectMonster}
            handleRemoveMonster={handleRemoveMonster}
          />
        </FormGroup>
      )}
    </section>
  )
}

const HeroTable = ({ heroes, selectedHeroes, handleSelectHero, handleRemoveHero }) => {
  return (
    <Table className="table heroes">
      <thead>
        <tr>
          <th>Name</th>
          <th>Player</th>
          <th>Race / Class</th>
          <th>Level</th>
          <th>Add</th>
        </tr>
      </thead>

      {/* Map through heroes and add a row to the table */}
      <tbody>
        {heroes.map(hero => (
          <tr key={hero._id} className={selectedHeroes.some(h => h._id === hero._id) ? 'selected' : ''}>
            <td>{hero.character_name}</td>
            <td>{hero.player_name}</td>
            <td>
              {hero.race} / {hero.class}
            </td>
            <td>{hero.level}</td>
            <td>
              {!selectedHeroes.some(h => h._id === hero._id) ? (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm m-0"
                  onClick={() => handleSelectHero(hero._id)}
                >
                  ADD
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm m-0"
                  onClick={() => handleRemoveHero(hero)}
                >
                  DEL
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const NpcTable = ({ npcs, selectedNpcs, npcSearchInput, handleSelectNpc, handleRemoveNpc }) => {
  const filteredNpcs = npcs.filter(npc => {
    if (npcSearchInput === '') {
      return npc
    } else {
      return npc.name.toLowerCase().match(npcSearchInput.toLowerCase())
    }
  })

  return (
    <Table className="table monsters">
      <thead>
        <tr>
          <th>NPC</th>
          <th>Size / Type</th>
          <th>Source</th>
          <th>CR</th>
          <th>XP</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        {filteredNpcs.map(monster => (
          <tr key={monster._id}>
            <td>{monster.name}</td>
            <td>
              {monster.size} / {monster.type} {monster.subtype && `(${monster.subtype})`}
            </td>
            <td>{monster.source}</td>
            <td>{monster.challenge_rating}</td>
            <td>{getXp(monster)}</td>
            <td>
              {!selectedNpcs.some(m => m._id === monster._id) ? (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm m-0"
                  onClick={() => handleSelectNpc(monster)}
                >
                  ADD
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm m-0"
                  onClick={() => handleRemoveNpc(monster)}
                >
                  DEL
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const MonsterTable = ({ monsters, selectedMonsters, monsterSearchInput, handleSelectMonster, handleRemoveMonster }) => {
  const filteredMonsters = monsters.filter(monster => {
    if (monsterSearchInput === '') {
      return monster
    } else {
      return monster.name.toLowerCase().match(monsterSearchInput.toLowerCase())
    }
  })

  return (
    <Table className="table monsters">
      <thead>
        <tr>
          <th>Monster</th>
          <th>Size / Type</th>
          <th>Source</th>
          <th>CR</th>
          <th>XP</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        {filteredMonsters.map(monster => (
          <tr key={monster._id}>
            <td>{monster.name}</td>
            <td>
              {monster.size} / {monster.type} {monster.subtype && `(${monster.subtype})`}
            </td>
            <td>{monster.source}</td>
            <td>{monster.challenge_rating}</td>
            <td>{getXp(monster)}</td>
            <td>
              {!selectedMonsters.some(m => m._id === monster._id) ? (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm m-0"
                  onClick={() => handleSelectMonster(monster)}
                >
                  ADD
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm m-0"
                  onClick={() => handleRemoveMonster(monster)}
                >
                  DEL
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CreateBattleForm
