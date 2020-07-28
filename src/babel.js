const { Promise } = require("q");

async function start() {
  return await Promise.resolve('Babel is working')
}

start().then(console.log)