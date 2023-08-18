import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { PlantaProvider } from './context/PlantaContext/plantaProvider';

function App() {
  return (
    <PlantaProvider>
      <RouterProvider router={router} />
    </PlantaProvider>
  );
}

export default App;
