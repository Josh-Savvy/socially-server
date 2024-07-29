"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
});
//# sourceMappingURL=database.config.js.map