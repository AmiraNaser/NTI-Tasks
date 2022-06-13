const api   = require("./controllers/apiReq");
const yargs = require("yargs");
yargs.command({
    command: "api",
    builder: {
        url: {
            type: String,
            demandOption: true
        }
    },
    handler: function (argv) {
        api.apiFun(argv.url);
    }
})
yargs.argv