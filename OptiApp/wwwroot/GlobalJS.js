//var GlobalFunc = {

//    AjaxBegin: function () {
//        toastr.remove();
//        toastr.options = {
//            "closeButton": false,
//            "debug": false,
//            "newestOnTop": true,
//            "progressBar": true,
//            "preventDuplicates": false,
//            "onclick": null,
//            "showDuration": "300",
//            "hideDuration": "1000",
//            "timeOut": "50000",
//            "extendedTimeOut": "1000",
//            "showEasing": "swing",
//            "hideEasing": "linear",
//            "showMethod": "fadeIn",
//            "positionClass": "toast-bottom-right",
//            "hideMethod": "fadeOut"
//        };
//        toastr.info(sharedResource["Request is processing"], "Information");
//    },

//    AjaxSuccess: function (data, that, callback) {
//        $("body").removeClass("loading");
//        toastr.remove();
//        if (data.resultType === 0) {
//            toastr.options = {
//                "closeButton": false,
//                "debug": false,
//                "newestOnTop": false,
//                "progressBar": true,
//                "positionClass": "toast-bottom-right",
//                "preventDuplicates": false,
//                "onclick": null,
//                "showDuration": "300",
//                "hideDuration": "1000",
//                "timeOut": "4000",
//                "extendedTimeOut": "1000",
//                "showEasing": "swing",
//                "hideEasing": "linear",
//                "showMethod": "fadeIn",
//                "hideMethod": "fadeOut"
//            };
//            toastr.success(data.message, sharedResource["Success"]);

//        }
//        else {
//            var html = '<ul>';
//            if (data.hasOwnProperty("data")) {
//                for (var i = 0; i < data.data.length; i++) {
//                    html += '<li>' + data.data[i] + '</li>';
//                }
//                html += '</ul>';
//                GlobalFunc.ErrorDialog(html);

//            }
//            else {
//                GlobalFunc.ErrorDialog(data.message);
//            }
//        }

//        if (callback && typeof callback === "function") {
//            callback(data);
//        }
//    },

//    AjaxFailure: function (xhr, status, error) {
//        $("body").removeClass("loading");
//        toastr.remove();
//        toastr.options = {
//            "closeButton": false,
//            "debug": false,
//            "newestOnTop": true,
//            "progressBar": true,
//            "preventDuplicates": false,
//            "onclick": null,
//            "showDuration": "300",
//            "hideDuration": "1000",
//            "timeOut": "4000",
//            "extendedTimeOut": "1000",
//            "showEasing": "swing",
//            "hideEasing": "linear",
//            "showMethod": "fadeIn",
//            "positionClass": "toast-bottom-right",
//            "hideMethod": "fadeOut"
//        };
//        toastr.error(xhr.statusText, sharedResource["Error !!!"]);

//    },

//    //Form Validation
//    FormValidation: function (that) {
//        $this = that;
//        $.validator.unobtrusive.parse($this.closest('form'));
//        //$.validator.setDefaults({
//        //    ignore: ""
//        //});
//        if ($($this.closest('form')).valid()) {
//            return true;
//        }
//        return false;
//    },

//    Success: function () {
//    },

//    IndexGrid: function ($that, containerId, data) {
//        currentLocalizedJsonErrorMessage = (currentLocalizedJsonErrorMessage === "") || currentLocalizedJsonErrorMessage === null
//            ? GlobalFunc.GetCurrentLocalizedJsonMessage("ErrorMessage")
//            : currentLocalizedJsonErrorMessage;
//        var topLabel = sharedResource == null ? "Create" : sharedResource["create"];
//        if (data.hasOwnProperty("topLabel") &&
//            data.topLabel !== null &&
//            data.topLabel !== "" &&
//            data.topLabel !== "undefined") {
//            topLabel = data.topLabel;
//        }
//        var ajaxUpdateId = "#main-body";
//        var url = "/" + data.area + "/" + data.controller + "/" + (data.action === "" ? "GetIndex" : data.action);
//        var href = "/" + data.area + "/" + data.controller;
//        var module = $that.baseURI.split('/');
//        exitUrl = "/" + module[3] + "/Home/Index1";
//        var headerfilter = true;
//        var obj = {
//            height: ($(window).height() - $('.topbar').outerHeight() /*- $('.customFooter').outerHeight()*/ - 100),
//            editable: false,
//            resizable: true,
//            showTitle: false,
//            columnBorders: true,
//            pageModel: data.isApproval ? { type: "local", rPP: 50, rPPOptions: [10, 50, 100, 500, 1000] } : { type: "remote", rPP: 20, strRpp: "{0}" },
//            selectionModel: { type: 'row', mode: 'single' },
//            //scrollModel: { autoFit: true, lastColumn: 'none' },
//            collapsible: false,
//            wrap: false, hwrap: false,
//            numberCell: { show: true },
//            filterModel: headerfilter === "" ? { mode: 'OR' } : { on: true, mode: "AND", header: true },
//            title: "<b>" + data.title + "</b>"
//        };
//        var navigation = [{

