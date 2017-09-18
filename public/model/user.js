'use strict'
function User(username, password){
    this.username = username;
    this.password = password;
}

/**
 * title: The title of the post
 * date: The date at which it was created
 * about: The description of the product the user has created
 */
class PostModel{
    constructor(title, date, about){
        this.title = title;
        this.date = date;
        this.about = about;
    }
}

/*
 * Create a user singleton to store _id in order
 * for the database to know who post it belongs to.
 */

class UserModel{
    constructor(){
        if(!UserModel.instance){
            this._data = [];

        }

        return UserModel.instance;
    }
}

module.exports = User;
