const { isNative } = require("lodash")

exports.handler = async function(event, context){
    return {
        statusCode : 200
        , body : JSON.stringify({
            name : 'JO'
            , age : 37
            , email : 'ehli@nate.com'
        })
    }
}