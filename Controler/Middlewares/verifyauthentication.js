const jwt=require('jsonwebtoken')
const verifyAuthentication= (req,res,next)=>{
    // const authHeader=req.headers.authorization;
    const authHeader=req.headers['authorization'];
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY,(error,user)=>{
            if(error){
                return res.status(403).json({ message: 'Token is not valid!' });
            }
            req.user = user; 
           
        })
        next();
    }else {
        return res.status(401).json({ message: 'Authentication token is required!' });
      }
};

module.exports=verifyAuthentication;
