# รายงานโครงสร้างโปรเจกต์ (Project Structure Report)

เอกสารนี้แสดงโครงสร้างปัจจุบันของเว็บไซต์ `nsc-client-web` หลังจากได้ทำการลบไฟล์และโฟลเดอร์ที่ไม่ได้ใช้งานออกแล้ว เพื่อให้โปรเจกต์มีความกระชับและง่ายต่อการดูแลรักษา

## 1. โครงสร้างหลัก (Core Structure)

### **Layout & Configuration**
*   **`src/app/layout.tsx`**: Root Layout หลักของโปรเจกต์ ตั้งค่า Font ภาษาไทย (Noto Sans Thai) และเรียกใช้ `ApplicationLayout`
*   **`src/app/(app)/application-layout.tsx`**: Layout หลักของแอปพลิเคชัน จัดการส่วน Header (Navbar) และ Footer
*   **`src/app/(app)/layout.tsx`**: Layout ย่อยสำหรับหน้าภายใน

### **หน้าเว็บหลัก (Active Pages)**
ไฟล์หน้าเว็บทั้งหมดจะอยู่ใน `src/app/(app)/` โดยแบ่งตามเส้นทาง (Route) ดังนี้:

| เส้นทาง (Route) | ไฟล์ (File Path) | รายละเอียด |
| :--- | :--- | :--- |
| **/** (Home) | `src/app/(app)/page.tsx` | หน้าแรกของเว็บไซต์ (แสดง Hero Section, แพ็กเกจ, บทความ) |
| **/booking** | `src/app/(app)/booking/page.tsx` | ระบบนัดหมายออนไลน์ |
| **/clinics/[id]** | `src/app/(app)/clinics/[id]/page.tsx` | หน้ารายละเอียดคลินิก |
| **/packages** | `src/app/(app)/packages/page.tsx` | หน้ารวมแพ็กเกจสุขภาพทั้งหมด |
| **/specialists** | `src/app/(app)/specialists/page.tsx` | หน้าค้นหาแพทย์และผู้เชี่ยวชาญ |
| **/health-knowledge** | `src/app/(app)/health-knowledge/page.tsx` | หน้าคลังความรู้และบทความสุขภาพ |
| **/news** | `src/app/(app)/news/page.tsx` | หน้าข่าวสารและประชาสัมพันธ์ |
| **/contact** | `src/app/(app)/contact/page.tsx` | หน้าติดต่อเรา |
| **/about/general** | `src/app/(app)/about/general/page.tsx` | หน้าเกี่ยวกับเรา |
| **/about/partnerships** | `src/app/(app)/about/partnerships/page.tsx` | หน้าพันธมิตร |
| **/about/careers** | `src/app/(app)/about/careers/page.tsx` | หน้าสมัครงาน |

---

## 2. Components สำคัญ (Key Components)

### **Header & Navigation**
*   **`src/components/Header/Header2.tsx`**: ส่วนหัวของเว็บไซต์ (Navbar) ที่ใช้งานอยู่ปัจจุบัน (ตัดส่วน Notification และ Profile ออกแล้ว)
*   **`src/components/Header/Navigation/Navigation.tsx`**: เมนูนำทางหลัก
*   **`src/components/Header/SearchModal.tsx`**: Modal สำหรับค้นหา

### **Content Sections**
*   **`src/components/SectionHeroAction.tsx`**: ส่วน Hero Banner ในหน้าแรก (แสดงรูปภาพและปุ่ม Action หลัก)
*   **`src/components/SectionSliderPosts.tsx`**: Slider สำหรับแสดงรายการบทความหรือแพ็กเกจ (รองรับการซ่อนชื่อผู้เขียน)
*   **`src/components/BackgroundSection.tsx`**: พื้นหลังตกแต่งสำหรับ Section ต่างๆ

### **Cards**
*   **`src/components/PostCards/Card7.tsx`**: การ์ดแสดงข้อมูลแพ็กเกจสุขภาพ (แนวตั้ง)
*   **`src/components/PostCards/Card11.tsx`**: การ์ดแสดงบทความสุขภาพ (แนวนอน)
*   **`src/components/SpecialistCard.tsx`**: การ์ดแสดงข้อมูลแพทย์/ผู้เชี่ยวชาญ

---

## 3. การเปลี่ยนแปลงล่าสุด (Recent Changes)

1.  **Cleanup:**
    *   ลบโฟลเดอร์ `src/app/(app)/(home)` (หน้า Home เก่า)
    *   ลบโฟลเดอร์ `src/app/dashboard`, `src/app/submission`, `src/app/(auth)` (ส่วนที่ไม่เกี่ยวข้องกับ User ทั่วไป)
    *   ลบ Components ที่ไม่ได้ใช้: `SectionHero2/3`, `SectionMagazine1-11`, `SectionVideos`, `SectionAds`, `SectionTrending`, `SectionBecomeAnAuthor`
2.  **Localization:** แปลหน้าเว็บหลักทั้งหมดเป็นภาษาไทย
3.  **UI Adjustments:**
    *   ลบเส้นขอบ (Border) ของ Header
    *   ซ่อนชื่อผู้เขียนในส่วน "สาระน่ารู้ด้านสุขภาพ" หน้าแรก
    *   ปรับปรุง Layout หน้า Booking และ Home

## 4. หมายเหตุ (Notes)
*   ไฟล์ใน `src/data/` (เช่น `navigation.ts`, `posts.ts`) ยังคงใช้งานเพื่อจำลองข้อมูลบางส่วน หรือกำหนดโครงสร้างเมนู
*   การเชื่อมต่อ API จริงถูกนำมาใช้ในหน้า `Booking`, `Clinics`, `Packages`, `Specialists` แล้ว
