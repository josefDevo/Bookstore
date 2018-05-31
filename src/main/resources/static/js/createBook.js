var xhr = new XMLHttpRequest();
var responseObject;
var dropdownList = document.getElementById("selectAuthor");
var inputField = document.getElementById("InputAuthor");


xhr.onload = function () {
    if (xhr.status == 200) {
        responseObject = JSON.parse(xhr.responseText);
        popAuthorList();
    }
};

xhr.open('GET', 'http://localhost:3300/api/authors', true);
xhr.send(null);

function popAuthorList() {
    for (var i = 0; i < responseObject.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = responseObject[i].name;
        option.value = responseObject[i].id;
        dropdownList.appendChild(option);
    }
}

function createAuthor() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            var responseObject = JSON.parse(xhr.responseText);
            console.log(responseObject);
        }
    };

    xhr.open('POST', 'http://localhost:3300/api/addBook', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };


    var inputName = document.getElementById("InputAddAuthorName").value;
    console.log(inputName);
    var data = JSON.stringify({"name": inputName});
    xhr.send(data);
}



