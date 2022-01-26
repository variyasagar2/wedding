// alert();
const BASE_URL = 'http://34.222.156.42:8081/'
const url = 'http://localhost/wedding/'

// const urlParams = ;
function checkLogin(redirectURL = null, redirectlogin = false) {
    userdetails = localStorage.getItem('userDetails') || localStorage.getItem('is_admin')
    if (userdetails == 'SuperAdmin') {
        // alert(redirectURL || url + "super_admin");
        if (!redirectlogin) {
            alert('233242');
            document.location.href = redirectURL || url + "super_admin";
        }
    } else if (userdetails != null && userdetails != '') {
        // alert(redirectURL || url + "admin")
        if (redirectlogin) {
            var urlParams = new URLSearchParams(window.location.search);
            id = urlParams.get('id');
            cnt = urlParams.get('cnt') || 0;
            console.log(cnt);
            // console.log(id,localStorage.getItem('id'))
            if (cnt > 5) {
                localStorage.clear();
            }
            cnt++;
            if (localStorage.getItem('id') != id) {
                document.location.href = redirectURL || url + "admin?cnt=" + cnt + "&id=" + id;
            }
        } else {
            document.location.href = redirectURL || url + "admin?id=" + localStorage.getItem('id');
        }

    } else if (redirectlogin) {
        document.location.href = url + "login";
    }
}

var settings = {
    "url": BASE_URL + "marriage_login", "method": "POST", "timeout": 0, "headers": {
        "Content-Type": "application/json"
    },
};

function getresopncesuccess(data) {
    if (!data.is_success) {
        alert(data.message);
        return false;
    }
    return true;
}