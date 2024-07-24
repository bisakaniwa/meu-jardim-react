import { AppRouter } from './routes';
import { PlantaProvider } from './context/PlantaContext/plantaProvider';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

function App() {

  return (
    <Provider store={store}>
      <PlantaProvider>
        <AppRouter />
      </PlantaProvider>
    </Provider>
  );
}

export default App;
