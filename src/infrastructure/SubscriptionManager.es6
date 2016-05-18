
export default class SubscriptionManager {

  constructor() {
    this._subscriptions = {};
  }

  subscribe(deviceId, ws) {

    console.log('subscribing device: %s', deviceId);

    let current = this._subscriptions[deviceId];

    if (!current) {
        this._subscriptions[deviceId] = ws;
    }

  }

  unsubscribe(deviceId, ws) {

    console.log('un-subscribing device: %s', deviceId);

    delete this._subscriptions[deviceId];

  }

  send(deviceId, payload) {

    console.log('sending message to %s with payload %s', deviceId, payload);

    if (this._subscriptions[deviceId]) {

        this._subscriptions[deviceId].send(JSON.stringify(payload));

    }

  }

}
