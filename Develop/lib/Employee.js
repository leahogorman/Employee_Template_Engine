// The Employee page is the parent object. Thus it does not need a super.
class Employee {
    constructor( name, id, email, role){
        this.id = id
        this.name = name
        this.email = email
        this.role = role
    }
    getName() { return this.name }
    getId()   { return this.id }
    getEmail(){ return this.email }
    getRole() { return this.role }
}

module.exports = Employee
