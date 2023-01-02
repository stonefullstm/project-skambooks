import { Route, Switch } from 'react-router-dom';
import './App.css';
import initialPage from './page/initialPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ initialPage } />
      </Switch>
    </div>
  );
}

export default App;
