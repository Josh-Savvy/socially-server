export type DatabaseConfig = {
    host: string;
    port: number;
    user: string;
    password?: string;
    database: string;
};
declare const _default: () => DatabaseConfig;
export default _default;
