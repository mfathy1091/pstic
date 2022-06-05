export default class Errors {
    mErrors;
    
    constructor() {
        this.mErrors = [];
    }

    get(field) {
        
        if(this.mErrors[field]){
            console.log(this.mErrors[field][0])
            return this.mErrors[field][0];
        }
    }

    set(errors){
        this.mErrors = errors;
        
    }
}
