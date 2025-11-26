import handler from "./generate-pdf.mjs";

async function run() {
  const body = {
    nome_completo: "CI Smoke Test",
    cpf: "00000000000",
    vacinas_recomendadas: JSON.stringify([
      { justificativas: ["IDADE"], nome_vacina: "Hepatite A+B" },
    ]),
  };

  const req = { method: "POST", body, headers: {} };
  // Allow workflow to inject secret via env
  if (process.env.GENERATE_PDF_API_KEY) {
    req.headers["x-api-key"] = process.env.GENERATE_PDF_API_KEY;
  }

  let chunks = [];

  const res = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(data) {
      chunks.push(data);
      return this;
    },
    json(obj) {
      chunks.push(Buffer.from(JSON.stringify(obj)));
      return this;
    },
  };

  await handler(req, res);

  if (chunks.length === 0) {
    console.error("No data returned from handler");
    process.exit(2);
  }

  const buf = Buffer.isBuffer(chunks[0])
    ? chunks[0]
    : Buffer.concat(chunks.map((c) => Buffer.from(c)));

  const trailer = Buffer.from("%%EOF");
  if (buf.indexOf(trailer) === -1) {
    console.error("PDF trailer not found, output is likely invalid");
    process.exit(3);
  }

  console.log("CI smoke test passed — PDF contains %%EOF (size=", buf.length, "bytes)");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
