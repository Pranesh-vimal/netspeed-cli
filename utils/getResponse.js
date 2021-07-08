const axios = require("axios");
const chalk = require("chalk");

const getResponse = async () => {
    return await axios
        .get(
            "https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm"
        )
        .then((res) => {
            const { client } = res.data;
            console.log(
                `${chalk.greenBright("ISP : ")} ${chalk.bold(client.isp)}`
            );
            console.log(
                `${chalk.greenBright("IP : ")} ${chalk.bold(client.ip)}`
            );
            console.log(
                `${chalk.greenBright("Location : ")} ${chalk.bold(
                    `${client.location.city} (${client.location.country})`
                )}`
            );
        });
};

module.exports = getResponse;
