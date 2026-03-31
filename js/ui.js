// js/ui.js
import { appData } from './api.js';
import * as generators from './generators.js';

const dataGenerators = [
    generators.createThaiId,
    generators.createCreditCard,
    generators.createPhoneNumber,
    generators.createAddress,
    generators.createEmail,
    generators.createCompany,
    generators.createUuid
];

/**
 * Generates and displays random data in the UI.
 */
export function displayRandomData() {
    const displayElement = document.getElementById('display-data');
    if (!displayElement) return;

    if (!appData.isLoaded) {
        displayElement.innerHTML = `<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">กำลังโหลดข้อมูล...</p></div>`;
        return;
    }

    let generatedData = dataGenerators.map(generator => generator()).filter(item => item !== null);

    const displayOrder = ['thai_id', 'credit_card', 'phone_number', 'address', 'email', 'company', 'uuid'];
    generatedData.sort((a, b) => displayOrder.indexOf(a.type) - displayOrder.indexOf(b.type));

    displayElement.innerHTML = ''; // Clear old data

    generatedData.forEach(item => {
        let title = '', content = '';

        if (item.type === 'thai_id') {
            title = '<i class="bi bi-person-vcard-fill me-2"></i>บัตรประชาชน';
            content = `<h4 class="text-center text-primary my-2 font-monospace">${item.formatted}</h4><p class="mb-0 text-center text-muted small">(Unformatted: ${item.unformatted})</p>`;
        } else if (item.type === 'credit_card') {
            title = '<i class="bi bi-credit-card-2-front-fill me-2"></i>บัตรเครดิต';
            const formattedCardNumber = item.cardNumber.match(/.{1,4}/g).join(' ');
            content = `
                <div class="mb-3">
                    <div class="small text-muted">Card Number</div>
                    <div class="fs-5 font-monospace">${formattedCardNumber}</div>
                </div>
                <div class="small text-muted">Card Holder</div>
                <div class="fs-6 mb-1">${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}</div>
                <div class="small text-muted">(${item.firstNameTh} ${item.lastNameTh})</div>
                <div class="d-flex justify-content-between mt-3 text-muted small border-top pt-3">
                    <span><strong>EXP:</strong> ${item.expiryDate}</span>
                    <span><strong>CVV:</strong> ${item.cvv}</span>
                </div>`;
        } else if (item.type === 'phone_number') {
            title = '<i class="bi bi-phone-fill me-2"></i>เบอร์โทรศัพท์';
            content = `<h4 class="text-success text-center my-2 font-monospace">${item.formatted}</h4><p class="mb-0 text-center text-muted small">(Unformatted: ${item.unformatted})</p>`;
        } else if (item.type === 'address') {
            title = '<i class="bi bi-geo-alt-fill me-2"></i>ที่อยู่';
            content = `
                <p class="mb-1"><strong>บ้านเลขที่:</strong> ${item.houseNumber} ${item.moo}</p>
                <p class="mb-1"><strong>ตำบล/แขวง:</strong> ${item.subDistrict}</p>
                <p class="mb-1"><strong>อำเภอ/เขต:</strong> ${item.district}</p>
                <p class="mb-1"><strong>จังหวัด:</strong> ${item.province}</p>
                <p class="mb-0"><strong>รหัสไปรษณีย์:</strong> ${item.zipcode}</p>`;
        } else if (item.type === 'email') {
            title = '<i class="bi bi-envelope-at-fill me-2"></i>อีเมล';
            content = `<h5 class="text-center text-info-emphasis my-2 font-monospace">${item.email}</h5>`;
        } else if (item.type === 'company') {
            title = '<i class="bi bi-building-fill me-2"></i>บริษัท';
            content = `
                <div class="text-center">
                    <h5 class="mb-2">${item.name}</h5>
                    <p class="mb-0 text-muted small"><i class="bi bi-globe me-1"></i>${item.website}</p>
                </div>`;
        } else if (item.type === 'uuid') {
            title = '<i class="bi bi-hash me-2"></i>UUID';
            content = `<p class="text-center text-secondary my-2 font-monospace small">${item.uuid}</p>`;
        }

        if (title) {
            displayElement.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-light-subtle">
                        <div class="card-header bg-body-secondary bg-opacity-10 fw-bold">${title}</div>
                        <div class="card-body d-flex flex-column justify-content-center">${content}</div>
                    </div>
                </div>`;
        }
    });
}
