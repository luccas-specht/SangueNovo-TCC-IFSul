import { IParseMailTemplate } from '@shared/container/providers/MailTemplateProvider/models/IParseMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
