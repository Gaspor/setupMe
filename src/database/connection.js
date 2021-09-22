require('dotenv').config({ path: 'src/config/.env' });

async function connect() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://' + process.env.db_username + ':' + 
        process.env.db_password + '@' + 
        process.env.db_server + ':' + 
        process.env.db_port + '/' + 
        process.env.db_name + "?sslmode=require" 
    });

    const client = await pool.connect();
    client.release();

    global.connection = pool;
    return pool.connect();
}

module.exports = {connect};