import jwt from 'jsonwebtoken';

export default function (url, jwtSecret) {

  let token = url.split("token=")[1];

  return new Promise(function(resolve, reject) {

    // jwt.verify(token, jwtSecret, function(err, decoded) {
    //
    //     if (err) reject('Error verifying token');
    //
    //     resolve (decoded);
    //
    // });

    resolve({ deviceId: token });

  });

}
