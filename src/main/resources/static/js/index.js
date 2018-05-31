var xhr = new XMLHttpRequest();
var bookToRate;
var responseObject;

xhr.onload = function () {
    if (xhr.status == 200) {
        responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject);
        createBookTable(responseObject);
    }
}

xhr.open('GET', 'http://localhost:3300/api/books', true);
xhr.send(null);

function createBookTable(data) {
    var bookTable = '<table class="table table-striped"><thead><tr><th scope="col">Title</th><th scope="col">Genre</th><th scope="col">Author</th><th scope="col">Published</th><th scope="col">Price</th><th scope="col">Inventory<th scope="col"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></th><tr></thead><tbody>';

    $.each(data, function (key, item) {

        bookTable += '<tr><td scope="row"><p class="bold">' + item.title + '</p></td><td scope="row"><p>' + item.genre + '</p></td><td scope="row"><p>' + item.author + '</p></td><td scope="row"><p>' + item.publishedYear + '</p></td><td scope="row"><p>' + item.price + '</p></td><td scope="row"><p>' + item.inventory + '</p></td><td scope="row">   <button type="button" title="Add Up" class="btn btn-default" value="' + item.id + '" onclick="addInv(this.value)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><button type="button" title="Add Down" class="btn btn-default" value="' + item.id + '" onclick="removeInv(this.value)"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><a href="editBook.html"><button type="button" title="Edit Book" class="btn btn-primary" aria-label="Left Align" value="' + item.id + '" onclick="transferId(this.value)"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a><button type="button" title="Delete Book" class="btn btn-danger" aria-label="Left Align" value="' + item.id + '" onclick="deleteBook(this.value)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button type="button" title="Rate Book" class="btn btn-warning" aria-label="Left Align" data-toggle="modal" href="#myModal" value="' + item.id + '" onclick="setBookToRate(this.value)"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></button><a href="ratingStatistics.html"><button type="button" title="Statistics" class="btn btn-info" aria-label="Left Align" value="' + item.id + '" onclick="transferId(this.value)"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span></button></a></td></tr>';

    });
    bookTable += '</tbody></table>';
    $('#bookTableContainer').html(bookTable);
}

function setBookToRate(value) {
    bookToRate = value;
}

function rateBook(rating) {

    var rateRequest = new XMLHttpRequest();

    rateRequest.onload = function () {
        if (rateRequest.status == 200) {
            var responseObject = JSON.parse(rateRequest.responseText);
        }
    };

    rateRequest.open('POST', 'http://localhost:3300/api/addRating', true);
    rateRequest.setRequestHeader("Content-type", "application/json");
    rateRequest.onreadystatechange = function () {
        if (rateRequest.readyState === 4 && rateRequest.status === 200) {
            var json = JSON.parse(rateRequest.responseText);
            location.reload();
        }
    };

    var package = JSON.stringify({"star": rating, "bookId": bookToRate});
    rateRequest.send(package);
}

function addInv(id) {
    updateInv(id, "add");
}

function removeInv(id) {
    updateInv(id, "remove");
}

function deleteBook(id) {
    var bookTitle;
    var quotation = '"';

    for (var i = 0; i < responseObject.length; i++) {
        if (responseObject[i].id == id) {
            bookTitle = responseObject[i].title;
        }
    }

    var deleteBookWarning = confirm("Are you sure you want to delete " + quotation + bookTitle + quotation + "?");
    if (deleteBookWarning)
        $.ajax({
            url: 'http://localhost:3300/api/deleteBooks/' + id,
            type: 'DELETE',
            success: function (result) {
                location.reload();
            }
        });
}

function updateInv(id, type) {

    var bookToPut = new Object;

    for (var i = 0; i < responseObject.length; i++) {
        if (responseObject[i].id == id) {
            bookToPut = {
                "title": responseObject[i].title,
                "author": responseObject[i].author,
                "authorId": responseObject[i].authorId,
                "genre": responseObject[i].genre,
                "publishedYear": responseObject[i].publishedYear,
                "price": responseObject[i].price,
                "inventory": responseObject[i].inventory
            };
            if (type == "add") {
                bookToPut.inventory++;
            } else if (type == "remove") {
                bookToPut.inventory--;
                if (bookToPut.inventory < 0)
                    bookToPut.inventory = 0;
            } else {
                console.log("Something went wrong!");
            }
        }
    }

    $.ajax({
        url: 'http://localhost:3300/api/updateBook/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(bookToPut),
        success: function (data, textStatus, xhr) {
            location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}

function transferId(id) {
    localStorage.setItem('selectedId', id);
}