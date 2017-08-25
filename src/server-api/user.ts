import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createGUID } from './common/index';
import { join } from 'path';

const filePath = join(__dirname, './data/users.db.json');

export class User {
  userID: string = createGUID();
  login: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  sessionKeys: string[] = [];
  constructor(data) {
    Object.assign(this, data);
  }

  static getAllUsers (): User[] {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getUser(id: string): User {
    return this.getAllUsers().find((u) => u.userID === id);
  }

  static createUser(data) {
    const user = new User(data);
    const users = this.getAllUsers();
    users.push(user);
    this.saveAllUsers(users);
    return user;
  }

  static saveAllUsers(users: User[]) {
    writeFileSync(filePath, JSON.stringify(users, null, 2));
  }

  static updateUser (data) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.userID === data.userID);
    users.splice(userIndex, 1, data);
    this.saveAllUsers(users);
  }
  static login(data) {
    const userData = this.getAllUsers()
      .find((user) => {
      return user.login === data.login && user.password === data.password;
    });
    return User.dataToUser(userData);
  }
  static dataToUser(data) {
    return data && new User(data);
  }
  static getUserBySessionKey(sessionKey?: string) {
    if (!sessionKey) {
      return null;
    }

    const userData = this.getAllUsers().find(user => user.sessionKeys.includes(sessionKey));
    return User.dataToUser(userData);
  }
  static doesExistUserLogin({login}) {
    const users = this.getAllUsers();
    return users.find((user) => user.login === login);
  }
  addSessionKey(sessionKey) {
    this.sessionKeys.push(sessionKey);
    User.updateUser(this);
  }
  removeSessionKey(sessionKey) {
    const {sessionKeys} = this;
    const ind = sessionKeys.indexOf(sessionKey);
    sessionKeys.splice(ind, 1);

    User.updateUser(this);
  }
}

export const UserRouter = express.Router();

UserRouter.get('/logged-user', (req, res) => {
  if(req.loggedInUser) {
    return res.json({
      firstName: req.loggedInUser.firstName
    });
  }
  return res.json(null);
});

UserRouter.post('/login', (req, res) => {
  const user = User.login(req.body);
  if (!user) {
        return res.status(404).send({message: 'login or password is incorrect'});
  }
  const sessionKey = createGUID();
  res.cookie('sessionUserKey', sessionKey, {maxAge: new Date(2024, 0, 1)});
  user.addSessionKey(sessionKey);
  res.json({
    firstName: user.firstName
  });
});

UserRouter.get('/logout', (req, res) => {
  const {sessionUserKey} = req.cookies;
  const loggedInUser = req.loggedInUser;
  loggedInUser && loggedInUser.removeSessionKey(sessionUserKey);
  res.cookie('sessionUserKey', '');
  res.status(200).end();
});

// create user
UserRouter.post('/', (req, res) => {
  if (User.doesExistUserLogin(req.body)) {
    return res.status(404).send({message: 'Login is registred'});
  }
  res.status(201).json(User.createUser(req.body));
});


