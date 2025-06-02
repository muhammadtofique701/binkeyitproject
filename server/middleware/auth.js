import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken || request.headers?.authorization?.split(" ")[1];

        if (!token) {
            return response.status(401).json({
                message: "User have not Login",
                error: true,
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN); // Must come before using `decoded`

        if (!decoded) {
            return response.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }
        
        request.userId = decoded.id;



        next();
    } catch (error) {
        return response.status(401).json({
            message: "User have not Login",
            error: true,
            success: false
        });
    }
};

export default auth;
