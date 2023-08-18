import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { PlantaProvider } from './context/PlantaContext/plantaProvider';
import { FirebaseUserProvider } from './context/FirebaseUserContext/firebaseProvider';

function App() {
  return (
    <FirebaseUserProvider>
      <PlantaProvider>
        <RouterProvider router={router} />
      </PlantaProvider>
    </FirebaseUserProvider>
  );
}

export default App;
