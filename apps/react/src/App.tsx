import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
          <RootRouter />
        </Suspense>
      </div>
    </HashRouter>
  </Provider>
);
