import { UserProvider } from './context/UserContext/provider';
import { Router } from './routes';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
