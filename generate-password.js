const bcrypt = require('bcryptjs');

const plaintextPassword = 'admin123'; // Cambia por la contraseña deseada

bcrypt.hash(plaintextPassword, 10, (err, hash) => {
    if (err) throw err;
    console.log('Contraseña encriptada:', hash);
});
