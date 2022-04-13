const swellServer = require("swell-node");
import { SWELL_STORE_ID, SWELL_PRIVATE_KEY } from './const'

swellServer.init(SWELL_STORE_ID, SWELL_PRIVATE_KEY);

export default swellServer;

