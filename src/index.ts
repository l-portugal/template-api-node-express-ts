import dotenv from 'dotenv';

dotenv.config();
import Environment from './Config/Environment';

Environment.load(process.env);

import Server from './Config/Server';

const server = new Server();
server.start();