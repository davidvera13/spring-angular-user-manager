export class User {
  // public firstName: string;
  // public lastName: string;
  // public username: string;
  // public email: string;
  // // private password: string;
  // public lastLoginDate: Date | any;
  // public lastLoginDateDisplay: Date | any;
  // public createdAt: Date | any;
  // public profileImageUrl: string;
  // // for security
  // public isActive: boolean;
  // public isNotLocked: boolean;
  // public roles: string;
  // public authorities: string[];

  constructor(private _userKeyId: string,
              private _firstName: string,
              private _lastName: string,
              private _username: string,
              private _email: string,
              private _lastLoginDate: any,
              private _lastLoginDateDisplay: any,
              private _createdAt: any,
              private _profileImageUrl: string,
              private _isActive: boolean,
              private _isNotLocked: boolean,
              private _roles: string,
              private _authorities: string[]) {
    this._userKeyId = _userKeyId;
    this._firstName = _firstName;
    this._lastName = _lastName;
    this._username = _username;
    this._email = _email;
    this._lastLoginDate = _lastLoginDate;
    this._lastLoginDateDisplay = _lastLoginDateDisplay;
    this._createdAt = _createdAt;
    this._profileImageUrl = _profileImageUrl;
    this._isActive = _isActive;
    this._isNotLocked = _isNotLocked;
    this._roles = _roles;
    this._authorities = _authorities;
  }


  get userKeyId(): string {
    return this._userKeyId;
  }

  set userKeyId(value: string) {
    this._userKeyId = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get lastLoginDate(): any {
    return this._lastLoginDate;
  }

  set lastLoginDate(value: any) {
    this._lastLoginDate = value;
  }

  get lastLoginDateDisplay(): any {
    return this._lastLoginDateDisplay;
  }

  set lastLoginDateDisplay(value: any) {
    this._lastLoginDateDisplay = value;
  }

  get createdAt(): any {
    return this._createdAt;
  }

  set createdAt(value: any) {
    this._createdAt = value;
  }

  get profileImageUrl(): string {
    return this._profileImageUrl;
  }

  set profileImageUrl(value: string) {
    this._profileImageUrl = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get isNotLocked(): boolean {
    return this._isNotLocked;
  }

  set isNotLocked(value: boolean) {
    this._isNotLocked = value;
  }

  get roles(): string {
    return this._roles;
  }

  set roles(value: string) {
    this._roles = value;
  }

  get authorities(): string[] {
    return this._authorities;
  }

  set authorities(value: string[]) {
    this._authorities = value;
  }
}
