// Please note that if you changed the user, database, or password in the database creation section you will need to update the respective line items below.

const Pool = require("pg").Pool;
const pool = new Pool({
    connectionString: 'postgres://dev:dev@localhost/websocket',
    ssl: {
        rejectUnauthorized: false
    }
});

const getMessages = (request, response) => {
    pool.query(
        "SELECT * FROM messages ORDER BY id DESC LIMIT 10",
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const createMessage = (request, response) => {
    const {
        text,
        username
    } = request.body;
    pool.query("INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at ", [text, username],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(results.rows);
        }
    );
};

module.exports = {
    getMessages,
    createMessage,
};