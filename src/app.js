import {DBSchema} from './DBSchema';

const chalk = require('chalk');

export default class App {
    static start = () => {
        const objDB = new DBSchema();

        // insert roles
        console.log(chalk.green("\nSetting roles..."));
        objDB.setRoles(
            [{
                "Id": 1,
                "Name": "System Administrator",
                "Parent": 0
            }, {
                "Id": 2,
                "Name": "Location Manager",
                "Parent": 1
            }, { 
                "Id": 3,
                "Name": "Supervisor",
                "Parent": 2,
            }, {
                "Id": 4,
                "Name": "Employeer",
                "Parent": 3,
            }, {
                "Id": 5,
                "Name": "Trainer",
                "Parent": 3,
            }]
        );
        console.log(DBSchema.rolesCollection);

        // insert users
        console.log(chalk.green("\nSetting users..."));
        objDB.setUsers(
            [ {
                "Id": 1,
                "Name": "Adam Admin",
                "Role": 1
            }, {
                "Id": 2,
                "Name": "Emily Employee",
                "Role": 4
            }, {
                "Id": 3,
                "Name": "Sam Supervisor",
                "Role": 3
            }, {
                "Id": 4,
                "Name": "Mary Manager",
                "Role": 2
            }, {
                "Id": 5,
                "Name": "Steve Trainer",
                "Role": 5
            }]
        );
        console.log(DBSchema.usersCollection);

        DBSchema.usersCollection.forEach(user => {
            console.log(chalk.green(`\nGetting ${user.Name}'s (#${user.Id}) subordinates...`));
            console.log(objDB.getSubordinates(user.Id));
        });
    }
}