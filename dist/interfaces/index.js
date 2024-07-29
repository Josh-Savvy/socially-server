"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const crypto_1 = require("crypto");
class Photo {
    constructor(input) {
        Object.assign(this, input);
        this.id = (0, crypto_1.randomUUID)();
    }
}
exports.Photo = Photo;
//# sourceMappingURL=index.js.map