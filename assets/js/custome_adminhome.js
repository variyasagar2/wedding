checkLogin(null, true);


function home() {
    settings.url = BASE_URL + 'get_single_marriages';

    settings.data = settings.data = JSON.stringify({marriage_id: id});
    ;
    $.ajax(settings).done(function (response) {
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
            if (data.marriage_logo)
                $(document).find('#profile_pic').css('background', 'url(' + BASE_URL + data.marriage_logo + ')');
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
            // console.log(html,printHtml);
        }
    });
}
home();

function add_image() {
    var formData = new FormData();
    datfrom = $(document).find('#wardrobe_image')
    formData.append('wardrobe_image', datfrom[0].files[0]);
    // console.log(datfrom[0].files[0]);
    //
    let settingclon = settings;
    settingclon.processData = false
    settingclon.contentType = false
    delete settingclon.headers
    settingclon.mimeType = "multipart/form-data"
    settingclon.url = BASE_URL + 'add_wardrobes'
    settingclon.data = formData
    settingclon.success = function (response) {

        $("#exampleModal1").modal('hide');
        $("#image_wardrode_form")[0].reset()
        getallimage();
    }
    $.ajax(settingclon);
}

$(document).on('click', '#image_save_btn', function () {
    add_image()
})