import mysql from 'mysql2'

const db = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    host: '127.0.0.1',
    password: 'T#9758@qlph',
    database: 'windals'
})

export default db;