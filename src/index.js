import app from "./app.js";
import connection from "./setting/database.js";
import  "./setting/asociations.js";
async function main() {

    try{
        // await connection.authenticate();
        // console.log('Connection has been established successfully.');
        // await connection.sync({ force: true });
        app.listen(app.get('port'), () => {
            console.log(`Server on port ${app.get('port')}`);
        });
    }
    catch(error){
        console.error('Error connecting to database: ', error);
    }
}

main();