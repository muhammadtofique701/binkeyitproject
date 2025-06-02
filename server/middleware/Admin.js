import UserModel from "../models/user.model.js";

export const admin = async (request, response, next) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: "Unauthorized. User ID not found.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findById(userId);

        if (!user || user.role !== "ADMIN") {
            return response.status(403).json({
                message: "Permission denied. Admin access required.",
                error: true,
                success: false
            });
        }

        // If user is admin, allow request to continue
        next();

    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return response.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
};
