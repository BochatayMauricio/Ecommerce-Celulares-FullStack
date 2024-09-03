"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domicile_1 = require("../controllers/domicile");
const router = (0, express_1.Router)();
router.get('/', domicile_1.getDomiciles);
router.get('/:id', domicile_1.getOneDomicile);
router.post('/', domicile_1.asignDomicile);
exports.default = router;
