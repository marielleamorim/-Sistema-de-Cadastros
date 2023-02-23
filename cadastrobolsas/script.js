(function() {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function(form) {
        form.addEventListener('submit', function(event) {
          if (!form.checkValidity()) {
            form.classList.add('was-validated')
          } else {
            inserir()
            form.classList.remove('was-validated')
            form.reset()
          }
          event.preventDefault()
          event.stopPropagation()
        }, false)
      })
  })()
  
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_bolsas')) ?? [];
  }
  
  function setLocalStorage(bd_bolsas) {
    localStorage.setItem('bd_bolsas', JSON.stringify(bd_bolsas));
  }
  
  function limparTabela() {
    var elemento = document.querySelector("#tabela>tbody");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }
  
  function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
    limparTabela();
    const bd_bolsas = getLocalStorage();
    let index = 0;
    for (bolsas of bd_bolsas) {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
          <th scope="row">${index}</th>
          <td>${bolsas.tipo}</td>
          <td>${bolsas.estilo}</td>
          <td>${bolsas.valor}</td>
          <td>${bolsas.tamanho}</td>
          <td>${bolsas.cor}</td>
          <td>${bolsas.estampa}</td>
          <td>
              <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
          </td>
      `
      document.querySelector('#tabela>tbody').appendChild(novaLinha)
      index++;
    }
  }
  
  function inserir() { // Adaptação da função inserir (10 pontos)
    const bolsa = {
      tipo: document.getElementById('tipo').value,
      estilo: document.getElementById('estilo').value,
      valor: document.getElementById('valor').value,
      tamanho: document.getElementById('tamanho').value,
      cor: document.getElementById('cor').value,
      estampa: document.getElementById('estampa').value,
    }
    const bd_bolsas = getLocalStorage();
    bd_bolsas.push(bolsa);
    setLocalStorage(bd_bolsas);
    atualizarTabela();
  }
  
  function excluir(index) { // Adaptação da função excluir (5 pontos)
    const bd_bolsas = getLocalStorage();
    bd_bolsas.splice(index, 1);
    setLocalStorage(bd_bolsas);
    atualizarTabela();
  }
  
  function validarTipo() { // Adaptação da função validar (10 pontos)
    const bd_bolsas = getLocalStorage();
    for (bolsa of bd_bolsas) {
      if (tipo.value == bolsa.tipo) {
        tipo.setCustomValidity("Este tipo de bolsa já existe!");
        feedbackTipo.innerText = "Este tipo de bolsa já existe!";
        return false;
      } else {
        tipo.setCustomValidity("");
        feedbackTipo.innerText = "Informe o tipo corretamente.";
      }
    }
    return true;
  }
  
  atualizarTabela();
  // Seleção dos elementos e adição do listener para validação customizada (5 pontos)
  const tipo = document.getElementById("tipo");
  const feedbackTipo = document.getElementById("feedbackTipo");
  tipo.addEventListener('input', validarTipo);