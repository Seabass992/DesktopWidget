'use strict'

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
global.os = os;
let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		minHeight: 500,
		minWidth: 500,
		center: true,
		titleBarStyle: 'hidden',
		backgroundColor: '#444'
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
});