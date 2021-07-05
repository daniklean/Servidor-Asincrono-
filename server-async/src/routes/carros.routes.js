import { Router } from "express"
import Realizar  from "../controllers/RealizarEnsamblaje.js"

let router =  Router()

router.get("/", Realizar.realizarensamblaje)

export default router 