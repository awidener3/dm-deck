import { RiHeartFill, RiShieldFill } from 'react-icons/ri'
import { FaArrowCircleRight } from 'react-icons/fa'

const BaseStats = ({ monster, showMonsterModal }) => {
  return (
    <section className="dmd-card-row d-flex justify-content-between align-items-center pb-2 border-bottom">
      <div className="d-flex align-items-center" onClick={showMonsterModal}>
        <RiHeartFill className="dmd-card-icon hp-icon me-1" />
        <p className="stat-title m-0">
          HP{' '}
          <span>
            {monster.hit_points} ({monster.hit_dice})
          </span>
        </p>
      </div>
      <div className="d-flex align-items-center">
        <RiShieldFill className="dmd-card-icon ac-icon me-1" />
        <p className="stat-title m-0">
          AC <span>{monster.armor_class}</span>
        </p>
      </div>
      <div className="d-flex align-items-center">
        <FaArrowCircleRight className="dmd-card-icon speed-icon me-1" />
        <p
          title={`Walking: ${monster.speed.walk} ft., Flying: ${monster.speed.fly || 0} ft., Swimming: ${
            monster.speed.swim || monster.speed.walk / 2
          } ft.`}
          className="stat-title m-0"
        >
          SPD <span>{monster.speed.walk} ft.</span>
        </p>
      </div>
    </section>
  )
}

export default BaseStats
