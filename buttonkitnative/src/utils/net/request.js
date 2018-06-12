import request from 'superagent';
import { AsyncStorage } from 'react-native';

export function get(url, query) {
  console.log("calling", url, query);
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('sessionToken', (err, token) => {
      request
        .get(url)
        .query(query || {})
        .set('Accept', 'application/json')
        .set('Bearer', `${token}`)
        .end(function (err, res) {
          console.log("got", res.body);
          resolve(res.body);
        });
    })
  })
}