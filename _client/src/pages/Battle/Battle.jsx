import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Monster from './Monster/Monster'
import Hero from './Hero/Hero'
import InfoModal from './InfoModal'
import RollModal from './RollModal'
import MonstersModal from './MonstersModal/MonstersModal'
import InitiativeModal from './InitiativeModal'
import QuickView from './QuickView'
import { slideLeft, slideRight } from 'utils/slideAnimations'
import { rollDie } from 'utils/diceRolls'
import { QUERY_BATTLE } from 'utils/queries/battleQueries'
import { FaChevronLeft, FaChevronRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import '../../styles/App.scss'
import './battle.scss'
import Loading from 'components/Loading/Loading'

const Battle = () => {
  // Get ID from URL parameters (battle/:battleId)
  const { battleId } = useParams()

  // Get battle order (may be saved in localstorage)
  const [battleOrder, setbattleOrder] = useState(JSON.parse(window.localStorage.getItem(battleId)))
  const [battle, setBattle] = useState({})

  // Update battle state with battle query
  const { loading, error } = useQuery(QUERY_BATTLE, {
    variables: { battleId },
    onCompleted: data => setBattle(data.battle)
  })

  // Variables to control battle statistics
  const [index, setIndex] = useState(0)
  const [round, setRound] = useState(1)
  const [turn, setTurn] = useState(1)
  const [info, setInfo] = useState({})

  // Modal
  const [showRollModal, setShowRollModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showMonstersModal, setShowMonstersModal] = useState(false)
  const [showInitiativeModal, setShowInitiativeModal] = useState(true)
  const handleCloseRollModal = () => setShowRollModal(false)
  const handleCloseInfoModal = () => setShowInfoModal(false)
  const handleCloseMonstersModal = () => setShowMonstersModal(false)
  const handleCloseInitiativeModal = () => setShowInitiativeModal(false)
  const showMonsterModal = () => setShowMonstersModal(true)

  // Dice rolls
  const [rollModifier, setRollModifier] = useState(0)
  const [die, setDie] = useState(0)

  function handleRollDice(sides, num, bonus = 0) {
    let diceRoll = 0

    for (let i = 0; i < num; i++) {
      diceRoll += rollDie(sides)
    }

    setRollModifier(bonus)
    setDie(diceRoll)
    setShowRollModal(true)
  }

  function handleShowInfo(monster) {
    setInfo(monster)
    setShowInfoModal(true)
  }

  function handleSetHp(monster, value) {
    const updatedArray = battleOrder.slice()

    updatedArray.forEach(item => {
      if (item.name === monster.name) {
        item.hit_points = value
      }
    })

    setbattleOrder([...updatedArray])
  }

  function handlePointerEvent(e) {
    let isTouchEvent = e.type === 'touchstart' ? true : false
    let card = e.target.closest('.card')
    let offset = 0
    let initialX = isTouchEvent ? e.touches[0].clientX : e.clientX

    document.onmousemove = onPointerMove
    document.onmouseup = onPointerEnd
    document.ontouchmove = onPointerMove
    document.ontouchend = onPointerEnd

    function onPointerMove(e) {
      offset = (isTouchEvent ? e.touches[0].clientX : e.clientX) - initialX
      card.style.left = offset + 'px'

      if (offset <= -100) {
        slideRight(index, turn, round, battleOrder, setRound, setTurn, setIndex)
        if (index === battleOrder.length - 1) {
          card.style.left = 0
        } else {
          setTimeout(() => {
            card.style.left = 0
          }, 1000)
        }
        return
      }

      if (offset >= 100) {
        slideLeft(index, turn, round, battleOrder, setRound, setTurn, setIndex)
        if (index === 0) {
          card.style.left = 0
        } else {
          setTimeout(() => {
            card.style.left = 0
          }, 1000)
        }
        return
      }

      card.style.left = offset + 'px'
    }

    function onPointerEnd() {
      if (offset < 0 && offset > -100) {
        card.style.left = 0
      }

      if (offset > 0 && offset < 100) {
        card.style.left = 0
      }

      document.onmousemove = null
      document.onmouseup = null
      document.ontouchmove = null
      document.ontouchend = null
    }
  }

  function renderCards(battleOrder) {
    return battleOrder.map((creature, i) => {
      // Check position to apply slider classes
      let position = i > index ? 'nextCard' : i === index ? 'activeCard' : 'prevCard'

      // Determine creature type
      if (creature.type !== 'hero') {
        return (
          <Monster
            key={`${creature.name}-${i}`}
            monster={creature}
            battleOrder={battleOrder}
            cardStyle={position}
            handleRollDice={handleRollDice}
            handleShowInfo={handleShowInfo}
            showMonsterModal={showMonsterModal}
            handleSetHp={handleSetHp}
            setbattleOrder={setbattleOrder}
            handlePointerEvent={handlePointerEvent}
          />
        )
      } else if (creature.type === 'hero') {
        return (
          <Hero
            key={`${creature.character_name}-${i}`}
            hero={creature}
            cardStyle={position}
            showMonsterModal={showMonsterModal}
            handlePointerEvent={handlePointerEvent}
          />
        )
      } else {
        return null
      }
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return `Error! ${error}`
  }

  return (
    <section className="battle-container container">
      {battleOrder && (
        <>
          <QuickView battleOrder={battleOrder} turn={turn} setTurn={setTurn} setIndex={setIndex} />

          <section className="battle-stats">
            <h4 className="battle-stat">
              Round: {round} Turn: {turn}/{battleOrder.length}
            </h4>
          </section>
        </>
      )}

      <section className="card-field">
        {/* Render left Chevron */}
        {round === 1 && turn === 1 ? null : turn === 1 ? (
          <FaChevronCircleLeft
            onClick={() => slideLeft(index, turn, round, battleOrder, setRound, setTurn, setIndex)}
            className="battle-chevron left-chevron"
          />
        ) : (
          <FaChevronLeft
            onClick={() => slideLeft(index, turn, round, battleOrder, setRound, setTurn, setIndex)}
            className="battle-chevron left-chevron"
          />
        )}

        {/* Cards */}
        <section className="card-container container">
          <div className="background-block"></div>
          {battleOrder && renderCards(battleOrder)}
        </section>

        {/* Render right Chevron */}
        {battleOrder && turn === battleOrder.length ? (
          <FaChevronCircleRight
            onClick={() => slideRight(index, turn, round, battleOrder, setRound, setTurn, setIndex)}
            className="battle-chevron right-chevron"
          />
        ) : (
          <FaChevronRight
            onClick={() => slideRight(index, turn, round, battleOrder, setRound, setTurn, setIndex)}
            className="battle-chevron right-chevron"
          />
        )}
      </section>

      {!battleOrder && (
        <InitiativeModal
          showInitiativeModal={showInitiativeModal}
          handleCloseInitiativeModal={handleCloseInitiativeModal}
          battle={!loading && battle}
          setBattle={setBattle}
          setbattleOrder={setbattleOrder}
        />
      )}

      <RollModal
        showRollModal={showRollModal}
        handleCloseRollModal={handleCloseRollModal}
        die={die}
        rollModifier={rollModifier}
      />

      <InfoModal info={info} showInfoModal={showInfoModal} handleCloseInfoModal={handleCloseInfoModal} />

      <MonstersModal
        showMonstersModal={showMonstersModal}
        handleCloseMonstersModal={handleCloseMonstersModal}
        battleOrder={battleOrder}
        setbattleOrder={setbattleOrder}
      />
    </section>
  )
}

export default Battle
