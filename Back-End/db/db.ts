import mysql from '../connection/connection'
import querys from './querys'

interface userEdit {
  firstname: string;
  emailEdit: string;
  email: string;
}

//Function to create the table for the tests
const createTable = async () => await querys.CreateTablesQuery.map(async query => await mysql.connection.query(query));

//Function to create the users for the tests
const createUsers = async () => await querys.CreateUsersQuery.map(async query => await mysql.connection.query(query));

//Function to create the permissions for the tests
const createPermissions = async () => await querys.CreatePermissionsQuery.map(async query => await mysql.connection.query(query));

//Function to create the users_permiossions_rela for the tests
const createUserPermissionsRela = async () => await querys.CreateUserPermissionsRela.map(async query => await mysql.connection.query(query));

//Function that return all the users
async function getUsers() {
  try {
    const users = (await mysql.connection.query(querys.GetUsersQuery))[0];
    return users;
  } catch (error) {
    return { message: error };
  }
};

//Function that return a user by email
async function getUserByEmail(email: string) {
  try {
    const user = (await mysql.connection.query(querys.GetUsersQueryByEmail, email))[0]
    if (user) {
      return user
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    return { message: error };
  }
}

//Function to edit the user
async function editUser(body: userEdit, email: string) {
  const { firstname, emailEdit } = body;
  try {
    const editUser = await mysql.connection.query(querys.EditUser, [firstname, emailEdit, email]);
    return editUser;
  } catch (error) {
    return { message: error };
  }
};

export default {
  createTable,
  getUsers,
  editUser,
  getUserByEmail,
  createUsers,
  createPermissions,
  createUserPermissionsRela
};
