document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const qrContainer = document.getElementById('qrContainer');
    const qrcodeElement = document.getElementById('qrcode');
    const formContainer = document.getElementById('formContainer');
    const mainContainer = document.querySelector('.container');
    const generateBtn = document.getElementById('generateBtn');
    let qrCodeInstance = null;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animación del botón al hacer clic
        generateBtn.classList.add('clicked');
        setTimeout(() => generateBtn.classList.remove('clicked'), 300);
        
        // Verificar librería QRCode
        if (typeof QRCode === 'undefined') {
            alert('Error: La librería QRCode no se cargó correctamente. Recarga la página.');
            return;
        }
        
        // Obtener valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            email: document.getElementById('email').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            notas: document.getElementById('notas').value.trim()
        };
        
        // Validar datos
        if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.email) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        // Crear vCard
        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${formData.nombre} ${formData.apellido}`,
            `N:${formData.apellido};${formData.nombre};;;`,
            `TEL:${formData.telefono}`,
            `EMAIL:${formData.email}`,
            formData.empresa ? `ORG:${formData.empresa}` : '',
            formData.notas ? `NOTE:${formData.notas}` : '',
            'END:VCARD'
        ].filter(line => line !== '').join('\n');
        
        // Limpiar QR anterior
        qrcodeElement.innerHTML = '';
        
        // Crear nuevo QR
        if (qrCodeInstance) {
            qrCodeInstance.clear();
            qrCodeInstance.makeCode(vCardData);
        } else {
            qrCodeInstance = new QRCode(qrcodeElement, {
                text: vCardData,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        
        // Animaciones
        mainContainer.classList.add('with-qr');
        setTimeout(() => {
            qrContainer.classList.add('visible');
            qrContainer.classList.remove('hidden');
        }, 300);
        
        // Desplazamiento suave
        setTimeout(() => {
            qrContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
    });
});