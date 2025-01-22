let ul = document.getElementById("contents");
const plus = document.querySelector(".add");
// ---------------------- GLOBAL SCOPE, INITIAL RENDERING -------------------------
let listaOs = [];
let novaLi = "";
pegarLs();
renderizarLs();
// --------------------------------------------------------------------------------

//-------------------------- MAIN FUNCTIONALITY ------------------------------------
function mostrarTarefa(tarefa, index) {
  novaLi = "";

  novaLi += `
    
  <div class="some-input" id="idInputOs"> 
  
 
      <div class="camp-input ">           
                                    
        <p id="camp"> Nome do cliente:</p>
        <input type="text" value="${tarefa.nomeDoCliente}" class="txt" id="txt1-${index}">
        <p id="camp" >Carro:</p>
        <input type="text" value="${tarefa.carro}" class="txt" id="txt2-${index}">
        <p id="camp" >Placa:</p>
        <input type="text"  value="${tarefa.placa}" class="txt"  id="txt3-${index}">
        <p id="camp" >Km:</p>
        <input type="text" value="${tarefa.km}"class="txt" id="txt4-${index}">
        <p id="camp"  >Ano:</p>
        <input type="text"  value="${tarefa.ano}"class="txt" id="txt5-${index}">
        <i class="arrows arrows-${index} bi bi-arrow-down" onclick="changeOpacity(${index})" ></i>
        <svg class="remove" onclick="dell(${index})" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>
  
      </div>

   </div>
   
   <div class="ex-${index}">
   <div class="expand">

      <p id="camp">Descrição:</p>
      <textarea class="txt" value="${tarefa.descricao}" id="txt6-${index}"></textarea>
      <p id="camp" >V. UNIT: </p>
      <input type="text" class="txt" value="${tarefa.vUnit}" id="txt7-${index}">
      <p id="camp" >Valor R$: </p>
      <input type="text" class="txt"  value="${tarefa.valor}" id="txt8-${index}">
      <p id="camp"> Total de peças:</p>
      <input type="text"  value="${tarefa.totalDePecas}" class="txt" id="txt9-${index}">
      <p id="camp"> Total de serviços:</p>
      <input type="text" value="${tarefa.totalDeServicos}"class="txt" id="txt10-${index}">
      <p id="camp" >Total Geral:</p>
      <input type="text" value="${tarefa.totalGeral}" class="txt" id="txt11-${index}">
      <button onclick="adicionarInputLs(${index})" class="btn btn-primary btn-lg" >Salvar Dados</button>
    
      </div>
   </div>
   
   `;
 
   return novaLi;
   
   
}

function renderizarLs() {
  novaLi = "";
  for (let i = 0; i < listaOs.length; i++) {
    let tarefa = mostrarTarefa(listaOs[i], i);
    ul.innerHTML += `<span class="teste-${i}">${tarefa}</span>`;
    const TextA = document.getElementById(`txt6-${i}`)
    TextA.innerText = listaOs[i].descricao
  }
}

function changeOpacity(index) {
  let expandir = document.querySelector(`.ex-${index}`);
  let arrowUpDown = document.querySelector(`.arrows-${index}`);
  arrowUpDown.classList.toggle("bi-arrow-up");
  expandir.classList.toggle("active");
}

function adicionarInputLs(index) {
  let ids = {
    nomeDoCliente: document.getElementById(`txt1-${index}`).value,
    carro: document.getElementById(`txt2-${index}`).value,
    placa: document.getElementById(`txt3-${index}`).value,
    km: document.getElementById(`txt4-${index}`).value,
    ano: document.getElementById(`txt5-${index}`).value,
    descricao: document.getElementById(`txt6-${index}`).value,
    vUnit: document.getElementById(`txt7-${index}`).value,
    valor: document.getElementById(`txt8-${index}`).value,
    totalDePecas: document.getElementById(`txt9-${index}`).value,
    totalDeServicos: document.getElementById(`txt10-${index}`).value,
    totalGeral: document.getElementById(`txt11-${index}`).value,
  };
  
  listaOs[index] = ids;
  setarLs();
}
function mostrarNovaTarefa() {
  let tarefa = {
    nomeDoCliente: "",
    carro: "",
    placa: "",
    km: "",
    ano: "",
    descricao: "",
    vUnit: "",
    valor: "",
    totalDePecas: "",
    totalDeServicos: "",
    totalGeral: "",
  };
  let index = listaOs.length;
  let tarefaHtml = mostrarTarefa(tarefa, index);
  listaOs.push(tarefa);
  setarLs();
  ul.innerHTML += `<span>${tarefaHtml}</span>`;
  const TextA = document.getElementById(`txt6-${index}`)
  TextA.innerText = listaOs[index].descricao

  setTimeout(() => {
    window.location.reload();
  }, 150);
}

function setarLs() {
  localStorage.setItem("key", JSON.stringify(listaOs));
}

function pegarLs() {
  const TarefasLocal = localStorage.getItem("key");
  if (TarefasLocal) {
    listaOs = JSON.parse(TarefasLocal);
  }
}

plus.addEventListener("click", mostrarNovaTarefa);

function dell(index) {
  listaOs.splice(index, 1);

  setarLs();
  ul.innerHTML = "";
  renderizarLs();
}

function textArea() {
  

}
textArea()


//---------------------------------------------------------------------------------------------------------

//--------------------------------SEARCH-------------------------------------------------
const search = document.getElementById("inputSearchId");

search.addEventListener("input", (e) => {
  for (let i = 0; i < listaOs.length; i++) {
    const selectAllSpan = document.querySelector(`.teste-${i}`);
    const selectAllID = document.querySelectorAll(`#txt1-${i}`);
    selectAllID.forEach((valor) => {
      const searchValue = format(e.target.value);
      const ValorDoInput = valor.value;
      if (searchValue === ValorDoInput) {
        selectAllSpan.style.display = "block";
      } else {
        selectAllSpan.style.display = "none";
      }
      if (ValorDoInput.includes(searchValue)) {
        selectAllSpan.style.display = "block";
      } else {
        selectAllSpan.style.display = "none";
      }
    });
  }
});

function format(result) {
  return result.toLowerCase().trim();
}
//----------------------------------------------------------------------------------------
