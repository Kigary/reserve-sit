import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/users.db.json');

class User {
  static loggedInUser: User = null;
  userID: string = createGUID();
  login: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;

  constructor(data) {
    Object.assign(this, data); // copies every property of data to this
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

  static deleteUser (id: string) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.userID === id);
    users.splice(userIndex, 1);
    this.saveAllUsers(users);
  }

  static updateUser (data) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.userID === data.id);
    users.splice(userIndex, 1, data);
    this.saveAllUsers(users);
  }
  static login(data) {
    const users = this.getAllUsers();
    return users.find((user) => {
      return user.login === data.login && user.password === data.password;
    });
  }

}

export const UserRouter = express.Router();

UserRouter.get('/user-list', (req, res) => {
  res.json(User.getAllUsers());
});

UserRouter.get('/logged-user', (req, res) => {
   res.json(User.loggedInUser);
});

UserRouter.post('/login', (req, res) => {
  const user = User.login(req.body);
  if (!user) {
    return res.status(404).send({error: 'Username or password is incorrect'});
  }
  User.loggedInUser = user;
  return res.status(200).send({success: 'ok'});
});
UserRouter.get('/loggout', (req, res) => {
  User.loggedInUser = null;
  res.status(200).end();
});

UserRouter.get('/:id', (req, res) => {
  res.json(User.getUser(req.params.id));
});

// create user
UserRouter.post('/', (req, res) => {
  res.json(User.createUser(req.body));
});
// update user
UserRouter.post('/:id', (req, res) => {
  const data = req.body;
  data.id = req.params.id;
  res.json(User.updateUser(data));
});

// delete user
UserRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.json(User.deleteUser(id));
});


