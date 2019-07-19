module.exports = {
    createGoodData () {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve([{
                    "Id": 1,
                    "Name": "Adam Admin",
                    "Role": 1
                }]);
            }, 100);
        }));
    },

    createBadData () {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve({
                    "Name": "Adam Admin",
                    "Role": 1
                });
            }, 100);
        }));
    },

    createArrayData () {
        return new Promise(((resolve) => {
            resolve([{
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
            }]);
        }));
    }
}