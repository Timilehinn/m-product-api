"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const productRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/add', products_controller_1.addProduct);
    router.patch('/update/:code', products_controller_1.updateProduct);
    router.delete('/delete/:code', products_controller_1.deleteProduct);
    router.get('/fetch-all', products_controller_1.fetchAllProducts);
    router.get('/fetch/:code', products_controller_1.fetchProduct);
    router.get('/pagination/:page', products_controller_1.fetchProductsByPage);
    return router;
};
exports.default = productRoute;
//# sourceMappingURL=products.js.map