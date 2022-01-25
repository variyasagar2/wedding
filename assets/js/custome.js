// alert();
const BASE_URL = 'http://34.222.156.42:8081/'
const url = 'http://localhost/wedding/gallary.html'
var settings = {
    "url": BASE_URL + "marriage_login", "method": "POST", "timeout": 0, "headers": {
        "Content-Type": "application/json"
    },
};

function checkLogin() {
    userdetails = localStorage.getItem('userDetails') || localStorage.getItem('is_admin')
    if (userdetails == 'SuperAdmin' && userdetails != null && userdetails != '') {
        document.location.href = url;
    }
}
checkLogin();
$(document).on("submit", "#loginSubmit", function (e) {
    e.preventDefault();
    var frm = $(this).serializeArray();
    var data = {};
    $.each(frm, function (k, v) {
        data[v.name] = v.value;
    })
    if (data.mobile_number == "Admin" && data.password == "Admin@123#") {
        localStorage.setItem('id', 'Admin');
        localStorage.setItem('is_admin', 'SuperAdmin');
        checkLogin();
    }

    settings.data = JSON.stringify(data);
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            // console.log(responsed)
            localStorage.setItem('id', response.data._id);
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            checkLogin();
        }

    });
})

function getresopncesuccess(data) {
    if (!data.is_success) {
        alert(data.message);
        return false;
    }
    return true;
}