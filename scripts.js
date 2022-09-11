
var pri = [
    [new Date('1/5/2022') , new Date('1/15/2022')],   // OCAK 5 - OCAK 15
    [new Date('2/25/2022') , new Date('2/27/2022')], // ŞUBAT 25 - ŞUBAT 27
    [new Date('12/20/2021') , new Date('1/2/2022')], // 2021 ARALIK 20 - 2022 OCAK 2
];

pri.forEach((tarihler) => {
    tarihler[0].setMonth(tarihler[0].getMonth());
    tarihler[1].setMonth(tarihler[1].getMonth());
});

let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

let months = [
    ' ',
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
];

let monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    currentMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    if (currentMonth === 1) {
        currentMonth = 12;
        currentYear - 1;
    } else {
        currentMonth = currentMonth - 1;
    }
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    console.log(month, year);

    let firstDay = new Date(year, month - 1).getDay();
    let daysInMonth = 32 - new Date(year, month - 1, 32).getDate();

    let tbl = document.getElementById('calendar-body');

    tbl.innerHTML = '';

    monthAndYear.innerHTML = months[month] + ' ' + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode('');
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                console.log('break');
                break;
            } else {
                let cell = document.createElement('td');
                let cellText = document.createTextNode(date);
                pri.forEach((el) => {
                    var ct = new Date(`${month}/${date}/${year}`).getTime();


                    var p1 = el[0].getTime();
                    var p2 = el[1].getTime();

                    if (p1 == ct) {
                        cell.classList.add('bg-danger');
                    } else if (p1 < ct) {
                        if (p2 > ct) {
                            cell.classList.add('bg-primary');
                        } else if (p2 == ct) {
                            cell.classList.add('bg-danger');
                        }
                    }
                });

                cell.appendChild(cellText);
                row.appendChild(cell);

                date++;
            }
        }

        tbl.appendChild(row);
    }
}
