# Procedimento de sustentação de sistemas

**Matheus Cuero Silva — exemplo de método de trabalho**

Este documento propõe um roteiro técnico. Deve ser adaptado à arquitetura, aos processos e à criticidade de cada sistema.

## 1. Registrar o problema e o impacto

- Descrever o comportamento observado e o comportamento esperado.
- Identificar a jornada afetada, usuários ou integrações envolvidos e quando a falha começou.
- Distinguir indisponibilidade, perda de dados, degradação e falha funcional.
- Registrar mudanças recentes e eventuais mitigação e contorno.
- Definir a prioridade com o responsável pelo sistema, conforme o impacto real.

## 2. Mapear o sistema antes de alterar

| Ativo | Informação necessária |
| --- | --- |
| Código | Repositório, branch, commit e responsável |
| Aplicação | Versão ativa, runtime, serviço e configuração relevante |
| Publicação | Workflow, artefato, ambiente e procedimento de rollback |
| Banco | Tecnologia, schema, migrations e contrato de dados |
| Integrações | Endpoints, contratos e dependências |
| Rede | Proxy ou balanceador, rota, porta e health check |
| Observabilidade | Logs, métricas, identificador de requisição e janela do incidente |

## 3. Formular e testar hipóteses

Separar observação de interpretação. Para cada hipótese, registrar:

1. A evidência que a apoia.
2. A verificação que pode confirmá-la ou descartá-la.
3. O resultado da verificação.
4. O próximo passo de menor impacto.

Reproduzir em um ambiente isolado quando possível. Uma mensagem genérica na tela não deve substituir a exceção específica da aplicação ou do banco.

## 4. Usar IA com contexto e revisão

Preparar um pedido que contenha problema, arquitetura, evidências relevantes, limites da alteração e critérios de aceite. Remover credenciais e dados pessoais do material compartilhado; confirmar quais informações podem ir ao provedor escolhido.

O OmniRoute pode centralizar o acesso aos modelos. Selecionar o modelo e o caminho de execução conforme a tarefa e os dados permitidos. Um gateway local ainda pode encaminhar o conteúdo a serviços externos; a decisão sobre dados depende do provedor e do ambiente.

Pedir hipóteses verificáveis e uma mudança mínima. Depois conferir:

- Se a proposta explica a evidência e preserva as regras do domínio.
- Se alterou arquivos ou configurações fora do escopo.
- Se erros, permissões, persistência e integrações continuam coerentes.
- Se o teste reproduz o problema original e detecta sua regressão.

Fallback pode manter o fluxo de requisições, mas não comprova qualidade funcional. Revisar a resposta após a troca de modelo.

## 5. Preparar mudança e reversão

- Vincular a alteração a um commit e a um registro de entrega.
- Revisar o diff e as dependências afetadas.
- Confirmar a estratégia de schema, migrations e preservação de dados.
- Gerar um artefato identificável.
- Registrar como ativar a nova versão e como retornar à anterior.
- Definir os sinais que justificam o rollback.

## 6. Validar antes e depois da publicação

| Verificação | Evidência esperada |
| --- | --- |
| Regressão | O cenário que falhava agora tem o comportamento esperado |
| Persistência | O banco mantém os valores e relações corretos |
| Compatibilidade | O teste usa um ambiente compatível com o contrato real |
| Publicação | Commit, artefato e versão ativa correspondem |
| Disponibilidade | Serviço, rota e health check respondem conforme esperado |
| Jornada | O usuário consegue concluir o fluxo afetado |
| Acompanhamento | Erros e latência não indicam nova degradação |

Health check aprovado não substitui o teste da jornada. Uma alteração no código só está ativa depois de publicada e carregada pelo processo que atende o sistema.

## 7. Devolver uma resposta clara

Modelo de devolutiva para preencher com os resultados reais:

> Identificamos [origem confirmada], que afetava [jornada ou integração].
> Aplicamos [ação] e validamos [evidência concreta].
> O estado atual é [resultado observado].
> O acompanhamento e o próximo passo são [medida acordada].

Evitar declarar sucesso antes de verificar a execução. Quando a causa ainda for uma hipótese, comunicar essa condição e a verificação que falta.

## Referências do repertório

- Testes e compatibilidade: https://github.com/Oroboni/InsEmpodera/blob/Online/.github/workflows/testes.yml
- Consistência de dados: https://github.com/Oroboni/Dracotheca/blob/main/Admin/PHP/devolucao.php
- Integração e revisão de rotas: https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/server.js
- Gateway e observabilidade de IA: https://github.com/diegosouzapw/OmniRoute
