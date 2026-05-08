import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  CirclePlay,
  TrendingUp,
  PackageCheck,
  Timer,
  CheckCircle2,
  Trophy,
  Flag,
  Settings
} from 'lucide-react';

const WHATSAPP_NUMBER = "5511930192510"; 
const WHATSAPP_LINK_ATACADO = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%21+%F0%9F%87%A7%F0%9F%87%B7+Vi+o+site+da+Precis%C3%A3o+3D+Aruj%C3%A1+e+quero+garantir+minhas+caixinhas+da+Copa%21+Gostaria+de+saber+os+pre%C3%A7os+para+Atacado.`;
const WHATSAPP_LINK_VAREJO = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%21+%F0%9F%87%A7%F0%9F%87%B7+Vi+o+site+da+Precis%C3%A3o+3D+Aruj%C3%A1+e+quero+garantir+minhas+caixinhas+da+Copa%21+Gostaria+de+saber+os+pre%C3%A7os+para+Varejo.`;

const PRODUCTS = [
  { id: 1, name: "Case Verde Seleção 🇧🇷", image: "https://i.imgur.com/cVR9x3O.png", colorName: "Verde Seleção" },
  { id: 2, name: "Case Amarelo Canário 🇧🇷", image: "https://i.imgur.com/799YXdh.png", colorName: "Amarelo Canário" },
  { id: 3, name: "Case Verde Neon 🇧🇷", image: "https://i.imgur.com/nULGSnY.png", colorName: "Verde Neon" },
  { id: 4, name: "Case Branco Premium 🇧🇷", image: "https://i.imgur.com/anSxXAe.png", colorName: "Branco Premium" },
  { id: 5, name: "Case Azul Anil 🇧🇷", image: "https://i.imgur.com/xwAcuSh.png", colorName: "Azul Anil" },
  { id: 6, name: "Case Verde Amazônia 🇧🇷", image: "https://i.imgur.com/NDWYeRM.png", colorName: "Verde Amazônia" },
  { id: 7, name: "Case Azul Royal 🇧🇷", image: "https://i.imgur.com/Z9nU5C1.png", colorName: "Azul Royal" },
  { id: 8, name: "Case Ouro Cup 🇧🇷", image: "https://i.imgur.com/30kVR7h.png", colorName: "Ouro Cup" },
  { id: 9, name: "Case Cinza Espacial 🇧🇷", image: "https://i.imgur.com/3ylEfrH.png", colorName: "Cinza Espacial" },
  { id: 10, name: "Case Branco Neve 🇧🇷", image: "https://i.imgur.com/PQulKH8.png", colorName: "Branco Neve" }
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="fixed inset-0 z-[100] bg-[#fafafa] flex flex-col items-center justify-center"
  >
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="text-brazil-green mb-4"
    >
      <Settings className="w-16 h-16" />
    </motion.div>
    <div className="flex items-center gap-2 font-heading font-black text-xl text-slate-800 tracking-tighter">
      ARUJÁ<span className="text-brazil-green">.3D</span> CUP 🇧🇷
    </div>
  </motion.div>
);

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="text-[#3eda75] drop-shadow-md">
      {displayedText}
      <span className="inline-block w-[3px] h-[1em] bg-[#3eda75] ml-1 animate-pulse align-middle" />
    </span>
  );
};

