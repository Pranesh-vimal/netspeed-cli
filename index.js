#!/usr/bin/env node
const program = require("commander");
const FastSpeedtest = require("fast-speedtest-api");
const chalk = require("chalk");
const getResponse = require("./utils/getResponse");

program.version("1.0.0").description("Netspeed Finder");

program
    .option(
        "--unit [Bps|KBps|MBps|GBps|bps|Kbps|Mbps|Gbps]",
        "netspeed unit",
        "Mbps"
    )
    .parse();

const { unit } = program.opts();
let unitName;
const units = ["Bps", "KBps", "MBps", "GBps", "bps", "Kbps", "Mbps", "Gbps"];

if (!units.includes(unit)) {
    console.log(
        chalk.redBright(
            "Please enter a valid unit from the list [Bps|KBps|MBps|GBps|bps|Kbps|Mbps|Gbps]"
        )
    );

    return;
}

switch (unit) {
    case "Bps":
        unitName = FastSpeedtest.UNITS.Bps;
        break;
    case "KBps":
        unitName = FastSpeedtest.UNITS.KBps;
        break;
    case "MBps":
        unitName = FastSpeedtest.UNITS.MBps;
        break;
    case "GBps":
        unitName = FastSpeedtest.UNITS.GBps;
        break;
    case "bps":
        unitName = FastSpeedtest.UNITS.bps;
        break;
    case "Kbps":
        unitName = FastSpeedtest.UNITS.Kbps;
        break;
    case "Mbps":
        unitName = FastSpeedtest.UNITS.Mbps;
        break;
    case "Gbps":
        unitName = FastSpeedtest.UNITS.Gbps;
        break;
    default:
        unitName = FastSpeedtest.UNITS.Mbps;
        break;
}

console.log(`${chalk.yellowBright("Test your network speed")} \n`);

getResponse();

const speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: unitName, // default: Bps
});

speedtest
    .getSpeed()
    .then((speed) => {
        console.log(
            `${chalk.greenBright("Speed : ")} ${chalk.bold(
                `${speed.toFixed(2)} ${unit}`
            )}`
        );
    })
    .catch((e) => {
        console.log(chalk.red(e.message));
    });
