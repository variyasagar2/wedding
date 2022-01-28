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
        // console.log(response.data)
        let data = response.data
        response.data.wedding_date = cutomdate(response.data.wedding_date, 'dd/MM/yyyy')
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
        if (!data.is_approve_post) {
            $(document).find("#approve_image").hide();
        } else {
            $(document).find("#approve_image").show();
        }

        if (!data.is_guests_id_proof) {
            $(document).find("#cllect_id_proof").hide();
        } else {
            $(document).find("#cllect_id_proof").show();
        }
        // console.log(html,printHtml);
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
        ;$('.modal-backdrop').hide();
        $('body').removeAttr('style');
        $("#image_wardrode_form")[0].reset()
        printHome(response)
    }
    $.ajax(settingclon);
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

function get_images_by_event(event_id = null) {
    settings.url = BASE_URL + 'get_gallery';
    settings.data = JSON.stringify({marriage_id: id, event_id: event_id});
    $.ajax(settings).done(function (response) {
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