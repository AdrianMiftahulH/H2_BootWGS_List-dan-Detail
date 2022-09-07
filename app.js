const { listContact, saveData, detailContact } = require('./function.js');
const yargs = require("yargs");

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            // Harus di isi bila bersifat true didemandOption
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        saveData(argv.name, argv.email, argv.mobile);
    },
});

yargs.command({
    command: 'list',
    describe: 'see contact list',
    handler() {
        listContact();
    },
});

yargs.command({
    command: "detail",
    describe: 'see contact detail base on name',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.name);
    },
})

yargs.parse();


// === Catatan ===
// npm i yargs ==> untuk menginstall yargs