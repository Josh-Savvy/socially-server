export default class PasswordManagementService {
    constructor();
    static encryptPassword(password: string): Promise<string>;
    static isValidPassword(encrypted: string, value: string): Promise<boolean>;
}
