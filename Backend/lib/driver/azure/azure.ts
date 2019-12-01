import Bluebird from 'bluebird';
// import { Pool } from 'pg';
import { DatabaseError, DatabaseErrorType } from '../../error';
import sql from 'mssql';

// const config = {
//     host: '<your-db-server-name>.postgres.database.azure.com',
//     user: '<your-db-username>',
//     password: '<your-password>',
//     database: '<name-of-database>',
//     port: 5432,
//     ssl: true
// };

export const client = {
    user: 'rmbhadmin',
    password: 'Jizhou*Huang',
    database: 'Roommate',
    server: 'rmbhdw1.database.windows.net',
    options: {
        encrypt: true  
    } 
};

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

export async function runQuery<T>(query: string): Bluebird<T> {
    
        const result = await new sql.ConnectionPool(client).connect();
        const queryResult = await result.query`${query}`;
        console.info(queryResult);
        return queryResult.recordset;
   
}
