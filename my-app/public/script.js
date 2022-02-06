//  Show all the students from `music.json` to the client, in a table. 
function get() {
    
    // XMLHttpRequest - 
    let req = new XMLHttpRequest();

    // XMLHttpRequest.open(method: string, url: string)
    req.open('GET', 'http://localhost:3000/students/');

    req.onreadystatechange = () => {
        // readyState of 4 - DONE (operation is complete).
        if(req.readyState === 4){
            // req.response - is the data that returns from the address
            // JSON.parse() - convert to array. 

            let arr = JSON.parse(req.response);

            let result = `<th>Name</th><th>Age</th><th>Avg grade</th><th>Address</th>
            <th>Edit</th><th>Delete</th>`;

            for (const student of arr) {
                // tr -> table row, td -> table data(cell)
                result += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.avgGrade}</td>
                    <td>${student.address}</td>
                    <td><button onclick="put('${student.name}')" class="btn btn-primary">Edit</button></td>
                    <td><button onclick="deletestudent('${student.name}')" class="btn btn-danger">Delete</button></td>
                </tr>
                `
            }

            document.getElementById('students').innerHTML = result;
        } 
    }
    req.send();
    console.log("In get")
}

function post(){

    // get all the values from the inputs
    let sname = document.getElementById('sname').value;
    let sage = document.getElementById('sage').value;
    let savg = document.getElementById('savg').value;
    let saddress = document.getElementById('saddress').value;

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/students/add');

    req.onreadystatechange = () =>{
        // when we finish adding new student - call the student's list again
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"name":sname, "age":sage, "avgGrade":savg, 
"address":saddress }));
}

function put(studentName){
    // input from user:
    let newAge = prompt('Enter the new age');

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:3000/students/update/${studentName}`);

    // after update - refresh the table:
    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"age":newAge}));
}


function deletestudent(name){
    //let param = Number(param);
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/students/delete/${name}`);
    // show the updated table after request is sent. 
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}