//            title: sharedResource["action"], editable: false, width: 110, minWidth: 100, sortable: false, render:
//                function (ui) {
//                    var refText = "";
//                    if (data.customFilterJson.displayStatus == 2) // 2 = unapproved only
//                    {
//                        refText = refText + `<a href="${href}/Verify/${ui.rowData.id}?status=${ui.rowData.status}" data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='${sharedResource["verify"]}'><span class='icon ic-checkmark mr-2 ic-action'></span></a>`;
//                    }
//                    else {
//                        //  refText = refText + "<a href='" + href + "/Details/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Details'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M13.5 0h-9C3.7 0 3 .7 3 1.5v21c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-15L13.5 0zm6 22.5h-15v-21H12V9h7.5v13.5z'/></svg></span></a> ";
//                        if ($.inArray(8, data.userPermissions) !== -1) {
//                            refText = refText + "<a href='" + href + "/Details/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Details'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M13.5 0h-9C3.7 0 3 .7 3 1.5v21c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-15L13.5 0zm6 22.5h-15v-21H12V9h7.5v13.5z'/></svg></span></a> ";
//                        }
//                        //new or modify or undifined row with edit permission
//                        if ($.inArray(2, data.userPermissions) !== -1 && (ui.rowData.status === 0 || ui.rowData.status === 2 || ui.rowData.status === -1)) {
//                            if (!data.disableModifyAfterReject) {
//                                //refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET'   data-ajax-begin='GlobalFunc.ModifyCheck(xhr)'  data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";
//                                refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET'   data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)'  data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";

//                            }
//                        }
//                        //prevent modification if 'disableModifyAfterReject' is set to true.
//                        if ($.inArray(2, data.userPermissions) !== -1 && ui.rowData.status === 3) {
//                            if (!data.disableModifyAfterReject) {
//                                //refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body'  data-ajax-begin='GlobalFunc.ModifyCheck(xhr)' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";
//                                refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET'   data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)'  data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";

//                            }
//                        }
//                        //show delete delete btn for data with delete permission
//                        if ($.inArray(4, data.userPermissions) !== -1 && (ui.rowData.status === 0 || ui.rowData.status === 2 || ui.rowData.status === -1)) { //|| ui.rowData.status === 3)) {
//                            //if ((data.userPermissions.edit == true){ //&& (ui.rowData.status == 0 || ui.rowData.status == 2 || ui.rowData.status == 5)) {
//                            refText = refText + "<a href='" + href + "/Delete/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Delete'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M17.8 7.1H6.3c-1.2 0-2.2 1-2.2 2.2l1.2 12.5c0 1.2 1 2.2 2.2 2.2h9.2c1.2 0 2.2-1 2.2-2.2l1-12.5c0-1.2-.9-2.2-2.1-2.2zM9.1 20.2c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.9 0c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.8 0c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zM5.8 6.1L19 2.7c.7-.2 1.2-.9 1-1.7-.2-.7-.9-1.2-1.7-1l-4 1c-.4-.6-1.1-.8-1.8-.7l-1.6.4c-.7.3-1.2.9-1.2 1.6L5.1 3.4c-.7.2-1.2.9-1 1.7.2.7.9 1.1 1.7 1z' /> </svg> </span></a> ";
//                        }
//                        //prevent deletion if 'disableModifyAfterReject' is set to true.
//                        if ($.inArray(4, data.userPermissions) !== -1 && ui.rowData.status === 3) {
//                            if (!data.disableModifyAfterReject) {
//                                refText = refText + "<a href='" + href + "/Delete/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Delete'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M17.8 7.1H6.3c-1.2 0-2.2 1-2.2 2.2l1.2 12.5c0 1.2 1 2.2 2.2 2.2h9.2c1.2 0 2.2-1 2.2-2.2l1-12.5c0-1.2-.9-2.2-2.1-2.2zM9.1 20.2c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.9 0c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.8 0c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zM5.8 6.1L19 2.7c.7-.2 1.2-.9 1-1.7-.2-.7-.9-1.2-1.7-1l-4 1c-.4-.6-1.1-.8-1.8-.7l-1.6.4c-.7.3-1.2.9-1.2 1.6L5.1 3.4c-.7.2-1.2.9-1 1.7.2.7.9 1.1 1.7 1z' /> </svg> </span></a> ";
//                            }
//                        }
//                        //show modify button for verified data, only if approvedmodify permission is allowed
//                        if ($.inArray(5, data.userPermissions) !== -1 && (ui.rowData.status === 1)) {
//                            //refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true'  data-ajax-method='GET' data-ajax-complete='GlobalFunc.ModifyCheck(xhr)' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";
//                            refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET'   data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)'  data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";

