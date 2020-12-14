interface ITemplateVariables {
   [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables
}

export { IParseMailTemplate };