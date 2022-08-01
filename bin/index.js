#!/usr/bin/env node

const { templateNginx, executeCommandLine } = require('./utils')

const yargs = require("yargs");
var fs = require('fs');

const options = yargs
    .usage("Usage: -c <domain> -p <port>")
    .option("c", { alias: "domain", describe: "Your domain or subdomain", type: "string", demandOption: true })
    .option("p", { alias: "port", describe: "Port", type: "string", demandOption: true })
    .argv;
const greeting = `Hello, ${options.domain}! ${options.port}`;
let template = templateNginx(options.domain, options.port)
console.log(template)
fs.writeFile(`/etc/nginxTest/sites-avaliable/${options.domain}`, template, (err)=> {
    if (err) throw err;
    console.log('File is created successfully.');
    executeCommandLine(`ln -s /etc/nginxTest/sites-avaliable/${options.domain}  /etc/nginxTest/sites-enable/.`).then(msg=>{
        console.log(msg)
    }).catch(err=>{

    })
});

console.log(greeting);