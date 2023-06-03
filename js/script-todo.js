function dragStart(event) {
    event.dataTransfer.setData("judul-item", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("judul-item");
    event.target.appendChild(document.getElementById(data));
}

// CRUD
const todo = document.getElementById("todo-item");
const btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", (event) => {
    event.preventDefault();

    const title = window.prompt("Masukkan judul");
    const description = window.prompt("Masukkan deskripsi");

    // Tes pengambilan value
    //console.log(title, description);

    const card = document.createElement("div");
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const btnWrapper = document.createElement("div");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");

    card.setAttribute("class", "card p-4 my-1");
    card.setAttribute("ondragstart", "dragstart(event)");
    card.setAttribute("draggable", "true");
    card.setAttribute("id", title);

    h3.appendChild(document.createTextNode(title));
    p.appendChild(document.createTextNode(description));

    article.appendChild(h3);
    article.appendChild(p);

    btnWrapper.setAttribute("class", "d-flex flex-row gap-1");
    btnEdit.setAttribute("type", "button");
    btnEdit.setAttribute("class", "btn-edit rounded-2 btn btn-info text-white");
    btnEdit.appendChild(document.createTextNode("Edit"));
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("class", "btn-delete rounded-2 btn btn-danger");
    btnDelete.appendChild(document.createTextNode("Delete"));

    btnWrapper.appendChild(btnEdit);
    btnWrapper.appendChild(btnDelete);

    card.appendChild(article);
    card.appendChild(btnWrapper);

    // todo.setAttribute("ondrop", "drop(event)");
    // todo.setAttribute("ondragover", "allowDrop(event)");
    // todo.setAttribute("id", "todo-item");
    // todo.setAttribute("ondrop", "drop(event)");
    // todo.setAttribute("ondragover", "allowDrop(event)");
    // todo.setAttribute("id", "done-item");

    todo.appendChild(card);
})

function handleEdit(id) {
    const title = window.prompt("Masukkan Judul");
    const description = window.prompt("Masukkan Description");

    const btnEdit = document.getElementById(id);
    const article = btnEdit.parentNode.parentNode;
    const h3 = article.firstElementChild;
    const p = article.firstElementChild.nextSibling.nextSibling;

    h3.innerHTML = title;
    p.innerHTML = description;
}


