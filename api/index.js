(async () => {
    const database = require('../config/db');
 
    try {
        const resultado = await database.sync();
        console.log(resultado,'teste');
    } catch (error) {
        console.log(error);
    }
})();