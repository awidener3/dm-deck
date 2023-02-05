import { RiHeartFill, RiShieldFill } from 'react-icons/ri'
import { FaSkull } from 'react-icons/fa'

const QuickView = ({ battleOrder, turn, setTurn, setIndex }) => {
  const getConditions = creature => {
    if (creature.conditions !== undefined && creature.conditions.length > 0) {
      return (
        <>
          {creature.conditions.map(condition => (
            <div key={condition} className={`condition-marker ${condition}`}></div>
          ))}
        </>
      )
    }
    return null
  }

  return (
    // Drawer
    <section className="monster-data">
      {battleOrder.map((creature, index) => (
        <div
          className={
            creature.hit_points === 0
              ? 'monster-data-card dead'
              : turn === index + 1
              ? 'monster-data-card current'
              : 'monster-data-card'
          }
          key={creature.name || creature.character_name}
          onClick={() => {
            setIndex(index)
            setTurn(index + 1)
          }}
        >
          {creature.hit_points === 0 && <FaSkull className="dead-icon" />}
          <div className="d-flex justify-content-center">
            <p className="d-flex align-items-center mb-0">
              <RiHeartFill className="hp-icon" /> {creature.hit_points}
            </p>
            <p className="d-flex align-items-center mb-0 ms-1">
              <RiShieldFill className="ac-icon" /> {creature.armor_class}
            </p>
          </div>
          <h5 className="m-0">{creature.name || creature.character_name}</h5>
          <div className="condition-markers">{getConditions(creature)}</div>
        </div>
      ))}
    </section>
  )
}

export default QuickView
