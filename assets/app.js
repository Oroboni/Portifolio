"use strict";

// Conteúdo editorial verificável. As demonstrações são identificadas como simulações.
const CASES = {
  empodera: {
    label: "01 / APLICAÇÃO WEB · PROJETO ACADÊMICO EM EQUIPE",
    title: "Instituto Empodera",
    intro: "Projeto colaborativo para o Instituto Empodera. O código reúne aplicação ASP.NET Core MVC, modelos relacionais e funcionalidades de gestão. A branch Online concentra a estrutura de testes explorada neste portfólio.",
    sections: [
      ["Contexto e arquitetura", "A aplicação usa .NET 9, Entity Framework Core e suporte a MariaDB/MySQL por Pomelo, além de SQLite. Interface, controllers, modelos e persistência oferecem um percurso claro para investigar um problema de ponta a ponta."],
      ["Evidência de qualidade", "O workflow testes.yml contém etapas para backend, frontend e jornadas no Chromium. Há um job específico para compatibilidade com MariaDB 10.4.32. Os resultados e artefatos são publicados mesmo quando uma etapa falha, apoiando a investigação."],
      ["Raciocínio de sustentação", "Se o login falha apenas em um ambiente, comparo a versão publicada, a configuração e os logs da aplicação com o contrato do banco. Se o pipeline falha, separo regressão funcional de incompatibilidade de ambiente e examino a etapa e o artefato correspondentes."],
      ["Como validaria uma alteração", "Reproduzir a falha; criar ou selecionar um teste de regressão; conferir persistência no banco compatível; executar a jornada afetada; publicar uma versão identificável; conferir logs e comportamento após o deploy."]
    ],
    boundary: "Foi verificada a existência e a configuração do código e do workflow. Este portfólio não afirma que a última execução está aprovada, nem atribui a uma única pessoa todo o trabalho da equipe.",
    links: [
      ["Repositório · Online", "https://github.com/Oroboni/InsEmpodera/tree/Online"],
      ["Workflow de testes", "https://github.com/Oroboni/InsEmpodera/blob/Online/.github/workflows/testes.yml"],
      ["Dependências e versão", "https://github.com/Oroboni/InsEmpodera/blob/Online/InsEmpodera.csproj"],
      ["Equipe do projeto", "https://github.com/Oroboni/InsEmpodera/blob/main/README.md"]
    ]
  },
  dracotheca: {
    label: "02 / TCC · PROJETO COLABORATIVO",
    title: "Dracotheca",
    intro: "Sistema de gerenciamento de biblioteca desenvolvido em equipe. O domínio inclui acervo, alunos, bibliotecários, empréstimos e devoluções — fluxos nos quais uma mudança precisa preservar consistência e regras de negócio.",
    sections: [
      ["O fluxo observado no código", "A devolução administrativa verifica o aluno, o livro e o empréstimo ativo. Em seguida registra a devolução, marca o empréstimo como devolvido e atualiza a disponibilidade do livro dentro de uma transação MySQL."],
      ["Por que isso importa na sustentação", "Um problema na devolução pode aparecer em telas diferentes, mas nascer na atualização de um mesmo conjunto de registros. A investigação precisa acompanhar as relações entre aluno, empréstimo e livro, além da sessão e dos parâmetros recebidos."],
      ["Regras e pontos de atenção", "O fluxo de renovação usa sessão, busca o empréstimo e calcula datas. Ao evoluir esse trecho, revisaria limites de prazo, estados do empréstimo e consistência entre a atualização e o registro de renovação."],
      ["Critérios de aceite propostos", "Uma devolução válida atualiza os três registros esperados; uma falha deve reverter a operação; empréstimos inexistentes são rejeitados; cenários nos limites de data têm comportamento acordado e testado."]
    ],
    boundary: "A transação e as consultas parametrizadas foram observadas no arquivo de devolução. Isso não equivale a uma auditoria de segurança do sistema completo ou à comprovação de sua execução atual.",
    links: [
      ["Repositório", "https://github.com/Oroboni/Dracotheca"],
      ["Fluxo de devolução", "https://github.com/Oroboni/Dracotheca/blob/main/Admin/PHP/devolucao.php"],
      ["Regra de renovação", "https://github.com/Oroboni/Dracotheca/blob/main/Aluno/PHP/renovar.php"],
      ["Contexto e equipe", "https://github.com/Oroboni/Dracotheca/blob/main/README.md"]
    ]
  },
  iot: {
    label: "03 / INTEGRAÇÃO · ACHADO DE REVISÃO DE CÓDIGO",
    title: "Monitoramento ambiental IoT",
    intro: "Projeto acadêmico que descreve o percurso ESP32 → MQTT → Node-RED → API Node.js → MySQL → dashboard React. O código público permite examinar como regras, rotas e persistência se conectam.",
    sections: [
      ["Integração entre camadas", "O repositório contém configuração de IoT, fluxo Node-RED, backend Express e frontend React. A API implementa inserção de leituras, consulta ao histórico, médias da última hora e agrupamento por status."],
      ["Achado concreto: importação e arquivo divergentes", "No snapshot consultado, backend/server.js importa ./routes, enquanto o arquivo disponível se chama route.js. Isso sugere uma falha de resolução de módulo no início da execução. É um achado estático que precisa ser reproduzido em um ambiente isolado."],
      ["Achado concreto: duas classificações", "route.js define uma classificação local e não usa a umidade. rules.js contém outra regra, com limites diferentes e umidade incluída. server.js também define POST /dados depois de montar o router. Após resolver a importação, é necessário verificar qual handler responde e alinhar uma única regra ao requisito do domínio."],
      ["Evidência reproduzível", "Uma reprodução isolada das duas funções foi executada com asserts. Com temperatura de 33 °C, umidade de 50% e ar 100, o router retorna alerta e o módulo retorna critico. Com temperatura de 25 °C e umidade de 20%, o router retorna normal e o módulo retorna critico. O script e o estudo estão disponíveis abaixo."],
      ["Proposta de correção e aceite", "Reproduzir a inicialização; alinhar o nome do módulo; confirmar o handler ativo; centralizar a classificação; validar o payload; testar valores nas fronteiras; confirmar que o status persistido e o exibido são iguais. A regra final deve ser acordada antes da alteração."]
    ],
    boundary: "As duas regras foram reproduzidas de forma isolada e sua divergência foi confirmada com asserts em 14/10/2026. O backend completo e o banco não foram executados, e nenhuma correção foi publicada no projeto original.",
    links: [
      ["Repositório", "https://github.com/Oroboni/Atividade_Multiplataforma"],
      ["Inicialização e rotas", "https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/server.js"],
      ["Router e consultas", "https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/route.js"],
      ["Regras de classificação", "https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/rules.js"],
      ["Estudo reproduzível", "./docs/estudo-regras-iot.md"],
      ["Script da reprodução", "./docs/reproduzir-regras-iot.cjs"]
    ]
  },
  devops: {
    label: "04 / AUTOMAÇÃO · PROJETO ACADÊMICO EM EQUIPE",
    title: "Pipeline de qualidade",
    intro: "O repositório DevOps_Grupo reúne atividades de aprendizado de DevOps. O workflow pipeline-aula05.yml fornece uma evidência concreta de automação de verificações e geração de artefato.",
    sections: [
      ["Gatilhos e dependências", "O workflow responde a push e pull request na branch main. O job de testes depende do build. Ambos preparam Node.js 22 e instalam as dependências com npm ci."],
      ["Verificações configuradas", "O build verifica a presença dos arquivos da aplicação. O job seguinte executa testes, lint e npm audit com limiar high. Depois copia HTML, CSS e JavaScript para dist e publica um artefato identificado pelo SHA do commit."],
      ["Valor para sustentação", "A separação de etapas ajuda a localizar o tipo de falha. O SHA do artefato liga a entrega a uma versão de código, permitindo distinguir uma mudança escrita de uma mudança efetivamente empacotada."],
      ["Limite do fluxo", "O arquivo configura verificação e empacotamento. Apesar do nome CI/CD, não há uma etapa de publicação em produção nesse workflow. Para uma entrega completa, acrescentaria o deploy e uma verificação do ambiente conforme os requisitos do cliente."]
    ],
    boundary: "A configuração do workflow foi verificada. A aprovação da execução mais recente não foi auditada. Testes, lint e auditoria são etapas distintas e não substituem a validação do comportamento após a publicação.",
    links: [
      ["Repositório", "https://github.com/Oroboni/DevOps_Grupo"],
      ["Workflow da Aula 05", "https://github.com/Oroboni/DevOps_Grupo/blob/main/.github/workflows/pipeline-aula05.yml"]
    ]
  }
};

