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
const express = require('express');
const app = express();
const cors = require('cors');
const Db_1 = __importDefault(require("./config/Db"));
const routes_1 = require("./routes");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = 5454 || process.env.PORT;
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) 
};
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use('/api/products', (0, routes_1.productRoute)());
app.get('/', (req, res) => {
    res.json({ info: 'Server is up' });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // initialize db
        yield (0, Db_1.default)();
        logger_1.default.info(`Server started listening on port ${PORT}`);
    }
    catch (e) {
        logger_1.default.error(`Error starting server ${e}`);
    }
}));
//# sourceMappingURL=index.js.map