import { env } from "../config/env.js";
import {
  AgeBand,
  Badge,
  CardQuestion,
  Story,
  Tutorial,
  User,
  sequelize
} from "../models/index.js";
import { hashPassword } from "../utils/password.js";

async function seedAgeBands() {
  const rows = [
    { code: "7_11", label: "7-11 ans", minAge: 7, maxAge: 11, tone: "soft" },
    { code: "12_14", label: "12-14 ans", minAge: 12, maxAge: 14, tone: "realiste" },
    { code: "15_17", label: "15-17 ans", minAge: 15, maxAge: 17, tone: "direct" }
  ];

  for (const row of rows) {
    await AgeBand.findOrCreate({ where: { code: row.code }, defaults: row });
  }

  return AgeBand.findAll();
}

async function seedAdmin() {
  const [admin] = await User.findOrCreate({
    where: { email: env.adminSeedEmail },
    defaults: {
      role: "admin",
      email: env.adminSeedEmail,
      passwordHash: await hashPassword(env.adminSeedPassword)
    }
  });

  return admin;
}

async function seedTeenUser(ageBands) {
  const teenBand = ageBands.find((band) => band.code === "15_17");
  if (!teenBand) return null;

  const [teenUser] = await User.findOrCreate({
    where: { pseudo: "ado_demo" },
    defaults: {
      role: "child",
      pseudo: "ado_demo",
      passwordHash: await hashPassword("AdoDemo2026!"),
      ageBandId: teenBand.id
    }
  });

  return teenUser;
}

