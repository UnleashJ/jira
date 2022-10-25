import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auto-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { BrowserRouter as Router } from "react-router-dom"
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <Router>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
