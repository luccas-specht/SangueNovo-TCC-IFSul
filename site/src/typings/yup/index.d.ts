import {
    StringSchema,
    StringSchemaConstructor,
} from 'yup';
  
  declare module 'yup' {
    interface StringSchema {
      cpfValid(msg?: any): StringSchema;
      cnpjValid(msg?: any): StringSchema;
    }
  }
  
  export const string: StringSchemaConstructor;
