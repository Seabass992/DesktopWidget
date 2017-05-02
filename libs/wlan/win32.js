var child_process = require('child_process');
var os = require('os');
function GetWLanInterface() {
	var promise = new Promise((resolve, reject) => {
		child_process.exec('netsh wlan show interface', (err, stdout, stderr) => {
			if(err) reject(err);
			var props = {};
			var regex = /\s+(.+)\s+:\s+(.*)/g;
			var item;
			while(item = regex.exec(stdout))
				props[item[1].trim()] = item[2].trim();
			var wlanInter = new WLANInterface();
			wlanInter.name = props["Name"] || "";
			wlanInter.description = props["Description"] || "";
			wlanInter.GUID = props["GUID"] || "";
			wlanInter.physicalAddress = props["Physical address"] || "";
			wlanInter.state = props["State"] || "";
			wlanInter.SSID = props["SSID"] || "";
			wlanInter.BSSID = props["BSSID"] || "";
			wlanInter.networkType = props["Network type"] || "";
			wlanInter.radioType = props["Radio type"] || "";
			wlanInter.authentication = props["Authentication"] || "";
			wlanInter.cipher = props["Cipher"] || "";
			wlanInter.connectionMode = props["Connection mode"] || "";
			wlanInter.channel = props["Channel"]*1 || -1;
			wlanInter.receiveRate = props["Receive rate (Mbps)"]*1024*1024 || 0;
			wlanInter.transmitRate = props["Transmit rate (Mbps)"]*1024*1024 || 0;
			wlanInter.signal = (props["Signal"] || 0).replace('%','')*1;
			wlanInter.profile = props["Profile"] || "";
			resolve(wlanInter);
		});
	});
	
	return promise;
}

function WLANInterface() {
	this.name = "";
	this.description = "";
	this.GUID = "";
	this.physicalAddress = "";
	this.state = "";
	this.SSID = "";
	this.BSSID = "";
	this.networkType = "";
	this.radioType = "";
	this.authentication = "";
	this.cipher = "";
	this.connectionMode = "";
	this.channel = -1;
	this.receiveRate = 0.0;
	this.transmitRate = 0.0;
	this.signal = 0.0;
	this.profile = "";
}

module.exports.getWlanInterface = GetWLanInterface;