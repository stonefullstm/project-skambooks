import { Route, Switch } from 'react-router-dom';
import './App.css';
import initialPage from './page/initialPage';
import skambooks from './page/skambooks';
import createUser from './page/createUser';
import searcheBooks from './page/searcheBooks';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ initialPage } />
        <Route exact path="/skambooks" component={ skambooks } />
        <Route exact path="/create-user" component={ createUser } />
        <Route exact path='/search' component={ searcheBooks } />
      </Switch>
    </div>
  );
}

export default App;
