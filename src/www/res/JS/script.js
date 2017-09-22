$(function () {
    window.handleOpenURL = function (url) {
        var ref = cordova.InAppBrowser.open(url.split('jste://')[1], '_self', 'location=yes');
    };
    $.get("http://0.0.0.0:5050/childModeStatus", function (data) {
        if (data == 'off') {
            $('#switch1').prop('checked', false);
        } else if (data == 'on') {
            $('#switch1').prop('checked', true);
        }
    });
    $.get("http://0.0.0.0:5050/adminPasswordStatus", function (data) {
        if (data == 'set') {
            $('#oldPasswordInput_container').show();
            document.changePage('login');
        } else if (data == 'not set') {
            $('#oldPasswordInput_container').hide();
            document.changePage('settings');
        }
    });
    $('#loginBtn').on('click', function () {
        sessionStorage.adminPassword = $('#adminPasswordInput').val();
        $.post('http://0.0.0.0:5050/adminPasswordVerification', {
            adminPassword: sessionStorage.adminPassword
        }).done(function (data) {
            if (data == 'You have been logged in successfuly ;)') {
                document.changePage('settings');
            } else if (data == 'Authentication failed :(') {
                alert(data);
            }
        });
    });
    $('#passwordSubmitForm').on('submit', function () {
        $.post($(this).attr('action'), $(this).serialize()).done(function (data) {
            alert(data)
        });
        return false;
    });
    $('#switch1').on('change', function () {
        if ($('#switch1').prop('checked') == false) {
            $.post('http://0.0.0.0:5050/childModeDeactivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#switch1').prop('checked', true);
                }
            });
        } else if ($('#switch1').prop('checked') == true) {
            $.post('http://0.0.0.0:5050/childModeActivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#switch1').prop('checked', false);
                }
            });
        }
    });
});