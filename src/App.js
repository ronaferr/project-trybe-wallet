import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <section>
        <Switch>
          <Route path="/carteira" exact component={ Wallet } />
          <Route path="/" exact component={ Login } />
        </Switch>
      </section>
    );
  }
}

export default App;
