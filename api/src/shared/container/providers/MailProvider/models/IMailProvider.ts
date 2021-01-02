import { ISendMail } from './ISendMail'

export interface IMailProvider {
    sendMail(data: ISendMail): Promise<any>;
}