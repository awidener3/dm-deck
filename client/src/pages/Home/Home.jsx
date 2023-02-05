import Links from './Links'
import './home.scss'
import Loading from 'components/Loading/Loading'

const Home = () => {
  return (
    <>
      <figure className="splash-screen">
        <h1 className="splash-logo-text">
          DM
          <span className="splash-logo-subtext">Deck</span>
        </h1>
      </figure>

      <section className="home-content p-4 container">
        <h1>Welcome to DM Deck!</h1>
        <p>
          This app allows you, the dungeon master, to track your epic D&D Battles in a Trading Card Game style, like
          Pokemon or Magic! Create battles on the fly, or prepare ahead of time by saving your battles!
        </p>

        <Links />
      </section>
    </>
  )
}

export default Home
