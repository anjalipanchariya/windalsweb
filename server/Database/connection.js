import mysql from 'mysql2'

const db = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    host: '127.0.0.1',
    password: 'ascyo@1234',
    database: 'windals'
})

export default db;