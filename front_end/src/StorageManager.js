class StorageManager {
    constructor() {

    }

    userIsLoggedIn() {
        return true;
    }

    getLoggedInUser() {
        return {username: "ahmad"};
    }

}

export default new StorageManager();