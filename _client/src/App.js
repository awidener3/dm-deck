import { Outlet } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import Header from 'components/Header/Header'
import Home from 'pages/Home/Home'
import Battle from 'pages/Battle/Battle'
import BattleSelect from 'pages/BattleSelect/BattleSelect'
import BattleBuilder from 'pages/BattleBuilder/BattleBuilder'
import CharacterBuilder from 'pages/CharacterBuilder/CharacterBuilder'
import MonsterBuilder from 'pages/MonsterBuilder/MonsterBuilder'
import Legal from 'pages/Legal'
import Login from 'pages/Login/Login'
import Signup from 'pages/Signup'
import Profile from 'pages/Profile/Profile'
import Collection from 'pages/BattleSelect/Collection'
import './styles/App.scss'

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  // execute the `authLink` middleware prior to making the request GraphQL
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* Controls all routes in the application */}
      <Router>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/battle-select" element={<BattleSelect />} />

            <Route path="/collection/:collectionId" element={<Collection />} />
            <Route path="/battle/:battleId" element={<Battle />} />

            <Route path="/battle-builder" element={<BattleBuilder />} />

            <Route path="/battle-builder/:battleId" element={<BattleBuilder />} />

            <Route path="/character-builder" element={<CharacterBuilder />} />

            <Route path="/monster-builder" element={<MonsterBuilder />} />

            <Route path="/legal" element={<Legal />} />

            <Route path="/login" element={<Login />} />

            <Route path="/me" element={<Profile />} />

            <Route path="/profile/:username" element={<Profile />} />

            <Route path="/signup" element={<Signup />} />

            {/* 404 route */}
            <Route
              path="/*"
              element={
                <main>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
          <Outlet />
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
