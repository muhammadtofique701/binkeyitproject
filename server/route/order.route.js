import { Router} from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController } from '../controllers/order.Controller.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery',auth,CashOnDeliveryOrderController)


export default orderRouter