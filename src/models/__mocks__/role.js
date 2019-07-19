module.exports = {
    createGoodData () {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve([{
                    "Id": 1,
                    "Name": "System Administrator",
                    "Parent": 0
                }]);
            }, 100);
        }));
    },

    createBadData () {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve([{
                    "Name": "Supervisor",
                    "Parent": 2
                }]);
            }, 100);
        }));
    },

    createArrayData () {
        return new Promise(((resolve) => {
            resolve([{
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
            }]);
        }));
    }
}