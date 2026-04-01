## Plan: Modernize Static Random Data SPA for GitHub Pages

**เป้าหมาย:**
- ยกระดับ UI/UX, เพิ่ม maintainability, และปรับโค้ดให้ทันสมัยขึ้น โดยยังคงเป็น static SPA ที่ deploy ได้บน GitHub Pages

---

### ลำดับความสำคัญ (Priority Order)

#### 1. Core Modernization (สำคัญสุด)
- Refactor event binding: เปลี่ยน inline `onclick` เป็น `addEventListener`
- ปรับ UI rendering: ใช้ template literal/DocumentFragment แทน innerHTML +=
- ปรับ address generator: ใช้ index map + bounded retry
- เพิ่ม error handling: response.ok, error message รายไฟล์
- เพิ่ม Luhn validation ให้บัตรเครดิต (mock)

#### 2. UI/UX Modernization
- ปรับดีไซน์การ์ด/ปุ่มให้ดู modern ขึ้น (Bootstrap 5, shadow, rounded, responsive grid)
- เพิ่ม dark/light mode toggle
- เพิ่มปุ่ม copy to clipboard ในแต่ละ card
- เพิ่ม animation (fade-in, hover effect)
- ปรับ typography/spacing ให้เหมาะกับ mobile

#### 3. GitHub Pages Optimization
- ตรวจสอบ asset/fetch path ให้รองรับ deploy ใน subfolder
- เพิ่ม favicon, meta tags, manifest (PWA-ready, ถ้าต้องการ)
- ทดสอบ deploy จริงบน GitHub Pages

#### 4. Documentation
- อัปเดต README: วิธี deploy, modern features, best practices

---

### ไฟล์ที่เกี่ยวข้อง
- index.html
- js/ui.js
- js/main.js
- js/generators.js
- js/api.js
- css/style.css
- README.md

---

### Verification Checklist
- เปิดบน GitHub Pages แล้วใช้งานได้ครบทุกฟีเจอร์
- UI responsive, มี dark/light mode, ปุ่ม copy ใช้งานได้
- สุ่มข้อมูลใหม่ไม่มี error, address mapping ถูกต้อง
- บัตรเครดิต mock ผ่าน Luhn, error message ชัดเจน
- README อัปเดตวิธี deploy และ feature ใหม่
