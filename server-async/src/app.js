// Requerimientos de Modulos
import colors from 'colors'
import express  from 'express'
import morgan from 'morgan'
import dotenv from "dotenv"

import realizarensamblaje from './routes/carros.routes.js'

dotenv.config()


// Inicialización 
let app = express()

//Configuración del Puerto
app.set("port", process.env.PORT || 5000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes 

app.use("/realizar/ensamblaje", realizarensamblaje)


// Escuchando el servidor en el puerto + la Ruta directa + color de identificación 
app.listen(app.get("port"), () =>
  console.log(`Run server in http://localhost:${app.get("port")}`.bgBlue))
