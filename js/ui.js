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

const displayOrder = ['thai_id', 'credit_card', 'phone_number', 'address', 'email', 'company', 'uuid'];

function buildCard(item, idx) {
    let titleText = '', iconClass = '', iconType = '', copyValue = '', bodyHTML = '';

    if (item.type === 'thai_id') {
        titleText = 'บัตรประชาชน';
        iconClass = 'bi-person-vcard-fill';
        iconType = 'icon-id';
        copyValue = item.formatted;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">รหัสบัตร</span>
                <span class="field-value large highlight">${item.formatted}</span>
            </div>
            <div class="field-row">
                <span class="field-label">ไม่มีขีด</span>
                <span class="field-value mono">${item.unformatted}</span>
            </div>`;

    } else if (item.type === 'credit_card') {
        titleText = 'บัตรเครดิต';
        iconClass = 'bi-credit-card-2-front-fill';
        iconType = 'icon-card';
        const formattedNum = item.cardNumber.match(/.{1,4}/g).join(' ');
        copyValue = formattedNum;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">Card Number</span>
                <span class="field-value large">${formattedNum}</span>
            </div>
            <div class="field-row">
                <span class="field-label">Card Holder</span>
                <span class="field-value">${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}</span>
                <span class="field-value" style="font-size:.78rem;color:var(--text-secondary)">${item.firstNameTh} ${item.lastNameTh}</span>
            </div>
            <div class="card-divider"></div>
            <div class="field-row-inline">
                <div class="field-row">
                    <span class="field-label">Expiry</span>
                    <span class="field-value mono">${item.expiryDate}</span>
                </div>
                <div class="field-row">
                    <span class="field-label">CVV</span>
                    <span class="field-value mono">${item.cvv}</span>
                </div>
            </div>`;

    } else if (item.type === 'phone_number') {
        titleText = 'เบอร์โทรศัพท์';
        iconClass = 'bi-phone-fill';
        iconType = 'icon-phone';
        copyValue = item.formatted;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">หมายเลข</span>
                <span class="field-value large highlight">${item.formatted}</span>
            </div>
            <div class="field-row">
                <span class="field-label">ไม่มีขีด</span>
                <span class="field-value mono">${item.unformatted}</span>
            </div>`;

    } else if (item.type === 'address') {
        titleText = 'ที่อยู่';
        iconClass = 'bi-geo-alt-fill';
        iconType = 'icon-address';
        copyValue = `${item.houseNumber} ${item.moo}, ต.${item.subDistrict}, อ.${item.district}, จ.${item.province} ${item.zipcode}`;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">บ้านเลขที่</span>
                <span class="field-value">${item.houseNumber} ${item.moo}</span>
            </div>
            <div class="field-row">
                <span class="field-label">ตำบล / แขวง</span>
                <span class="field-value">${item.subDistrict}</span>
            </div>
            <div class="field-row">
                <span class="field-label">อำเภอ / เขต</span>
                <span class="field-value">${item.district}</span>
            </div>
            <div class="field-row-inline">
                <div class="field-row">
                    <span class="field-label">จังหวัด</span>
                    <span class="field-value">${item.province}</span>
                </div>
                <div class="field-row">
                    <span class="field-label">รหัสไปรษณีย์</span>
                    <span class="field-value mono">${item.zipcode}</span>
                </div>
            </div>`;

    } else if (item.type === 'email') {
        titleText = 'อีเมล';
        iconClass = 'bi-envelope-at-fill';
        iconType = 'icon-email';
        copyValue = item.email;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">Email Address</span>
                <span class="field-value mono highlight" style="font-size:1rem;word-break:break-all">${item.email}</span>
            </div>`;

    } else if (item.type === 'company') {
        titleText = 'บริษัท';
        iconClass = 'bi-building-fill';
        iconType = 'icon-company';
        copyValue = item.name;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">ชื่อบริษัท</span>
                <span class="field-value" style="font-size:1.05rem;font-weight:600">${item.name}</span>
            </div>
            <div class="field-row">
                <span class="field-label">เว็บไซต์</span>
                <span class="field-value mono" style="font-size:.85rem">${item.website}</span>
            </div>`;

    } else if (item.type === 'uuid') {
        titleText = 'UUID';
        iconClass = 'bi-hash';
        iconType = 'icon-uuid';
        copyValue = item.uuid;
        bodyHTML = `
            <div class="field-row">
                <span class="field-label">UUID v4</span>
                <span class="field-value mono" style="font-size:.82rem;line-height:1.6;word-break:break-all">${item.uuid}</span>
            </div>`;
    }

    if (!titleText) return null;

    const copyBtnId = `copy-btn-${idx}`;
    const el = document.createElement('div');
    el.className = 'data-card';
    el.innerHTML = `
        <div class="card-head">
            <div class="card-title">
                <span class="card-type-icon ${iconType}"><i class="bi ${iconClass}"></i></span>
                ${titleText}
            </div>
            <button type="button" class="btn-copy" id="${copyBtnId}" title="คัดลอก" aria-label="Copy">
                <i class="bi bi-clipboard"></i>
            </button>
        </div>
        <div class="card-body">${bodyHTML}</div>`;

    return { el, copyValue, copyBtnId };
}

function attachCopy({ el, copyValue, copyBtnId }) {
    const btn = el.querySelector(`#${copyBtnId}`);
    if (!btn) return;
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(copyValue);
            btn.innerHTML = '<i class="bi bi-clipboard-check" style="color:#16a34a"></i>';
        } catch {
            btn.innerHTML = '<i class="bi bi-x-circle" style="color:#dc2626"></i>';
        }
        setTimeout(() => { btn.innerHTML = '<i class="bi bi-clipboard"></i>'; }, 1400);
    });
}

export function displayRandomData() {
    const displayElement = document.getElementById('display-data');
    if (!displayElement) return;

    if (!appData.isLoaded) {
        displayElement.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <span>กำลังโหลดข้อมูล...</span>
            </div>`;
        return;
    }

    let generatedData = dataGenerators.map(g => g()).filter(Boolean);
    generatedData.sort((a, b) => displayOrder.indexOf(a.type) - displayOrder.indexOf(b.type));

    displayElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const cards = [];

    generatedData.forEach((item, idx) => {
        const result = buildCard(item, idx);
        if (result) {
            fragment.appendChild(result.el);
            cards.push(result);
        }
    });

    displayElement.appendChild(fragment);
    cards.forEach(attachCopy);
}
