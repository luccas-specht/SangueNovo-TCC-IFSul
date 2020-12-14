import { IParseMailTemplate } from './IParseMailTemplate';

interface IMailTemplateProvider {
    parse(data: IParseMailTemplate): Promise<string>;
}

export { IMailTemplateProvider };