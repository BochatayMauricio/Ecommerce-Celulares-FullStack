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
exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const stripe = new stripe_1.default('sk_test_51OHwGOBu8HuAflvRhuY8kZ6DuS25d2dZceAo2CItxjJU7FIlFJdGlOfxXlqX77Dek6L4vkZj22e9YzebC0WIJ5Ko009qDGb9KS');
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenID = req.body.tokenID;
    const sales = req.body.sales; //arreglo
    let amount = 0;
    const idCustomer = sales[0].idCustomer;
    if (sales.length > 0) {
        for (let i = 0; i < sales.length; i++) {
            const product = yield product_1.Product.findOne({ where: { id: sales[i].idProduct } });
            amount = amount + (Number(product === null || product === void 0 ? void 0 : product.dataValues.price) * Number(sales[i].quantity));
        }
        const customer = yield user_1.User.findOne({ where: { id: idCustomer } });
        const responseObject = yield stripe.charges.create({
            amount: Number(amount),
            currency: "usd",
            source: tokenID,
            capture: false,
            description: `Celulares comprados por : ${customer === null || customer === void 0 ? void 0 : customer.dataValues.name} ${customer === null || customer === void 0 ? void 0 : customer.dataValues.surname}`,
            receipt_email: customer === null || customer === void 0 ? void 0 : customer.dataValues.email
        });
        try {
            yield stripe.charges.capture(responseObject.id);
            return res.json(responseObject);
        }
        catch (err) {
            yield stripe.refunds.create({ charge: responseObject.id });
            return res.status(400).json(responseObject);
        }
    }
    else {
        return res.status(400).json('No hay productos');
    }
});
exports.checkout = checkout;
