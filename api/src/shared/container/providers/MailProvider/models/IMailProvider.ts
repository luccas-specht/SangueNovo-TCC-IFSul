interface IMailProvider {
    sendMail(to: string, body: string): Promise<any>;
}

export { IMailProvider };