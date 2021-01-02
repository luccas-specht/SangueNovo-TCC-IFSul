interface ITemplateVariables {
   [key: string]: string | number;
}

export interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables
}