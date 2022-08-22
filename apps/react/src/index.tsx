import ReactDOM from 'react-dom/client';
import '@js-camp/theme/src/index.css';

import { App } from './App';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <App />,
);
