checkLogin(null, true);

$(document).find('.main-section').hide();

function home() {
    settings.url = BASE_URL + 'get_single_marriages';

    settings.data = settings.data = JSON.stringify({marriage_id: id});
    $.ajax(settings).done(function (response) {
        $('#loader2').show()

        printHome(response)
    });
}

var gallery

function printHome(response) {
    if (getresopncesuccess(response)) {
        // console.log(response.data)
        let data = response.data
        var ht1 = ''
        if (data.invitation_card.length > 0) {
            $.each(data.invitation_card, function (k, v) {
                ht1 += `<li><img src="${BASE_URL + v}" alt="Picture 1"></li>`
            })
        }

        $(document).find("#count_inv").html(data.invitation_card.length + " Invitations");
        $(document).find("#images").html(ht1);

        var glry = document.getElementById('images');

        if (!data.is_dark) $(document).find('body').addClass('body-light')
        $(document).find('.main-section').show();
        $('#loader2').hide()
        var date = response.data.wedding_date;
        response.data.wedding_date = cutomdate(response.data.wedding_date, 'dd/mm/yyyy')
        $.each(response.data, function (k, v) {
            var x = $(document).find("#d_" + k);
            if (x.length > 0) {
                x.html(v);
            }
        })
        if (data.marriage_logo) $(document).find('#profile_pic').css('background', 'url(' + BASE_URL + data.marriage_logo + ')'); else $(document).find('#profile_pic').css('background', 'url(data:image/jpeg;base64,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)');
        if (data.is_dark) {
            $(document).find('#d_primary').addClass('primary-color');
            $(document).find('#sample1 dt a b').addClass('dark');
        } else {
            $(document).find('#d_primary').addClass('white-color');
            $(document).find('#sample1 dt a b').addClass('white')
        }
        color = "#" + data.secondary_color.join(',#');
        // console.log(color)
        $(document).find('#d_secondory').attr('style', 'background:linear-gradient(' + color + ') !important');
        $('head').append(`<style>.secondary1:before{background:linear-gradient( ${color} ) !important;}</style>`);

        var bannerhtml = '';
        $.each(data.banner, function (k, v) {
            bannerhtml += banner(v);
        })
        if (bannerhtml == "") bannerhtml = `<h5 class="notfound">Data not found!</h5>`;
        // console.log(bannerhtml);
        $(document).find('#banner_display').html(bannerhtml);

        // alert();
        if (!data.is_approve_post) {
            $(document).find("#approve_image1").prop("checked", false);

        } else {
            $(document).find("[name=is_approve_post]").prop("checked", true);
            $(document).find("#approve_image1").prop("checked", true);
        }


        if (!data.is_guests_id_proof) {
            $(document).find("#cllect_id_proof1").prop("checked", false);
        } else {
            $(document).find("[name=is_guests_id_proof]").prop("checked", true);
            $(document).find("#cllect_id_proof1").prop("checked", true);
        }
        // console.log(html,printHtml);        $(document).find('[name=wedding_date]').val(data.wedding_date);
        data.wedding_date = cutomdate(date, 'yyyy-mm-dd')
        $.each(data, function (k, v) {
            var x = $(document).find('[name=' + k + ']')
            // console.log(x);
            if (x) {
                if (x.attr("type") == 'checkbox') {
                    x.prop("checked", true);
                }

                if (x.attr("type") != 'file') {
                    if (k != "invitation_card" && k != "is_approve_post" && k != "is_guests_id_proof") {
                        x.val(v);

                    }
                }
            }


        })
        $(document).find('.is_approve_post[type=hidden]').val(false)
        $(document).find('.is_approve_post[type=checkbox]').val(true)
        $(document).find('.is_guests_id_proof[type=hidden]').val(false)
        $(document).find('.is_guests_id_proof[type=checkbox]').val(true)
    }

}

home();

function add_image() {
    var formData = new FormData();
    datfrom = $(document).find('#wardrobe_image')
    if (!datfrom[0].files[0]) {
        alert("Please select image");
        return false;
    }
    $.each(datfrom[0].files, function (k, v) {
        formData.append('banner', v);
    })

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
            if (html == "") html = `<h5 class="notfound">Data not found!</h5>`;
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
            $(document).find("#approvecount").html(response.data.pending_feed)
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
            if (html == "") html = `<h5 class="notfound">Data not found!</h5>`;
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
            if (html == "") html = `<h5 class="notfound">Data not found!</h5>`;
            htmltag.html(html);
        }
    });
    if (eventid == null) {
        $('#upload_event').hide();
    } else {
        $('#upload_event').show();
    }
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
    if (!datfrom[0].files[0]) {
        alert("Please select image!");
        return false;
    }
    $.each(datfrom[0].files, function (v, k) {
        formData.append('gallery_image', k);
    })
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


// $(document).on('shown.bs.modal', '.modal', function () {
//     alert();
// });
$(document).on('click', '#gallery_save_btn', function () {
    add_gallery()
})

