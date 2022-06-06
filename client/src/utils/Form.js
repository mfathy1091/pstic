import Errors from './Errors.js'

export default class Form {
    
    constructor(data){
        this.data = data
        for (let field in data){
            this[field] = data[field]
        }

        this.errors = new Errors;
    }
    
    reset(){
        for(let field in this.data) {
            this[field] = '';
        }
    }

    submit(){
        // axios
    }

    // onSuccess(response){
    onSuccess(){
        this.form.reset();
    }
    
    
}
