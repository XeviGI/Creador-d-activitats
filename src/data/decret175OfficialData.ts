/**
 * Dades oficials del Decret 175/2022 d'Educació Primària de Catalunya
 * Transcrites literalment segons el document de referència del Departament d'Educació.
 */

export interface CriteriAvaluacioOficial {
  codi: string;
  cicle: 'Cicle Inicial' | 'Cicle Mitjà' | 'Cicle Superior';
  descripcioLiteral: string;
}

export interface CompetenciaEspecificaOficial {
  codi: string;
  numero: number;
  textLiteral: string;
  criterisPerCicle: {
    inicial: string[]; // 1r i 2n
    mitja: string[];   // 3r i 4t
    superior: string[]; // 5è i 6è
  };
}

export interface AreaCurricularOficial {
  id: string;
  nomOficial: string;
  nomNormalitzat: string;
  competencies: CompetenciaEspecificaOficial[];
}

export const DECRET_175_DATA: Record<string, AreaCurricularOficial> = {
  medi: {
    id: 'medi',
    nomOficial: 'Coneixement del Medi Natural, Social i Cultural',
    nomNormalitzat: 'medi',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Seleccionar i utilitzar dispositius i recursos digitals de forma responsable i eficient per tal de buscar informació, comunicar-se i treballar col·laborativament i en xarxa i per crear continguts segons les necessitats digitals del context.',
        criterisPerCicle: {
          inicial: [
            '1.1 Fer ús, de forma responsable i guiada, de diferents fonts digitals per la cerca d\'informació, tant en grup com individualment.',
            '1.2 Utilitzar dispositius i recursos digitals per a comunicar-se amb els altres i com a suport per donar a conèixer els propis aprenentatges.',
            '1.3 Crear, de manera guiada, continguts digitals senzills per construir el coneixement segons la necessitat del context.',
          ],
          mitja: [
            '1.1 Fer ús, de forma responsable, de diferents fonts digitals per la cerca d\'informació, tant en grup com individualment.',
            '1.2 Utilitzar dispositius i recursos digitals per a comunicar-se amb els altres i per donar a conèixer els propis aprenentatges.',
            '1.3 Crear continguts digitals senzills per construir el coneixement segons la necessitat del context.',
          ],
          superior: [
            '1.1 Fer ús de diferents fonts digitals, tant en grup com individualment, per identificar i seleccionar la informació adient, i verificant la fiabilitat de la font en funció de l’autoria i de la data d’actualització.',
            '1.2 Utilitzar dispositius i recursos digitals de forma responsable i eficient, per contrastar, organitzar i comunicar la informació i per donar a conèixer els propis aprenentatges.',
            '1.3 Crear continguts digitals per construir el coneixement seleccionant i utilitzant dispositius i recursos digitals, segons la necessitat del context.',
            '1.4 Participar en la realització de tasques col·laboratives fent ús de recursos digitals en entorns de treball col·laboratiu dins i fora del centre.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Plantejar-se preguntes sobre el món, aplicant les diferents formes de raonament i mètodes del pensament científic, per interpretar, respondre i predir els fets i fenòmens del medi natural, social i cultural i per prendre decisions creatives i decidir actuacions ètiques i socialment sostenibles.',
        criterisPerCicle: {
          inicial: [
            '2.1 Demostrar curiositat, formulant-se preguntes i realitzant prediccions possibles per conèixer objectes, fets i fenòmens.',
            '2.2 Buscar informació de fonts digitals i analògiques, segures i fiables, seleccionades de manera pautada per utilitzar-la en investigacions relacionades amb el coneixement del medi.',
            '2.3 Planificar experiments amb ajuda, usant tècniques d’indagació i fer servir instruments simples de forma segura per registrar les observacions i les dades per respondre la pregunta plantejada.',
            '2.4 Comparar i relacionar les informacions i els resultats obtinguts amb les prediccions realitzades per formular possibles respostes a les qüestions plantejades.',
            '2.5 Comunicar el resultat de les investigacions realitzades de manera oral, corporal i gràfica explicant el procés seguit amb ajuda d’un guió.',
          ],
          mitja: [
            '2.1 Demostrar curiositat, formulant-se preguntes investigables i fer prediccions raonades per conèixer objectes, fets i fenòmens.',
            '2.2 Buscar i seleccionar de forma autònoma informació de diferents fonts digitals i analògiques segures i fiables per emprar-la en les investigacions relacionades amb el coneixement del medi.',
            '2.3 Dissenyar i realitzar experiments senzills, utilitzant diferents tècniques d’indagació, emprant de forma segura instruments i dispositius analògics i digitals, per realitzar observacions, fent mesuraments precisos i registres per respondre la pregunta plantejada.',
            '2.4 Comparar i Interpretar la informació, les dades obtingudes en la investigació i les prediccions realitzades per proposar respostes possibles a les qüestions plantejades.',
            '2.5 Presentar els resultats de les investigacions utilitzar diferents tipus de formats, fent ús també, de dispositius i recursos digitals i amb un llenguatge acurat per explicar els resultats i el procés de les investigacions realitzades.',
          ],
          superior: [
            '2.1 Demostrar i mantenir la curiositat, formulant-se preguntes investigables i fer prediccions raonades sobre temes d’actualitat relacionats amb el medi.',
            '2.2 Buscar, seleccionar i contrastar informació, de fonts digitals i analògiques segures i fiables per usar-la en investigacions relacionades amb el coneixement del medi.',
            '2.3 Dissenyar i realitzar experiments, fent ús de la indagació, seleccionant els instruments i dispositius analògics i digitals necessaris per fer observacions i prendre mesures precises, decidint el tipus de registre a utilitzar per respondre la pregunta plantejada.',
            '2.4 Analitzar i interpretar la informació, les dades obtingudes en la investigació i les prediccions realitzades per valorar la coherència de possibles solucions a les qüestions plantejades.',
            '2.5 Adaptar el missatge i el format a l\'audiència a què va dirigit, fent ús també, de dispositius i recursos digitals fent servir un llenguatge acurat i precís per justificar els resultats aconseguits i el procés de les investigacions realitzades.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Resoldre problemes i reptes generant cooperativament, un producte creatiu i innovador a partir de projectes interdisciplinaris, utilitzant diferents formes de raonament com el pensament de disseny i el pensament computacional, per respondre a necessitats concretes.',
        criterisPerCicle: {
          inicial: [
            '3.1 Reconèixer necessitats o identificar reptes concrets de l’entorn proper i participar en projectes interdisciplinaris cooperatius, de manera guiada, per a la creació de prototips que els resolguin.',
            '3.2 Aportar idees que puguin donar resposta a un problema o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, compartint-les a través de descripcions orals, representacions i models i establir cooperativament criteris per avaluar el projecte i la gestió del treball conjunt.',
            '3.3 Construir un producte final senzill que doni solució a un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional i provant, en equip, els diferents prototips fent ús de forma segura de les eines i els materials adequats.',
            '3.4 Mostrar, de forma oral o gràfica, el producte final explicant el procés seguit, amb ajuda d’un guió.',
          ],
          mitja: [
            '3.1 Identificar i analitzar necessitats o reptes de l’entorn proper i establir objectius senzills per a la creació de prototips o solucions digitals que les resolgui.',
            '3.2 Proposar possibles solucions que puguin donar resposta a un problema o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, compartint-les a través de descripcions orals, representacions i models i establir cooperativament criteris per avaluar el projecte i la gestió del treball conjunt.',
            '3.3 Elaborar un producte final senzill que doni solució a un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional i provant, en equip, els diferents prototips o solucions digitals fent ús de forma segura dels dispositius, les eines i els materials adequats.',
            '3.4 Presentar els resultats obtinguts explicant el procés seguit i justificant perquè el prototip o solució digital compleix amb els requisits del projecte.',
          ],
          superior: [
            '3.1 Avaluar les necessitats de l’entorn i establir objectius concrets per a la creació de prototips o solucions digitals que les resolgui.',
            '3.2 Dissenyar possibles solucions a problemes plantejats d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, mitjançant estratègies bàsiques de gestió de projectes cooperatius, tenint en compte els recursos necessaris, les fases d’execució i establint criteris concrets per avaluar la seva viabilitat.',
            '3.3 Elaborar i desenvolupar un producte final que doni solució a un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional i provant, en equip, els diferents prototips o solucions digitals fent ús de forma segura i responsable dels dispositius, eines, tècniques i materials adequats.',
            '3.4 Comunicar els resultats obtinguts i el procés seguit, adaptant el missatge i el format a l’audiència, justificant perquè el prototip o solució digital compleix amb els requisits del projecte i suggerir possibles reptes per futurs projectes.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Conèixer i prendre consciència del propi cos, de les emocions i sentiments propis i aliens, a partir de l\'adquisició d’hàbits fonamentats en coneixements científics, per aconseguir el benestar físic i emocional i afavorir la convivència.',
        criterisPerCicle: {
          inicial: [
            '4.1 Reconèixer i adoptar hàbits de vida saludable seguint pautes donades sobre higiene, alimentació variada i equilibrada, exercici físic i descans.',
            '4.2 Prendre decisions personals sobre alimentació, higiene i salut a partir de coneixements i criteris científics bàsics, per la prevenció i guariment de malalties pròpies i usuals.',
            '4.3 Diferenciar accions que afavoreixin el benestar i equilibri emocional i social, reconeixent les emocions pròpies i alienes per generar relacions de respecte.',
          ],
          mitja: [
            '4.1 Adoptar de forma autònoma, hàbits de vida saludable valorant la importància de la higiene, l’alimentació variada i equilibrada, l’exercici físic i el descans.',
            '4.2 Prendre decisions personals i col·lectives sobre alimentació, higiene i salut a partir de coneixements i criteris científics, per la prevenció i guariment de malalties en el context proper.',
            '4.3 Mostrar actituds que fomenten el benestar i equilibri emocional i social, identificar les emocions pròpies i alienes, mostrant empatia i establint relacions afectives i saludables.',
          ],
          superior: [
            '4.1 Analitzar i fer propostes de millora justificades dels hàbits personals i col·lectius de vida saludables valorant la importància d’una alimentació variada i equilibrada, l’exercici físic, el descans i la higiene.',
            '4.2 Prendre decisions personals i col·lectives sobre alimentació, higiene i salut relacionant diferents coneixements i criteris científics, per la prevenció i guariment de malalties en l’àmbit global.',
            '4.3 Promoure actituds que fomenten el benestar i equilibri emocional i social, validant les emocions que activen relacions afectives saludables i resoldre amb criteri situacions diverses també relacionades amb l’ús de la tecnologia i la gestió del temps lliure.',
          ],
        },
      },
      {
        codi: 'CE5',
        numero: 5,
        textLiteral: 'Analitzar les característiques de diferents elements o sistemes del medi natural, social i cultural, identificant la seva organització i propietats, establint relacions entre aquests, per tal de reconèixer el valor del patrimoni cultural i natural i emprendre accions per a un ús responsable, la seva conservació i millora.',
        criterisPerCicle: {
          inicial: [
            '5.1 Reconèixer les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d\'indagació i utilitzant les eines i processos adequats de manera pautada.',
            '5.2 Reconèixer connexions directes entre diferents elements del medi natural, social i cultural.',
            '5.3 Mostrar actituds de respecte cap al patrimoni natural i cultural reconeixent-lo com a bé comú.',
          ],
          mitja: [
            '5.1 Identificar les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d\'indagació i utilitzant les eines i processos adequats.',
            '5.2 Reconèixer connexions entre diferents elements del medi natural social i cultural comprenent les relacions que s\'estableixen i fent prediccions dels possibles efectes.',
            '5.3 Valorar i protegir el patrimoni natural i cultural considerant-lo com bé comú i adoptant conductes respectuoses pel seu gaudiment i proposant accions per la seva conservació i millora.',
          ],
          superior: [
            '5.1 Identificar i analitzar les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d\'indagació i utilitzant les eines i processos adequats.',
            '5.2 Establir connexions entre diferents elements del medi natural social i cultural analitzant les relacions que s\'estableixen i fer prediccions dels possibles efectes.',
            '5.3 Valorar i proposar accions de conservació, protecció i millora del patrimoni natural i cultural, a través de compromisos i conductes a favor de la sostenibilitat.',
          ],
        },
      },
      {
        codi: 'CE6',
        numero: 6,
        textLiteral: 'Analitzar críticament les causes i conseqüències de la intervenció humana a l’entorn integrant els vessants social, econòmic, cultural, tecnològic i ambiental definits en els Objectius de Desenvolupament Sostenible, per tal de promoure la capacitat d\'afrontar els problemes, aportar solucions i actuar de manera individual i col·laborativa en la seva resolució, posant en pràctica hàbits de vida i de consum responsable i sostenible.',
        criterisPerCicle: {
          inicial: [
            '6.1 Identificar la relació de l\'ésser humà amb el món que l\'envolta en l\'ús i aprofitament dels elements i recursos de l\'entorn.',
            '6.2 Participar en activitats que permeten avançar cap als objectius de desenvolupament sostenible de manera conscient i contextualitzada.',
            '6.3 Mostrar comportaments i actituds de vida sostenible, conseqüents amb el respecte, la cura i la protecció del planeta.',
          ],
          mitja: [
            '6.1 Identificar i analitzar la intervenció humana en el món, en problemes ecosocials, proposant solucions possibles a escala local.',
            '6.2 Escollir i realitzar accions cooperatives que facilitin afrontar els reptes i desafiaments proposats en els objectius de desenvolupament sostenible de manera crítica i contextualitzada.',
            '6.3 Adquirir hàbits de vida sostenible i conseqüents amb el respecte, la cura i la protecció de les persones i del planeta.',
          ],
          superior: [
            '6.1 Analitzar la intervenció humana en el món i aportar opinions fonamentades per fer front a problemes ecosocials i involucrar-se en la seva resolució.',
            '6.2 Dissenyar propostes o activitats, cooperativament, per avançar cap a la consecució dels objectius de desenvolupament sostenible de manera crítica i contextualitzada.',
            '6.3 Participar en la construcció de models de convivència sostenibles en el temps basats en la cooperació, la cura i protecció de l\'entorn i el respecte a les persones i al planeta.',
          ],
        },
      },
      {
        codi: 'CE7',
        numero: 7,
        textLiteral: 'Observar, detectar, comprendre i interpretar canvis i continuïtats del medi natural, social i cultural, analitzant relacions de causalitat, simultaneïtat i successió, per explicar i valorar les relacions entre diferents elements i esdeveniments que permeten entendre el present i imaginar futurs possibles.',
        criterisPerCicle: {
          inicial: [
            '7.1 Detectar i contextualitzar temporalment esdeveniments propis i propers emprant nocions de mesura i successió bàsiques.',
            '7.2 Observar i detectar canvis i continuïtats del medi en l’entorn proper en el pas del temps.',
            '7.3 Mostrar curiositat per la vida quotidiana de les persones al llarg del temps.',
          ],
          mitja: [
            '7.1 Identificar i contextualitzar temporalment, esdeveniments de l’entorn proper per poder interpretar el present com a producte del passat i comprendre la incidència de les decisions actuals en el futur.',
            '7.2 Interpretar canvis i continuïtats del medi establint relacions de causalitat en diferents moments històrics.',
            '7.3 Conèixer els trets de les diferents societats al llarg del temps i el paper que les persones han desenvolupat en la història.',
          ],
          superior: [
            '7.1 Relacionar i contextualitzar temporalment, esdeveniments rellevants per poder interpretar els canvis el present com a producte del passat i comprendre la incidència de les decisions actuals en el futur.',
            '7.2 Analitzar els canvis i les continuïtats a partir de les relacions de causalitat, simultaneïtat i successió de diferents moments històrics, culturals, socials i en el medi natural on les societats es desenvolupen.',
            '7.3 Relacionar les diferents èpoques de la història i identificar les accions i fets humans més destacats valorant els canvis que han provocat.',
          ],
        },
      },
      {
        codi: 'CE8',
        numero: 8,
        textLiteral: 'Reconèixer, valorar i defensar la diversitat i la igualtat de gènere reflexionant sobre qüestions ètiques i mostrant empatia i respecte, per tal de construir una societat diversa, equitativa i contribuir al benestar individual i col·lectiu i a la consecució dels valors dels drets humans.',
        criterisPerCicle: {
          inicial: [
            '8.1 Mostrar actituds que fomenten l’equitat, la igualtat de gènere i les conductes no sexistes reconeixent models positius en l\'entorn pròxim.',
            '8.2 Promoure actituds d’equitat, igualtat de gènere i conductes no sexistes, detectant i contrastant diferents models en l’entorn pròxim.',
            '8.3 Reconèixer les manifestacions i la diversitat cultural des d’una perspectiva de gènere.',
          ],
          mitja: [
            '8.1 Promoure actituds d’equitat, igualtat de gènere i conductes no sexistes, analitzant i contrastant diferents models en la nostra societat.',
            '8.2 Contribuir al benestar individual i col·lectiu de la societat, amb accions que fomenten l’equitat, la igualtat de gènere i les conductes no sexistes reconeixent models positius al llarg de la història.',
            '8.3 Valorar les manifestacions i la diversitat cultural i relacionar-les amb qui les ha creat des d’una perspectiva de gènere.',
          ],
          superior: [
            '8.1 Posicionar-se críticament cap a actituds d’equitat, igualtat de gènere i conductes no sexistes, analitzant i contrastant diferents models en la nostra societat.',
            '8.2 Actuar per a la igualtat efectiva de les persones i desmuntar estereotips i rols en tots els àmbits.',
            '8.3 Valorar les manifestacions culturals i relacionar-les amb qui les ha creat i la seva època, per interpretar les diverses cosmovisions i la seva finalitat.',
          ],
        },
      },
      {
        codi: 'CE9',
        numero: 9,
        textLiteral: 'Participar de la vida social de manera eficaç i constructiva respectant i aprofundint en el desenvolupament dels drets humans i dels infants i de les minories, per tal d’aconseguir una ciutadania activa, responsable i implicada.',
        criterisPerCicle: {
          inicial: [
            '9.1 Participar de l’entorn social i de la comunitat escolar, de manera assertiva i constructiva, amb responsabilitat, utilitzant un llenguatge inclusiu i no violent.',
            '9.2 Respectar a les persones, valorant la seva diversitat i riquesa, i apreciant-la com a font d\'aprenentatge.',
            '9.3 Conèixer i interioritzar normes bàsiques de circulació, com a vianants i usuaris dels mitjans de locomoció implicats en el desenvolupament sostenible de la mobilitat de les persones.',
          ],
          mitja: [
            '9.1 Participar dins de la comunitat escolar i la vida social realitzant activitats, assumint responsabilitats i establint acords de forma dialogada i democràtica, emprant un llenguatge inclusiu i no violent.',
            '9.2 Contribuir al benestar individual i col·lectiu de la societat, analitzant la importància demogràfica, cultural i econòmica de les migracions en l\'actualitat, valorant la diversitat i mostrant empatia i respecte per les cultures.',
            '9.3 Prendre decisions responsables com a vianants i usuaris dels mitjans de locomoció, de la importància de la mobilitat sostenible de les persones, coneixent les normes i els senyals de trànsit fent-ne un bon ús.',
          ],
          superior: [
            '9.1 Participar activament dins la comunitat escolar, la vida social i l’entorn, assumint responsabilitats, establint acords i presentant propostes de millora de la vida a centre, des de l’exercici dels principis democràtics, que emanen dels drets humans i dels infants i de les minories.',
            '9.2 Contribuir al benestar individual i col·lectiu i a l\'assoliment dels valors de la integració europea a través del coneixement dels processos geogràfics, històrics i culturals que han conformat la societat actual, valorant la diversitat cultural, i mostrant empatia i respecte per les minories.',
            '9.3 Contribuir activament a la mobilitat segura pròpia i de les altres persones durant els desplaçaments i valorant-ne els riscos.',
          ],
        },
      },
      {
        codi: 'CE10',
        numero: 10,
        textLiteral: 'Valorar el funcionament de les administracions públiques, a partir dels principis i els valors que es desprenen de l’ordenament jurídic que regula la nostra convivència, per protegir els drets civils i polítics i generar interaccions respectuoses i equitatives promovent la resolució pacífica i dialogada dels conflictes.',
        criterisPerCicle: {
          inicial: [
            '10.1 Identificar institucions properes, assenyalant i valorant les funcions desenvolupades que promouen una bona convivència.',
            '10.2 Conèixer els propis drets i deures per promoure la cohesió social i els valors de la cultura de la pau.',
          ],
          mitja: [
            '10.1 Conèixer els òrgans de govern de diferents institucions municipals, i valorar els seus mecanismes de funcionament per a la participació ciutadana i democràtica.',
            '10.2 Actuar en defensa dels drets i deures propis i dels altres per promoure la cohesió social i els valors de la cultura de la pau.',
          ],
          superior: [
            '10.1 Identificar i analitzar el funcionament dels òrgans de govern de les comunitats autònomes, de l’Estat Espanyol i de la Unió Europea, valorant les seves accions en la gestió dels serveis públics per la ciutadania.',
            '10.2 Actuar per protegir els drets i deures propis i dels altres, reconèixer conductes no favorables i reaccionar en conseqüència per promoure la cohesió social i els valors de cultura de la pau.',
          ],
        },
      },
    ],
  },

  matematiques: {
    id: 'matematiques',
    nomOficial: 'Matemàtiques',
    nomNormalitzat: 'matematiques',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Traduir problemes i interpretar situacions quotidianes fent-ne una representació matemàtica personal a través de conceptes, eines i estratègies per analitzar-ne els elements més rellevants.',
        criterisPerCicle: {
          inicial: [
            '1.1 Iniciar-se en la interpretació de la informació d’un problema i d’una situació de la vida quotidiana responent a les preguntes plantejades o fent noves preguntes.',
            '1.2 Proposar representacions matemàtiques, amb recursos manipulatius, gràfics i digitals, orientades a la resolució de problemes i de situacions de la vida quotidiana.',
          ],
          mitja: [
            '1.1 Interpretar la informació d’un problema i d’una situació de la vida quotidiana responent a les preguntes plantejades o fent noves preguntes.',
            '1.2 Proposar representacions matemàtiques, amb recursos manipulatius, gràfics i digitals, que ajudin en la resolució de problemes i de situacions de la vida quotidiana.',
          ],
          superior: [
            '1.1 Interpretar i reformular de forma verbal i gràfica, problemes i situacions de la vida quotidiana, responent a les preguntes plantejades o fent noves preguntes.',
            '1.2 Elaborar representacions matemàtiques eficaces, amb recursos manipulatius, gràfics i digitals, que portin a la resolució de problemes i de situacions de la vida quotidiana.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Resoldre problemes, aplicant diferents tècniques, estratègies i formes de raonament, per explorar i compartir diferents maneres de procedir, obtenir solucions i assegurar la seva validesa des d’un punt de vista formal i en relació amb el context plantejat i generar noves preguntes i reptes.',
        criterisPerCicle: {
          inicial: [
            '2.1 Emprar estratègies i formes pròpies de raonar per resoldre un problema i explicar el procés.',
            '2.2 Explorar, compartir i resoldre un mateix problema a partir de diferents propostes, parlant-ne. Sense biaix de gènere.',
            '2.3 Comprovar que les solucions obtingudes es corresponen amb la pregunta formulada relacionant les solucions amb la pregunta.',
          ],
          mitja: [
            '2.1 Emprar estratègies i formes de raonament diverses per resoldre un problema i explicar-ne el procés.',
            '2.2 Explorar, compartir i resoldre un mateix problema a partir de diferents propostes, parlant-ne. Sense biaix de gènere.',
            '2.3 Demostrar la correcció matemàtica de les solucions d\'un problema i la seva coherència en el context plantejat.',
          ],
          superior: [
            '2.1 Seleccionar entre diferents estratègies per resoldre un problema compartint i justificant l\'estratègia seleccionada.',
            '2.2 Compartir i obtenir possibles solucions d’un problema seleccionant d’entre diverses opcions compartides justificant l’escollida sense biaix de gènere.',
            '2.3 Argumentar la correcció matemàtica de les solucions d\'un problema i la seva coherència en el context plantejat, generant, si és el cas, noves preguntes i reptes.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Explorar, formular i comprovar conjectures senzilles, reconeixent el valor del raonament espacial, raonament lògic i incorporar l’argumentació per integrar i generar nou coneixement matemàtic.',
        criterisPerCicle: {
          inicial: [
            '3.1 Iniciar-se en la realització de conjectures matemàtiques investigant patrons i propietats, fent deduccions i comprovant-les.',
            '3.2 Proposar exemples de problemes i situacions explicant com es poden resoldre matemàticament.',
            '3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai.',
          ],
          mitja: [
            '3.1 Formular conjectures matemàtiques senzilles investigant patrons, propietats i relacions, així com fent deduccions i comprovant-les.',
            '3.2 Proposar exemples de problemes i situacions explicant com es poden resoldre raonant i argumentant en les situacions on calgui aplicar-ho.',
            '3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai.',
          ],
          superior: [
            '3.1 Analitzar conjectures matemàtiques senzilles investigant patrons, propietats i relacions, així com fent deduccions i comprovant-les.',
            '3.2 Crear exemples de problemes i situacions justificant que es poden resoldre oferint els propis raonaments i arguments.',
            '3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Utilitzar el pensament computacional descomponent en parts més petites, reconeixent patrons i dissenyant algorismes per solucionar problemes i situacions de la vida quotidiana.',
        criterisPerCicle: {
          inicial: [
            '4.1 Descriure rutines i activitats senzilles que es realitzin pas a pas, en situacions de l’aula i de la vida quotidiana.',
            '4.2 Descompondre un problema o situació de la vida quotidiana en tasques concretes, abordant-les d’una en una per poder trobar la solució global.',
            '4.3 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.',
            '4.4 Explicar instruccions pas a pas per resoldre un problema i d’altres similars provant i duent a terme possibles solucions amb i sense dispositius digitals.',
          ],
          mitja: [
            '4.1 Descriure rutines i activitats senzilles que es realitzin pas a pas, en situacions de l’aula i de la vida quotidiana.',
            '4.2 Descompondre un problema o situació de la vida quotidiana en tasques concretes, abordant-les d’una en una per poder trobar la solució global.',
            '4.3 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.',
            '4.4 Definir instruccions pas a pas per resoldre un problema i d’altres similars provant i duent a terme possibles solucions amb i sense dispositius digitals.',
          ],
          superior: [
            '4.1 Descompondre un problema o situació de la vida quotidiana en tasques, abordant-les d’una en una per poder trobar la solució global entre d’altres amb dispositius digitals.',
            '4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.',
            '4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.',
            '4.4 Definir instruccions pas a pas per resoldre un problema i d’altres similars provant i duent a terme possibles solucions amb dispositius digitals.',
          ],
        },
      },
      {
        codi: 'CE5',
        numero: 5,
        textLiteral: 'Utilitzar connexions entre diferents idees matemàtiques, així com identificar les matemàtiques implicades en altres àrees o amb la vida quotidiana, interrelacionant conceptes i procediments per interpretar situacions i contextos diversos.',
        criterisPerCicle: {
          inicial: [
            '5.1 Reconèixer connexions entre els diferents elements matemàtics relacionant i ampliant coneixements en un context matemàtic.',
            '5.2 Reconèixer les matemàtiques presents en la vida quotidiana i en altres àrees en situacions en què se’n pugui fer ús.',
          ],
          mitja: [
            '5.1 Realitzar connexions entre els diferents elements matemàtics valorant-ne la utilitat per raonar i fixar coneixements en un context matemàtic.',
            '5.2 Interpretar situacions en contextos diversos reconeixent les connexions entre les matemàtiques i la vida quotidiana en situacions en què se’n pugui fer ús.',
          ],
          superior: [
            '5.1 Connectar diferents elements de les matemàtiques valorant-ne la utilitat per relacionar i ampliar coneixements en un context matemàtic.',
            '5.2 Utilitzar les connexions entre les matemàtiques i altres àrees i també entre les matemàtiques i situacions de contextos no matemàtics en què se’n pugui fer ús, desenvolupant la capacitat crítica, creativa i innovadora.',
          ],
        },
      },
      {
        codi: 'CE6',
        numero: 6,
        textLiteral: 'Comunicar i representar, de forma individual i col·lectiva conceptes, procediments i resultats matemàtics utilitzant el llenguatge oral, escrit, gràfic, multimodal, en diferents formats i la terminologia matemàtica adequada, per donar significat i permanència a les idees matemàtiques.',
        criterisPerCicle: {
          inicial: [
            '6.1 Seleccionar el llenguatge matemàtic bàsic present en la vida quotidiana donant-li significat.',
            '6.2 Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o justificant la solució obtinguda de forma verbal, amb l’ajuda del gest o de la representació.',
          ],
          mitja: [
            '6.1 Reconèixer i usar llenguatge matemàtic present en el seu entorn donant-li significat.',
            '6.2 Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o justificant la solució obtinguda de forma verbal, amb l’ajuda del gest, la representació gràfica.',
          ],
          superior: [
            '6.1 Interpretar i usar llenguatge matemàtic adequat donant-li significat.',
            '6.2 Representar conceptes, procediments i resultats matemàtics utilitzant diferents eines i formes de representació, inclosa la digital, per visualitzar idees i estructurar processos.',
            '6.3 Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o argumentant la solució obtinguda de forma verbal, amb l’ajuda del gest, la representació gràfica i també la representació digital.',
          ],
        },
      },
      {
        codi: 'CE7',
        numero: 7,
        textLiteral: 'Desenvolupar destreses personals que ajudin a identificar i gestionar emocions, aprenent de l\'error i afrontant les situacions d\'incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques.',
        criterisPerCicle: {
          inicial: [
            '7.1 Reconèixer les pròpies emocions en abordar nous reptes matemàtics essent proactiu en la cerca de possibles solucions, demanant ajuda només després d’un primer intent.',
            '7.2 Expressar actituds positives davant de nous reptes matemàtics, com ara la predisposició i la receptivitat, entenent l’error com una oportunitat d’aprenentatge.',
          ],
          mitja: [
            '7.1 Identificar les pròpies emocions en abordar nous reptes matemàtics essent proactiu en la cerca de possibles solucions, demanant ajuda, si cal, formulant clarament la pregunta.',
            '7.2 Mostrar actituds positives davant de nous reptes matemàtics, com ara l’esforç i la flexibilitat, entenent l’error com una oportunitat d’aprenentatge.',
          ],
          superior: [
            '7.1 Regular les pròpies emocions i desenvolupar l’autoconfiança per abordar nous reptes matemàtics, identificant les pròpies fortaleses i superant les debilitats.',
            '7.2 Mantenir actituds positives davant de nous reptes matemàtics, com ara la perseverança i la flexibilitat, entenent l’error com una oportunitat d’aprenentatge.',
          ],
        },
      },
      {
        codi: 'CE8',
        numero: 8,
        textLiteral: 'Desenvolupar destreses socials, participant activament en els equips de treball i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.',
        criterisPerCicle: {
          inicial: [
            '8.1 Participar en el treball en equip, tant en entorn presencial com virtual, escoltant a les altres persones reconeixent les seves aportacions, en situacions on es comparteixi i construeixi coneixement matemàtic de manera conjunta.',
          ],
          mitja: [
            '8.1 Col·laborar en el treball en equip, tant en entorn presencial com virtual, assumint-ne responsabilitats per a construir coneixement matemàtic.',
            '8.2 Implicar-se amb el grup, amb empatia i respecte, compartint les pròpies opinions, maneres de fer, estratègies i pensaments tot escoltant i reconeixent les aportacions de les altres persones per enriquir l’aprenentatge propi i col·lectiu.',
          ],
          superior: [
            '8.1 Col·laborar i aportar estratègies i raonaments matemàtics en el treball en equip, tant en entorn presencial com virtual, construint coneixement matemàtic de manera conjunta.',
            '8.2 Equilibrar les necessitats personals amb les del grup, des de l\'empatia i el respecte, reconeixent la diversitat i el valor de les aportacions de les altres persones per generar nou aprenentatge matemàtic, tant individual com col·lectiu.',
          ],
        },
      },
    ],
  },

  llengua: {
    id: 'llengua',
    nomOficial: 'Llengua Catalana i Literatura / Llengua Castellana',
    nomNormalitzat: 'llengua',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l’alumnat i la realitat plurilingüe i pluricultural per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics i culturals i valorar aquesta diversitat com a font de riquesa cultural.',
        criterisPerCicle: {
          inicial: [
            '1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció d’algunes expressions d’ús quotidià.',
            '1.2 Detectar i rebutjar, de manera acompanyada i en contextos senzills i propers, alguns prejudicis i estereotips lingüístics, de gènere i culturals molt freqüents.',
            '1.3 Descriure i valorar la pluralitat lingüística de l’entorn com a font de riquesa cultural, a partir de l’observació i la identificació de la realitat pròxima.',
          ],
          mitja: [
            '1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació d’algunes expressions d’ús quotidià.',
            '1.2 Detectar i rebutjar, amb autonomia creixent i en contextos senzills i propers, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.',
            '1.3 Descriure i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat de l’entorn.',
          ],
          superior: [
            '1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació de les característiques fonamentals de les del seu entorn geogràfic, així com alguns trets dels dialectes i llengües familiars de l’alumnat.',
            '1.2 Detectar i rebutjar, amb autonomia creixent i en contextos diversos, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.',
            '1.3 Descriure, analitzar i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Comprendre i interpretar textos orals i multimodals, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals i de contingut bàsics per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.',
        criterisPerCicle: {
          inicial: [
            '2.1 Extreure informació rellevant de produccions oral i multimodals relacionats amb situacions d’aprenentatge i la vida quotidiana de l’aula.',
            '2.2 Reconèixer, de forma acompanyada, el tema, idees principals i missatges explícits de textos orals i multimodals. Iniciar-se, també de forma acompanyada, en la valoració del contingut i de la forma (elements no verbals).',
          ],
          mitja: [
            '2.1 Comprendre i extreure informació rellevant de produccions orals i multimodals relacionades amb situacions d’aprenentatge i la vida quotidiana de l’aula.',
            '2.2 Reconèixer en produccions orals i multimodals idees principals i secundàries, els missatges explícits i els implícits més senzills. Progressar, de manera acompanyada, en la valoració crítica del contingut i de la forma (elements no verbals).',
          ],
          superior: [
            '2.1 Extreure i interpretar informació rellevant de produccions orals i multimodals formals provinents de diferents mitjans i situacions.',
            '2.2 Reconèixer en produccions orals i multimodals formals les idees principals i les secundàries, els missatges explícits i implícits, valorar-ne el contingut i la forma (elements no verbals).',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments, emocions i conceptes, construir coneixement i establir vincles personals.',
        criterisPerCicle: {
          inicial: [
            '3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa propera (vivències, fets i aprenentatges), amb planificació acompanyada, adaptant el to de veu i el gest a la situació, i utilitzant recursos no verbals elementals i elements de suport.',
            '3.2 Participar en interaccions orals espontànies i en les situacions comunicatives habituals del context escolar, respectant les normes d’interacció oral, mostrant interès i respecte quan parlen els altres i iniciant-se en l’ús d’estratègies d\'escolta activa.',
          ],
          mitja: [
            '3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa coneguda, amb planificació acompanyada, ajustant el discurs i adaptant el to de veu i el gest a la situació, i usant recursos no verbals i elements de suport.',
            '3.2 Participar en interaccions orals espontànies i reglades, aportant idees i respectant les dels altres, així com les normes bàsiques de la cortesia lingüística i aplicant estratègies d\'escolta activa.',
          ],
          superior: [
            '3.1 Produir textos orals i multimodals de manera autònoma, coherent i fluida, amb preparació prèvia, en contextos formals senzills amb adequació de l’entonació, el to de veu i el gest a la situació i ús correcte de recursos verbals i no verbals amb suports audiovisuals.',
            '3.2 Participar en interaccions orals espontànies i reglades, i respectar les normes de la cortesia lingüística, integrant en el propi discurs les opinions i punts de vista dels altres participants, i utilitzant el registre adequat i aplicant estratègies d\'escolta activa i de gestió conversacional.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per construir coneixement, i respondre a necessitats i interessos comunicatius diversos.',
        criterisPerCicle: {
          inicial: [
            '4.1 Llegir textos propers, de la vida quotidiana, dels mitjans de comunicació i textos escolars, de forma silenciosa i en veu alta, amb fluïdesa suficient (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).',
            '4.2 Comprendre textos escrits i multimodals propers, adequats al desenvolupament cognitiu, amb l’ajuda d’elements gràfics i paratextuals bàsics, a través de la identificació del sentit global i informació rellevant i emprant, de forma guiada, estratègies bàsiques de comprensió.',
            '4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals senzills.',
          ],
          mitja: [
            '4.1 Llegir textos progressivament complexos relacionats amb la vida quotidiana, els mitjans de comunicació i textos escolars, de fets i esdeveniments d’interès general, de manera silenciosa i en veu alta, amb fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).',
            '4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, i distingir idees principals i secundàries i també estratègies bàsiques de comprensió de forma progressivament autònoma.',
            '4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, iniciant-se en l’avaluació de la seva fiabilitat.',
          ],
          superior: [
            '4.1 Llegir tot tipus de textos de manera silenciosa i en veu alta amb bona fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).',
            '4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d\'elements gràfics, textuals i paratextuals, utilitzant l’estructura i el format de cada gènere textual, i també estratègies bàsiques de comprensió, més enllà de la interpretació literal.',
            '4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, avaluant la seva qualitat, la fiabilitat i la seva idoneïtat en funció del propòsit de lectura.',
          ],
        },
      },
      {
        codi: 'CE5',
        numero: 5,
        textLiteral: 'Produir textos escrits i multimodals, amb adequació, coherència i cohesió, i aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.',
        criterisPerCicle: {
          inicial: [
            '5.1 Redactar textos escrits i multimodals propers i viscuts, des de les diferents etapes del procés evolutiu de l\'escriptura, de manera acompanyada, per a un destinatari i amb una intenció concreta, amb adequació, coherència, cohesió i correcció adaptades al moment evolutiu (ortografia natural o de base).',
            '5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos amb acompanyament, de manera individual o grupal.',
          ],
          mitja: [
            '5.1 Redactar textos escrits i multimodals, propers, viscuts i escolars, de manera progressivament autònoma, a través de la selecció del model discursiu que millor respongui a la situació comunicativa, amb adequació, coherència i cohesió, iniciant-se en l\'ús de les normes gramaticals i ortogràfiques més senzilles.',
            '5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos de manera progressivament autònoma, amb ús de bastides si s’escau, de manera individual o grupal.',
          ],
          superior: [
            '5.1 Redactar textos escrits i multimodals, de tipus divers, amb suports puntuals, a través de la selecció del model discursiu que millor respongui a cada situació comunicativa, progressant en l\'ús de les normes gramaticals i ortogràfiques bàsiques, amb adequació, coherència, cohesió i correcció lingüística.',
            '5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos, de forma autònoma, amb ús de bastides si s’escau, de manera individual o grupal.',
          ],
        },
      },
      {
        codi: 'CE6',
        numero: 6,
        textLiteral: 'Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar aquesta informació en coneixement i comunicar-la de manera creativa.',
        criterisPerCicle: {
          inicial: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.',
            '6.2 Comunicar els resultats d\'un procés d\'investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal.',
            '6.3 Adoptar hàbits d\'ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat.',
          ],
          mitja: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.',
            '6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d\'un procés d\'investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els Objectius de Desenvolupament Sostenible.',
            '6.3 Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l\'accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa.',
          ],
          superior: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.',
            '6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d\'un procés d\'investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social que incloguin els Objectius de Desenvolupament Sostenible.',
            '6.3 Adoptar hàbits d\'ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa.',
          ],
        },
      },
      {
        codi: 'CE7',
        numero: 7,
        textLiteral: 'Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s\'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.',
        criterisPerCicle: {
          inicial: [
            '7.1 Llegir de manera autònoma textos de diferents autors i autores que s\'adeqüin als seus gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.',
            '7.2 Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar-se en una comunitat lectora.',
          ],
          mitja: [
            '7.1 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s\'adeqüin als seus gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la seva identitat lectora.',
            '7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i sentir-se membre d’una comunitat lectora.',
          ],
          superior: [
            '7.1 Llegir de manera autònoma textos de diversos autors i autores que s\'adeqüin als seus gustos i interessos, seleccionats amb criteri propi, progressant en la construcció de la seva identitat lectora.',
            '7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, per mitjans analògics i digitals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i sentir-se membre d’una comunitat lectora.',
          ],
        },
      },
      {
        codi: 'CE8',
        numero: 8,
        textLiteral: 'Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals, per reconèixer la literatura com a manifestació artística i font de plaer, coneixement i inspiració per a la creació de textos d’intenció literària.',
        criterisPerCicle: {
          inicial: [
            '8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, descobrint de manera acompanyada els elements essencials de l’obra i establint relacions elementals entre els textos i amb altres manifestacions artístiques i culturals.',
            '8.2 Produir textos individuals o col·lectius amb intenció literària, segons les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, en diferents suports, i complementant-los amb altres llenguatges artístics.',
          ],
          mitja: [
            '8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, relacionant-los en funció de temes i aspectes elementals del gènere literari, i interpretant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera acompanyada.',
            '8.2 Produir textos individuals o col·lectius amb intenció literària, de manera acompanyada, emprant algun recurs literari i recreant de manera personal els models donats, en diferents suports, i complementant-los amb altres llenguatges artístics.',
          ],
          superior: [
            '8.1 Escoltar i llegir de manera acompanyada textos literaris adequats a la seva edat, d’autors i autores reconeguts, relacionant-los en funció dels temes i aspectes elementals del gènere literari, i interpretant-los, valorant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera progressivament autònoma.',
            '8.2 Produir, de manera progressivament autònoma, textos individuals o col·lectius amb intenció literària, emprant diversitat de recursos literaris de manera original, en diferents suports, i complementant-los amb altres llenguatges artístics.',
          ],
        },
      },
      {
        codi: 'CE9',
        numero: 9,
        textLiteral: 'Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals, a partir de processos de comprensió i producció de textos orals, escrits, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d’aquests processos.',
        criterisPerCicle: {
          inicial: [
            '9.1 Formular conclusions elementals sobre la construcció de paraules, frases i textos utilitzant l’ordre adequat i la concordança dels mots en una frase a partir de l’experimentació amb les paraules.',
            '9.2 Revisar i millorar les diferents produccions, escrites, orals i multimodals, de manera acompanyada i usant la terminologia lingüística bàsica adequada.',
          ],
          mitja: [
            '9.1 Formular conclusions elementals sobre el funcionament de la llengua fent especial atenció a la concordança, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció i comprensió de textos en contextos significatius.',
            '9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera acompanyada, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada.',
          ],
          superior: [
            '9.1 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua de manera acompanyada, formulant hipòtesis i buscant exemples similars i contraris, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció o comprensió de textos en contextos significatius.',
            '9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera progressivament autònoma, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada.',
          ],
        },
      },
      {
        codi: 'CE10',
        numero: 10,
        textLiteral: 'Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a traves de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge, i posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les propies pràctiques comunicatives.',
        criterisPerCicle: {
          inicial: [
            '10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies elementals per a l’escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes.',
          ],
          mitja: [
            '10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes.',
          ],
          superior: [
            '10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives.',
          ],
        },
      },
    ],
  },

  artistica: {
    id: 'artistica',
    nomOficial: 'Educació Artística',
    nomNormalitzat: 'artistica',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Descobrir propostes artístiques de diferents cultures, èpoques i estils, mitjançant la percepció i la vivència, per desenvolupar la curiositat, el respecte i el gaudi.',
        criterisPerCicle: {
          inicial: [
            '1.1 Descobrir obres de manifestacions culturals i artístiques de diferents gèneres i estils, èpoques i cultures amb visió de perspectiva de gènere, evidenciant interès, curiositat i gaudi cap a aquestes, a través de la percepció i la vivència.',
            '1.2 Descriure manifestacions culturals i artístiques en diferents contextos a partir de l\'exploració de les característiques amb actitud oberta i interès.',
          ],
          mitja: [
            '1.1 Reconèixer obres de manifestacions culturals i artístiques de diferents gèneres i estils, èpoques i cultures amb visió de perspectiva de gènere, evidenciant interès, curiositat i gaudi cap a aquestes, a través de la percepció i la vivència.',
            '1.2 Descriure manifestacions culturals i artístiques en diferents contextos a partir de l\'exploració de les característiques amb actitud oberta i interès, establint relacions entre elles.',
          ],
          superior: [
            '1.1 Distingir i valorar obres de manifestacions culturals i artístiques de diferents gèneres i estils, èpoques i cultures amb visió de perspectiva de gènere, evidenciant interès, curiositat i gaudi cap a aquestes, a través de la percepció i la vivència.',
            '1.2 Analitzar manifestacions culturals i artístiques en diferents contextos a partir de l\'exploració de les seves característiques establint relacions entre elles i valorant la diversitat que les genera.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Investigar i analitzar diferents manifestacions culturals i artístiques i els seus contextos, emprant diversos canals i mitjans d’accés a la informació, per desenvolupar el pensament propi, la identitat cultural i l\'esperit crític.',
        criterisPerCicle: {
          inicial: [
            '2.1 Utilitzar de forma col·laborativa les estratègies treballades per a la cerca de manifestacions culturals i artístiques, a través de canals i mitjans d\'accés a la informació.',
            '2.2 Identificar múltiples lectures, tècniques i/o elements de diferents manifestacions culturals i artístiques que formen part del patrimoni de diversos entorns, i trobar diferències i similituds entre elles amb respecte i interès.',
            '2.3 Identificar i expressar les sensacions i emocions produïdes per diferents manifestacions culturals i artístiques de manera respectuosa i dialogant.',
          ],
          mitja: [
            '2.1 Usar estratègies de forma personal i/o col·laborativa per a la cerca de manifestacions culturals i artístiques, a través de canals i mitjans d\'accés a la informació.',
            '2.2 Interpretar i compartir múltiples lectures de diferents manifestacions culturals i artístiques que formen part del patrimoni de diversos entorns, analitzant ne els elements i les tècniques que les caracteritzen, amb actitud d\'interès, diàleg i respecte.',
            '2.3 Identificar i compartir les sensacions, emocions i evocacions produïdes per diferents manifestacions culturals i artístiques de manera respectuosa i dialogant.',
          ],
          superior: [
            '2.1 Desenvolupar estratègies de forma personal i/o col·laborativa per a la cerca de manifestacions culturals i artístiques, a través de canals i mitjans d\'accés a la informació.',
            '2.2 Comparar i compartir múltiples lectures de diferents manifestacions culturals i artístiques que formen part del patrimoni de diversos entorns, analitzant els elements i les tècniques utilitzades que les caracteritzen i desenvolupant criteris de valoració propis, amb actitud oberta, de diàleg i de respecte.',
            '2.3 Valorar i compartir les sensacions i emocions i evocacions produïdes per diferents manifestacions culturals i artístiques, atenent el seu context i relacionant-les de manera inclusiva amb la pròpia identitat cultural de manera respectuosa i dialogant.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Experimentar i crear amb les possibilitats del so, la imatge, el cos i els mitjans digitals i multimodals, mitjançant activitats i experiències que incorporin l’aprenentatge autoregulat per expressar i comunicar coneixements, idees, sentiments i emocions.',
        criterisPerCicle: {
          inicial: [
            '3.1 Experimentar algunes possibilitats expressives i comunicatives del cos i de diferents eines d\'expressió dels llenguatges artístics, a través de l’aplicació pràctica, mostrant confiança en les pròpies capacitats.',
            '3.2 Expressar idees, coneixements, sentiments i emocions amb creacions pròpies fent servir aprenentatges dels referents artístics treballats.',
            '3.3 Compartir creacions personals, evidenciant empatia i respecte envers les dels altres i acceptant-ne les diferents lectures i interpretacions.',
          ],
          mitja: [
            '3.1 Experimentar algunes possibilitats expressives i comunicatives del cos i de diferents eines d\'expressió dels llenguatges artístics, a través de l’aplicació pràctica, amb curiositat, interès i afany de superació.',
            '3.2 Expressar idees, coneixements, sentiments i emocions amb creacions pròpies fent servir aprenentatges dels referents artístics treballats.',
            '3.3 Documentar i compartir creacions personals, evidenciant empatia i respecte per les dels altres i acceptant-ne les diferents lectures i interpretacions.',
          ],
          superior: [
            '3.1 Experimentar algunes possibilitats expressives i comunicatives del cos i de diferents eines d\'expressió dels llenguatges artístics, a través de l’aplicació pràctica, amb curiositat, interès i afany de superació.',
            '3.2 Produir creacions personals adaptades a una finalitat específica mitjançant l\'expressió d\'idees, sentiments i emocions utilitzant aprenentatges dels referents artístics treballats.',
            '3.3 Documentar i compartir creacions personals, evidenciant empatia i respecte per les dels altres i acceptant-ne les diferents lectures i interpretacions.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Dissenyar, elaborar i difondre creacions culturals i artístiques col·laboratives, assumint diferents rols, posant en valor el procés, per desenvolupar la creativitat, el sentit de pertinença i arribar a un resultat final.',
        criterisPerCicle: {
          inicial: [
            '4.1 Participar en el procés de disseny de produccions culturals i creacions artístiques col·laboratives treballant en la consecució d\'un resultat final que compleixi uns objectius acordats mitjançant un enfocament coeducatiu, basat en la igualtat i la perspectiva de gènere, i en el respecte a la diversitat cultural.',
            '4.2 Participar activament, experimentant diferents rols en el procés de creació, utilitzant elements de diferents llenguatges artístics, mostrant interès i respecte.',
            '4.3 Compartir les experiències creatives, gaudint del resultat final obtingut, identificant les parts del procés creatiu realitzat i valorant les opinions i sensacions dels altres.',
          ],
          mitja: [
            '4.1 Col·laborar en el procés de disseny de produccions culturals i creacions artístiques treballant en la consecució d\'un resultat final que compleixi uns objectius acordats mitjançant un enfocament coeducatiu basat en la igualtat i la perspectiva de gènere, i en el respecte a la diversitat cultural.',
            '4.2 Participar activament, coneixent i experimentant diferents rols en el procés de creació, usant elements de diferents llenguatges artístics, mostrant interès i respecte.',
            '4.3 Documentar i compartir les experiències creatives, gaudint del resultat final obtingut, descrivint les parts del procés creatiu i els rols establerts, valorant les opinions i sensacions dels altres, mitjançant un enfocament coeducatiu, basat en la igualtat, i el respecte a la diversitat cultural.',
          ],
          superior: [
            '4.1 Planificar els processos de disseny de produccions culturals i creacions artístiques col·laboratives treballant en la consecució d\'un resultat final que compleixi uns objectius acordats mitjançant un enfocament coeducatiu basat en la igualtat i la perspectiva de gènere i en el respecte a la diversitat cultural.',
            '4.2 Implicar-se i participar activament, assumint i experimentant diferents rols en el procés de creació, fent servir elements de diferents llenguatges artístics, exercint responsabilitat i mostrant respecte.',
            '4.3 Documentar i compartir les experiències creatives, gaudint del resultat final obtingut, descrivint les parts del procés creatiu i els rols establerts, valorant les opinions i sensacions dels altres, mitjançant un enfocament coeducatiu, basat en la igualtat, i el respecte a la diversitat cultural.',
          ],
        },
      },
    ],
  },

  fisica: {
    id: 'fisica',
    nomOficial: 'Educació Física',
    nomNormalitzat: 'fisica',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Resoldre situacions motrius diverses de forma eficaç i creativa, articulant capacitats i habilitats motrius per a donar resposta a projectes i pràctiques d’activitats físiques de la vida quotidiana.',
        criterisPerCicle: {
          inicial: [
            '1.1 Experimentar diferents maneres de donar resposta a projectes i pràctiques d’activitats físiques variades individuals i col·lectives, valorant-ne la consecució.',
            '1.2 Adoptar decisions eficaces en la pràctica d’activitats físiques individuals i de col·laboració amb l’ús d’estratègies conegudes.',
            '1.3 Emprar capacitats i habilitats motrius pròpies per a resoldre situacions motrius millorant progressivament el control corporal.',
          ],
          mitja: [
            '1.1 Desenvolupar projectes i pràctiques d’activitats físiques variades individuals i col·lectives, establint reptes possibles d’aconseguir, planificant les accions i valorant-ne la consecució tot identificant en què es pot millorar.',
            '1.2 Adoptar decisions eficaces en la pràctica d’activitats físiques individuals, de cooperació, de col·laboració, d’oposició i de col·laboració-oposició amb l’ús d’estratègies conegudes i modificades.',
            '1.3 Emprar capacitats i habilitats motrius pròpies i apreses de manera eficaç per a resoldre situacions motrius millorant progressivament el control i el domini corporal.',
          ],
          superior: [
            '1.1 Desenvolupar projectes i pràctiques d’activitats físiques variades individuals i col·lectives, establint reptes possibles d’aconseguir, planificant les accions tot introduint canvis durant el procés per a assolir-los, si cal.',
            '1.2 Prendre decisions eficaces en la pràctica d’activitats físiques individuals, de cooperació, de col·laboració, d’oposició i de col·laboració-oposició amb l’ús d’estratègies conegudes, modificades i inèdites.',
            '1.3 Emprar capacitats i habilitats motrius pròpies i apreses de manera eficaç i creativa per a resoldre situacions motrius millorant progressivament el control i la coordinació corporal.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Desenvolupar un estil de vida actiu i saludable, incorporant la pràctica habitual d’activitats físiques i altres comportaments beneficiosos per a la salut durant la vida quotidiana per a adquirir d’hàbits que contribueixin al benestar físic, mental i social.',
        criterisPerCicle: {
          inicial: [
            '2.1 Identificar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut.',
            '2.2 Evitar conductes de risc, reconeixent els possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana.',
          ],
          mitja: [
            '2.1 Incorporar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut valorant-ne la seva contribució al benestar físic, mental i social.',
            '2.2 Evitar conductes de risc, anticipant els possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana, aplicant protocols d’actuació bàsics en cas d’accidents o lesions.',
          ],
          superior: [
            '2.1 Integrar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut justificant-ne la seva contribució al benestar físic, mental i social i els perjudicis de no fer-ho.',
            '2.2 Adoptar mesures de seguretat i de prevenció d’accidents com a resultat de la presa de consciència dels possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana, aplicant protocols d’actuació i tècniques bàsiques de primers auxilis en cas d’accidents o lesions.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Prendre part en activitats motrius individuals i col·lectives, de joc i d’expressió i comunicació corporal per a integrar-les en el repertori motriu i afavorir les relacions interpersonals.',
        criterisPerCicle: {
          inicial: [
            '3.1 Participar activament en els jocs i en activitats col·lectives senzilles d’expressió i comunicació corporal pròpies de l’entorn proper gaudint de la seva pràctica, tot afavorint la seva pervivència.',
            '3.2 Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere.',
            '3.3 Comunicar vivències, emocions i idees a través de manifestacions expressives senzilles utilitzant els recursos expressius del propi cos.',
          ],
          mitja: [
            '3.1 Participar activament en els jocs i en activitats col·lectives elaborades d’expressió i comunicació corporal pròpies de l’entorn proper i d’altres llocs del món gaudint de la seva pràctica, tot afavorint les relacions interpersonals.',
            '3.2 Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere identificant i rebutjant comportaments discriminatoris.',
            '3.3 Comunicar vivències, emocions i idees a través de manifestacions expressives elaborades utilitzant els recursos expressius del propi cos.',
          ],
          superior: [
            '3.1 Participar activament en els jocs i en activitats col·lectives elaborades d’expressió i comunicació corporal pròpies de l’entorn proper i d’altres llocs del món gaudint de la seva pràctica, tot afavorint la seva difusió.',
            '3.2 Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere identificant i rebutjant comportaments discriminatoris i estereotips de gènere, fent-ne sensibilització per evitar-ne la seva reproducció.',
            '3.3 Comunicar vivències, emocions i idees a través de manifestacions expressives elaborades de manera creativa utilitzant els recursos expressius del propi cos.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Valorar l’entorn com a espai de pràctica d’activitats físiques i d’ocupació del temps de lleure, utilitzant-lo de manera respectuosa i responsable per a participar de la seva conservació i millora.',
        criterisPerCicle: {
          inicial: [
            '4.1 Practicar algun tipus d’activitat física vinculada al barri, poble o ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure.',
            '4.2 Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure fent-ne un ús respectuós.',
          ],
          mitja: [
            '4.1 Practicar activitats físiques variades vinculades al barri, poble o ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure.',
            '4.2 Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure, contribuint a la seva conservació utilitzant els espais, els materials i les instal·lacions de manera respectuosa i responsable.',
          ],
          superior: [
            '4.1 Practicar activitats físiques variades vinculades al barri, poble o ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure identificant les possibilitats que ofereixen els diferents entorns.',
            '4.2 Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure, contribuint a la seva conservació utilitzant els espais, els materials i les instal·lacions de manera respectuosa i responsable i de les mesures que cal prendre per minimitzar-ne les afectacions.',
          ],
        },
      },
      {
        codi: 'CE5',
        numero: 5,
        textLiteral: 'Mostrar comportaments i actituds empàtiques i inclusives en la pràctica d’activitats físiques, emprant habilitats socials i processos d’autoregulació per a fomentar la convivència.',
        criterisPerCicle: {
          inicial: [
            '5.1 Participar en activitats físiques percebent les emocions i els sentiments propis i de les altres persones, controlant les emocions pròpies negatives que hi puguin aparèixer fomentant la convivència.',
            '5.2 Respectar les normes de funcionament de la classe, les regles de les activitats practicades, els espais i els materials emprats en els contextos de pràctica motriu a l’escola.',
            '5.3 Reconèixer que en la pràctica d’activitats físiques tothom és diferent.',
            '5.4 Desenvolupar habilitats socials a través de la participació en contextos de pràctica motriu a l’escola, iniciant-se en la resolució de conflictes.',
            '5.5 Mostrar una actitud de rebuig vers a actuacions contràries a la convivència en la pràctica d’activitats físiques.',
          ],
          mitja: [
            '5.1 Participar en activitats físiques reconeixent les emocions i els sentiments propis i de les altres persones, autoregulant el propi comportament i les emocions negatives que hi puguin aparèixer fomentant la convivència.',
            '5.2 Respectar les normes consensuades de funcionament de la classe, les regles de les activitats practicades, els espais i els materials emprats en els contextos de pràctica motriu a l’escola.',
            '5.3 Valorar les diferències individuals de tothom en la pràctica d’activitats físiques com a un enriquiment personal i col·lectiu.',
            '5.4 Desenvolupar habilitats socials a través de la participació en contextos de pràctica motriu a l’escola, utilitzant estratègies de resolució de conflictes.',
            '5.5 Rebutjar qualsevol tipus d’actuacions contràries a la convivència en la pràctica d’activitats físiques.',
          ],
          superior: [
            '5.1 Comprendre les conductes, les emocions i els sentiments propis i de les altres persones autoregulant el propi comportament i les emocions negatives que hi puguin aparèixer, expressant-les de forma assertiva fomentant la convivència.',
            '5.2 Respectar les normes consensuades de funcionament de la classe, les regles de les activitats practicades, contribuint a la seva creació, modificació i millora, els espais i els materials emprats en els contextos de pràctica motriu a l’escola.',
            '5.3 Valorar les diferències individuals de tothom en la pràctica d’activitats físiques com a un enriquiment personal i col·lectiu mostrant una actitud crítica amb els estereotips dels models corporals en els mitjans de comunicació i la publicitat.',
            '5.4 Mostrar habilitats socials en la resolució de conflictes de manera assertiva i respecte per la diversitat de tot tipus en contextos de pràctica motriu a l’escola i en la societat.',
            '5.5 Rebutjar críticament qualsevol tipus d’actuacions contràries a la convivència en la pràctica d’activitats físiques i a la societat.',
          ],
        },
      },
    ],
  },

  estrangera: {
    id: 'estrangera',
    nomOficial: 'Llengua Estrangera',
    nomNormalitzat: 'estrangera',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Comprendre la diversitat lingüística i cultural a partir del reconeixement de les llengües de l\'alumnat i la realitat plurilingüe, pluricultural i intercultural, per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics, i valorar aquesta diversitat com a font de riquesa cultural.',
        criterisPerCicle: {
          inicial: [
            '1.1 Participar amb respecte en la comunicació intercultural, identificant i analitzant, de forma guiada, les discriminacions, els prejudicis i els estereotips més comuns, en situacions quotidianes i habituals.',
            '1.2 Reconèixer i valorar la diversitat lingüística i cultural relacionada amb la llengua estrangera, identificant els seus elements culturals i lingüístics elementals.',
          ],
          mitja: [
            '1.1 Participar amb respecte en situacions interculturals, identificant i comparant semblances i diferències elementals entre llengües i cultures, i mostrant rebuig davant discriminacions, prejudicis i estereotips de qualsevol tipus en contextos comunicatius quotidians i habituals.',
            '1.2 Reconèixer, comprendre i valorar la diversitat lingüística i cultural pròpia de països on es parla la llengua estrangera com a font d\'enriquiment personal, identificant elements culturals i lingüístics elementals que fomentin la cultura de la pau.',
            '1.3 Seleccionar i aplicar, de forma guiada, estratègies bàsiques per a la comprensió dels aspectes més rellevants de la diversitat lingüística i cultural.',
          ],
          superior: [
            '1.1 Participar amb estima i respecte en situacions interculturals, construint vincles entre les diferents llengües i cultures, i mostrant rebuig davant discriminacions, prejudicis i estereotips de qualsevol tipus en contextos comunicatius quotidians i habituals.',
            '1.2 Reconèixer, comprendre i valorar la diversitat lingüística i cultural pròpia de països on es parla la llengua estrangera com a font d\'enriquiment personal, identificant elements culturals i lingüístics bàsics que fomentin la sostenibilitat i la cultura de la pau.',
            '1.3 Seleccionar i aplicar, de forma guiada, estratègies bàsiques per a la comprensió de la diversitat lingüística i cultural.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Comprendre i interpretar textos orals i multimodals breus i senzills, en la llengua estàndard, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals i de contingut bàsics, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.',
        criterisPerCicle: {
          inicial: [
            '2.1 Reconèixer i comprendre paraules i expressions habituals en textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, expressats de forma entenedora, clara, senzilla i directa, en llengua estàndard i en diferents suports.',
            '2.2 Seleccionar i aplicar de forma guiada estratègies elementals per captar la idea global i identificar elements específics amb ajuda d\'elements lingüístics i no lingüístics del context, en situacions comunicatives quotidianes i de rellevància per a l\'alumnat.',
          ],
          mitja: [
            '2.1 Reconèixer i comprendre paraules, frases així com el sentit global de textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, així com de textos de ficció adequats a el nivell de desenvolupament de l’alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.',
            '2.2 Seleccionar i aplicar de forma guiada estratègies adequades en situacions comunicatives quotidianes i de rellevància per a l\'alumnat per captar el sentit global i processar informacions explícites en textos breus i senzills sobre temes familiars.',
          ],
          superior: [
            '2.1 Reconèixer i interpretar el sentit global, així com paraules i frases específiques de textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i àmbits pròxims a la pròpia experiència, així com de textos literaris adequats al nivell de desenvolupament de l\'alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.',
            '2.2 Seleccionar i aplicar de forma guiada estratègies i coneixements adequats en situacions comunicatives quotidianes i de rellevància per a l\'alumnat per captar el sentit global i processar informacions explícites en textos diversos.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.',
        criterisPerCicle: {
          inicial: [
            '3.1 Expressar oralment frases curtes amb informació bàsica sobre assumptes quotidians i de rellevància per a l\'alumnat, utilitzant de forma guiada recursos verbals i no verbals, a partir de models i estructures prèviament presentats i parant atenció al ritme, l\'accentuació i l\'entonació.',
            '3.2 Seleccionar i aplicar de forma guiada estratègies bàsiques per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
            '3.3 Participar, de forma guiada, en situacions interactives elementals sobre temes quotidians, preparats prèviament, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia.',
            '3.4 Seleccionar i utilitzar, de forma guiada i en entorns propers, estratègies elementals per saludar, acomiadar-se i presentar-se; expressar missatges senzills i breus, i formular i contestar preguntes bàsiques per a la comunicació.',
          ],
          mitja: [
            '3.1 Expressar oralment frases curtes amb informació bàsica sobre assumptes quotidians i de rellevància per a l\'alumnat, utilitzant de forma guiada recursos verbals i no verbals, parant atenció al ritme, l\'accentuació i l\'entonació.',
            '3.2 Seleccionar i aplicar de forma guiada estratègies per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
            '3.3 Participar en situacions interactives d\'intercanvis d\'informació breus i senzills sobre temes quotidians, de rellevància personal i pròxims a la seva experiència, preparats prèviament, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia i respecte per la cortesia lingüística i l\'etiqueta digital.',
            '3.4 Seleccionar i utilitzar, de forma guiada i en situacions quotidianes, estratègies elementals per saludar, acomiadar-se i presentar-se, expressar missatges breus i formular i contestar preguntes senzilles.',
          ],
          superior: [
            '3.1 Expressar oralment textos breus i senzills, prèviament preparats, sobre assumptes quotidians i de rellevància per a l\'alumnat, utilitzant de forma guiada recursos verbals i no verbals, i usant formes i estructures bàsiques i d\'ús freqüent.',
            '3.2 Seleccionar i aplicar de forma guiada coneixements i estratègies per preparar i produir textos adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant, amb ajuda, recursos físics o digitals en funció de la tasca i les necessitats de cada moment.',
            '3.3 Participar en situacions interactives d\'intercanvis d\'informació breus i senzills sobre temes quotidians, de rellevància personal i pròxims a la pròpia experiència, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia i respecte per la cortesia lingüística i l\'etiqueta digital, així com per les diferents necessitats, idees i motivacions dels interlocutors.',
            '3.4 Seleccionar i utilitzar, de forma guiada i en situacions quotidianes, estratègies elementals per saludar, acomiadar-se i presentar-se, formular i contestar preguntes senzilles, expressar missatges, i iniciar i acabar la comunicació.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per adquirir i construir coneixement, i respondre a necessitats i interessos comunicatius diversos.',
        criterisPerCicle: {
          inicial: [
            '4.1 Reconèixer i comprendre paraules i expressions habituals en textos escrits i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, expressats de forma entenedora, clara, senzilla i directa, i en llengua estàndard.',
            '4.2 Seleccionar i aplicar, de forma guiada, estratègies elementals en situacions comunicatives quotidianes i de rellevància per a l\'alumnat que permetin captar la idea global i identificar elements específics amb ajuda d\'elements lingüístics i no lingüístics.',
          ],
          mitja: [
            '4.1 Reconèixer i comprendre el sentit global, així com paraules i frases prèviament indicades en textos escrits i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la seva experiència, així com de textos de ficció adequats a el nivell de desenvolupament de l\'alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.',
            '4.2 Seleccionar i aplicar, de forma guiada, estratègies adequades en situacions comunicatives quotidianes i de rellevància per a l\'alumnat que permetin captar el sentit global i processar informacions explícites en textos breus i senzills sobre temes familiars.',
          ],
          superior: [
            '4.1 Reconèixer i comprendre el sentit global, així com paraules i frases específiques de textos escrits i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i àmbits pròxims a la seva experiència, així com de textos literaris adequats al nivell de desenvolupament de l\'alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.',
            '4.2 Seleccionar i aplicar, de forma guiada, estratègies i coneixements adequats en situacions comunicatives quotidianes i de rellevància per a l\'alumnat que permetin captar el sentit global i processar informacions explícites en textos diversos.',
          ],
        },
      },
      {
        codi: 'CE5',
        numero: 5,
        textLiteral: 'Produir textos escrits i multimodals amb adequació, coherència i cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma, i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.',
        criterisPerCicle: {
          inicial: [
            '5.1 Escriure paraules, expressions conegudes i frases, sobre assumptes quotidians i de rellevància personal per a l\'alumnat, a partir de models, i amb una finalitat específica, a través d\'eines analògiques i digitals, utilitzant estructures i lèxic elemental.',
            '5.2 Seleccionar i aplicar de forma guiada estratègies bàsiques per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
          ],
          mitja: [
            '5.1 Redactar textos breus i senzills, sobre assumptes quotidians i de rellevància personal per a l\'alumnat, amb adequació a la situació comunicativa proposada, a partir de models, i a través d\'eines analògiques i digitals, utilitzant estructures i lèxic elemental.',
            '5.2 Seleccionar i aplicar de forma guiada estratègies per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
          ],
          superior: [
            '5.1 Organitzar i redactar textos breus i senzills, sobre assumptes quotidians i freqüents, de rellevància personal per a l\'alumnat i pròxims a la seva experiència, prèviament preparats, amb adequació a la situació comunicativa proposada, a través d\'eines analògiques i digitals, i usant estructures i lèxic bàsic d\'ús comú.',
            '5.2 Seleccionar i aplicar de forma guiada coneixements i estratègies per preparar i produir textos adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant amb ajuda recursos físics o digitals en funció de la tasca i les necessitats de cada moment.',
          ],
        },
      },
      {
        codi: 'CE6',
        numero: 6,
        textLiteral: 'Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació i adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar-la en coneixement i comunicar-la de manera creativa.',
        criterisPerCicle: {
          inicial: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.',
            '6.2 Comunicar els resultats d\'un procés d\'investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal.',
            '6.3 Adoptar hàbits d\'ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat.',
          ],
          mitja: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.',
            '6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d\'un procés d\'investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els Objectius de Desenvolupament Sostenible.',
            '6.3 Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l\'accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa.',
          ],
          superior: [
            '6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.',
            '6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d\'un procés d\'investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social que incloguin els Objectius de Desenvolupament Sostenible.',
            '6.3 Adoptar hàbits d\'ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa.',
          ],
        },
      },
      {
        codi: 'CE7',
        numero: 7,
        textLiteral: 'Seleccionar i llegir de manera autònoma obres diverses atenent els propis gustos i interessos, compartint les experiències de lectura, per iniciar la construcció de la identitat lectora, fomentar el gust per la lectura com a font de plaer i gaudir de la seva dimensió social.',
        criterisPerCicle: {
          inicial: [
            '7.1 Llegir de manera autònoma textos de diferents autors i autores que s\'adeqüin als propis gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.',
            '7.2 Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, en el marc de la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar-se en una comunitat lectora.',
          ],
          mitja: [
            '7.1 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s\'adeqüin als propis gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la identitat lectora.',
            '7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, en el marc de la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i que permetin sentir-se membre d’una comunitat lectora.',
          ],
          superior: [
            '7.1 Llegir de manera autònoma textos de diversos autors i autores que s\'adeqüin als propis gustos i interessos, seleccionats amb criteri propi, progressant en la construcció de la identitat lectora.',
            '7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, per mitjans analògics i digitals, en el marc de la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i que permetin sentir-se membre d’una comunitat lectora.',
          ],
        },
      },
      {
        codi: 'CE8',
        numero: 8,
        textLiteral: 'Mediar entre diferents llengües en situacions predictibles, utilitzant estratègies i coneixements per processar i transmetre informació bàsica i senzilla, per tal de facilitar la comunicació.',
        criterisPerCicle: {
          inicial: [
            '8.1 Interpretar i explicar informació bàsica de conceptes, comunicacions i textos breus i senzills, de manera guiada, en situacions de comunicació de diversitat lingüística, social i cultural, mostrant empatia i interès per entendre’s en un entorn immediat.',
          ],
          mitja: [
            '8.1 Interpretar i explicar textos, conceptes i comunicacions breus i senzilles, de manera guiada, en situacions de comunicació de diversitat lingüística, social i cultural, mostrant empatia i interès per entendre’s en el seu entorn més proper.',
            '8.2 Seleccionar i aplicar, de forma guiada, estratègies elementals que ajudin a crear ponts i que facilitin la comprensió i producció d\'informació, així com la comunicació fluida, fent servir, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
          ],
          superior: [
            '8.1 Inferir i comunicar textos, conceptes i comunicacions breus i senzilles, de manera guiada, en situacions de comunicació diversitat lingüística i cultural, mostrant respecte i empatia per les persones interlocutores, per les llengües emprades i interès per participar en la solució de malentesos en l’entorn proper.',
            '8.2 Seleccionar i aplicar, de forma guiada, estratègies bàsiques que ajudin a crear ponts i facilitin la comprensió i producció d\'informació i la comunicació fluida, adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, fent servir, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.',
          ],
        },
      },
      {
        codi: 'CE9',
        numero: 9,
        textLiteral: 'Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals i a partir de processos de comprensió i producció de textos orals, escrits i multimodals, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d\'aquests processos.',
        criterisPerCicle: {
          inicial: [
            '9.1 Comparar i contrastar similituds i diferències evidents entre diferents llengües, reflexionant, de manera guiada, sobre aspectes elementals del seu funcionament.',
            '9.2 Identificar i aplicar, de forma guiada, els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d\'aprendre la llengua estrangera, amb suport d\'altres participants i de suports analògics i digitals.',
            '9.3 Identificar i explicar, de manera guiada, progressos i dificultats elementals d\'aprenentatge de la llengua estrangera.',
          ],
          mitja: [
            '9.1 Comparar i contrastar les similituds i diferències entre diferents llengües, reflexionant, de manera guiada, sobre aspectes bàsics del seu funcionament.',
            '9.2 Utilitzar i diferenciar, de forma guiada, els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d\'aprendre la llengua estrangera, amb suport d\'altres participants i de suports analògics i digitals.',
            '9.3 Identificar, registrar i aplicar, de manera guiada, els progressos i dificultats elementals d\'aprenentatge de la llengua estrangera, reconeixent els aspectes que ajuden a millorar i participant en activitats d\'autoavaluació i coavaluació.',
          ],
          superior: [
            '9.1 Comparar i contrastar les similituds i diferències entre diferents llengües, reflexionant, de manera progressivament autònoma, sobre aspectes bàsics del seu funcionament.',
            '9.2 Utilitzar i diferenciar de forma progressivament autònoma els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d\'aprendre la llengua estrangera, amb suport d\'altres participants i de suports analògics i digitals.',
            '9.3 Identificar, registrar i utilitzar, de manera guiada, els progressos i dificultats d\'aprenentatge de la llengua estrangera, reconeixent els aspectes que ajuden a millorar i realitzant activitats d\'autoavaluació i coavaluació.',
          ],
        },
      },
      {
        codi: 'CE10',
        numero: 10,
        textLiteral: 'Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.',
        criterisPerCicle: {
          inicial: [
            '10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, i tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l\'acompanyament i planificació necessaris, estratègies elementals per a l\'escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes.',
          ],
          mitja: [
            '10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula, mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, i tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l\'acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes.',
          ],
          superior: [
            '10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, i tenint en compte la perspectiva de gènere.',
            '10.2 Utilitzar, amb l\'acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives.',
          ],
        },
      },
    ],
  },

  valors: {
    id: 'valors',
    nomOficial: 'Educació en Valors Cívics i Ètics',
    nomNormalitzat: 'valors',
    competencies: [
      {
        codi: 'CE1',
        numero: 1,
        textLiteral: 'Identificar aspectes vinculats a la pròpia identitat i a les qüestions ètiques relatives a un mateix, en el seu entorn proper, buscant la informació a l’abast i interpretant-la de forma reflexiva i crítica per promoure l’autoconeixement i el desenvolupament de l’autonomia moral.',
        criterisPerCicle: {
          inicial: [
            '1.1 Reconèixer les pròpies capacitats i trets personals promovent l’autoconeixement en situacions de l\'aula.',
          ],
          mitja: [
            '1.1 Reconèixer les pròpies capacitats i trets personals afavorint la construcció de la pròpia identitat amb autonomia creixent.',
          ],
          superior: [
            '1.1 Reconèixer les pròpies capacitats físiques, sensorials i cognitives tenint en compte els punts forts i febles de la pròpia identitat promovent l’autoconeixement.',
            '1.2 Identificar trets personals que facilitin el procés de construcció de la pròpia identitat amb responsabilitat i autonomia.',
            '1.3 Interpretar críticament la informació de l’entorn afavorint la construcció de la pròpia identitat.',
            '1.4 Mostrar conductes que evidenciïn autonomia moral en un context social amb gran diversitat d’interessos.',
            '1.5 Mostrar una actitud responsable, respectuosa i assertiva amb relació a problemàtiques diverses i riscos derivats de l’ús acrític i de l’abús de les xarxes socials, com a factors de prevenció de situacions de ciberassetjament entre iguals i en el context educatiu.',
          ],
        },
      },
      {
        codi: 'CE2',
        numero: 2,
        textLiteral: 'Actuar i interactuar atenent a normes i valors cívics i ètics, reflexionant sobre la seva importància per a la vida individual i col·lectiva, per aplicar-los de manera efectiva i argumentada en diferents contextos i amb la finalitat de promoure una convivència pacífica, respectuosa, democràtica i justa.',
        criterisPerCicle: {
          inicial: [
            '2.1 Interactuar amb els altres adoptant conductes cíviques de respecte i empatia.',
          ],
          mitja: [
            '2.1 Interactuar amb els altres adoptant conductes cíviques i democràtiques en un marc de respecte i diàleg.',
          ],
          superior: [
            '2.1 Investigar sobre la naturalesa social i política de l’ésser humà en el marc d’una convivència democràtica.',
            '2.2 Interactuar amb els altres adoptant conductes cíviques i democràtiques en un marc de respecte, empatia i consideració adequada de les relacions afectives que s’estableixin.',
            '2.3 Manifestar actituds alineades amb valors com la justícia, la pau i el rebuig a la violència, la solidaritat i el respecte per les minories i les diferents identitats humanes i personals en el seu entorn.',
            '2.4 Analitzar el paper de les institucions públiques, dels organismes internacionals i les organitzacions no governamentals en la promoció de la pau, la solidaritat i la cooperació entre nacions a través del diàleg argumentatiu.',
            '2.5 Reflexionar sobre la defensa d’una efectiva igualtat de gènere, i sobre el problema de la violència contra les dones i la conducta sexista, a través de l’anàlisi de les mesures de prevenció de la desigualtat, la violència i la discriminació per raó de gènere i orientació sexual.',
          ],
        },
      },
      {
        codi: 'CE3',
        numero: 3,
        textLiteral: 'Interpretar les relacions sistèmiques entre l’individu, la societat i la natura, així com la importància de l’acció local i les seves conseqüències en l’entorn proper, per desenvolupar un paper actiu i conseqüent amb el respecte, la cura i la protecció de les persones i del planeta.',
        criterisPerCicle: {
          inicial: [
            '3.1 Desenvolupar actituds de respecte i cura de la natura i dels éssers vius de l\'entorn proper.',
          ],
          mitja: [
            '3.1 Realitzar accions d\'estalvi de recursos i respecte per la natura en l\'àmbit escolar i familiar.',
          ],
          superior: [
            '3.1 Identificar propostes per afavorir l’aturada del canvi climàtic a partir de l\'anàlisi de les problemàtiques en el context local i argumentant el deure ètic de protegir i tenir cura de la natura.',
            '3.2 Realitzar accions que afavoreixen l’assoliment dels Objectius de Desenvolupament Sostenible a través d’acords i actuacions individuals i col·lectives.',
            '3.3 Desenvolupar actituds i valors de compromís basats en el respecte, cura i protecció de les persones, dels animals i del planeta, a través d’accions individuals, a nivell local, vinculades al consum responsable i de productes de proximitat, l’ús sostenible de l’aigua, de l’energia, de la mobilitat, la gestió dels residus i el respecte per la diversitat ètnica-cultural.',
          ],
        },
      },
      {
        codi: 'CE4',
        numero: 4,
        textLiteral: 'Desenvolupar l’autoestima i l’estima de l’entorn, a partir de la identificació, expressió i gestió de les emocions i sentiments propis i reconeixent i valorant els dels altres, amb la finalitat d’assolir una actitud empàtica i respectuosa envers un mateix, els altres i la natura.',
        criterisPerCicle: {
          inicial: [
            '4.1 Expressar de manera respectuosa les pròpies emocions en les activitats escolars.',
          ],
          mitja: [
            '4.1 Regular adequadament les pròpies emocions i mostrar una actitud empàtica amb els companys/es.',
          ],
          superior: [
            '4.1 Expressar de manera respectuosa les pròpies emocions manifestant una ajustada autoestima en activitats creatives individuals i de grup.',
            '4.2 Regular adequadament les pròpies emocions a partir de la identificació d’aquestes i les dels altres, en activitats de reflexió tant individuals com col·lectives.',
            '4.3 Manifestar una actitud empàtica i respectuosa envers un mateix, els altres i la natura, en activitats realitzades en l’entorn escolar.',
            '4.4 Identificar i prendre consciència de fets i accions dirigides a membres de la comunitat educativa que, si persisteixen en el temps, poden derivar en relacions abusives, situacions d\'assetjament i maltractament entre iguals en el context educatiu i, en aquest cas, prendre-hi partit des d’un posicionament proactiu com a factor de prevenció.',
          ],
        },
      },
    ],
  },
};

/**
 * Funció auxiliar per cercar l'àrea curricular exacta segons el nom triat pel docent
 */
export function getAreaOficial(subjectName: string): AreaCurricularOficial {
  const s = (subjectName || '').toLowerCase();
  if (s.includes('medi')) return DECRET_175_DATA.medi;
  if (s.includes('matemàt') || s.includes('matemat')) return DECRET_175_DATA.matematiques;
  if (s.includes('estrangera') || s.includes('anglès') || s.includes('angles')) return DECRET_175_DATA.estrangera;
  if (s.includes('artístic') || s.includes('artist')) return DECRET_175_DATA.artistica;
  if (s.includes('físic') || s.includes('fisic')) return DECRET_175_DATA.fisica;
  if (s.includes('valor') || s.includes('ètic') || s.includes('etic')) return DECRET_175_DATA.valors;
  return DECRET_175_DATA.llengua; // Default llengua
}

/**
 * Obtenir els criteris de cicle literalment
 */
export function getCriterisPerCicleLiteral(
  competencia: CompetenciaEspecificaOficial,
  cycleName: string
): string[] {
  const c = (cycleName || '').toLowerCase();
  if (c.includes('inicial') || c.includes('1r') || c.includes('2n')) {
    return competencia.criterisPerCicle.inicial;
  }
  if (c.includes('mitjà') || c.includes('mitja') || c.includes('3r') || c.includes('4t')) {
    return competencia.criterisPerCicle.mitja;
  }
  return competencia.criterisPerCicle.superior;
}
