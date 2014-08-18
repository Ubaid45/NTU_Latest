

        /**********************************************************************************************/
        /*                                                                                            */
        /*                                    SELECT AND UNSELECT ALL WEBSITES                        */
        /*                                                                                            */
        /**********************************************************************************************/


function checkWebsiteOnAddNew() {

    if (oTableWebsiteIds != "undefined" && $('input', oTableWebsiteIds.fnGetNodes()) != "") {
        var sdata = $('input', oTableWebsiteIds.fnGetNodes());
        if (document.getElementById("checkAllWeb").checked)
            sdata.attr('checked', 'checked');
        else 
            sdata.removeAttr('checked');
    }
}

            /**********************************************************************************************/
            /*                                                                                            */
            /*                                 SELECT AND UNSELECT ALL SUBSCRIBERS                        */
            /*                                                                                            */
            /**********************************************************************************************/


    function checkSubscriberOnAddNew() 
        {
            if (window.oTableSubscribersList != "undefined" && $('input', window.oTableSubscribersList.fnGetNodes()) != "") {
                var sdataSub = $('input', window.oTableSubscribersList.fnGetNodes());
                if (document.getElementById("checkAllSub").checked)
                    sdataSub.attr('checked', 'checked');
                    else 
                    sdataSub.removeAttr('checked');
                } 
    }

    function calc() {
        var totalData = $('input', oTableWebsiteIds.fnGetNodes());
        var count = 0;
        for (var i = 0; i < totalData.length; i++) {
            if (totalData[i].checked)
                count++;
        }
        if (count == totalData.length)
            document.getElementById("checkAllWeb").checked = true;
        else {
            document.getElementById("checkAllWeb").checked = false;
        }

    }

    function calcSub() {
        var totalData = $('input', window.oTableSubscribersList.fnGetNodes());
        var count = 0;
        for (var i = 0; i < totalData.length; i++) {
            if (totalData[i].checked)
                count++;
        }
        if (count == totalData.length)
            document.getElementById("checkAllSub").checked = true;
        else {
            document.getElementById("checkAllSub").checked = false;
        }

    }

                /**********************************************************************************************/
                /*                                                                                            */
                /*                  ON CHANGE COMPANY INFO, GET ALL WEBSITES THROUGH AJAX CALL                */
                /*                                                                                            */
                /**********************************************************************************************/


            $('#CompanyInfo').change(function () {
                var companyId = $("#CompanyInfo").val();
                if (companyId == "") {
                    $('#tblWebsiteInfo').dataTable().fnClearTable();
                    $('#tblWebsiteInfo').dataTable({
                        "oLanguage": {
                            "sZeroRecords": "No records to display"

                        },
                        "bDestroy": true,
                        "bJQueryUI": true
                    });
                    $('#tblWebsiteInfo').css("width", "100%");
                    $('#tblWebsiteInfo').css("margin-bottom", "0");
                    $("#checkAllWeb").hide();
                    return false;
                }
                $.ajax({
                    url: '../Ajax/GetAllWebsitesByCompanyId',
                    type: 'POST',
                    data: JSON.stringify({ companyId: companyId }),
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function () { $.showprogress(); },
                    success: function (msg) {
                        if (msg != null) {
                            $("#WebsiteInfoes").html("");
                            $('#tblWebsiteInfo').dataTable().fnClearTable();
                            var r = new Array(), j = -1;
                                for (var key = 0, size = msg.length; key < size; key++) {
                                    r[++j] = '<tr><td>';
                                    r[++j] = '<input type="checkbox" onclick="calc();" id ="' + msg[key]["WebsiteId"] + '"name ="' + msg[key]["WebsiteId"] + '" value="' + msg[key]["WebsiteId"] + '" />';
                                    r[++j] = '</td><td>';
                                    r[++j] = msg[key]["DomainName"];
                                    r[++j] = '</td></tr>';
                                }
                                $('#WebsiteInfoes').html(r.join(''));
                                $("#checkAllWeb").show();
                                //$('tblWebsiteInfo').dataTable().clear();
                                oTableWebsiteIds = $('#tblWebsiteInfo').dataTable({
                                    "iDisplayLength": 5,
                                    "aLengthMenu": [5, 10, 25, 50, 100],
                                    "sPaginationType": "full_numbers",
                                    "oLanguage": {
                                        "sZeroRecords": "No records to display"
                                        
                                    },
                                    "bDestroy": true,
                                    "bJQueryUI": true
                                });
                                $('#tblWebsiteInfo').css("width", "100%");
                                $('#tblWebsiteInfo').css("margin-bottom", "0");
                            }
                        
                        $.hideprogress();
                    
                    
                    },
                    error: function (x) {
                        alert("The call to the server side failed. " + x.responseText);
                        
                }
                });
                return true;
            });

            /**********************************************************************************************/
            /*                                                                                            */
            /*                  ON CHANGE COMPANY INFO, GET ALL WEBSITES THROUGH AJAX CALL                */
            /*                                                                                            */
            /**********************************************************************************************/


            $('#Companies_Reports').change(function () {
                $("#ddlWebsiteCD").html("");
                var companyId = $("#Companies_Reports").val();
                if (companyId == "") {
                    $('#ddlWebsiteCD-button>span').text('---No Website Available---');
                    return false;
                }
                $.ajax({
                    url: '../Ajax/GetAllWebsitesByCompanyId',
                    type: 'POST',
                    data: JSON.stringify({ companyId: companyId }),
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function () { $.showprogress(); },
                    success: function (msg) {
                        if (msg != null) {
                            if (msg.length == 0)
                                $('#ddlWebsiteCD-button>span').text('---No Website Available---');
                            else if (msg.length == 1) {
                                $('#ddlWebsiteCD-button>span').text(msg[0]["DomainName"]);
                                $('#ddlWebsiteCD').append('<option value="' + msg[0]["WebsiteId"] + '" >' + msg[0]["DomainName"] + '</option>');
                            }
                            else {
                                $('#ddlWebsiteCD-button>span').text('---Select One---');
                                $('#ddlWebsiteCD').append('<option value="0" >---Select One---</option>');
                                for (var i = 0; i < msg.length; i++)
                                    $('#ddlWebsiteCD').append('<option value="' + msg[i]["WebsiteId"] + '" >' + msg[i]["DomainName"] + '</option>');

                            }
                             }
                        $.hideprogress();
                    },
                    error: function (x) {
                        alert("The call to the server side failed. " + x.responseText);

                    }
                });
                return true;
            });

                /**********************************************************************************************/
                /*                                                                                            */
                /*                                     ADD TICKET                                             */
                /*                                                                                            */
                /**********************************************************************************************/

            $('#AddTeacher1').click(function () {
               
                $.ajax({
                    url: 'SaveAddedTicket',
                type: 'POST',
                data: JSON.stringify({
                    ticketSubject: ticketSubject,
                    ticketDescription: ticketDescription,
// ReSharper disable once UsageOfPossiblyUnassignedValue
                    fileName: fileName,
                    ticketPriority: ticketPriority,
                    ticketType: ticketType,
                    ticketDepartment: ticketDepartment,
                    companyInfo: companyInfo,
                    websiteInfo: websiteInfo,
                    ticketSubscriberList: ticketSubscriberList,
                    ticketSubjectType: ticketSubjectType,
                    ticketDeadline: ticketDeadline
                    
                }),
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () { $.showprogress(); },
                success: function (msg) {
                    $("#WrapperAddTicketDiv").slideUp();
                    $('#SubscribersList').dataTable().fnClearTable();
                    ReadTicketingData();
                    $.hideprogress();
                    $("html, body").animate({ scrollTop: 10 }, "fast");
                },
                error: function (x) {
                    alert("The call to the server side failed. " + x.responseText);
                   
                }
            });
            return true;
            });

            $('#AddTeacher2').click(function () {
                $("#Dialog").dialog({ modal: true, width: 600, height: 500, resizable: false,
                                   position: ["center", 100 - $(window).scrollTop()], title: "Email Report"
                                });
                $.ajax({
                    url: 'SaveAddedTicket',
                    type: 'POST',
                    data: JSON.stringify({
                        ticketSubject: ticketSubject,
                        ticketDescription: ticketDescription,
                        // ReSharper disable once UsageOfPossiblyUnassignedValue
                        fileName: fileName,
                        ticketPriority: ticketPriority,
                        ticketType: ticketType,
                        ticketDepartment: ticketDepartment,
                        companyInfo: companyInfo,
                        websiteInfo: websiteInfo,
                        ticketSubscriberList: ticketSubscriberList,
                        ticketSubjectType: ticketSubjectType,
                        ticketDeadline: ticketDeadline

                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function () { $.showprogress(); },
                    success: function (msg) {
                        $("#WrapperAddTicketDiv").slideUp();
                        $('#SubscribersList').dataTable().fnClearTable();
                        ReadTicketingData();
                        $.hideprogress();
                        $("html, body").animate({ scrollTop: 10 }, "fast");
                    },
                    error: function (x) {
                        alert("The call to the server side failed. " + x.responseText);

                    }
                });
                return true;


            });
            
            $('#ShowReport').click(function () {
                if ($("#ReportName").val() == "0") {
                    $("#ErrorLabel").text("Please Select Report");
                    $("html, body").animate({ scrollTop: 10 }, "fast");
                    return false;
                }
                if ($("#Companies_Reports").val() == "") {
                    $("#ErrorLabel").text("Please Select Company");
                    $("html, body").animate({ scrollTop: 10 }, "fast");
                    return false;
                }
                var websiteId = $("#ddlWebsiteCD").val();
                if (websiteId == null || websiteId == "0") {
                    $("#ErrorLabel").text("Please Select Website");
                    $("html, body").animate({ scrollTop: 10 }, "fast");
                    return false;
                }
                $("#ErrorLabel").text("");
                var toDate = $("#dtTo1").val();
                var fromDate = $("#dtFrom1").val();
                var reportName =$("#ReportName").val();
                $.ajax({
                    url: '../Reports/ShowReport',
                    type: 'POST',
                    data: {
                        websiteId: websiteId,
                        toDate: toDate,
                        fromDate: fromDate,
                        reportName: reportName
                    },
                    beforeSend: function () { $.showprogress(); },
                    success: function (msg) {
                        $('#ShowReportsTable').dataTable().fnClearTable();
                        if (msg != "no")
                            $("#ReportBody").html(msg);
                        $("#ReportsDiv").show();
                        $("#ShowReportsTable").dataTable({
                            "iDisplayLength": 5,
                            
                            "aLengthMenu": [5, 10, 25, 50, 100],
                            "sPaginationType": "full_numbers",
                            "oLanguage": {
                                "sZeroRecords": "No records to display"

                            },
                            "bDestroy": true,
                            "bJQueryUI": true,
                            "sDom": '<"H"Tlf>t<"F"ip>',
                            "oTableTools": {
                                "sSwfPath": "../../BusinessLayer/copy_csv_xls_pdf.swf",
                                "aButtons": [
                        "copy","xls", "pdf"
                           ]
                            }
                        });
                        $("#ShowReportsTable").css("width", "100%");
                        $.hideprogress();
                    },
                    error: function (x) {
                        alert("The call to the server side failed. " + x.responseText);

                    }
                });


            });
