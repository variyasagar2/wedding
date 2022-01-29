checkLogin(null, true);


function home() {
    settings.url = BASE_URL + 'get_single_marriages';

    settings.data = settings.data = JSON.stringify({marriage_id: id});
    ;$.ajax(settings).done(function (response) {
        printHome(response)
    });
}

function printHome(response) {
    if (getresopncesuccess(response)) {
        // alert();
        // console.log(response.data)
        let data = response.data
        $(document).find("#count_inv").html(data.invitation_card.length + " Invitations");


        // if (!data.is_dark) $(document).find('body').addClass('body-light')
        response.data.wedding_date = cutomdate(response.data.wedding_date, 'dd/mm/yyyy')
        $.each(response.data, function (k, v) {
            var x = $(document).find("#d_" + k);
            if (x.length > 0) {
                x.html(v);
            }
        })
        if (data.marriage_logo) $(document).find('#profile_pic').css('background', 'url(' + BASE_URL + data.marriage_logo + ')');
        if (data.is_dark) {
            $(document).find('#d_primary').addClass('primary-color');
        } else {
            $(document).find('#d_primary').addClass('white-color');
        }
        color = '#' + data.secondary_color.join(',#');
        // console.log(color)
        $(document).find('#d_secondory').css('background', 'linear-gradient(' + color + ')');
        var bannerhtml = '';
        $.each(data.banner, function (k, v) {
            bannerhtml += banner(v);
        })
        // console.log(bannerhtml);
        $(document).find('#banner_display').html(bannerhtml);
        // alert();
        if (!data.is_approve_post) {
            $(document).find("#approve_image").hide();

        } else {
            $(document).find("[name=is_approve_post]").prop("checked", true);
            $(document).find("#approve_image").show();
        }


        if (!data.is_guests_id_proof) {
            $(document).find("#cllect_id_proof").hide();
        } else {
            $(document).find("[name=is_guests_id_proof]").prop("checked", true);
            $(document).find("#cllect_id_proof").show();
        }
        // console.log(html,printHtml);
        $.each(data, function (k, v) {
            var x = $(document).find('[name=' + k + ']')
            // console.log(x);
            if (x) {
                if (k == "wedding_date") {
                    if (v != null) v = cutomdate(v, "yyyy-mm-dd")
                    // console.log(v)
                }
                if (x.val() == "")
                    x.val(v);
            }
            // if (v.name == 'secondary_color') {
            //     data[v.name] = v.value.split("|")
            // } else {
            //     data[v.name] = v.value;
            // }

        })
    }

}

home();

function add_image() {
    var formData = new FormData();
    datfrom = $(document).find('#wardrobe_image')
    formData.append('banner', datfrom[0].files[0]);
    formData.append('marriage_id', id);
    // console.log(datfrom[0].files[0]);
    //
    let settingclon = settings;
    settingclon.processData = false
    settingclon.contentType = false
    delete settingclon.headers
    settingclon.mimeType = "multipart/form-data"
    settingclon.url = BASE_URL + 'update_marriage'
    settingclon.data = formData
    settingclon.success = function (response) {
        // console.log(response);
        response = JSON.parse(response);
        $("#exampleModal1").modal('toggle');
        hiddmodel()
        $("#image_wardrode_form")[0].reset()
        printHome(response)
    }
    $.ajax(settingclon);
    settings.headers = {
        "Content-Type": "application/json"
    }
}

// $(document).on('shown.bs.modal', '.modal', function () {
//     alert();
// });
$(document).on('click', '#image_save_btn', function () {
    add_image()
})


function getnotification() {
    settings.url = BASE_URL + 'get_all_notification_for_marriage';
    settings.data = JSON.stringify({marriage_id: id});
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            data = response.data;
            var htmltag = $(document).find('#notification_id');
            var html = '';
            $.each(data, function (k, v) {
                html += notificaion_details(v);
            })
            htmltag.html(html);
        }
    });
}

getnotification();

