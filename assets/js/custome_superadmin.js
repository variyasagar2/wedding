$(document).ready(function () {
    checkLogin(null, true);
    let x;

    function get_all_marriages_ajax(value = '') {
        settings.data = JSON.stringify({text: value});
        settings.url = BASE_URL + "get_all_marriages"
        x = $.ajax(settings).done(function (response) {
            var printHtml = $(document).find('#mrg_details');
            var html = '';
            if (getresopncesuccess(response)) {
                // console.log(response.data)
                $.each(response.data, function (k, v) {
                    // console.log(k,v)
                    html += mrgHtml(k + 1, v);
                })
                $(printHtml).html(html);
                // console.log(html,printHtml);
            }
        });
    }

    get_all_marriages_ajax();
    $(document).on('keypress', '#serchmrg', function () {
        // console.log($(this).val());
        var that = this, value = $(this).val();
        if (x != null) x.abort();
        get_all_marriages_ajax(value);
    })

    function addmrg() {
        var that = $(document).find('#add_mrg_from');
        var frm = that.serializeArray();
        var data = {};
        $.each(frm, function (k, v) {
            if (v.name == 'secondary_color') {
                data[v.name] = v.value.split("|")
            } else {
                data[v.name] = v.value;
            }

        })
        settings.data = JSON.stringify(data);
        // console.log( data);
        settings.url = BASE_URL + "add_marriage_details"
        //
        $.ajax(settings).done(function (response) {
            if (getresopncesuccess(response)) {
                that.clear();
                // console.log(response.data)
                get_all_marriages_ajax();
            }
        });
    }

    $(document).on('click', '#save_btn', function () {
        addmrg();
    });

    function getallimage() {
        settings.data = JSON.stringify({});
        settings.url = BASE_URL + "get_all_wardrobe"
        $.ajax(settings).done(function (response) {
            if (getresopncesuccess(response)) {
                var wrdhrml = $(document).find("#wardrode-img");
                var html = '';
                $.each(response.data, function (k, v) {
                    html += htmlimg(v);
                })
                // console.log(html)
                wrdhrml.html(html);
            }
        })
    }

    getallimage();

    function dalatewar(id) {

        settings.data = JSON.stringify({wardrobe_ids: [id]});
        settings.url = BASE_URL + "delete_wardrobe"
        $.ajax(settings).done(function (response) {
            if (getresopncesuccess(response)) {
                getallimage();
            }
        });
    }

    $(document).on('click', '.wardrode-box .minus', function () {
        var id = $(this).data('id');
        if (confirm("Are you sure to remove?")) {
            dalatewar(id);
        }
    })

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

    function changests(id, sts, tht) {

        settings.data = JSON.stringify({marriage_id: id, is_active: sts});
        settings.url = BASE_URL + "update_marriage_is_active"
        $.ajax(settings).done(function (response) {
            if (getresopncesuccess(response)) {
            }
        });
    }

    $(document).on("change", ".ckbox", function () {
        var id = $(this).data('id');
        var sts = $(this).prop('checked')
        // alert($(this).prop('checked'))
        changests(id, sts, $(this))
    })
})
