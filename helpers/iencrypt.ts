export interface IEncrypt {
    getAuth(body: object): object,
    encryptObject(response: object): object,
    encrypt(text: string): Promise<string>,
    sign(message: string): Promise<string>,
    generateNewKey(): IKeyPair
}
export interface IKeyPair {
    public: string,
    private: string
}
  