declare const _default: {
    password: {
        encryptPassword: (password: string) => Promise<string>;
        isValidPassword: (encrypted: string, value: string) => Promise<boolean>;
    };
    invoice: {
        generateInvoiceRef: () => string;
    };
};
export default _default;
