export default class MailService {
    send(input: {
        email: string | string[];
        message: string;
    }): Promise<void>;
}
