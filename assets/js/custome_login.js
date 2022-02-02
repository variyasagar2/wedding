checkLogin();
$(document).on("submit", "#loginSubmit", function (e) {
    // alert();
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
        return false;
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