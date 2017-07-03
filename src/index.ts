
import { Bluebird } from 'quizar-domain';
require('mongoose').Promise = Bluebird;

export * from './entities';
export * from './repositories';
import { createConnection, Connection, ConnectionOptions } from 'mongoose';

export function createDbConnection(connectionString: string, options?: ConnectionOptions) {
    return createConnection(connectionString, options);
}