const INCIDENTS = {
  alb: {
    code: "LAB-01", title: "Erro 503 após uma publicação",
    evidence: {title: "Separar o ALB da aplicação",text: "Neste cenário, o ALB responde 503 e a aplicação responde normalmente em sua rede privada. O detalhe decisivo está no target group usado pelo listener.",code: "GET /                  → ALB 503\nListener HTTPS:443     → tg-app-v2\nTargets registrados    → 0\nAplicação na rede VPC   → HTTP 200\nTarget group anterior  → tg-app-v1, 2 targets",note: "Um 503 não identifica sozinho a causa. Aqui, o grupo encaminhado pelo listener está vazio. Todos os targets unhealthy não implicam automaticamente 503: o ALB pode encaminhar tráfego em fail-open."},
    diagnosis: {title: "O tráfego foi direcionado a um grupo vazio",text: "A evidência sustenta uma divergência na configuração da entrega: o listener aponta para tg-app-v2, que não tem targets registrados.",list:["Conferir a regra efetiva do listener e o target group usado pela requisição.","Verificar se o pipeline registrou os targets esperados no novo grupo.","Conferir porta, protocolo e health check antes de liberar tráfego.","Escolher entre concluir o registro ou voltar ao grupo anterior, após confirmar que ele permanece apto."],note:"A proposta deve corrigir o encaminhamento e preservar o caminho de rollback. Abrir portas indiscriminadamente não resolve um grupo vazio."},
    validation: {title:"A resposta HTTP é só parte do aceite",text:"A configuração precisa corresponder à versão que deve atender o cliente.",list:["Confirmar targets registrados, saudáveis e da versão esperada.","Verificar listener, rota e health check pela rede correta.","Executar a jornada que falhava e conferir respostas e logs.","Observar métricas de erros e latência durante uma janela acordada.","Manter a configuração anterior identificada para rollback."],note:"Não declarar o incidente encerrado apenas porque o processo da aplicação está ativo."},
    client: {title:"Devolutiva objetiva ao cliente",text:"Exemplo de comunicação após as verificações do cenário simulado:",code:"Identificamos que o encaminhamento do balanceador passou\na usar um grupo sem servidores registrados após a publicação.\n\nRestauramos o encaminhamento para a versão anterior validada\ne confirmamos o retorno da jornada afetada.\n\nA próxima entrega terá uma verificação de registro e saúde dos\nservidores antes da troca de tráfego. Seguimos acompanhando\nerros e latência na janela combinada.",note:"A mensagem informa origem, ação, validação e prevenção. Os resultados deste exemplo são fictícios."}
  },
  database: {
    code:"LAB-02",title:"Login funciona localmente e falha no Linux",
    evidence:{title:"Seguir a falha até o banco",text:"O redirect de login indica que a aplicação recebeu a requisição. A exceção do banco é uma evidência mais específica que a mensagem exibida na tela.",code:"POST /Account          → 302\nGET /Account           → 200 (tela de login)\nLog da aplicação       → Table 'app.Usuarios' doesn't exist\nTabela no banco        → usuarios\nlower_case_table_names → 0",note:"Cenário didático inspirado em um diagnóstico anterior do Empodera. Não é uma verificação do ambiente atual."},
    diagnosis:{title:"Divergência no contrato de nomes",text:"Neste exemplo, a aplicação consulta Usuarios, mas o schema oferece usuarios em um banco com nomes sensíveis a maiúsculas. A falha acontece antes de comprovar a validade da senha.",list:["Reproduzir com um banco isolado e o mesmo contrato de nomes.","Conferir entidade, mapeamento ORM e schema canônico.","Propor um mapeamento explícito consistente com o schema.","Revisar o impacto em migrations e consultas sem renomear tabelas em massa."],note:"A IA pode localizar mapeamentos e gerar uma proposta. A revisão deve conferir se ela preserva o schema e os dados."},
    validation:{title:"Validar no banco que reproduz o ambiente",text:"Uma aprovação em SQLite não comprova compatibilidade com MariaDB.",list:["Usar uma importação isolada do schema sem dados pessoais.","Executar integração com as mesmas regras de nomes de tabela.","Testar login válido, inválido, sessão e permissões.","Conferir que a inicialização não altera dados fora do escopo.","Publicar e verificar a versão ativa antes de repetir o teste."],note:"A estratégia de schema e migrations deve ser explicitamente definida; um reset de banco não é um teste de regressão."},
    client:{title:"Comunicar a origem sem culpar o usuário",text:"Exemplo de devolutiva após a validação simulada:",code:"A falha de acesso foi localizada na integração com o banco:\no nome de uma tabela consultada diferia do schema do servidor.\n\nAjustamos o mapeamento e validamos os cenários de login\ne permissões em um ambiente compatível. Os dados foram\npreservados.\n\nVamos incluir esse cenário na verificação de compatibilidade\npara detectar a divergência antes de uma nova publicação.",note:"A comunicação distingue falha da integração de credenciais incorretas. A execução descrita é simulada."}
  },
  release: {
    code:"LAB-03",title:"A correção está no código, mas não no site",
    evidence:{title:"Comparar a versão escrita com a executada",text:"O commit contém a mudança. O serviço, porém, usa um artefato anterior. Antes de refazer o código, verifico o caminho de publicação.",code:"Commit com correção    → versão B\nArtefato publicado     → versão B\nSymlink de release     → releases/versao-A\nProcesso ativo         → versao-A/App.dll\nComportamento          → falha anterior continua",note:"Cenário simulado de deploy em Linux com systemd e releases versionadas."},
    diagnosis:{title:"O processo ainda executa a release anterior",text:"A entrega foi empacotada, mas o apontamento e o processo não foram atualizados. A divergência está na ativação da versão.",list:["Conferir artefato, commit, release, symlink e configuração do serviço.","Garantir que dados persistentes e uploads não dependam da pasta de release.","Definir a troca da versão com caminho de retorno.","Ativar a release e reiniciar o processo conforme o procedimento do serviço."],note:"Editar o repositório ou enviar um arquivo ao servidor não comprova que o processo carregou a mudança."},
    validation:{title:"Confirmar versão e comportamento",text:"A validação conecta a versão esperada ao fluxo do cliente.",list:["Verificar o destino do symlink e o executável do processo ativo.","Conferir os logs de inicialização após a ativação.","Validar o health check e a jornada corrigida.","Observar erros após a troca e verificar o caminho de rollback.","Registrar commit, artefato e versão ativa na entrega."],note:"Uma resposta 200 no health check confirma disponibilidade básica, mas a correção exige testar o fluxo afetado."},
    client:{title:"Explicar a diferença entre código e publicação",text:"Exemplo de devolutiva após a validação simulada:",code:"A alteração estava no pacote enviado, mas o serviço ainda\nexecutava a versão anterior.\n\nAtivamos a release correta e conferimos o funcionamento\nda jornada afetada e os logs após a troca.\n\nVamos registrar a versão ativa na entrega e adicionar uma\nverificação após o deploy. A release anterior permanece\ndisponível para reversão caso seja necessário.",note:"Os resultados são simulados. A estrutura da mensagem pode ser adaptada aos registros de uma entrega real."}
  }
};

