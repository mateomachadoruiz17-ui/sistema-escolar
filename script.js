let admin = { user:"admin", pass:"9999" };

let tiposNotas = ["tarea","quiz","evaluacion"];

function newNotas(){
  let obj = {};
  tiposNotas.forEach(t => obj[t] = 0);
  return obj;
}

function nivel(n){
  if(n <= 29) return "Bajo";
  if(n <= 39) return "Básico";
  if(n <= 44) return "Alto";
  return "Superior";
}

// 🔥 ESTUDIANTES
let data = {
"dante":{nombre:"DANTE BARACALDO",pass:"1111",notas:newNotas(),obs:[],pub:[]},
"nelson":{nombre:"NELSON BESERRA",pass:"2222",notas:newNotas(),obs:[],pub:[]},
"daniela":{nombre:"DANIELA BLANCO",pass:"3333",notas:newNotas(),obs:[],pub:[]},
"daniel":{nombre:"DANIEL BORQUES",pass:"4444",notas:newNotas(),obs:[],pub:[]},
"alejandro":{nombre:"ALEJANDRO BUITRAGO",pass:"5555",notas:newNotas(),obs:[],pub:[]},
"sara":{nombre:"SARA CARDONA",pass:"6666",notas:newNotas(),obs:[],pub:[]},
"amaia":{nombre:"AMAIA ROSA COCA",pass:"7777",notas:newNotas(),obs:[],pub:[]},
"ani":{nombre:"ANI SAMARA CASTAÑO",pass:"8888",notas:newNotas(),obs:[],pub:[]},
"santiago":{nombre:"SANTIAGO DURAN",pass:"9999",notas:newNotas(),obs:[],pub:[]},
"estiven":{nombre:"FORERO ESTIVEN",pass:"1010",notas:newNotas(),obs:[],pub:[]},
"camila":{nombre:"CAMILA DIAS",pass:"1112",notas:newNotas(),obs:[],pub:[]},
"valeri":{nombre:"VALERI SANABRIA",pass:"1212",notas:newNotas(),obs:[],pub:[]},
"maria":{nombre:"MARIAFERNANDA GUAUTA",pass:"1313",notas:newNotas(),obs:[],pub:[]},
"antonia":{nombre:"ANTONIA LEON",pass:"1414",notas:newNotas(),obs:[],pub:[]},
"mariana":{nombre:"MARIANA LOPEZ",pass:"1515",notas:newNotas(),obs:[],pub:[]},
"felipe":{nombre:"FELIPE MARTELO",pass:"1616",notas:newNotas(),obs:[],pub:[]},
"mateo":{nombre:"MATEO MACHADO RUIZ",pass:"1717",notas:newNotas(),obs:[],pub:[]},
"jeray":{nombre:"JERAY MARTINEZ",pass:"1818",notas:newNotas(),obs:[],pub:[]},
"joel":{nombre:"JOEL MARTINEZ",pass:"1919",notas:newNotas(),obs:[],pub:[]},
"dana":{nombre:"DANA MATIZ",pass:"2020",notas:newNotas(),obs:[],pub:[]},
"miguel":{nombre:"MIGUEL MOGICA",pass:"2121",notas:newNotas(),obs:[],pub:[]},
"sharol":{nombre:"SHAROL ANDICA",pass:"2223",notas:newNotas(),obs:[],pub:[]},
"leonel":{nombre:"LEONEL RAMIRES",pass:"2323",notas:newNotas(),obs:[],pub:[]},
"celeste":{nombre:"CELESTE RENDON",pass:"2424",notas:newNotas(),obs:[],pub:[]},
"james":{nombre:"JAMES RODRIGUEZ",pass:"2525",notas:newNotas(),obs:[],pub:[]},
"joshua":{nombre:"JOSHUA RAMOS",pass:"2626",notas:newNotas(),obs:[],pub:[]},
"mia":{nombre:"MIA SANCHEZ",pass:"2727",notas:newNotas(),obs:[],pub:[]},
"julian":{nombre:"JULIAN SALAMANCA",pass:"2828",notas:newNotas(),obs:[],pub:[]},
"laura":{nombre:"LAURA VARGAS",pass:"2929",notas:newNotas(),obs:[],pub:[]},
"franchesco":{nombre:"FRANCHESCO SAMORA",pass:"3030",notas:newNotas(),obs:[],pub:[]},
"elian":{nombre:"ELIAN VEGA",pass:"3131",notas:newNotas(),obs:[],pub:[]},
"carlos":{nombre:"CARLOS VELANDIA",pass:"3232",notas:newNotas(),obs:[],pub:[]},
"andres":{nombre:"ANDRES VIELMA",pass:"3334",notas:newNotas(),obs:[],pub:[]}
};

// GUARDAR LOCAL
let guardado = localStorage.getItem("data");
if(guardado){
  data = JSON.parse(guardado);
}

function guardar(){
  localStorage.setItem("data", JSON.stringify(data));
}

// LOGIN
function login(){
  let u = user.value.trim().toLowerCase();
  let p = pass.value;

  if(u===admin.user && p===admin.pass){
    adminPanel();
    return;
  }

  if(data[u] && data[u].pass===p){
    studentPanel(u);
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// ESTUDIANTE
function studentPanel(u){
  let e = data[u];

  let total=0, count=0;
  for(let n in e.notas){ total+=e.notas[n]; count++; }

  let promedio = total/count;

  let notasHTML="";
  for(let n in e.notas){
    notasHTML+=`<p>${n}: ${e.notas[n]} (${nivel(e.notas[n])})</p>`;
  }

  document.body.innerHTML=`
  <div class="card">
    <h2>${e.nombre}</h2>

    <div class="box" onclick="toggle('n')">📚 Notas</div>
    <div id="n" class="hidden">${notasHTML}</div>

    <h3>Promedio: ${promedio.toFixed(2)}</h3>

    <div class="box" onclick="toggle('o')">📝 Observaciones</div>
    <div id="o" class="hidden">${e.obs.join("<br>")||"Sin observaciones"}</div>

    <div class="box" onclick="toggle('p')">📢 Publicaciones</div>
    <div id="p" class="hidden">${e.pub.join("<br>")||"Sin publicaciones"}</div>
  </div>`;
}

// ADMIN
function adminPanel(){
  let html=`<h2>👨‍💼 ADMIN</h2><button onclick="crearTipo()">➕ Nueva Nota</button>`;

  for(let u in data){
    let e=data[u];

    html+=`<div class="card"><h3>${e.nombre}</h3>`;

    for(let n in e.notas){
      html+=`<input value="${e.notas[n]}"
      onchange="data['${u}'].notas['${n}']=parseFloat(this.value); guardar()">`;
    }

    html+=`
    <input placeholder="Observación" onchange="data['${u}'].obs.push(this.value); guardar()">
    <input placeholder="Publicación" onchange="data['${u}'].pub.push(this.value); guardar()">
    </div>`;
  }

  document.body.innerHTML=html;
}

function crearTipo(){
  let nombre = prompt("Nombre de la nota");

  if(nombre){
    nombre = nombre.toLowerCase();

    if(tiposNotas.includes(nombre)) return;

    tiposNotas.push(nombre);

    for(let u in data){
      data[u].notas[nombre]=0;
    }

    guardar();
    adminPanel();
  }
}

function toggle(id){
  document.getElementById(id).classList.toggle("hidden");
}