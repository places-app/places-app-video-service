const cluster = require('cluster');
const downloader = require('./clusters/download');
const uploader = require('./clusters/upload');
const server = require('./clusters/server');
const log = require('../utils/logger.js');
const workers = {};

const masterJob = () => {
  log('master', 'started master');
  // http server
  const httpService = () => {
    // if http server is undefined
    if (workers.http === undefined) {
      // create http server
      const http = workers.http = cluster.fork({ ROLE: 'http' });
      http.name = 'http server';

      // have on online listener to log online
      http.on('online', () => {
        log(http, 'is online');
      });

      // have an on exit listener to restart it
      http.on('exit', () => {
        log(http, 'has died');
        delete workers.http;
      });

      // distribute msgs from http master to download worker
      // listen for msg from http worker
      http.on('message', (msg) => {
        log(http, `received msg ${JSON.stringify(msg)}`);
        // if msg.download
        if (msg.download) {
          // send to download worker
          workers.download.send(msg.download);
          log(http, 'http has sent msg to download service.');
        } else {
          // log unknown msg
          console.log('unrecognized msg received.');
        }
      });
    }
  };

  // download
  const downloadService = () => {
    // if downloader is undefined
    if (workers.download === undefined) {
      // create downloader
      const download = workers.download = cluster.fork({ ROLE: 'download' });
      download.name = 'download worker';
      // have on online listner to log online
      download.on('online', () => {
        log(download, 'is online');
      });
      // have an on exit listener to restart it
      download.on('exit', () => {
        log(download, 'has died');
        delete workers.download;
      });
      // listen for work msgs from download worker
      download.on('message', (msg) => {
        log(download, `download service received msg: ${JSON.stringify(msg)}`);
        if (msg.upload) {
          log(download, 'sending job to upload service.');
          workers.upload.send(msg.upload);
          log(download, `job sent to upload service: ${JSON.stringify(msg.upload)}`);
        }
      });
    }
  };

  // upload
  const uploadService = () => {
    // if uploader is undefined
    if (workers.upload === undefined) {
      // create uploader
      const upload = workers.upload = cluster.fork({ ROLE: 'upload' });
      upload.name = 'upload worker';
      // have on online listener to log online
      upload.on('online', () => {
        log(upload, 'is online');
      });
      // have on exit listener for uploader
      upload.on('exit', () => {
        log(upload, 'has died');
        delete workers.upload;
      });
      // listen for msgs from upload worker
      upload.on('message', (msg) => {
        log(upload, `upload service received msg: ${JSON.stringify(msg)}`);
      });
    }
  };

  // checkServices function
  const checkServicesLoop = () => {
    // invokes all three funcs above
    httpService();
    downloadService();
    uploadService();
  };

  // run checkServices on interval loop
  // this is to make sure service is brought back online if it's died
  setInterval(checkServicesLoop, 1000);
};


if (cluster.isMaster) {
  // invoke masterJob to create services
  masterJob();
} else {
  // if role download
  if (process.env.ROLE === 'download') {
    // require download service
    downloader();
  } else if (process.env.ROLE === 'upload') {
  // else if role upload
    // require upload service
    uploader();
  } else {
    server.start();
  }
}
