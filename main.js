'use strict'

const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');
global.os = os;
let mainWindow;
let windows = [];

app.on('ready', () => {
	// mainWindow = new BrowserWindow({
	// 	minHeight: 500,
	// 	minWidth: 500,
	// 	center: true,
	// 	titleBarStyle: 'hidden',
	// 	backgroundColor: '#444'
	// });
	// mainWindow.loadURL('file:///C:\\Github\\node\\DesktopWidget\\\index.html');
	console.log(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	readWidgets().then(widgets => {
		windows.forEach((w, i) => {
			w.close();
			delete windows[i]
		});
		windows = [];
		console.log(widgets);
		widgets.forEach((w,i,arr) => {
			var browser = new BrowserWindow({
				frame: false,
				resizable: false,
				minimizable: false
			});

			browser.loadURL(w.url);
			console.log(w.url);
			if(windows[i] && windows[i] instanceof BrowserWindow) windows[i].close();
			windows[i] = browser;
		});
	}).catch(console.error);
});

function readWidgets() {
	var promise = new Promise((resolve, reject) => {
		fs.readFile('./widgets.json', "utf-8",function(err, data) {
			if(err) reject(err);
			try {
				var file = JSON.parse(data);
				resolve(file.widgets);
			} catch(e) {
				reject(e);
			}			
		})
	});

	return promise;
}