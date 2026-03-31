// js/api.js

// Centralized data storage
export const appData = {
    provinces: [],
    districts: [],
    subDistricts: [],
    firstNames: [],
    lastNames: [],
    isLoaded: false
};

/**
 * Fetches all necessary JSON data files from the server.
 * @param {Function} onDataLoadedCallback - The function to call once data is successfully loaded.
 */
export async function loadAllData(onDataLoadedCallback) {
    try {
        const [provincesRes, districtsRes, subDistrictsRes, firstNamesRes, lastNamesRes] = await Promise.all([
            fetch('src/province.json'),
            fetch('src/district.json'),
            fetch('src/sub_district.json'),
            fetch('src/first_names.json'),
            fetch('src/last_names.json')
        ]);

        appData.provinces = await provincesRes.json();
        appData.districts = await districtsRes.json();
        appData.subDistricts = await subDistrictsRes.json();
        appData.firstNames = await firstNamesRes.json();
        appData.lastNames = await lastNamesRes.json();

        appData.isLoaded = true;
        console.log("All data loaded successfully.");
        // Trigger the callback function (e.g., to render the initial UI)
        onDataLoadedCallback();

    } catch (error) {
        console.error("Failed to load data:", error);
        // Display an error message on the page
        const displayElement = document.getElementById('display-data');
        if (displayElement) {
            displayElement.innerHTML = `<div class="col-12"><div class="alert alert-danger">ไม่สามารถโหลดข้อมูลพื้นฐานได้ กรุณาตรวจสอบไฟล์ JSON และลองอีกครั้ง</div></div>`;
        }
    }
}
