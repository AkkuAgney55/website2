// script.js

let people = [
    { name: 'Sijo', dob: '04/01/0000' },
    { name: 'Sreejith', dob: '11/01/0000' },
    { name: 'Rash', dob: '27/07/1997' },
    { name: 'Farzeen', dob: '22/02/0000' },
    { name: 'Sam', dob: '27/09/0000' },
    { name: 'Owl', dob: '22/03/0000' },
    { name: 'Manas', dob: '20/07/0000' },
    { name: 'Nova', dob: '25/04/0000' },
    { name: 'Abeej', dob: '09/10/0000' },
    { name: 'Stephin', dob: '22/06/2001' },
    { name: 'Salihh', dob: '29/07/0000' },
    { name: 'Techu', dob: '28/02/0000' },
    { name: 'Chimbu', dob: '24/09/0000' },
    { name: 'Athul (fastgen)', dob: '18/02/0000' },
    { name: 'Gowri', dob: '16/07/0000' },
    { name: 'Robber', dob: '01/07/0000' },
    { name: 'Surya (flash)', dob: '04/06/0000' },
    { name: 'Athul (gopuzz)', dob: '03/11/0000' },
    { name: 'Sidharth Raj', dob: '28/08/2005' },
    { name: 'Iris', dob: '13/07/0000' },
    { name: 'Kithu', dob: '15/05/0000' },
    { name: 'Wolfman', dob: '30/09/0000' },
    { name: 'Cosmic thunder', dob: '26/02/0000' },
    { name: 'Noyal', dob: '24/01/0000' },
    { name: 'FTT', dob: '01/06/0000' },
    { name: 'Bit beast', dob: '13/06/0000' },
    { name: 'SK', dob: '20/06/0000' },
    { name: 'RipperMan', dob: '20/06/0000' },
    { name: 'Aamina Chechi', dob: '20/08/0000' },
    { name: 'Tony', dob: '25/08/0000' },
    { name: 'Brooks', dob: '09/09/0000' },
    { name: 'Baby Beast', dob: '27/09/0000' },
    { name: 'Sudu', dob: '07/12/2004' },
    { name: 'Savitha Miss', dob: '19/02/0000' },
    { name: 'Anjana Miss', dob: '11/10/0000' },
    { name: 'Anju Miss', dob: '26/11/0000' },
    { name: 'Anusree Miss', dob: '28/08/0000' },
    { name: 'Vivek', dob: '01/03/2005' },
    { name: 'Arun James', dob: '15/05/2006' },

    // Add more entries as needed
];

document.addEventListener('DOMContentLoaded', function () {
    updateAllPeopleTable();
    updateBirthdaysThisMonthTable();
    scheduleEmailNotifications();
});

function updateAllPeopleTable() {
    const tableBody = document.getElementById('allPeopleList');
    tableBody.innerHTML = '';

    for (const person of people) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function updateBirthdaysThisMonthTable() {
    const tableBody = document.getElementById('birthdaysThisMonthList');
    tableBody.innerHTML = '';

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript

    const birthdaysThisMonth = people
        .filter(person => {
            const dobMonth = parseInt(person.dob.split('/')[1], 10);
            return dobMonth === currentMonth;
        })
        .sort((a, b) => {
            const dayA = parseInt(a.dob.split('/')[0], 10);
            const dayB = parseInt(b.dob.split('/')[0], 10);
            return dayA - dayB;
        });

    for (const person of birthdaysThisMonth) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function searchPeople() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPeople = people.filter(person => person.name.toLowerCase().includes(searchInput));
    displaySearchResults(filteredPeople);
}

function displaySearchResults(results) {
    const tableBody = document.getElementById('allPeopleList');
    tableBody.innerHTML = '';

    for (const person of results) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function goToBirthdaysThisMonthTable() {
    document.getElementById('birthdaysThisMonthTable').scrollIntoView({ behavior: 'smooth' });
}

function scheduleEmailNotifications() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0); // Set the time to 6 PM

    for (const person of people) {
        const dob = new Date(currentDate.getFullYear(), parseInt(person.dob.split('/')[1], 10) - 1, parseInt(person.dob.split('/')[0], 10), 18, 0, 0, 0);

        if (dob.getTime() === tomorrow.getTime()) {
            sendEmailNotification(person);
        }
    }
}

function sendEmailNotification(person) {
    // Sendinblue API configuration
    const apiKey = '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';
    const senderEmail = 'akkuagneyanesh@gmail.com';
    const senderName = 'Birthday Alert';
    const recipientEmail = 'agneyanesh@gmail.com';

    // Email content
    const subject = 'Birthday Reminder';
    const body = `Don't forget to wish ${person.name} a Happy Birthday tomorrow!`;

    // Send email using Sendinblue API
    fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify({
            sender: {
                name: senderName,
                email: senderEmail,
            },
            to: [
                {
                    email: recipientEmail,
                },
            ],
            subject: subject,
            htmlContent: body,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error sending email:', error));
}
