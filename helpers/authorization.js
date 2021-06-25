const jwt = require('jsonwebtoken');
const tokenSecretKey = '!!@$%anGularAdmin@$%!!';
function  verifyToken(headerToken){
    let response;
    if (!headerToken) {
        response= { status :403,  success: false,  message: "Invalid request",  data: null };
    } else {
        const token = headerToken.split(' ');
        const getToken = jwt.verify(token[1], tokenSecretKey);
        if(getToken.user.role === "admin"){
            response= { status :200, success: true, message: "valid request", data: getToken.user};
        }else{
            response= { status :403,  success: false,  message: "Invalid request",  data: null };

        }
    }
    return response;
}

function  verifyTokenByUser(headerToken){
    let response;
    if (!headerToken) {
        response= { status :403,  success: false,  message: "Invalid request",  data: null };
    } else {
        const token = headerToken.split(' ');
        const getToken = jwt.verify(token[1], tokenSecretKey);
        if(getToken.user.role === "users"){
            response= { status :200, success: true, message: "valid request", data: getToken.user};
        }else{
            response= { status :403,  success: false,  message: "Invalid request",  data: null };

        }
    }
    return response;
}
module.exports = { verifyToken,verifyTokenByUser };