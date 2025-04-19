document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrcodeDiv = document.getElementById('qrcode');
    const errorMsg = document.getElementById('error-msg');
    
    let currentQRCode = null;
    
    // إنشاء الباركود
    generateBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        
        if (!text) {
            errorMsg.textContent = 'الرجاء إدخال نص أو رابط لإنشاء الباركود';
            qrcodeDiv.innerHTML = '';
            return;
        }
        
        errorMsg.textContent = '';
        qrcodeDiv.innerHTML = '';
        
        try {
            currentQRCode = new QRCode(qrcodeDiv, {
                text: text,
                width: 200,
                height: 200,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        } catch (e) {
            errorMsg.textContent = 'حدث خطأ أثناء إنشاء الباركود';
            console.error(e);
        }
    });
    
    // تحميل الباركود كصورة
    downloadBtn.addEventListener('click', function() {
        if (!currentQRCode) {
            errorMsg.textContent = 'لا يوجد باركود لتحميله. الرجاء إنشاء باركود أولاً';
            return;
        }
        
        const canvas = qrcodeDiv.querySelector('canvas');
        if (!canvas) {
            errorMsg.textContent = 'لا يمكن تحميل الباركود';
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'باركود.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});