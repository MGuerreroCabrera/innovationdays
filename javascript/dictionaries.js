/**
 * Innovation Days 2026 — Diccionarios de traducción.
 *
 * Exposed as a global (not an ES module) so the page keeps working when it is
 * opened directly from the file system, without a web server.
 *
 * Key contract:
 *   - The HTML ships the Catalan copy inline (indexable + usable without JS).
 *   - This file holds BOTH languages so the UI can be switched at runtime.
 *   - `data-i18n="key"`              -> textContent
 *   - `data-i18n-html="key"`         -> innerHTML (copy with inline markup)
 *   - `data-i18n-attrs="attr:key;…"` -> any attribute (aria-label, title, …)
 *
 * Both dictionaries MUST expose the exact same key set. `main.js` ships a
 * runtime check that reports missing keys in the console.
 */
window.InnovationDaysI18n = {
  ca: {
    'meta.title': 'Innovation Days 2026 — Fundació BIT',
    'meta.description':
      'Dues jornades per descobrir oportunitats, compartir coneixement i connectar l’ecosistema empresarial i tecnològic de les Illes Balears. 3 i 4 de desembre de 2026 al ParcBIT.',

    'a11y.skip': 'Saltar al contingut principal',
    'a11y.openMenu': 'Obre el menú de navegació',
    'a11y.closeMenu': 'Tanca el menú de navegació',
    'a11y.toTop': 'Torna amunt',
    'a11y.brand': 'Fundació BIT — Balears Innovation TechHub',
    'a11y.lang': 'Idioma',
    'a11y.langCa': 'Cambiar a catalán',
    'a11y.langEs': 'Cambiar a castellano',

    'nav.label': 'Navegació principal',
    'nav.mobileLabel': 'Navegació mòbil',
    'nav.whatIs': 'Què són?',
    'nav.program': 'Programa',

    'lang.cat': 'Català',
    'lang.cast': 'Castellano',

    'hero.eyebrow': '3 i 4 de desembre de 2026 · Auditori ParcBIT, Palma',
    'hero.ctaAssistant': 'Inscriu-te com a assistent',
    'hero.ctaForum': 'Necessites finançament? Apunta’t al fòrum',

    'about.eyebrow': 'El punt de trobada de la innovació balear',
    'about.title': 'Dues jornades per connectar l’ecosistema innovador de les Illes Balears',
    'about.p1':
      'Els <strong>Innovation Days</strong> són la cita de referència de la innovació de les Illes Balears. Dues jornades organitzades al ParcBit que posen en contacte el teixit empresarial i tecnològic de l’arxipèlag amb l’Administració pública, les institucions financeres i els inversors que hi aposten per fer créixer els projectes innovadors.',
    'about.p2':
      'L’edició 2026 respon a una pregunta que es repeteix cada any: <strong>quines portes cal tocar, quin camí seguir i qui és qui</strong> en el món de la innovació? El programa articula la resposta en dos eixos: els instruments que permeten transformar una idea en un projecte viable, i l’accés al capital per fer-lo créixer.',
    'about.p3':
      'L’organització correspon al <strong>Govern de les Illes Balears</strong>, a través de la <strong>Fundació Balear d’Innovació i Tecnologia</strong>, que gestiona el ParcBit, el CentreBit Menorca i el CentreBit Eivissa, i l’<strong>Agència de Desenvolupament Regional de les Illes Balears (ADRBalears)</strong>. La Fundació BIT és una entitat pública sense ànim de lucre dependent del Govern: executa les estratègies d’R+D+I, dona suport a les empreses i inversors de base tecnològica en totes les fases del seu cicle de vida i promou la participació del teixit empresarial en convocatories de finançament autonòmiques, nacionals i europees.',
    'about.orgTitle': 'Organitzen l’edició 2026',
    'about.org1': 'Govern de les Illes Balears',
    'about.org1Desc':
      'A través de la Direcció General d’Innovació i Transformació Digital, la Fundació Balear d’Innovació i Tecnologia, que gestiona el ParcBit, el CentreBit Menorca i el CentreBit Eivissa, i amb l’Agència de Desenvolupament Regional de les Illes Balears (ADRBalears).',
    'about.org3': 'Keiretsu Forum',
    'about.org3Desc': 'Xarxa internacional d’inversors privats.',
    'about.link': 'Més informació sobre la Fundació BIT',
    'about.linkAdr': 'Més informació sobre la ADRBalears',

    'overview.eyebrow': 'Innovació, talent i inversió',
    'overview.title': 'Descobreix quines portes cal tocar, quin camí seguir i qui és qui en el món de la innovació',
    'overview.lead':
      'Dues jornades per descobrir oportunitats, compartir coneixement i connectar l’ecosistema empresarial i tecnològic de les Illes Balears.',
    'overview.p1':
      'El dijous 3 de desembre, la jornada se centra a <strong>Innovar a les Illes Balears</strong>: el balanç de les actuacions 2023–2026 i les oportunitats per al teixit empresarial. Hi intervenen els responsables de la RIS3 i dels principals instruments de suport —Turboconvo, CDTI i la Unitat Acceleradora de Projectes Estratègics—, els hubs d’innovació del ParcBit i els CentresBit, i casos d’èxit d’empreses de l’ecosistema que expliquen què significa innovar en primera persona.',
    'overview.p2':
      'El divendres 4 de desembre, la jornada gira entorn de <strong>De la idea a la inversió</strong>. La Conferència i Fòrum <strong>PALMA TECH’26</strong> connecta les empreses emergents de les Illes Balears amb inversors, les empreses emergents en acció presenten davant un panell qualificat i s’obre el micròfon per als inversors. La jornada es clou amb una taula rodona sobre criteris d’inversió i les claus per finançar i fer créixer una empresa emergent.',
    'overview.p3':
      'Entre les dues sessions hi ha temps per al networking: pauses cafè, espais de contacte i finger food al final de cada dia. Els Innovation Days són, en definitiva, l’espai on el talent troba capital, les pimes troben instruments i l’ecosistema es coneix de primera mà.',

    'stats.days': 'jornades',
    'stats.sessions': 'sessions',
    'stats.speakers': 'ponents',
    'stats.forum': 'fòrum d’inversió',

    'cta.title': 'No oblidis inscriure-t’hi!',
    'cta.lead':
      'Escull com vulguis participar als Innovation Days 2026: com a assistent o al Fòrum d’inversió PALMA TECH’26.',

    'footer.organizer': 'Organitzador',
    'footer.coorganizers': 'Co-organitzadors',

    'program.eyebrow': 'Agenda',
    'program.title': 'Programa',
    'program.intro':
      'Dos dies, disset sessions i una agenda construïda al voltant de dos objectius: coneixement pràctic i contacte directe.',
    'program.tablist': 'Programa per dies',
    'program.tab1Day': 'Dijous 3',
    'program.tab1Date': '3 de desembre',
    'program.tab2Day': 'Divendres 4',
    'program.tab2Date': '4 de desembre',
    'program.d1Subtitle':
      'Innovar a les Illes Balears: de les idees a les oportunitats de negoci. Balanç d’actuacions 2023–2026 i oportunitats per al teixit empresarial.',
    'program.d2Subtitle':
      'De la idea a la inversió: connectant talent, innovació i capital. Una jornada per descobrir oportunitats, donar visibilitat a empreses emergents i connectar projectes innovadors amb l’ecosistema inversor.',
    'program.type.logistics': 'Organització',
    'program.type.ceremony': 'Acte institucional',
    'program.type.principal': 'Obertura',
    'program.type.instrument': 'Instruments',
    'program.type.informative': 'Sessió informativa',
    'program.type.talk': 'Ponència',
    'program.type.break': 'Networking',
    'program.type.forum': 'Fòrum d’inversió',
    'program.type.pitch': 'Pitches',
    'program.type.roundtable': 'Taula rodona',
    'program.type.openmic': 'Obert al micròfon',
    'program.type.closing': 'Cloenda',

    'program.d1s01.title': 'Inscripcions',
    'program.d1s02.title':
      'Obertura institucional: la innovació com a instrument de competitivitat i diversificació econòmica de les Illes Balears',
    'program.d1s02.speaker': 'Antoni Costa',
    'program.d1s02.role': 'Vicepresident primer del Govern de les Illes Balears',
    'program.d1s03.title': 'Passat, present i futur de la innovació de les Illes Balears',
    'program.d1s03.desc':
      'Prioritats d’innovació i principals instruments desenvolupats durant 2023–2026. Una estratègia per transformar idees en projectes.',
    'program.d1s03.speaker': 'Sebastián González',
    'program.d1s03.role': 'Director general d’Innovació i Transformació Digital',
    'program.d1s04.title':
      'Turboconvo: ajuts per a impulsar la innovació i la digitalització de les petites i mitjanes empreses de les Illes Balears',
    'program.d1s04.desc': 'Resultats i previsions.',
    'program.d1s04.speaker': 'Josué Díaz',
    'program.d1s04.role': 'Cap de servei d’innovació del Govern de les Illes Balears',
    'program.d1s05.title': 'Instruments a la innovació del CDTI',
    'program.d1s05.speaker': 'Pilar González',
    'program.d1s05.role':
      'Cap de departament de Promoció institucional i cooperació territorial del CDTI',
    'program.d1s06.title': 'Pausa per al cafè i treball en xarxa',
    'program.d1s06.desc':
      'Espai de contacte entre empreses, institucions i agents de l’ecosistema.',
    'program.d1s07.title': 'La innovació en primera persona',
    'program.d1s07.desc':
      'Casos d’èxit d’empreses de l’ecosistema de les Illes Balears. Empreses: ADEMA, Atalaia, etc.',
    'program.d1s07.speaker': 'Modera: Xavier Nadal',
    'program.d1s07.role':
      'Cap de departament de projectes estratègics del Govern de les Illes Balears',
    'program.d1s08.title': 'La teva pròxima oportunitat per innovar',
    'program.d1s08.desc':
      'Instruments disponibles (Oficina Innobal), futures convocatòries, cooperació europea i vies d’accés als serveis.',
    'program.d1s08.speaker': 'Immaculada Salamanca',
    'program.d1s08.role': 'Cap d’àrea de RDi i Comunicació de la Fundació Bit',
    'program.d1s09.title': 'Unitat Acceleradora de Projectes Estratègics (UAPE)',
    'program.d1s09.desc': 'Eines de suport i experiència pràctica.',
    'program.d1s09.speaker': 'Bárbara Barceló',
    'program.d1s09.role':
      'Directora General de Projectes Estratègics, Fons Europeus i Simplificació Administrativa',
    'program.d1s10.title': 'Connectar talent, empreses i coneixement',
    'program.d1s10.desc':
      'Estratègia per als focus d’innovació de les Illes Balears: ParcBit i centres Bit.',
    'program.d1s10.speaker': 'Dani Juan',
    'program.d1s10.role': 'Delegat territorial a Eivissa de la Fundació Bit',
    'program.d1s11.title': 'Entrega de reconeixements',
    'program.d1s12.title': 'Conclusions i cloenda',
    'program.d1s12.desc':
      'Síntesi dels instruments presentats i indicacions pràctiques perquè les empreses identifiquin el seu pròxim pas.',
    'program.d1s13.title': 'Treball en xarxa i finger food',

    'program.d2s01.title': 'Acreditacions: conferència i fòrum d’inversió PALMA TECH’26',
    'program.d2s02.title':
      'De la idea al mercat: recursos per emprendre, innovar i créixer a les Illes Balears',
    'program.d2s02.desc':
      'Serveis d’acompanyament, acceleració i instruments de finançament per impulsar startups i transformar idees innovadores en projectes empresarials.',
    'program.d2s02.speaker': 'Immaculada Salamanca',
    'program.d2s02.role': 'Cap d’àrea de RDi i Comunicació de la Fundació Bit',
    'program.d2s02.speaker2': 'Pere Jimenez',
    'program.d2s02.role2': 'Cap del servei d’emprenedoria i talent de l’ADRBalears',
    'program.d2s03.title': 'Una mirada diferent a la intel·ligència artificial',
    'program.d2s03.desc':
      'Ponència: «Otra charla de IA a las 09.30 y por qué le das las gracias a una máquina».',
    'program.d2s03.speaker': 'Raquel Carrera',
    'program.d2s03.role': 'Sòcia de l’espai creatiu PATIO',
    'program.d2s04.title': 'Pausa per al cafè i connexions amb l’ecosistema',
    'program.d2s04.desc':
      'Espai de treball en xarxa entre empreses emergents, empreses, institucions i agents de l’ecosistema emprenedor.',
    'program.d2s04.desc2': 'Acreditacions finals per participar al fòrum d’inversió.',
    'program.d2s05.title': 'De l’emprenedoria a la inversió: Fòrum PALMA TECH’26',
    'program.d2s05.desc':
      'Presentació del fòrum que connecta startups innovadores de les Illes Balears amb inversors i oportunitats de finançament.',
    'program.d2s05.speaker': 'Sebastián González',
    'program.d2s05.role': 'Vicepresident de la Fundació Bit',
    'program.d2s05.speaker2': 'Silvia Delgado',
    'program.d2s05.role2': 'Gerent de l’ADRBalears',
    'program.d2s06.title':
      'Empreses emergents en acció: presentació de projectes davant inversors',
    'program.d2s06.desc':
      'Sessió de presentacions de les empreses emergents participants i lliurament del premi al projecte més votat.',
    'program.d2s07.title':
      'Què cerca un inversor? Claus per finançar i fer créixer una empresa emergent',
    'program.d2s07.desc':
      'Taula rodona sobre els criteris d’inversió, la preparació per captar capital, les oportunitats de finançament i els reptes del creixement empresarial.',
    'program.d2s08.title': 'Micròfon obert als inversors',
    'program.d2s09.title':
      'Lliurament del premi a l’empresa emergent millor valorada i cloenda de la jornada',
    'program.d2s09.speaker': 'Alejandro Sáenz de San Pedro',
    'program.d2s09.role': 'Conseller d’Empresa, Autònoms i Energia',
    'program.d2s10.title': 'Treball en xarxa i finger food',
    'program.d2s10.desc': 'Connectant projectes i oportunitats.',
  },

  es: {
    'meta.title': 'Innovation Days 2026 — Fundación BIT',
    'meta.description':
      'Dos jornadas para descubrir oportunidades, compartir conocimiento y conectar el ecosistema empresarial y tecnológico de las Illes Balears. 3 y 4 de diciembre de 2026 en el ParcBIT.',

    'a11y.skip': 'Ir al contenido principal',
    'a11y.openMenu': 'Abrir el menú de navegación',
    'a11y.closeMenu': 'Cerrar el menú de navegación',
    'a11y.toTop': 'Volver arriba',
    'a11y.brand': 'Fundación BIT — Balears Innovation TechHub',
    'a11y.lang': 'Idioma',
    'a11y.langCa': 'Cambiar a catalán',
    'a11y.langEs': 'Cambiar a castellano',

    'nav.label': 'Navegación principal',
    'nav.mobileLabel': 'Navegación móvil',
    'nav.whatIs': '¿Qué son?',
    'nav.program': 'Programa',

    'lang.cat': 'Català',
    'lang.cast': 'Castellano',

    'hero.eyebrow': '3 y 4 de diciembre de 2026 · Auditorio ParcBIT, Palma',
    'hero.ctaAssistant': 'Inscríbete como asistente',
    'hero.ctaForum': '¿Necesitas financiación? Apúntate al foro',

    'about.eyebrow': 'El punto de encuentro de la innovación balear',
    'about.title': 'Dos jornadas para conectar el ecosistema innovador de las Illes Balears',
    'about.p1':
      'Los <strong>Innovation Days</strong> son la cita de referencia de la innovación de las Illes Balears. Dos jornadas organizadas en el ParcBIT que ponen en contacto el tejido empresarial y tecnológico del archipiélago con la Administración pública, las instituciones financieras y los inversores que apuestan por hacer crecer los proyectos innovadores.',
    'about.p2':
      'La edición 2026 responde a una pregunta que se repite cada año: <strong>qué puertas hay que tocar, qué camino seguir y quién es quién</strong> en el mundo de la innovación? El programa articula la respuesta en dos ejes: los instrumentos que permiten transformar una idea en un proyecto viable, y el acceso al capital para hacerlo crecer.',
    'about.p3':
      'La organización corresponde al <strong>Govern de les Illes Balears</strong>, a través de la <strong>Fundación Balear de Innovación y Tecnología</strong>, que gestiona el ParcBIT, el CentreBit Menorca y el CentreBit Eivissa, y <strong>Agencia de Desarrollo Regional de las Illes Balears (ADRBalears)</strong>. La Fundació BIT es una entidad pública sin ánimo de lucro dependiente del Gobierno: ejecuta las estrategias de I+D+i, da soporte a las empresas e inversores de base tecnológica en todas las fases de su ciclo de vida y promueve la participación del tejido empresarial en convocatorias de financiación autonómicas, nacionales y europeas.',
    'about.orgTitle': 'Organizan la edición 2026',
    'about.org1': 'Govern de les Illes Balears',
    'about.org1Desc':
      'A través de la Dirección General de Innovación y Transformación Digital, la Fundación Balear de Innovación y Tecnología, que gestiona el ParcBIT, el CentreBit Menorca y el CentreBit Eivissa, junto con la Agencia de Desarrollo Regional de las Illes Balears (ADRBalears).',
    'about.org3': 'Keiretsu Forum',
    'about.org3Desc': 'Red internacional de inversores privados.',
    'about.link': 'Más información sobre la Fundació BIT',
    'about.linkAdr': 'Más información sobre la ADRBalears',

    'overview.eyebrow': 'Innovación, talento e inversión',
    'overview.title':
      'Descubre qué puertas hay que tocar, qué camino seguir y quién es quién en el mundo de la innovación',
    'overview.lead':
      'Dos jornadas para descubrir oportunidades, compartir conocimiento y conectar el ecosistema empresarial y tecnológico de las Illes Balears.',
    'overview.p1':
      'El jueves 3 de diciembre, la jornada se centra en <strong>Innovar en las Illes Balears</strong>: el balance de las actuaciones 2023–2026 y las oportunidades para el tejido empresarial. Intervienen los responsables de la RIS3 y de los principales instrumentos de apoyo —Turboconvo, CDTI y la Unidad Acceleradora de Proyectos Estratégicos—, los hubs de innovación del ParcBIT y los CentresBit, y casos de éxito de empresas del ecosistema que explican qué significa innovar en primera persona.',
    'overview.p2':
      'El viernes 4 de diciembre, la jornada gira en torno a <strong>De la idea a la inversión</strong>. La Conferencia y Foro <strong>PALMA TECH’26</strong> conecta las empresas emergentes de las Illes Balears con inversores, las empresas emergentes en acción presentan ante un panel cualificado y se abre el micrófono para los inversores. La jornada se cierra con una mesa redonda sobre criterios de inversión y las claves para financiar y hacer crecer una empresa emergente.',
    'overview.p3':
      'Entre las dos sesiones hay tiempo para el networking: pausas café, espacios de contacto y finger food al final de cada día. Los Innovation Days son, en definitiva, el espacio donde el talento encuentra capital, las pymes encuentran instrumentos y el ecosistema se conoce de primera mano.',

    'stats.days': 'jornadas',
    'stats.sessions': 'sesiones',
    'stats.speakers': 'ponentes',
    'stats.forum': 'foro de inversión',

    'cta.title': 'No olvides inscribirte',
    'cta.lead':
      'Elige cómo quieres participar en los Innovation Days 2026: como asistente o en el Foro de inversión PALMA TECH’26.',

    'footer.organizer': 'Organizador',
    'footer.coorganizers': 'Co-organizadores',

    'program.eyebrow': 'Agenda',
    'program.title': 'Programa',
    'program.intro':
      'Dos días, diecisiete sesiones y una agenda construida en torno a dos objetivos: conocimiento práctico y contacto directo.',
    'program.tablist': 'Programa por días',
    'program.tab1Day': 'Jueves 3',
    'program.tab1Date': '3 de diciembre',
    'program.tab2Day': 'Viernes 4',
    'program.tab2Date': '4 de diciembre',
    'program.d1Subtitle':
      'Innovar en las Illes Balears: de las ideas a las oportunidades de negocio. Balance de actuaciones 2023–2026 y oportunidades para el tejido empresarial.',
    'program.d2Subtitle':
      'De la idea a la inversión: conectando talento, innovación y capital. Una jornada para descubrir oportunidades, dar visibilidad a las empresas emergentes y conectar proyectos innovadores con el ecosistema inversor.',
    'program.type.logistics': 'Organización',
    'program.type.ceremony': 'Acto institucional',
    'program.type.principal': 'Apertura',
    'program.type.instrument': 'Instrumentos',
    'program.type.informative': 'Sesión informativa',
    'program.type.talk': 'Ponencia',
    'program.type.break': 'Networking',
    'program.type.forum': 'Foro de inversión',
    'program.type.pitch': 'Pitches',
    'program.type.roundtable': 'Mesa redonda',
    'program.type.openmic': 'Micrófono abierto',
    'program.type.closing': 'Clausura',

    'program.d1s01.title': 'Inscripciones',
    'program.d1s02.title':
      'Apertura institucional: la innovación como instrumento de competitividad y diversificación económica de las Illes Balears',
    'program.d1s02.speaker': 'Antoni Costa',
    'program.d1s02.role': 'Vicepresidente primero del Gobierno de las Illes Balears',
    'program.d1s03.title': 'Pasado, presente y futuro de la innovación de las Illes Balears',
    'program.d1s03.desc':
      'Prioridades de innovación y principales instrumentos desarrollados durante 2023–2026. Una estrategia para transformar ideas en proyectos.',
    'program.d1s03.speaker': 'Sebastián González',
    'program.d1s03.role': 'Director general de Innovación y Transformación Digital',
    'program.d1s04.title':
      'Turboconvo: ayudas para impulsar la innovación y la digitalización de las pequeñas y medianas empresas de las Illes Balears',
    'program.d1s04.desc': 'Resultados y previsiones.',
    'program.d1s04.speaker': 'Josué Díaz',
    'program.d1s04.role': 'Jefe de servicio de innovación del Govern de les Illes Balears',
    'program.d1s05.title': 'Instrumentos de innovación del CDTI',
    'program.d1s05.speaker': 'Pilar González',
    'program.d1s05.role':
      'Jefa de departamento de Promoción Institucional y Cooperación Territorial del CDTI',
    'program.d1s06.title': 'Pausa para el café y trabajo en red',
    'program.d1s06.desc':
      'Espacio de contacto entre empresas, instituciones y agentes del ecosistema.',
    'program.d1s07.title': 'La innovación en primera persona',
    'program.d1s07.desc':
      'Casos de éxito de empresas del ecosistema de las Illes Balears. Empresas: ADEMA, Atalaia, etc.',
    'program.d1s07.speaker': 'Modera: Xavier Nadal',
    'program.d1s07.role':
      'Jefe de departamento de proyectos estratégicos del Govern de les Illes Balears',
    'program.d1s08.title': 'Tu próxima oportunidad para innovar',
    'program.d1s08.desc':
      'Instrumentos disponibles (Oficina Innobal), futuras convocatorias, cooperación europea y vías de acceso a los servicios.',
    'program.d1s08.speaker': 'Immaculada Salamanca',
    'program.d1s08.role': 'Jefa de área de RDI y Comunicación de la Fundació Bit',
    'program.d1s09.title': 'Unidad Aceleradora de Proyectos Estratégicos (UAPE)',
    'program.d1s09.desc': 'Herramientas de apoyo y experiencia práctica.',
    'program.d1s09.speaker': 'Bárbara Barceló',
    'program.d1s09.role':
      'Directora General de Proyectos Estratégicos, Fondos Europeos y Simplificación Administrativa',
    'program.d1s10.title': 'Conectar talento, empresas y conocimiento',
    'program.d1s10.desc':
      'Estrategia para los focos de innovación de las Illes Balears: ParcBIT y centros Bit.',
    'program.d1s10.speaker': 'Dani Juan',
    'program.d1s10.role': 'Delegado territorial en Ibiza de la Fundació Bit',
    'program.d1s11.title': 'Entrega de reconocimientos',
    'program.d1s12.title': 'Conclusiones y clausura',
    'program.d1s12.desc':
      'Síntesis de los instrumentos presentados e indicaciones prácticas para que las empresas identifiquen su próximo paso.',
    'program.d1s13.title': 'Trabajo en red y finger food',

    'program.d2s01.title': 'Acreditaciones: conferencia y foro de inversión PALMA TECH’26',
    'program.d2s02.title':
      'De la idea al mercado: recursos para emprender, innovar y crecer en las Illes Balears',
    'program.d2s02.desc':
      'Servicios de acompañamiento, aceleración e instrumentos de financiación para impulsar startups y transformar ideas innovadoras en proyectos empresariales.',
    'program.d2s02.speaker': 'Immaculada Salamanca',
    'program.d2s02.role': 'Jefa de área de RDI y Comunicación de la Fundació Bit',
    'program.d2s02.speaker2': 'Pere Jimenez',
    'program.d2s02.role2': 'Jefe del servicio de emprendimiento y talento de la ADRBalears',
    'program.d2s03.title': 'Una mirada diferente a la inteligencia artificial',
    'program.d2s03.desc':
      'Ponencia: «Otra charla de IA a las 09.30 y por qué le das las gracias a una máquina».',
    'program.d2s03.speaker': 'Raquel Carrera',
    'program.d2s03.role': 'Socia del espacio creativo PATIO',
    'program.d2s04.title': 'Pausa para el café y conexiones con el ecosistema',
    'program.d2s04.desc':
      'Espacio de trabajo en red entre empresas emergentes, empresas, instituciones y agentes del ecosistema emprendedor.',
    'program.d2s04.desc2': 'Acreditaciones finales para participar en el foro de inversión.',
    'program.d2s05.title': 'Del emprendimiento a la inversión: Foro PALMA TECH’26',
    'program.d2s05.desc':
      'Presentación del foro que conecta startups innovadoras de las Illes Balears con inversores y oportunidades de financiación.',
    'program.d2s05.speaker': 'Sebastián González',
    'program.d2s05.role': 'Vicepresidente de la Fundació Bit',
    'program.d2s05.speaker2': 'Silvia Delgado',
    'program.d2s05.role2': 'Gerente de la ADRBalears',
    'program.d2s06.title':
      'Empresas emergentes en acción: presentación de proyectos ante inversores',
    'program.d2s06.desc':
      'Sesión de presentaciones de las empresas emergentes participantes y entrega del premio al proyecto más votado.',
    'program.d2s07.title':
      '¿Qué busca un inversor? Claves para financiar y hacer crecer una empresa emergente',
    'program.d2s07.desc':
      'Mesa redonda sobre los criterios de inversión, la preparación para captar capital, las oportunidades de financiación y los retos del crecimiento empresarial.',
    'program.d2s08.title': 'Micrófono abierto a los inversores',
    'program.d2s09.title':
      'Entrega del premio a la empresa emergente mejor valorada y clausura de la jornada',
    'program.d2s09.speaker': 'Alejandro Sáenz de San Pedro',
    'program.d2s09.role': 'Consejero de Empresa, Autónomos y Energía',
    'program.d2s10.title': 'Trabajo en red y finger food',
    'program.d2s10.desc': 'Conectando proyectos y oportunidades.',
  }
};
