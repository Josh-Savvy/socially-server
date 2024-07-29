"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
exports.default = {
    password: {
        encryptPassword: async (password) => {
            const salt = await bcrypt.genSalt(10);
            return bcrypt.hashSync(password, salt);
        },
        isValidPassword: async (encrypted, value) => {
            return bcrypt.compareSync(encrypted, value);
        },
    },
    invoice: {
        generateInvoiceRef: () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const length = 8;
            let invoiceRef = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                invoiceRef += characters[randomIndex];
            }
            return invoiceRef;
        },
    },
};
//# sourceMappingURL=index.js.map