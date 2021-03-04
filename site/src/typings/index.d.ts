import { StringSchemaConstructor } from "yup";

declare module "yup" {
  interface StringSchema {
    isCnpjValid(msg?: any): StringSchema;
  }
}

export const string: StringSchemaConstructor;
