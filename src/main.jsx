import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Index from './routes';
import BattleBuilder from './routes/battleBuilder';
import PartyBuilder from './routes/partyBuilder';
import BattleSelect from './routes/battleSelect';
import ErrorPage from './components/errorPage';
import MonsterBuilder from './routes/monsterBuilder';
import './index.less';
import BattleViewer from './routes/battleViewer';

// this is where routes are defined and combined with a react element
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            element: <BattleBuilder />,
            path:'build/battle',
          },
          {
            element: <PartyBuilder />,
            path:'build/party',
          },
          {
            element: <MonsterBuilder />,
            path: 'build/monster',
          },
          {
            element: <BattleSelect />,
            path: 'battles',
          },
          {
            element: <BattleViewer />, 
            path: 'battles/:battleId',
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
