# Navega — site acadêmico

Site estático de Jamilli Monteiro para o Laboratório de IA Aplicada, semestre 2026.2,
com o professor Diego Luis Kreutz.
Apresenta o mapa dos municípios, os requisitos, artigos e bases públicas, o pipeline,
um exemplo real, o estágio atual e os resultados da comparação exploratória.

## Visualizar

Na raiz do projeto Navega, execute:

```bash
npm run site
```

Abra <http://127.0.0.1:4174>. O terminal precisa permanecer aberto; encerre com
`Ctrl+C`. Usa apenas Node.js já instalado, sem instalar dependências, iniciar o
backend ou acessar o banco. O servidor fica restrito ao próprio computador e só
entrega os arquivos públicos da apresentação.

Se o navegador informar que a conexão foi recusada, inicie `npm run site` e
mantenha o terminal aberto. Para abrir a versão atual sem servidor, abra
`site-academico/index.html` diretamente no navegador, mantendo os arquivos da
pasta juntos.

Se a porta estiver ocupada: `npm run site -- 4175` e abra o endereço correspondente.

Se estiver usando somente o ZIP extraído, execute dentro dele:

```bash
node servidor.mjs
```

Para abrir sem terminal, extraia o ZIP e dê dois cliques em **Navega.html**.
Esse arquivo reúne a página, estilos, imagens e interações e pode ser aberto
diretamente no Chrome, Firefox ou Edge. Downloads e impressão funcionam no próprio
navegador. O `index.html` continua sendo o código principal para futuras edições.

## Estrutura da apresentação

A capa apresenta o Navega e leva ao projeto ou à demonstração do chat. A imagem
ilustrativa da embarcação tem recortes próprios para desktop e celular. O mapa
esquemático mostra os 13 municípios da rota-base e Atalaia do Norte como conexão
complementar. Os marcadores abrem uma descrição textual. O ícone do barco simula
o trajeto de Manaus a Tabatinga, com controle de pausa. O esquema usa um percurso
ilustrativo, sem escala geográfica ou indicação de viagens em operação.

Em “Projeto”, a primeira saída aparece destacada no anúncio histórico, ao lado
dos campos extraídos.
Os requisitos e o painel “Pesquisa e fontes” reúnem artigos, dados do IBGE e
material da ANTAQ. A fonte de coleta são anúncios públicos do Instagram.

O pipeline apresenta cinco etapas, com abas na vertical em telas estreitas e
dois desfechos de qualidade. O botão “Simular viagem” reproduz uma consulta de Manaus a Tabatinga com os
dados de um anúncio histórico, incluindo a ausência do ano. A evolução destaca a
extração como etapa atual. A comparação Gemini × Claude registrou 204
concordâncias em 296 comparações de campos, feitas com quatro das pelo menos
oito imagens usadas no projeto.

**Publicação suspensa por solicitação da responsável.** Nenhum conteúdo foi
publicado. O workflow disponível só pode ser acionado manualmente; não publica
automaticamente em push. As instruções abaixo são para uma etapa futura, após
autorização expressa.

## Endereço exigido pela disciplina

O nome proposto é **liaa-jamilli.github.io**. Confirme a sigla oficial da disciplina
antes de criar a conta/organização. Não é um endereço já registrado ou publicado.

O GitHub define o subdomínio pela conta ou organização proprietária. Para obter
`https://liaa-jamilli.github.io`, é necessário:

1. Uma conta ou organização com o nome **liaa-jamilli**, disponível e acessível à autora.
2. Nela, um repositório público chamado **liaa-jamilli.github.io**.
3. Os arquivos desta pasta na raiz desse repositório, incluindo a pasta `.github`.

Criar apenas um repositório `liaa-jamilli.github.io` na conta `JamMonteiro` gera um
site de projeto com caminho abaixo de `jammonteiro.github.io`; não cria o subdomínio
exigido. Não renomeie sua conta atual apenas para publicar este trabalho.

Referência oficial: <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>.

## Publicar pelo GitHub Actions

1. Crie o repositório acima na conta/organização correta, com branch `main`.
2. Copie **somente o conteúdo de `site-academico/`** para a raiz dele. Não envie o
   monorepo Navega. Preserve `.github/workflows/pages.yml` e `.nojekyll`.
3. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
4. Após autorização expressa, em **Actions**, escolha “Publicar site acadêmico no
   GitHub Pages” e execute **Run workflow** na branch `main`.
5. Aguarde o job `deploy` concluir e abra o endereço retornado pelo GitHub.

O workflow prepara um diretório público apenas com `index.html`, `styles.css`,
`script.js`, `.nojekyll`, `assets/` e `dados/`. Não há build, API, chaves ou banco.

### Alternativa sem workflow

Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta
`/(root)`. A publicação usa os mesmos arquivos estáticos. Escolha um dos dois
métodos de publicação; não é necessário ativar os dois.

## Atualizar o conteúdo

- `index.html`: contexto, solução, exemplo, resultados, autoria e conteúdo inicial.
- `script.js`: textos das etapas do pipeline e interações. Ao alterar a etapa Fonte,
  mantenha a versão inicial do HTML coerente.
- `styles.css`: visual responsivo, acessibilidade e estilo de impressão.
- `assets/rios.svg`: ilustração esquemática do mapa.
- `dados/exemplo-extracao.json`: recorte fiel da primeira linha da leitura existente.
- `dados/notas-do-projeto.txt`: síntese pública e referências documentais.

Atualize o corte temporal somente depois de verificar novas evidências. O botão
“Salvar em PDF” abre a impressão do navegador e expande os detalhes da apresentação.

## Limites

A apresentação acadêmica funciona de forma independente. O chat simula uma viagem
histórica de Manaus a Tabatinga. O pipeline é explicativo; não realiza coleta nem SQL.
Os exemplos históricos não são ofertas atuais. Métricas de concordância não são
acurácia. Dados operacionais, segredos e documentos privados não integram a pasta.

## Verificações do refinamento visual

A prévia local foi revisada em 1440, 390 e 320 px. Foram testados as ações da
capa, o menu, os marcadores, o anúncio ampliado, o pipeline por teclado e as
respostas ilustrativas do chat. As três larguras passaram na verificação de
rolagem horizontal. Foram conferidos o foco visível, os contrastes das
combinações principais e as regras CSS de movimento reduzido.