function gallerycount() {
    settings.url = BASE_URL + 'get_feed_count';
    settings.data = JSON.stringify({marriage_id: id});
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            $(document).find("#approvecount").html(response.data.approved_feed)
            $(document).find("#rejectcount").html(response.data.rejected_feed)
            $(document).find("#totalcount").html(response.data.all_feed)
        }
    });
}

gallerycount();

function getallevent() {
    settings.url = BASE_URL + 'get_all_event';
    settings.data = JSON.stringify({marriage_id: id});
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            data = response.data;
            var htmltag = $(document).find('#event_display');
            var html = '';
            var selectevent = `<li>
                        <a  class="active">All</a>
                    </li>`;
            $.each(data, function (k, v) {
                html += eventdi(v);
                selectevent += `<li>
                        <a data-id="${v.event_id}" >${v.event_name}</a>
                    </li>`;
            })
            htmltag.html(html);
            $(document).find('.gallery-menu ul').html(selectevent);
        }
    });
}

getallevent()
let eventid = '';

function get_images_by_event(event_id = null) {
    eventid = event_id;
    // event_id = eventid;
    settings.url = BASE_URL + 'get_gallery';
    settings.data = JSON.stringify({marriage_id: id, event_id: event_id});
    // console.log(settings);
    settings.headers = {
        "Content-Type": "application/json"
    }
    $.ajax(settings).done(function (response) {
        // console.log(response);
        if (typeof response == 'string') response = JSON.parse(response);
        if (getresopncesuccess(response)) {

            var html = '';
            var htmltag = $(document).find('#gallery_image');
            $.each(response.data, function (k, v) {
                html += gallry_image(v);
            })
            htmltag.html(html);
        }
    });
}

get_images_by_event();

$(document).on("click", ".gallery-menu ul li a", function () {
    $('.gallery-menu ul li a').removeClass('active');
    $(this).addClass('active');
    get_images_by_event($(this).data('id'))
})

function remove_gellery(gid) {
    settings.url = BASE_URL + 'delete_gallery';
    settings.data = JSON.stringify({gallery_id: gid});
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            get_images_by_event(eventid)
        }
    });
}

$(document).on("click", ".dalete-gellery", function () {
    if (confirm('Are you sure to remove?')) remove_gellery($(this).data('id'));
})

function remove_banner(gid) {
    settings.url = BASE_URL + 'remove_banner_image';
    settings.data = JSON.stringify({marriage_id: id, banner_image: gid});
    $.ajax(settings).done(function (response) {
        // if (getresopncesuccess(response)) {
        printHome(response)
        // }
    });
}

$(document).on("click", ".banner-remove", function () {
    if (confirm('Are you sure to remove?')) remove_banner($(this).data('id'));
})

async function add_gallery() {
    if (eventid == '') {
        alert("Please select event");
        return false;
    }
    var formData = new FormData();
    datfrom = $(document).find('#image_gallery')
    formData.append('gallery_image', datfrom[0].files[0]);
    formData.append('marriage_id', id);
    formData.append('event_id', eventid);
    // console.log(datfrom[0].files[0]);
    //
    let settingclon = settings;
    settingclon.processData = false
    settingclon.contentType = false
    delete settingclon.headers
    delete settings.success
    delete settingclon.success
    settingclon.mimeType = "multipart/form-data"
    settingclon.url = BASE_URL + 'add_gallery'
    settingclon.data = formData
    // settingclon.success = await
    await $.ajax(settingclon).done(function (response) {
        // console.log(response);

        response = JSON.parse(response);
        getresopncesuccess(response)
        $("#exampleModal2").modal('toggle');
        hiddmodel()
        $("#image_gallery_form")[0].reset()
        get_images_by_event(eventid)

    });

}

function hiddmodel() {
    setTimeout(function () {
        $('body').css('overflow', 'auto');


    }, 3000);
}

// $(document).on('shown.bs.modal', '.modal', function () {
//     alert();
// });
$(document).on('click', '#gallery_save_btn', function () {
    add_gallery()
})

$(document).on('change', '.dress_code_switch', function () {

    $(document).find('#d_c').toggle('d-none')
})

