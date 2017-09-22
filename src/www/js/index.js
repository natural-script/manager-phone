var inter = setInterval(function () {
  if (typeof jxcore == 'undefined')
    return;

  clearInterval(inter);

  jxcore.isReady(function () {

    jxcore('app.js').loadMainFile(function (ret, err) {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        window.handleOpenURL = function (url) {
          var ref = cordova.InAppBrowser.open(url.split('jste://')[1], '_self', 'location=yes');
        };
        cordova.plugins.backgroundMode.setDefaults({
          title: 'Jste Manager is running',
          text: 'Enjoy surfing all sites powered by Jste'
        });
        cordova.plugins.backgroundMode.on('activate', function () {
          cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
        cordova.plugins.autoStart.enable();
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.overrideBackButton();
        cordova.plugins.backgroundMode.excludeFromTaskList();
        cordova.plugins.backgroundMode.moveToBackground();
        location.href = "ui.html";
      }
    });
  });
}, 5);