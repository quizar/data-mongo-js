
export * from './entities';
export * from './repositories';
import { createConnection, Connection, ConnectionOptions } from 'mongoose';

export function createDbConnection(connectionString: string, options?: ConnectionOptions) {
    return createConnection(connectionString, options);
}
