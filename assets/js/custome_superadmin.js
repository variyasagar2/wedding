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
        console.log($(this).val());
        var that = this, value = $(this).val();
        if (x != null) x.abort();
        get_all_marriages_ajax(value);
    })

    function addmrg() {
        var that = $(document).find('#add_mrg_from');
        var frm = that.serializeArray();
        var data = {};
        $.each(frm, function (k, v) {
            data[v.name] = v.value;
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
})
