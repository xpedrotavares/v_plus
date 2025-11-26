# API PDF (Vercel-friendly)

Este diretório contém uma função serverless compatível com a Vercel que gera PDFs usando `@react-pdf/renderer`.

Endpoint (Vercel): `/api/generate-pdf` (POST)

Request body (JSON):
{
"nome_completo": "João Silva",
"cpf": "123.456.789-00",
"vacinas_recomendadas": "[ { \"justificativas\": [\"IDADE\"], \"nome_vacina\": \"Hepatite A+B\" } ]",
"vacinas_opcionais": "[ { \"vacina_nome\": \"Meningocócica B\" } ]"
}

Response: application/pdf (arquivo PDF anexo)

Segurança / autenticação (opcional):

- A função agora suporta proteção por `x-api-key`. Se você definir a variável de ambiente `GENERATE_PDF_API_KEY` na sua plataforma (ex.: Vercel), a função exigirá que as requisições incluam o header `x-api-key` com o valor correto — caso contrário ela retorna 401.

Exemplo (curl):

```bash
curl -X POST "https://<seu-deploy>/api/generate-pdf" \
	-H "Content-Type: application/json" \
	-H "x-api-key: <SEU_API_KEY>" \
	-d '{"nome_completo":"João Silva","cpf":"123","vacinas_recomendadas":"[...]"}' \
	--output out.pdf
```

Notas de deploy / recomendações:

- No Vercel, coloque este repositório e ele automaticamente exponha a função em `/api/generate-pdf`.
- Certifique-se de que as dependências relevantes (`react`, `@react-pdf/renderer`) estejam declaradas no `package.json` da raiz do projeto para que a Vercel as instale.
- Monitorar o tempo de execução (serverless functions tem limites de timeout) e o tamanho do bundle. Se seus PDFs demoram muito para gerar ou o renderer for pesado, considere um worker/serviço separado (Render/Fly/Railway) ou pré-geração por fila.

Teste local (dentro do container):

1. Executar o script de teste local (gera `/api/test_serverless_out.pdf`):

```bash
node /workspaces/v_plus/api/test_serverless.mjs
```

CI / smoke test (GitHub Actions):

Um workflow `/.github/workflows/smoke-test.yml` foi adicionado e roda um teste que importa o handler diretamente e valida se a saída contém `%%EOF`.

Se você quiser que o CI valide o caminho protegido por chave, configure o secret `GENERATE_PDF_API_KEY` nas Secrets do repositório (ou use o valor padrão `ci-test-key` que o workflow usa).

2. Teste via HTTP (com vercel dev) — opcional:

```bash
# usando vercel cli (recomendado / opcional)
vercel dev
curl -X POST "http://localhost:3000/api/generate-pdf" -H "Content-Type: application/json" -d '{"nome_completo":"João Silva","cpf":"123","vacinas_recomendadas":"[...]"}' --output out.pdf
```
