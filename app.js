const WA="5541997668016",MAIL="samuelferreira.analytcs@outlook.com.br",LI="https://www.linkedin.com/in/samueljrferreira";
const WAMSG=encodeURIComponent("Olá, Samuel! Vi seu portfólio e gostaria de conversar.");
const waURL=`https://wa.me/${WA}?text=${WAMSG}`;
const ICON={wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a13 13 0 0 1-5.3-3.3c-1.5-1.6-2.3-3.1-2.4-4 0-.9.5-1.7 1-2.1.2-.2.4-.2.6-.2h.4c.2 0 .4 0 .5.4l.8 1.9c.1.2.1.3 0 .5l-.3.4-.3.4c-.1.1-.2.3-.1.5a7 7 0 0 0 3.4 2.9c.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.9.9c.2.1.4.2.4.3.1.2.1.8-.1 1.4Z"/></svg>',ml:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.200L4.200 7v1.600l7.800 5.200 7.800-5.200V7L12 12.200Z"/></svg>'};
const $=s=>document.querySelector(s);
const page=document.body.dataset.page;
const nav=[["index.html","Início","home"],["projetos.html","Projetos","proj"],["sobre.html","Sobre","sobre"],["contato.html","Contato","contato"]];
$("body").insertAdjacentHTML("afterbegin",`<header><div class="wrap"><a class="brand" href="index.html">Samuel Ferreira</a><nav aria-label="Principal">${nav.map(n=>`<a href="${n[0]}"${page===n[2]||(page==="detalhe"&&n[2]==="proj")?' aria-current="page"':""}>${n[1]}</a>`).join("")}<a class="btn p" href="contato.html">Fale comigo</a></nav></div></header>`);
$("body").insertAdjacentHTML("beforeend",`<footer><div class="wrap"><span>© 2026 Samuel Ferreira · Curitiba, PR</span><nav aria-label="Contato"><a href="${waURL}" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${MAIL}">E-mail</a><a href="${LI}" target="_blank" rel="noopener">LinkedIn</a></nav></div></footer><a class="fab" href="${waURL}" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp">${ICON.wa}</a>`);
const GL={eng:"ELT",bi:"BI",mig:"QLIK",auto:"AUTO",sys:"SYS"};
const card=p=>`<a class="card" data-c="${p.c}" href="projeto.html?id=${p.id}"><div class="top"><span class="cat">${CATS[p.c]}</span><span class="gl">${GL[p.c]}</span></div><div class="bd"><h3>${p.t}</h3><p>${p.x}</p><div class="chips">${p.g.slice(0,4).map(t=>`<span>${t}</span>`).join("")}</div><span class="go">Ver entregas e técnicas →</span></div></a>`;
const feat=$("#featured");if(feat)feat.innerHTML=["pipeline-droz","migracao-qlik","notificacao-atraso"].map(i=>card(PROJ.find(p=>p.id===i))).join("");
const grid=$("#grid");
if(grid){const F=$(".filters");const draw=k=>{grid.innerHTML=PROJ.filter(p=>k==="all"||p.c===k).map(card).join("")};
Object.entries({all:"Todos",...CATS}).forEach(([k,v])=>{const b=document.createElement("button");b.textContent=v;b.setAttribute("aria-pressed",k==="all");b.onclick=()=>{F.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw(k)};F.append(b)});draw("all");
$("#more").innerHTML=MORE.map(m=>`<tr><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td></tr>`).join("")}
const det=$("#detail");
if(det){const i=Math.max(0,PROJ.findIndex(p=>p.id===new URLSearchParams(location.search).get("id")));const p=PROJ[i],pr=PROJ[i-1],nx=PROJ[i+1];
document.title=`${p.t} | Samuel Ferreira`;
$("#crumb").innerHTML=`<a href="projetos.html">Projetos</a> / ${CATS[p.c]}`;$("#ptitle").textContent=p.t;$("#pctx").textContent=p.x;
det.innerHTML=`<div><h2>Entregas</h2><ul>${p.e.map(e=>`<li${e.startsWith("Resultado")?' class="res"':""}>${e}</li>`).join("")}</ul></div><aside class="aside"><div><h3>Técnicas e ferramentas</h3><div class="chips">${p.g.map(t=>`<span>${t}</span>`).join("")}</div></div><div><h3>Categoria</h3><p>${CATS[p.c]}</p></div><a class="btn p" href="contato.html">Falar sobre este projeto</a></aside>`;
$("#pn").innerHTML=`${pr?`<a href="projeto.html?id=${pr.id}">← ${pr.t}</a>`:"<span></span>"}${nx?`<a href="projeto.html?id=${nx.id}">${nx.t} →</a>`:"<span></span>"}`}
const f=$("#form");
if(f){f.onsubmit=async e=>{e.preventDefault();const s=$("#st"),d=Object.fromEntries(new FormData(f));s.className="";s.textContent="Enviando...";
try{const r=await fetch(`https://formsubmit.co/ajax/${MAIL}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({...d,_subject:`Portfólio: ${d.assunto} (${d.nome})`,_template:"table",_captcha:"false"})});
if(!r.ok)throw 0;f.reset();s.className="ok";s.textContent="Mensagem enviada. Respondo em breve."}catch(_){s.className="err";s.innerHTML=`Não foi possível enviar agora. Escreva para <a href="mailto:${MAIL}">${MAIL}</a> ou chame no WhatsApp.`}}}

["wa0","wa1","wa2"].forEach(i=>{const a=$("#"+i);if(a){a.href=waURL;a.target="_blank";a.rel="noopener";if(i!=="wa2")a.innerHTML=ICON.wa+" Chamar no WhatsApp"}});
