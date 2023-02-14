"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateProductCode = void 0;
function GenerateProductCode() {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let length = 10;
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
exports.GenerateProductCode = GenerateProductCode;
//# sourceMappingURL=index.js.map