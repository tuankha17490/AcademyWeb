import UserRoute from "../API/modules/user/routes"
import BaseRoute from "../API/core/routes"
import ClassRoute from "../API/modules/class/routes"
export default function(app) {
    app.use('/',BaseRoute)
    app.use('/user',UserRoute)
    app.use('/class',ClassRoute)
}