// const readline = require('readline');
const validator = require('validator');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Jika tidak ada folder data
if (!fs.existsSync("./data")) {
    // maka buat folder tersebut
    fs.mkdirSync("./data");
}
// jika tidak ada file di dalam folder data
if (!fs.existsSync("./data/contacts.json")) {
    // maka buat file 
    fs.writeFileSync('./data/contacts.json', "[]");
}


//Buat variabel ask dan function dengan parameter nanya
// const ask = (nanya) => {
//     //Membuat Promise 
//     return new Promise((resolve, reject) => {
//         // Menambahkan pertanyaan dengan parameter nanya dan membuat f dengan parameter jawaban
//         rl.question(nanya, (jawaban) => {
//             // Bila Promisenya resolve akan mengambil parameter jawaban
//             resolve(jawaban);
//         });
//     });
// };

// Untuk Membaca Data
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');

    // mengambil string JSON dan mengubah menjadi objek js
    const contacts = JSON.parse(file);
    return contacts;
}

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List : ');
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name} - ${contact.mobile}`);
    });
}

const detailContact = (name) => {
    const contacts = loadContact();

    const findName = contacts.find((contact) => contact.name === name);
    if (findName) {
        console.log(`Name : ${findName.name}
email : ${findName.email}
mobile : ${findName.mobile} `);
    } else {
        console.log(`Name not Found`);
    }


}
// Menyimpan Data
const saveData = (name, email, mobile,) => {
    const contact = { name, email, mobile };
    const contacts = loadContact();

    // Bila nama ada yang sama
    const duplicate = contacts.find((contact) => contact.name === name);
    if (duplicate) {
        console.log('Contact Name is already recorded. Use another name');
        return false;
    }
    // validator
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Account Email invalid!');
            return false;
        }
    }
    if (!validator.isMobilePhone(mobile, "id-ID")) {
        console.log('No Phone invalid!');
        return false;
    }

    contacts.push(contact);
    // Membuat data di file contacts.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // Output ke terminal sesuai jawaban di pertanyaan
    console.log(`Terima Kasih`);
    // Keluar dari rl
    // rl.close();
}


module.exports = { listContact, saveData, detailContact };

// ==== Catatan =====
//node app add --name="yYannn" --email="abcgmail.com" --mobile="089656104174" ==> untuk run di terminal
