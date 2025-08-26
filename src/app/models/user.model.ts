export class UserModel {
  constructor(
    public email: string,
    public id: string,
    public name: string,
    public image: string | undefined,   // الصورة اختيارية
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
      return null;
    }
    return this._token;
  }
}