$(document).on('change', '.dress_code_switch', function () {

    $(document).find('#d_c').toggle('d-none')
    $(document).find('.d_c').toggle('d-none')
})

$(document).on('change', '.colorpikar', function () {
    var clr = $(this).val()
    $(this).attr('style', 'background:' + clr + " !important");
    $(document).find('#id_event_tagline').attr('style', 'color:' + clr + ' !important');
    $(document).find('.id_event_tagline').attr('style', 'color:' + clr + ' !important');
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
            var aaa = 4;
            if ($(document).find('#cllect_id_proof1').prop('checked')) {
                aaa = 3
            }
            if (html == "") html = `<tr ><td colspan="${aaa}" class="text-center notfound">Data not found!</td></tr>`;
            htmltag.html(html);

            if (!$('#cllect_id_proof1').prop('checked')) {
                $('.cllect_id_proof').hide();
            }
        }
    });
}

guest_list();
$(document).on("change", "#marriage_gest", function () {
    var x = $(this).val();
    guest_list(x);
})

function changests(gest_id, sts) {
    var status = 'Rejected'
    if (sts) {
        status = 'Approved';
    }
    settings.url = BASE_URL + 'update_guest_status';
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
$(document).on('click', '.approveall_guest', function () {

    settings.url = BASE_URL + 'approve_all_guest';
    var x = {
        marriage_id: id
    };
    settings.data = JSON.stringify(x);
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            $(document).find("#marriage_gest").change();
        }
    });
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
        // console.log(v.name);
        if (v.name == 'event_tagline_color') {
            data[v.name] = v.value.toString().replace('#', '');
        } else data[v.name] = v.value;
    })
    data.dress_code = {
        for_men: data['dress_code[for_men]'],
        for_women: data['dress_code[for_women]'],
        outFit: data['dress_code[outFit]']


    };
    // console.log(data.is_dress_code)

    data.is_dress_code = data.is_dress_code == "true" ? true : false;
    if (data.is_dress_code == false) {
        data.dress_code = {
            for_men: "", for_women: "", outFit: ""
        };
    }
    delete data['dress_code[for_men]']
    delete data['dress_code[for_women]']
    delete data['dress_code[outFit]']
    settings.data = JSON.stringify(data);
    // console.log(settings.data)
    // return;
    settings.url = BASE_URL + "add_new_event"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            that[0].reset();
            $("#exampleModal").modal('toggle');
            hiddmodel()
            getallevent();
        }
    });
}

function addmrg() {
    var that = $(document).find('#add_mrg_from');
    var frm = that.serializeArray();
    var data = {marriage_id: id};
    var formData = new FormData();
    formData.append('marriage_id', id);
    $.each(frm, function (k, v) {
        if (v.name == 'secondary_color') {
            data[v.name] = v.value.split("|")
            formData.append(v.name, data[v.name]);
            // formData.append('secondary_color', v.value.split("|"));
        } else {
            data[v.name] = v.value;
            formData.append(v.name, v.value);
        }

    })
    let settingclon = settings;
    settingclon.processData = false
    settingclon.contentType = false
    delete settingclon.headers
    settingclon.mimeType = "multipart/form-data"
    settingclon.url = BASE_URL + 'update_marriage'
    settingclon.data = formData
    //
    $.ajax(settingclon).done(function (response) {
        response = JSON.parse(response);
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
            getnotification();
        }
    });
}

$(document).on('click', '#save_btn_notification', function () {
    if ($(document).find("[name=\"notification_title\"]").val() == "") {
        alert("Please enter notification title");
        return false;
    }
    if ($(document).find("[name=\"notification_body\"]").val() == "") {
        alert("Please enter notification title");
        return false;
    }
    sendnoti();
});

function add_invi() {
    var formData = new FormData();
    datfrom = $(document).find('#invitation_card')
    if (!datfrom[0].files[0]) {
        alert("Please select image!")
        return false;
    }
    $.each(datfrom[0].files, function (v, k) {
        formData.append('invitation_card', k);
    })
    // formData.append('invitation_card[]', datfrom[0].files);
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
        $("#image_nvi_form")[0].reset()
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

function getallwardrop() {
    settings.data = JSON.stringify({});
    // console.log( data);
    settings.url = BASE_URL + "get_all_wardrobe"
    //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            var html = '';
            $.each(response.data, function (k, v) {
                html += verbs(v);
            })
            if (html == "") html = `<h5 class="notfound">Data not found!</h5>`;
            $(document).find("#werboost").html(html)
            $(document).find("#werboost_id").html(html)
        }
    });
}

getallwardrop();

function upload_profile(formData) {
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
        if (getresopncesuccess(response)) {
            document.location.reload();
        }
    }
    $.ajax(settingclon);
    settings.headers = {
        "Content-Type": "application/json"
    }
}

$(document).on('change', "#profile", function () {
    //on change event
    formdata = new FormData();
    if ($(this).prop('files').length > 0) {
        file = $(this).prop('files')[0];
        formdata.append("marriage_logo", file);
        formdata.append("marriage_id", id);
        upload_profile(formdata)
    }
});

