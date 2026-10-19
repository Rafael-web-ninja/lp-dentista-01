import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Star,
  Check,
  Plus,
  Minus,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Heart,
  MessageCircle,
  Eye,
} from 'lucide-react';
import {
  INITIAL_CLINIC_CONFIG,
  INITIAL_TRUST_METRICS,
  TREATMENTS_DATA,
  DIFFERENTIALS_DATA,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS_DATA,
  STRUCTURE_GALLERY,
  FAQ_ITEMS,
  TrustMetric,
  StructureSpace,
} from './data/clinicData';
import {
  HeroWomanCutout,
  DentalArchCardVisual,
  DentistPortraitVisual,
  ClinicSpaceVisual,
} from './components/VisualAssets';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';

export default function App() {
  // Clinic editable state (so user doesn't have to rely on fixed numbers and can customize live)
  const [clinicConfig, setClinicConfig] = useState(INITIAL_CLINIC_CONFIG);
  const [trustMetrics, setTrustMetrics] = useState<TrustMetric[]>(INITIAL_TRUST_METRICS);
  const [editMode, setEditMode] = useState(false);

  // Custom uploaded images for Hero and Dentist portrait if user wants to test with their own photos
  const [heroCustomPhoto, setHeroCustomPhoto] = useState<string | null>(null);
  const [dentistCustomPhoto, setDentistCustomPhoto] = useState<string | null>(null);

  // Interactive Filters & UI State
  const [treatmentFilter, setTreatmentFilter] = useState<
    'todos' | 'estetica' | 'reabilitacao' | 'ortodontia' | 'prevencao'
  >('todos');
  const [expandedTreatmentId, setExpandedTreatmentId] = useState<string | null>('lentes-dentais');
  const [activeStructureId, setActiveStructureId] = useState<string>(STRUCTURE_GALLERY[0].id);
  const [lightboxSpace, setLightboxSpace] = useState<StructureSpace | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // WhatsApp Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTreatmentId, setBookingTreatmentId] = useState<string | undefined>(undefined);

  // Subtle parallax offset for Hero right column (compositor transform only)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: Math.round(relX * 14),
      y: Math.round(relY * 14),
    });
  };

  const handleHeroMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  const openBookingFor = (treatmentId?: string) => {
    setBookingTreatmentId(treatmentId);
    setBookingModalOpen(true);
  };

  const handleHeroPhotoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setHeroCustomPhoto(url);
  };

  const handleDentistPhotoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setDentistCustomPhoto(url);
  };

  const handleMetricChange = (id: string, field: 'value' | 'label', newVal: string) => {
    setTrustMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: newVal } : m))
    );
  };

  const filteredTreatments =
    treatmentFilter === 'todos'
      ? TREATMENTS_DATA
      : TREATMENTS_DATA.filter((item) => item.category === treatmentFilter);

  const activeStructure =
    STRUCTURE_GALLERY.find((s) => s.id === activeStructureId) || STRUCTURE_GALLERY[0];

  return (
    <div className="min-h-screen bg-[#F1F2F4] text-[#101010] font-sans selection:bg-[#FF791A] selection:text-white">
      {/* =====================================================================
          1. HERO SECTION & TOP BAR (Faithful to Reference Image Composition)
         ===================================================================== */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-8">
        <div
          className="bg-white/90 rounded-[32px] sm:rounded-[44px] px-5 sm:px-10 lg:px-14 pt-5 pb-8 sm:pb-12 shadow-[0_24px_70px_-20px_rgba(16,16,16,0.07)] border border-white/80"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* TOP BAR CONTRACT: Strictly 3 zones separated by gap-8 */}
          <header className="flex items-center justify-between gap-8 py-3 border-b border-zinc-100">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className="text-2xl sm:text-[28px] font-extrabold tracking-tighter text-[#101010] whitespace-nowrap shrink-0"
            >
              Sorria<span className="text-[#FF791A]">+</span>
            </a>

            {/* Zone 2: 5 concise single-line text navigation links */}
            <nav
              aria-label="Menu principal"
              className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-600"
            >
              <a
                href="#tratamentos"
                className="hover:text-[#101010] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Tratamentos
              </a>
              <a
                href="#diferenciais"
                className="hover:text-[#101010] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Diferenciais
              </a>
              <a
                href="#sobre"
                className="hover:text-[#101010] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Clínica
              </a>
              <a
                href="#como-funciona"
                className="hover:text-[#101010] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Como Funciona
              </a>
              <a
                href="#faq"
                className="hover:text-[#101010] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Dúvidas
              </a>
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => openBookingFor()}
                className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white bg-[#101010] rounded-full hover:bg-[#FF791A] hover:text-[#101010] transition-colors duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Agendar Consulta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* HERO MAIN 2-COLUMN SPLIT */}
          <section
            aria-label="Apresentação Sorria+"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-8 sm:pt-12 lg:pt-14 pb-10"
          >
            {/* LEFT COLUMN: Giant Typography, Review, WhatsApp CTA, 3 Editable Metrics */}
            <div className="lg:col-span-6 flex flex-col justify-between animate-reveal">
              <div>
                {/* Subtle Kicker (Matches the top-left bar icon + text from reference) */}
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-700 mb-4">
                  <span className="inline-flex items-end gap-0.5 h-3.5" aria-hidden="true">
                    <span className="w-1 h-1.5 bg-[#FF791A] rounded-xs" />
                    <span className="w-1 h-2.5 bg-[#FF791A] rounded-xs" />
                    <span className="w-1 h-3.5 bg-[#FF791A] rounded-xs" />
                  </span>
                  <span>Tecnologia Digital · Sorrisos Naturais</span>
                </div>

                {/* Giant Title "Sorria+" */}
                <h1 className="text-[64px] sm:text-[84px] lg:text-[96px] font-extrabold tracking-[-0.045em] leading-[0.92] text-[#101010]">
                  Sorria<span className="text-[#FF791A]">+</span>
                </h1>

                {/* Subtitle "Seu sorriso merece o melhor" */}
                {editMode ? (
                  <input
                    type="text"
                    value={clinicConfig.heroSubtitle}
                    onChange={(e) =>
                      setClinicConfig({ ...clinicConfig, heroSubtitle: e.target.value })
                    }
                    className="mt-3 w-full text-2xl sm:text-3xl font-extrabold text-[#101010] bg-[#F1F2F4] px-3 py-1.5 rounded-xl border border-[#FF791A]"
                  />
                ) : (
                  <p className="mt-3 text-2xl sm:text-[32px] lg:text-[36px] font-bold tracking-tight text-[#101010] leading-[1.12]">
                    {clinicConfig.heroSubtitle}
                  </p>
                )}

                {/* Short Persuasive Description */}
                {editMode ? (
                  <textarea
                    rows={3}
                    value={clinicConfig.heroDescription}
                    onChange={(e) =>
                      setClinicConfig({ ...clinicConfig, heroDescription: e.target.value })
                    }
                    className="mt-4 w-full text-sm text-zinc-700 bg-[#F1F2F4] p-3 rounded-xl border border-[#FF791A]"
                  />
                ) : (
                  <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-[52ch]">
                    {clinicConfig.heroDescription}
                  </p>
                )}

                {/* Patient Review Quote Block (Matches reference avatar + quote + 5 orange stars + 4.9) */}
                <div className="mt-7 flex items-start sm:items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-[#101010] text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-[#FF791A]"
                    aria-hidden="true"
                  >
                    MC
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-[13px] text-zinc-700 font-medium leading-snug max-w-[44ch]">
                      {clinicConfig.heroReviewQuote}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-0.5 text-[#FF791A]" aria-label="5 de 5 estrelas">
                        <Star className="w-3.5 h-3.5 fill-[#FF791A]" />
                        <Star className="w-3.5 h-3.5 fill-[#FF791A]" />
                        <Star className="w-3.5 h-3.5 fill-[#FF791A]" />
                        <Star className="w-3.5 h-3.5 fill-[#FF791A]" />
                        <Star className="w-3.5 h-3.5 fill-[#FF791A]" />
                      </div>
                      <span className="font-extrabold text-[#101010] tabular-nums">4.9</span>
                      <span className="text-zinc-400" aria-hidden="true">·</span>
                      <span className="text-zinc-500 text-[11px]">
                        {clinicConfig.heroReviewNote}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Black WhatsApp Button & Secondary Link (Matches reference CTA row) */}
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => openBookingFor()}
                    className="px-7 py-4 bg-[#101010] hover:bg-[#FF791A] text-white hover:text-[#101010] rounded-full font-bold text-sm transition-colors duration-200 flex items-center gap-2.5 shadow-[0_14px_28px_-10px_rgba(16,16,16,0.4)] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Agendar pelo WhatsApp</span>
                  </button>

                  <a
                    href="#tratamentos"
                    className="text-sm font-bold text-[#101010] hover:text-[#FF791A] transition-colors inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0"
                  >
                    <span>Nossos Tratamentos</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 3 Editable Trust Metrics at Bottom of Hero Left Column */}
              <div className="mt-10 pt-7 border-t border-zinc-200/70">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {trustMetrics.map((metric, idx) => (
                    <div
                      key={metric.id}
                      className={`${
                        idx < 2 ? 'border-r border-zinc-200/80 pr-3 sm:pr-6' : ''
                      }`}
                    >
                      {editMode ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) =>
                              handleMetricChange(metric.id, 'value', e.target.value)
                            }
                            className="w-full text-lg font-extrabold bg-[#F1F2F4] px-2 py-1 rounded border border-[#FF791A] tabular-nums"
                          />
                          <input
                            type="text"
                            value={metric.label}
                            onChange={(e) =>
                              handleMetricChange(metric.id, 'label', e.target.value)
                            }
                            className="w-full text-xs text-zinc-600 bg-[#F1F2F4] px-2 py-1 rounded border border-zinc-300"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-xl sm:text-[26px] font-extrabold tracking-tight text-[#101010] tabular-nums">
                            {metric.value}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                            {metric.label}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Dados demonstrativos editáveis conforme diretrizes éticas do CFO</span>
                  <button
                    type="button"
                    onClick={() => setEditMode(!editMode)}
                    className="text-zinc-600 hover:text-[#FF791A] font-semibold underline underline-offset-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {editMode ? 'Concluir Edição' : 'Editar Dados da Página'}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Cutout Woman on #FF791A Block + Floating Cards + Handwritten Script */}
            <div className="lg:col-span-6 relative min-h-[480px] sm:min-h-[560px] flex items-center justify-center">
              {/* Central Orange Cutout Composition */}
              <div
                className="w-full max-w-[440px] h-[470px] sm:h-[540px] relative mx-auto transition-transform duration-200 ease-out"
                style={{
                  transform: `translate3d(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px, 0)`,
                }}
              >
                <HeroWomanCutout
                  customImageUrl={heroCustomPhoto}
                  onUploadPhoto={handleHeroPhotoUpload}
                  editMode={editMode}
                />

                {/* FLOATING CARD 1: Left Glassmorphic Metric Card (Matches "60% More sales this week ↗") */}
                <div
                  className="absolute -left-3 sm:-left-10 top-[25%] z-20 w-[168px] sm:w-[190px] rounded-[26px] p-4 sm:p-5 backdrop-blur-xl bg-white/35 border border-white/50 shadow-[0_20px_40px_-15px_rgba(16,16,16,0.18)] animate-float-slow"
                  style={{
                    transform: `translate3d(${-parallaxOffset.x * 0.7}px, ${-parallaxOffset.y * 0.7}px, 0)`,
                  }}
                >
                  {/* 3 White Vertical Bar Columns */}
                  <div className="flex items-end gap-1.5 h-7 mb-3" aria-hidden="true">
                    <span className="w-2 h-3 bg-white rounded-xs" />
                    <span className="w-2 h-5 bg-white rounded-xs" />
                    <span className="w-2 h-7 bg-white rounded-xs" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101010] tabular-nums">
                      100%
                    </span>
                    <a
                      href="#diferenciais"
                      aria-label="Ver diferenciais tecnológicos"
                      className="w-8 h-8 rounded-full bg-white text-[#101010] hover:bg-[#101010] hover:text-white flex items-center justify-center shadow-sm transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#101010] mt-1.5 leading-tight">
                    Escaneamento digital sem massa
                  </p>
                </div>

                {/* FLOATING CARD 2: Top-Right Patient Chat Bubbles (Matches "How is the fit?" / "Do you like the design?" / "...") */}
                <div
                  className="absolute -right-2 sm:-right-8 top-[16%] z-20 flex flex-col items-start gap-2"
                  style={{
                    transform: `translate3d(${parallaxOffset.x * 0.8}px, ${-parallaxOffset.y * 0.5}px, 0)`,
                  }}
                >
                  {/* Bubble 1 */}
                  <div className="bg-white/95 backdrop-blur-md rounded-full py-1.5 pl-1.5 pr-4 shadow-md border border-black/5 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#FF791A] text-[#101010] font-extrabold text-[11px] flex items-center justify-center shrink-0">
                      LC
                    </span>
                    <span className="text-xs font-semibold text-[#101010] whitespace-nowrap">
                      O formato ficou super natural?
                    </span>
                  </div>
                  {/* Bubble 2 */}
                  <div className="bg-white/95 backdrop-blur-md rounded-full py-1.5 pl-1.5 pr-4 shadow-md border border-black/5 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#101010] text-white font-extrabold text-[11px] flex items-center justify-center shrink-0">
                      RV
                    </span>
                    <span className="text-xs font-semibold text-[#101010] whitespace-nowrap">
                      Sim! Testamos no Mock-up 3D
                    </span>
                  </div>
                  {/* Bubble 3: Three dots */}
                  <div
                    className="bg-white/95 backdrop-blur-md rounded-full px-3.5 py-2 shadow-md border border-black/5 inline-flex items-center gap-1 ml-6"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#101010]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#101010]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#101010]" />
                  </div>
                </div>

                {/* FLOATING CARD 3: Bottom-Right Tilted White Card (Matches tilted white product card in reference) */}
                <div className="absolute -right-2 sm:-right-10 bottom-4 sm:bottom-6 z-20 w-[230px] sm:w-[255px] bg-white rounded-[28px] p-4 sm:p-5 shadow-[0_25px_50px_-12px_rgba(16,16,16,0.22)] border border-zinc-100 animate-float-card">
                  {/* Top Icon Row */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold tracking-tight text-[#101010]">
                      Sorria<span className="text-[#FF791A]">+</span> 3D
                    </span>
                    <span className="w-6 h-6 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700">
                      <Heart className="w-3 h-3" />
                    </span>
                  </div>

                  <p className="text-sm font-extrabold text-[#101010] leading-tight">
                    Check-up Digital 3D
                  </p>
                  <p className="text-[11px] text-zinc-500 mb-2.5">
                    Escaneamento + Planejamento
                  </p>

                  {/* 3D Dental Arch & Veneer Simulation Visual */}
                  <DentalArchCardVisual />

                  {/* Bottom Price/Action Row */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] text-zinc-400">Avaliação</span>
                      <span className="text-sm font-extrabold text-[#101010]">
                        Personalizada
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookingFor('lentes-dentais')}
                      className="px-3.5 py-2 rounded-full bg-[#101010] hover:bg-[#FF791A] text-white hover:text-[#101010] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Agendar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* HANDWRITTEN ANNOTATION 1: Bottom-Left of Orange Block (Matches "Move Better Live Brighter") */}
                <div
                  className="hidden sm:block absolute -left-14 bottom-12 z-10 -rotate-12 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <p
                    className="text-[22px] leading-[1.05] text-[#101010] font-bold"
                    style={{ fontFamily: 'var(--font-handwriting)' }}
                  >
                    Sorria Melhor,
                    <br />
                    Viva Mais
                    <br />
                    Confiante
                  </p>
                  <svg viewBox="0 0 90 16" className="w-20 h-4 mt-0.5 text-[#101010]">
                    <path
                      d="M4 10 Q45 2, 84 8 M16 14 Q48 9, 72 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* HANDWRITTEN ANNOTATION 2: Bottom-Right below card (Matches "More Than Fitness :)") */}
                <div
                  className="hidden sm:flex items-center gap-1.5 absolute -right-6 -bottom-7 z-10 -rotate-6 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <p
                    className="text-[20px] leading-[1.02] text-[#101010] font-bold"
                    style={{ fontFamily: 'var(--font-handwriting)' }}
                  >
                    Mais que
                    <br />
                    Odontologia
                  </p>
                  <svg viewBox="0 0 28 28" className="w-6 h-6 text-[#101010]">
                    <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.6" fill="none" />
                    <circle cx="10.5" cy="11.5" r="1.2" fill="currentColor" />
                    <circle cx="17.5" cy="11.5" r="1.2" fill="currentColor" />
                    <path
                      d="M9.5 16 Q14 20, 18.5 16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* HERO BOTTOM BAR: Clinical Standards & Technologies (Matches bottom logo bar in reference) */}
          <div className="pt-7 border-t border-zinc-200/80">
            <p className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-4">
              Tecnologias e Protocolos Utilizados na Sorria+
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* 5 Clean Typographic Technology Signatures */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800">
                  Scanner 3D<span className="text-[#FF791A]">.</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800">
                  Cerâmica E.max
                </div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800">
                  Setup Digital DSD
                </div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800">
                  Cirurgia Guiada
                </div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800">
                  Laserterapia
                </div>
              </div>

              {/* Right Callout + Black Circle Arrow Button (Matches reference bottom-right corner) */}
              <div className="flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
                <p className="text-xs text-zinc-500 max-w-[24ch] leading-snug">
                  Excelência clínica com foco em conforto e previsibilidade.
                </p>
                <a
                  href="#tratamentos"
                  aria-label="Explorar tratamentos"
                  className="w-11 h-11 rounded-full bg-[#101010] hover:bg-[#FF791A] text-white hover:text-[#101010] flex items-center justify-center transition-colors shrink-0"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. TRATAMENTOS SECTION (Clareamento, Implantes, Ortodontia, Lentes, Prevenção)
         ===================================================================== */}
      <section
        id="tratamentos"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-[#FF791A] mb-2">
              Especialidades Odontológicas · Planejamento Integrado
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
              Tratamentos desenhados para a sua individualidade.
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Buttons) */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-zinc-200/80 self-start"
            role="tablist"
            aria-label="Filtrar tratamentos por especialidade"
          >
            {[
              { id: 'todos', label: 'Todos (5)' },
              { id: 'estetica', label: 'Estética' },
              { id: 'reabilitacao', label: 'Implantes' },
              { id: 'ortodontia', label: 'Ortodontia' },
              { id: 'prevencao', label: 'Prevenção' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={treatmentFilter === tab.id}
                onClick={() => setTreatmentFilter(tab.id as typeof treatmentFilter)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  treatmentFilter === tab.id
                    ? 'bg-[#101010] text-white'
                    : 'text-zinc-600 hover:text-[#101010]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid (Elementor-friendly Flexbox/Grid cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((item) => {
            const isExpanded = expandedTreatmentId === item.id;
            return (
              <article
                key={item.id}
                className={`rounded-[32px] p-7 sm:p-8 transition-all duration-200 flex flex-col justify-between border ${
                  isExpanded
                    ? 'bg-[#101010] text-white border-[#101010] md:col-span-2 lg:col-span-2'
                    : 'bg-white text-[#101010] border-zinc-200/80 hover:border-[#101010]/40'
                }`}
              >
                <div>
                  {/* Editorial Number & Unboxed Category Metadata */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`font-extrabold tabular-nums ${
                          isExpanded ? 'text-[#FF791A]' : 'text-[#101010]'
                        }`}
                      >
                        {item.number}.
                      </span>
                      <span aria-hidden="true" className="opacity-40">
                        ·
                      </span>
                      <span className={isExpanded ? 'text-zinc-300' : 'text-zinc-500'}>
                        {item.categoryLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedTreatmentId(isExpanded ? null : item.id)
                      }
                      className={`text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                        isExpanded
                          ? 'text-[#FF791A] hover:text-white'
                          : 'text-zinc-500 hover:text-[#101010]'
                      }`}
                    >
                      <span>{isExpanded ? 'Recolher detalhes' : 'Ver protocolo'}</span>
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      isExpanded ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      isExpanded ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Highlight List */}
                  <ul className="mt-6 space-y-2.5 pt-5 border-t border-current/10">
                    {item.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-[#FF791A] shrink-0 mt-0.5" />
                        <span className={isExpanded ? 'text-zinc-200' : 'text-zinc-700'}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Metadata & Direct WhatsApp Action */}
                <div className="mt-8 pt-5 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <span
                      className={`block ${
                        isExpanded ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      Recurso: {item.technologyUsed}
                    </span>
                    <span
                      className={`font-semibold ${
                        isExpanded ? 'text-white' : 'text-[#101010]'
                      }`}
                    >
                      {item.sessionInfo}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBookingFor(item.id)}
                    className={`px-5 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isExpanded
                        ? 'bg-[#FF791A] text-[#101010] hover:bg-white'
                        : 'bg-[#101010] text-white hover:bg-[#FF791A] hover:text-[#101010]'
                    }`}
                  >
                    <span>Agendar Avaliação</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. DIFERENCIAIS SECTION (Asymmetric Bento Grid)
         ===================================================================== */}
      <section
        id="diferenciais"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold text-[#FF791A] mb-2">
            Por Que Escolher a Sorria+
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
            Odontologia pensada para quem valoriza precisão e bem-estar.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {DIFFERENTIALS_DATA.map((dif, index) => {
            const spanClass =
              dif.colSpan === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';
            const isOrangeAccent = index === 3;

            return (
              <div
                key={dif.id}
                className={`${spanClass} rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 ${
                  dif.darkSurface
                    ? 'bg-[#101010] text-white'
                    : isOrangeAccent
                    ? 'bg-[#FF791A] text-[#101010]'
                    : 'bg-white text-[#101010] border border-zinc-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs mb-6">
                    <span
                      className={`font-extrabold tabular-nums ${
                        dif.darkSurface
                          ? 'text-[#FF791A]'
                          : isOrangeAccent
                          ? 'text-[#101010]'
                          : 'text-[#FF791A]'
                      }`}
                    >
                      {dif.number}. {dif.subtitle}
                    </span>
                    <span
                      className={`font-semibold ${
                        dif.darkSurface
                          ? 'text-zinc-400'
                          : isOrangeAccent
                          ? 'text-[#101010]/80'
                          : 'text-zinc-500'
                      }`}
                    >
                      {dif.detailMetric}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                    {dif.title}
                  </h3>

                  <p
                    className={`mt-4 text-sm sm:text-base leading-relaxed max-w-[58ch] ${
                      dif.darkSurface
                        ? 'text-zinc-300'
                        : isOrangeAccent
                        ? 'text-[#101010]/90 font-medium'
                        : 'text-zinc-600'
                    }`}
                  >
                    {dif.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                  <span>Protocolo Padrão Sorria+</span>
                  <button
                    type="button"
                    onClick={() => openBookingFor()}
                    className="inline-flex items-center gap-1.5 hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Agendar visita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. SOBRE A CLÍNICA & DIREÇÃO TÉCNICA
         ===================================================================== */}
      <section
        id="sobre"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="bg-white rounded-[40px] p-6 sm:p-10 lg:p-14 border border-zinc-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Portrait of the Dentist */}
          <div className="lg:col-span-5 flex">
            <DentistPortraitVisual
              customImageUrl={dentistCustomPhoto}
              onUploadPhoto={handleDentistPhotoUpload}
              editMode={editMode}
            />
          </div>

          {/* Right Column: Professional Presentation & CFO-Compliant Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-3">
                <span className="font-bold text-[#FF791A]">Responsável Técnico</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{clinicConfig.croNumber}</span>
              </div>

              {editMode ? (
                <div className="space-y-2 mb-4">
                  <input
                    type="text"
                    value={clinicConfig.technicalDirector}
                    onChange={(e) =>
                      setClinicConfig({
                        ...clinicConfig,
                        technicalDirector: e.target.value,
                      })
                    }
                    className="w-full text-2xl font-extrabold bg-[#F1F2F4] px-3 py-2 rounded-xl border border-[#FF791A]"
                  />
                  <input
                    type="text"
                    value={clinicConfig.croNumber}
                    onChange={(e) =>
                      setClinicConfig({ ...clinicConfig, croNumber: e.target.value })
                    }
                    className="w-full text-xs bg-[#F1F2F4] px-3 py-1.5 rounded-lg border border-zinc-300"
                  />
                </div>
              ) : (
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
                  {clinicConfig.technicalDirector}
                </h2>
              )}

              <p className="mt-2 text-base sm:text-lg font-semibold text-zinc-700">
                Cirurgião-Dentista · Reabilitação Oral, Dentística Estética e Odontologia Digital
              </p>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                <p>
                  A <strong>Sorria+</strong> nasceu com o propósito de unir o rigor científico da odontologia reabilitadora a uma experiência acolhedora, transparente e livre de ansiedade. Acreditamos que um sorriso bonito é, acima de tudo, um sorriso saudável, funcional e harmônico com a identidade de cada paciente.
                </p>
                <p>
                  Cada planejamento é conduzido de forma individualizada, utilizando recursos de diagnóstico tridimensional e materiais biocompatíveis de referência internacional, sempre respeitando os limites biológicos e a longevidade de cada estrutura dental.
                </p>
              </div>

              {/* Credentials & Principles List */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-200/80">
                <div>
                  <p className="text-xs font-bold text-[#101010]">
                    Formação & Atualização Contínua
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Aperfeiçoamento em Prótese Dentária, Laminados Cerâmicos e Fluxo Digital CAD/CAM [Dados demonstrativos editáveis].
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#101010]">
                    Filosofia Minimamente Invasiva
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Prioridade absoluta à preservação do esmalte natural e ao diagnóstico preventivo detalhado.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => openBookingFor()}
                className="px-7 py-4 rounded-full bg-[#101010] hover:bg-[#FF791A] text-white hover:text-[#101010] font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Agendar Avaliação com Nossa Equipe</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="text-xs font-semibold text-zinc-500 hover:text-[#101010] flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF791A]" />
                <span>{editMode ? 'Salvar Credenciais' : 'Personalizar Nome/CRO'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMO FUNCIONA (3 Etapas Claras para Agendar e Iniciar)
         ===================================================================== */}
      <section
        id="como-funciona"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-[#FF791A] mb-2">
              Jornada do Paciente · Simples e Transparente
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
              Como funciona o seu atendimento.
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-[42ch]">
            Três etapas estruturadas para que você tenha clareza de prazos, investimentos e procedimentos desde o primeiro contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="bg-white rounded-[32px] p-8 sm:p-9 border border-zinc-200/80 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-[#FF791A] tabular-nums">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    Etapa {index + 1} de 3
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#101010]">
                  {step.title}
                </h3>
                <p className="text-xs font-bold text-zinc-500 mt-1">
                  {step.subtitle}
                </p>
                <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>{step.durationLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#FF791A]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. DEPOIMENTOS (Com Identificação Clara de Conteúdo Demonstrativo)
         ===================================================================== */}
      <section
        id="depoimentos"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-[#FF791A] mb-2">
              Experiências na Clínica · Avaliações de Pacientes
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
              A confiança de quem sorri sem receio.
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-[44ch]">
            Nota de transparência: Os cards abaixo contêm textos demonstrativos de layout para aprovação estrutural no Elementor, devendo ser substituídos por depoimentos reais autorizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[32px] p-8 border border-zinc-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-[#FF791A]" aria-label={`Avaliação ${item.rating} de 5`}>
                    <Star className="w-4 h-4 fill-[#FF791A]" />
                    <Star className="w-4 h-4 fill-[#FF791A]" />
                    <Star className="w-4 h-4 fill-[#FF791A]" />
                    <Star className="w-4 h-4 fill-[#FF791A]" />
                    <Star className="w-4 h-4 fill-[#FF791A]" />
                    <span className="ml-1.5 text-xs font-extrabold text-[#101010] tabular-nums">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {item.timeAgo}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.avatarBg }}
                  aria-hidden="true"
                >
                  {item.avatarInitials}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#101010]">
                    {item.patientName}
                  </p>
                  <p className="text-xs text-zinc-500">{item.procedure}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. NOSSA ESTRUTURA (Galeria Interativa de Ambientes da Clínica)
         ===================================================================== */}
      <section
        id="estrutura"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-[#FF791A] mb-2">
              Arquitetura & Biossegurança · Conheça Nosso Espaço
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
              Um ambiente que redefine a visita ao dentista.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-zinc-200/80 self-start">
            {STRUCTURE_GALLERY.map((space) => (
              <button
                key={space.id}
                type="button"
                onClick={() => setActiveStructureId(space.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStructureId === space.id
                    ? 'bg-[#FF791A] text-[#101010]'
                    : 'text-zinc-600 hover:text-[#101010]'
                }`}
              >
                {space.category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Space + 4-Card Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Highlighted Space Preview */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-4 sm:p-6 border border-zinc-200/80 flex flex-col justify-between">
            <div className="w-full h-[280px] sm:h-[360px] rounded-[24px] overflow-hidden relative group">
              <ClinicSpaceVisual type={activeStructure.illustrationType} />
              <button
                type="button"
                onClick={() => setLightboxSpace(activeStructure)}
                className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#101010]/85 hover:bg-[#101010] text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF791A]" />
                <span>Ampliar Ambiente</span>
              </button>
            </div>

            <div className="pt-5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#FF791A]">
                  {activeStructure.category}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#101010] mt-0.5">
                  {activeStructure.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-[54ch]">
                  {activeStructure.description}
                </p>
              </div>
              <span className="text-xs text-zinc-400 shrink-0">
                {activeStructure.technicalSpec}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Selector Cards for all 4 Clinic Spaces */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {STRUCTURE_GALLERY.map((space, idx) => {
              const isSelected = space.id === activeStructureId;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveStructureId(space.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-[24px] border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#101010] text-white border-[#101010] shadow-md'
                      : 'bg-white text-[#101010] border-zinc-200/80 hover:border-[#101010]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-extrabold text-[#FF791A] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className={isSelected ? 'text-zinc-400' : 'text-zinc-500'}>
                        {space.category}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-extrabold">
                      {space.title}
                    </h4>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {space.description}
                    </p>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      isSelected
                        ? 'bg-[#FF791A] text-[#101010]'
                        : 'bg-[#F1F2F4] text-[#101010]'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FAQ SECTION (Perguntas Frequentes em Accordion)
         ===================================================================== */}
      <section
        id="faq"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-16 sm:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold text-[#FF791A] mb-2">
              Tire Suas Dúvidas · Transparência Total
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101010]">
              Perguntas frequentes sobre o atendimento.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Caso tenha alguma dúvida específica sobre o seu caso clínico, nossa equipe está disponível pelo WhatsApp para orientar você.
            </p>

            <div className="mt-8 p-6 rounded-[28px] bg-white border border-zinc-200/80">
              <p className="text-sm font-extrabold text-[#101010]">
                Prefere conversar diretamente com nossa recepção?
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Retornamos rapidamente em horário comercial com todas as informações.
              </p>
              <button
                type="button"
                onClick={() => openBookingFor()}
                className="mt-4 px-5 py-3 rounded-full bg-[#101010] hover:bg-[#FF791A] text-white hover:text-[#101010] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Falar pelo WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-[24px] border transition-colors ${
                    isOpen
                      ? 'bg-white border-[#101010]'
                      : 'bg-white/75 border-zinc-200/80 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-extrabold text-[#FF791A] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#101010]">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#101010] text-white'
                          : 'bg-[#F1F2F4] text-[#101010]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 mt-1">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. CTA FINAL (Seção Laranja #FF791A com Título Gigante)
         ===================================================================== */}
      <section
        aria-label="Agendamento imediato"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-16"
      >
        <div className="bg-[#FF791A] rounded-[40px] px-6 sm:px-12 lg:px-16 py-16 sm:py-24 text-[#101010] relative overflow-hidden">
          {/* Subtle architectural circle lines in background */}
          <svg
            viewBox="0 0 800 400"
            className="absolute right-0 top-0 h-full w-auto opacity-20 pointer-events-none"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="650" cy="200" r="180" stroke="#101010" strokeWidth="1.5" />
            <circle cx="650" cy="200" r="260" stroke="#101010" strokeWidth="1" strokeDasharray="8 8" />
          </svg>

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#101010]/80 mb-3">
              Sorria+ Odontologia · Atendimento Particular em São Paulo
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[0.98] text-[#101010]">
              Seu melhor sorriso começa aqui.
            </h2>
            <p className="mt-5 text-base sm:text-lg font-medium text-[#101010]/85 max-w-[50ch] leading-relaxed">
              Agende sua avaliação inicial pelo WhatsApp e descubra como o planejamento digital 3D pode cuidar da sua saúde e estética dental com conforto absoluto.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openBookingFor()}
                className="px-8 py-4 sm:py-5 rounded-full bg-[#101010] hover:bg-white text-white hover:text-[#101010] font-extrabold text-sm sm:text-base transition-colors duration-200 flex items-center gap-3 shadow-xl cursor-pointer whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5 text-[#FF791A]" />
                <span>Agendar pelo WhatsApp</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <span className="text-xs sm:text-sm font-bold text-[#101010]/80 tabular-nums">
                Ou ligue: {clinicConfig.whatsappDisplay}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. FOOTER (Endereço, Contatos, Redes Sociais e Dados do Responsável Técnico)
         ===================================================================== */}
      <footer className="bg-[#101010] text-white pt-16 pb-12 rounded-t-[40px]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand & Summary */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#"
                className="text-3xl font-extrabold tracking-tighter text-white inline-block"
              >
                Sorria<span className="text-[#FF791A]">+</span>
              </a>
              <p className="text-sm text-zinc-400 max-w-[34ch] leading-relaxed">
                Clínica odontológica focada em reabilitação estética, implantes guiados, ortodontia digital e prevenção personalizada.
              </p>
              <div className="pt-2 text-xs text-zinc-400 space-y-1">
                <p className="font-semibold text-white">
                  Responsável Técnico: {clinicConfig.technicalDirector}
                </p>
                <p className="tabular-nums">
                  {clinicConfig.croNumber} · {clinicConfig.epaoNumber}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-bold text-[#FF791A] uppercase tracking-wider">
                Navegação
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-300">
                <li>
                  <a href="#tratamentos" className="hover:text-[#FF791A] transition-colors">
                    Tratamentos & Especialidades
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-[#FF791A] transition-colors">
                    Diferenciais Tecnológicos
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-[#FF791A] transition-colors">
                    Sobre a Clínica & Corpo Clínico
                  </a>
                </li>
                <li>
                  <a href="#estrutura" className="hover:text-[#FF791A] transition-colors">
                    Nossa Estrutura
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#FF791A] transition-colors">
                    Perguntas Frequentes (FAQ)
                  </a>
                </li>
              </ul>
            </div>

            {/* Address & Opening Hours */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold text-[#FF791A] uppercase tracking-wider">
                Localização & Contato
              </p>

              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF791A] shrink-0 mt-1" />
                  {editMode ? (
                    <input
                      type="text"
                      value={clinicConfig.addressLine}
                      onChange={(e) =>
                        setClinicConfig({ ...clinicConfig, addressLine: e.target.value })
                      }
                      className="w-full bg-zinc-900 text-white px-3 py-1.5 rounded border border-[#FF791A] text-xs"
                    />
                  ) : (
                    <span>{clinicConfig.addressLine}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FF791A] shrink-0" />
                  <span>{clinicConfig.openingHours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF791A] shrink-0" />
                  {editMode ? (
                    <input
                      type="text"
                      value={clinicConfig.whatsappDisplay}
                      onChange={(e) =>
                        setClinicConfig({
                          ...clinicConfig,
                          whatsappDisplay: e.target.value,
                          whatsappNumber: '55' + e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="bg-zinc-900 text-white px-3 py-1 rounded border border-[#FF791A] text-xs tabular-nums"
                    />
                  ) : (
                    <span className="tabular-nums font-bold text-white">
                      WhatsApp: {clinicConfig.whatsappDisplay}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <a
                  href="#sobre"
                  onClick={(e) => {
                    e.preventDefault();
                    openBookingFor();
                  }}
                  className="text-white hover:text-[#FF791A] font-bold underline underline-offset-4"
                >
                  Instagram @sorriamais.odonto [Exemplo]
                </a>
                <span aria-hidden="true">·</span>
                <span>Estacionamento com manobrista no local</span>
              </div>
            </div>
          </div>

          {/* Bottom Legal & CFO Compliance Notice */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
            <p>
              © {new Date().getFullYear()} Sorria+ Odontologia. Todos os direitos reservados. Os resultados de tratamentos odontológicos variam conforme as condições biológicas individuais de cada paciente.
            </p>

            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="text-zinc-400 hover:text-[#FF791A] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {editMode
                ? 'Desativar Modo de Edição'
                : 'Ativar Edição de Dados (Elementor Preview)'}
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          LIGHTBOX MODAL FOR CLINIC STRUCTURE GALLERY
         ===================================================================== */}
      {lightboxSpace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101010]/80 backdrop-blur-sm animate-reveal"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxSpace.title}
        >
          <div className="bg-white rounded-[32px] max-w-3xl w-full p-6 sm:p-8 relative">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-bold text-[#FF791A]">
                  {lightboxSpace.category}
                </p>
                <h3 className="text-2xl font-extrabold text-[#101010]">
                  {lightboxSpace.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxSpace(null)}
                className="px-4 py-2 rounded-full bg-[#F1F2F4] hover:bg-[#101010] hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>

            <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden">
              <ClinicSpaceVisual type={lightboxSpace.illustrationType} />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-600">
              <p>{lightboxSpace.description}</p>
              <span className="font-bold text-[#101010] shrink-0">
                {lightboxSpace.technicalSpec}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE WHATSAPP BOOKING MODAL
         ===================================================================== */}
      <WhatsAppBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTreatmentId={bookingTreatmentId}
        whatsappNumber={clinicConfig.whatsappNumber}
      />
    </div>
  );
}