const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

const dialog = $("#case-dialog");
let caseTrigger = null;
document.querySelectorAll("[data-case]").forEach(button => button.addEventListener("click", () => {
  const item = CASES[button.dataset.case];
  if (!item) return;
  caseTrigger = button;
  $("#case-content").innerHTML = `<p class="case-label">${escapeHTML(item.label)}</p><h2 id="case-title">${escapeHTML(item.title)}</h2><p>${escapeHTML(item.intro)}</p>${item.sections.map(([title,text])=>`<h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p>`).join("")}<p class="case-boundary"><strong>O que foi verificado:</strong> ${escapeHTML(item.boundary)}</p><div class="case-links">${item.links.map(([name,url])=>`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(name)} ↗</a>`).join("")}</div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
}));
$("#close-case").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener("close",()=>{document.body.classList.remove("dialog-open");caseTrigger?.focus();});

let activeScenario="alb";
let activeStep="evidence";
const steps=["evidence","diagnosis","validation","client"];
function renderIncident(){
  const incident=INCIDENTS[activeScenario];
  const content=incident[activeStep];
  $("#incident-code").textContent=`INCIDENTE / ${incident.code}`;
  $("#incident-title").textContent=incident.title;
  document.querySelectorAll("[data-scenario]").forEach(button=>{const selected=button.dataset.scenario===activeScenario;button.classList.toggle("active",selected);button.setAttribute("aria-pressed",String(selected));});
  document.querySelectorAll("[data-step]").forEach(button=>{const selected=button.dataset.step===activeStep;button.setAttribute("aria-selected",String(selected));button.tabIndex=selected?0:-1;});
  $("#lab-panel").setAttribute("aria-labelledby",`tab-${activeStep}`);
  $("#lab-panel").innerHTML=`<h4>${escapeHTML(content.title)}</h4><p>${escapeHTML(content.text)}</p>${content.code?`<pre>${escapeHTML(content.code)}</pre>`:""}${content.list?`<ol>${content.list.map(text=>`<li>${escapeHTML(text)}</li>`).join("")}</ol>`:""}<div class="lab-callout"><p>${escapeHTML(content.note)}</p></div>`;
  $("#next-step").textContent=activeStep==="client"?"Voltar às evidências ↶":"Próxima etapa →";
}
document.querySelectorAll("[data-scenario]").forEach(button=>button.addEventListener("click",()=>{activeScenario=button.dataset.scenario;activeStep="evidence";renderIncident();}));
document.querySelectorAll("[data-step]").forEach(button=>{
  button.addEventListener("click",()=>{activeStep=button.dataset.step;renderIncident();});
  button.addEventListener("keydown",event=>{
    if(!["ArrowRight","ArrowLeft","Home","End"].includes(event.key))return;
    event.preventDefault();
    let index=steps.indexOf(activeStep);
    if(event.key==="ArrowRight")index=(index+1)%steps.length;
    if(event.key==="ArrowLeft")index=(index-1+steps.length)%steps.length;
    if(event.key==="Home")index=0;
    if(event.key==="End")index=steps.length-1;
    activeStep=steps[index];renderIncident();$(`#tab-${activeStep}`).focus();
  });
});
$("#next-step").addEventListener("click",()=>{activeStep=steps[(steps.indexOf(activeStep)+1)%steps.length];renderIncident();});
renderIncident();

