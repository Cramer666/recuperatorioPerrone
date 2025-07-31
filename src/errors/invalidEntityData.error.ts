export class InvalidEntityDataError extends Error {
    constructor(msg: string) {
        super(msg);
        this.message = msg;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, this.constructor.prototype);
    }
}