//                        }
//                        //show delete button for verified data, only if approveddelete permission is allowed
//                        if ($.inArray(6, data.userPermissions) !== -1 && (ui.rowData.status === 1)) {
//                            refText = refText + "<a href='" + href + "/Delete/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-complete='GlobalFunc.ModifyAndDeleteCheck(xhr)' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Delete'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M17.8 7.1H6.3c-1.2 0-2.2 1-2.2 2.2l1.2 12.5c0 1.2 1 2.2 2.2 2.2h9.2c1.2 0 2.2-1 2.2-2.2l1-12.5c0-1.2-.9-2.2-2.1-2.2zM9.1 20.2c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.9 0c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.8 0c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zM5.8 6.1L19 2.7c.7-.2 1.2-.9 1-1.7-.2-.7-.9-1.2-1.7-1l-4 1c-.4-.6-1.1-.8-1.8-.7l-1.6.4c-.7.3-1.2.9-1.2 1.6L5.1 3.4c-.7.2-1.2.9-1 1.7.2.7.9 1.1 1.7 1z' /> </svg> </span></a> ";
//                        }
//                        ////After Reject don't allow modify and delete
//                        //if (parseInt(ui.rowData.status) == 3) {
//                        //if (!data.disableModifyAfterReject) {
//                        //refText = refText + "<a href='" + href + "/Modify/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' class='table-action-nav-btn btn-sm d-inline-block' title='Edit'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14.9 4l4.9 4.9L7.4 21.2l-4.9-4.9L14.9 4zm8.6-1.2L21.3.6c-.8-.8-2.2-.8-3.1 0l-2.1 2.1L21 7.6l2.4-2.4c.8-.7.8-1.7.1-2.4zM0 23.2c-.1.4.3.8.7.7l5.4-1.3-4.9-4.9L0 23.2z'/></svg></span></a> ";
//                        //refText = refText + "<a href='" + href + "/Delete/" + ui.rowData.id + "' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Delete'><span class='icon ic-plus mr-2 ic-action'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M17.8 7.1H6.3c-1.2 0-2.2 1-2.2 2.2l1.2 12.5c0 1.2 1 2.2 2.2 2.2h9.2c1.2 0 2.2-1 2.2-2.2l1-12.5c0-1.2-.9-2.2-2.1-2.2zM9.1 20.2c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.9 0c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zm3.8 0c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-9.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v9.8zM5.8 6.1L19 2.7c.7-.2 1.2-.9 1-1.7-.2-.7-.9-1.2-1.7-1l-4 1c-.4-.6-1.1-.8-1.8-.7l-1.6.4c-.7.3-1.2.9-1.2 1.6L5.1 3.4c-.7.2-1.2.9-1 1.7.2.7.9 1.1 1.7 1z' /> </svg> </span></a> ";

//                        //}
//                        //}
//                    }
//                    return refText;
//                }
//        }];
//        var approvalNavigation = [{
//            title: sharedResource == null ? "Description" : sharedResource["description"],
//            dataIndx: "controllerDescription",
//            dataType: "string",
//            editable: false,
//            width: 650,
//            minWidth: 100,
//            sortable: false,
//            filter: { type: 'textbox', condition: 'contain', listeners: ["keyup"] },
//            render:
//                function (ui) {
//                    var refText = `<a href='/${ui.rowData.area}/${ui.rowData.controller}?displaystatus=2' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Approve'>${ui.rowData.controllerDescription} (${ui.rowData.count})</a> `;

