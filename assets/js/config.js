// alert();
const BASE_URL = 'http://34.222.156.42:8081/'
const url = 'http://localhost/wedding/'

// const urlParams = ;
var urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
cnt = urlParams.get('cnt') || 0;
// console.log(cnt);
// console.log(id,localStorage.getItem('id'))
if (cnt > 5) {
    localStorage.clear();
}

function checkLogin(redirectURL = null, redirectlogin = false) {
    userdetails = localStorage.getItem('userDetails') || localStorage.getItem('is_admin')
    if (userdetails == 'SuperAdmin') {
        // alert();
        // alert(redirectURL || url + "super_admin");
        var urlParams = new URLSearchParams(window.location.search);

        if (!redirectlogin) {
            // alert('233242');
            document.location.href = redirectURL || url + "super_admin";
        }

        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        pathName = pathName.split("/")
        pathName = $.grep(pathName, function (n) {
            return n != '' || n
        });
        // pathName=    loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));

        if (id == null && (pathName[pathName.length - 1] != 'super_admin' || (pathName[pathName.length - 1] == 'index.html') && pathName[pathName.length - 2] != 'super_admin')) {
            // alert();
            document.location.href = redirectURL || url + "super_admin";
        }
    } else if (userdetails != null && userdetails != '') {
        if (redirectlogin) {
            cnt++;
            if (localStorage.getItem('id') != id) {
                document.location.href = redirectURL || url + "admin/?cnt=" + cnt + "&id=" + id;
            }
        } else {
            document.location.href = redirectURL || url + "admin/?id=" + localStorage.getItem('id');
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

$(document).on('click', '#logout', function () {
    document.location.href = url + "admin/?cnt=" + 6;
})