$(document).on('change', '.colorpikar', function () {
    var clr = $(this).val()
    $(this).css('background', clr);
    $(document).find('#id_event_tagline').attr('style', 'color:' + clr + ' !important');
})


function guest_list(status = null) {
    settings.url = BASE_URL + 'get_all_guest_details';
    var x = {marriage_id: id};
    if (status != null) {
        x.guest_status = status
    }
    settings.data = JSON.stringify(x);
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            var html = '';
            var htmltag = $(document).find('#display_gest');
            $.each(response.data, function (k, v) {
                html += gestrow(v);
            })

            htmltag.html(html);
        }
    });
}

guest_list();

function changests(gest_id, sts) {
    var status = 'Rejected'
    if (sts) {
        status = 'Approved';
    }

    settings.url = BASE_URL + 'get_all_guest_details';
    var x = {
        marriage_id: id, guest_id: gest_id, guest_status: status
    };
    settings.data = JSON.stringify(x);
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            $(document).find("#gest" + gest_id).html(`<span class="my-3 d-block">${status}</span>`);
        }
    });
}

$(document).on('click', '.reject_gest', function () {

    var gest_id = $(this).data('id')
    changests(gest_id, false)
})
$(document).on('click', '.approve_gest', function () {

    var gest_id = $(this).data('id')
    changests(gest_id, true)
})
$(document).on('submit', '#event_data', function (e) {
    e.preventDefault()
    add_event()

})

function add_event() {
    var that = $(document).find('#event_data');
    var frm = that.serializeArray();
    var data = {marriage_id: id};
    $.each(frm, function (k, v) {
        data[v.name] = v.value;
    })
    settings.data = JSON.stringify(data);
    // console.log(data);
    settings.url = BASE_URL + "add_new_event"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            that.reset();
            getallevent();
        }
    });
}

function addmrg() {
    var that = $(document).find('#add_mrg_from');
    var frm = that.serializeArray();
    var data = {marriage_id: id};
    $.each(frm, function (k, v) {
        if (v.name == 'secondary_color') {
            // data[v.name] = v.value.split("|")
        } else {
            data[v.name] = v.value;
        }

    })
    settings.data = JSON.stringify(data);
    // console.log( data);
    settings.url = BASE_URL + "update_marriage"
    //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            document.location.reload();
        }
    });
}

$(document).on('click', '#save_btn', function () {
    addmrg();
});


function sendnoti() {
    var that = $(document).find('#add_noti_from');
    var frm = that.serializeArray();
    var data = {marriage_id: id};
    $.each(frm, function (k, v) {

        data[v.name] = v.value;

    })
    settings.data = JSON.stringify(data);
    // console.log( data);
    settings.url = BASE_URL + "add_notification"
    //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            $("#exampleModal4").modal('toggle');
            hiddmodel()
            $("#add_noti_from")[0].reset()
        }
    });
}

$(document).on('click', '#save_btn_notification', function () {
    sendnoti();
});

function add_invi() {
    var formData = new FormData();
    datfrom = $(document).find('#invitation_card')
    formData.append('invitation_card', datfrom[0].files[0]);
    formData.append('marriage_id', id);
    // console.log(datfrom[0].files[0]);
    //
    let settingclon = settings;
    settingclon.processData = false
    settingclon.contentType = false
    delete settingclon.headers
    settingclon.mimeType = "multipart/form-data"
    settingclon.url = BASE_URL + 'update_marriage'
    settingclon.data = formData
    settingclon.success = function (response) {
        // console.log(response);
        response = JSON.parse(response);
        $("#exampleModal5").modal('toggle');
        hiddmodel()
        $("#invitation_card")[0].reset()
        printHome(response)
    }
    $.ajax(settingclon);
    settings.headers = {
        "Content-Type": "application/json"
    }
}

// $(document).on('shown.bs.modal', '.modal', function () {
//     alert();
// });
$(document).on('click', '#invitation_card_Save', function () {
    add_invi()
})