//                    return refText;
//                }
//        },
//        {
//            title: sharedResource["action"], editable: false, width: 110, minWidth: 100, sortable: false, render:
//                function (ui) {
//                    var refText = `<a href='/${ui.rowData.area}/${ui.rowData.controller}?displaystatus=2' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' class='table-action-nav-btn btn-sm d-inline-block' title='Approve'><span class='icon ic-checkmark mr-2 ic-action'></span></a> `;

//                    return refText;
//                }
//        }];
//        navigation = data.controller == 'Approval' ? approvalNavigation : navigation;
//        var mergedObj = $.merge(data.header, navigation);
//        obj.colModel = mergedObj;
//        tempData = [];
//        if (data.isApproval) {
//            $.ajax({
//                url: url,
//                async: false,
//                data: { displayStatus: 2, pq_rPP: 10000, pq_curPage: 1 },
//                success: function (dataJSON) {
//                    if (dataJSON && dataJSON.resultType === 0) {
//                        tempData = dataJSON.data.dataRow;
//                    }
//                    else {
//                        $body.removeClass("loading");
//                        toastr.options = {
//                            "closeButton": false,
//                            "debug": false,
//                            "newestOnTop": true,
//                            "progressBar": true,
//                            "preventDuplicates": false,
//                            "onclick": null,
//                            "showDuration": "300",
//                            "hideDuration": "1000",
//                            "timeOut": "4000",
//                            "extendedTimeOut": "1000",
//                            "showEasing": "swing",
//                            "hideEasing": "linear",
//                            "showMethod": "fadeIn",
//                            "positionClass": "toast-bottom-right",
//                            "hideMethod": "fadeOut"
//                        };
//                        toastr.error(sharedResource["Data Load Error"]);
//                    }
//                }
//            });
//            obj.dataModel = {
//                data: tempData
//            };

//        }
//        else {
//            obj.dataModel = {
//                postData: data.customFilterJson,
//                recIndx: "Id", //primary key
//                location: "remote",
//                dataType: "JSON",
//                method: "GET",
//                url: url,
//                error: function (e) {
//                    $body.removeClass("loading");
//                    toastr.options = {
//                        "closeButton": false,
//                        "debug": false,
//                        "newestOnTop": true,
//                        "progressBar": true,
//                        "preventDuplicates": false,
//                        "onclick": null,
//                        "showDuration": "300",
//                        "hideDuration": "1000",
//                        "timeOut": "4000",
//                        "extendedTimeOut": "1000",
//                        "showEasing": "swing",
//                        "hideEasing": "linear",
//                        "showMethod": "fadeIn",
//                        "positionClass": "toast-bottom-right",
//                        "hideMethod": "fadeOut"
//                    };
//                    toastr.error(sharedResource["Data Load Error"]);
//                },
//                getData: function (dataJSON) {
//                    if (dataJSON && dataJSON.resultType === 0) {
//                        return { curPage: dataJSON.data.curPage, totalRecords: dataJSON.data.totalRecords, data: dataJSON.data.dataRow };
//                    }
//                    else {
//                        $body.removeClass("loading");
//                        toastr.options = {
//                            "closeButton": false,
//                            "debug": false,
//                            "newestOnTop": true,
//                            "progressBar": true,
//                            "preventDuplicates": false,
//                            "onclick": null,
//                            "showDuration": "300",
//                            "hideDuration": "1000",
//                            "timeOut": "4000",
//                            "extendedTimeOut": "1000",
//                            "showEasing": "swing",
//                            "hideEasing": "linear",
//                            "showMethod": "fadeIn",
//                            "positionClass": "toast-bottom-right",
//                            "hideMethod": "fadeOut"
//                        };
//                        toastr.error(sharedResource["Data Load Error"]);
//                        return { curPage: 0, totalRecords: 0, data: [] };
//                    }
//                },
//            };
//        }
//        var myToolbarBtn = "";

//        exitBtn = `<a href=${exitUrl} id='IndexExit' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)'  class='btn btn-sm btn-danger el-icon custom-pq-btn'><span class='icon ic-close'></span>${sharedResource["Exit"]}</a>`;

