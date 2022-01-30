checkLogin(null, true);
var urlParams = new URLSearchParams(window.location.search);
const mrg_id = urlParams.get('mrg_id');
const phone = urlParams.get('phone');
const name = urlParams.get('name');
const image = urlParams.get('image');

var myArray = image.split(" ")
var a = '';
if (myArray[0] != null && myArray[0].search("pdf") > -1) {
    //    <div class="anable-btn"></div>
    a = `
            <a href="${BASE_URL + myArray[0]}" target="_blank">View Document</a>
            `
} else {
    $.each(myArray, function (k, v) {
        a += `
             <a href="${BASE_URL + v}" target="_blank">
             <img src="${BASE_URL + v}" alt="" width="50px" height="50px" srcset="">
</a>
            `
    })

}
$(document).find("#user_proof").html(a)
$(document).find("#user_phone").html(phone)
$(document).find("#user_name").html(name)

// alert(mrg_id);


function getfeeds1(u = 'All') {

    settings.data = JSON.stringify({'guest_id': mrg_id, feed_status: u});
    // console.log(data);
    settings.url = BASE_URL + "get_feeds_from_a_guest"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            var html = '';
            $.each(response.data, function (x, v) {
                html += setImage(v);
            })
            $(document).find("#all_glry").html(html);
        }
    });
}

getfeeds1();

$(document).on("click", ".change_det", function () {
    update_feed_status($(this).data('id'), $(this).data('value'))

})

function update_feed_status(feedid, sts) {
    settings.data = JSON.stringify({'feed_id': mrg_id, feed_status: sts});
    // console.log(data);
    settings.url = BASE_URL + "update_feed_status"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            getfeeds(x1);
        }
    });
}
