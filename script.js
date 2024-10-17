const DEFAULT_AVATAR_URL = 'kuromi.jpg';

let contacts = [];

function setUsername() {
    const username = document.getElementById('usernameInput').value;
    document.getElementById('username').textContent = username + "'s";
}

function setAvatar() {
    const url = document.getElementById('avatarInput').value;
    document.getElementById('avatar').style.backgroundImage = url ? `url(${url})` : `url(${DEFAULT_AVATAR_URL})`;
}

function addContact() {
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    contacts.push({ name, phone });
    updateTable();
}

function updateTable() {
    const table = document.getElementById('contactTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    contacts.forEach((contact, index) => {
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = contact.name;
        row.insertCell(2).textContent = contact.phone;
    });
}

function exportContacts() {
    let csv = 'Name,Phone Number\n';
    contacts.forEach(contact => {
        csv += `${contact.name},${contact.phone}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'contacts.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function setDefaultAvatar() {
    document.getElementById('avatar').style.backgroundImage = `url(${DEFAULT_AVATAR_URL})`;
}

window.onload = setDefaultAvatar;

document.getElementById('username').addEventListener('click', function() {
    window.open('https://github.com/whalpnc', '_blank');
});
