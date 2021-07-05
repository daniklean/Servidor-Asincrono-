import colors from 'colors'
import carros from '../db.json'

class Realizar{
  static async realizarensamblaje(req, res) {
    try {
        let realizarensamblaje = () => {
            return new Promise((reso, reje) => {
                if (carros.length === 0) return reje('La lista predeterminada no tiene autos a ensamblar')
                else{
                    console.log('Iniciando Ensamblaje de Vehiculos'.bgCyan)
                }
                // Ensamblando partes de los carros
                let ensamblarParte = (parte, carro) => {
                    return new Promise((resolve) => {
                        let tiempoproceso = tiempoaleatorio()
                        setTimeout(function () {
                            let proceso = `Ensamblando carro ${carro.modelo}, nivel de emsamblado ${parte}: ${carro[parte]}, termino  en ${tiempoproceso  / 1000} segundos`.cyan
                                console.info(proceso)
                                resolve({
                                    proceso,
                                    tiempoproceso 
                                })
                        }, tiempoproceso)
                    })
                }
                //Ensamblando los carros 
                let EnsamblarCarro = (carro) => {
                    return new Promise((resolve) => {
                        let partes = Object.keys(carro)
                        console.info('Proceso de Ensamblaje de carro ' + carro.modelo)

                        let PromesadeParte = new Array()

                        partes.forEach(parte => {
                            PromesadeParte.push(ensamblarParte(parte, carro))
                        })

                        Promise.all(PromesadeParte)
                            .then(resultado => {
                                let EnsamblajePorCarro = 0
                                resultado.forEach(item => {
                                    EnsamblajePorCarro += item.tiempoproceso
                                })
                                let ensamblado = resultado.map(item => {
                                    return item.proceso
                                })
                                resolve({
                                    ensamblado: ensamblado,
                                    EnsamblajePorCarro: (EnsamblajePorCarro/ 1000)
                                })
                            })
                    })
                }
                // Función Matematica-Tiempo-Aleatorio de
                let tiempoaleatorio = () => {
                    return (Math.floor(Math.random() * 10) + 1) * 1000
                }
                
                let PromesadeCarro = new Array()

                carros.forEach(carro => {
                    PromesadeCarro.push(EnsamblarCarro(carro))
                })
          
                Promise.all(PromesadeCarro)
                .then(values => {
                    console.log(values)
                })
            res.end()
            reso()
        })
      }
      await realizarensamblaje()
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
}

export default Realizar