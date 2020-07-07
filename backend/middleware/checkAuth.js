const jwt = require('jsonwebtoken');
//read about jsonwebtoken https://www.geeksforgeeks.org/json-web-token-jwt/
module.exports = (req, res, next) => {
  try {
    let token;
    // console.log(req.headers.authorization);
    // console.log(req.body['headers']);
    if(!req.headers.authorization){
      token=req.body['headers']['Authorization'].split(" ")[1];
    }
    else{
      token = req.headers.authorization.split(" ")[1];
    }
    //jwt.verify is Synchronous If a callback is not supplied, function acts synchronously.
    //Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
    const decoded = jwt.verify(token, 'my_secret_key');
    req.userData = decoded;
    // console.log("============>",req.headers);
    next();
  } catch (error) {
    console.log("Authentication failed==>",error);
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}
