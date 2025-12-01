import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
    border: "1pt solid #e0e0e0",
  },
  field: {
    fontSize: 12,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333333",
  },
  vaccineList: {
    marginLeft: 10,
    marginTop: 5,
  },
  vaccineItem: {
    fontSize: 10,
    marginBottom: 3,
  },
});

// Função para criar o documento PDF usando React.createElement
function buildDocument(data) {
  const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } =
    data || {};

  // Parse das strings JSON
  let vacinasRecomendadas = [];
  let vacinasOpcionais = [];

  try {
    vacinasRecomendadas =
      typeof vacinas_recomendadas === "string"
        ? JSON.parse(vacinas_recomendadas)
        : vacinas_recomendadas || [];
  } catch (e) {
    console.error("Erro ao parsear vacinas_recomendadas:", e);
  }

  try {
    vacinasOpcionais =
      typeof vacinas_opcionais === "string"
        ? JSON.parse(vacinas_opcionais)
        : vacinas_opcionais || [];
  } catch (e) {
    console.error("Erro ao parsear vacinas_opcionais:", e);
  }

  // Criar o documento usando React.createElement (sem JSX)
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      // Título
      React.createElement(
        Text,
        { style: styles.title },
        "Carteira de Vacinação - V+"
      ),

      // Nome Completo
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.label }, "Nome Completo:"),
        React.createElement(Text, { style: styles.field }, nome_completo || "")
      ),

      // CPF
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.label }, "CPF:"),
        React.createElement(Text, { style: styles.field }, cpf || "")
      ),

      // Vacinas Recomendadas
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          { style: styles.label },
          "Vacinas Recomendadas:"
        ),
        React.createElement(
          View,
          { style: styles.vaccineList },
          vacinasRecomendadas.map((vacina, index) =>
            React.createElement(
              Text,
              {
                key: index,
                style: styles.vaccineItem,
              },
              `• ${vacina.nome_vacina} - Justificativas: ${
                Array.isArray(vacina.justificativas)
                  ? vacina.justificativas.join(", ")
                  : "N/A"
              }`
            )
          )
        )
      ),

      // Vacinas Opcionais (se houver)
      ...(vacinasOpcionais.length > 0
        ? [
            React.createElement(
              View,
              { style: styles.section },
              React.createElement(
                Text,
                { style: styles.label },
                "Vacinas Opcionais:"
              ),
              React.createElement(
                View,
                { style: styles.vaccineList },
                vacinasOpcionais.map((vacina, index) =>
                  React.createElement(
                    Text,
                    {
                      key: index,
                      style: styles.vaccineItem,
                    },
                    `• ${vacina.vacina_nome || vacina.nome_vacina}`
                  )
                )
              )
            ),
          ]
        : []),

      // Rodapé
      React.createElement(
        View,
        {
          style: {
            margin: 10,
            padding: 10,
            marginTop: 30,
            border: "none",
          },
        },
        React.createElement(
          Text,
          {
            style: {
              fontSize: 8,
              textAlign: "center",
            },
          },
          `Gerado por V+ - ${new Date().toLocaleDateString("pt-BR")}`
        )
      )
    )
  );
}

// Handler principal da API
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

  // Handle OPTIONS for CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // API key protection (optional) — when set, require x-api-key header
    const requiredKey = process.env.GENERATE_PDF_API_KEY;
    if (requiredKey) {
      const provided =
        (req.headers &&
          (req.headers["x-api-key"] ||
            req.headers["X-API-KEY"] ||
            req.headers["X-Api-Key"])) ||
        req["x-api-key"] ||
        req["X-API-KEY"];
      if (!provided || provided !== requiredKey) {
        return res
          .status(401)
          .json({
            error: "Unauthorized",
            message: "Missing or invalid x-api-key header",
          });
      }
    }
    if (req.method !== "POST") {
      res.status(405).json({
        error: "Method Not Allowed",
        message: "Use POST para gerar PDF",
      });
      return;
    }

    const {
      nome_completo,
      cpf,
      vacinas_recomendadas,
      vacinas_opcionais,
      callback_url, // URL para enviar o PDF gerado
    } = req.body;

    console.log("Dados recebidos:", {
      nome_completo: nome_completo ? "***" : "vazio",
      cpf: cpf ? "***" : "vazio",
      tem_vacinas_recomendadas: !!vacinas_recomendadas,
      tem_vacinas_opcionais: !!vacinas_opcionais,
      callback_url: callback_url || "vazio",
    });

    // Validação
    if (!nome_completo || !cpf || !vacinas_recomendadas) {
      return res.status(400).json({
        error: "Campos obrigatórios faltando",
        details: "nome_completo, cpf e vacinas_recomendadas são obrigatórios",
      });
    }

    if (!callback_url) {
      return res.status(400).json({
        error: "Campo obrigatório faltando",
        details: "callback_url é obrigatório para o envio do PDF",
      });
    }

    // Responder imediatamente para o cliente (e.g., Data2)
    res.status(202).json({
      message: "Requisição aceita. O PDF será gerado e enviado para a callback_url.",
    });

    // --- Geração do PDF e envio assíncrono ---
    try {
      console.log("Iniciando geração do PDF em background...");

      const pdfDoc = buildDocument({
        nome_completo,
        cpf,
        vacinas_recomendadas,
        vacinas_opcionais,
      });

      const pdfResult = await pdf(pdfDoc).toBuffer();
      let pdfBuffer = pdfResult;

      // Handle stream if needed
      if (!Buffer.isBuffer(pdfResult) && pdfResult && typeof pdfResult.on === "function") {
        const chunks = [];
        for await (const chunk of pdfResult) {
          chunks.push(Buffer.from(chunk));
        }
        pdfBuffer = Buffer.concat(chunks);
      }

      console.log("PDF gerado com sucesso! Tamanho:", pdfBuffer.length, "bytes");

      console.log(`Enviando PDF para a callback_url: ${callback_url}`);

      // Enviar o PDF para a callback_url usando fetch
      const fetchRes = await fetch(callback_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
          "Content-Length": pdfBuffer.length.toString(),
        },
        body: pdfBuffer,
      });

      if (!fetchRes.ok) {
        const errorBody = await fetchRes.text();
        throw new Error(
          `Falha ao enviar PDF para a callback_url. Status: ${fetchRes.status}. Body: ${errorBody}`
        );
      }

      console.log("PDF enviado com sucesso para a callback_url.");
    } catch (error) {
      // Log de erro para o processo assíncrono
      console.error("Erro detalhado no processo assíncrono de PDF:", error);
      // Aqui, não podemos mais enviar uma resposta para o cliente original,
      // então apenas logamos o erro no servidor.
    }
  } catch (error) {
    // Este catch lida com erros síncronos (antes do res.status(202))
    console.error("Erro síncrono na API:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Erro interno no servidor",
        details: error.message,
      });
    }
  }
}

