var jwt = require('jsonwebtoken');

export default function(deviceId, secretKey) {
    return jwt.sign({ deviceId: deviceId }, secretKey);
}
