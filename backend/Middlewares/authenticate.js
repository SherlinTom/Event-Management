const jwt = require('jsonwebtoken')
exports.UserAuthenticate = (req,res,next) =>{
  
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    // const {token} = req.cookies;
    console.log("token",token);
    
    if(!token){
        return res.status(403).json({
            success: false,
            message: "Token is not found or invalid"
        });
    }
    try {
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("jwt token",verifyToken);
        
        req.id = verifyToken.id;
        req.role = verifyToken.role;
        
        next();

    } catch (error) {
         res.status(500).json({
            success: false,
            message:error.message
     } )
    }

}

exports.userAuthorize = (...roles) =>{

    return (req,res,next) => {
        const userRole = req.role;
        console.log("user role..",userRole);
        
        if(!roles.includes(userRole)){
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        next();
    }
}

exports.verifyOwnership = () => {
    return async (req, res, next) => {
        try {
            const user_id = req.id; 

            const event = await Event.findById(req.params.id);
            console.log("event",event);
            
            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "event not found",
                });
            }

            if (event.user_id.toString() !== user_id) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access",
                });
            }
            next(); 
        } catch (error) {
            console.error("Error in verifyOwnership:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };
};

exports.verifyUserAccess  = async(req,res,next) =>{
    try {
        const user_id = req.id; 

        // Find all events created by the user
        const events = await Event.find({ user_id: user_id }).select('_id');

        if (!events.length) {
            return res.status(403).json({
                success: false,
                message: "You don't have any events posted, so you cannot view events.",
            });
        }

        // Store the event IDs in the request object to use in the next middleware/controller
        req.userEventIDs = events.map(event => event._id.toString());

        next(); // Proceed to the next function
    } catch (error) {
        console.error("Error in verifyUserAccess:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}