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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.fetchProduct = exports.fetchAllProducts = exports.fetchProductsByPage = exports.deleteProduct = exports.addProduct = void 0;
require('dotenv').config();
const lodash_1 = require("lodash");
const lodash_contrib_1 = require("lodash-contrib");
const product_model_1 = __importDefault(require("../schemas/product.model"));
const helpers_1 = require("../helpers");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description } = req.body;
        const validateFields = () => {
            let valid = { state: true, error: '' };
            if ((0, lodash_1.isEmpty)(name) || name.length < 3) {
                valid.state = false;
                valid.error = 'Name cannot be less than 3 characters';
            }
            else if ((0, lodash_1.isEmpty)(description) || description.length < 3) {
                valid.state = false;
                valid.error = 'Description cannot be less than 3 characters';
            }
            else if (!(0, lodash_1.isFinite)(price) || price < 100) {
                valid.state = false;
                valid.error = 'Price must be of type Number and not less than 500';
            }
            return valid;
        };
        let validation = validateFields();
        if (validation.state) {
            yield product_model_1.default.create(Object.assign(Object.assign({}, req.body), { productCode: (0, helpers_1.GenerateProductCode)() }));
            res.json({ message: 'Product added successfully', status: 200 }).status(200);
        }
        else {
            res.json({ message: 'Something went wrong, please try again', error: validation.error, status: 400 }).status(400);
        }
    }
    catch (err) {
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const exists = yield product_model_1.default.exists({ productCode: code });
        if ((0, lodash_1.isEmpty)(code)) {
            return res.json({ message: 'Product code is required to perform this action', status: 400 }).status(400);
        }
        else if (!exists) {
            return res.json({ message: 'Product with code does not exist', status: 400 }).status(400);
        }
        yield product_model_1.default.deleteOne({ productCode: code });
        res.json({ message: 'Product deleted successfully', status: 201 }).status(201);
    }
    catch (err) {
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.deleteProduct = deleteProduct;
const fetchProductsByPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        console.log(parseInt(page.toString()), ' ---page number');
        const validateFields = () => {
            let valid = true;
            if ((0, lodash_1.isEmpty)(page) || (0, lodash_contrib_1.isFloat)(page.toString()) || parseInt(page.toString()) < 1) {
                valid = false;
            }
            return valid;
        };
        if (!validateFields()) {
            const products = yield product_model_1.default.find().skip(0).limit(10);
            res.json({ data: { products, info: { prev: null, page: 1, next: 2, items: products.length } }, message: 'Page must be of type Number and not less than 1', status: 200 }).status(200);
        }
        else {
            var limit = parseInt(page.toString()) * 10;
            var offset = limit == 0 ? 10 : limit - 10;
            var prev = parseInt(page.toString()) == 0 ? null : parseInt(page.toString()) - 1;
            var next = parseInt(page.toString()) + 1;
            const products = yield product_model_1.default.find().skip(offset).limit(limit);
            res.json({ data: { products, info: { prev, page, next, items: products.length } }, message: 'successful', status: 200 }).status(200);
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.fetchProductsByPage = fetchProductsByPage;
const fetchAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.json({ products, info: { items: products.length }, status: 200 }).status(200);
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.fetchAllProducts = fetchAllProducts;
const fetchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const products = yield product_model_1.default.findOne({ productCode: code });
        res.json({ products, status: 200 }).status(200);
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.fetchProduct = fetchProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { description, price, quantity, name, imgUrl } = req.body;
        const { code } = req.params;
        const _a = req.body, { rating, productCode, _id, __v } = _a, properties = __rest(_a, ["rating", "productCode", "_id", "__v"]);
        const exists = yield product_model_1.default.exists({ productCode: code });
        if ((0, lodash_1.isEmpty)(code)) {
            return res.json({ message: 'Product code is required to perform this action', status: 400 }).status(400);
        }
        else if (!exists) {
            return res.json({ message: 'Product with code does not exist', status: 400 }).status(400);
        }
        const validateFields = () => {
            let valid = { state: true, error: '' };
            if (!(0, lodash_1.isEmpty)(properties.name) && properties.name.length < 3) {
                valid.state = false;
                valid.error = 'Name cannot be less than 3 characters';
            }
            else if (!(0, lodash_1.isEmpty)(properties.description) && properties.description.length < 3) {
                valid.state = false;
                valid.error = 'Description cannot be less than 3 characters';
            }
            else if (!(0, lodash_1.isEmpty)(properties.price) && !(0, lodash_1.isFinite)(properties.price) || properties.price < 500) {
                valid.state = false;
                valid.error = 'Price must be of type Number and not less than 500';
            }
            else if (!(0, lodash_1.isEmpty)(properties.quantity) && !(0, lodash_1.isFinite)(properties.quantity)) {
                valid.state = false;
                valid.error = 'Price must be of type Number and not less than 500';
            }
            return valid;
        };
        let validation = validateFields();
        console.log(validation, ' ---- valid field');
        console.log(req.body);
        console.log(properties, ' ---new');
        if (validation.state) {
            yield product_model_1.default.updateOne({ productCode: code }, Object.assign({}, properties));
            res.json({ message: 'Product details updated successfully', status: 200, code }).status(200);
        }
        else {
            res.json({ message: 'Product update failed', error: validation.error, status: 400, code }).status(400);
        }
    }
    catch (err) {
        res.json({ message: err.message, status: 500 }).status(500);
    }
});
exports.updateProduct = updateProduct;
//# sourceMappingURL=products.controller.js.map