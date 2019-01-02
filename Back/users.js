// Заявлено, что api такой же, как в mongoDB, т.е. легко перенести данные.
const dbConstructor = require('tingodb')().Db;
const database = new dbConstructor('./data', {});
// Fetch a collection to insert document into
const collection = database.collection("users");

class User {
    constructor(data) {
        this.userdata = data;
        return this.build();
    }
    
    build() {
        return User.find(this.userdata).then(user => {
            return user === null ? this.save() : user;
        });
    }
    
    save() {
        collection.insert(this.userdata);
        return this.userdata;
    }
    
    static find(data) {
        let findObject = {};
        
        if (data.username) {
            findObject.username = data.username;
        }
        
        if (data.password) {
            findObject.password = data.password;
        }
        
        return new Promise((resolve, reject) => {
            collection.findOne(findObject, function (err, item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(item);
                }
            })
        });
    }
    
    static update(data) {
        return new Promise((resolve, reject) => {
            User.find({username: data.username})
                .then((user) => {
                    if (user !== null) {
                        let updateObj = {
                            username: user.username,
                            password: user.password,
                            calendarData: JSON.parse(data.calendarData)
                        };
                        
                        collection.update({username: user.username} , updateObj, function (err, item) {
                            resolve({success: true});
                        });
                    } else {
                        resolve({success: false, err: 'user not found'});
                    }
                });
        });
    }
    
    static loginByUsername(data) {
        return new Promise((resolve, reject) => {
            User.find({username: data.username})
                .then((user) => {
                    if (user !== null) {
                        if (user.password === data.password) {
                            resolve({calendarData: user.calendarData});
                        } else {
                            resolve({incorrectPassword: true});
                        }
                    } else {
                        resolve({err: 'user not found!'});
                    }
                }).catch((err) => {
                reject(err);
            });
        });
    }
    
    static loginByCookie(data) {
        return new Promise((resolve, reject) => {
            User.find(data.cookie).then((user) => {
                if (user !== null) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    }
}

const mockUsers = [
    {
        username: 'admin',
        password: 'admin',
        calendarData: [
            {
                start: 0,
                duration: 15,
                title: 'Exercise'
            },
            {
                start: 25,
                duration: 30,
                title: 'Travel to work'
            },
            {
                start: 30,
                duration: 30,
                title: 'Plan day'
            },
            {
                start: 60,
                duration: 15,
                title: `Review yesterday's commits`
            },
            {
                start: 100,
                duration: 15,
                title: `Code review`
            },
            {
                start: 180,
                duration: 90,
                title: `Have lunch with John`
            },
            {
                start: 360,
                duration: 30,
                title: `Skype call`
            },
            {
                start: 370,
                duration: 45,
                title: `Follow up with designer`
            },
            {
                start: 405,
                duration: 30,
                title: `Push up branch`
            }
        ]
    },
    {
        username: 'user',
        password: 'user',
        calendarData: [
            {
                start: 1,
                duration: 25,
                title: 'Exercise'
            }
        ]
    }
];

mockUsers.map((user) => {
    return new User(user)
});

module.exports = User;