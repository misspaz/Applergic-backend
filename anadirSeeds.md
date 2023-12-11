Se recomienda iniciarlas solo una vez.

Esto nos creará una base de datos con un array que nosotros ya definamos.

se crea la carpeta 'seeds' dentro de la carpeta 'src'. el nombre sería 'xxxxxxx.seed.js'. El nombre es informativo, pero ayuda a localizar el contenido del seed.

Hay que iniciar el archivo desde el index.
    Ejemplo: "scripts"
                "restaurante-seed" : "node ./src/seeds/xxxxxx.seed.js"

Luego se usa el siguiente comando (basandonos en el ejemplo):
    npm run restaurante-seed


Dentro del xxxxxx.seed.js:
    const mongoose = require("mongoose");

    const Xxxxxx = require("<Ruta del archivo models>");

    const arrayXxxxxx = [
        {
            El array de lo que se quiere meter
        }
    ]

Luego le tenemos que decir que se conecte a la BD en la que trabajamos (MongoDb en el ejemplo):

    mongoose.connect("<url de la bd de mongodb>)
    .then(async ()=>{
        const allXxxxxx = await Xxxxxx.find();
        if (allXxxxxx.length > 0) {
            await Xxxxxx.collection.drop()
        }
    })
    .catch((error) => console.log("Error al borrar los restaurantes"))
    .then(async () => {
        const xxxxxxMap = arrayXxxxxx.map((xxxxxx) => new Xxxxxx(xxxxxx));
        await Xxxxxx.insertMany(xxxxxxMap);
        console.log("xxxxxx insertados correctamente");
    })
    .catch((error) => console.log("error insertando xxxxxxs", error));
    .finally(() => mongoose.disconnect());