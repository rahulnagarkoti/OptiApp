
var GlobalFunc =
{
    AjaxBegin: function () {
        $.bootstrapGrowl("Processing ...");

        //$.notify("Processing ...", "info");
    },

    AjaxSuccess: function (data, that, callback) {
        $("body").removeClass("loading");
        toastr.remove();
        if (data.resultType === 0) {
            $.notify("Success ...", "success");
        }
        else {
            var html = '<ul>';
            if (data.hasOwnProperty("data")) {
                for (var i = 0; i < data.data.length; i++) {
                    html += '<li>' + data.data[i] + '</li>';
                }
                html += '</ul>';
                GlobalFunc.ErrorDialog(html);

            }
            else {
                GlobalFunc.ErrorDialog(data.message);
            }
        }

        if (callback && typeof callback === "function") {
            callback(data);
        }
    },

    AjaxFailure: function (xhr, status, error) {
        $("body").removeClass("loading");
        toastr.remove();
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "positionClass": "toast-bottom-right",
            "hideMethod": "fadeOut"
        };
        toastr.error(xhr.statusText, "Error !!!");

    },

    IndexGrid: function (divId, title, controller, colModel, url) {
        var createBtn = `<a href='${controller}/Create' id='IndexCreate' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)'   class='btn btn-sm btn-series-a el-icon custom-pq-btn'><span class='icon ic-add mr-2'></span>Add New</a>`;
        //var createBtn = "<a href='Customer/Create' id='IndexCreate' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' data-ajax-complete='GlobalFunc.Focus()'  class='btn btn-sm btn-series-a el-icon custom-pq-btn'><span class='icon ic-add mr-2'></span>Add New</a>";

        var myToolbarBtn = `<div class='btn btn-primary'>${createBtn}</div>`;

        var obj =
        {
            scrollModel: { pace: 'fast', autoFit: true, theme: true },
            collapsible: false,
            showHeader: true,
            showTitle: true,
            sorting:false,
            stripeRows: true,
            pageModel: { type: "local", rPP: 50, rPPOptions: [10, 50, 100, 500, 1000] },
            filterModel: { on: true, mode: "AND", header: true },
            title: title,
            selectionModel: { type: 'row', mode: 'single' },
            //width:"80%",
            //height:"80%",
            //showTop:false,
        };

        var data;
        $.ajax({
            url: url,
            async: false,
            success: function (res) {
                data = res;
            }
        });


        obj.dataModel =
        {
            data: data,
        };

        var navigation = [{
            title: "Action", editable: false, width: 150, align: "left", render: function (ui) {
                var text = `<a href='${controller}/Details/${ui.rowData.id}' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace'  data-ajax-update='#main-body' title='Details'> <span class='ui-icon ui-icon-document'></span></a>`
                text = `${text}<a href='${controller}/Edit/${ui.rowData.id}' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace'  data-ajax-update='#main-body' title='Edit'> <span class='ui-icon ui-icon-pencil'></span></a>`
                text = `${text}<a href='${controller}/DeleteView/${ui.rowData.id}' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace'  data-ajax-update='#main-body' title='Delete'> <span class='ui-icon ui-icon-trash'></span></a>`
                return text;
            }
        }];

        obj.colModel = $.merge(colModel, navigation);
        obj.toolbar = {
            cls: "pq-toolbar-search",
            items:
                [
                    { type: myToolbarBtn }
                ],
        };

        $(divId).pqGrid(obj);
        $(".pq-search-txt").attr("autocomplete", "no");
    },

    //notification
    Success: function ()
    {
        $.bootstrapGrowl("Success..", { type: 'success' });
    },

    Failure: function ()
    {
        $.bootstrapGrowl("Error!!", { type: 'danger' });

        //$.bootstrapGrowl("Danger, Error!!", {
        //    type: 'danger',
        //    align: 'right',
        //    width: 'auto',
        //    allow_dismiss: true
        //});
    }
}



