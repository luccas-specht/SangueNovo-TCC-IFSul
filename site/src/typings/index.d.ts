import { StringSchemaConstructor } from "yup";

declare module "yup" {
  interface StringSchema {
    cnpjValid(msg?: any): StringSchema;
  }
}

export const string: StringSchemaConstructor;
