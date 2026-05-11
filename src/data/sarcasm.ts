export function formatMeme(template: string, top: string, bottom: string) {
  const clean = (s: string) => {
    if (!s) return '_';
    return s.replace(/-/g, '--').replace(/_/g, '__').replace(/\s+/g, '_')
            .replace(/\?/g, '~q').replace(/&/g, '~a').replace(/%/g, '~p')
            .replace(/#/g, '~h').replace(/\//g, '~s').replace(/\\/g, '~b')
            .replace(/'/g, "''").replace(/"/g, "''");
  };
  return `https://api.memegen.link/images/${template}/${clean(top)}/${clean(bottom)}.jpg`;
}

export const EMOJIS = {
  success: ["👑", "🏆", "📈", "🥂", "💸", "💅", "😎", "🤑", "🧐", "🌟"],
  fail: ["🤡", "🗑️", "💀", "📉", "🐌", "🙈", "🤦", "🚨", "🔥", "🚑"]
};

// --- FRASES MUY SARCÁSTICAS Y CRUELES ---
const SUCCESS_TEXTS = [
  "¡Oh, su majestad! Ha iluminado esta oficina con su infinita e incomprensible sabiduría.",
  "¡Un genio incomprendido! Elon Musk y Warren Buffett tiemblan ante tu intelecto supremo.",
  "Obviamente, el mérito es tuyo y no de la probabilidad estadística elemental.",
  "Definitivamente eres el próximo mesías corporativo. Lástima que tu salario no lo refleje.",
  "¡Deslumbrante! Sigue así y en 40 años te ascenderán a subgerente regional adjunto.",
  "Debe ser sumamente agotador cargar con tanto peso intelectual en una sola cabeza.",
  "Esa respuesta fue tan brillante que casi olvidamos tus 500 errores catastróficos de ayer.",
  "Impresionante. Voy a proponer que te hagan una estatua de bronce en el baño de empleados.",
  "Acertaste. Seguramente los astros se alinearon, porque sabemos que la lógica no es tu fuerte.",
  "Increíble muestra de brillantez. ¿Lo consultaste con tu chamán o fue simple suerte?",
  "¡Prodigioso! Ni siquiera un chimpancé entrenado lo hubiera hecho mejor... bueno, tal vez igual.",
  "Magno evento: Tu neurona solitaria finalmente encontró a un electrón rebotando.",
  "Eres un erudito, un titán de las finanzas, un... ah, perdón, leí el currículum del becario.",
  "Me quito el sombrero. Tu capacidad de pulsar el botón correcto al azar es legendaria.",
  "Fabuloso. Tu mediocridad acaba de tomarse un descanso de exactamente cinco segundos.",
  "Nivel Dios financiero desbloqueado. Por favor, no nos ciegues con tu aura empresarial.",
  "Hoy los libros de historia económica escriben tu nombre. En la nota al pie, obviamente.",
  "Wow. Tanta majestuosidad intelectual no debería estar atrapada en tu diminuto cubículo gris.",
  "Excelente. Si diéramos premios al 'Desempeño Menos Decepcionante', arrasarías por completo.",
  "Has destrozado el paradigma. Tu visión es más grande que tu ego. Y eso es decir mucho.",
  "Clap, clap. Lloraría de emoción si tu acierto no fuera estadísticamente inevitable a la larga.",
  "Por fin justificas las exorbitantes cantidades de oxígeno y café de especialidad que consumes.",
  "Alteza serenísima del Management, bendíganos con otra de sus obvias y gloriosas sentencias.",
  "Espléndido. Wall Street te espera ansioso para que les enseñes cómo amarrarse los zapatos.",
  "Bravo. Esta fugaz brillantez compensará años de absoluta intrascendencia tuya en la plantilla.",
  "Un ser de luz gerencial. ¿Pensaste en vender tus corbatas sudadas como sagradas reliquias?",
  "Magnífico. Acabas de ganarte el privilegio de un sonoro pero muy sarcástico aplauso lento.",
  "¡Glorioso, titán analítico! Alguien grabe esto para probar a Recursos Humanos que sí trabajas.",
  "Exquisito dominio operativo. Eres como Sócrates, claro, pero con muchísima menos higiene.",
  "Impecable. Tu inmenso cerebro acaba de resolver el acertijo diseñado para pre-escolares.",
  "Acierto monumental de proporciones bíblicas. Mañana te daremos una pequeña galletita.",
  "El Olimpo llora de envidia ante tu colosal talento para seleccionar la respuesta marcada.",
  "Eminencia, ¿desea usted que mande a alfombrar con pétalos de rosa su camino a la fotocopiadora?",
  "Sobresaliente decisión. Por dos segundos tu incompetencia general pasó totalmente desapercibida.",
  "¡Rotundo éxito! Una inmensa lástima que absolutamente nadie importante te esté mirando.",
  "Señores y señoras, se ha producido un innegable milagro cósmico: nuestro muchacho pensó.",
  "La mesa directiva está aplaudiendo. Ahora, si tan solo pudieras usar Excel sin ponerte a llorar...",
  "Fenomenal. Esto nutre tu triste legado cimentando que a veces haces cosas mediocres pero aceptables.",
  "Absurdamente e irracionalmente genial. ¿Quién diría que apretar botones a ciegas daría algún fruto?",
  "Alabado seas, faro incandescente de sabiduría salvadora de nuestra humilde e irrelevante organización.",
  "Tus reflejos corporativos son oro puro. Has adivinado la opción que estaba prácticamente subrayada.",
  "Maravilla gerencial. Te mereces descansar el resto de la jornada jugando al Buscaminas en Windows.",
  "Deslumbraste al comité. Estaban esperando un error épico, y los decepcionaste gratamente.",
  "Tu capital estratégico está por los cielos. Eres el Warren Buffett de las respuestas inútiles.",
  "Acertado con pasmosa exactitud. Un verdadero Einstein moderno disfrazado de analista junior.",
  "Épica maniobra de razonamiento. Seguramente te estrujaste el cerebro pensando casi por un milisegundo.",
  "Genio. Rey de reyes. Emperador de la estrategia de PowerPoint de cinco diapositivas con transiciones.",
  "Vuestra excelencia estratega nos ha bendecido con su respuesta absurdamente lógica y esperable.",
  "Es majestuoso atestiguar lo cerca que estuviste de fallar, pero mágicamente no lo hiciste.",
  "Felicidades, supremo líder del Management. Tu bono este año será una taza que dice 'Buen Esfuerzo'."
];

const FAILS_TEXTS = [
  "Tu error duele físicamente. Mejor ni hablar.",
  "Hasta mi abuela lo habría hecho mejor a ciegas.",
  "Ni con ayuda divina podrías salvar esto.",
  "¿En serio esa fue tu mejor decisión?",
  "Felicidades, lograste un nivel de fracaso histórico.",
  "Esa respuesta es un pasaje directo al desempleo.",
  "Acabas de quebrar la empresa con un clic.",
  "La ignorancia es atrevida, y tú eres su rey.",
  "Mejor dedícate a otra cosa. Esto no es lo tuyo.",
  "Si la estupidez fuera dinero, serías millonario.",
  "Un chimpancé con un dardo tiene mejor puntería.",
  "Increíble. Tu cerebro solicitó vacaciones hoy.",
  "¿Acaso elegiste la peor opción a propósito?",
  "Esa decisión tiene aroma a miseria corporativa.",
  "Por favor, no toques nada más. Todo lo rompes.",
  "¿Leíste la pregunta o solo apretaste botones?",
  "Mi termómetro de vergüenza ajena acaba de explotar.",
  "Un milagro macabro: te equivocaste en lo más obvio.",
  "Tu capacidad de arruinarlo todo es asombrosa.",
  "Si respiro profundo, tal vez olvide tu respuesta.",
  "Recursos humanos ya imprimió tu carta de despido.",
  "Definitivamente, pensar no es una de tus fortalezas.",
  "Vuelve al jardín de niños, ahí encajas perfecto.",
  "Acabas de hundir el barco y ni el chaleco te pusiste.",
  "Esa táctica suicida ni siquiera tiene sentido.",
  "Eres el rey del desastre empresarial.",
  "Increíble que alguien pueda fallar con tanta confianza.",
  "Tus decisiones asustan a la lógica y la razón matemática.",
  "Dime que fue una broma. Por favor, dime que sí.",
  "Un error majestuoso. Serás leyenda por las razones equivocadas.",
  "Tu respuesta me ofende visual y mentalmente.",
  "Acabas de recibir un doctorado en tomar pésimas decisiones.",
  "A veces dudo de tu capacidad para encender la computadora.",
  "Impresionante. Elegiste la ruta más rápida al desastre.",
  "Por desgracia, tus neuronas no colaboraron hoy.",
  "Tu lógica es un misterio que no quiero resolver.",
  "Sigue así y serás el ejemplo perfecto de qué no hacer.",
  "Basta, ya sufrimos suficiente con tu ignorancia.",
  "Es oficial: tu cerebro no tiene conexión a internet.",
  "Un error tan obvio que hasta mi perro lloró al verlo.",
  "Si hubiera un premio al error más absurdo, es tuyo.",
  "Ni sumando todos tus aciertos arreglas esta falla.",
  "Has convertido una mala jugada en un arte.",
  "Ese nivel de horror no se arregla ni con magia.",
  "Es como ver un coche chocar en cámara lenta.",
  "Fallo garrafal. Acabas de asegurar el último lugar.",
  "Tu incompetencia es un problema sin solución aparente.",
  "¿Hiciste esto con los ojos vendados?",
  "Esa fue la respuesta equivocada, y tú lo sabes.",
  "Un fracaso tan grande que se verá desde la luna."
];

// --- IMÁGENES Y GIFS SIN TEXTOS GENERADOS ---

// Using mostly memegen templates without text added by passing _ and _ to the URL.
const SUCCESS_TEMPLATES = [
  "awesome", "awesome-awkward", "because", "both", "cake", 
  "cheems", "chosen", "drake", "elf", "feelsgood", 
  "firsttry", "friends", "fry", "gears", "genie", 
  "ggg", "happening", "hipster", "home", "icanhas", 
  "inigo", "interesting", "keanu", "kermit", "leo", 
  "live", "made", "michael-scott", "money", "nice", 
  "perfection", "philosoraptor", "reveal", "right", "rollsafe", 
  "saltbae", "soa", "sohappy", "sohot", "stonks", 
  "success", "wonka", "xy", "yodawg", "yuno", 
  "astronaut", "bd", "biw", "box", "cmm"
];
const FAIL_TEMPLATES = [
  "aag", "ackbar", "afraid", "agnes", "awkward", 
  "bad", "badchoice", "blb", "boat", "bs", 
  "buzz", "captain", "captain-america", "crazypills", "crowd", 
  "cryingfloor", "db", "dbg", "dg", "disastergirl", 
  "doge", "drowning", "drunk", "ds", "dsm", 
  "dwight", "facepalm", "fwp", "gandalf", "grave", 
  "gru", "grumpycat", "hagrid", "headaches", "imsorry", 
  "ive", "iw", "jd", "joker", "kramer", 
  "midwit", "mordor", "morpheus", "noidea", "ntot", 
  "oag", "officespace", "panik-kalm-panik", "patrick", "pigeon"
];

// URLs to GIFs or static generic memes
const GIFS_SUCCESS = [
  "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif",
  "https://media.giphy.com/media/fsQbx1hX7hPBBpIM5b/giphy.gif",
  "https://media.giphy.com/media/xNBcChLQt7s9a/giphy.gif",
  "https://media.giphy.com/media/nXXU1DVGVAD60/giphy.gif",
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
  "https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif",
  "https://media.giphy.com/media/2FazqiOUDh3A5i1QA/giphy.gif",
  "https://media.giphy.com/media/YRuFixSNWFVcXhqnO3/giphy.gif",
  "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif",
  "https://media.giphy.com/media/3oz8xAFtjouK9vj81G/giphy.gif",
  "https://media.giphy.com/media/10uEX5kfeodYgo/giphy.gif"
];

const GIFS_FAIL = [
  "https://media.giphy.com/media/14aUO0O8J1ebzG/giphy.gif",
  "https://media.giphy.com/media/O1oJ840fg6uOIXq88P/giphy.gif",
  "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif",
  "https://media.giphy.com/media/xT5LMzIK1aCGAL2yZW/giphy.gif",
  "https://media.giphy.com/media/WpaVhEcp3Qo2TjwyI1/giphy.gif",
  "https://media.giphy.com/media/VbYj3EzX82b1D2gE2I/giphy.gif",
  "https://media.giphy.com/media/11ahZZugQ04Ufe/giphy.gif",
  "https://media.giphy.com/media/3o7TKr3nzbh5WgCFxe/giphy.gif",
  "https://media.giphy.com/media/qQdfjcb90HjUY/giphy.gif",
  "https://media.giphy.com/media/aBfSNG5C0EfGW/giphy.gif",
  "https://media.giphy.com/media/LyJ6KPlrFdKnK/giphy.gif",
  "https://media.giphy.com/media/PHeIue5jYtd4s/giphy.gif"
];

function buildNoTextPhraseObj(texts: string[], templates: string[], gifs: string[]) {
  return texts.map((phrase, i) => {
    // Intercalar entre Gifs y templates de memegen
    const isGif = i % 2 === 0;
    
    let memeUrl = "";
    if (isGif) {
      memeUrl = gifs[Math.floor(i / 2) % gifs.length];
    } else {
      const template = templates[Math.floor(i / 2) % templates.length];
      // Format "_/_" in memegen link returns the image without any text on top/bottom
      memeUrl = `https://api.memegen.link/images/${template}/_/_.jpg`;
    }
    
    return {
      text: phrase,
      meme: memeUrl
    };
  });
}

export const SARCASM_SUCCESS = buildNoTextPhraseObj(SUCCESS_TEXTS, SUCCESS_TEMPLATES, GIFS_SUCCESS);
export const SARCASM_FAIL = buildNoTextPhraseObj(FAILS_TEXTS, FAIL_TEMPLATES, GIFS_FAIL);

export function getFeedbackData(success: boolean, streak: number) {
  const list = success ? SARCASM_SUCCESS : SARCASM_FAIL;
  
  let min = 0;
  let max = 16;
  if (streak === 2) {
    min = 17;
    max = 33;
  } else if (streak >= 3) {
    min = 34;
    max = 49;
  }
  
  const randIdx = Math.floor(Math.random() * (max - min + 1)) + min;
  const obj = list[randIdx];
  
  const emoArr = success ? EMOJIS.success : EMOJIS.fail;
  const rEmo = emoArr[Math.floor(Math.random() * emoArr.length)];
  
  return { ...obj, emoji: rEmo };
}
