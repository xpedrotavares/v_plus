import React from "react";

const Footer = ({ onOpenPrivacy }) => {
  return (
    <footer className="text-center p-6 bg-black">
      <div className="mb-4">
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="text-sm text-gray-400 transition hover:text-white"
        >
          Política de Privacidade
        </button>
      </div>
      <p className="text-gray-500">VaccineMais. Todos os direitos reservados.</p>
      <p className="text-gray-500">
        VaccineMais é um produto Health Clinic SP (CNPJ: 34.412.094/0001-28)
      </p>
    </footer>
  );
};

export default Footer;
