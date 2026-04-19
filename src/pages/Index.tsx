import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MOUNTAINS_IMG   = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/333b828a-fb3a-4d1d-bd63-3dc8f06c7e1d.jpg";
const COSTUME_IMG     = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/abf21859-dbd6-4e90-98c6-25be4a4a9710.jpg";
const FESTIVAL_IMG    = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/6726cf03-518f-473c-a3c6-5372cb00e1d9.jpg";
const FOOD_IMG        = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/30983def-86ff-48ee-905e-743478a88c60.jpg";
const ARTIFACTS_IMG   = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/4576e66c-5005-4912-9c74-65721078b307.jpg";
const VILLAGE_IMG     = "https://cdn.poehali.dev/projects/0b86dc4a-973d-4a3d-ad63-754e87fa5dd2/files/eaf47470-c638-46d2-a244-666bd2b459bf.jpg";

const sections = [
  { id: "traditions", label: "Традиции" },
  { id: "history", label: "История" },
  { id: "cuisine", label: "Кухня" },
  { id: "costume", label: "Костюм" },
  { id: "language", label: "Язык" },
  { id: "gallery", label: "Галерея" },
];

const galleryItems = [
  { img: MOUNTAINS_IMG,  title: "Горы Кавказа",        desc: "Адыгея, вид на вершины" },
  { img: COSTUME_IMG,    title: "Черкеска",             desc: "Национальный костюм" },
  { img: FESTIVAL_IMG,   title: "Народный праздник",    desc: "Танцы и песни адыгов" },
  { img: FOOD_IMG,       title: "Адыгская кухня",       desc: "Традиционные блюда" },
  { img: ARTIFACTS_IMG,  title: "Исторические артефакты", desc: "Украшения и оружие" },
  { img: VILLAGE_IMG,    title: "Горное поселение",     desc: "Древние башни Кавказа" },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SectionHeader({ number, title, sub }: { number: string; title: string; sub: string }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <span style={{ color: "rgba(76,175,122,0.25)", fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 700, lineHeight: 1 }}>{number}</span>
        <div className="ornament-line flex-1" />
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#E0EDE5", fontWeight: 600, lineHeight: 1.2 }}>{title}</h2>
      <p style={{ color: "#3A6B4A", fontSize: "14px", fontFamily: "'Montserrat', sans-serif", marginTop: "8px", letterSpacing: "0.05em" }}>{sub}</p>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("traditions");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen mountain-bg" style={{ background: "#0D2418", color: "#F0F5F1" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 sidebar-bg border-b" style={{ borderColor: "rgba(76,175,122,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span style={{ color: "#4CAF7A", fontSize: "22px" }}>⛰</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#A8D8B8", fontWeight: 600, letterSpacing: "0.05em" }}>
                Адыгская культура
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`nav-link text-sm font-medium transition-colors ${activeSection === s.id ? "active" : ""}`}
                  style={{ color: activeSection === s.id ? "#4CAF7A" : "#7AAF8A", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#4CAF7A" }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "rgba(76,175,122,0.2)", background: "rgba(13,36,24,0.98)" }}>
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="block w-full text-left px-6 py-3 text-sm" style={{ color: "#7AAF8A", fontFamily: "'Montserrat', sans-serif" }}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero — горный фон */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh", paddingTop: "64px" }}>
        {/* Фоновая картинка гор */}
        <div className="absolute inset-0">
          <img src={MOUNTAINS_IMG} alt="Горы Кавказа" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,36,24,0.5) 0%, rgba(13,36,24,0.2) 40%, rgba(13,36,24,0.85) 100%)" }} />
        </div>

        {/* Туманные пятна */}
        <div className="mist-blob absolute" style={{ width: "400px", height: "200px", background: "radial-gradient(ellipse, rgba(76,175,122,0.08) 0%, transparent 70%)", top: "30%", left: "10%" }} />
        <div className="mist-blob absolute" style={{ width: "300px", height: "150px", background: "radial-gradient(ellipse, rgba(76,175,122,0.06) 0%, transparent 70%)", top: "50%", right: "15%", animationDelay: "3s" }} />

        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 animate-hero">
            <div className="ornament-line" style={{ width: "80px" }} />
            <span style={{ color: "#4CAF7A", fontSize: "20px" }}>◆</span>
            <div className="ornament-line" style={{ width: "80px" }} />
          </div>

          <p className="animate-hero text-xs uppercase tracking-widest mb-4" style={{ color: "#4CAF7A", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em" }}>
            Адыги · Черкесы · Кабардинцы
          </p>

          <h1 className="hero-title animate-hero-delay font-light mb-6" style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.1, color: "#F0F5F1" }}>
            <span className="green-shimmer" style={{ fontWeight: 600 }}>Адыгская</span>
            <br />культура
          </h1>

          <p className="animate-hero-delay-2 text-base font-light max-w-xl mx-auto mb-12" style={{ color: "#7AAF8A", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif" }}>
            Тысячелетняя история народа Кавказа — хранителей традиций,<br />
            горного духа и живого языка предков
          </p>

          <div className="animate-hero-delay-2 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => scrollTo("traditions")} className="px-8 py-3 text-sm font-medium transition-all hover:scale-105" style={{ background: "#2E7D52", color: "#F0F5F1", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #4CAF7A" }}>
              Начать знакомство
            </button>
            <button onClick={() => scrollTo("gallery")} className="px-8 py-3 text-sm font-medium transition-all" style={{ border: "1px solid rgba(76,175,122,0.5)", color: "#4CAF7A", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Галерея
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-16 animate-hero-delay-2">
            <div className="ornament-line" style={{ width: "60px" }} />
            <span style={{ color: "#4CAF7A", fontSize: "16px" }}>◆</span>
            <div className="ornament-line" style={{ width: "60px" }} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(76,175,122,0.6)" }}>
          <span className="text-xs uppercase tracking-widest" style={{ fontSize: "10px" }}>Прокрутить</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-0">

        {/* TRADITIONS */}
        <section id="traditions" className="py-24 section-reveal">
          <SectionHeader number="01" title="Народные традиции и обычаи" sub="Адыгэ хабзэ — кодекс чести" />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "Shield", title: "Адыгэ хабзэ", desc: "Древний кодекс поведения адыгов, регулирующий все стороны жизни: уважение к старшим, гостеприимство, честь рода и личное достоинство." },
              { icon: "Heart", title: "Гостеприимство", desc: "Куначество — священный институт. Гость в адыгском доме под защитой хозяина. Принято угощать путника независимо от знакомства." },
              { icon: "Users", title: "Культ предков", desc: "Почитание старших и предков — основа семейного уклада. Младшие встают при появлении старших, слушают, не перебивая." },
            ].map((item) => (
              <div key={item.title} className="card-hover p-6" style={{ background: "rgba(46,125,82,0.08)", border: "1px solid rgba(76,175,122,0.2)" }}>
                <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: "rgba(46,125,82,0.15)", border: "1px solid rgba(76,175,122,0.35)" }}>
                  <Icon name={item.icon} size={18} style={{ color: "#4CAF7A" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#A8D8B8", marginBottom: "10px", fontWeight: 600 }}>{item.title}</h3>
                <p style={{ color: "#7AAF8A", fontSize: "14px", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden" style={{ border: "1px solid rgba(76,175,122,0.2)" }}>
            <img src={FESTIVAL_IMG} alt="Народный праздник" className="w-full" style={{ height: "220px", objectFit: "cover" }} />
          </div>

          <div className="mt-6 p-6" style={{ background: "rgba(46,125,82,0.06)", borderLeft: "3px solid #2E7D52" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#A8D8B8", fontStyle: "italic", lineHeight: 1.7 }}>
              «Адыгэ хабзэ — это не просто правила поведения, это целая философия жизни, где честь, достоинство и уважение к другому человеку являются высшими ценностями.»
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { title: "Свадебные обряды", items: ["Похищение невесты (игровое)", "Три дня торжеств с танцами", "Обряд «выхода» невесты", "Дары родственников"] },
              { title: "Джигитовка и воспитание", items: ["С детства мальчиков обучали верховой езде", "Стрельба из лука — обязательный навык", "Кулачный бой и борьба", "Воспитание выдержки и стойкости"] },
            ].map((block) => (
              <div key={block.title} className="p-6" style={{ background: "rgba(13,36,24,0.9)", border: "1px solid rgba(76,175,122,0.15)" }}>
                <h4 style={{ color: "#4CAF7A", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", marginBottom: "12px", fontWeight: 600 }}>{block.title}</h4>
                <ul className="space-y-2">
                  {block.items.map((it) => (
                    <li key={it} className="flex items-start gap-3" style={{ color: "#7AAF8A", fontSize: "14px" }}>
                      <span style={{ color: "#4CAF7A", marginTop: "2px" }}>◆</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="ornament-line" />

        {/* HISTORY */}
        <section id="history" className="py-24 section-reveal">
          <SectionHeader number="02" title="История адыгов" sub="Тысячелетний путь кавказского народа" />

          <div className="mt-12 mb-10 grid md:grid-cols-2 gap-4">
            <img src={VILLAGE_IMG} alt="Горное поселение" className="w-full" style={{ height: "200px", objectFit: "cover", border: "1px solid rgba(76,175,122,0.2)" }} />
            <img src={ARTIFACTS_IMG} alt="Артефакты" className="w-full" style={{ height: "200px", objectFit: "cover", border: "1px solid rgba(76,175,122,0.2)" }} />
          </div>

          <div className="space-y-0">
            {[
              { year: "V–III тыс. до н.э.", event: "Майкопская культура", desc: "Предки адыгов — носители майкопской культуры бронзового века на Северном Кавказе." },
              { year: "I тыс. до н.э.", event: "Синды и меоты", desc: "Племена синдов, меотов, зихов — предшественники современных адыгов. Торговые связи с греческими колониями Черноморья." },
              { year: "X–XIII вв.", event: "Расцвет Зихии", desc: "Формирование адыгской народности. Принятие христианства под влиянием Byzantium." },
              { year: "XVI–XVII вв.", event: "Союз с Россией", desc: "1557 год — посольство кабардинских князей к Ивану Грозному. Начало российско-адыгских отношений." },
              { year: "1763–1864", event: "Кавказская война", desc: "Тяжелейший период в истории народа. Массовое переселение (мухаджирство) в Османскую империю." },
              { year: "XX–XXI вв.", event: "Возрождение культуры", desc: "Создание Республики Адыгея (1991). Возрождение языка, традиций, установление связей с диаспорой." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 pb-8 relative" style={{ paddingLeft: "24px", borderLeft: "1px solid rgba(76,175,122,0.25)" }}>
                <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-1" style={{ background: "#2E7D52" }} />
                <div className="min-w-[140px]">
                  <span style={{ color: "#4CAF7A", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em", fontWeight: 600 }}>{item.year}</span>
                </div>
                <div>
                  <h4 style={{ color: "#E0EDE5", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, marginBottom: "6px" }}>{item.event}</h4>
                  <p style={{ color: "#7AAF8A", fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ornament-line" />

        {/* CUISINE */}
        <section id="cuisine" className="py-24 section-reveal">
          <SectionHeader number="03" title="Национальная кухня" sub="Простота, сытость, гостеприимство" />

          <div className="grid md:grid-cols-2 gap-8 mt-12 items-start">
            <div>
              <img src={FOOD_IMG} alt="Адыгская кухня" className="w-full" style={{ height: "320px", objectFit: "cover", border: "1px solid rgba(76,175,122,0.2)" }} />
            </div>
            <div className="space-y-4">
              {[
                { name: "Адыгейский сыр", tag: "Символ кухни", desc: "Мягкий рассольный сыр из коровьего молока — визитная карточка адыгской кулинарии. Известен по всему миру." },
                { name: "Либжэ", tag: "Главное блюдо", desc: "Курица или говядина, тушённые с луком, чесноком и красным перцем. Подаётся с мамалыгой — кукурузной кашей." },
                { name: "Халива", tag: "Выпечка", desc: "Пирожки из пресного теста с начинкой из адыгейского сыра и картофеля. Традиционное угощение." },
                { name: "Щипс", tag: "Соус", desc: "Ароматный соус на основе бульона с луком и специями — неизменный атрибут адыгского стола." },
              ].map((dish) => (
                <div key={dish.name} className="flex gap-4 p-4" style={{ background: "rgba(46,125,82,0.06)", border: "1px solid rgba(76,175,122,0.15)" }}>
                  <div style={{ width: "8px", height: "8px", background: "#2E7D52", flexShrink: 0, marginTop: "6px" }} />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span style={{ color: "#A8D8B8", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 600 }}>{dish.name}</span>
                      <span style={{ color: "#3A7A55", fontSize: "10px", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{dish.tag}</span>
                    </div>
                    <p style={{ color: "#7AAF8A", fontSize: "13px", lineHeight: 1.7 }}>{dish.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ornament-line" />

        {/* COSTUME */}
        <section id="costume" className="py-24 section-reveal">
          <SectionHeader number="04" title="Традиционный костюм" sub="Черкеска — воинская элегантность" />

          <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
            <div className="space-y-6">
              <p style={{ color: "#7AAF8A", fontSize: "15px", lineHeight: 1.9 }}>
                Адыгский национальный костюм — один из красивейших на Кавказе. Он сочетает воинскую функциональность с изысканностью орнамента и вышивки.
              </p>

              <div>
                <h4 style={{ color: "#4CAF7A", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, marginBottom: "14px" }}>Мужской костюм</h4>
                <div className="space-y-3">
                  {[
                    ["Черкеска", "Длиннополый кафтан с газырями — специальными кармашками для патронов"],
                    ["Бешмет", "Нижний кафтан, плотно облегающий фигуру"],
                    ["Кинжал", "Обязательный элемент — символ чести и достоинства"],
                    ["Папаха", "Меховая шапка из овчины или каракуля"],
                  ].map(([name, desc]) => (
                    <div key={name} style={{ borderBottom: "1px solid rgba(76,175,122,0.12)", paddingBottom: "10px" }}>
                      <span style={{ color: "#A8D8B8", fontWeight: 600, fontSize: "14px" }}>{name}</span>
                      <span style={{ color: "#4A7A5C", fontSize: "14px" }}> — {desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: "#4CAF7A", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, marginBottom: "14px" }}>Женский костюм</h4>
                <div className="space-y-3">
                  {[
                    ["Сай", "Длинное расклешённое платье с золотым шитьём"],
                    ["Корсет", "Расшитый золотыми нитями, подчёркивает осанку"],
                    ["Головной убор", "Вышитая шапочка с платком — символ замужества"],
                  ].map(([name, desc]) => (
                    <div key={name} style={{ borderBottom: "1px solid rgba(76,175,122,0.12)", paddingBottom: "10px" }}>
                      <span style={{ color: "#A8D8B8", fontWeight: 600, fontSize: "14px" }}>{name}</span>
                      <span style={{ color: "#4A7A5C", fontSize: "14px" }}> — {desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <img src={COSTUME_IMG} alt="Адыгский костюм" className="w-full" style={{ height: "480px", objectFit: "cover", border: "1px solid rgba(76,175,122,0.2)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(13,36,24,0.95))" }}>
                <p style={{ color: "#4CAF7A", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>Черкеска · Традиционный мужской костюм</p>
              </div>
            </div>
          </div>
        </section>

        <div className="ornament-line" />

        {/* LANGUAGE */}
        <section id="language" className="py-24 section-reveal">
          <SectionHeader number="05" title="Адыгский язык и литература" sub="Живое слово народа" />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="md:col-span-2 space-y-6">
              <div className="p-6" style={{ background: "rgba(46,125,82,0.07)", border: "1px solid rgba(76,175,122,0.18)" }}>
                <h4 style={{ color: "#4CAF7A", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>О языке</h4>
                <p style={{ color: "#7AAF8A", fontSize: "14px", lineHeight: 1.9 }}>
                  Адыгский язык относится к абхазо-адыгской ветви северокавказской языковой семьи. Выделяют два литературных языка: <strong style={{ color: "#A8D8B8" }}>адыгейский</strong> (западноадыгский) и <strong style={{ color: "#A8D8B8" }}>кабардино-черкесский</strong> (восточноадыгский). Язык отличается богатой консонантной системой и сложной глагольной морфологией.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Сэлам алейкум", "Приветствие"],
                  ["Тхьэшхуэ", "Бог"],
                  ["Хьэщlэ", "Гость"],
                  ["Хабзэ", "Традиция"],
                  ["Адыгэ", "Адыг, черкес"],
                  ["Сэ сыадыгэщ", "Я — адыг"],
                ].map(([word, trans]) => (
                  <div key={word} className="p-3 flex justify-between items-center" style={{ background: "rgba(13,36,24,0.9)", border: "1px solid rgba(76,175,122,0.15)" }}>
                    <span style={{ color: "#A8D8B8", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic" }}>{word}</span>
                    <span style={{ color: "#3A7A55", fontSize: "12px", fontFamily: "'Montserrat', sans-serif" }}>{trans}</span>
                  </div>
                ))}
              </div>

              <div className="p-6" style={{ background: "rgba(46,125,82,0.06)", borderLeft: "3px solid #2E7D52" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#A8D8B8", fontStyle: "italic", marginBottom: "8px" }}>
                  «Бзэр — лъэпкъым и хъуреибэщ»
                </p>
                <p style={{ color: "#3A7A55", fontSize: "13px" }}>«Язык — это душа народа» — адыгская пословица</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 style={{ color: "#4CAF7A", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, marginBottom: "8px" }}>Литература</h4>
              {[
                { name: "Нартский эпос", period: "Древность", desc: "Богатырский эпос о нартах — мифических героях Кавказа" },
                { name: "Кемал Атажукин", period: "XIX в.", desc: "Основоположник адыгской письменной литературы" },
                { name: "Алий Шогенцуков", period: "XX в.", desc: "Классик кабардинской поэзии и прозы" },
                { name: "Исхак Машбаш", period: "XX–XXI в.", desc: "Народный писатель Адыгеи, автор исторических романов" },
              ].map((author) => (
                <div key={author.name} className="p-4" style={{ background: "rgba(46,125,82,0.05)", border: "1px solid rgba(76,175,122,0.12)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: "#A8D8B8", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{author.name}</span>
                    <span style={{ color: "#2E5E40", fontSize: "11px", fontFamily: "'Montserrat', sans-serif" }}>{author.period}</span>
                  </div>
                  <p style={{ color: "#4A7A5C", fontSize: "13px", lineHeight: 1.6 }}>{author.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ornament-line" />

        {/* GALLERY */}
        <section id="gallery" className="py-24 section-reveal">
          <SectionHeader number="06" title="Фотогалерея" sub="Образы адыгской культуры" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-item" style={{ border: "1px solid rgba(76,175,122,0.2)" }} onClick={() => setLightboxImg(item.img)}>
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3" style={{ background: "linear-gradient(transparent 50%, rgba(13,36,24,0.9))" }}>
                    <p style={{ color: "#A8D8B8", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 600 }}>{item.title}</p>
                    <p style={{ color: "#3A7A55", fontSize: "12px", fontFamily: "'Montserrat', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 mt-8" style={{ borderTop: "1px solid rgba(76,175,122,0.2)", background: "rgba(7,18,12,0.9)" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="ornament-line" style={{ width: "60px" }} />
            <span style={{ color: "#4CAF7A", fontSize: "20px" }}>⛰</span>
            <div className="ornament-line" style={{ width: "60px" }} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#A8D8B8", marginBottom: "8px" }}>Адыгская культура</p>
          <p style={{ color: "#2E5E40", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em" }}>
            ТРАДИЦИИ · ИСТОРИЯ · ЯЗЫК · НАСЛЕДИЕ
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="" className="max-w-full max-h-full" style={{ border: "1px solid rgba(76,175,122,0.3)" }} />
          <button className="absolute top-4 right-4" style={{ color: "#4CAF7A" }}>
            <Icon name="X" size={28} />
          </button>
        </div>
      )}
    </div>
  );
}