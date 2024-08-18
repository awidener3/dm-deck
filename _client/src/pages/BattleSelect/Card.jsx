import { Link, useNavigate } from 'react-router-dom'
import { RiSwordFill, RiEditLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
import Summary from './Summary'

const Card = ({ battle, startDrag = null, handleDeleteBattle, draggable }) => {
  let navigate = useNavigate()

  const handleClick = () => {
    navigate(`/battle/${battle._id}`)
  }

  return (
    <figure
      key={battle._id}
      className="p-2"
      draggable={draggable}
      onDragStart={(e) => startDrag(e, battle._id)}
    >
      <section className="card battle-card">
        <div className="card-content" onClick={handleClick}>
          <h2 className="battle-card-title">{battle.name}</h2>

          {/* Stats about the battle (i.e. Difficulty, Total XP) */}
          <div className="card-body">
            <Summary battle={battle} />

            <p className="roster">
              Heroes: {battle.heroes.map((h) => h.character_name).join(', ')}
            </p>

            {battle.npcs.length > 0 && (
              <p className="roster">
                NPCs: {battle.npcs.map((n) => n.name).join(', ')}
              </p>
            )}

            <p className="roster">
              Monsters: {battle.monsters.map((m) => m.name).join(', ')}
            </p>

            {/* <div className="creature-container">
							<CreatureList type={'heroes'} />
							<CreatureList type={'monsters'} />
						</div> */}
          </div>
        </div>

        {/* Buttons */}
        <section className="button-container mt-auto d-flex justify-content-between">
          <button
            className="card-btn btn btn-outline-danger m-1"
            title="Delete Battle"
            onClick={() => handleDeleteBattle(battle)}
          >
            <FiTrash2 size={20} />
          </button>
          <Link
            className="card-btn btn btn-outline-secondary m-1"
            title="Edit Card"
            to={`/battle-builder/${battle._id}`}
          >
            <RiEditLine size={20} />
          </Link>
          <Link
            className="card-btn btn btn-outline-primary m-1"
            title="Start Battle"
            to={`/battle/${battle._id}`}
          >
            <RiSwordFill size={20} />
          </Link>
        </section>
      </section>
    </figure>
  )
}

export default Card
