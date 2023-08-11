const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email-address").value;
    const password = document.getElementById("password").value;

    // Mengetes pengambilan value dari form login
    // console.log(email, password);

    if (email && password) {
        if (email == "sigitpurnomo@gmail.com" && password == "12345") {
            // Redirect to todo page
            window.location.href = "todo.html";
        } else {
            window.alert("Email atau Password salah!")
        }
    } else {
        window.alert("Email dan Password tidak boleh kosong!");
        // }
    }
})