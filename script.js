const paymentLinks = {
    instapay: "https://ipn.eg/S/seifjamica/instapay/44wjBg",
    vodafone: ""
};


// ==========================
// روابط الدفع
// ==========================

const instapayButton = document.getElementById("instapayButton");
const vodafoneButton = document.getElementById("vodafoneButton");


// InstaPay
if (paymentLinks.instapay !== "") {

    instapayButton.href = paymentLinks.instapay;
    instapayButton.target = "_blank";

} else {

    instapayButton.addEventListener("click", function (event) {

        event.preventDefault();

        alert("رابط InstaPay سيتم إضافته قريبًا.");

    });

}


// Vodafone Cash
if (paymentLinks.vodafone !== "") {

    vodafoneButton.href = paymentLinks.vodafone;
    vodafoneButton.target = "_blank";

} else {

    vodafoneButton.addEventListener("click", function (event) {

        event.preventDefault();

        alert("رابط Vodafone Cash سيتم إضافته قريبًا.");

    });

}


// ==========================
// الوضع الليلي والنهاري
// ==========================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("elgabry-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

} else {

    themeToggle.textContent = "🌙";

}


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    if (isDark) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("elgabry-theme", "dark");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("elgabry-theme", "light");

    }

});
const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", async function () {

    const shareData = {
        title: "مكتبة الجبري",
        text: "صفحة الدفع الإلكتروني لمكتبة الجبري",
        url: window.location.href
    };

    if (navigator.share) {

        try {
            await navigator.share(shareData);
        } catch (error) {
            // المستخدم أغلق نافذة المشاركة
        }

    } else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert("✅ تم نسخ رابط صفحة الدفع");

        } catch (error) {

            alert("انسخ رابط الصفحة من شريط المتصفح.");

        }

    }

});
document.querySelectorAll(".copy-button").forEach(button => {

    button.addEventListener("click", async () => {

        const number = button.dataset.number;

        try {

            await navigator.clipboard.writeText(number);

            const oldText = button.textContent;

            button.textContent = "✅ تم النسخ";

            setTimeout(() => {
                button.textContent = oldText;
            }, 1800);

        } catch (error) {

            alert("تعذر نسخ الرقم تلقائيًا.");

        }

    });

});
const qrModal = document.getElementById("qrModal");
const largeQr = document.getElementById("largeQr");
const closeQr = document.getElementById("closeQr");

document.querySelectorAll(".qr-image").forEach(qr => {

    qr.addEventListener("click", () => {

        largeQr.src = qr.src;
        qrModal.classList.add("active");

    });

});

closeQr.addEventListener("click", () => {

    qrModal.classList.remove("active");

});

qrModal.addEventListener("click", event => {

    if (event.target === qrModal) {
        qrModal.classList.remove("active");
    }

});