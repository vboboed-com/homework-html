import html from "./app.html";
import './app.css'


const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

class Contragent {
    constructor(id, name, inn, address, kpp) {
        this.id = id;
        this.name = name;
        this.inn = inn;
        this.address = address;
        this.kpp = kpp;
    }

    update(name, inn, address, kpp) {
        this.name = name;
        this.inn = inn;
        this.address = address;
        this.kpp = kpp;
    }
}

let contragents = [
    new Contragent(
        1,
        "МойКонтрагент",
        "12345678901",
        "Витебск",
        "123456789"
    )
];

let editingContragentId = null;

refreshTable();

function refreshTable() {
    const tableBody = document.querySelector("#contragents-table tbody");
    tableBody.innerHTML = '';

    contragents.forEach((contragent) => {
        const row = document.createElement('tr');
        row.className = 'border-b text-sm cursor-pointer';

        row.innerHTML = `
            <td class="px-6 py-4 text-gray-500">${contragent.name}</td>
            <td class="px-6 py-4 text-gray-500">${contragent.inn}</td>
            <td class="px-6 py-4 text-gray-500">${contragent.address}</td>
            <td class="px-6 py-4 text-gray-500">${contragent.kpp}</td>
            <td class="px-6 py-4">
                <button class="bg-red-600 rounded-lg text-sm px-3 py-1 delete-button">
                    Удалить
                </button>
            </td>
        `;

        row.addEventListener('dblclick', () => {
            document.querySelector("#add-button").click();
            fillModal(contragent);
        });

        row.querySelector('.delete-button').addEventListener('click', (event) => {
            const index = contragents.findIndex((item) => item.id === contragent.id);
            contragents.splice(index, 1);

            refreshTable();
        });

        tableBody.appendChild(row);
    });
}

document.querySelector('#save-modal-button').addEventListener('click', () => {
    const modal = document.querySelector("#default-modal")

    const modalData = {
        name: modal.querySelector("#name").value,
        inn: modal.querySelector("#inn").value,
        address: modal.querySelector("#address").value,
        kpp: modal.querySelector("#kpp").value
    };

    if (editingContragentId) {
        let contragent = contragents.find(el => el.id === editingContragentId);
        contragent.update(
            modalData.name,
            modalData.inn,
            modalData.address,
            modalData.kpp
        );
    } else {
        let nextId = Math.max(...contragents.map(el => el.id)) + 1;
        contragents.push(new Contragent(nextId, modalData.name, modalData.inn, modalData.address, modalData.kpp));
    }

    document.querySelector("#close-modal-button").click();
    editingContragentId = null;
    refreshTable()
})

document.querySelector('#add-button').addEventListener('click', () => {
    fillModal(null);
})

function fillModal(contragent) {
    const modal = document.querySelector("#default-modal")
    if (contragent) {
        editingContragentId = contragent.id;
        modal.querySelector("#name").value = contragent.name
        modal.querySelector("#inn").value = contragent.inn
        modal.querySelector("#kpp").value = contragent.kpp
        modal.querySelector("#address").value = contragent.address
    } else {
        editingContragentId = null;
        modal.querySelector("#name").value = null
        modal.querySelector("#inn").value = null
        modal.querySelector("#kpp").value = null
        modal.querySelector("#address").value = null
    }
}