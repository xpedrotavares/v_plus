import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Definir estilos
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

const createPDFDocument = (data) => {
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Erro: Dados não fornecidos</Text>
        </Page>
      </Document>
    );
  }

  const { nome_completo, cpf, vacinas_recomendadas, vacinas_opcionais } = data;

  // Parse das strings JSON
  let vacinasRecomendadas = [];
  let vacinasOpcionais = [];

  try {
    vacinasRecomendadas =
      typeof vacinas_recomendadas === "string"
        ? JSON.parse(vacinas_recomendadas)
        : vacinas_recomendadas;
  } catch (error) {
    console.error("Erro ao parsear vacinas_recomendadas:", error);
  }

  try {
    vacinasOpcionais =
      typeof vacinas_opcionais === "string"
        ? JSON.parse(vacinas_opcionais)
        : vacinas_opcionais;
  } catch (error) {
    console.error("Erro ao parsear vacinas_opcionais:", error);
  }

  // Usando a API de criação de elementos do React PDF
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Carteira de Vacinação - V+</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Nome Completo:</Text>
          <Text style={styles.field}>{nome_completo}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>CPF:</Text>
          <Text style={styles.field}>{cpf}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Vacinas Recomendadas:</Text>
          <View style={styles.vaccineList}>
            {Array.isArray(vacinasRecomendadas) &&
              vacinasRecomendadas.map((vacina, index) => (
                <Text key={index} style={styles.vaccineItem}>
                  • {vacina.nome_vacina} - Justificativas:{" "}
                  {Array.isArray(vacina.justificativas)
                    ? vacina.justificativas.join(", ")
                    : "N/A"}
                </Text>
              ))}
          </View>
        </View>

        {Array.isArray(vacinasOpcionais) && vacinasOpcionais.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Vacinas Opcionais:</Text>
            <View style={styles.vaccineList}>
              {vacinasOpcionais.map((vacina, index) => (
                <Text key={index} style={styles.vaccineItem}>
                  • {vacina.vacina_nome || vacina.nome_vacina}
                </Text>
              ))}
            </View>
          </View>
        )}

        <View style={[styles.section, { marginTop: 30, border: "none" }]}>
          <Text style={[styles.field, { fontSize: 8, textAlign: "center" }]}>
            Gerado por V+ - {new Date().toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return MyDocument;
};

export default createPDFDocument;
