// js/generators.js
import { appData } from './api.js';

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createThaiId() {
    let id = '';
    for (let i = 0; i < 13; i++) id += getRandomInt(0, 9);
    const formattedId = `${id.substring(0, 1)}-${id.substring(1, 5)}-${id.substring(5, 10)}-${id.substring(10, 12)}-${id.substring(12, 13)}`;
    return {
        type: 'thai_id',
        unformatted: id,
        formatted: formattedId
    };
}

export function createCreditCard() {
    if (!appData.isLoaded || appData.firstNames.length === 0 || appData.lastNames.length === 0) return null;

    const randomFName = appData.firstNames[getRandomInt(0, appData.firstNames.length - 1)];
    const randomLName = appData.lastNames[getRandomInt(0, appData.lastNames.length - 1)];

    let cardNumber = '';
    for (let i = 0; i < 16; i++) cardNumber += getRandomInt(0, 9);
    return {
        type: 'credit_card',
        firstName: randomFName.en,
        lastName: randomLName.en,
        firstNameTh: randomFName.th,
        lastNameTh: randomLName.th,
        cardNumber: cardNumber,
        expiryDate: `${getRandomInt(1, 12).toString().padStart(2, '0')}/${getRandomInt(24, 29)}`,
        cvv: getRandomInt(100, 999).toString()
    };
}

export function createPhoneNumber() {
    const prefixes = ['08', '09', '06'];
    const prefix = prefixes[getRandomInt(0, prefixes.length - 1)];
    let number = '';
    for (let i = 0; i < 8; i++) { number += getRandomInt(0, 9); }
    const unformatted = `${prefix}${number}`;
    const formatted = `${unformatted.substring(0, 3)}-${unformatted.substring(3, 6)}-${unformatted.substring(6)}`;
    return { type: 'phone_number', unformatted: unformatted, formatted: formatted };
}

export function createAddress() {
    if (!appData.isLoaded || appData.provinces.length === 0) return null; // Guard clause

    const province = appData.provinces[getRandomInt(0, appData.provinces.length - 1)];
    const districtsInProvince = appData.districts.filter(d => d.province_id === province.id);
    if (districtsInProvince.length === 0) return createAddress(); // Retry if no districts found
    const district = districtsInProvince[getRandomInt(0, districtsInProvince.length - 1)];

    const subDistrictsInDistrict = appData.subDistricts.filter(sd => sd.district_id === district.id);
    if (subDistrictsInDistrict.length === 0) return createAddress(); // Retry if no sub-districts found
    const subDistrict = subDistrictsInDistrict[getRandomInt(0, subDistrictsInDistrict.length - 1)];

    const houseNumber = `${getRandomInt(1, 999)}/${getRandomInt(1, 99)}`;
    const moo = getRandomInt(1, 15);

    return {
        type: 'address',
        houseNumber: houseNumber,
        moo: `หมู่ ${moo}`,
        subDistrict: subDistrict.name_th,
        district: district.name_th,
        province: province.name_th,
        zipcode: subDistrict.zip_code
    };
}
