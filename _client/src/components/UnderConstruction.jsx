import { Alert } from 'react-bootstrap'

const UnderConstruction = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading className="my-2 text-center">🚧 UNDER CONSTRUCTION 🚧</Alert.Heading>
      <p className="text-center m-0">The kobolds are still working here, updates coming soon!</p>
    </Alert>
  )
}

export default UnderConstruction
