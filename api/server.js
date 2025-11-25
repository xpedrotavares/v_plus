require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const { Buffer } = require("buffer");

const express = require("express");
const cors = require("cors");
const { pdf } = require("@react-pdf/renderer");
const createPDFDocument = require("./components/PDFDocument").default;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  try {
    const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } =
      req.body;

    console.log("Dados recebidos:", {
      nome_completo,
      cpf,
    });

    // Validação
    if (!nome_completo || !cpf || !vacinas_recomendadas) {
      return res.status(400).json({
        error:
          "Campos obrigatórios faltando: nome_completo, cpf, vacinas_recomendadas",
      });
    }

    const pdfData = {
      nome_completo,
      cpf,
      vacinas_recomendadas,
      vacinas_opcionais: vacinas_opcionais || "[]",
    };

    console.log("Iniciando geração do PDF...");

    // Gera o PDF usando JSX
    const pdfDoc = createPDFDocument(pdfData);
    // some versions of @react-pdf/renderer return a PDF readable stream/object from toBuffer()
    // so we normalize to a proper Buffer before sending it in the response
    const pdfResult = await pdf(pdfDoc).toBuffer();

    let pdfBuffer = pdfResult;
    // If toBuffer returned a stream-like PDFDocument, properly collect chunks
    if (
      !Buffer.isBuffer(pdfResult) &&
      pdfResult &&
      typeof pdfResult.on === "function"
    ) {
      const chunks = [];
      try {
        // Use async iterator to collect stream chunks (works with Node readable streams)
        for await (const chunk of pdfResult) {
          chunks.push(Buffer.from(chunk));
        }
        pdfBuffer = Buffer.concat(chunks);
      } catch (err) {
        // Fallback: try to gather from _readableState.buffer if present
        if (
          pdfResult._readableState &&
          Array.isArray(pdfResult._readableState.buffer)
        ) {
          pdfBuffer = Buffer.concat(
            pdfResult._readableState.buffer.map((b) => Buffer.from(b))
          );
        } else {
          throw err;
        }
      }
    }

    console.log(
      "PDF gerado com sucesso! Tamanho:",
      pdfBuffer && pdfBuffer.length,
      "bytes"
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="carteira-vacinacao.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Erro detalhado:", error);
    res.status(500).json({
      error: "Erro interno ao gerar PDF",
      details: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "API PDF funcionando!" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor PDF rodando na porta ${PORT}`);
  console.log(`📝 Endpoint: http://localhost:${PORT}/generate-pdf`);
});

// Trata erro comum EADDRINUSE para evitar crash com stack trace e dar instruções úteis
server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `Erro: porta ${PORT} já está em uso. Talvez exista outra instância rodando.`
    );
    console.error(
      "Soluções: pare o processo escutando nessa porta (ex: `kill <PID>`) ou inicie a API com outra porta: `PORT=3002 npm start`."
    );
    process.exit(1);
  }

  console.error("Erro do servidor:", err);
  process.exit(1);
});
