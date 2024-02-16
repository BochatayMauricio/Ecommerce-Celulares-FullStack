"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
router.post('/', admin_1.newAdmin);
router.post('/login', user_1.loginUser);
exports.default = router;
