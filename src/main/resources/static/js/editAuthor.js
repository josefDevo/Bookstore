var xhr = new XMLHttpRequest();
var responseObject;
var dropdownList = document.getElementById("selectAuthor");
var inputField = document.getElementById("inputAuthor");
var currentId;

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

function updateAuthor() {
    inputField.value = dropdownList.options[dropdownList.selectedIndex].innerHTML;
    currentId = dropdownList.options[dropdownList.selectedIndex].value;
}

function editAuthor() {
    package = {"name": inputField.value};

    $.ajax({
        url: 'http://localhost:3300/api/updateAuthor/' + currentId,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(package),
        success: function (data, textStatus, xhr) {
            location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}


