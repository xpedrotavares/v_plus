import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// keep styles same as earlier
const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 30 },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: { margin: 10, padding: 10, border: "1pt solid #e0e0e0" },
  field: { fontSize: 12, marginBottom: 5 },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333333",
  },
  vaccineList: { marginLeft: 10, marginTop: 5 },
  vaccineItem: { fontSize: 10, marginBottom: 3 },
});

function buildDocument(data) {
  const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } =
    data || {};

  // parse if strings
  let vacinasRecomendadas = [];
  let vacinasOpcionais = [];
  try {
    vacinasRecomendadas =
      typeof vacinas_recomendadas === "string"
        ? JSON.parse(vacinas_recomendadas)
        : vacinas_recomendadas || [];
  } catch (e) {
    console.error("parse rec", e);
  }
  try {
    vacinasOpcionais =
      typeof vacinas_opcionais === "string"
        ? JSON.parse(vacinas_opcionais)
        : vacinas_opcionais || [];
  } catch (e) {
    console.error("parse opc", e);
  }

  // Build tree using createElement to avoid JSX in serverless
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        Text,
        { style: styles.title },
        "Carteira de Vacinação - V+"
      ),

      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.label }, "Nome Completo:"),
        React.createElement(Text, { style: styles.field }, nome_completo || "")
      ),

      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.label }, "CPF:"),
        React.createElement(Text, { style: styles.field }, cpf || "")
      ),

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
          Array.isArray(vacinasRecomendadas)
            ? vacinasRecomendadas.map((vacina, i) =>
                React.createElement(
                  Text,
                  { key: i, style: styles.vaccineItem },
                  `• ${vacina.nome_vacina} - Justificativas: ${
                    Array.isArray(vacina.justificativas)
                      ? vacina.justificativas.join(", ")
                      : "N/A"
                  }`
                )
              )
            : null
        )
      ),

      Array.isArray(vacinasOpcionais) && vacinasOpcionais.length > 0
        ? React.createElement(
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
              vacinasOpcionais.map((vacina, i) =>
                React.createElement(
                  Text,
                  { key: i, style: styles.vaccineItem },
                  `• ${vacina.vacina_nome || vacina.nome_vacina}`
                )
              )
            )
          )
        : null,

      React.createElement(
        View,
        { style: [styles.section, { marginTop: 30, border: "none" }] },
        React.createElement(
          Text,
          { style: [styles.field, { fontSize: 8, textAlign: "center" }] },
          `Gerado por V+ - ${new Date().toLocaleDateString("pt-BR")}`
        )
      )
    )
  );
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } =
      req.body || {};

    if (!nome_completo || !cpf || !vacinas_recomendadas) {
      res
        .status(400)
        .json({
          error:
            "Campos obrigatórios faltando: nome_completo, cpf, vacinas_recomendadas",
        });
      return;
    }

    const pdfDoc = buildDocument({
      nome_completo,
      cpf,
      vacinas_recomendadas,
      vacinas_opcionais,
    });
    const pdfResult = await pdf(pdfDoc).toBuffer();

    let pdfBuffer = pdfResult;
    if (
      !Buffer.isBuffer(pdfResult) &&
      pdfResult &&
      typeof pdfResult.on === "function"
    ) {
      const chunks = [];
      for await (const chunk of pdfResult) {
        chunks.push(Buffer.from(chunk));
      }
      pdfBuffer = Buffer.concat(chunks);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="carteira-vacinacao.pdf"'
    );
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("generate-pdf error:", err);
    res
      .status(500)
      .json({
        error: "Erro interno ao gerar PDF",
        details: err && err.message,
      });
  }
}
