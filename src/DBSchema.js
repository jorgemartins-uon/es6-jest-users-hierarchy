export const getDescendants = (collection, role) => {
    const out = [];
    collection.forEach(item => {
        if (item.Parent === role.Id) {
            const children = getDescendants(collection, item);
            if (children.length) {
                out.push(...children);
            }
            out.push(item);
        }
    });
    return out;
};

export class DBSchema {
    static rolesCollection = [];
    static usersCollection = [];

    /**
     * Sets a collection of Roles.
     *
     * @param {Array} roles A collection of Roles.
     * @return boolean
     */
    setRoles = (roles) => {
        if (Array.isArray(roles) !== true) {
            throw Object.assign(
               new Error("Invalid role collection."),
               { code: 101 }
            );
        }

        roles.forEach(role => {
            if (this.validateRole(role)) {
                this.constructor.rolesCollection.push(role);
            }
        });

        return true;
    };

    /**
     * Validates the creation of a Role.
     *
     * @param {Object} role The Role object.
     * @return boolean
     */
    validateRole = (role) => {
        if (
            typeof role !== 'object' ||
            (
                typeof role === 'object' &&
                (
                    typeof role.Id !== 'number' ||
                    typeof role.Name !== 'string' ||
                    typeof role.Parent !== 'number'
                )
            )
        ) {
            throw Object.assign(
               new Error(`Invalid role format: ${JSON.stringify(role, null, 4)}`),
               { code: 102 }
            );
        }

        if (this.constructor.rolesCollection.find(item => item.Id === role.Id)) {
            throw Object.assign(
               new Error(`Duplicated role: ${role.Id}`),
               { code: 103 }
            );
        }

        return true;
    };



    /**
     * Sets a collection of Users.
     *
     * @param {Array} users A collection of Users.
     * @return boolean
     */
    setUsers = (users) => {
        if (Array.isArray(users) !== true) {
            throw Object.assign(
               new Error("Invalid user collection."),
               { code: 104 }
            );
        }

        users.forEach(user => {
            if (this.validateUser(user)) {
                this.constructor.usersCollection.push(user);
            }
        });

        return true;
    };

    /**
     * Validates the creation of a User.
     *
     * @param {Object} user The User object.
     * @return boolean
     */
    validateUser = user => {
        if (
            typeof user !== 'object' ||
            (
                typeof user === 'object' &&
                (
                    typeof user.Id !== 'number' ||
                    typeof user.Name !== 'string' ||
                    typeof user.Role !== 'number'
                )
            )
        ) {
            throw Object.assign(
               new Error(`Invalid user format: ${JSON.stringify(user, null, 4)}`),
               { code: 105 }
            );
        }

        if (this.constructor.usersCollection.find(item => item.Id === user.Id)) {
            throw Object.assign(
               new Error(`Duplicated user: ${user.Id}`),
               { code: 106 }
            );
        }      

        return true;
    };


    /**
     * Returns the User's subordinates.
     *
     * @param {number} userId The User ID.
     * @return {Array} A collection of Users.
     */
    getSubordinates = (userId) => {
        if (typeof(userId) !== 'number') {
            throw Object.assign(
               new Error("The userId must be a number."),
               { code: 107 }
            );
        }

        const [usersCollection = this.constructor.usersCollection] = [];
        const [rolesCollection = this.constructor.rolesCollection] = [];

        if (usersCollection.length === 0 && rolesCollection.length === 0) {
            throw Object.assign(
               new Error("The data is empty."),
               { code: 108 }
            );
        }

        const user = usersCollection.find(item => item.Id === userId);

        if (user === null) {
            throw Object.assign(
               new Error("User not found."),
               { code: 109 }
            );
        }

        const roleToFind      = rolesCollection.find(item => item.Id === user.Role),
              descendants     = getDescendants(rolesCollection, roleToFind),
              descendantsIds  = descendants.map(item => item.Id);

        return usersCollection.filter(item =>
            descendantsIds.includes(item.Role)
        );
    }
}
