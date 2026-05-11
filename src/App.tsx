import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Layers, Award, ChevronLeft, ChevronRight, RotateCw, CheckCircle, XCircle, Bot } from 'lucide-react';
import { getFeedbackData } from './data/sarcasm';

// --- DATA: Flashcards (50) ---
const FLASHCARDS = [
  { q: "¿Qué busca el análisis FODA a nivel primario?", a: "Identificar recursos internos y la visión del entorno para una posición estratégica clara.", lvl: "Intermedio" },
  { q: "¿Qué evalúa exactamente la Matriz EFI?", a: "Qué tan bien aprovechamos nuestros recursos internos (Fortalezas y Debilidades).", lvl: "Intermedio" },
  { q: "¿Cuál es el propósito central de la Matriz EFE?", a: "Revelar cómo respondemos al entorno externo (Oportunidades y Amenazas).", lvl: "Intermedio" },
  { q: "¿Qué indica un puntaje > 2.5 en la Matriz EFI?", a: "La empresa tiene más fortalezas que debilidades y está en una buena posición interna.", lvl: "Intermedio" },
  { q: "¿Qué significa un puntaje < 2.5 en la Matriz EFE?", a: "La empresa no aprovecha adecuadamente las oportunidades o es vulnerable ante las amenazas.", lvl: "Intermedio" },
  { q: "¿Cómo se asignan los pesos en EFE y EFI?", a: "Escala de 0.0 a 1.0; la suma total de los pesos de todos los factores debe ser exactamente 1.0.", lvl: "Intermedio" },
  { q: "¿Cuál es la escala de calificación en la Matriz EFI?", a: "De 1 a 4: 1=Gran debilidad, 2=Debilidad menor, 3=Fortaleza menor, 4=Gran fortaleza.", lvl: "Intermedio" },
  { q: "¿Cuál es la escala de calificación en la Matriz EFE?", a: "De 1 a 4: 1=Mala respuesta, 2=Respuesta promedio, 3=Sobre el promedio, 4=Respuesta excelente.", lvl: "Intermedio" },
  { q: "¿Qué componentes estructuran la Metodología V.R.I.O.?", a: "Valioso, Raro, Inimitable, Organización.", lvl: "Intermedio" },
  { q: "¿Cuál es el fin último de integrar FODA, EFI y EFE?", a: "Ubicar la posición estratégica actual como base objetiva para diseñar estrategias con alta probabilidad de éxito.", lvl: "Intermedio" },
  { q: "En VRIO, si un recurso es Valioso pero no Raro, ¿qué ventaja surge?", a: "Paridad competitiva. Eres bueno, pero igual que el resto.", lvl: "Avanzado" },
  { q: "En VRIO, si el recurso es Valioso y Raro pero fácilmente imitable, ¿qué genera?", a: "Ventaja competitiva temporal. Eventualmente los competidores lo replicarán.", lvl: "Avanzado" },
  { q: "¿Qué tipo de recurso genera Ventaja Competitiva Sostenible?", a: "Aquel que cumple todo VRIO: Valioso, Raro, Inimitable y la empresa está Organizada para aprovecharlo.", lvl: "Avanzado" },
  { q: "¿Por qué es crucial usar datos objetivos para asignar pesos en EFI/EFE?", a: "Para evitar sesgos cognitivos gerenciales y asegurar que el peso refleje el impacto real en la industria.", lvl: "Avanzado" },
  { q: "¿Cómo se calcula el puntaje ponderado de un factor?", a: "Multiplicando su Peso (importancia sectorial) por su Calificación (desempeño específico de la empresa).", lvl: "Avanzado" },
  { q: "En EFI, ¿una debilidad puede tener un peso (importancia) muy alto, como 0.15?", a: "Sí, el peso indica impacto en la industria, no si somos buenos o malos. Si frena el mercado, su peso es alto.", lvl: "Avanzado" },
  { q: "¿Puede calificar una Oportunidad con 1 en EFE?", a: "Sí, si la empresa tiene una respuesta paupérrima o nula frente a esa oportunidad del mercado.", lvl: "Avanzado" },
  { q: "¿Qué indica calificar una Amenaza externa con 4?", a: "Que la respuesta estratégica y operativa de la empresa frente a esa amenaza es excelente y la neutraliza.", lvl: "Avanzado" },
  { q: "¿Por qué hacer Benchmarking al elaborar la EFI?", a: "Para calibrar calificaciones; crees que tu logística es 'Gran Fortaleza' (4) hasta que ves la de Amazon.", lvl: "Avanzado" },
  { q: "Metodológicamente, ¿por qué armar estas matrices con equipos diversos?", a: "Para mitigar la miopía departamental y obtener perspectivas cruzadas sobre factores críticos.", lvl: "Avanzado" },
  { q: "¿Cuál es la frontera teórica entre PESTEL y la Matriz EFE?", a: "PESTEL aísla tendencias macroeconómicas; EFE las tamiza, selecciona las críticas y mide nuestra respuesta.", lvl: "Avanzado" },
  { q: "En un análisis cruzado, ¿qué busca la estrategia FO (Maxi-Maxi)?", a: "Fuerzas Ofensivas. Utilizar fortalezas internas colosales para capitalizar oportunidades inexploradas.", lvl: "Avanzado" },
  { q: "¿En qué escenario se prioriza una estrategia DA (Mini-Mini)?", a: "Supervivencia. Cuando debilidades críticas chocan con amenazas inminentes; requiere reestructuración o fusión.", lvl: "Avanzado" },
  { q: "Bajo VRIO, la marca Coca-Cola es 'Inimitable' debido a...", a: "Ambigüedad causal, complejidad social y trayectoria histórica irreversible.", lvl: "Avanzado" },
  { q: "¿Por qué una EFE perfecta (4.0) no garantiza rentabilidad actual?", a: "Refleja reacción perfecta al exterior, pero si la EFI es 1.5, operaciones internas colapsarán.", lvl: "Avanzado" },
  { q: "¿Por qué el clima organizacional se evalúa en EFI y no en EFE?", a: "Porque es un factor endógeno sobre el cual la gerencia tiene control directo y capacidad de intervención.", lvl: "Avanzado" },
  { q: "¿Qué sesgo suele destruir la validez de la Matriz EFI?", a: "El sesgo de confirmación y complacencia gerencial sobrevaluando debilidades como si fueran fortalezas menores.", lvl: "Avanzado" },
  { q: "La irrupción de una App que vuelve obsoleto tu producto es...", a: "Amenaza disruptiva (EFE). Requiere calificación de respuesta urgente.", lvl: "Avanzado" },
  { q: "Fuerzas de Porter: ¿El poder de negociación de proveedores entra en EFI o EFE?", a: "EFE, catalogado como amenaza (si es alto) u oportunidad (si se debilita).", lvl: "Avanzado" },
  { q: "Si EFI + EFE muestran madurez, ¿qué matriz se usaría luego para portafolios?", a: "Matriz BCG o Matriz de McKinsey-GE.", lvl: "Avanzado" },
  { q: "(Harvard) ¿Cómo afecta la 'Ambigüedad Causal' a la sección 'Inimitable' de VRIO?", a: "Impide que rivales copien la ventaja porque ni ellos (ni a veces los creadores) entienden el vínculo exacto entre recursos y éxito.", lvl: "Harvard" },
  { q: "(Harvard) Defina el riesgo de la 'Trampa de Competencia' en la EFI.", a: "Sobre-optimizar una fortaleza central ignorando que el paradigma del mercado cambió, volviendo el '4' irrelevante (Peso 0.0).", lvl: "Harvard" },
  { q: "(Harvard) ¿Cuál es la disonancia en tener EFI alto y EFE bajo?", a: "La 'Miopía del Buen Estudiante': procesos internos perfectos fabricando productos que el mercado externo ya no quiere.", lvl: "Harvard" },
  { q: "(Harvard) Si una Amenaza en EFE afecta a toda la industria, ¿por qué tu respuesta podría ser 4?", a: "Por Ventaja Asimétrica. La amenaza destruye a la competencia, pero tus defensas te permiten ganar cuota de mercado.", lvl: "Harvard" },
  { q: "(Harvard) Explique el 'Fit Estratégico' usando VRIO y FODA Cruzado.", a: "Alinear recursos 'Inimitables y Organizados' exclusivamente en las imperfecciones de mercado detectadas en Oportunidades.", lvl: "Harvard" },
  { q: "(Harvard) ¿Qué significa el 'Exceso de Apropiabilidad' en VRIO?", a: "Cuando el recurso humano es Valioso y Raro, pero retiene toda la renta (ej. CEO estrella), dejando ceros para accionistas.", lvl: "Harvard" },
  { q: "(Harvard) En un LBO (Leveraged Buyout), ¿qué busca el PE en la EFI del target?", a: "Debilidades operativas (calificación 1) con alto peso sectorial que pueden optimizarse drásticamente para liberar cash flow.", lvl: "Harvard" },
  { q: "(Harvard) Critica la dicotomía del FODA clásico.", a: "Carencia de medición cardinal. Un factor puede ser Fortaleza y Debilidad simultáneamente según el ciclo de producto.", lvl: "Harvard" },
  { q: "(Harvard) En estrategia océanos azules, ¿cómo impacta la EFE?", a: "Fuerza a restar peso a factores donde la competencia sangra, reestructurando los pesos hacia no-clientes.", lvl: "Harvard" },
  { q: "(Harvard) ¿Qué es el 'Decoupling' y cómo altera la evaluación de Oportunidades?", a: "Separar actividades del ciclo de consumo de un cliente para crear valor en un nicho, fragmentando las Oportunidades de los incumbentes.", lvl: "Harvard" },
  { q: "(Harvard) Un cambio regulatorio severo suma en PESTEL. Matriz EFE asigna peso alto. ¿Impacto?", a: "Volatilidad sistémica. Tu calificación definirá tu supervivencia; un 1 o 2 proyecta disolución empresarial inminente.", lvl: "Harvard" },
  { q: "(Harvard) ¿Cómo integrar Opciones Reales al VRIO?", a: "La 'O' (Organizado) asume flexibilidad operativa para escalar o abandonar un recurso si el valor presente del subyacente cae.", lvl: "Harvard" },
  { q: "(Harvard) Relacione la 'Tragedia de los Comunes' con Recursos Raros.", a: "Un recurso hipercompartido pierde rareza. Si tu estrategia no privatiza el acceso, el recurso se degrada a Paridad.", lvl: "Harvard" },
  { q: "(Harvard) En una EFE, la 'Rivalidad de Competidores' (Porter) sube a 0.20 peso. ¿Por qué?", a: "Commoditización del sector; los márgenes colapsan y la importancia de sobrevivir ataques frontales domina la externalidad.", lvl: "Harvard" },
  { q: "(Harvard) ¿Cómo el 'Path Dependence' solidifica una Fortaleza (4) en EFI?", a: "Beneficios de aprendizaje histórico ineludibles. Un competidor nuevo no puede inyectar capital para 'comprar' 60 años de iteración.", lvl: "Harvard" },
  { q: "(Harvard) Si una debilidad menor asfixia a un recurso VRI, ¿el recurso vale?", a: "No. El Cuello de Botella de Goldratt prueba que la capacidad del sistema se reduce al eslabón más débil, anulando la renta Ricardiana.", lvl: "Harvard" },
  { q: "(Harvard) ¿Existe Ventaja Competitiva Eterna?", a: "Solo en monopolios coercitivos. En mercados libres impera la 'Destrucción Creativa' de Schumpeter, erosionando VRIO inevitablemente.", lvl: "Harvard" },
  { q: "(Harvard) Valioso + Raro + Inimitable a nivel organizacional... pero rentabilidad plana. ¿Por qué?", a: "Problema de Agencia. La estructura organizacional disipa rentas en ineficiencias de control o desvío corporativo.", lvl: "Harvard" },
  { q: "(Harvard) Interprete EFE de 1.1 y EFI de 3.9.", a: "Dinosaurio eficiente. Máquina corporativa excelsa yendo directo a la bancarrota por ceguera de mercado.", lvl: "Harvard" },
  { q: "(Harvard) La verdadera genialidad de combinar EFE y EFI es...", a: "La cuantificación del riesgo ciego y el autoengaño sistémico del C-Suite en una sola matriz bi-direccional.", lvl: "Harvard" }
];

