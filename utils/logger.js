// console.log helper
module.exports = (service, msg) => {
  let name;
  let pid;
  if (service.name !== undefined) {
    name = service.name;
    pid = service.process.pid;
  } else {
    name = 'master';
    pid = process.pid;
  }
  console.log(`[${name} @ ${pid}] ${msg}`);
};
