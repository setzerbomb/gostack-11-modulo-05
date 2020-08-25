import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/app/Dashboard';
import Repository from '../pages/app/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository/:repository+" exact component={Repository} />
  </Switch>
);

export default Routes;
