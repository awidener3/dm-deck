import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiDuplicate, BiEdit, BiSolidTrashAlt } from "react-icons/bi";
import Splash from '../components/splash'
import sampleBattles from '../../data/sample_data/sample_battles.json'
import packageJson from '../../package.json'

export default function BattleSelect() {
  const [battles, setBattles] = useState(sampleBattles)

  /**
   * Duplicates a battle, adding a `(#)` indicator at the end.
   * @param {Number} id battle id
   */
  const handleDuplicate = (id) => {
    const copy = JSON.parse(JSON.stringify(battles.find(battle => battle.id === id)))
    setBattles([...battles, {
      ...copy,
      id: crypto.randomUUID(),
      title: `${copy.title} copy`
    }])
  }

  const handleDelete = (id) => {
    // delete the battle from the datasource
    setBattles(battles.filter(battle => battle.id !== id))
  }
  const handleNewBattle = e => {
    setBattles([...battles, {
      version: packageJson.version,
      id: crypto.randomUUID(),
      title: 'This is a new battle woohoo',
      enemyCount: 0,
      enemies: []
    }])
  }

	return (
		<>
			<Splash heading={'Battle Select'} background={'bg-back-3'} />

      <section id="content">
        <table>
          <thead>
            <tr>
              <th scope="col" style={{width: 'auto'}}>Title</th>
              <th scope="col" style={{width: 'fit-content'}}># Enemies</th>
              <th scope="col" style={{width: 'fit-content'}}>Options</th>
            </tr>
          </thead>
          <tbody>
            {battles.map(battle => (
              <tr key={battle.id}>
                <td><Link to={`./${battle.id}`} relative='path'>{battle.title}</Link></td>
                <td>{battle.enemyCount || 0}</td>
                <td className="table-options">
                  <menu>
                    <li><button type="button"><BiEdit /></button></li>
                    <li><button type="button" onClick={() => handleDuplicate(battle.id)}><BiDuplicate /></button></li>
                    <li><button type="button" onClick={() => handleDelete(battle.id)}><BiSolidTrashAlt /></button></li>
                  </menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" onClick={() => handleNewBattle()}>New battle</button>
      </section>
		</>
	);
}
