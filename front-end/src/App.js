import { Route, Switch } from 'react-router-dom';
import './App.css';
import initialPage from './page/initialPage';
import skambooks from './page/skambooks';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ initialPage } />
        <Route exact path="/skambooks" component={ skambooks } />
      </Switch>
    </div>
  );
}

export default App;
