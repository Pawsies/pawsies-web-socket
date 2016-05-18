import parseAuthToken from './parseAuthToken';

export default function (ws, sm, jwtSecret) {

  console.log(ws.upgradeReq.url);

  Promise
    .resolve(parseAuthToken(ws.upgradeReq.url, jwtSecret))
    .then((token) => {

        console.log('Subscribe in: ', token.deviceId);
        sm.subscribe(token.deviceId, ws);

        ws.on('close', () => {
            sm.unsubscribe(token.deviceId, ws);
        });

        ws.on('message', (message, flag) => {

            console.log('message received:', message);

        });

    })
    .catch((err) => {

        console.error(err);

    });


}
