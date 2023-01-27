import inquirer from 'inquirer';
import fs from 'fs';

//CLASSES
class Manager{
    constructor(name, ID, contact, office) {
        this.name = name;
        this.ID = ID;
        this.contact = contact;
        this.office = office;
    }

    getOffice() {
        return this.office;
    }

    getRole() {
        return "Manager";
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.ID;
    }
    
    getEmail() {
        return this.contact;
    }
}

class Engineer{
    constructor(name, ID, contact, github){
        this.name = name;
        this.ID = ID;
        this.contact = contact;
        this.github = github;
    }

    getGit() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.ID;
    }
    
    getEmail() {
        return this.contact;
    }
}

class Intern{
    constructor(name, ID, contact, school){
        this.name = name;
        this.ID = ID;
        this.contact = contact;
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.ID;
    }
    
    getEmail() {
        return this.contact;
    }
}

//MAIN QUESTIONS
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please input a name: '
    },
    {
        type: 'input',
        name: 'ID',
        message: 'Please input an ID number: '
    },
    {
        type: 'input',
        name: 'contact',
        message: 'Please input an email: '
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select the role of this team member: ',
        choices: ['Manager', 'Engineer', 'Intern', "I don't want to add another team member."]
    },
];

//ARRAY TO STORE TEAM MEMBERS
const yourTeam = [];

//START CREATING TEAM WITH INQUIRER
function createTeam() { 
    inquirer
        .prompt([...questions])
        .then((answers) => {
            inquirer
                .prompt([
                    {
                        when: () => answers.role === "Manager",
                        type: 'input',
                        message: "What's their office number?",
                        name: "office",
                    },
                    {
                        when: () => answers.role === "Engineer",
                        type: 'input',
                        message: "What's their github username?",
                        name: "github",
                    },
                    {
                        when: () => answers.role === "Intern",
                        type: 'input',
                        message: "What's the name of their school?",
                        name: "school",
                    },
                    {
                        type: 'confirm',
                        message: 'Do you want to add another team member?',
                        name: 'add',
                    }
                ])
                //NEW OBJECTS ARE CREATED WITH "WHEN" QUESTIONS ANSWERED
                .then((answers2) => {
                    if (answers.role === "Manager") {
                        const manager = new Manager(answers.name, answers.ID, answers.contact, answers2.office);
                        yourTeam.push(manager);
                    }

                    if (answers.role === "Engineer") {
                        const engineer = new Engineer(answers.name, answers.ID, answers.contact, answers2.github);
                        yourTeam.push(engineer);
                    }

                    if (answers.role === "Intern") {
                        const intern = new Intern(answers.name, answers.ID, answers.contact, answers2.school);
                        yourTeam.push(intern);
                    }

                    //CONTINUES TO CALL FUNCTION IF USER SELECTS "Y"
                    if (answers2.add) {
                        createTeam();
                    } else {
                        createFullHTML();
                    }

                })
        }) 
}

//CALL INITIAL FUNCTION
createTeam();

//CREATE HTML
function createFullHTML () {

    //ARRAY TO STORE HTML ELEMENTS IN ORDER
    const htmlEl = [];

    //FILTERS INDIVIDUAL OBJECTS IN THE ARRAY BY ROLE
    yourTeam.filter((employee) => employee.getRole() === "Manager").forEach((obj) => {
        //THEN CREATES AN ARRAY BASED ON OBJECTS VALUES
        let arr = (Object.values(obj));

        //THEN GENERATES THE HTML USING THAT ARRAY
        htmlEl.push(generateManagerCard(arr));
    });

   yourTeam.filter((employee) => employee.getRole() === "Engineer").forEach((obj) => {
        let arr = (Object.values(obj));

        htmlEl.push(generateEngineerCard(arr));
    });

    yourTeam.filter((employee) => employee.getRole() === "Intern").forEach((obj) => {
        let arr = (Object.values(obj));

        htmlEl.push(generateInternCard(arr));
    });

    //THEN THE "index.html" IS GENERATED FROM THE ARRAY OF GENERATED HTML
    const fullHTML = generateMainHTML(htmlEl);
    fs.writeFile('index1.html', fullHTML, (err) => 
        err ? console.log(err) : console.log('Successfully created index1.html!')
    );
}

//ALL SEPARATE HTML GENERATORS
const generateManagerCard = ([name, ID, contact, office]) =>
`
<div class="card bg-grey border-shadow">
    <header class="bg-blue">
        <h3 class="margin-15">${name}</h3>
        <h4 class="margin-10">☕ Manager</h4>
    </header>

    <div class="flex-column margin-tb-25">
        <div class="card inner-margin">
            <p class="margin-10">${ID}</p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">Email: <a href="mailto:${contact}">${contact}</a></p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">Office: #${office}</p>
        </div>
    </div>
</div>
`

const generateEngineerCard = ([name, ID, contact, github]) => 
`
<div class="card bg-grey border-shadow">
    <header class="bg-blue">
        <h3 class="margin-15">${name}</h3>
        <h4 class="margin-10">👓 Engineer</h4>
    </header>

    <div class="flex-column margin-tb-25">
        <div class="card inner-margin">
            <p class="margin-10">${ID}</p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">Email: <a href="mailto:${contact}">${contact}</a></p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">GitHub: <a href="https://github.com/${github}">${github}</a></p>
        </div>
    </div>
</div>
`

const generateInternCard = ([name, ID, contact, school]) =>
`
<div class="card bg-grey border-shadow">
    <header class="bg-blue">
        <h3 class="margin-15">${name}</h3>
        <h4 class="margin-10">👨‍🎓 Intern</h4>
    </header>

    <div class="flex-column margin-tb-25">
        <div class="card inner-margin">
            <p class="margin-10">${ID}</p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">Email: <a href="mailto:${contact}">${contact}</a></p>
        </div>
        <div class="card inner-margin">
            <p class="margin-10">School: ${school}</p>
        </div>
    </div>
</div>
`

const generateMainHTML = ([...html]) =>
`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
    <title>Joe's Team Builder</title>
</head>


<body>
    <header class="center bg-red header">
        <h1><span class="badge text-bg-light">My Team</span></h1>
    </header>

    <div class="column">
        <div id="team-members">
            ${html}
        </div>

    </div>



    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>
            
</html>
`