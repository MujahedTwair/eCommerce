import { roles } from "../../middleware/auth.js";

export const endPoints = {

    create: [roles.User],
    delete: [roles.User],
    clear: [roles.User],
    get: [roles.User]
}