// --- DATA: Simulador MIT (20) ---
const QUIZ_QUESTIONS = [
  { q: "Una empresa textil analiza su EFI y nota que 'Clima laboral deficiente' tiene calificación 1 y peso 0.20. 'Patentes únicas' tiene calificación 4 y peso 0.05. ¿Qué inferimos sobre el sector según quien diseñó la matriz?", options: [
      "El sector se basa en tecnología no imitable.",
      "La satisfacción operativa impacta mucho más el éxito de la industria que las patentes.",
      "La empresa debe vender sus patentes para mejorar el clima.",
      "El clima laboral es irrelevante porque la calificación fue baja."
    ], a: 1 },
  { q: "Kodak, a principios de los 2000, poseía gran capacidad productiva (EFI alta) y patentes digitales, pero su EFE reflejaba baja calificación ante el auge de las memorias SD y digitalización masiva. ¿Qué falacia cognitiva sufría su comité?", options: [
      "Sesgo de escasez de recursos.",
      "Incapacidad de separar el 'Organizado' en su análisis VRIO para activos digitales.",
      "Dependencia tecnológica de proveedores exógenos.",
      "Respuesta excesiva a las métricas PESTEL."
    ], a: 1 },
  { q: "Un inversionista revisa una EFE con puntaje 3.8 y EFI con 2.1. Como fondo de Turnaround (reestructuración), ¿qué debe hacer?", options: [
      "No invertir, el entorno está corrompido.",
      "Invertir. El mercado y modelo de negocio funcionan; solo se requiere reemplazar la gerencia ineficiente interna.",
      "Liquidar la empresa inmediatamente para pagar deudas.",
      "Desviar las operaciones hacia estrategias FA."
    ], a: 1 },
  { q: "Si un competidor lanza una innovación y pasa nuestro recurso clave de 'Ventaja Competitiva Temporal' a 'Paridad Competitiva' en VRIO. ¿Qué variable atacó?", options: [
      "El valor intrínseco del activo.",
      "El nivel de organización de nuestra empresa.",
      "La inimitabilidad o rareza de nuestro recurso.",
      "Los factores de PESTEL político-legales."
    ], a: 2 },
  { q: "¿En qué cuadrante FODA operarías en un océano rojo saturado, si descubres que posees eficiencias de escala no igualables pero la industria está estancada?", options: [
      "FO: Crecer masivamente lanzando nuevos productos.",
      "DA: Liquidación de activos para salir del mercado.",
      "FA: Usar tu ventaja de costos para iniciar una guerra de precios o compra de competidores asfixiados.",
      "DO: Minimizar tus vulnerabilidades copiando al líder."
    ], a: 2 },
  { q: "Analíticamente, ¿por qué la suma de pesos en EFE debe ser estrictamente 1.0?", options: [
      "Por estética de modelaje financiero.",
      "Para forzar trade-offs; si todo es 'muy importante', nada lo es. Obliga a priorizar la gravedad relativa.",
      "Porque las calificaciones van hasta 4, sumando 5 en total.",
      "Para igualar la matriz al análisis PESTEL de 100%."
    ], a: 1 },
  { q: "Te contratan de CEO y notas que tu EFI es 3.1. Tus VP's te aseguran estar 'perfectos'. Al cruzar datos, tu Market Share cayó 10% anual por 3 años. ¿Qué deduces de la Matriz EFI de los VP's?", options: [
      "Está construida sin Benchmarking objetivo, sufriendo sesgo de auto-complacencia.",
      "El mercado se equivocó y la matriz tiene la razón histórica.",
      "Las ponderaciones (pesos) fueron asignadas externalizando el riesgo.",
      "La EFE debe ser superior a 3.5 obligatoriamente."
    ], a: 0 },
  { q: "Un recurso humano 'Valioso, Raro e Inimitable', sin apropiación organizacional (ej. desarrolladores de IA que no documentan nada), genera:", options: [
      "Rentabilidad corporativa infinita.",
      "Alta dependencia operativa, riesgo sistémico y nula escalabilidad corporativa.",
      "Iniciativas estratégicas Maxi-Maxi (FO).",
      "Respuesta excelente en la Matriz EFE frente a amenazas tecnológicas."
    ], a: 1 },
  { q: "En la matriz EFE, el gobierno regula contra tu industria. Tu empresa tenía un lobby fuerte y patentes ambientales avanzadas. Su calificación de respuesta a esta 'Amenaza' debería ser:", options: [
      "1, porque toda regulación es negativa.",
      "4, posees ventajas asimétricas que neutralizan la amenaza e incluso erosionan a tus rivales desprevenidos.",
      "2, representa una respuesta estándar a entes federales.",
      "Se elimina de la tabla porque es del entorno Político de PESTEL."
    ], a: 1 },
  { q: "Si aplicas estrategias 'Defensivas' (Minimizar Debilidades y Amenazas) según el FODA cruzado, el enfoque financiero a corto plazo será primariamente hacia:", options: [
      "Expansión agresiva de Capex en I+D.",
      "Absorber startups por altos márgenes.",
      "Desinversión corporativa, reducción de OpEx, o reestructuración de pasivos.",
      "Lanzamiento de marcas premium internacionales."
    ], a: 2 },
  { q: "La diferencia técnica entre asignar una calificación de 3 y 4 en una Fortaleza (Matriz EFI) radica empíricamente en:", options: [
      "El capricho del estratega en turno.",
      "3 es una superioridad marginal comprobable; 4 implica liderazgo sectorial dominante o estándar de la industria.",
      "En 3 dominas el monopolio, en 4 eres un oligopolio.",
      "3 significa que es rara, 4 significa que es valiosa según VRIO."
    ], a: 1 },
  { q: "¿Cómo interactúa la teoría de 'Ambigüedad Causal' con el espionaje corporativo?", options: [
      "Lo facilita inmensamente al digitalizar información.",
      "Lo frustra. Aunque roben organigramas o datos, no pueden decodificar la intrincada sincronía cultural y operativa que origina el éxito.",
      "Anula el peso en la matriz EFE de los competidores locales.",
      "Hace que el recurso deje de ser VRIO en seis meses."
    ], a: 1 },
  { q: "Una calificación '1' en una Oportunidad de EFE revela una catástrofe de...", options: [
      "Apatía o incapacidad organizacional. Hay dinero sobre la mesa que no se está recogiendo.",
      "La macroeconomía, pues PESTEL destruyó el mercado global.",
      "El valor intrínseco del producto, que ahora es un pasivo tóxico.",
      "Costos marginales de producción internos de EFI."
    ], a: 0 },
  { q: "Bajo la lupa de competitividad sostenible (VRIO), las patentes farmacéuticas son, por defecto, Inimitables, pero ¿qué debilidad organizacional suele diluir esta ventaja?", options: [
      "Exceder la escala de mercado del medicamento.",
      "Fecha de caducidad ineludible (precipicio de patentes) y lentitud del portafolio I+D de reemplazo.",
      "Incapacidad de asignar pesos en su Matriz FODA.",
      "Que los precios de las drogas se basan solo en estrategia DO."
    ], a: 1 },
  { q: "Tienes EFE=3.5 y EFI=3.6. El ecosistema es tan fértil y tú eres tan fuerte que todos los rivales lo saben. ¿Cuál es el riesgo en Teoría de Juegos de esta posición?", options: [
      "Cese súbito del consumo por recesión cíclica de la Matriz BCG.",
      "Incentivar entrada de hiper-competidores o capital de riesgo atraído por los retornos anormales, erosionando tu EFE a mediano plazo.",
      "Que el proceso interno de Benchmarking se congele para siempre.",
      "Que la 'fortaleza' colapse por exceso de pesos menores a 0.05 en el factor."
    ], a: 1 },
  { q: "El 'Path Dependence' (Dependencia de la trayectoria) hace que los recursos sean 'Inimitables' porque:", options: [
      "Se pueden replicar descargando softwares de código abierto.",
      "La competencia carece del tiempo lineal y aprendizaje acumulado para emular la eficiencia obtenida tras décadas de prueba y error.",
      "Garantizan una estrategia DO basada en adquisiciones forzosas.",
      "Permite calificar las amenazas de EFE siempre en nivel 4 automático."
    ], a: 1 },
  { q: "Si la junta te acusa de tener un puntaje EFI de 2.2 derivado de 'ineficiencias operativas', tu respuesta táctica inmediata es invocar una estrategia tipo:", options: [
      "FO (Maxi-Maxi): Gastar más en marketing externo.",
      "FA (Maxi-Mini): Pelear una guerra de precios.",
      "DO (Mini-Maxi): Buscar un socio estratégico externo que compense o maquille la carencia productiva interna.",
      "DA (Mini-Mini): Declarar dividendos masivos."
    ], a: 2 },
  { q: "¿En qué punto del análisis VRIO fracasan el 90% de las startups financiadas con capital de riesgo en sus años iniciales?", options: [
      "Valioso: Nunca consiguen product-market fit verdadero.",
      "Raro: Están solos en una idea única.",
      "Inimitable: Crean algoritmos de extrema complejidad cuántica.",
      "Organización: Sus fundadores venden su participación y operan de forma perfecta y madura."
    ], a: 0 },
  { q: "Analizando Apple vs Nokia (2007). Nokia poseía supremacía de supply chain e inmenso músculo financiero (EFI alta). Sin embargo, falló ante el iPhone. El error fue...", options: [
      "Asignar un peso EFE de 0.80 al hardware básico e ignorar la plataforma software (oportunidad de SO). Cegados por sus propias fortalezas pasadas.",
      "Calificar a Porter (Nuevos Entrantes) con 4 puntos de respuesta mala.",
      "Destruir la organización internamente a propósito para bajar de impuestos.",
      "Tener una ambigüedad causal insuficiente frente a la batería de litio."
    ], a: 0 },
  { q: "(Examen Final MIT) Diseñas una Arquitectura Estratégica. EFI = 1.3 (Desastre inminente). EFE = 3.9 (Mercado explosivo en crecimiento verde). ¿Qué decisión VRIO/Financiera maximiza el valor para el accionista HOY?", options: [
      "Ejecutar estrategias orgánicas FO esperando estabilizar la nave a 10 años.",
      "Vender la empresa inmediatamente a un 'Player' superior que posea la 'O' (Organización) y necesite acceso rápido a nuestro nicho EFE antes de que quebremos.",
      "Contratar asesores para que modifiquen el análisis FODA hasta que dé rentabilidad.",
      "Cerrar y declararse en quiebra sin monetizar el acceso."
    ], a: 1 }
];

