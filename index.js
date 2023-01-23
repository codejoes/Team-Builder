import inquirer from 'inquirer';
import fs from 'fs';



const firstQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Please input the name of the manager: '
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'Please input the ID number of the manager: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please input the email of the manager: '
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please input the github username of the manager: '
    },
];

const generateManagerCard = ({managerName, managerID, email, github}) =>

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
            <div class="card bg-grey border-shadow">
                <header class="bg-blue">
                    <h3 class="margin-15">${managerName}</h3>
                    <h4 class="margin-10">☕ Manager</h4>
                </header>

                <div class="flex-column margin-tb-25">
                    <div class="card inner-margin">
                        <p class="margin-10">${managerID}</p>
                    </div>
                    <div class="card inner-margin">
                        <p class="margin-10">Email: <a href="mailto:${email}">${email}</a></p>
                    </div>
                    <div class="card inner-margin">
                        <p class="margin-10">GitHub: <a href="https://github.com/${github}">${github}</a></p>
                    </div>
                </div>
            </div>
        </div>

    </div>



    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>
            
</html>
`

inquirer
    .prompt([
        ...firstQuestions,
    ])

    .then((answers) => {
        const managerDiv = generateManagerCard(answers);
        
        fs.writeFile('index1.html', managerDiv, (err) => 
        err ? console.log(err) : console.log('Successfully created index1.html!')
        );
    }); 