const menu=$(".menu-toggle");
function closeMenu(){menu.setAttribute("aria-expanded","false");$("#navigation").classList.remove("open");menu.querySelector("span").textContent="＋";}
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));$("#navigation").classList.toggle("open",open);menu.querySelector("span").textContent=open?"−":"＋";});
document.querySelectorAll("#navigation a").forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){closeMenu();menu.focus();}});
document.addEventListener("click",event=>{if(!event.target.closest(".header"))closeMenu();});
$("#year").textContent=new Date().getFullYear();

// Imagens originais da documentação pública do OmniRoute, com atribuição.
const OMNI_SCREENS={
 providers:{file:'01-providers.png',title:'Provedores em um só lugar',description:'O painel reúne conexões de diferentes provedores. Ajuda a entender qual serviço está disponível para atender às ferramentas conectadas.',alt:'Tela oficial de provedores do OmniRoute, com conexões agrupadas por tipo',width:1380,height:790},
 combos:{file:'02-combos.png',title:'Roteamento e caminhos de fallback',description:'Combos organizam modelos e estratégias de encaminhamento. São úteis para planejar continuidade quando um provedor falha ou atinge um limite.',alt:'Tela oficial de combos do OmniRoute, com combinações de modelos e estratégias de roteamento',width:1920,height:993},
 analytics:{file:'03-analytics.png',title:'Uso, tokens e custos estimados',description:'Analytics oferece visibilidade sobre consumo e atividade. Esses sinais ajudam a avaliar o uso dos modelos e comparar o custo operacional.',alt:'Tela oficial de analytics do OmniRoute, com consumo de tokens, custos estimados e atividade da demonstração',width:1920,height:993},
 health:{file:'04-health.png',title:'Saúde e sinais de funcionamento',description:'Health reúne informações de runtime, latência, cache e provedores. Apoia a investigação quando o fluxo de IA apresenta degradação.',alt:'Tela oficial de saúde do OmniRoute, com informações de runtime, latência, cache e provedores',width:1920,height:993}
};
let selectedOmni='providers';
document.querySelectorAll('[data-omni]').forEach(button=>button.addEventListener('click',()=>{
 selectedOmni=button.dataset.omni;
 const item=OMNI_SCREENS[selectedOmni];
 document.querySelectorAll('[data-omni]').forEach(option=>{const active=option.dataset.omni===selectedOmni;option.setAttribute('aria-pressed',String(active));option.classList.toggle('selected',active);});
 const picture=$('#omni-image');picture.src='./assets/omniroute/'+item.file;picture.alt=item.alt;picture.width=item.width;picture.height=item.height;
 $('#omni-image-title').textContent=item.title;
 $('#omni-image-description').textContent=item.description;
 $('#omni-page-indicator').textContent=String(Object.keys(OMNI_SCREENS).indexOf(selectedOmni)+1).padStart(2,'0')+' / 04';
}));
const imageDialog=$('#image-dialog');
$('#expand-omni').addEventListener('click',()=>{
 const item=OMNI_SCREENS[selectedOmni];
 const picture=$('#expanded-omni-image');picture.src='./assets/omniroute/'+item.file;picture.alt=item.alt;
 $('#image-dialog-title').textContent='OMNIROUTE / '+item.title.toUpperCase();
 imageDialog.showModal();imageDialog.scrollTop=0;document.body.classList.add('dialog-open');
});
$('#close-image').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog){const bounds=imageDialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)imageDialog.close();}});
imageDialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');$('#expand-omni').focus();});