const TiltCard = ({ children, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Countdown = () => {
  const targetDate = new Date("2026-06-11T00:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 font-heading font-black">
      {[
        { label: 'DIAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MINUTOS', value: timeLeft.minutes },
        { label: 'SEG', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center bg-white shadow-md border border-slate-100 rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
          <span className="text-2xl md:text-3xl text-brazil-green">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs text-slate-400 capitalize">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Simulate loading time to show preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans selection:bg-brazil-green selection:text-white relative overflow-hidden">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {/* Floating Elements on scroll */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute text-4xl opacity-30 floating-icon transition-transform duration-1000 blur-[2px]" style={{ left: '8%', top: `${15 + scrollY * -0.06}%` }}>🇧🇷</span>
        <span className="absolute text-5xl opacity-20 floating-icon-delayed transition-transform duration-1000 blur-[3px]" style={{ right: '10%', top: `${45 + scrollY * -0.09}%` }}>🇧🇷</span>
        <span className="absolute text-3xl opacity-40 floating-icon transition-transform duration-1000 blur-[1px]" style={{ left: '18%', top: `${140 + scrollY * -0.05}%` }}>🇧🇷</span>
        <Trophy className="absolute text-brazil-gold opacity-10 w-32 h-32 floating-icon transition-transform duration-1000" style={{ right: '5%', top: `${20 + scrollY * -0.05}%` }} />
        <Trophy className="absolute text-brazil-yellow opacity-10 w-24 h-24 floating-icon transition-transform duration-1000" style={{ right: '20%', top: `${150 + scrollY * -0.03}%` }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 px-3 sm:px-5 py-3 md:py-4 flex justify-between items-center">
        <div className="text-slate-900 font-heading font-black text-lg sm:text-xl md:text-2xl tracking-tighter shrink-0">
          ARUJÁ<span className="text-brazil-green">.3D</span> CUP
        </div>
        <a 
          href={WHATSAPP_LINK_ATACADO}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-brazil-green to-brazil-green-dark text-white font-bold px-3 sm:px-6 py-2 rounded-full hover:shadow-lg transition-all text-xs sm:text-sm md:text-base flex items-center gap-1.5 hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ATACADO & VAREJO 🇧🇷
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-4 md:px-5 pt-32 pb-20 relative z-10 w-full mx-auto" style={{ minHeight: '80vh' }}>
        <div className="absolute inset-0 z-[-2] hero-bg-aruja" />
        <div className="absolute inset-0 z-[-1] hero-overlay-dark" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brazil-green/30 text-white font-bold text-xs sm:text-sm mb-6 border border-brazil-green/50 backdrop-blur-md mt-4"
        >
          <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brazil-yellow" /> Prepare-se para a Copa 2026
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-[12vw] leading-tight sm:leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tight mb-6 sm:mb-8 drop-shadow-xl max-w-5xl mx-auto"
        >
          A MAIOR PRECISÃO 3D DE <span className="text-brazil-yellow drop-shadow-[0_4px_20px_rgba(255,204,0,0.4)]">ARUJÁ</span>
        </motion.h1>
        
        <div className="text-gray-100 text-lg sm:text-xl md:text-[1.6rem] font-medium max-w-4xl mx-auto mb-10 sm:mb-16 leading-relaxed min-h-[60px] sm:min-h-[80px]">
          <Typewriter text="Produzimos para você colecionador e para sua empresa lucrar na Copa." />
        </div>
        
        <div className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brazil-green via-brazil-yellow to-brazil-green" />
          <h3 className="text-slate-500 font-bold tracking-widest text-sm uppercase">O tempo está passando</h3>
          <Countdown />
        </div>
      </section>

      {/* B2B Highlight Section (Nova) */}
      <section className="py-20 px-5 max-w-5xl mx-auto relative z-10 -mt-10">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#f5f7f5] to-brazil-yellow/10 bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_20px_40px_rgba(255,204,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 border border-brazil-yellow/20"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-800 mb-4 uppercase">
              Seja um Revendedor <br/> <span className="text-brazil-green-dark">em Arujá</span>
            </h2>
            <p className="text-slate-700 text-lg mb-6 leading-relaxed">
              Atendemos lojistas de Arujá com entrega imediata e o maior desconto do mercado para compras em lote. Saia na frente e abasteça seu comércio!
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-brazil-gold/30 inline-block text-left w-full max-w-md">
              <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                <span className="text-slate-500 font-medium">Pessoa Física:</span>
                <span className="text-slate-800 font-bold">R$ 49,90</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-brazil-green-dark font-black">Empresas/Lojistas:</span>
                <span className="bg-brazil-yellow text-slate-900 border border-brazil-gold/50 shadow-[0_0_15px_rgba(254,223,0,0.6)] text-xs font-black px-3 py-1.5 rounded-md uppercase tracking-wider relative overflow-hidden">
                  <span className="animate-pulse absolute inset-0 bg-white/30"></span>
                  <span className="relative z-10">PREÇO DE CUSTO</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex flex-col gap-4 w-full md:w-auto z-10">
            <a 
              href={WHATSAPP_LINK_ATACADO}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white font-bold px-8 py-4 rounded-full text-center hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5 text-brazil-yellow" />
              SOLICITAR TABELA ATACADO 🇧🇷
            </a>
          </div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-5 max-w-7xl mx-auto relative z-10">
        <h2 className="text-center font-heading text-3xl md:text-5xl font-black uppercase mb-4 text-slate-900">
          Tecnologia em Ação
        </h2>
        <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
          Nossas fazendas de impressão 3D trabalham 24/7 em Arujá para entregar perfeição em cada lote.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[24px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 p-2"
          >
            <div className="aspect-video bg-slate-900 rounded-[18px] relative flex items-center justify-center group overflow-hidden cursor-pointer shadow-inner">
              <video 
                src="https://res.cloudinary.com/dhsn2oxv5/video/upload/v1778255687/snaptik_7621549487189691666_hd_xotioj.mp4" 
                autoPlay muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <p className="absolute bottom-4 text-white font-bold text-sm z-10 tracking-wider">01. IMPRESSÃO</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[24px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 p-2"
          >
            <div className="aspect-video bg-slate-900 rounded-[18px] relative flex items-center justify-center group overflow-hidden cursor-pointer shadow-inner">
              <video 
                src="https://res.cloudinary.com/dhsn2oxv5/video/upload/v1778255659/snaptik_7620249642856451348_hd_nixjaa.mp4" 
                autoPlay muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <p className="absolute bottom-4 text-white font-bold text-sm z-10 tracking-wider">02. RESULTADO FINAL</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog 3D Section */}
      <section id="catalogo" className="py-24 px-5 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="text-brazil-green font-bold tracking-widest uppercase text-sm mb-2">Coleção Oficial</span>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase text-slate-900">
              Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-gold to-[#d4af37]">Elite</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PRODUCTS.map((product, i) => {
              const customWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Quero a caixinha ${product.colorName} que vi no site!`)}`;
              
              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (Math.min(i, 4)) * 0.1 }}
                  className="perspective-[1000px] h-full"
                >
                  <TiltCard className="h-full bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden group flex flex-col relative pt-1">
                    {/* Badge Revendedor */}
                    <div className="absolute top-0 left-0 w-full z-30 text-center">
                      <span className="inline-block bg-brazil-yellow text-slate-900 text-[8px] font-black px-3 py-1 rounded-b-md shadow-sm border border-brazil-gold/30 uppercase tracking-widest whitespace-nowrap">
                        Preço de Custo p/ Revendedores
                      </span>
                    </div>

                    {/* Image container */}
                    <div className="relative h-[220px] bg-slate-50 overflow-hidden flex items-center justify-center p-4 mt-5 border-b border-slate-50/80">
                      <span className="absolute top-2 right-2 z-20 bg-white/80 backdrop-blur-sm text-slate-800 text-[10px] font-black px-2 py-1 rounded-full shadow-sm border border-slate-100 uppercase tracking-widest">
                        3D
                      </span>
                      
                      <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                         {/* Drop shadow underneath */}
                         <div className="absolute -bottom-2 w-3/4 h-2 bg-black/20 blur-xl rounded-[100%]" />
                         <img 
                            src={product.image} 
                            alt={product.colorName} 
                            loading="lazy"
                            className="w-full h-full object-contain drop-shadow-2xl z-10" 
                          />
                      </div>
                    </div>
                    
                    {/* Details container */}
                    <div className="p-5 text-center flex flex-col flex-1 bg-white">
                      <h3 className="font-heading font-black text-[13px] leading-tight text-slate-800 uppercase mb-1">{product.name}</h3>
                      <p className="text-slate-400 text-[11px] mb-4 uppercase tracking-wider font-bold">Filamento Premium</p>
                      
                      <div className="mt-auto">
                        <div className="flex flex-col mb-4">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Varejo</span>
                          <p className="text-slate-900 font-black text-2xl leading-none">R$ 49,90</p>
                        </div>
                        
                        <a 
                          href={customWhatsAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full bg-slate-100 text-slate-800 hover:text-white font-bold py-3 px-2 rounded-[12px] text-[11px] uppercase tracking-wider transition-all duration-300 btn-gold-shine border border-transparent hover:border-brazil-gold focus:outline-none"
                        >
                          <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Comprar via WhatsApp 🇧🇷</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-5 max-w-6xl mx-auto relative z-10">
        <h2 className="text-center font-heading text-3xl md:text-5xl font-black uppercase mb-16 text-slate-900">
          Aprovado por Arujá
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col relative"
          >
            <div className="bg-white p-8 rounded-2xl rounded-bl-none shadow-xl border border-slate-100 relative chat-bubble">
              <div className="flex items-center gap-1 text-brazil-yellow mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-4 italic">
                "Comprei o lote atacado de 50 caixinhas pra revender aqui na <strong>Pista de Skate</strong>. Em uma semana dobrou o investimento. Qualidade surreal, as crianças tão loucas!"
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-slate-900">Rodrigo V.</h4>
                  <p className="text-sm text-slate-500">Lojista (Pista de Skate)</p>
                </div>
                <CheckCircle2 className="text-brazil-green w-5 h-5" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col relative md:mt-12"
          >
            <div className="bg-white p-8 rounded-2xl rounded-br-none shadow-xl border border-slate-100 relative chat-bubble chat-bubble-right">
              <div className="flex items-center gap-1 text-brazil-yellow mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-4 italic">
                "Sou do <strong>Mirante</strong> e ia comprar na internet, mas achei vocês. Fui pessoalmente pegar e fiquei de cara com a resistência. Caiu no chão e não fez um risco."
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-slate-900">Thiago M.</h4>
                  <p className="text-sm text-slate-500">Colecionador (Mirante)</p>
                </div>
                <CheckCircle2 className="text-brazil-green w-5 h-5" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col relative"
          >
            <div className="bg-white p-8 rounded-2xl rounded-bl-none shadow-xl border border-slate-100 relative chat-bubble">
              <div className="flex items-center gap-1 text-brazil-yellow mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-4 italic">
                "Moro no <strong>Jardim Real</strong> e peguei logo 3 pra família toda. Chegou de tarde. O design 3D deixa com cara de produto premium gringo."
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-slate-900">Fernanda C.</h4>
                  <p className="text-sm text-slate-500">Mãe (Jardim Real)</p>
                </div>
                <CheckCircle2 className="text-brazil-green w-5 h-5" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col relative md:mt-12"
          >
            <div className="bg-white p-8 rounded-2xl rounded-br-none shadow-xl border border-slate-100 relative chat-bubble chat-bubble-right">
              <div className="flex items-center gap-1 text-brazil-yellow mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-4 italic">
                "Aqui no <strong>Barreto</strong> somos ponto de venda oficial. O lucro compensa demais porque a caixinha se vende sozinha pelo visual."
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-slate-900">Carlos E.</h4>
                  <p className="text-sm text-slate-500">Revendedor (Barreto)</p>
                </div>
                <CheckCircle2 className="text-brazil-green w-5 h-5" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400 font-medium relative z-10">
        <div className="max-w-7xl mx-auto px-5">
          <p className="mb-2">Arujá 3D Cup © {new Date().getFullYear()} - Produção Local de Alta Performance.</p>
          <p className="text-sm opacity-70">Não cobramos taxa de entrega para retira em pontos fixos da cidade.</p>
        </div>
      </footer>

      {/* Floating Modern CTA */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 z-50 pointer-events-none">
        <a 
          href={WHATSAPP_LINK_ATACADO}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] text-white p-3 sm:p-4 md:px-6 md:py-4 rounded-full shadow-[0_15px_30px_rgba(37,211,102,0.4)] flex items-center gap-2 sm:gap-3 hover:bg-[#1fad52] transition-colors animate-pulse-scale relative pointer-events-auto max-w-[200px] sm:max-w-none"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <span className="block font-bold text-xs sm:text-lg tracking-wide shadow-sm leading-tight text-left">
            Quero saber os preços para revenda em Arujá! 🇧🇷
          </span>
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </div>
        </a>
      </div>

    </div>
  );
}
