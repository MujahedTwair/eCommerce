import multer from "multer"
export const fileValidation = {
    image: ['image/png', 'image/jpeg', 'image/webp'],
    pdf: ['application/pdf'],
    excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

}
function fileUpload(customValidation = []) {
    try {
        const storage = multer.diskStorage({});
        function fileFilter(req, file, cb) {
            if (customValidation.includes(file.mimetype)) {
                cb(null, true);
            } else {
                // cb('Invalid file format', false);
                return req.next(new Error('Invalid file format', { cause: 403 }));
            }
        }
        const upload = multer({ fileFilter, storage });
        return upload;
        
    } catch (error) {
        return ;
    }
}
export default fileUpload;