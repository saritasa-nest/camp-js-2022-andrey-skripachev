import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppLoadingSpinner } from './app/components/AppLoading';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import './theme';

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <div>

        <Suspense fallback={<AppLoadingSpinner />}>
          <RootRouter />
        </Suspense>
      </div>
    </HashRouter>
  </Provider>
);
