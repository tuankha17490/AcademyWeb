export default (status, message, data = undefined) => {
    if(data == undefined)  {
        return {status,message}
    }
    return {
        status,
        message,
        data
    }
}