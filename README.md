# Matheus Cuero Silva — portfólio de desenvolvimento e sustentação

Site estático em português, preparado para GitHub Pages. HTML, CSS e JavaScript sem instalação de dependências, sem backend e sem etapa de build.

## Abrir no computador

Abra `index.html` no navegador. Os estudos técnicos e o laboratório funcionam também diretamente pelo arquivo. O site não depende de fontes, bibliotecas ou imagens remotas.

## Publicar no GitHub Pages

### Opção mais simples: publicar pela branch

1. Crie um repositório público, por exemplo `portfolio-sustentacao`, na conta `Oroboni`.
2. Envie o **conteúdo desta pasta** para a raiz do repositório. `index.html` deve estar na raiz, não dentro de outra pasta. Inclua `assets/` e `.nojekyll`.
3. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**.
4. Selecione **main** e **/(root)** e salve.
5. Acompanhe o deploy. Após a publicação, o endereço esperado para esse nome de repositório é `https://oroboni.github.io/portfolio-sustentacao/`.

Nesta opção, não envie `.github/workflows/pages.yml`; ela pertence à opção por Actions. A URL acima é um endereço esperado, não uma confirmação de publicação.

### Opção com GitHub Actions

1. Envie todos os arquivos desta pasta, inclusive `.github/workflows/pages.yml`, para a raiz de um repositório público com branch `main`.
2. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
3. Abra **Actions → Publicar portfólio no GitHub Pages → Run workflow**, selecione `main` e execute.
4. O workflow valida a sintaxe JavaScript, prepara apenas os arquivos públicos e publica o artefato no Pages. A URL é informada pelo próprio deploy.

O workflow acompanha as ações indicadas na documentação oficial consultada em 14/10/2026:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Os caminhos de assets são relativos, compatíveis tanto com `usuario.github.io/repositorio/` quanto com um site na raiz.

## Conteúdo

- Apresentação pessoal orientada à sustentação de sistemas.
- Estudos do Instituto Empodera, Dracotheca, Monitoramento IoT e DevOps_Grupo.
- Links para evidências públicas; o Empodera usa a branch **Online** para o workflow e as dependências.
- Laboratório didático com três incidentes: ALB 503, contrato de nomes de tabela e release não ativada.
- Método de trabalho com IA, revisão e critérios de aceite.
- Contato pelo GitHub.

## Editar

- `index.html`: apresentação, descrições principais, tecnologias e contato.
- `assets/app.js`: estudos e cenários do laboratório.
- `assets/style.css`: visual e comportamento responsivo.

Os projetos colaborativos são identificados como tal. Os achados estáticos, o laboratório e os resultados simulados são explicitamente delimitados. Não há alegações de experiência profissional não verificada, métricas inventadas, comprovação de pipelines aprovados ou certificações.

## Fontes dos projetos

Consulta ao GitHub em 14/10/2026:

- https://github.com/Oroboni/InsEmpodera/tree/Online
- https://github.com/Oroboni/InsEmpodera/blob/Online/.github/workflows/testes.yml
- https://github.com/Oroboni/Dracotheca/blob/main/Admin/PHP/devolucao.php
- https://github.com/Oroboni/Dracotheca/blob/main/Aluno/PHP/renovar.php
- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/server.js
- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/route.js
- https://github.com/Oroboni/Atividade_Multiplataforma/blob/main/backend/rules.js
- https://github.com/Oroboni/DevOps_Grupo/blob/main/.github/workflows/pipeline-aula05.yml
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html

O cenário de banco é inspirado em um diagnóstico anterior do Empodera; não representa uma auditoria do ambiente atual. O cenário de ALB é um exemplo didático.