//        if (!data.disableTopButton && data.action.toLowerCase() !== "verify" && data.controller.toLowerCase() !== "approval") {
//            createBtn = " <a href='" + href + "/Create' id='IndexCreate' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)' data-ajax-success='GlobalFunc.Success()' data-ajax-complete='GlobalFunc.Focus()'  class='btn btn-sm btn-series-a el-icon custom-pq-btn'><span class='icon ic-add mr-2'></span>" + topLabel + "</a>";
//            backToApprovalBtn = `<a href='/${module[3]}/approval?displaystatus=2' id='ApprovalBack' class='btn btn-primary btn-sm el-icon custom-pq-btn' data-ajax='true' data-ajax-method='GET' data-ajax-mode='replace' data-ajax-update='#main-body' data-ajax-failure='GlobalFunc.AjaxFailure(xhr, status, error)'><i class='icon ic-arrow-left' aria-hidden='true'></i> ${sharedResource["Back"]}</a>`;

//            var createOrBackBtn = "";
//            if (data.customFilterJson.displayStatus === 2 || $.inArray(0, data.userPermissions) === -1) {
//                createOrBackBtn = backToApprovalBtn;
//            }
//            else {
//                createOrBackBtn = createBtn;
//            }
//            myToolbarBtn = `<div class='btns-group'>${createOrBackBtn}&nbsp;&nbsp;${exitBtn}</div>`;

//        }
//        else {
//            myToolbarBtn = `<div class='btns-group'>${exitBtn}</div>`;

//        }

//        obj.toolbar = {
//            cls: "pq-toolbar-search",
//            items:
//                [
//                    { type: '<span class="table-title">' + data.title + '</span>' },
//                    { type: myToolbarBtn }
//                    //{ type: "<span style='margin:5px;'>Filter:</span>" },
//                    //{
//                    //    type: 'select', cls: "filterColumn",
//                    //    listeners: [{ 'change': filterhandler }],
//                    //    options: function (ui) {
//                    //        var CM = ui.colModel;
//                    //        var opts = [{}];
//                    //        for (var i = 0; i < CM.length; i++) {
//                    //            var column = CM[i];
//                    //            var obj = {};
//                    //            obj[column.dataIndx] = column.title;
//                    //            if (!(column.dataIndx == "Id" || column.dataIndx == "Status" || column.dataIndx == "StatusChgDate" || column.dataIndx == "Date" || column.dataIndx == "StatusChgUserName" || column.dataIndx == "UserName" || column.title == "Action")) {
//                    //                opts.push(obj);
//                    //            }
//                    //        }
//                    //        //opts[0];
//                    //        return opts;
//                    //    }
//                    //},
//                    //{ type: 'textbox', attr: 'placeholder="Enter your keyword"', cls: "filterValue", listeners: [{ 'change': filterhandler }] }
//                ],
//        };
//        var $grid = $(containerId).pqGrid(obj);
//        $grid.pqGrid("option", $.paramquery.pqGrid.regional['en']);
//        //$.paramquery.pqGrid.setDefaults($.paramquery.pqGrid.regional[locale]);
//        $grid.find(".pq-pager").pqPager("option", $.paramquery.pqPager.regional['en']);
//        colStatusChange();
//        function filterhandler(evt, ui) {
//            var $toolbar = $grid.find('.pq-toolbar-search'),
//                $value = $toolbar.find(".filterValue"),
//                value = $value.val(),
//                dataIndx = $toolbar.find(".filterColumn").val(),
//                filterObject;
//            if (dataIndx === "") {//search through all fields when no field selected.
//                filterObject = [];
//                var CM = $grid.pqGrid("getColModel");
//                for (var i = 0, len = CM.length; i < len; i++) {
//                    dataIndx = CM[i].dataIndx;
//                    filterObject.push({ dataIndx: dataIndx, value: value });
//                }
//            }
//            else {//search through selected field.
//                filterObject = [{ dataIndx: dataIndx, value: value }];
//            }
//            $grid.pqGrid("filter", { oper: 'replace', data: filterObject });
//        };
//        function colStatusChange() {

