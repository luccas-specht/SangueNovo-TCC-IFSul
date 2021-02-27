import { IParseMailTemplate } from './IParseMailTemplate';

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}
