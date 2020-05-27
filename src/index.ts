import Shizuka from './Shizuka';
//@ts-ignore
let configuration = require('../config.json');

Shizuka(configuration.secretData.token, configuration.config);

delete configuration.secretData;