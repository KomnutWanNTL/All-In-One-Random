// Helper function
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Data storage
let addressData = {
    provinces: [],
    districts: [],
    subDistricts: []
};
let nameData = {
    firstNames: [],
    lastNames: []
};
let isDataLoaded = false;

// --- Data Loading ---
async function loadAllData() {
    try {
        const [provincesRes, districtsRes, subDistrictsRes, firstNamesRes, lastNamesRes] = await Promise.all([
            fetch('src/province.json'),
            fetch('src/district.json'),
            fetch('src/sub_district.json'),
            fetch('src/first_names.json'),
            fetch('src/last_names.json')
        ]);

        addressData.provinces = await provincesRes.json();
        addressData.districts = await districtsRes.json();
        addressData.subDistricts = await subDistrictsRes.json();
        nameData.firstNames = await firstNamesRes.json();
        nameData.lastNames = await lastNamesRes.json();

        isDataLoaded = true;
        console.log("All data loaded successfully.");
        // Initial display after data is loaded
        displayRandomData();
    } catch (error) {
        console.error("Failed to load data:", error);
        // Display an error message on the page
        const displayElement = document.getElementById('display-data');
        displayElement.innerHTML = `<div class="col-12"><div class="alert alert-danger">ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบไฟล์ JSON และลองอีกครั้ง</div></div>`;
    }
}


// --- Data Generators ---

function createThaiId() {
    let id = '';
    for (let i = 0; i < 13; i++) id += getRandomInt(0, 9);
    const formattedId = `${id.substring(0, 1)}-${id.substring(1, 5)}-${id.substring(5, 10)}-${id.substring(10, 12)}-${id.substring(12, 13)}`;
    return {
        type: 'thai_id',
        unformatted: id,
        formatted: formattedId
    };
}

function createCreditCard() {
    if (!isDataLoaded || nameData.firstNames.length === 0 || nameData.lastNames.length === 0) return null;

    const randomFName = nameData.firstNames[getRandomInt(0, nameData.firstNames.length - 1)];
    const randomLName = nameData.lastNames[getRandomInt(0, nameData.lastNames.length - 1)];

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

function createPhoneNumber() {
    const prefixes = ['08', '09', '06'];
    const prefix = prefixes[getRandomInt(0, prefixes.length - 1)];
    let number = '';
    for (let i = 0; i < 8; i++) { number += getRandomInt(0, 9); }
    const unformatted = `${prefix}${number}`;
    const formatted = `${unformatted.substring(0, 3)}-${unformatted.substring(3, 6)}-${unformatted.substring(6)}`;
    return { type: 'phone_number', unformatted: unformatted, formatted: formatted };
}

function createAddress() {
    if (!isDataLoaded || addressData.provinces.length === 0) return null; // Guard clause

    // 1. Select a random province
    const province = addressData.provinces[getRandomInt(0, addressData.provinces.length - 1)];

    // 2. Filter districts for the selected province
    const districtsInProvince = addressData.districts.filter(d => d.province_id === province.id);
    if (districtsInProvince.length === 0) return createAddress(); // Retry if no districts found
    const district = districtsInProvince[getRandomInt(0, districtsInProvince.length - 1)];

    // 3. Filter sub-districts for the selected district
    const subDistrictsInDistrict = addressData.subDistricts.filter(sd => sd.district_id === district.id);
    if (subDistrictsInDistrict.length === 0) return createAddress(); // Retry if no sub-districts found
    const subDistrict = subDistrictsInDistrict[getRandomInt(0, subDistrictsInDistrict.length - 1)];

    // 4. Generate random address details
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

const dataGenerators = [
    createThaiId,
    createCreditCard,
    createPhoneNumber,
    createAddress
];

// --- Display Logic ---
function displayRandomData() {
    if (!isDataLoaded) {
        // Show a loading state if data isn't ready
        const displayElement = document.getElementById('display-data');
        displayElement.innerHTML = `<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">กำลังโหลดข้อมูล...</p></div>`;
        return;
    }

    // Generate one data set from each generator
    let generatedData = dataGenerators.map(generator => generator()).filter(item => item !== null);

    // Define the desired order
    const displayOrder = ['thai_id', 'credit_card', 'phone_number', 'address'];

    // Sort the generated data according to the displayOrder
    generatedData.sort((a, b) => {
        return displayOrder.indexOf(a.type) - displayOrder.indexOf(b.type);
    });

    const displayElement = document.getElementById('display-data');
    displayElement.innerHTML = ''; // Clear old data

    generatedData.forEach(item => {
        let title = '', content = '';

        if (item.type === 'thai_id') {
            title = '<i class="bi bi-person-vcard-fill me-2"></i>บัตรประชาชน';
            content = `
                <h4 class="text-center text-primary my-2 font-monospace">${item.formatted}</h4>
                <p class="mb-0 text-center text-muted small">(Unformatted: ${item.unformatted})</p>
            `;
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
                </div>
            `;
        } else if (item.type === 'phone_number') {
            title = '<i class="bi bi-phone-fill me-2"></i>เบอร์โทรศัพท์';
            content = `
                <h4 class="text-success text-center my-2 font-monospace">${item.formatted}</h4>
                <p class="mb-0 text-center text-muted small">(Unformatted: ${item.unformatted})</p>
            `;
        } else if (item.type === 'address') {
            title = '<i class="bi bi-geo-alt-fill me-2"></i>ที่อยู่';
            content = `
                <p class="mb-1"><strong>บ้านเลขที่:</strong> ${item.houseNumber} ${item.moo}</p>
                <p class="mb-1"><strong>ตำบล/แขวง:</strong> ${item.subDistrict}</p>
                <p class="mb-1"><strong>อำเภอ/เขต:</strong> ${item.district}</p>
                <p class="mb-1"><strong>จังหวัด:</strong> ${item.province}</p>
                <p class="mb-0"><strong>รหัสไปรษณีย์:</strong> ${item.zipcode}</p>
            `;
        }

        if (title) { // Only render if the item type was recognized
            displayElement.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-light-subtle">
                        <div class="card-header bg-body-secondary bg-opacity-10 fw-bold">
                            ${title}
                        </div>
                        <div class="card-body d-flex flex-column justify-content-center">
                            ${content}
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

// Initial call to load data
document.addEventListener('DOMContentLoaded', loadAllData);