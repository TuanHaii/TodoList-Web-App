import { AppProviders } from './providers/AppProviders.tsx';
import { AppRouter } from './router/AppRouter.tsx';

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
