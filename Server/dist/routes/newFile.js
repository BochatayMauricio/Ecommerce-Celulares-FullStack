"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = require("./customers");
customers_1.router.get('/:dni', getOneUser);