//            var status;
//            $('.pq-grid-table').find(".pq-col-status").each(function () {
//                var $this = $(this);
//                switch (parseInt($this.text())) {
//                    case -1:
//                        status = "Saved As Draft";
//                        break;
//                    case 0:
//                        status = "Newly Created";
//                        break;
//                    case 1:
//                        status = "Verified";
//                        break;
//                    case 2:
//                        status = "Modified";
//                        break;
//                    case 3:
//                        status = "Rejected";
//                        break;
//                    case 5:
//                        status = "Modify Request";
//                        break;
//                    case 6:
//                        status = "Delete Request";
//                        break;
//                }
//                $this.html(status);
//            });
//            $('.pq-grid-table').find(".pq-date").each(function () {

//                var $this = $(this);
//                var string = $this.text().split('T')[0];
//                $this.html(string);
//            });

//        };
//        $grid.on('keydown', '.filterValue', function (e) {

//            if (e.which === $.ui.keyCode.ENTER) {
//                e.stopImmediatePropagation();
//            }
//            else if (e.which === '40' || (e.which === '9' && !event.shiftKey)) { //down-arrow or tab key
//                e.preventDefault();
//                $(containerId).pqGrid("setSelection", null);
//                $(containerId).pqGrid("setSelection", { rowIndx: 0, focus: true });
//            }
//        });
//        $grid.ready(function (e) {
//            $grid.find('input').not(':hidden').first().focus();
//            $grid.find('input').attr('autocomplete', 'off');
//        });
//        $(containerId).pqGrid({
//            refresh: function (event, ui) {
//                colStatusChange();
//            }
//        });
//    },


//    //valid parameters for dialogSize -> "small", "medium", "large"
//    ErrorDialog: function (content, dialogSize, nextFocusId = null) {

//        var columnClass = 'medium';
//        if (dialogSize) {
//            columnClass = dialogSize;
//        }
//        $.confirm({
//            animateFromElement: false,
//            animation: 'scale',
//            columnClass: columnClass,
//            title: sharedResource['warning'],
//            content: content,
//            escapeKey: "Ok",
//            backgroundDismiss: true,
//            onClose: function () {
//                if (nextFocusId != null) { setTimeout(function () { $(nextFocusId).focus(); }, 300); }
//            },
//            closeOnEscape: true,
//            type: 'red',
//            typeAnimated: true,
//            closeIcon: true,
//            buttons: {
//                Ok: function () {
//                }
//            }
//        });
//    },

//    GenerateSimpleGrid: function (gridId, userOptions) {
//        var defaults = {
//            width: "auto", //flex
//            height: 200,
//            showTitle: false,
//            showHeader: true,
//            showTop: true,
//            showToolbar: false,
//            showBottom: true,
//            //Cell Content Wrap
//            wrap: false,
//            //Header Wrap
//            hwrap: false,
//            sortable: false,
//            editable: true,
//            resizable: false,
//            collapsible: false,
//            draggable: false, dragColumns: { enabled: false },
//            scrollModel: { autoFit: true },
//            numberCell: { show: false, resizable: true, title: "S.N.", minWidth: 50 },
//            colModel: [{ title: "Default Column", width: 100, dataType: "string", dataIndx: "id" }],
//            dataModel: { data: [{ id: "One" }, { id: "Two" }, { id: "Three" }] }
//        }
//        //Prepare Options
//        userOptions = userOptions || {};
//        var options = { ...defaults, ...userOptions };

//        return $(gridId).pqGrid(options);
//    },
   
//};

//var Toast = {
//    DefaultOptions: function () {
//        const defaultOptions = {
//            "closeButton": false,
//            "debug": false,
//            "newestOnTop": true,
//            "progressBar": true,
//            "preventDuplicates": true,
//            "onclick": null,
//            "showDuration": "300",
//            "hideDuration": "1000",
//            "timeOut": "4000",
//            "extendedTimeOut": "1000",
//            "showEasing": "swing",
//            "hideEasing": "linear",
//            "showMethod": "fadeIn",
//            "positionClass": "toast-bottom-right",
//            "hideMethod": "fadeOut"
//        };

//        return defaultOptions;
//    },
//    Error: function (msg, options) {
//        toastr.options = $.merge(Toast.DefaultOptions(), options || {});
//        toastr.error(msg, sharedResource["Error !!!"]);
//    },
//    Info: function (msg, options) {
//        toastr.options = $.merge(Toast.DefaultOptions(), options || {});
//        toastr.info(msg, sharedResource["Success"]);
//    },
//    Success: function (msg, options) {
//        toastr.options = $.merge(Toast.DefaultOptions(), options || {});
//        toastr.success(msg, sharedResource["Information"]);
//    }
//}