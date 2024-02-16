"use strict";
const multer = require('multer');
const path = require('path');
const storadge = multer.diskStorage({
    destination: path.join(__dirname, '../../../frontend/src/assets/Products'),
    filename: (req, file, collBack) => {
        collBack(null, `Image${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});
module.exports = storadge;
