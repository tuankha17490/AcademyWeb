import UserRoute from "../API/modules/user/routes"
import BaseRoute from "../API/core/routes"
import ClassRoute from "../API/modules/class/routes"
import PostRoute from "../API/modules/post/routes"
import SubjectRoute from "../API/modules/subject/routes"

export default function(app) {
    app.use('/',BaseRoute)
    app.use('/user',UserRoute)
    app.use('/class',ClassRoute)
    app.use('/post',PostRoute)
    app.use('/subject',SubjectRoute)
}