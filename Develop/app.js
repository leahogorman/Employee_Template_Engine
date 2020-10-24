// Connections to the other pages for the classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// Install inquirer
const inquirer = require("inquirer");
// Path and FS module
const path = require("path");
const fs = require("fs");

// Provides paths to output in the team.html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Uses the htmlRenderer File to render the information for team.html
const render = require("./lib/htmlRenderer");

// Empty array for the employee information.
let employees = []
// Employee ID numbers beginning at 1 and increasing with each employee eadded
let employeeID = 1

// begin async function
async function main() {
  // First input your information as the manager using inquirer prompt
    const managerInfo = await inquirer.prompt([
        {
            name: "name",
            message: "What is your name?"
          },
          {
            name: "email",
            message: "What is your email?"
          },
          {
            name: "officeNumber",
            message: "What is your Office Number?",
          },
          {
            name: "teamMembers",
            message: "How many members in your team?"
        }]
    )
// defines and compiles information for new Manager that connects to the manager page
    const manager = new Manager ( managerInfo.name, employeeID++, managerInfo.email, managerInfo.officeNumber, managerInfo.teamMembers )
    employees.push( manager )

// Used for the for loop so that it loops through the full number of team members
    team = managerInfo.teamMembers

// Begin for loop to loop through members.
for( var i=0; i<team; i++) {
  // In the for loop first we must ask what role the employee has. Since there are only 2 options it makes sense to put this in a list instead of an input
    const employeeType = await inquirer.prompt([
            { name: 'role', type: 'list', message: 'What is the employee role?',
            choices: [ "Intern", "Engineer" ] }
    ])
    // once the employee's role is defined we must next get their information
    employeeRole = employeeType.role
    const employeeInfo = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: `What is ${employeeRole} name?`
              },
              {
                type: "input",
                name: "email",
                message: `What is ${employeeRole} email?`,
              },
// Since the employees have different information for the final question we must find a way to get it to be dependent on their role answer. In this case we used a ternary operator so if they are an intern they get the school question. Otherwise they get asked for their github.
              {
                type: "input",
                name: "info",
                message: `What is ${employeeRole}'s ${employeeRole == "Intern" ? "School" : "Github"}?`
              } ])
// Here again we needed to use ternary operators to put in the employee information. If the employee is an Intern it puts in new intern. Otherwise it puts in new Engineer
              const employee = employeeRole==="Intern" ? new Intern( employeeInfo.name, employeeID++, employeeInfo.email, employeeInfo.info  ) 
              : new Engineer( employeeInfo.name, employeeID++, employeeInfo.email, employeeInfo.info  ) 
              employees.push( employee )
}

// This is used to write the file to the output.
if( !fs.existsSync(OUTPUT_DIR) ) fs.mkdirSync(OUTPUT_DIR)
fs.writeFileSync(outputPath, render(employees), "utf-8");

console.log( `Completed writing to: ${outputPath}` )
}

main()