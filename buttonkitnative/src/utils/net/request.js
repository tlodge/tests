import request from 'superagent';
import { AsyncStorage } from 'react-native';

export function get(url, query) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('jwt', (err, token) => {
      request
        .get(url)
        .query(query || {})
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    })
  })
}