module.exports = class UserData {
    email;
    id;
    isConfirmed;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isConfirmed = model.isActivated;
    }
}
