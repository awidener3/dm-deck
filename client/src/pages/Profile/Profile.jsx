import { Alert, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { QUERY_ME, QUERY_USER_CHARACTERS } from 'utils/queries/userQueries'
import { DELETE_CHARACTER } from 'utils/mutations/characterMutations'
import { REMOVE_USER } from 'utils/mutations/userMutations'
import { FiTrash2 } from 'react-icons/fi'
import { RiEditLine } from 'react-icons/ri'
import WarningModal from './WarningModal'
import { useState } from 'react'
import './profile.scss'
import Auth from 'utils/auth'
import { useEffect } from 'react'
import Loading from 'components/Loading/Loading'

const Profile = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState({})

  // Check if a user is logged in, and redirect to login page if they are not.
  useEffect(() => {
    if (!Auth.loggedIn() && !localStorage.getItem('guest_id')) {
      console.log('not logged in')
      navigate('/login')
    }
  })

  // Query user data
  const { loading: user_loading, error: user_error, data: user_data } = useQuery(QUERY_ME)

  // Query character data
  const {
    loading: characters_loading,
    error: characters_error,
    data: characters_data
  } = useQuery(QUERY_USER_CHARACTERS)

  // Delete character mutation
  const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
    refetchQueries: [{ query: QUERY_USER_CHARACTERS }, 'UserCharacters']
  })

  const [removeUser] = useMutation(REMOVE_USER)

  // Database Results
  const user = user_data?.me || []
  const characters = characters_data?.userCharacters || []

  // Modals
  const [showWarningModal, setShowWarningModal] = useState(false)
  const hideWarning = () => setShowWarningModal(false)

  /**
   * Deletes a users character by its ID
   * @function handleDeleteCharacter
   * @param {Object} character - Object containing a characters data
   */
  const handleDeleteCharacter = async character => {
    console.log(`Attempting to delete ${character.character_name}`)
    const characterId = character._id

    try {
      const { data } = await deleteCharacter({
        variables: { characterId }
      })
      console.log(`${character.character_name} was deleted!\n`, data)
      // Hide modal
      setShowWarningModal(false)
    } catch (err) {
      console.error('💥 Error deleting character\n', err)
    }
  }

  /**
   * Deletes a users account by their ID
   * @function handleDeleteAccount
   */
  const handleDeleteAccount = async () => {
    console.log(`Attempting to delete ${user.username}'s account`)
    const userId = user._id

    try {
      const { data } = await removeUser({
        variables: { userId }
      })
      console.log(`✅ Successfully deleted ${user.username}'s account\n`, data)
      navigate('/signup')
    } catch (err) {
      console.error('💥 Could not delete account!\n', err)
    }
  }

  // Loading/error handling
  if (user_loading || characters_loading) return <Loading />
  if (user_error || characters_error) return <div>ERROR!</div>

  return (
    <section className="p-4 d-flex flex-column justify-content-center align-items-center container">
      <h1>Welcome back, {user.username}!</h1>

      {/* Developer message */}
      <Alert variant="danger">
        <Alert.Heading className="my-2 text-center">🚧 UNDER CONSTRUCTION 🚧</Alert.Heading>
        <p className="m-0">
          The kobolds are still working here, but don't worry! You'll be seeing updates as soon as they are ready.
        </p>
      </Alert>

      {/* Character cards */}
      <section className="characters">
        <h2>Your Characters</h2>
        <Container className="character-table">
          <Row>
            <Col lg={6} md={7} xs={4} className="grid-header">
              {' '}
              Name
            </Col>
            <Col md={3} s={4} xs={4} className="grid-header">
              Race/Class
            </Col>
            <Col md="auto" xs={1} className="grid-header">
              Level
            </Col>
            <Col md={1} xs="auto"></Col>
          </Row>

          {/* Map through heroes and add a row to the table */}
          {characters.map(hero => (
            <Row key={hero._id} className="character-row mb-1 py-2 d-flex align-items-center">
              <Col xl={6} lg={6} md={7} xs={4} className="border-end">
                <h3 className="row-title">{hero.character_name} </h3>
                <p className="row-subtitle">{hero.player_name}</p>
              </Col>
              <Col md={3} s={4} xs={4} className="border-end">
                <p className="row-text">
                  {hero.race} {hero.class}
                </p>
              </Col>
              <Col lg={1} md="auto" xs={1}>
                <p className="text-center row-text">{hero.level}</p>
              </Col>
              <Col xs="auto" className="ms-auto">
                <Link
                  className="card-btn btn btn-outline-secondary m-1"
                  title="Edit character"
                  to={'/character-builder'}
                  state={hero} // send creature data to edit form
                >
                  <RiEditLine size={20} />
                </Link>
                <button
                  className="card-btn btn btn-outline-danger m-1"
                  title="Delete character"
                  onClick={() => {
                    setSelected(hero)
                    setShowWarningModal(true)
                  }}
                >
                  <FiTrash2 size={20} />
                </button>
              </Col>
            </Row>
          ))}

          <Row className="add-row mb-1 py-2 d-flex align-items-center text-center">
            <Link to={'/character-builder'}>+ Create New Character</Link>
          </Row>
        </Container>
      </section>

      {/* <section>
				<h2>Your Monsters</h2>
				<div className="d-flex flex-wrap justify-content-center">
					{user.monsters.map((monster) => (
						<Card
							key={monster._id}
							creature={monster}
							cardStyle={'monster'}
						/>
					))}
				</div>
			</section> */}

      {/* Character deletion */}
      <section className="danger-zone">
        <h2>Danger Zone!</h2>

        <div className="delete-account">
          <p>
            Are you sure that you want to delete your account? This will delete all decks, battles, and characters that
            you have made!
          </p>
          <Button variant="outline-danger" className="mx-auto delete-btn" onClick={handleDeleteAccount}>
            Yes, I would like to delete my account.
          </Button>
        </div>
      </section>

      {/* Hidden modal */}
      <WarningModal
        showWarning={showWarningModal}
        hideWarning={hideWarning}
        handleDelete={handleDeleteCharacter}
        thing={selected}
      />
    </section>
  )
}

/*<Card
    key={character._id}
    creature={character}
    cardStyle={character.type}
    setShowWarningModal={setShowWarningModal}
    setSelected={setSelected}
  />*/

export default Profile
