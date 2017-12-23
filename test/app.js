function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
var json = {
    "no": {
        "production": {
            "hardware-revision": "132",
            "serial": "D14C",
            "vendor": "Intel Corporation",
            "modem-lan-ip": "192.168.100.1",
            "modem-lan-mask": "255.255.255.0",
            "rf-mac-address": "00-50-F1-12-D1-4C",
            "lan-mac-address": "00-50-F1-10-D1-4C",
            "model-name": "16 - BOARD_CONFIG_PUMA6_MG_24DS_MXL267",
            "software-version": "NA"
        },
        "phystatus": {
            "enabled": "YES",
            "frequency": "523.000000 MHz",
            "qam-mode": "256 QAM",
            "annex": [
                "ANNEX-A (Euro)",
                "I=12, J=17"
            ],
            "mse": "-44.626 dB",
            "rf-agc": "0.000 [dB]  ( ATTN = 0, RL = 0, DNC = 0 )",
            "magc": "1.494",
            "fagc": "0.844",
            "cw-error-rate": "5.67e-07",
            "qam-lock": "YES",
            "fec-sync": "YES",
            "mpeg-sync": "YES",
            "carrier-offset": "7044.621 Hz",
            "timing-offset": "-17.45 ppm",
            "burst-counter": "86",
            "reported-power": "1.2000 dBmv"
        },
        "version": {
            "image-name": "dgwsdk_5.0.0.41-161117_ubfi.img",
            "image-version": "5.0.0.41",
            "image-date": "20161117110539"
        },
        "devs": {
            "rx-unicast-packets": "81831",
            "rx-broadcast-packets": "0",
            "rx-multicast-packets": "0",
            "rx-bytes": "90176895",
            "rx-discards": "0",
            "tx-unicast-packets": "54642",
            "tx-broadcast-packets": "0",
            "tx-multicast-packets": "0",
            "tx-bytes": "5464435",
            "tx-errors": "0",
            "tx-discards": "0"
        },
        "cpe-list": {
            "mac-address": "f8:16:54:f3:67:4a",
            "ip-address": "192.168.2.10",
            "host-name": "sanctum-PC"
        }
    },
    "wifi": {
        "access-point": {
            "ssid": "SANCTUM_21_2",
            "frequency": "5.745 GHz",
            "mac-address": "00:03:7F:44:69:CB",
            "bit-rate": "216.7 Mb/s",
            "noise": "-95 dBm"
        },
        "neighbor": {
            "mac-address": "00:03:7F:40:0C:51",
            "ssid": "SANCTUM_21_5",
            "frequency": "5.2 GHz",
            "signal": "-9 dBm",
            "noise": "-95 dBm"
        },
        "radio-stats": {
            "wifi-eth-name": "wifi0",
            "mac-ap": "00:03:7F:44:69:CB",
            "tx-data-pkts": "0",
            "tx-data-bytes": "0",
            "rx-data-pkts": "1446",
            "rx-data-bytes": "102386",
            "tx-uni-data-pkts": "0",
            "tx-mul-broad-data-pkts": "0",
            "channel-utilization": "&lt;DISABLED&gt;",
            "tx-beacon-frame": "1582195",
            "tx-mgmt-frames": "1592255",
            "rx-mgmt-frames": "31310",
            "rx-rssi": "43",
            "rx-phy-errors": "1336",
            "rx-crc-errors": "83639",
            "rx-mic-errors": "0",
            "tx-decrypt-errors": "0",
            "rx-errors": "0",
            "tx-failures": "294",
            "throughput-kbps": "&lt;DISABLED&gt;",
            "pkt-error-rate": "&lt;DISABLED&gt;",
            "total-pkt-error-rate": "0"
        },
        "vap-stats": {
            "ath-name": "ath0",
            "mac-ap": "00:03:7F:44:69:CB",
            "tx-data-pkts": "0",
            "tx-data-bytes": "0",
            "rx-data-pkts": "1446",
            "rx-data-bytes": "102386",
            "tx-uni-data-pkts": "0",
            "rx-uni-data-pkts": "1436",
            "tx-mul-broad-data-pkts": "0",
            "rx-mul-broad-data-pkts": "10",
            "avg-tx-rate-kbps": "0",
            "avg-rx-rate-kbps": "24697",
            "pkts-drop": "292",
            "pkts-error": "292",
            "rx-error": "0",
            "rx-dropped": "0",
            "tx-failures": "292",
            "tx-dropped": "292",
            "host-discard": "0",
            "rx-MIC-errors": "0",
            "last-tx-rate-uni-pkts": "0",
            "last-tx-rate-uni-pkts-mcs": "0",
            "last-tx-rate-multi-pkts": "0"
        },
        "device-stats": {
            "mac-address": "ac:5f:3e:02:e9:07",
            "mac-ap": "00:03:7F:44:69:CB",
            "tx-data-pkts": "0",
            "tx-data-bytes": "0",
            "rx-data-pkts": "1446",
            "rx-data-bytes": "102386",
            "tx-uni-data-pkts": "452",
            "avg-tx-rate-kbps": "0",
            "avg-rx-rate-kbps": "24697",
            "last-tx-rate": "0",
            "last-rx-rate": "0",
            "rx-mic-errors": "0",
            "rx-decrypt-errors": "0",
            "rx-errors": "0",
            "pkts-queued": "0",
            "host-discard": "0",
            "tx-failures": "0",
            "rx-rssi": "34"
        }
    }
};
var newJson = {};

for(level in json){
    var newLevel = newJson[level] = {};
    var levelObj = json[level];
    for(table in levelObj){
        var newObj = { fields:{} };
        var newTable = newLevel[table.split('-').join('_')] = newObj;
        newTable = newTable.fields;
        var tableObj = levelObj[table];
        var primaryKey = [];
        for (field in tableObj){
            if(primaryKey.length == 0){
                primaryKey.push(field.split('-').join('_'));
                newObj.primaryKey = primaryKey;
            }
            var data = tableObj[field];
            var dataType = isNumber(data);
            if(dataType){
                if(data.split('.').length == 1){
                    dataType = 'int';
                }else if(data.split('.').length < 1){
                    dataType = 'float';
                }else{
                    dataType = 'text';
                }
            }else{
                dataType = 'text';
            }
            newTable[field.split('-').join('_')] = {
                sample:data,
                type:dataType
            };
        }
    }
}

const fs = require('fs');
const path = require('path');

var src = './sample.json';
fs.truncate(src, 0, function() {
    fs.writeFile(src, JSON.stringify(newJson,null,2), function (err) {
        if(err){
            return console.log("Error writing file: " + err);
        }
    });
});