async function seedBadges() {
  const badges = [
    {
      code: "first_step",
      name: "Premier pas",
      description: "Tu as termine ton premier module.",
      iconKey: "badge-first-step",
      criteria: { minModules: 1 }
    },
    {
      code: "reflex_start",
      name: "Bon reflexe",
      description: "Tu as reussi au moins 60% au jeu Cartes Reflexes.",
      iconKey: "badge-reflex",
      criteria: { reflexPercent: 60 }
    },
    {
      code: "guardian_mode",
      name: "Mode Gardien",
      description: "Tu as fini les 3 jeux MVP.",
      iconKey: "badge-guardian",
      criteria: { completedGames: 3 }
    }
  ];

  for (const badge of badges) {
    await Badge.findOrCreate({ where: { code: badge.code }, defaults: badge });
  }
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureMinWords(text, minWords = 520) {
  let result = text;
  const extraParagraph =
    "A ce moment de l histoire, le plus important est de ralentir, respirer, verifier ce qui est vrai, puis demander de l aide a un adulte de confiance. Ce reflexe protege mieux que les decisions prises sous la pression, la peur ou la confusion.";

  while (countWords(result) < minWords) {
    result += `\n\n${extraParagraph}`;
  }

  return result;
}

function buildLongStoryContent({
  hero,
  setting,
  trigger,
  firstSignal,
  escalation,
  turningPoint,
  safeActions,
  supportNetwork,
  conclusion
}) {
  const text = [
    `${hero} vit dans ${setting}. Un soir ordinaire, ${trigger}. Sur le moment, tout semble banal, presque amusant, mais ${hero} sent un petit doute. Ce doute n est pas un probleme: c est souvent le premier signal qui aide a rester en securite. Dans la formation, on rappelle que les histoires presque vraies ressemblent beaucoup au quotidien. Elles ne servent pas a faire peur, elles servent a montrer des choix concrets. ${hero} decide donc d observer avant d agir, meme si la curiosite est forte.`,
    `La situation avance par petites etapes. ${firstSignal}. Rien de spectaculaire, juste des details qui paraissent etranges: un message trop presse, une demande trop personnelle, un ton qui change d un coup. Quand cela arrive, beaucoup de jeunes pensent qu ils exagerent. Pourtant, prendre ses impressions au serieux est utile. Un inconfort leger aujourd hui peut eviter un gros probleme demain. ${hero} se rappelle une regle simple: quand un echange demande d aller vite, il faut ralentir. Quand un echange veut du secret absolu, il faut verifier avec un adulte.`,
    `${hero} en parle d abord a un ami proche. L ami ecoute, mais n a pas toutes les reponses. Ensemble, ils relisent les messages, regardent les parametres de confidentialite, et notent les elements qui posent question. Cette methode est importante: observer, noter, puis agir. Sans preuve, on oublie vite les details. Avec des captures, on peut expliquer clairement la situation. Dans les ateliers, cette etape aide les jeunes a se sentir moins seuls et plus maitres de leurs decisions.`,
    `Ensuite vient ${escalation}. La pression augmente, parfois avec des phrases qui cherchent a culpabiliser: "si tu refuses, c est que tu ne fais pas confiance", "si tu en parles, tu vas avoir des problemes", "tout le monde fait comme ca". Ces phrases sont des leviers de manipulation. Elles visent a isoler la personne et a lui faire perdre ses reperes. ${hero} reconnait ce mecanisme et decide de ne pas repondre dans l urgence. A la place, ${hero} prend une pause, boit un verre d eau, coupe les notifications dix minutes, puis revient avec une tete plus claire.`,
    `${turningPoint}. Ce moment change tout: la situation passe d un malaise flou a un plan d action clair. ${hero} comprend que proteger son compte et sa vie privee n est pas dramatiser, c est prendre soin de soi. Il n y a aucune honte a demander de l aide. La honte appartient a ceux qui mettent la pression, pas a la personne qui se protege. Cette idee est centrale pour les jeunes: etre prudent, ce n est pas etre faible, c est etre responsable.`,
    `Le plan concret commence. ${safeActions}. Chaque action parait simple, mais l ensemble construit une vraie protection. Bloquer coupe le canal de pression. Signaler alerte la plateforme. Changer les reglages limite la diffusion. Mettre un mot de passe solide renforce la securite. Informer un adulte transforme une peur solitaire en resolution accompagnee. ${hero} ne fait pas tout parfaitement du premier coup, et ce n est pas grave. L important est d avancer et de garder la trace de ce qui est fait.`,
    `Dans les jours suivants, ${hero} observe encore quelques tentatives de contact indirect. Cette phase est frequente. Les personnes malveillantes testent de nouveaux canaux: faux compte, groupe parallele, message par un tiers. Comme ${hero} est prepare, chaque tentative est geree sans panique. Il y a une regle utile: ne pas negocier avec la pression. On applique le meme protocole, encore et encore: preuve, blocage, signalement, adulte de confiance.`,
    `${supportNetwork}. Le reseau d adultes ne sert pas a punir, il sert a proteger et a expliquer les options. Selon les contextes, cela peut inclure l educateur, le referent scolaire, un parent, ou un professionnel de prevention. Le fait d etre accompagne permet aussi de retablir l estime de soi. Beaucoup de jeunes pensent qu ils ont mal agi. En realite, ils ont surtout besoin d outils clairs et de personnes stables autour d eux.`,
    `Avec le recul, ${hero} comprend que cette histoire n est pas seulement un danger evite. C est un apprentissage durable. La prochaine fois, les signaux faibles seront vus plus tot. Les reglages seront verifies avant un incident. Les echanges suspects seront identifies plus vite. Et surtout, ${hero} saura qu il est possible de parler sans etre juge. Ce point est essentiel pour la prevention des risques numeriques.`,
    `${conclusion} L histoire se termine sur une idee simple: le numerique peut rester un espace de jeu, d apprentissage et de lien, a condition de garder des limites claires. Dire non est un droit. Se proteger est normal. Demander de l aide est une competence. Et chaque jeune peut developper ces reflexes, pas a pas, sans culpabilisation.`
  ].join("\n\n");

  return ensureMinWords(text, 520);
}

async function seedStories(ageBands, adminId) {
  const byCode = Object.fromEntries(ageBands.map((a) => [a.code, a.id]));
  const stories = [
    {
      title: "Le club des etoiles et la photo trop precise",
      slug: "club-etoiles-photo-trop-precise",
      theme: "image",
      summary: "Une photo joyeuse revele sans le vouloir des infos privees d une classe.",
      content: buildLongStoryContent({
        hero: "Mina",
        setting: "un quartier calme ou son club de dessin se retrouve le mercredi",
        trigger: "Mina partage une photo du club avec un tableau d horaires visible derriere elle",
        firstSignal: "un compte inconnu commente en citant exactement le lieu et l heure du prochain atelier",
        escalation: "des captures de la photo circulent dans un autre groupe avec des blagues lourdes",
        turningPoint: "quand la petite soeur de Mina recoit un message d un inconnu qui connait le nom du club",
        safeActions: "Elle supprime la publication, demande les suppressions, rend le compte prive, et remplace la photo par un dessin",
        supportNetwork: "Mina en parle a l animatrice du club, puis a son pere, qui l aide a signaler les comptes",
        conclusion: "Mina continue de publier ses creations, mais en verifiant toujours l arriere plan avant chaque envoi."
      }),
      whatHappens: "Une image peut divulguer des details de lieu, d horaires ou d habitudes.",
      howToProtect: "Verifier le decor, cacher les infos sensibles, publier en prive et avec accord.",
      whoToTell: "Un parent, un educateur, un animateur ou un adulte referent du groupe.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["7_11"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le dragon gentil du chat de jeu",
      slug: "dragon-gentil-chat-jeu",
      theme: "inconnus",
      summary: "Un joueur tres sympa demande peu a peu des informations personnelles.",
      content: buildLongStoryContent({
        hero: "Noe",
        setting: "une petite equipe qui joue a un jeu de construction apres les devoirs",
        trigger: "Noe rencontre un joueur nomme DragonGentil qui gagne vite sa confiance",
        firstSignal: "DragonGentil demande le prenom complet, puis l ecole, en disant que c est pour etre amis pour de vrai",
        escalation: "le joueur insiste et promet des cadeaux si Noe donne son adresse",
        turningPoint: "quand DragonGentil envoie une photo trouvee en ligne en pretendant que c est sa maison",
        safeActions: "Noe bloque le compte, coupe le chat prive, garde des captures, et active la liste d amis restreinte",
        supportNetwork: "Noe montre les messages a sa mere et a l educateur de l etude",
        conclusion: "Noe garde le plaisir du jeu en equipe, mais il reserve ses infos personnelles a sa vraie vie hors ligne."
      }),
      whatHappens: "Une relation en ligne peut sembler gentille mais cacher une intention de collecte d infos.",
      howToProtect: "Ne pas partager ecole, adresse, telephone, activer la confidentialite des messages.",
      whoToTell: "Un parent, un frere ou une soeur adulte, un educateur ou un enseignant de confiance.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["7_11"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le secret du groupe arc en ciel",
      slug: "secret-groupe-arc-en-ciel",
      theme: "secrets",
      summary: "Un secret demande dans un groupe prive devient une source de pression.",
      content: buildLongStoryContent({
        hero: "Lina",
        setting: "une classe ou tout le monde partage des dessins et des blagues dans un groupe prive",
        trigger: "un camarade lance un defi: dire un secret personnel pour rester dans le groupe",
        firstSignal: "les premiers secrets racontes sont ensuite repetes en dehors du groupe",
        escalation: "un membre menace d exclure Lina si elle refuse de raconter quelque chose de tres intime",
        turningPoint: "quand Lina voit un secret d un autre enfant moque par des eleves d une autre classe",
        safeActions: "Elle refuse le defi, quitte temporairement le groupe, et garde des captures des menaces",
        supportNetwork: "Lina parle a la maitresse, puis a son oncle, et un cadre clair est rappele a toute la classe",
        conclusion: "Lina revient dans des espaces numeriques plus sains, ou le respect passe avant le spectacle."
      }),
      whatHappens: "Le secret force n est pas un jeu: c est une pression qui peut blesser longtemps.",
      howToProtect: "Refuser, sortir du groupe, garder des preuves et demander un cadre adulte.",
      whoToTell: "Maitresse, parent, educateur, animateur periscolaire.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["7_11"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le defi viral du college",
      slug: "defi-viral-college",
      theme: "pression",
      summary: "Un challenge presente comme drole pousse des eleves a se filmer dans des situations risquee.",
      content: buildLongStoryContent({
        hero: "Yanis",
        setting: "un college ou les trends videos changent chaque semaine",
        trigger: "un defi viral demande de filmer une action humiliante en classe pour gagner des likes",
        firstSignal: "des eleves disent que refuser le defi veut dire etre faible",
        escalation: "un montage cible Yanis avec des messages repetes pour le forcer a participer",
        turningPoint: "quand une video d un autre eleve revient plusieurs mois plus tard dans un nouveau groupe",
        safeActions: "Yanis refuse, signale le contenu, bloque les comptes insistants, et renforce ses reglages de partage",
        supportNetwork: "il contacte son CPE, sa mere et un educateur de quartier pour ne pas rester seul",
        conclusion: "Yanis comprend qu un non clair vaut mieux qu un oui regrette qui laisse une trace durable."
      }),
      whatHappens: "Le groupe utilise la peur d exclusion pour imposer un comportement risque.",
      howToProtect: "Refuser, ne pas negocier, documenter les faits et mobiliser les adultes referents.",
      whoToTell: "CPE, professeur principal, parent, educateur de prevention.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["12_14"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le faux compte de Camille",
      slug: "faux-compte-camille",
      theme: "manipulation",
      summary: "Un faux profil imite une eleve pour recuperer des informations privees.",
      content: buildLongStoryContent({
        hero: "Camille",
        setting: "une classe de quatrieme tres active sur les reseaux",
        trigger: "un compte copie sa photo de profil et contacte ses amis en pretendant etre elle",
        firstSignal: "plusieurs amis recoivent des demandes d infos incoherentes depuis ce faux compte",
        escalation: "le faux profil demande des captures de conversations privees et des photos personnelles",
        turningPoint: "quand Camille est accusee a tort d avoir diffuse une rumeur qu elle n a jamais envoyee",
        safeActions: "Elle declare l usurpation, prouve le vrai compte, change ses mots de passe et active la double verification",
        supportNetwork: "Camille sollicite ses parents, la vie scolaire et une mediatrice numerique",
        conclusion: "Camille transforme l incident en atelier de classe sur l usurpation et la verification des comptes."
      }),
      whatHappens: "L usurpation d identite brouille la confiance et peut creer des conflits rapides.",
      howToProtect: "Verifier les comptes, signaler l usurpation, changer les acces et informer son entourage.",
      whoToTell: "Parents, equipe educative, referent numerique de l etablissement.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["12_14"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le groupe prive qui derape",
      slug: "groupe-prive-derape",
      theme: "insultes",
      summary: "Un groupe ferme devient un espace de moqueries et d insultes ciblees.",
      content: buildLongStoryContent({
        hero: "Ines",
        setting: "une bande de collegiens qui cree un groupe pour partager des memes",
        trigger: "des moqueries deviennent des attaques personnelles contre un eleve absent",
        firstSignal: "les messages passent de blagues a des insultes repetees et captures d ecran",
        escalation: "Ines recoit des pressions pour participer sinon elle serait la prochaine cible",
        turningPoint: "quand un montage humiliant est partage en dehors du groupe et vu par la famille de la victime",
        safeActions: "Ines quitte le groupe, garde les preuves, signale les messages et refuse d alimenter la violence",
        supportNetwork: "elle alerte une adulte de confiance et la conseillere principale d education",
        conclusion: "Ines choisit des espaces ou l humour n est pas une excuse pour blesser."
      }),
      whatHappens: "Le huis clos numerique peut banaliser des violences qui ont des effets reels.",
      howToProtect: "Ne pas relayer, sortir du groupe, signaler et accompagner la personne visee.",
      whoToTell: "CPE, infirmiere scolaire, parent ou educateur.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["12_14"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "La capture qui revient avant le stage",
      slug: "capture-revient-avant-stage",
      theme: "image",
      summary: "Une ancienne capture revient au mauvais moment, juste avant une candidature de stage.",
      content: buildLongStoryContent({
        hero: "Sara",
        setting: "une terminale qui prepare son stage et sa premiere candidature",
        trigger: "une ancienne capture de conversation privee ressort dans un groupe local",
        firstSignal: "des personnes qu elle ne connait pas commentent le contenu hors contexte",
        escalation: "la capture est partagee avec des montages qui deformement ses propos",
        turningPoint: "quand un recruteur potentiel lui pose une question basee sur ce contenu detourne",
        safeActions: "Sara rassemble les preuves, demande les suppressions, ajuste ses comptes et prepare une explication factuelle",
        supportNetwork: "elle sollicite son professeur referent, sa famille et un professionnel du droit numerique",
        conclusion: "Sara reprend le controle de son image en ligne et avance avec une strategie claire."
      }),
      whatHappens: "Une trace ancienne peut reapparaitre et impacter un projet scolaire ou professionnel.",
      howToProtect: "Surveiller ses traces, repondre avec faits, signaler vite et activer ses protections.",
      whoToTell: "Professeur referent, parent, conseiller d orientation, adulte de confiance.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["15_17"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le vocal garde pour faire pression",
      slug: "vocal-garde-pour-pression",
      theme: "pression",
      summary: "Un message vocal prive est conserve et reutilise comme levier de chantage.",
      content: buildLongStoryContent({
        hero: "Nassim",
        setting: "une classe de lycee ou les groupes vocaux tournent en permanence",
        trigger: "Nassim envoie un vocal de confiance a une personne qu il pensait fiable",
        firstSignal: "la personne fait allusion au vocal pour obtenir un service qu il refuse",
        escalation: "le message devient une menace: accepter une demande ou voir le vocal diffuse",
        turningPoint: "quand la menace est ecrite noir sur blanc avec delai impose",
        safeActions: "Nassim ne cede pas, sauvegarde les preuves, bloque les comptes, signale et modifie ses parametres",
        supportNetwork: "il parle a sa soeur, a son professeur principal et a un educateur de prevention",
        conclusion: "Nassim comprend qu un chantage perd de sa force des qu il est expose aux bonnes personnes."
      }),
      whatHappens: "Le chantage cherche l isolement; la transparence avec un adulte casse ce mecanisme.",
      howToProtect: "Ne pas payer ni ceder, documenter la menace, signaler et se faire accompagner.",
      whoToTell: "Famille, equipe educative, adulte ressource, dispositifs d aide numerique.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["15_17"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le compte esport compromis",
      slug: "compte-esport-compromis",
      theme: "securite-compte",
      summary: "Un compte de jeu tres investi est pirate apres reutilisation d un ancien mot de passe.",
      content: buildLongStoryContent({
        hero: "Rayan",
        setting: "un lyceen passionne d esport qui prepare des tournois en ligne",
        trigger: "un ancien mot de passe leak permet l acces non autorise a son compte principal",
        firstSignal: "des connexions inhabituelles apparaissent a des horaires impossibles",
        escalation: "les attaquants changent l email de recuperation et tentent de vendre le compte",
        turningPoint: "quand Rayan constate que ses messages prives sont aussi utilises pour pieger ses amis",
        safeActions: "Il active la double authentification, change tous ses mots de passe et coupe les sessions ouvertes",
        supportNetwork: "il agit avec son pere, un ami technicien et le support officiel de la plateforme",
        conclusion: "Rayan reprend son compte et adopte une hygiene numerique solide pour la suite."
      }),
      whatHappens: "La reutilisation de mot de passe expose plusieurs comptes en cascade.",
      howToProtect: "Mots de passe uniques, double authentification, verification des sessions actives.",
      whoToTell: "Parent, adulte technique de confiance, support officiel de la plateforme.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["15_17"],
      createdBy: adminId,
      updatedBy: adminId
    }
  ];

  for (const story of stories) {
    await Story.upsert(story);
  }
}

async function seedTutorials(ageBands, adminId) {
  const byCode = Object.fromEntries(ageBands.map((a) => [a.code, a.id]));
  const tutorials = [];

  function addTutorials(ageCode, items) {
    for (const item of items) {
      tutorials.push({
        ...item,
        status: "published",
        ageBandId: byCode[ageCode],
        createdBy: adminId,
        updatedBy: adminId
      });
    }
  }

  addTutorials("7_11", [
    {
      title: "Mon mot de passe en mode super heros",
      slug: "7-11-mot-de-passe-super-heros",
      theme: "password",
      content: "Choisis une phrase facile a retenir pour toi, ajoute des chiffres et un symbole. Ne donne jamais ton mot de passe a un copain."
    },
    {
      title: "Mon profil prive pas public",
      slug: "7-11-profil-prive-pas-public",
      theme: "confidentialite",
      content: "Demande a un adulte de verifier les reglages: qui peut voir ton profil, tes photos et t envoyer des messages."
    },
    {
      title: "Photo cool sans infos perso",
      slug: "7-11-photo-cool-sans-infos-perso",
      theme: "image",
      content: "Avant de poster, regarde l arriere plan. Cache ton ecole, ton adresse et les infos sur ton emploi du temps."
    },
    {
      title: "Que faire si un inconnu ecrit",
      slug: "7-11-inconnu-ecrit",
      theme: "inconnus",
      content: "Ne reponds pas seul. Montre le message a un adulte de confiance. Tu peux bloquer le compte et le signaler."
    },
    {
      title: "Dire non a un defi qui gene",
      slug: "7-11-dire-non-defi-gene",
      theme: "pression",
      content: "Si un defi te met mal a l aise, tu as le droit de dire non. Un vrai ami respecte ton choix."
    },
    {
      title: "Mon avatar plutot que ma vraie photo",
      slug: "7-11-avatar-plutot-vraie-photo",
      theme: "identite",
      content: "Utilise un avatar ou un dessin pour proteger ton image. C est amusant et plus prudent."
    },
    {
      title: "Capture d ecran ca voyage",
      slug: "7-11-capture-ecran-voyage",
      theme: "partage",
      content: "Un message prive peut etre capture et partage. Ecris seulement ce que tu accepterais de revoir plus tard."
    },
    {
      title: "Parler a un adulte c est une force",
      slug: "7-11-parler-adulte-force",
      theme: "aide",
      content: "Si tu as peur ou honte, parle quand meme a un adulte. Ce n est pas denoncer, c est te proteger."
    },
    {
      title: "Temps d ecran et pauses malines",
      slug: "7-11-temps-ecran-pauses",
      theme: "bien-etre",
      content: "Fais des pauses toutes les 30 a 45 minutes. Ton cerveau et tes yeux se reposent, tu joues mieux ensuite."
    },
    {
      title: "Regle d or avant de cliquer",
      slug: "7-11-regle-or-avant-cliquer",
      theme: "liens",
      content: "Si un lien te semble bizarre ou trop beau pour etre vrai, ne clique pas. Verifie avec un adulte."
    }
  ]);

  addTutorials("12_14", [
    {
      title: "Mot de passe unique pour chaque appli",
      slug: "12-14-mot-de-passe-unique-appli",
      theme: "password",
      content: "Un mot de passe differents par compte evite l effet domino si une plateforme fuit."
    },
    {
      title: "Active la double authentification",
      slug: "12-14-active-double-auth",
      theme: "securite-compte",
      content: "Ajoute la verification en deux etapes sur tes comptes principaux: reseaux, mail, jeux."
    },
    {
      title: "Regler qui peut te contacter",
      slug: "12-14-regler-qui-contacter",
      theme: "confidentialite",
      content: "Dans les parametres, limite les messages prives aux amis. Coupe les invitations des inconnus."
    },
    {
      title: "Reagir a la pression du groupe",
      slug: "12-14-reagir-pression-groupe",
      theme: "pression",
      content: "Quand le groupe te force, ralentis et prends conseil. Le bon choix n est pas toujours le plus populaire."
    },
    {
      title: "Reconnaitre un faux compte",
      slug: "12-14-reconnaitre-faux-compte",
      theme: "manipulation",
      content: "Vérifie les abonnements, l anciennete du compte et les incoherences avant de faire confiance."
    },
    {
      title: "Partage de photo et consentement",
      slug: "12-14-partage-photo-consentement",
      theme: "image",
      content: "Ne publie jamais la photo d un ami sans son accord. Le consentement est une regle de respect."
    },
    {
      title: "Que faire en cas d insulte en ligne",
      slug: "12-14-insulte-en-ligne",
      theme: "harcelement",
      content: "Ne reponds pas sous la colere. Capture, bloque, signale et informe un adulte."
    },
    {
      title: "Concours, cadeaux et arnaques",
      slug: "12-14-concours-cadeaux-arnaques",
      theme: "arnaques",
      content: "Les faux concours demandent souvent des infos perso. Verifie la source officielle avant de participer."
    },
    {
      title: "Gerer son image numerique",
      slug: "12-14-gerer-image-numerique",
      theme: "identite",
      content: "Ce que tu postes peut rester longtemps. Pense a ton futur toi avant de publier."
    },
    {
      title: "A qui demander de l aide au college",
      slug: "12-14-aide-au-college",
      theme: "aide",
      content: "CPE, prof principal, infirmiere, parents: prepare 3 captures et explique les faits simplement."
    }
  ]);

  addTutorials("15_17", [
    {
      title: "Securiser ses comptes critiques",
      slug: "15-17-securiser-comptes-critiques",
      theme: "securite-compte",
      content: "Commence par mail, banque et reseaux: mots de passe uniques + double auth + verification des sessions."
    },
    {
      title: "Prevenir le doxxing",
      slug: "15-17-prevenir-doxxing",
      theme: "confidentialite",
      content: "Supprime les infos de localisation, limite les bios trop precises et controle ce qui est public."
    },
    {
      title: "Gerer un chantage numerique",
      slug: "15-17-gerer-chantage-numerique",
      theme: "pression",
      content: "Ne paie pas, ne negocie pas. Garde les preuves, signale et alerte rapidement un adulte reference."
    },
    {
      title: "Usurpation de profil que faire",
      slug: "15-17-usurpation-profil",
      theme: "manipulation",
      content: "Documente l usurpation, fais signaler le faux compte en masse et protege tes contacts."
    },
    {
      title: "Cyberharcelement strategie d action",
      slug: "15-17-cyberharcelement-strategie",
      theme: "harcelement",
      content: "Archive les preuves, bloque les canaux, active les filtres et enclenche les relais institutionnels."
    },
    {
      title: "Verifier une info avant de relayer",
      slug: "15-17-verifier-info-avant-relayer",
      theme: "desinformation",
      content: "Compare 2 a 3 sources fiables, regarde la date et l auteur avant de repartager."
    },
    {
      title: "Traces numeriques et orientation",
      slug: "15-17-traces-numeriques-orientation",
      theme: "identite",
      content: "Ton empreinte en ligne peut etre vue pour stage ou alternance. Fais un audit de tes profils publics."
    },
    {
      title: "Sexting consentement et limites",
      slug: "15-17-sexting-consentement-limites",
      theme: "image",
      content: "Le consentement doit etre clair et reversible. Sans consentement, c est une violence."
    },
    {
      title: "Arnaques CPF colis crypto et faux jobs",
      slug: "15-17-arnaques-cpf-colis-crypto-faux-jobs",
      theme: "arnaques",
      content: "Les arnaques jouent sur l urgence et l argent facile. Verifie l organisme avant toute action."
    },
    {
      title: "Plan perso de securite numerique",
      slug: "15-17-plan-perso-securite-numerique",
      theme: "autonomie",
      content: "Definis tes regles: publication, contacts, securite, pause, adultes ressources. Mets le plan a jour tous les 3 mois."
    }
  ]);

  for (const tutorial of tutorials) {
    await Tutorial.upsert(tutorial);
  }
}

async function seedCardQuestions(ageBands) {
  const byCode = Object.fromEntries(ageBands.map((a) => [a.code, a.id]));
  const questions = [
    {
      ageBandId: byCode["7_11"],
      theme: "partage-photo",
      situationText: "Un ami te demande une photo ou on voit ton ecole. Que fais-tu ?",
      optionA: "Je l envoie, c est un ami.",
      optionB: "Je cache les infos sensibles ou je n envoie pas.",
      optionC: "Je la poste publiquement.",
      correctOption: "B",
      explanation: "Bonne reaction: eviter les details qui permettent de te localiser.",
      difficulty: 1
    },
    {
      ageBandId: byCode["7_11"],
      theme: "inconnu",
      situationText: "Quelqu un que tu ne connais pas veut discuter en prive.",
      optionA: "J accepte direct.",
      optionB: "Je donne mon numero.",
      optionC: "Je refuse et j en parle a un adulte.",
      correctOption: "C",
      explanation: "Si tu ne connais pas la personne, le mieux est de ne pas repondre seul.",
      difficulty: 1
    },
    {
      ageBandId: byCode["12_14"],
      theme: "pression",
      situationText: "On te met la pression pour envoyer une photo privee.",
      optionA: "J envoie pour qu on me laisse tranquille.",
      optionB: "Je refuse, je bloque, je garde des preuves.",
      optionC: "Je supprime juste l appli.",
      correctOption: "B",
      explanation: "Refuser + bloquer + garder des captures est la meilleure protection.",
      difficulty: 2
    },
    {
      ageBandId: byCode["12_14"],
      theme: "infos-perso",
      situationText: "Un concours demande ton adresse complete.",
      optionA: "Je donne tout pour participer.",
      optionB: "Je verifie la source et je ne donne pas d info perso sensible.",
      optionC: "Je mets l adresse d un ami.",
      correctOption: "B",
      explanation: "Toujours verifier la fiabilite avant de partager des donnees.",
      difficulty: 2
    },
    {
      ageBandId: byCode["15_17"],
      theme: "harcelement",
      situationText: "Tu recois des messages humiliants repetes.",
      optionA: "Je reponds violemment.",
      optionB: "Je garde des preuves, je bloque et je signale.",
      optionC: "Je ne fais rien.",
      correctOption: "B",
      explanation: "Conserver les preuves aide a agir efficacement avec un adulte/referent.",
      difficulty: 2
    },
    {
      ageBandId: byCode["15_17"],
      theme: "securite-compte",
      situationText: "Tu utilises le meme mot de passe partout.",
      optionA: "Je garde, c est pratique.",
      optionB: "Je cree des mots de passe differents et j active la double authentification.",
      optionC: "Je change seulement le pseudo.",
      correctOption: "B",
      explanation: "Des mots de passe uniques limitent l effet domino apres une fuite.",
      difficulty: 3
    }
  ];

  for (const q of questions) {
    await CardQuestion.findOrCreate({
      where: { situationText: q.situationText },
      defaults: { ...q, isActive: true }
    });
  }
}

async function run() {
  await sequelize.authenticate();
  await sequelize.sync();

  const ageBands = await seedAgeBands();
  const admin = await seedAdmin();
  await seedTeenUser(ageBands);

  await seedBadges();
  await seedStories(ageBands, admin.id);
  await seedTutorials(ageBands, admin.id);
  await seedCardQuestions(ageBands);

  console.log("Seed termine ✅");
  process.exit(0);
}

run().catch((error) => {
  console.error("Seed error", error);
  process.exit(1);
});
