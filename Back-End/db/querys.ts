const CreateTablesQuery = [`
    CREATE TABLE sigma_case.user (
    iduser INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY (iduser));
    `,
    `  
    CREATE TABLE sigma_case.permissions (
    idpermissions INT NOT NULL AUTO_INCREMENT,
    permissions VARCHAR(45) NOT NULL,
    PRIMARY KEY (idpermissions));
    `,
    ` 
    CREATE TABLE sigma_case.user_permissions_rela (
    iduser_permissions_rela INT NOT NULL AUTO_INCREMENT,
    iduser INT NOT NULL,
    idpermissions INT NOT NULL,
    FOREIGN KEY (iduser) REFERENCES sigma_case.user(iduser), 
    FOREIGN KEY (idpermissions) REFERENCES sigma_case.permissions(idpermissions), 
    PRIMARY KEY (iduser_permissions_rela));
`]

const GetUsersQuery = `
    SELECT
        JSON_OBJECT(
            'user', JSON_OBJECT(
                'firstname', u.firstname,
                'email', u.email
            ),
            'permissions', IFNULL(JSON_ARRAYAGG(p.permissions), JSON_ARRAY())
        ) AS UserData
    FROM
        sigma_case.user u
    LEFT JOIN
        sigma_case.user_permissions_rela upr ON u.iduser = upr.iduser
    LEFT JOIN
        sigma_case.permissions p ON upr.idpermissions = p.idpermissions
    GROUP BY
        u.iduser, u.firstname, u.email;
    `

const CreateUsersQuery = [
    "INSERT INTO sigma_case.user (firstname, email) VALUES ('joao', 'joao.silva@email.com');",
    "INSERT INTO sigma_case.user (firstname, email) VALUES ('maria', 'maria.gomes@hotmail.com');",
    "INSERT INTO sigma_case.user (firstname, email) VALUES ('pedro', 'pedro_1985@gmail.com');",
    "INSERT INTO sigma_case.user (firstname, email) VALUES ('ana', 'ana.pereira@yahoo.com');"
]

const CreatePermissionsQuery = [
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:view');",
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:firstname:view');",
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:email:view');",
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:firstname:edit');",
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:email:edit');",
    "INSERT INTO sigma_case.permissions (permissions) VALUES ('user:profile:edit');"
]

const CreateUserPermissionsRela = [
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('1', '1');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('1', '2');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('1', '3');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('2', '1');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('2', '4');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('2', '3');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('3', '1');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('3', '2');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('3', '5');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('4', '4');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('4', '5');",
    "INSERT INTO `sigma_case`.`user_permissions_rela` (`iduser`, `idpermissions`) VALUES ('4', '6');"
]

const GetUsersQueryByEmail = `
    SELECT
    JSON_OBJECT(
        'user', JSON_OBJECT(
            'firstname', u.firstname,
            'email', u.email
        ),
        'permissions', IFNULL(JSON_ARRAYAGG(p.permissions), JSON_ARRAY())
    ) AS UserData
    FROM
    sigma_case.user u
    LEFT JOIN
    sigma_case.user_permissions_rela upr ON u.iduser = upr.iduser
    LEFT JOIN
    sigma_case.permissions p ON upr.idpermissions = p.idpermissions
    WHERE
    u.email = ?
    GROUP BY
    u.iduser, u.firstname, u.email;
    `

const EditUser = `UPDATE sigma_case.user SET firstname = ?, email = ? WHERE email = ?;`

export default { CreateTablesQuery, GetUsersQuery, GetUsersQueryByEmail, EditUser, CreateUsersQuery, CreatePermissionsQuery, CreateUserPermissionsRela };
