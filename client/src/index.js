import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './App';
import Home from './pages/Home';
import Battles from './pages/Battles';
import Battle from './pages/Battle';
import CreateBattle from './pages/CreateBattle';
import CreateCharacter from './pages/CreateCharacter';
import CreateMonster from './pages/CreateMonster';
import Legal from './pages/Legal';
import reportWebVitals from './reportWebVitals';
import BattleSelect from './components/BattleSelect';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="" element={<Home />} />
				<Route path="battles" element={<Battles />}>
					{/* Index route for showing battles */}
					<Route index element={<BattleSelect />} />
					{/* Unique ID for saved battles */}
					<Route path=":battleId" element={<Battle />} />
				</Route>
				<Route path="create-battle" element={<CreateBattle />} />
				<Route
					path="create-character"
					element={<CreateCharacter />}
				></Route>
				<Route
					path="create-monster"
					element={<CreateMonster />}
				></Route>
				<Route path="legal" element={<Legal />} />
				<Route
					path="*"
					element={
						<main>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Route>
		</Routes>
	</BrowserRouter>,
	// </React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
