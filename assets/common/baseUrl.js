import {Platform} from 'react-native';

let baseURL = '';
console.log('Platform', Platform.OS);
{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.43.166:4000/api/v1/')
    // ? (baseURL = 'http://192.168.100.172:4000/api/v1/')
    : (baseURL = 'http://localhost:4000/api/v1/');
}

export default baseURL;
