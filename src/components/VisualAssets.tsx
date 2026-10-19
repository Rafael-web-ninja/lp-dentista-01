import React from 'react';

interface HeroPortraitProps {
  customImageUrl?: string | null;
  onUploadPhoto?: (file: File) => void;
  editMode?: boolean;
}

/**
 * Real Female Dentist character from image bank for the Hero section.
 * Positioned over the vibrant #FF791A orange rounded block, with floating badges.
 */
export const HeroWomanCutout: React.FC<HeroPortraitProps> = ({
  customImageUrl,
  onUploadPhoto,
  editMode,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadPhoto) {
      onUploadPhoto(file);
    }
  };

  const imageSrc = customImageUrl || '/images/top_37406608.jpg';

  return (
    <div className="relative w-full h-full flex items-end justify-center select-none">
      {/* Main Orange Rounded Block (#FF791A) */}
      <div
        className="w-full h-[90%] bg-[#FF791A] rounded-[36px] relative overflow-hidden shadow-[0_24px_60px_-15px_rgba(255,121,26,0.35)]"
        aria-hidden="true"
      >
        {/* Subtle studio lighting gradient inside the orange block */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 30%, rgba(255,255,255,0.4) 0%, rgba(255,121,26,0) 70%)',
          }}
        />
      </div>

      {/* Real Female Dentist Photo over Orange Block */}
      <div className="absolute inset-x-2 bottom-0 top-3 flex items-end justify-center overflow-hidden rounded-b-[34px] rounded-t-[30px] pointer-events-none">
        <img
          src={imageSrc}
          alt="Dentista profissional Sorria+ com modelo odontológico"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-300 pointer-events-auto"
        />
        {/* Soft bottom scrim to ground the image nicely */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#101010]/50 to-transparent pointer-events-none" />
        
        {/* Real dentist identification badge on bottom of photo */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg text-xs pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="font-extrabold text-[#101010]">Dra. Carolina Mendes</p>
              <p className="text-[10px] text-zinc-500">Ortodontia & Estética Dental</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#FF791A] bg-[#101010] px-2.5 py-1 rounded-full">
            CRO-SP Ativo
          </span>
        </div>
      </div>

      {/* Edit Mode Custom Upload */}
      {editMode && (
        <label className="absolute top-4 left-4 z-30 cursor-pointer bg-[#101010]/95 hover:bg-[#101010] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-sm transition-all flex items-center gap-2 pointer-events-auto">
          <span>Trocar Foto da Dentista</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

/**
 * Real Photo Showcase inside the tilted white Hero card
 */
export const DentalArchCardVisual: React.FC = () => {
  return (
    <div className="w-full h-32 rounded-2xl relative overflow-hidden bg-zinc-100 border border-zinc-200">
      <img
        src="/images/cand5.jpg"
        alt="Sorriso natural e saudável com dentes claros"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover filter contrast-[1.05]"
      />
      <div className="absolute top-2 right-2 bg-[#101010]/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
        RESULTADO REAL
      </div>
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[#101010] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
        Lentes & Clareamento
      </div>
    </div>
  );
};

/**
 * Real Portrait of the Lead Dentist for the "Sobre a Clínica" section
 */
export const DentistPortraitVisual: React.FC<{
  customImageUrl?: string | null;
  onUploadPhoto?: (file: File) => void;
  editMode?: boolean;
}> = ({ customImageUrl, onUploadPhoto, editMode }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadPhoto) {
      onUploadPhoto(file);
    }
  };

  const imageSrc = customImageUrl || '/images/fd_5355860.jpg';

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#101010] rounded-[32px] overflow-hidden flex flex-col justify-between text-white shadow-xl">
      {/* Real Dentist Photo */}
      <img
        src={imageSrc}
        alt="Cirurgiã-Dentista Responsável Técnica Sorria+"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.97]"
      />

      {/* Subtle Dark Gradient Overlay for legible text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-[#101010]/40 pointer-events-none" />

      {/* Top row clinical identification */}
      <div className="relative z-10 flex items-center justify-between p-6 text-xs text-white/90">
        <span className="bg-[#101010]/80 backdrop-blur-md px-3 py-1 rounded-full">Corpo Clínico · Sorria+</span>
        <span className="text-[#FF791A] font-bold bg-[#101010]/80 backdrop-blur-md px-3 py-1 rounded-full">
          Reabilitação & Estética
        </span>
      </div>

      {/* Bottom Credential Strip */}
      <div className="relative z-10 p-6 flex items-center justify-between text-xs bg-gradient-to-t from-[#101010] to-transparent pt-12">
        <div>
          <p className="font-extrabold text-white text-base">Dra. Carolina Vasconcelos</p>
          <p className="text-zinc-300 text-xs">Especialista em Reabilitação Oral e Prótese</p>
          <p className="text-[#FF791A] text-[11px] font-semibold mt-0.5">CRO-SP 128.450</p>
        </div>
        {editMode && (
          <label className="cursor-pointer bg-[#FF791A] hover:bg-[#e5680f] text-[#101010] font-bold px-3 py-1.5 rounded-lg transition-colors">
            Enviar Foto
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};

/**
 * Real Architectural Gallery Photos for the "Nossa Estrutura" section
 */
export const ClinicSpaceVisual: React.FC<{
  type: 'lounge' | 'suite' | 'scanner' | 'sterilization';
}> = ({ type }) => {
  const imageMap = {
    lounge: '/images/clinic_lounge.jpg',
    suite: '/images/clinic_suite.jpg',
    scanner: '/images/dentist_about.jpg',
    sterilization: '/images/dent3.jpg',
  };

  const labelMap = {
    lounge: 'Recepção e Lounge Sorria+',
    suite: 'Suíte Clínica de Atendimento',
    scanner: 'Estúdio de Diagnóstico Digital e Escaneamento 3D',
    sterilization: 'Unidade Clínica e Tecnologia Odontológica',
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-200">
      <img
        src={imageMap[type]}
        alt={labelMap[type]}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-4 text-white text-xs font-bold drop-shadow-md">
        {labelMap[type]}
      </div>
    </div>
  );
};
