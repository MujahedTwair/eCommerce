import XLSX from "xlsx";
import userModel from "../../../DB/model/user.model.js"

export const getProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user.id);
    return res.json({ message: "success", user });
}

export const uploadUsersExcel = async (req, res, next) => {
    const workBook = XLSX.readFile(req.file.path);
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const users = XLSX.utils.sheet_to_json(workSheet);
    if (!await userModel.insertMany(users)) {
        return next(new Error("Couldn't insert", { cause: 400 }));
    }
    return res.status(201).json({ message: "success", users });
}