import { ISendMail } from './ISendMail'
interface IMailProvider {
    sendMail(data: ISendMail): Promise<any>;
}

export { IMailProvider };