var x1 = 'All';

function getfeeds(u = 'All') {
    x1 = u
    settings.data = JSON.stringify({'marriage_id': id, feed_status: u});
    // console.log(data);
    settings.url = BASE_URL + "get_all_feeds_from_a_single_marriage"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            var html = '';
            $.each(response.data, function (x, v) {
                html += setImage(v);
            })
            if (html == "") html = `<h5 class="notfound">Data not found!</h5>`;
            $(document).find("#gest_details_glr").html(html);
        }
        $(document).find('[data-toggle="tooltip"]').tooltip({html: true});
    });
}

getfeeds();

$(document).on("click", ".feed_s", function () {
    var aa = $(this).data('id');
    $('.feed_s').removeClass("active");
    $(this).addClass('active');
    getfeeds(aa);
})

function delete_event(eid) {
    settings.url = BASE_URL + 'delete_event';
    settings.data = JSON.stringify({event_id: eid});
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            getallevent()
        }
    });
}

function update_event() {
    var that = $(document).find('#event_data_edit');
    var frm = that.serializeArray();
    var data = {marriage_id: id};
    $.each(frm, function (k, v) {
        // console.log(v.name);
        if (v.name == 'event_tagline_color') {
            data[v.name] = v.value.toString().replace('#', '');
        } else data[v.name] = v.value;
    })
    data.dress_code = {
        for_men: data['dress_code[for_men]'],
        for_women: data['dress_code[for_women]'],
        outFit: data['dress_code[outFit]']


    };


    data.is_dress_code = data.is_dress_code == "true" ? true : false;
    if (data.is_dress_code == false) {
        data.dress_code = {
            for_men: "", for_women: "", outFit: ""


        };
    }
    delete data['dress_code[for_men]']
    delete data['dress_code[for_women]']
    delete data['dress_code[outFit]']
    settings.data = JSON.stringify(data);
    console.log(settings.data)
    // return;
    settings.url = BASE_URL + "update_event"

    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            location.reload();
            // that[0].reset();
            // $("#exampleModal6").modal('toggle');
            // hiddmodel()
            // getallevent();
        }
    });
}

$(document).on("click", "#save_event_new", function (e) {
    // e.preventDefault();
    // alert();
    update_event();
})

$(document).on("change", "#cllect_id_proof1,#approve_image1", function () {
    var name = $(this).data('id');
    var xa = false;
    if ($(this).prop('checked') == true) {
        xa = true
    }
    var formData = new FormData();
    formData.append('marriage_id', id);
    formData.append(name, xa);
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
        if (getresopncesuccess(response)) {
            // document.location.reload();
        }
    }
    $.ajax(settingclon);

});

function scrollTop() {
    jQuery('html,body').animate({scrollTop: 0}, 0);
}

$(document).on("click", ".d-guest", function () {
    $(document).find('.main-con').hide();
    $(document).find('.superadmin').attr('style', "display:block !important");
    scrollTop();
});
$(document).on("click", ".back", function () {
    $(document).find('.main-con').show();
    $(document).find('.superadmin').attr('style', "display:none !important");
    $(document).find('.gallary-sec-main').attr('style', "display:none !important");
    $(document).find('.gall-show').attr('style', "display:none !important");
    scrollTop();
});
$(document).on("click", ".showfeeed", function () {
    var id = $(this).data('id')
    if (id) {
        $(document).find('.gall-show .feed_s[data-id="' + id + '"]').click();
        $(document).find('.main-con').hide();
        $(document).find('.superadmin').attr('style', "display:none !important");
        $(document).find('.gallary-sec-main').attr('style', "display:none !important");
        $(document).find('.gall-show').attr('style', "display:block !important");
    }
    scrollTop();
});
$(document).on("click", ".showimage", function () {
    var id = $(this).data('id')
    if (id) {
        $(document).find('.gallery-menu [data-id="' + id + '"]').click();
        $(document).find('.main-con').hide();
        $(document).find('.superadmin').attr('style', "display:none !important");
        $(document).find('.gall-show').attr('style', "display:none !important");
        $(document).find('.gallary-sec-main').attr('style', "display:block !important");
    }
    scrollTop();
});
$(document).on('click', "#count_inv", function () {
    console.log($(document).find('#images li img'))

    try {
        gallery.destroy();
    } catch (e) {
        console.log("E", e);
    }
    var glry = document.getElementById('images');
    gallery = new Viewer(glry)
    $(document).find('#images li img:first').click();
});
$(document).on("click", ".change_det", function () {
    update_feed_status($(this).data('id'), $(this).data('value'))

})

function update_feed_status(feedid, sts) {

    settings.data = JSON.stringify({'feed_id': feedid, feed_status: sts});
    // console.log(data);
    settings.url = BASE_URL + "update_feed_status"
    // //
    $.ajax(settings).done(function (response) {
        if (getresopncesuccess(response)) {
            getfeeds(x1);
        }
    });
}

