define(function() {
    var config = {
        IPV6_SUPPORT: true,
        WIFI_BAND_SUPPORT: true,
        WIFI_BANDWIDTH_SUPPORT: true,
        AP_STATION_SUPPORT: true,
        WEBUI_TITLE: 'MF910 Mobile Hotspot',
		LOGIN_SECURITY_SUPPORT: true, //是否支持登录安全
		PASSWORD_ENCODE: true,//登录密码和WIFI密码是否加密,
        AUTO_MODES: [ {
            name: 'Automatic',
            value: 'NETWORK_auto'
        }, {
            name: '4G Only',
            value: 'Only_LTE'
        }, {
            name: '3G Only',
            value: 'Only_WCDMA'
        }, {
            name: '2G Only',
            value: 'Only_GSM'
        }]
    };

    return config;
});