const RUNBOOK_TEXT="# Procedimento de sustentação de sistemas\n\n**Matheus Cuero Silva — exemplo de método de trabalho**\n\nEste documento propõe um roteiro técnico. Deve ser adaptado à arquitetura, aos processos e à criticidade de cada sistema.\n\n## 1. Registrar o problema e o impacto\n\n- Descrever o comportamento observado e o comportamento esperado.\n- Identificar a jornada afetada, usuários ou integrações envolvidos e quando a falha começou.\n- Distinguir indisponibilidade, perda de dados, degradação e falha funcional.\n- Registrar mudanças recentes e eventuais mitigação e contorno.\n- Definir a prioridade com o responsável pelo sistema, conforme o impacto real.\n\n## 2. Mapear o sistema antes de alterar\n\n| Ativo | Informação necessária |\n| --- | --- |\n| Código | Repositório, branch, commit e responsável |\n| Aplicação | Versão ativa, runtime, serviço e configuração relevante |\n| Publicação | Workflow, artefato, ambiente e procedimento de rollback |\n| Banco | Tecnologia, schema, migrations e contrato de dados |\n| Integrações | Endpoints, contratos e dependências |\n| Rede | Proxy ou balanceador, rota, porta e health check |\n| Observabilidade | Logs, métricas, identificador de requisição e janela do incidente |\n\n## 3. Formular e testar hipóteses\n\nSeparar observação de interpretação. Para cada hipótese, registrar:\n\n1. A evidência que a apoia.\n2. A verificação que pode confirmá-la ou descartá-la.\n3. O resultado da verificação.\n4. O próximo passo de menor impacto.\n\nReproduzir em um ambiente isolado quando possível. Uma mensagem genérica na tela não deve substituir a exceção específica da aplicação ou do banco.\n\n## 4. Usar IA com contexto e revisão\n\nPreparar um pedido que contenha problema, arquitetura, evidências relevantes, limites da alteração e critérios de aceite. Remover credenciais e dados pessoais do material compartilhado; confirmar quais informações podem ir ao provedor escolhido.\n\nO OmniRoute pode centralizar o acesso aos modelos. Selecionar o modelo e o caminho de execução conforme a tarefa e os dados permitidos. Um gateway local ainda pode encaminhar o conteúdo a serviços externos; a decisão sobre dados depende do provedor e do ambiente.\n\nPedir hipóteses verificáveis e uma mudança mínima. Depois conferir:\n\n- Se a proposta explica a evidência e preserva as regras do domínio.\n- Se alterou arquivos ou configurações fora do escopo.\n- Se erros, permissões, persistência e integrações continuam coerentes.\n- Se o teste reproduz o problema original e detecta sua regressão.\n\nFallback pode manter o fluxo de requisições, mas não comprova qualidade funcional. Revisar a resposta após a troca de modelo.\n\n## 5. Preparar mudança e reversão\n\n- Vincular a alteração a um commit e a um registro de entrega.\n- Revisar o diff e as dependências afetadas.\n- Confirmar a estratégia de schema, migrations e preservação de dados.\n- Gerar um artefato identificável.\n- Registrar como ativar a nova versão e como retornar à anterior.\n- Definir os sinais que justificam o rollback.\n\n## 6. Validar antes e depois da publicação\n\n| Verificação | Evidência esperada |\n| --- | --- |\n| Regressão | O cenário que falhava agora tem o comportamento esperado |\n| Persistência | O banco mantém os valores e relações corretos |\n| Compatibilidade | O teste usa um ambiente compatível com o contrato real |\n| Publicação | Commit, artefato e versão ativa correspondem |\n| Disponibilidade | Serviço, rota e health check respondem conforme esperado |\n| Jornada | O usuário consegue concluir o fluxo afetado |\n| Acompanhamento | Erros e latência não indicam nova degradação |\n\nHealth check aprovado não substitui o teste da jornada. Uma alteração no código só está ativa depois de publicada e carregada pelo processo que atende o sistema.\n\n## 7. Devolver uma resposta clara\n\nModelo de devolutiva para preencher com os resultados reais:\n\n> Identificamos [origem confirmada], que afetava [jornada ou integração].\n> Aplicamos [ação] e validamos [evidência concreta].\n> O estado atual é [resultado observado].\n> O acompanhamento e o próximo passo são [medida acordada].\n\nEvitar declarar sucesso antes de verificar a execução. Quando a causa ainda for uma hipótese, comunicar essa condição e a verificação que falta.\n\n## Referências do repertório\n\n- Testes e compatibilidade: https://github.com/Oroboni/InsEmpodera/blob/Online/.github/workflows/testes.yml\n- Consistência de dados: https://github.com/Oroboni/Dracotheca/blob/main/Admin/PHP/devolucao.php\n- Integração e revisão de rotas: https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/server.js\n- Gateway e observabilidade de IA: https://github.com/diegosouzapw/OmniRoute\n";
document.querySelector('a[download="procedimento-sustentacao-matheus-cuero.md"]').addEventListener('click',event=>{event.preventDefault();const url=URL.createObjectURL(new Blob(['\uFEFF',RUNBOOK_TEXT],{type:'text/markdown;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='procedimento-sustentacao-matheus-cuero.md';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);});
