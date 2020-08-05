
/*
!!!NOTE!!!
This method is for formating Form Field errors. Only FORM field errors.
normal errors like something went wrong, are not connected to a field. So, the can be returned normally in the controller.
But, field errors needs to be fromatted in way the frontend can catch and display under the certain form field.
So, use this for returning field errors.
*/
function formatAPIErrorResponse(key, error, message){
    if(!key){
        return {
            message: message,
            error: error
        }
    }else{
        return {
            errors: [
                {
                    key: key,
                    message: message
                }
            ]
        }
    }

}

module.exports = {
    formatAPIErrorResponse: formatAPIErrorResponse
}