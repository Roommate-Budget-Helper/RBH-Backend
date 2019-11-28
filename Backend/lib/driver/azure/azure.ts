import mysql from 'mysql';
const pg = require('pg');
import Bluebird from 'bluebird';
import { Pool } from 'pg';
import { DatabaseError, DatabaseErrorType } from '../../error';

// const config = {
//     host: '<your-db-server-name>.postgres.database.azure.com',
//     user: '<your-db-username>',
//     password: '<your-password>',
//     database: '<name-of-database>',
//     port: 5432,
//     ssl: true
// };

export const client = new Pool({
    // host: '<your-db-server-name>.postgres.database.azure.com',
    // user: '<your-db-username>',
    // password: '<your-password>',
    // database: '<name-of-database>',
    // port: 5432,
    // ssl: true
});

// const client = new pg.Client(config);

// client.connect((err) => {
//     if (err) throw err;
//     else {
//         queryDatabase();
//     }
// });

// export async function queryDatabase() {
//     const query = `
//         DROP TABLE IF EXISTS inventory;
//         CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
//         INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
//         INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
//         INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
//     `;

//     client
//         .query(query)
//         .then(() => {
//             console.log('Table created successfully!');
//             client.end(console.log('Closed client connection'));
//         })
//         .catch((err) => console.log(err))
//         .then(() => {
//             console.log('Finished execution, exiting now');
//             process.exit();
//         });
// }

export async function runQuery<T>(pgPool: Pool, query: string): Bluebird<T> {
    try {
        const result = await pgPool.query(query);
        console.info(result);
        return result;
    } catch (error) {
        throw new DatabaseError(DatabaseErrorType.PostgresReadError, error.message);
    }
}
