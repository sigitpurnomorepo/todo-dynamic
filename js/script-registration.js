
const formRegister = document.getElementById("form-register");

formRegister.addEventListener("submit", function (event) {
    event.preventDefault();
});

const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
    toastTrigger.addEventListener("click", () => {
        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email-address").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (email && fullname && password && confirmPassword) {
            window.location.href = "/todo.html"
        } else {
            const toast = new bootstrap.Toast(toastLiveExample);

            toast.show();
        }
    });
}

// btnRegister.addEventListener("click", (event) => {
//     event.preventDefault();

//     const fullname = document.getElementById("fullname").value;
//     const email = document.getElementById("email-address").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirm-password").value;

//     All input should be filled
//     if (fullname && email && password && confirmPassword) {
//         // Password and Confirm Password should be match
//         if (password != confirmPassword) {
//             window.alert("Password dan Confirm Password tidak sesuai!");
//         } else {
//             window.location.href = "/login.html";
//         }
//     } else {
//         window.alert("Form harus diisi semua!");
//     }
// });