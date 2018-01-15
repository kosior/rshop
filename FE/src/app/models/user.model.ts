export class User {
  private first_name: string;
  private last_name: string;
  private email: string;
  private is_staff = false;

  constructor(json: any) {
    this.first_name = json.first_name;
    this.last_name = json.last_name;
    this.email = json.email;
    this.is_staff = json.is_staff;
  }

  getDisplay() {
    if (this.first_name && this.last_name) {
      return this.first_name + ' ' + this.last_name;
    } else {
      return this.email;
    }
  }

  isStaff() {
    return this.is_staff;
  }
}