// Data imported from /src/data/sarcasm.ts


// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'flashcards' | 'quiz'>('teoria');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif selection:bg-[#A51C30] selection:text-white pb-20">
      {/* HEADER NAVBAR */}
      <header className="bg-[#A51C30] text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h1 className="text-2xl font-bold tracking-tight uppercase">Élite Stratégique <span className="text-[#D4AF37] opacity-80 text-sm ml-2">MIT • Harvard</span></h1>
            </div>
            <nav className="hidden md:flex space-x-2">
              <TabButton active={activeTab === 'teoria'} onClick={() => setActiveTab('teoria')} icon={<BookOpen size={18} />} label="Teoría" />
              <TabButton active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')} icon={<Layers size={18} />} label="Flashcards (50)" />
              <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<Award size={18} />} label="Simulador MIT" />
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE NAV TABS */}
      <div className="md:hidden flex bg-[#8B1828] text-sm justify-around shadow-inner">
        <button onClick={() => setActiveTab('teoria')} className={`p-4 flex-1 text-center font-medium ${activeTab === 'teoria' ? 'text-[#D4AF37] bg-black/20' : 'text-white/80'}`}>Teoría</button>
        <button onClick={() => setActiveTab('flashcards')} className={`p-4 flex-1 text-center font-medium ${activeTab === 'flashcards' ? 'text-[#D4AF37] bg-black/20' : 'text-white/80'}`}>Flashcards</button>
        <button onClick={() => setActiveTab('quiz')} className={`p-4 flex-1 text-center font-medium ${activeTab === 'quiz' ? 'text-[#D4AF37] bg-black/20' : 'text-white/80'}`}>Simulador</button>
      </div>

      {/* CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'teoria' && <TeoriaView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'quiz' && <QuizView />}
      </main>
    </div>
  );
}

// --- TAB BUTTON COMPONENT ---
function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 px-5 py-2.5 rounded-sm transition-all duration-300 font-medium tracking-wide
        ${active ? 'bg-white text-[#A51C30] shadow-md' : 'text-white/90 hover:bg-black/10 hover:text-white'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- TEORIA VIEW ---
function TeoriaView() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const sections = [
    {
      title: "1. Arquitectura FODA (SWOT): Más allá de la dicotomía infantil",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            La mayoría enseñan el análisis FODA como un simple ejercicio de enumeración. En el entorno real corporativo (y en el MIT), el FODA es una arquitectura analítica rigurosa que exige someter las corazonadas gerenciales a la brutal realidad del mercado. Es un mapa heurístico que diferencia tajantemente el control endógeno de la tiranía exógena.
          </p>
          <ul className="list-none space-y-4 mt-6 ml-4">
            <li className="flex items-start"><CheckCircle className="text-[#A51C30] mt-1 mr-3 shrink-0" size={20}/> <span className="text-gray-800"><strong>Endógenos (Fortalezas y Debilidades):</strong> Factores bajo el control absoluto del C-Suite. Incluye recursos de capital, patentes exclusivas, rentas Ricardianas, y cultura organizacional. No se enumeran "cosas que hacemos bien", se listan competencias que los competidores simplemente no pueden replicar sin desangrarse financieramente.</span></li>
            <li className="flex items-start"><CheckCircle className="text-[#A51C30] mt-1 mr-3 shrink-0" size={20}/> <span className="text-gray-800"><strong>Exógenos (Oportunidades y Amenazas):</strong> Variables sobre las cuales la corporación tiene cero control. Cambios demográficos, PESTEL, shocks macroeconómicos y geopolíticos. Aquí no se "gestiona", se <em>anticipa</em> y se <em>reacciona</em>.</span></li>
          </ul>
        </>
      ),
      borderColor: "border-[#A51C30]"
    },
    {
      title: "2. Matriz de Evaluación de Factores Internos (EFI)",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            La Matriz EFI es la autopsia en vida de tu organización. Se encarga de auditar y cuantificar qué tan eficaces (o patéticos) son tus procesos frente a las demandas de tu industria. No se basa en ilusiones, se basa en benchmarking puro y doloroso.
          </p>
          <div className="bg-gray-50 p-6 border-l-4 border-[#A51C30] shadow-sm mb-6">
            <h4 className="text-xl font-bold mb-3 text-[#A51C30]">Metodología Cuantitativa de la EFI</h4>
            <p className="text-gray-600 mb-4">La asignación de valores no es democrática, es analítica.</p>
            <ul className="text-md text-gray-700 space-y-2 mb-4 list-disc pl-5">
              <li><strong>Pesos (0.0 a 1.0):</strong> Indican la importancia relativa del factor para tener éxito en la <em>industria</em>. La suma debe ser exactamente 1.0. Si asignas un peso al alzar, estás demostrando ignorancia sectorial.</li>
              <li><strong>Calificaciones (1 a 4):</strong> Indican cómo se desempeña la <em>empresa</em> en ese factor. (1: Gran Debilidad, 2: Debilidad Menor, 3: Fortaleza Menor, 4: Gran Fortaleza).</li>
              <li><strong>Puntaje Ponderado:</strong> El producto del Peso por la Calificación. Un puntaje total inferior a 2.5 indica que la empresa es débil internamente y probablemente esté sobrevalorada.</li>
            </ul>
          </div>
        </>
      ),
      borderColor: "border-[#A51C30]"
    },
    {
      title: "3. Matriz de Evaluación de Factores Externos (EFE)",
      content: (
         <>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Si la EFI audita el interior, la EFE cuantifica tu nivel de agilidad y vulnerabilidad ante factores que escapan de tu control operativo. Integra marcos pesados como PESTEL y las 5 Fuerzas de Porter.
          </p>
          <div className="bg-gray-50 p-6 border-l-4 border-gray-800 shadow-sm mb-6">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Aislando el Ruido del Entorno</h4>
            <p className="text-gray-600 mb-4">Identificar oportunidades y amenazas exige una visión macro de 10,000 pies de altura, y no dejarse llevar por modas pasajeras.</p>
            <ul className="text-md text-gray-700 space-y-2 mb-4 list-disc pl-5">
              <li><strong>Importancia de los Pesos:</strong> En la EFE, el impacto en la industria determina el peso. Un cambio de regulación gubernamental profunda tendrá un peso de 0.20, mientras que una fluctuación menor de la moneda local apenas 0.02.</li>
              <li><strong>Calificaciones (1 a 4):</strong> (1: Mala Respuesta, 2: Respuesta Promedio, 3: Superior, 4: Reacción Magistral). Refleja cómo la empresa absorbe un shock o capitaliza un vacío. Un 4 en Amenaza significa neutralización total; un 1 en Oportunidad significa incompetencia estratégica.</li>
            </ul>
          </div>
         </>
      ),
      borderColor: "border-gray-800"
    },
    {
      title: "4. Estrategias Cruzadas: Matriz FODA Dinámica",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Listar factores es inútil si no se entrelazan. De la combinación cartesiana de estos surgen estrategias operativas reales que los C-Levels usan para inyectar o retirar capital. ¿Vas a atacar o a sobrevivir?
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition">
              <strong className="text-[#A51C30] block mb-2 text-lg">Estrategia FO (Maxi-Maxi)</strong>
              <p className="text-gray-700 text-sm">El paraíso estratégico. Emplear fortalezas aplastantes para engullir ineficiencias del mercado u oportunidades nacientes (ej. Apple lanzando servicios en un mercado cautivo de hardware).</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition">
              <strong className="text-gray-800 block mb-2 text-lg">Estrategia DO (Mini-Maxi)</strong>
              <p className="text-gray-700 text-sm">Hay una oportunidad brillante, pero careces de competencias. Acción: Asociarte (Joint Venture), adquirir una startup, o endeudarte hiper-agresivamente para llenar el vacío productivo rápido.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition">
              <strong className="text-gray-800 block mb-2 text-lg">Estrategia FA (Maxi-Mini)</strong>
              <p className="text-gray-700 text-sm">El mercado se derrumba o un disruptor entra al escenario. Usas tu fortaleza masiva de flujo de caja libre para iniciar una guerra de precios o comprar al competidor antes de que crezca.</p>
            </div>
            <div className="p-5 bg-white border border-[#A51C30] rounded shadow-sm hover:shadow-md transition bg-red-50">
              <strong className="text-[#A51C30] block mb-2 text-lg">Estrategia DA (Mini-Mini)</strong>
              <p className="text-gray-700 text-sm">Posición defensiva de código rojo. Tus debilidades te hacen presa fácil ante amenazas directas. Acción: Reestructuración masiva, desinversiones, o prepararse fríamente para la liquidación concursal (Chapter 11).</p>
            </div>
          </div>
        </>
      ),
      borderColor: "border-[#A51C30]"
    },
    {
      title: "5. Paradigma V.R.I.O. (Ventaja Sostenible)",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Propuesto empíricamente por Jay Barney (1991), esta matriz audita si tus recursos en realidad justifican una ventaja a largo plazo o si son efímeros. Cualquier recurso debe ser interrogado implacablemente bajo estos cuatro preceptos:
          </p>
          <div className="relative overflow-hidden bg-[#111] text-white p-8 rounded-md shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={120}/></div>
            <ul className="space-y-6 relative z-10">
              <li><span className="text-[#D4AF37] font-bold text-xl block">V - VALIOSO (Value)</span> ¿Permite a la empresa explotar una oportunidad externa o neutralizar una amenaza? Si la respuesta es no, da lugar a una <em>Desventaja Competitiva</em>. Si es sí, debes seguir evaluando.</li>
              <li><span className="text-[#D4AF37] font-bold text-xl block">R - RARO (Rarity)</span> ¿Está el recurso altamente concentrado en tu empresa o está disponible para la mayoría? Si no es raro, produce <em>Paridad Competitiva</em>. Si es raro, pasas a la siguiente etapa.</li>
              <li><span className="text-[#D4AF37] font-bold text-xl block">I - INIMITABLE (Inimitability)</span> ¿Es prohibitivamente costoso para otros desarrollarlo? Se basa en: <br/><strong className="text-gray-300">Dependencia de Trayectoria (Path Dependence)</strong>: No se compran 50 años de I+D en un día. <br/><strong className="text-gray-300">Ambigüedad Causal</strong>: Nadie sabe exactamente <em>por qué</em> funciona tu corporación tan bien. <br/><strong className="text-gray-300">Complejidad Social</strong>: Ecosistemas de alta confianza.</li>
              <li><span className="text-[#D4AF37] font-bold text-xl block">O - ORGANIZACIÓN (Organization)</span> Tienes un activo VRI, asombroso. ¿Pero tiene tu empresa la estructura y políticas para exprimir su valor económico? Si cumples los cuatro, ostentas la <em>Ventaja Competitiva Sostenible</em>.</li>
            </ul>
          </div>
        </>
      ),
      borderColor: "border-[#D4AF37]"
    }
  ];

  const nextPage = () => {
    if (currentPage < sections.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const currentSection = sections[currentPage];

  const robotMessages = [
    "Ey! El FODA no es un juego de niños. ¡Analiza o muere!",
    "La EFI... donde descubres que tu empresa no es tan genial como creías.",
    "El mundo exterior es cruel. La EFE te lo demostrará con números.",
    "Si no cruzas las estrategias, mejor apaga la luz y vete. ¡El FODA cruzado es oro!",
    "V.R.I.O.: El filtro donde los 'recursos estrella' revelan si son pura basura."
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center relative overflow-hidden">
      
      {/* Robot Assistant */}
      <div className="fixed bottom-8 right-8 z-50 flex items-end animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div key={currentPage} className="bg-white border-2 border-gray-900 rounded-xl p-4 shadow-xl mr-4 max-w-xs animate-in zoom-in duration-300 relative">
          <p className="text-sm font-bold text-gray-800">{robotMessages[currentPage]}</p>
          <div className="absolute -right-2 bottom-6 w-4 h-4 bg-white border-b-2 border-r-2 border-gray-900 transform rotate-45"></div>
        </div>
        <div className="bg-[#A51C30] p-4 rounded-[2rem] shadow-2xl border-4 border-gray-900 animate-bounce hover:animate-none hover:rotate-12 transition-transform cursor-pointer">
          <Bot size={40} className="text-white" />
        </div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-[1400px] w-full mx-auto px-4 md:px-8 mb-8 border-b-2 border-gray-100 pb-6 shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-[#A51C30] mb-4 tracking-tighter">Estrategia y Organización Corporativa de Élite</h2>
        <p className="text-xl text-gray-500 italic font-medium flex items-center">
          <BookOpen className="mr-2 text-[#D4AF37]" size={24}/>
          Análisis exhaustivo, despiadado y corporativo. Navega por las secciones usando los botones.
        </p>
      </div>

      <div className="w-full max-w-[95%] 2xl:max-w-[1400px] px-4 md:px-8 pb-12">
        
        {/* Pagination Controls Top */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow-sm border border-gray-200">
           <button 
             onClick={prevPage} 
             disabled={currentPage === 0}
             className={`flex items-center space-x-2 px-4 py-2 font-bold uppercase tracking-wider rounded transition-colors ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#A51C30] hover:bg-gray-100'}`}
           >
             <ChevronLeft size={20}/> Anterior
           </button>
           <span className="font-mono text-gray-500 font-bold">
             {currentPage + 1} / {sections.length}
           </span>
           <button 
             onClick={nextPage}
             disabled={currentPage === sections.length - 1}
             className={`flex items-center space-x-2 px-4 py-2 font-bold uppercase tracking-wider rounded transition-colors ${currentPage === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#A51C30] hover:bg-gray-100'}`}
           >
             Siguiente <ChevronRight size={20}/>
           </button>
        </div>

        {/* Content Section */}
        <section 
          key={currentPage} // Forces re-render animation on page change
          className={`bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-8 ${currentSection.borderColor} text-justify w-full animate-in slide-in-from-right-8 duration-300`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-1 bg-[#D4AF37] mr-4 shrink-0"></div> 
            {currentSection.title}
          </h3>
          {currentSection.content}
        </section>

      </div>
    </div>
  );
}

// --- FLASHCARDS VIEW ---
function FlashcardsView() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  
  const [streak, setStreak] = useState(0);
  
  const [nextSuccessFb, setNextSuccessFb] = useState(() => getFeedbackData(true, 1));
  const [nextFailFb, setNextFailFb] = useState(() => getFeedbackData(false, 1));

  const [overlay, setOverlay] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success'|'fail'|null, text: string, emoji: string, meme: string}>({type: null, text: '', emoji: '', meme: ''});

  const sndSuccess = useRef<HTMLAudioElement | null>(null);
  const sndFail = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    sndSuccess.current = new Audio('https://www.myinstants.com/media/sounds/ding-sound-effect_2.mp3');
    sndFail.current = new Audio('https://www.myinstants.com/media/sounds/wrong-buzzer.mp3');
  }, []);

  // Preload the current card's memes so they appear instantly
  useEffect(() => {
    if (nextSuccessFb.meme) {
      const img1 = new Image();
      img1.src = nextSuccessFb.meme;
    }
    if (nextFailFb.meme) {
      const img2 = new Image();
      img2.src = nextFailFb.meme;
    }
  }, [nextSuccessFb, nextFailFb]);

  const handleAssessment = (success: boolean) => {
    if(overlay) return;
    
    const fb = success ? nextSuccessFb : nextFailFb;
    setFeedback({ type: success ? 'success' : 'fail', text: fb.text, emoji: fb.emoji, meme: fb.meme });
    setOverlay(true);

    const newStreak = success 
      ? (streak > 0 ? streak + 1 : 1)
      : (streak < 0 ? streak - 1 : -1);
    
    setStreak(newStreak);
    
    // Prepare next feedback based on what the potential next streak would be
    const potentialNextSuccessStreak = newStreak > 0 ? newStreak + 1 : 1;
    const potentialNextFailStreak = newStreak < 0 ? Math.abs(newStreak - 1) : 1;
    
    setNextSuccessFb(getFeedbackData(true, potentialNextSuccessStreak));
    setNextFailFb(getFeedbackData(false, potentialNextFailStreak));

    if(success) {
      if(sndSuccess.current) {
        sndSuccess.current.currentTime = 0;
        sndSuccess.current.play().catch(()=>{});
      }
    } else {
      if(sndFail.current) {
        sndFail.current.currentTime = 0;
        sndFail.current.play().catch(()=>{});
      }
    }

    setTimeout(() => {
      setOverlay(false);
      setFlipped(false);
      setTimeout(() => setIdx((p) => (p + 1) % FLASHCARDS.length), 150);
    }, 4500);
  }

  const current = FLASHCARDS[idx];
  let badgeColor = "bg-gray-200 text-gray-700";
  if(current.lvl === "Avanzado") badgeColor = "bg-blue-100 text-blue-800";
  if(current.lvl === "Harvard") badgeColor = "bg-[#A51C30] text-[#D4AF37] shadow-xl";

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 relative">
      
      {overlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200 h-[100%] md:h-[600px]">
           <div className={`absolute inset-0 bg-white/95 backdrop-blur-md rounded-xl ${feedback.type==='success' ? 'border-4 border-green-500' : 'border-4 border-[#A51C30]'}`}></div>
           
           <div className="relative z-10 flex flex-col items-center text-center scale-in-center">
             {feedback.meme ? (
                 <img src={feedback.meme} alt="Profesor Sarcástico" referrerPolicy="no-referrer" className="max-h-56 md:max-h-72 object-contain rounded shadow-2xl mb-6 border-[6px] border-white transform rotate-2 hover:rotate-0 transition-transform" />
             ) : (
                 <div className="text-9xl mb-6 drop-shadow-2xl animate-bounce">{feedback.emoji}</div>
             )}
             <div className="text-2xl md:text-3xl font-black max-w-xl text-gray-900 tracking-tight leading-tight bg-white p-6 rounded shadow-2xl border border-gray-200 mt-2">
               "{feedback.text}"
             </div>
             {feedback.type === 'fail' && <div className="mt-8 text-black opacity-30 animate-pulse"><XCircle size={64}/></div>}
           </div>
        </div>
      )}

      <div className="w-full flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#A51C30] pb-2">Sistema de Memoria Activa</h2>
        <div className="text-lg font-bold text-gray-400">
          <span className="text-[#A51C30] text-2xl">{idx + 1}</span> / {FLASHCARDS.length}
        </div>
      </div>

      <div className={`w-full aspect-[4/3] md:aspect-[2/1] relative perspective-[1500px] ${overlay ? 'opacity-0 pointer-events-none' : ''}`}>
        <div className={`w-full h-full absolute transition-all duration-700 transform-style-preserve-3d shadow-2xl rounded-xl ${flipped ? 'rotate-y-180' : ''}`}>
          
          {/* FRONT */}
          <div className="absolute w-full h-full backface-hidden bg-white border border-gray-200 rounded-xl p-8 md:p-12 flex flex-col justify-center items-center text-center cursor-pointer" onClick={() => setFlipped(true)}>
             <span className={`absolute top-6 left-6 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${badgeColor}`}>
                Nivel: {current.lvl}
             </span>
             <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mt-4">
               {current.q}
             </h3>
             <div className="absolute bottom-6 flex items-center text-[#A51C30] text-sm font-bold animate-pulse uppercase tracking-widest border border-[#A51C30] px-4 py-2 rounded-full">
                <RotateCw size={16} className="mr-2"/> Revelar
             </div>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full backface-hidden bg-[#1a1a1a] border-2 border-[#A51C30] rounded-xl p-8 md:p-12 flex flex-col justify-between items-center text-center rotate-y-180">
            <span className="absolute top-6 right-6 text-[#D4AF37]"><Award size={24}/></span>
            
            <div className="flex-1 flex items-center justify-center w-full mt-4">
              <p className="text-xl md:text-2xl text-white font-serif leading-relaxed italic border-l-4 border-[#A51C30] pl-6 py-2 text-left w-full">
                "{current.a}"
              </p>
            </div>

            <div className="w-full flex space-x-4 mt-6">
              <button onClick={(e) => { e.stopPropagation(); handleAssessment(false); }} className="flex-1 py-3 bg-red-900/40 hover:bg-red-800 text-red-200 font-bold tracking-widest rounded transition-colors border border-red-800 flex justify-center items-center">
                <XCircle className="mr-2 hidden md:block"/> IGNORANCIA
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleAssessment(true); }} className="flex-1 py-3 bg-green-900/40 hover:bg-green-800 text-green-200 font-bold tracking-widest rounded transition-colors border border-green-800 flex justify-center items-center">
                <CheckCircle className="mr-2 hidden md:block"/> DOMINIO
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-8 text-center max-w-md">
        Evalúate con honestidad académica brutal. Un falso positivo arruina empíricamente tu curva de retención.
      </p>
    </div>
  );
}

