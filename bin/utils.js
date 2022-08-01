const exec = require('child_process').exec;
const util = require('util');


function templateNginx(domain, port, ip = "127.0.0.1") {
    return `server {
        listen 80;
        server_name ${domain};
        location / {
            proxy_set_header   X-Forwarded-For $remote_addr;
            proxy_set_header   Host $http_host;
            proxy_pass         http://${ip}:${port};     
        }
    }
    `
}

// function executeCommandLine(commandLine) {
//     const myShellScript = exec(commandLine);
//     myShellScript.stdout.on('data', (data) => {
//         console.log(data);
//         // do whatever you want here with data
//     });
//     myShellScript.stderr.on('data', (data) => {
//         console.error(data);
//     });
// }

async function executeCommandLine(commandLine) {
    const exec = util.promisify(require('child_process').exec);
    try {
        const resp = await exec(commandLine);
        return resp
    } catch (err) {
        console.error(err);
    };
}

module.exports = {
    templateNginx,
    executeCommandLine
}