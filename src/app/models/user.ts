export class User {

  _id: string;

  username: string;
  password: string;
  session_id: string;
  session_timeout: Date;

  constructor(username: string, password: string, session_id: string, session_timeout: Date) {
    this.username = username;
    this.password = password;
    this.session_id = session_id;
    this.session_timeout = session_timeout;
  }
}
