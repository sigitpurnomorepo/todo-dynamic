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