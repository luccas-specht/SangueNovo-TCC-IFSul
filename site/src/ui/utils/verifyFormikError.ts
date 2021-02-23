export const verifyFormikError = (touched: any, errors: any) =>
  !!touched && !!errors ? errors : undefined;
