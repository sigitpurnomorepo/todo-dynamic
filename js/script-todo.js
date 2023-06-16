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

// Fetch Task
const todo = document.getElementById("todo-item");
window.onload = function () {
    // Ajax call to fetch data
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    const url = "/data/data-task.json";

    // Check status request, if respone is true then run the process
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Check data wheter already in localStorage
            let data = JSON.parse(localStorage.getItem("data"));

            // If not, save data to localStorage
            if (!data) {
                localStorage.setItem("data", this.response);
                data = JSON.parse(localStorage.getItem("data"));
            }

            // Render data to html
            for (let i = 0; i < data.length; i++) {
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
                card.setAttribute("id", data[i].id);

                h3.appendChild(document.createTextNode(data[i].title));
                p.appendChild(document.createTextNode(data[i].desc));

                article.appendChild(h3);
                article.appendChild(p);

                btnWrapper.setAttribute("class", "d-flex flex-row gap-1");
                btnEdit.setAttribute("type", "button");
                btnEdit.setAttribute("class", "btn btn-info text-white");
                btnEdit.setAttribute("onclick", "handleEdit(this.id)");
                btnEdit.setAttribute("id", "edit-" + data[i].id);
                btnEdit.appendChild(document.createTextNode("Edit"));
                btnDelete.setAttribute("type", "button");
                btnDelete.setAttribute("class", "btn btn-danger");
                btnDelete.setAttribute("onclick", "handleDelete(this.id)");
                btnDelete.setAttribute("id", "delete-" + data[i].id);
                btnDelete.appendChild(document.createTextNode("Delete"));

                btnWrapper.appendChild(btnEdit);
                btnWrapper.appendChild(btnDelete);

                article.appendChild(btnWrapper);
                card.appendChild(article);

                todo.appendChild(card);
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
};

// Fungsi Add
const addForm = document.getElementById("add-form");
addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
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
        card.setAttribute("id", title + description);

        h3.appendChild(document.createTextNode(title));
        p.appendChild(document.createTextNode(description));

        article.appendChild(h3);
        article.appendChild(p);

        btnWrapper.setAttribute("class", "d-flex flex-row gap-1");
        btnEdit.setAttribute("type", "button");
        btnEdit.setAttribute("class", "btn btn-info text-white");
        btnEdit.setAttribute("onclick", "handleEdit(this.id)");
        btnEdit.setAttribute("id", "edit-" + title + description);
        btnEdit.appendChild(document.createTextNode("Edit"));
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("class", "btn btn-danger");
        btnDelete.setAttribute("onclick", "handleDelete(this.id)");
        btnDelete.setAttribute("id", "delete-" + title + description);
        btnDelete.appendChild(document.createTextNode("Delete"));

        btnWrapper.appendChild(btnEdit);
        btnWrapper.appendChild(btnDelete);

        article.appendChild(btnWrapper);
        card.appendChild(article);

        todo.appendChild(card);

        // Process update data in localStorage from DOM
        // Create new object task
        const task = {
            id: title + description,
            title: title,
            desc: description
        }

        // Get current data in localStorage & push new data from object task
        const data = JSON.parse(localStorage.getItem("data"));
        data.push(task);

        // Rewrite data in localStorage
        localStorage.setItem("data", JSON.stringify(data));

        // Close modal
        const modalAdd = bootstrap.Modal.getInstance('#myModalAdd');
        modalAdd.hide();

        // Clear form 
        addForm.reset();

    } else {
        const toastAdd = document.getElementById('liveToastAdd');
        const toast = new bootstrap.Toast(toastAdd);
        toast.show();
    };
    // Check if title & description exist
    // if yes, save item to localStorage
    // next render to html / render DOM
    // if No, show toast
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