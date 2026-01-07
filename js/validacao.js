// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Validação de Telefone Brasileiro
function validarTelefone(telefone) {
    const regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
    return regex.test(telefone.replace(/\s/g, ''));
}

// Formatação de CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Formatação de Telefone
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    return telefone;
}

// Validação do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contatoForm');
    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            this.value = formatarTelefone(this.value);
        });
        
        telefoneInput.addEventListener('blur', function() {
            if (this.value && !validarTelefone(this.value)) {
                this.classList.add('is-invalid');
                document.getElementById('telefoneError').textContent = 'Telefone inválido. Use o formato (11) 99999-9999';
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            this.value = formatarCPF(this.value);
        });
        
        cpfInput.addEventListener('blur', function() {
            if (this.value && !validarCPF(this.value)) {
                this.classList.add('is-invalid');
                document.getElementById('cpfError').textContent = 'CPF inválido';
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Valida telefone
            if (telefoneInput.value && !validarTelefone(telefoneInput.value)) {
                telefoneInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Valida CPF (se preenchido)
            if (cpfInput.value && !validarCPF(cpfInput.value)) {
                cpfInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, corrija os erros no formulário antes de enviar.');
            } else {
                e.preventDefault();
                // Mostrar mensagem de sucesso
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            }
        });
    }
});