import { BrowserRouter as Router } from 'react-router-dom';
import RouteHandler from './components/RouteComponent/Route';
import AuthInitializer from './components/AuthComponent/Auth';

function App() {
  return (
    <Router>
      <AuthInitializer />
      <RouteHandler />
    </Router>
  );
}

export default App;