import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Check, MessageCircle, Calendar, Clock } from 'lucide-react';
import { TREATMENTS_DATA } from '../data/clinicData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string;
  whatsappNumber: string;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  isOpen,
  onClose,
  initialTreatmentId,
  whatsappNumber,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState(
    initialTreatmentId || 'lentes-dentais'
  );
  const [preferredPeriod, setPreferredPeriod] = useState<'Manhã' | 'Tarde' | 'Sábado'>('Manhã');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTreatmentId) {
      setSelectedTreatment(initialTreatmentId);
    }
    setSubmitted(false);
    setCopied(false);
  }, [initialTreatmentId, isOpen]);

  if (!isOpen) return null;

  const treatmentObj =
    TREATMENTS_DATA.find((t) => t.id === selectedTreatment) || TREATMENTS_DATA[0];

  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const composedMessage = `Olá, equipe Sorria+! Meu nome é ${
    patientName.trim() || '[Seu Nome]'
  }. Gostaria de agendar uma avaliação para *${
    treatmentObj.title
  }* (Preferência de período: *${preferredPeriod}*).`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    composedMessage
  )}`;

  const handleCopyMessage = () => {
    navigator.clipboard?.writeText(composedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101010]/70 backdrop-blur-sm animate-reveal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
    >
      <div className="bg-white text-[#101010] w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl border border-black/10 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F1F2F4] hover:bg-[#101010] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar janela de agendamento"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-10">
          <p className="text-xs font-semibold text-[#FF791A] tracking-tight">
            Atendimento Concierge · Resposta Rápida
          </p>
          <h3
            id="modal-booking-title"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1"
          >
            Agendar pelo WhatsApp
          </h3>
          <p className="text-sm text-zinc-600 mt-1.5">
            Personalize sua mensagem abaixo para agilizar a reserva do seu horário na Sorria+.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="booking-name"
              className="block text-xs font-bold text-zinc-700 mb-1.5"
            >
              Seu nome completo
            </label>
            <input
              id="booking-name"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Ex.: Mariana Costa"
              className="w-full px-4 py-3 rounded-xl bg-[#F1F2F4] border border-transparent focus:border-[#101010] focus:bg-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="booking-treatment"
                className="block text-xs font-bold text-zinc-700 mb-1.5"
              >
                Interesse principal
              </label>
              <select
                id="booking-treatment"
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-[#F1F2F4] border border-transparent focus:border-[#101010] focus:bg-white text-sm outline-none transition-colors"
              >
                {TREATMENTS_DATA.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-bold text-zinc-700 mb-1.5">
                Período de preferência
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F1F2F4] rounded-xl">
                {(['Manhã', 'Tarde', 'Sábado'] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setPreferredPeriod(period)}
                    className={`py-2 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      preferredPeriod === period
                        ? 'bg-[#101010] text-white shadow-xs'
                        : 'text-zinc-600 hover:text-[#101010]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="block text-xs font-bold text-zinc-700 mb-1.5"
            >
              Seu WhatsApp (opcional para retorno da clínica)
            </label>
            <input
              id="booking-phone"
              type="tel"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-xl bg-[#F1F2F4] border border-transparent focus:border-[#101010] focus:bg-white text-sm outline-none transition-colors tabular-nums"
            />
          </div>

          {/* Preview of generated WhatsApp message */}
          <div className="p-4 rounded-2xl bg-[#F1F2F4] border border-zinc-200/80 text-xs text-zinc-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#101010] flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#FF791A]" />
                Mensagem pronta para envio:
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-xs font-semibold text-[#101010] hover:text-[#FF791A] transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <span>Copiar texto</span>
                )}
              </button>
            </div>
            <p className="leading-relaxed text-zinc-600 italic">"{composedMessage}"</p>
          </div>
        </div>

        {submitted && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              Solicitação preparada! Caso o WhatsApp não tenha aberto automaticamente no navegador, utilize o botão de copiar mensagem acima.
            </span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSubmitted(true)}
            className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#101010] hover:bg-[#FF791A] hover:text-[#101010] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Iniciar Conversa no WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-zinc-100">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#FF791A]" />
            Atendimento Particular & Reembolso
          </span>
          <span className="flex items-center gap-1 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-[#FF791A]" />
            Seg a Sáb
          </span>
        </div>
      </div>
    </div>
  );
};
