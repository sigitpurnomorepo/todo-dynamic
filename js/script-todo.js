// Drag n Drop
function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Fungsi Add Task
const btnAdd = document.getElementById("btn-add");
const todo = document.getElementById("todo-item");
btnAdd.addEventListener("click", (event) => {
    event.preventDefault();

    const title = window.prompt("Masukkan judul");
    const description = window.prompt("Masukkan deskripsi");

    // Tes pengambilan value
    //console.log(title, description);

    // Validasi dalam proses create task baru
    if (title && description != "") {
        const card = document.createElement("div");
        const article = document.createElement("article");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const btnWrapper = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        card.setAttribute("class", "card p-4 my-1");
        card.setAttribute("ondragstart", "dragStart(event)");
        card.setAttribute("draggable", "true");
        card.setAttribute("id", title);

        h3.appendChild(document.createTextNode(title));
        p.appendChild(document.createTextNode(description));

        article.appendChild(h3);
        article.appendChild(p);

        btnWrapper.setAttribute("class", "d-flex flex-row gap-1");
        btnEdit.setAttribute("type", "button");
        btnEdit.setAttribute("class", "btn btn-info text-white");
        btnEdit.setAttribute("onclick", "handleEdit(this.id)");
        btnEdit.setAttribute("id", "edit-" + description);
        btnEdit.appendChild(document.createTextNode("Edit"));
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("class", "btn btn-danger");
        btnDelete.setAttribute("onclick", "handleDelete(this.id)");
        btnDelete.setAttribute("id", "delete-" + description);
        btnDelete.appendChild(document.createTextNode("Delete"));

        btnWrapper.appendChild(btnEdit);
        btnWrapper.appendChild(btnDelete);

        article.appendChild(btnWrapper);
        card.appendChild(article);

        todo.appendChild(card);
    } else {
        alert("Inputan tidak boleh kosong!")
    }
})

// Fungsi edit task
function handleEdit(id) {
    const title = window.prompt("Ganti Judul");
    const description = window.prompt("Ganti Description");

    if (title && description != "") {
        const btnEdit = document.getElementById(id);
        const article = btnEdit.parentNode.parentNode;
        const h3 = article.firstElementChild;
        const p = article.firstElementChild.nextElementSibling;

        h3.innerHTML = title;
        p.innerHTML = description;
    } else {
        alert("Inputan tidak boleh kosong!")
    }
}

// Fungsi delete task
function handleDelete(id) {
    const btnDelete = document.getElementById(id);
    const card = btnDelete.parentNode.parentNode.parentNode;

    card.setAttribute("class", "d-none");
}

// Fungsi jam realtime
function showRealtimeClock() {
    const footerRealtimeClock = document.getElementById("footer-time");
    const time = new Date();
    footerRealtimeClock.innerHTML = time.toLocaleTimeString([], {
        hour12: false,
    });
}

setInterval(showRealtimeClock, 1000);