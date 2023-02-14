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
const path = require("path");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
mongoose_1.default.Promise = global.Promise;
dotenv_1.default.config({
    path: path.join(process.cwd(), `.env`)
});
const { DB_URL } = process.env;
/**
 * Db setup
 * Initialize db
 */
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    if (!DB_URL) {
        logger_1.default.error("'Define the DB_URL environment variable inside .env to continue!'");
        throw new Error('Define the DB_URL environment variable inside .env to continue!');
    }
    yield mongoose_1.default.connect(DB_URL, options);
});
exports.default = initDb;
//# sourceMappingURL=Db.js.map