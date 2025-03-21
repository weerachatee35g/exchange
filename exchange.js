const apiUrl = "https://open.er-api.com/v6/latest/USD"; // API ฟรีจาก ExchangeRate-API
let rates = {};

// ดึงข้อมูลอัตราแลกเปลี่ยนและเติม dropdown
async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.result === "success") {
            rates = data.rates;
            const fromSelect = document.getElementById("fromCurrency");
            const toSelect = document.getElementById("toCurrency");
            
            // เติมตัวเลือกใน dropdown
            Object.keys(rates).forEach(currency => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromSelect.appendChild(option1);
                toSelect.appendChild(option2);
            });

            // ตั้งค่าเริ่มต้น
            fromSelect.value = "THB"; // บาทไทย
            toSelect.value = "USD"; // ดอลลาร์สหรัฐ
        } else {
            alert("ไม่สามารถดึงข้อมูลอัตราแลกเปลี่ยนได้");
        }
    } catch (error) {
        console.error("Error fetching rates:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
}

// คำนวณอัตราแลกเปลี่ยน
function calculateExchange() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDiv = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "กรุณากรอกจำนวนเงินที่ถูกต้อง";
        return;
    }

    // คำนวณโดยแปลงเป็น USD ก่อน แล้วคูณด้วยอัตราเป้าหมาย
    const amountInUSD = amount / rates[fromCurrency];
    const convertedAmount = amountInUSD * rates[toCurrency];
    const formattedAmount = convertedAmount.toFixed(2);

    resultDiv.textContent = `${amount} ${fromCurrency} = ${formattedAmount} ${toCurrency}`;
}

// โหลดข้อมูลเมื่อหน้าเว็บโหลด
fetchCurrencies();