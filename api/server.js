require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const { Buffer } = require("buffer");
const express = require("express");
const cors = require("cors");
const { pdf } = require("@react-pdf/renderer");
const createPDFDocument = require("./components/PDFDocument").default;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/generate-pdf", async (req, res) => {
  try {
    // Optional API key protection
    const requiredKey = process.env.GENERATE_PDF_API_KEY;
    if (requiredKey) {
      const provided = req.headers && (req.headers['x-api-key'] || req.headers['X-Api-Key'] || req.headers['X-API-KEY']);
      if (!provided || provided !== requiredKey) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Missing or invalid x-api-key header' });
      }
    }
    const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } = req.body;

    console.log("Dados recebidos:", { nome_completo, cpf });

    if (!nome_completo || !cpf || !vacinas_recomendadas) {
      return res.status(400).json({
        error: "Campos obrigatórios faltando: nome_completo, cpf, vacinas_recomendadas",
      });
    }

    const pdfData = {
      nome_completo,
      cpf,
      vacinas_recomendadas,
      vacinas_opcionais: vacinas_opcionais || "[]",
    };

    console.log("Iniciando geração do PDF...");
    const pdfDoc = createPDFDocument(pdfData);
    const pdfResult = await pdf(pdfDoc).toBuffer();

    let pdfBuffer = pdfResult;
    if (!Buffer.isBuffer(pdfResult) && pdfResult && typeof pdfResult.on === "function") {
      const chunks = [];
      try {
        for await (const chunk of pdfResult) {
          chunks.push(Buffer.from(chunk));
        }
        pdfBuffer = Buffer.concat(chunks);
      } catch (err) {
        if (pdfResult._readableState && Array.isArray(pdfResult._readableState.buffer)) {
          pdfBuffer = Buffer.concat(
            pdfResult._readableState.buffer.map((b) => Buffer.from(b))
          );
        } else {
          throw err;
        }
      }
    }

    console.log("PDF gerado com sucesso! Tamanho:", pdfBuffer && pdfBuffer.length, "bytes");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="carteira-vacinacao.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Erro detalhado:", error);
    res.status(500).json({
      error: "Erro interno ao gerar PDF",
      details: error.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "API PDF funcionando!" });
});

// Export para Vercel - REMOVA o app.listen()
module.exports = app;