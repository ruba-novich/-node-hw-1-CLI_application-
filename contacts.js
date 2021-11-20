const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readData = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

  return filteredContacts;
};

const addContact = async (name, email, phone) => {
  const allContacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
