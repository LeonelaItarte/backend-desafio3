const fs = require('fs');

class ProductManager {

    constructor(nombreArchivo) {

        this.nombreArchivo = nombreArchivo;
        
    }

    async save(obj) {

        try {

            if (!fs.existsSync(this.nombreArchivo)) {
                await fs.promises.writeFile(this.nombreArchivo, '[]')
            };


            const data = JSON.parse(await fs.promises.readFile(this.nombreArchivo));


            if (data.length == 0) {
                obj.id = 1
            } else {
                obj.id = data[data.length - 1].id + 1;
            }

            data.push(obj);

            const contenido = JSON.stringify(data, null, '\t');

            await fs.promises.writeFile(this.nombreArchivo, contenido)

            console.log('funcion save')

            console.log(contenido)




        }
        catch (e) {
            console.log(e)
        }



    }

    async getById(id) {

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo))

            let contenido1 = contenido.filter((elemento) => { return elemento.id == id })

            console.log(contenido1);


        }
        catch (e) {
            console.log(e)
        }

    }

    async getAll() {

        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido = JSON.parse(data);
           
            return contenido;
        }


        catch (e) {
            console.log(e)
        }


    }

    async deleteById(id) {

        try {

            const contenido = this.getAll()

            let contenido1 = contenido.filter((elemento) => { return elemento.id !== id })

            const contenidoFinal = JSON.stringify(contenido1, null, '\t');

            fs.writeFile(this.nombreArchivo, contenidoFinal, error => {
                if (error) {
                    console.log('hubo un error')
                } else {
                    console.log('deleteById guardado')
                }
            })

        }


        catch (e) {
            console.log(e)
        }

    }



    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, '')
            console.log('guardado deleteAll')
        }
        catch (error) {
            console.log(error)
        }
    }



}


module.exports = ProductManager