import handler from "./generate-pdf.mjs";
import fs from "fs";

async function run() {
  const body = {
    nome_completo: "Teste Dev Vercel",
    cpf: "111.222.333-44",
    vacinas_recomendadas: JSON.stringify([
      { justificativas: ["IDADE"], nome_vacina: "Hepatite A+B" },
    ]),
    vacinas_opcionais: JSON.stringify([{ vacina_nome: "Meningocócica B" }]),
  };

  const req = { method: "POST", body };
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

  if (chunks.length > 0) {
    const buf = Buffer.isBuffer(chunks[0])
      ? chunks[0]
      : Buffer.concat(chunks.map((c) => Buffer.from(c)));
    fs.writeFileSync("/workspaces/v_plus/api/test_serverless_out.pdf", buf);
    console.log(
      "Saved /workspaces/v_plus/api/test_serverless_out.pdf size=",
      buf.length
    );
  } else {
    console.log("No chunks returned");
  }
}

run().catch((err) => console.error(err));
