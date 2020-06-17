/**
 * 全局通用模块
 * @author HAVENT
 **/

var HH = HH || {};

HH.common = {

    ajaxGet: function (url, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response, textStatus, jqXHR) {
                //console.log(response);

                if (callback) callback(response);
            },
            fail: function (response, textStatus, jqXHR) {
                //console.log(response);

                if (callback) callback(response);
            },
            error: function (xhr, textStatus) {
                //console.log(xhr);

                if (callback) callback(xhr);
            }
        });
    },

    ajaxPost: function (url, params, callback) {
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(params),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response, textStatus, jqXHR) {
                //console.log(response);

                if (callback) callback(response);
            },
            fail: function (response, textStatus, jqXHR) {
                //console.log(response);

                if (callback) callback(response);
            },
            error: function (xhr, textStatus) {
                //console.log(xhr);

                if (callback) callback(xhr);
            }
        });
    }

};