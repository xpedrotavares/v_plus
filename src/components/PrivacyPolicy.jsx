import React from "react";

const PrivacyPolicy = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-slate-700/80 bg-slate-950/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#fc3060] sm:text-4xl">
              Política de Privacidade – Vaccine+
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              <strong>Última atualização:</strong> 7 de Abril de 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-[#fc3060]/60 hover:bg-slate-800"
          >
            Voltar à home
          </button>
        </div>

        <div className="mt-10 space-y-6 text-slate-300">
          <p>
            Bem-vindo(a) ao <strong>Vaccine+</strong>, um produto oficial
            desenvolvido e operado pela{" "}
            <strong>Health Clinic SP (CNPJ: 34.412.094/0001-28)</strong>. Nós
            somos um assistente virtual criado para democratizar o acesso a
            informações confiáveis sobre vacinação adulta, utilizando o
            WhatsApp.
          </p>

          <p>
            A sua privacidade e a segurança dos seus dados de saúde são a nossa
            maior prioridade. Este documento explica de forma clara como
            coletamos, usamos, armazenamos e protegemos as suas informações, em
            total conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei
            nº 13.709/2018).
          </p>

          <div className="rounded-3xl border border-[#fc3060]/15 bg-[#fc3060]/10 p-6 text-[#fde0eb]">
            <strong>Aviso Importante:</strong> O Vaccine+ não fornece
            diagnósticos médicos. Nossas recomendações são baseadas no
            Calendário Nacional de Vacinação e em protocolos estabelecidos por
            médicos imunologistas. Consulte sempre um profissional de saúde.
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              1. Quais dados nós coletamos?
            </h2>
            <p>
              Para que o nosso assistente virtual possa indicar as vacinas
              certas para o seu momento de vida, precisamos conhecer um pouco
              sobre você. Nós coletamos as informações diretamente pelas suas
              respostas no WhatsApp.
            </p>
            <p>Os dados coletados dividem-se em duas categorias:</p>
            <ul className="ml-5 list-disc space-y-3 text-slate-300">
              <li>
                <strong>Dados Cadastrais e de Contato:</strong> Nome, CPF, Data
                de Nascimento, CEP (para encontrar clínicas próximas a você) e
                Número de WhatsApp.
              </li>
              <li>
                <strong>Dados Pessoais Sensíveis (Saúde):</strong> Sexo
                biológico, profissão (caso envolva risco biológico), condições
                crônicas de saúde (ex: diabetes, cardiopatias), status
                imunológico, alergias prévias a vacinas, gestação e histórico de
                vacinas já tomadas.
              </li>
              <li>
                <strong>Dados de Interação:</strong> O histórico de mensagens
                trocadas com o nosso assistente virtual para garantir o contexto
                da conversa.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              2. Para que utilizamos os seus dados?
            </h2>
            <p>
              Nós tratamos os seus dados exclusivamente para as seguintes
              finalidades:
            </p>
            <ul className="ml-5 list-disc space-y-3 text-slate-300">
              <li>
                <strong>Avaliação Personalizada:</strong> Cruzar o seu perfil de
                saúde com as diretrizes médicas para recomendar as vacinas mais
                adequadas e seguras para você.
              </li>
              <li>
                <strong>
                  Conexão com Clínicas (Facilitação de Agendamento):
                </strong>{" "}
                Utilizar o seu CEP e a sua recomendação vacinal para encontrar
                clínicas parceiras próximas que ofereçam a vacina indicada.
              </li>
              <li>
                <strong>Atendimento e Suporte:</strong> Enviar lembretes
                importantes e responder às suas dúvidas sobre o funcionamento do
                serviço.
              </li>
              <li>
                <strong>Melhoria Contínua:</strong> Analisar dados de forma
                agrupada e anônima (sem identificar você) para aprimorar a
                inteligência artificial do Vaccine+.
              </li>
            </ul>
            <p>
              A base legal para o tratamento dos seus dados de saúde é o seu{" "}
              <strong>consentimento explícito</strong>, solicitado logo no
              início da nossa conversa no WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              3. Com quem compartilhamos os seus dados?
            </h2>
            <p>
              A transparência é o nosso principal valor. O Vaccine+ atua como
              uma ponte entre você e a proteção à sua saúde.
            </p>
            <ul className="ml-5 list-disc space-y-3 text-slate-300">
              <li>
                <strong>Clínicas Parceiras:</strong> Somente após a avaliação, e{" "}
                <strong>
                  apenas se você nos der autorização expressa clicando em "Sim"
                </strong>
                , nós enviaremos o seu Nome, CPF, WhatsApp e a Recomendação de
                Vacina para uma clínica parceira selecionada na sua região. O
                objetivo desse compartilhamento é permitir que a clínica entre
                em contato com você para facilitar o agendamento e a aplicação
                da vacina.
              </li>
              <li>
                <strong>Provedores de Tecnologia:</strong> Utilizamos a
                infraestrutura da empresa Meta (WhatsApp) para a troca de
                mensagens e servidores em nuvem seguros para armazenar nosso
                banco de dados. Essas empresas processam os dados sob nossas
                instruções rígidas de segurança.
              </li>
            </ul>
            <p>
              Nós nunca venderemos os seus dados para listas de marketing não
              relacionadas ao seu pedido de vacinação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              4. O uso do WhatsApp e Termos de Terceiros
            </h2>
            <p>
              O nosso serviço funciona inteiramente pelo WhatsApp. É importante
              que você saiba que as mensagens trocadas na plataforma também
              estão sujeitas aos Termos de Serviço e à Política de Privacidade
              da Meta (WhatsApp). Nós protegemos rigorosamente as informações
              assim que elas chegam aos nossos servidores, e a transmissão no
              aplicativo conta com a criptografia de ponta a ponta fornecida
              pelo próprio WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              5. Armazenamento e Segurança
            </h2>
            <p>
              Os seus dados são armazenados em servidores na nuvem que adotam
              altos padrões de segurança da informação, com criptografia e
              controle de acesso restrito. Guardamos as suas informações apenas
              pelo tempo necessário para cumprir as finalidades descritas nesta
              política ou até que você solicite a exclusão definitiva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              6. Os seus direitos (LGPD)
            </h2>
            <p>
              Você é o dono dos seus dados. A qualquer momento, de forma
              gratuita e facilitada, você tem o direito de:
            </p>
            <ul className="ml-5 list-disc space-y-3 text-slate-300">
              <li>Confirmar se estamos tratando os seus dados.</li>
              <li>Acessar as informações que temos sobre você.</li>
              <li>
                Corrigir dados que estejam incompletos, inexatos ou
                desatualizados.
              </li>
              <li>
                <strong>Revogar o seu consentimento</strong> a qualquer momento.
              </li>
              <li>
                <strong>Solicitar a exclusão definitiva</strong> dos seus dados
                pessoais e de saúde do nosso banco de dados (o que encerrará a
                nossa capacidade de avaliação e encaminhamento).
              </li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, envie um e-mail
              detalhando sua solicitação para{" "}
              <strong>
                <a
                  href="mailto:privacidade@hclinicsp.com.br"
                  className="text-[#fc3060] hover:text-[#ff9ab2]"
                >
                  privacidade@hclinicsp.com.br
                </a>
              </strong>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fc3060]">
              7. Como entrar em contato conosco
            </h2>
            <p>
              Se você tiver qualquer dúvida sobre como tratamos as suas
              informações ou quiser falar com o nosso Encarregado de Proteção de
              Dados (DPO), entre em contato pelos canais abaixo:
            </p>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/90 p-6 mt-8">
              <ul className="space-y-3 text-slate-300">
                <li>
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:privacidade@hclinicsp.com.br"
                    className="text-[#fc3060] hover:text-[#ff9ab2]"
                  >
                    privacidade@hclinicsp.com.br
                  </a>
                </li>
                <li>
                  <strong>Empresa Responsável:</strong> Health Clinic SP
                </li>
                <li>
                  <strong>CNPJ:</strong> 34.412.094/0001-28
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
