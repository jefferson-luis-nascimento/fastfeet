import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SingIn';

import Dashboard from '~/pages/Dashboard';
import Delivery from '~/pages/Delivery';
import DeliveryRegister from '~/pages/Delivery/Register';
import Deliveryman from '~/pages/Deliveryman';
import DeliverymanRegister from '~/pages/Deliveryman/Register';
import Recipient from '~/pages/Recipient';
import RecipientRegister from '~/pages/Recipient/Register';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route
        path="/deliveries/register"
        exact
        component={DeliveryRegister}
        isPrivate
      />
      <Route
        path="/deliveries/register/:id"
        exact
        component={DeliveryRegister}
        isPrivate
      />
      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliverymen/register"
        exact
        component={DeliverymanRegister}
        isPrivate
      />
      <Route
        path="/deliverymen/register/:id"
        exact
        component={DeliverymanRegister}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route
        path="/recipients/register"
        exact
        component={RecipientRegister}
        isPrivate
      />
      <Route
        path="/recipients/register/:id"
        exact
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/problems" component={Problem} isPrivate />
    </Switch>
  );
}
