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
                btnEdit.setAttribute("class", "btn-edit btn btn-info text-white");
                btnEdit.setAttribute("data-bs-toggle", "modal");
                btnEdit.setAttribute("data-bs-target", "#myModalEdit");
                btnEdit.setAttribute("data-title", data[i].title);
                btnEdit.setAttribute("data-description", data[i].desc);
                btnEdit.setAttribute("data-id", "edit-" + data[i].id);
                btnEdit.appendChild(document.createTextNode("Edit"));
                btnDelete.setAttribute("type", "button");
                btnDelete.setAttribute("class", "btn btn-danger");
                btnDelete.setAttribute("data-bs-toggle", "modal");
                btnDelete.setAttribute("data-bs-target", "#myModalDelete");
                btnDelete.setAttribute("data-id", data[i].id);
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
        btnEdit.setAttribute("class", "btn-edit btn btn-info text-white");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#myModalEdit");
        btnEdit.setAttribute("data-title", title);
        btnEdit.setAttribute("data-description", description);
        btnEdit.setAttribute("data-id", "edit-" + title + description);
        btnEdit.appendChild(document.createTextNode("Edit"));
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("class", "btn btn-danger");
        btnDelete.setAttribute("data-bs-toggle", "modal");
        btnDelete.setAttribute("data-bs-target", "#myModalDelete");
        btnDelete.setAttribute("data-id", title + description);
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
        // Jika inputan kosong, munculkan Toast warning 
        const toastAdd = document.getElementById('liveToastAdd');
        const toast = new bootstrap.Toast(toastAdd);
        toast.show();
    };
    // Check if title & description exist
    // if yes, save item to localStorage
    // next render to html / render DOM
    // if No, show toast
});

// Fungsi edit task
const modalEdit = document.getElementById("myModalEdit");
modalEdit.addEventListener("show.bs.modal", (event) => {
    // Get form input element
    let oldTitle = document.getElementById("edit-title");
    let oldDescription = document.getElementById("edit-description");
    // Assign current value to modal edit form
    oldTitle.value = event.relatedTarget.attributes["data-title"].value;
    oldDescription.value = event.relatedTarget.attributes["data-description"].value;

    const data = JSON.parse(localStorage.getItem("data"));

    let sameTasks = data.filter((task) => task.title == oldTitle.value);
    let diffTasks = data.filter((task) => task.description == oldDescription.value);

    const editForm = document.getElementById("edit-form");
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTitle = document.getElementById("edit-title").value;
        const newDescription = document.getElementById("edit-description").value;

        if (newTitle && newDescription) {
            // Save to localStorage & update DOM
            console.log(sameTasks[0]);
            console.log(document.getElementById(sameTasks[0].id));
            document.getElementById(
                sameTasks[0].id
            ).firstChild.childNodes[0].innerHTML = newTitle;
            document.getElementById(
                sameTasks[0].id
            ).firstChild.childNodes[1].innerHTML = newDescription;
            document.getElementById(
                sameTasks[0].id
            ).setAttribute("id", newTitle + newDescription);

            document.querySelector(".btn-edit").setAttribute("data-title", newTitle);
            document.querySelector(".btn-edit").setAttribute("data-description", newDescription);
            document.querySelector(".btn-edit").setAttribute("id", newTitle + newDescription);

            let newTask = {
                id: "id" + newTitle,
                title: newTitle,
                desc: newDescription
            }

            diffTasks.push(newTask);

            localStorage.setItem("data", JSON.stringify(diffTasks));

            const myModalEdit = bootstrap.Modal.getInstance("#myModalEdit");
            myModalEdit.hide();
        } else {
            const toastEdit = document.getElementById('liveToastEdit');
            const toast = new bootstrap.Toast(toastEdit);
            toast.show();
        };
    });
});

// Fungsi delete task
const modalDelete = document.getElementById("myModalDelete");
modalDelete.addEventListener("show.bs.modal", (event) => {
    const dataId = event.relatedTarget.attributes["data-id"];
    // console.log(dataId.value);
    const data = JSON.parse(localStorage.getItem("data"));
    const diffTasks = data.filter((d) => d.id != dataId.value);
    //console.log(diffTasks, dataId.value);

    const deleteForm = document.getElementById("delete-form");
    deleteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        document.getElementById(dataId.value).classList.add("d-none");
        localStorage.setItem("data", JSON.stringify(diffTasks));

        const myModalDelete = bootstrap.Modal.getInstance("#myModalDelete");
        myModalDelete.hide();
    });
});

// Fungsi jam realtime
function showRealtimeClock() {
    const footerRealtimeClock = document.getElementById("footer-time");
    const time = new Date();
    footerRealtimeClock.innerHTML = time.toLocaleTimeString([], {
        hour12: false,
    });
}

setInterval(showRealtimeClock, 1000);