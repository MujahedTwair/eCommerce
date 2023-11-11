import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return res.status(400).json({ message: "Invalid authorization" });
        }
        const token = authorization.split(process.env.BEARERKEY)[1];
        const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid authorization" });
        }
        const user = await userModel.findById(decoded.id).select('userName role');
        if (!user) {
            return res.status(404).json({ message: "not register account" });
        }
        if (!accessRoles.includes(user.role)) {
            return res.status(404).json({ message: "not allowed to you" });
        }
        req.user = user;
        next();
    }
}
export default auth;