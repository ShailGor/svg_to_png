import { createServer } from 'http';
import app from './app';
import { sequelize } from './utils/dbConfig';
const { convert } = require('convert-svg-to-png');

const PORT = 3000;

const server = createServer(app);

sequelize.sync();
(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection has been established sucessfully..');

        server.listen(PORT, function () {
            console.log('Express listening on port ' + PORT);
        });
    } catch (error) {
        console.log('Unable to connect to the server');
    }
})();
