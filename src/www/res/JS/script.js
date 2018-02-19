$(function () {
    window.handleOpenURL = function (url) {
        var ref = cordova.InAppBrowser.open(url.split('jste://')[1], '_self', 'location=yes');
    };
    $.get("http://0.0.0.0:5050/childModeStatus", function (data) {
        if (data == 'off') {
            $('#childModeSwitch').prop('checked', false);
        } else if (data == 'on') {
            $('#childModeSwitch').prop('checked', true);
        }
    });
    $.get("http://0.0.0.0:5050/nudityDetectionStatus", function (data) {
        if (data == 'off') {
            $('#nudityDetectionSwitch').prop('checked', false);
        } else if (data == 'on') {
            $('#nudityDetectionSwitch').prop('checked', true);
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
    $('#childModeSwitch').on('change', function () {
        if ($('#childModeSwitch').prop('checked') == false) {
            $.post('http://0.0.0.0:5050/childModeDeactivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#childModeSwitch').prop('checked', true);
                }
            });
        } else if ($('#childModeSwitch').prop('checked') == true) {
            $.post('http://0.0.0.0:5050/childModeActivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#childModeSwitch').prop('checked', false);
                }
            });
        }
    });
    $('#nudityDetectionSwitch').on('change', function () {
        if ($('#nudityDetectionSwitch').prop('checked') == false) {
            $.post('http://0.0.0.0:5050/nudityDetectionDeactivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#nudityDetectionSwitch').prop('checked', true);
                }
            });
        } else if ($('#nudityDetectionSwitch').prop('checked') == true) {
            $.post('http://0.0.0.0:5050/nudityDetectionActivate', {
                adminPassword: sessionStorage.adminPassword
            }).done(function (data) {
                if (data == 'Authentication failed :(') {
                    $('#nudityDetectionSwitch').prop('checked', false);
                }
            });
        }
    });
});