// --- QUIZ VIEW (SIMULADOR MIT) ---
function QuizView() {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleAnswer = (optIndex: number) => {
    if(selectedOpt !== null) return;
    
    setSelectedOpt(optIndex);
    const correct = QUIZ_QUESTIONS[qIdx].a === optIndex;
    
    if(correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelectedOpt(null);
      if(qIdx < QUIZ_QUESTIONS.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        setFinished(true);
      }
    }, 1500); 
  };

  const restart = () => {
    setQIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setFinished(false);
  };

  if(finished) {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    return (
      <div className="max-w-2xl mx-auto bg-white p-12 text-center rounded-sm shadow-2xl border-t-8 border-[#A51C30] animate-in fade-in zoom-in">
        <h2 className="text-4xl font-black text-gray-900 mb-6">Evaluación Concluida</h2>
        <div className="text-7xl font-bold mb-6 text-[#A51C30]">
          {score} <span className="text-3xl text-gray-400">/ {QUIZ_QUESTIONS.length}</span>
        </div>
        <p className="text-xl font-medium text-gray-700 italic border-y py-4 mb-8 bg-gray-50">
          {percentage === 100 ? "Dominio estratégico absoluto. Te graduaste con honores del MIT." :
           percentage >= 80 ? "Aceptable defensa de caso. Entiendes las métricas del entorno corporativo." :
           percentage >= 50 ? "Mediocridad pura. La curva de campana existe gracias a ti." :
           "Competencia nula. Cierra esta ventana y reconsidera tus decisiones de vida."}
        </p>
        <button onClick={restart} className="px-8 py-4 bg-[#A51C30] text-white font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm">
          Retomar Simulacro
        </button>
      </div>
    );
  }

  const currentQ = QUIZ_QUESTIONS[qIdx];

  return (
    <div className="max-w-4xl mx-auto relative animate-in fade-in duration-500">
      <div className="bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col">
        <div className="bg-[#111] text-white p-8 md:p-10 flex border-b-4 border-[#A51C30]">
          <div className="text-5xl md:text-7xl font-black text-[#D4AF37] opacity-80 mr-6 md:mr-8 font-mono">
             {(qIdx+1).toString().padStart(2,'0')}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Problema Analítico • Cero Memorización</span>
            <h3 className="text-xl md:text-3xl font-serif font-medium leading-snug">
              {currentQ.q}
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-gray-50 flex flex-col space-y-4">
          {currentQ.options.map((opt, i) => {
            let btnStateClasses = "bg-white border-gray-200 hover:border-[#A51C30] hover:shadow-lg focus:ring-[#A51C30]";
            let textClasses = "text-gray-800 group-hover:text-black";
            let indicatorClasses = "bg-gray-100 text-gray-500 group-hover:bg-[#A51C30] group-hover:text-white";

            if (selectedOpt !== null) {
              if (i === currentQ.a) {
                btnStateClasses = "bg-green-50 border-green-500 shadow-md";
                textClasses = "text-green-900";
                indicatorClasses = "bg-green-500 text-white";
              } else if (i === selectedOpt) {
                btnStateClasses = "bg-red-50 border-red-500 shadow-md";
                textClasses = "text-red-900";
                indicatorClasses = "bg-red-500 text-white";
              } else {
                btnStateClasses = "bg-gray-50 border-gray-100 opacity-50";
              }
            }

            return (
              <button 
                key={i}
                disabled={selectedOpt !== null}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-6 border rounded-sm transition-all group flex items-start ${btnStateClasses}`}
              >
                <div className={`w-8 h-8 rounded shrink-0 font-bold flex items-center justify-center mr-4 transition-colors ${indicatorClasses}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={`text-lg font-medium leading-relaxed ${textClasses}`}>
                  {opt}
                </span>
                {selectedOpt !== null && i === currentQ.a && (
                  <CheckCircle className="ml-auto text-green-500 shrink-0" size={24} />
                )}
                {selectedOpt === i && i !== currentQ.a && (
                  <XCircle className="ml-auto text-red-500 shrink-0" size={24} />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="bg-gray-200 h-2 w-full">
           <div className="bg-[#A51C30] h-full transition-all duration-500" style={{ width: `${(qIdx / QUIZ_QUESTIONS.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}

// Global Custom CSS injections (for transform style)
const style = document.createElement('style');
style.innerHTML = `
.perspective-[1500px] { perspective: 1500px; }
.transform-style-preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
.scale-in-center { animation: scale-in-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
@keyframes scale-in-center {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.custom-scrollbars::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbars::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.custom-scrollbars::-webkit-scrollbar-thumb {
  background: #A51C30;
  border-radius: 4px;
}
.custom-scrollbars::-webkit-scrollbar-thumb:hover {
  background: #8B1828;
}
`;
document.head.appendChild(style);
