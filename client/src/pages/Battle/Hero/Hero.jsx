import './hero.scss'

// Icons
import { BsShieldFill } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { GiPointySword } from 'react-icons/gi'

// Render AC icon with ac stat inside
const ArmorClassIcon = ({ ac }) => {
  return (
    <div className="icon-container m-2">
      <BsShieldFill className="ac-icon" />
      <h3 className="icon-value">{ac}</h3>
    </div>
  )
}

// Render HP icon with hp stat inside
const HealthIcon = ({ hp }) => {
  return (
    <div className="icon-container m-2">
      <BsHeartFill className="hp-icon" />
      <h3 className="icon-value">{hp}</h3>
    </div>
  )
}

const Hero = ({ hero, cardStyle, showMonsterModal, handleAddEffect, handlePointerEvent }) => {
  return (
    <article className={`wrapper ${cardStyle}`}>
      <div
        className="card hero-card m-3 d-flex flex-column justify-content-center align-items-center"
        onMouseDown={handlePointerEvent}
        onTouchStart={handlePointerEvent}
      >
        {/* AC + HP Icons */}
        <div className="hero-stats d-flex justify-content-between w-100">
          <ArmorClassIcon ac={hero.armor_class} />
          <HealthIcon hp={hero.hit_points} />
        </div>

        {/* PC INFO */}
        <div className="container text-center">
          <h1 className="hero-name m-0">{hero.character_name}</h1>
          <h2 className="player-name">{hero.player_name}</h2>
          <p>
            {hero.race} {hero.class}
          </p>
        </div>

        {/* ACTIONS + ABILITIES */}
        <div className="pt-2 d-flex flex-column">
          <button className="btn btn-outline-secondary card-btn mb-2" onClick={showMonsterModal}>
            <GiPointySword /> Character Actions
          </button>
        </div>

        {/* INITIATIVE */}
        <div className="initiative-div d-flex justify-content-center align-items-center mb-2">{hero.initiative}</div>
      </div>
    </article>
  )
}

export default Hero
