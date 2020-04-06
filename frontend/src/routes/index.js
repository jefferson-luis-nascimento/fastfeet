import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SingIn';

import Dashboard from '~/pages/Dashboard';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route path="/deliverymen" component={Deliveryman} isPrivate />
      <Route path="/recipients" component={Recipient} isPrivate />
      <Route path="/problems" component={Problem} isPrivate />
    </Switch>
  );
}
