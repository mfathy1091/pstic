export default class Errors {
    errors;
    
    constructor() {
        this.errors = {};
    }

    has(field){
        // if this.errors contains a "field" property.
        return Object.prototype.hasOwnProperty.call(this.errors, field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    get(field) {
        
        if(this.errors[field]){
            return this.errors[field][0];
        }
    }

    set(errors){
        this.errors = errors;
        
    }

    clear(field){
        delete this.errors[field]
    }
}
