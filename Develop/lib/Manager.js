const Employee = require( './Employee' )
// By using a super we are able to affect both the object and its parent. So the manager and the employee classes.
class Manager extends Employee {
    constructor( name, id, email, officeNumber){
     super(name, id, email, "Manager")
     this.officeNumber = officeNumber
    }
    getOfficeNumber() { 
        return this.officeNumber 
    }
}

module.exports = Manager