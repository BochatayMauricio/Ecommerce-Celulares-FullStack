"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const customers_1 = __importDefault(require("../routes/customers"));
const administrator_1 = __importDefault(require("../routes/administrator"));
const sales_1 = __importDefault(require("../routes/sales"));
const publications_1 = __importDefault(require("../routes/publications"));
const payment_1 = __importDefault(require("../routes/payment"));
const product_2 = require("./product");
const user_2 = require("./user");
const domicile_1 = require("./domicile");
const publication_1 = require("./publication");
const sales_2 = require("./sales");
const shipping_1 = require("./shipping");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3306';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/customers', customers_1.default);
        this.app.use('/api/Administrators', administrator_1.default);
        this.app.use('/api/sales', sales_1.default);
        this.app.use('/api/publications', publications_1.default);
        this.app.use('/api/payment', payment_1.default);
    }
    midlewares() {
        // Parseo Body
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        const path = require('path');
        this.app.use('/static', express_1.default.static(path.join(__dirname, '../../../frontend/src/assets/Products')));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_2.Product.sync();
                yield user_2.User.sync();
                yield domicile_1.Domicile.sync();
                yield shipping_1.Shipping.sync();
                yield publication_1.Publication.sync();
                yield sales_2.Sales.sync();
            }
            catch (error) {
                console.log('Unable to connect to the database: ', error);
            }
        });
    }
}
exports.default = Server;
