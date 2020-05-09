import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import styles from './App.scss';
import Index from '../Index';

class App extends Component {
  constructor(props) {
    super();

    this.props = props;
  }

  static propTypes = {};

  render() {
    const basePath = this.props.basePath || '/';

    return (
      <Switch>
        <Route exact path={basePath} component={Index} />
      </Switch>
    );
  }
}

export default App;
