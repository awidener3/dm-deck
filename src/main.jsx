import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Index from './routes';
import BattleBuilder from './routes/battleBuilder';
import PartyBuilder from './routes/partyBuilder';
import BattleSelect from './routes/battleSelect';
import ErrorPage from './error-page';
import MonsterBuilder from './routes/monsterBuilder';
import './index.less';

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
            path:'build/battle',
            element: <BattleBuilder />
          },
          {
            path:'build/party',
            element: <PartyBuilder />
          },
          {
            path: 'build/monster',
            element: <MonsterBuilder />
          },
          {
            path: 'battles',
            element: <BattleSelect />
          },
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
