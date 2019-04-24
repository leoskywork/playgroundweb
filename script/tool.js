 class Utility {

    static hello() {
        console.log('hello - from static method');
    }
}

//can't define static property directly in class by now(ES6), 2 ways to workaround
//* define as instance property and export an instance
//* define it outside class body
/* 
class Constant {
    constructor() {
        this.liveDate = '2018-12-10';
        this.expireDate = '2021-11-27';
        this.apiURL = 'http://www.leoskywork.com/api/';   
    }
}

let constant = new Constant();
export { Utility, constant };
 */
class Constant {}
Constant.liveDate = '2018-12-10';
Constant.expireDate = '2021-11-27';
Constant.apiURL = 'http://www.leoskywork.com/api/';

export { Utility, Constant };





