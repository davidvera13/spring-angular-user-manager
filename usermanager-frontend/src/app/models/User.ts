export class User {
  public userKeyId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  // private password: string;
  public lastLoginDate: Date | any;
  public lastLoginDateDisplay: Date | any;
  public createdAt: Date | any;
  public profileImageUrl: string;
  // for security
  public isActive: boolean;
  public isNotLocked: boolean;
  public roles: string;
  public authorities: string[];



  constructor() {
    this.userKeyId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.profileImageUrl = '';
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.createdAt = null;
    this.roles = '';
    this.authorities = [];
    this.isActive = false;
    this.isNotLocked = false;
  }
}
