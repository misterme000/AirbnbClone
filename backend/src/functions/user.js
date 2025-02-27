var admin = require('firebase-admin');

const userModel = require('../models/user');

module.exports = {
  verifyAccount: function (user, idToken) {
    return new Promise(function (resolve, reject) {
      if (user === undefined) {
        return reject({
          code: 401,
          success: false,
          message: "auth denied"
        });
      }
      //Place the user info that reached this point in a string into an object
      userJson = JSON.parse(user);
      console.log(idToken)

      //Check if the user token is valid, this will confirm the user is correctly logged in
      admin.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
          userModel.findOne({ googleId: userJson.uid }).then(function (user) {

            console.log(user)
            //Check if user exists
            if (!user) {

              //Create user and save it to the databse
              new userModel({
                name: userJson.displayName,
                picture: userJson.photoURL,
                email: userJson.email,
                googleId: userJson.uid
              }).save().then(function (error, user) {
                resolve({
                  code: 200,
                  success: true,
                  message: "auth confirmed: new user created",
                  user: user
                })
              })
            } else {
              resolve({
                code: 200,
                success: true,
                message: "auth confirmed: existing user",
                user: user
              })
            }
          })
        }).catch(function (error) {
          console.log(error)
          reject({
            code: 401,
            success: false,
            message: "auth denied",
            error: error
          })
        });
    });
  },
  list: () => new Promise((resolve, reject) => {
    userModel.find()
      .then(result => {
        console.log(result)
        resolve(result)
      })
      .catch(error => {
        reject(new Error(error))
      })
  }),
};
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "testabc-69058",
    "private_key_id": "6de00f1c1b4dd470b13f1555a048b17b3e39edcb",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCqGS/Ttp1FMoXn\nVu7nSvbTMd7beI3KuFkqmKazvO5pthdrRBS1bLy3SL3vJt6fCLPrPIFXl68xfN89\nSXEm6554Qihv7AgEh+F5CYlUhLgX8Yah7Xcp/I0C2wcZGTjfEaqYVqXCg/3tp5fq\nkb72LrbVCI2pE4sQ8f5CZbp1t17xgN8OJ+AvUagz4+sXrIAV4YyAmweEFSwqgt2p\nSbfPMZ02DZ4xW22eGvuR78kR5Ju6ROg2R2z2zM7vK6sef2qBiU2Mz6aOi2EFn9Vr\nETE5hndUASTWE8mgS3rjKIbKKZeCyTQAUHi7m4B7IdyyqO1RUjX7RVayAKHOrfxh\naSJbceFTAgMBAAECggEAAzAJ+umNr0nKmPLCnbgEbHcfSjVLUZ9nIGAQTlxTNXec\nSb4oCzGt+bCrH+ELw/w0REtz0Gc/I79yKY0Hn1HuvCnf5cpiaL9Tz40JCKScvz90\npUffd1HMd19maycory7UEnBxQSDFxfSMPsZGHLP0aNqfrlRM7goy7cidQsPRy4HL\nF5eY34ARhaKq+TTAv3nm/m3aBrRRACGFikJx+GJaVD5Y38fDnJpD5yXVaKAUDMwm\nw+nO0NGKY0r2+cppKAVqIOTkKFRNKfsv6fPP4ftR2JVlNv1q18+Q1R5MiXKU86/r\nBL3x1K6vtUg/ClXGnFfNs60b57J6EO2dvferQxQhnQKBgQDbU9AE/o3igESum7qq\nsjevNL8r5mkv//ZwRQyBwU6MJfpZkJ2tKRQDAAVE2NWDW/rldlaQmh/PQkOVVJ2/\njSinpoJjdPTVAkbk5iaFFH1ZYQ06gOgzpXJ76xwSafsh00LT0oAnx+WlcO8UCtCx\nJN5juuDZOrptv6jLY6NeE7up3wKBgQDGiidmptvOy7oRVBXVewMnHpcDI3RA/1PD\n58SvOoe5ovRcDQg47c8/JTMckSC9yr2T/BhzmByBmn2EEevkdrUsoIE4+rZwlDXF\nB7xUJ/snEjQNjGEnvJPeNJLDJlB9wj4A/g3Bn1uWv07kDHSlex84QLW69it30lxa\nhecjji/fDQKBgQChTAkOszobWiOomcR05m4HPu5c1a2D7GULeexRvJ0Mep2borwi\n7bPW5Pv6/tA/M7TXbekJnR9JqDzVpI4CokhEyzLW+9tWj78ddZjchA4PXk2BOe4K\nlWEVevmBHUngPWLHLuaq2tqridt5TN7fd/LJO1VCzGrwbWQwd81cUXzQ1wKBgQDF\nl2lvOFE6lncwF8dDF5IjtMYGUZq5tWLgbiHJYy8BCbS4iB/OyJ6h8ZvUqnszaDsU\ntKiBIrn8Io0Yi92BGsNlDriMxLgdguOgm/pKpx/F2tADS9rFeWCQnTITFma1QkQD\nKNT4BmlYtj0FqX/N0aNYkM5MrALG1Y0kam+Ha1MpYQKBgCMy53XD53hYFSKAKsiW\neHZLpPWTDCmfuPae3LOEETadltqGgOq6oaAslI9FT426PqOuaIDUOtwCccLemeDN\nPYwYw4QJ+nqbszUIc8UaFQny2cmvYukhIzNGN4D+gG83tBxzabfFa8kTvUguRIP/\nFsE+GCsxMqzTKawm/PKqkcCc\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qy8z5@testabc-69058.iam.gserviceaccount.com",
    "client_id": "107971775726753563080",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qy8z5%40testabc-69058.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  )
});