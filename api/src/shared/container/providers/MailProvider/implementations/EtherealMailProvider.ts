import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { ISendMail } from '../models/ISendMail';

import { IMailProvider } from '../models/IMailProvider';
import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    subject,
    templateData,
    to,
    from,
  }: ISendMail): Promise<any> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Sangue Novo',
        address: from?.email || 'equipe@sanguenovo.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
    return nodemailer.getTestMessageUrl(message);
  }
}
