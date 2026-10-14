# Estudo reproduzível: divergência na classificação do projeto IoT

**Matheus Cuero Silva — revisão técnica de código público**

## Problema observado

O repositório `Oroboni/Atividade_Multiplataforma` contém duas funções de classificação. `backend/route.js` define uma regra local que usa temperatura e qualidade do ar; `backend/rules.js` contém outra regra, com limites diferentes e inclusão da umidade.

## Reprodução isolada

O arquivo `reproduzir-regras-iot.cjs` reproduz as condições das duas funções, sem iniciar Express ou conectar ao banco. Requer Node.js e não instala dependências.

Execute na pasta dos dois arquivos:

```sh
node reproduzir-regras-iot.cjs
```

Resultados verificados em 14/10/2026:

| Entrada | Regra do router | Regra do módulo |
| --- | --- | --- |
| Temperatura 33 °C, umidade 50%, ar 100 | alerta | critico |
| Temperatura 25 °C, umidade 20%, ar 100 | normal | critico |

O script usa asserts para conferir os resultados observados e confirmar que as funções divergem nas mesmas entradas.

## Interpretação

A reprodução comprova a diferença entre as funções. Ela não estabelece qual regra é correta: os limites precisam ser confirmados com o requisito do domínio. Tampouco comprova qual handler recebe as requisições da aplicação completa.

Na inicialização consultada, `server.js` importa `./routes`, mas o arquivo público disponível é `route.js`. Depois de conferir essa divergência de módulo, também é preciso acompanhar a ordem de montagem do router e o handler efetivamente usado em `POST /dados`.

## Proposta de alteração

1. Confirmar a regra canônica e seus limites com o responsável pelo domínio.
2. Conferir a resolução do módulo e a montagem das rotas.
3. Centralizar a classificação numa função usada pelo handler ativo.
4. Validar tipos, campos ausentes e valores inválidos do payload.
5. Adicionar testes nos limites acordados.
6. Conferir que resposta, persistência e dashboard mostram o mesmo status.

## Critérios de aceite

- A API inicia com os módulos esperados.
- Um único handler atende a operação conforme o contrato definido.
- As classificações seguem a regra aprovada, inclusive nas fronteiras.
- O valor retornado é o mesmo persistido e exibido.
- Cenários válidos existentes continuam funcionando.

## Limite da evidência

A reprodução isolada foi executada. O backend completo e o banco não foram iniciados, e o repositório original não foi alterado. O estudo apresenta diagnóstico e proposta; não afirma que houve uma correção publicada.

## Fontes

- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/route.js
- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/rules.js
- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/server.js
