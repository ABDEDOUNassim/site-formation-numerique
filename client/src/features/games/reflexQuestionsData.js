// ─── THÈMES VISUELS ──────────────────────────────────────────────────────────
export const THEME_VISUALS = {
  "partage-photo":   { label: "Photo",     emoji: "📷", accent: "#ff9f1c", soft: "#fff3d9" },
  "inconnu":         { label: "Inconnu",   emoji: "👤", accent: "#457b9d", soft: "#e8f5ff" },
  "pression":        { label: "Pression",  emoji: "😰", accent: "#e76f51", soft: "#ffeae3" },
  "infos-perso":     { label: "Données",   emoji: "🔐", accent: "#2a9d8f", soft: "#e8fff7" },
  "harcelement":     { label: "Respect",   emoji: "🛡️", accent: "#6c5ce7", soft: "#f0ebff" },
  "securite-compte": { label: "Sécurité",  emoji: "🔑", accent: "#0f8b8d", soft: "#e6fbfc" },
  "fake-news":       { label: "Véracité",  emoji: "📰", accent: "#e63946", soft: "#ffeef0" },
  "temps-ecran":     { label: "Équilibre", emoji: "⏱️", accent: "#f4a261", soft: "#fff4eb" },
};

export function getThemeVisual(theme) {
  return THEME_VISUALS[theme] ?? { label: "Réflexe", emoji: "💡", accent: "#0f8b8d", soft: "#e8f6ff" };
}

// ─── BADGES / PALIERS ────────────────────────────────────────────────────────
export const BADGES = [
  {
    id: "debutant",
    minPct: 0,
    emoji: "📱",
    label: "Débutant Numérique",
    color: "#78909c",
    bg: "#eceff1",
    description: "Tu commences ton voyage dans le monde numérique !",
  },
  {
    id: "apprenti",
    minPct: 40,
    emoji: "🌱",
    label: "Apprenti Numérique",
    color: "#43a047",
    bg: "#e8f5e9",
    description: "Tu connais les bases pour te protéger en ligne.",
  },
  {
    id: "explorateur",
    minPct: 60,
    emoji: "⚡",
    label: "Explorateur Numérique",
    color: "#fb8c00",
    bg: "#fff3e0",
    description: "Tu explores le numérique avec de bons réflexes.",
  },
  {
    id: "gardien",
    minPct: 75,
    emoji: "🛡️",
    label: "Gardien Numérique",
    color: "#1e88e5",
    bg: "#e3f2fd",
    description: "Tu protèges ta vie privée et celle de tes amis.",
  },
  {
    id: "champion",
    minPct: 90,
    emoji: "🏆",
    label: "Champion de l'Autonomie",
    color: "#8e24aa",
    bg: "#f3e5f5",
    description: "Tu maîtrises ton identité numérique. Félicitations !",
  },
];

export function getBadgeForScore(score, total) {
  if (!total) return BADGES[0];
  const pct = Math.round((score / total) * 100);
  return [...BADGES].reverse().find((b) => pct >= b.minPct) ?? BADGES[0];
}

// ─── BANQUE LOCALE DE QUESTIONS ──────────────────────────────────────────────
// Utilisée si l'API ne renvoie aucune question (mode hors-ligne / fallback).
// Les questions sont triées par difficulté croissante dans chaque tranche.

export const LOCAL_QUESTIONS = {

  // ── 7-11 ans ─────────────────────────────────────────────────────────────
  "7_11": [
    {
      id: "711_01", theme: "inconnu", difficulty: 1,
      situationText: "Un inconnu sur un jeu te dit qu'il veut t'envoyer un cadeau et te demande ton adresse. Que fais-tu ?",
      optionA: "Je lui donne mon adresse, j'adore les cadeaux !",
      optionB: "Je refuse et j'en parle tout de suite à un adulte de confiance.",
      optionC: "Je lui donne l'adresse de mon école.",
      correctOption: "B",
      explanation: "Sur internet, on ne peut jamais vraiment savoir qui se cache derrière un écran. Ne jamais donner son adresse à un inconnu en ligne.",
    },
    {
      id: "711_02", theme: "infos-perso", difficulty: 1,
      situationText: "Un jeu en ligne te demande ton vrai prénom pour créer ton personnage. Que fais-tu ?",
      optionA: "Je donne mon vrai prénom.",
      optionB: "J'invente un surnom rigolo comme Drago77.",
      optionC: "Je donne le prénom de mon meilleur ami.",
      correctOption: "B",
      explanation: "Un surnom inventé protège ton identité. Personne n'a besoin de ton vrai prénom pour jouer !",
    },
    {
      id: "711_03", theme: "partage-photo", difficulty: 1,
      situationText: "Tu veux envoyer une photo de toi à un ami en ligne. Que dois-tu faire d'abord ?",
      optionA: "Je l'envoie directement, c'est mon ami.",
      optionB: "Je demande la permission à un adulte de ma famille.",
      optionC: "Je la publie partout pour qu'il la voie.",
      correctOption: "B",
      explanation: "Avant de partager une photo sur internet, toujours demander à un adulte de confiance.",
    },
    {
      id: "711_04", theme: "securite-compte", difficulty: 1,
      situationText: "Ton camarade de classe te demande ton mot de passe pour t'aider. Que fais-tu ?",
      optionA: "Je lui donne, c'est mon meilleur ami depuis longtemps.",
      optionB: "Je refuse : un mot de passe, ça ne se partage jamais.",
      optionC: "Je lui donne mais je le change juste après.",
      correctOption: "B",
      explanation: "Un mot de passe est secret, même avec les meilleurs amis. Un vrai ami ne te demandera pas ton mot de passe.",
    },
    {
      id: "711_05", theme: "harcelement", difficulty: 1,
      situationText: "Un élève reçoit des messages méchants dans un groupe de jeu en ligne. Que fais-tu ?",
      optionA: "J'envoie aussi des messages méchants, tout le monde le fait.",
      optionB: "J'ignore, ça ne me concerne pas.",
      optionC: "Je défends mon camarade et j'en parle à un adulte.",
      correctOption: "C",
      explanation: "Face au cyber-harcèlement, rester spectateur c'est aussi un problème. Défends les autres et parle à un adulte.",
    },
    {
      id: "711_06", theme: "pression", difficulty: 2,
      situationText: "Tes amis te montrent une vidéo bizarre qui te met mal à l'aise et veulent que tu la partagés. Que fais-tu ?",
      optionA: "Je la partage pour faire comme tout le monde.",
      optionB: "Je ferme la vidéo et j'en parle à un adulte si ça m'a choqué.",
      optionC: "Je la regarde jusqu'au bout pour avoir l'air cool.",
      correctOption: "B",
      explanation: "Tu n'as pas à regarder ou partager quelque chose qui te met mal à l'aise. Tes propres limites sont importantes !",
    },
    {
      id: "711_07", theme: "infos-perso", difficulty: 2,
      situationText: "Un jeu te demande ton numéro de téléphone pour un code de vérification. Que fais-tu ?",
      optionA: "Je donne mon numéro, c'est pour vérifier mon âge.",
      optionB: "Je demande à un adulte avant de remplir ce champ.",
      optionC: "Je donne le numéro de téléphone de mon école.",
      correctOption: "B",
      explanation: "Ton numéro de téléphone est une donnée personnelle importante. Toujours demander à un adulte avant de le donner.",
    },
    {
      id: "711_08", theme: "securite-compte", difficulty: 2,
      situationText: "Tu as fini d'utiliser un ordinateur de la bibliothèque. Que dois-tu faire avant de partir ?",
      optionA: "Fermer juste l'onglet du navigateur.",
      optionB: "Me déconnecter de tous mes comptes avant de partir.",
      optionC: "Ne rien faire, la session va s'arrêter toute seule.",
      correctOption: "B",
      explanation: "Toujours se déconnecter sur un appareil partagé. Sinon, la personne suivante peut accéder à ton compte.",
    },
    {
      id: "711_09", theme: "partage-photo", difficulty: 2,
      situationText: "Tu reçois une photo qui se moque d'un camarade. Que fais-tu ?",
      optionA: "Je la transfère à tous mes amis, c'est drôle.",
      optionB: "Je ne la transfère pas et j'en parle à un adulte.",
      optionC: "Je la sauvegarde mais je ne la montre qu'à mes proches.",
      correctOption: "B",
      explanation: "Partager une photo qui se moque de quelqu'un, c'est participer au harcèlement. Toujours refuser et en parler à un adulte.",
    },
    {
      id: "711_10", theme: "inconnu", difficulty: 2,
      situationText: "Quelqu'un dans un jeu dit avoir ton âge et veut te rencontrer dans un parc. Que fais-tu ?",
      optionA: "J'accepte, il a l'air sympa et on a le même âge.",
      optionB: "Je refuse et je préviens immédiatement un adulte.",
      optionC: "J'accepte mais je lui donne un faux lieu de rendez-vous.",
      correctOption: "B",
      explanation: "Sur internet, on ne peut jamais vraiment savoir qui est l'autre personne. Ne jamais rencontrer un inconnu du net sans adulte.",
    },
    {
      id: "711_11", theme: "securite-compte", difficulty: 2,
      situationText: "Tu installes une nouvelle appli de jeu. Elle demande d'accéder à la caméra. Que fais-tu ?",
      optionA: "J'accepte sans lire, sinon je ne peux pas jouer.",
      optionB: "Je vérifie si la caméra est vraiment utile pour ce jeu et je demande à un adulte.",
      optionC: "J'accepte puis j'oublie.",
      correctOption: "B",
      explanation: "Une appli doit demander seulement ce qui est nécessaire. En cas de doute, demande toujours à un adulte.",
    },
    {
      id: "711_12", theme: "temps-ecran", difficulty: 2,
      situationText: "Tu joues depuis longtemps et tu te sens fatigué. Quelle est la meilleure idée ?",
      optionA: "Continuer encore une heure pour finir le niveau.",
      optionB: "Faire une pause, boire de l'eau et bouger un peu.",
      optionC: "Regarder des vidéos en plus du jeu.",
      correctOption: "B",
      explanation: "Faire des pauses régulières aide ton corps et ton cerveau à rester en forme.",
    },
    {
      id: "711_13", theme: "partage-photo", difficulty: 3,
      situationText: "Tu veux poster une photo prise devant ton école. Que dois-tu vérifier ?",
      optionA: "Rien, elle est jolie donc je publie.",
      optionB: "Que le nom de l'école, l'adresse ou des infos perso ne soient pas visibles.",
      optionC: "Que mes amis aient bien liké avant.",
      correctOption: "B",
      explanation: "Les détails en arrière-plan peuvent révéler des informations personnelles importantes.",
    },
  ],

  // ── 12-14 ans ────────────────────────────────────────────────────────────
  "12_14": [
    {
      id: "1214_01", theme: "harcelement", difficulty: 1,
      situationText: "Tu vois des captures d'écran d'un camarade moquées dans un groupe WhatsApp. Que fais-tu ?",
      optionA: "Je rigole avec les autres pour m'intégrer au groupe.",
      optionB: "Je quitte le groupe et j'en parle à un adulte de confiance.",
      optionC: "J'envoie d'autres captures pour rester dans la boucle.",
      correctOption: "B",
      explanation: "Rester dans un groupe de harcèlement, c'est y participer. Quitter et en parler à un adulte, c'est du vrai courage.",
    },
    {
      id: "1214_02", theme: "infos-perso", difficulty: 1,
      situationText: "En créant un compte sur un réseau social, on te demande ton adresse, ta ville et ton école. Que fais-tu ?",
      optionA: "Je remplis tout, un profil complet attire plus d'amis.",
      optionB: "Je ne remplis que les champs obligatoires et invente pour le reste.",
      optionC: "Je mets mes vraies infos, c'est uniquement pour mes amis.",
      correctOption: "B",
      explanation: "Moins tu donnes d'informations, mieux tu es protégé. Les champs non obligatoires peuvent toujours rester vides.",
    },
    {
      id: "1214_03", theme: "partage-photo", difficulty: 1,
      situationText: "Ton ami te partage une photo d'une personne dans une situation embarrassante. Que fais-tu ?",
      optionA: "Je la transfère à d'autres amis, c'est hilarant.",
      optionB: "Je signale la photo sur la plateforme et supprime le message.",
      optionC: "Je la sauvegarde sans la montrer à personne.",
      correctOption: "B",
      explanation: "Partager une photo sans permission est illégal. Signaler et ne pas participer, c'est la bonne réaction.",
    },
    {
      id: "1214_04", theme: "securite-compte", difficulty: 1,
      situationText: "Quelqu'un crée un faux compte à ton nom avec tes photos. Que fais-tu ?",
      optionA: "Je crée un autre faux compte pour me venger.",
      optionB: "J'ignore, ça finira par s'arrêter tout seul.",
      optionC: "Je signale le compte à la plateforme et j'en parle à mes parents.",
      correctOption: "C",
      explanation: "L'usurpation d'identité en ligne est un délit. Signaler immédiatement et impliquer un adulte est la bonne démarche.",
    },
    {
      id: "1214_05", theme: "fake-news", difficulty: 2,
      situationText: "Tu lis un article très choquant que tous tes amis partagent. Que fais-tu avant de partager ?",
      optionA: "Je le partage immédiatement car c'est urgent.",
      optionB: "Je vérifie sur d'autres sources fiables avant de partager.",
      optionC: "Je mets 'peut-être faux ?' en commentaire et je partage quand même.",
      correctOption: "B",
      explanation: "Avant de partager une info, vérifie sur plusieurs sources sérieuses. Les fausses nouvelles se propagent très vite.",
    },
    {
      id: "1214_06", theme: "pression", difficulty: 2,
      situationText: "Des amis te mettent la pression pour parler à un inconnu en ligne que tu ne connais pas.",
      optionA: "Je lui parle pour ne pas décevoir mes amis.",
      optionB: "Je refuse : ma sécurité passe avant la pression du groupe.",
      optionC: "Je lui parle en mode incognito pour être discret.",
      correctOption: "B",
      explanation: "Un bon ami ne met jamais en danger. Savoir dire non à la pression du groupe, c'est une vraie force.",
    },
    {
      id: "1214_07", theme: "securite-compte", difficulty: 2,
      situationText: "Tu reçois un message : « Ton compte sera supprimé ! Clique ici pour te connecter. » Que fais-tu ?",
      optionA: "Je clique rapidement pour sauver mon compte.",
      optionB: "Je reconnais un phishing et je ne clique pas.",
      optionC: "Je transmets le lien à un ami pour qu'il vérifie.",
      correctOption: "B",
      explanation: "C'est une technique de phishing. Un vrai service ne te demandera jamais de te connecter via un lien d'urgence.",
    },
    {
      id: "1214_08", theme: "partage-photo", difficulty: 2,
      situationText: "Tu veux publier une photo de groupe de ta classe sur les réseaux. Que dois-tu faire ?",
      optionA: "Je la publie, tout le monde avait l'air content.",
      optionB: "Je demande la permission de chaque personne visible sur la photo.",
      optionC: "Je la publie en floutant les visages au hasard.",
      correctOption: "B",
      explanation: "Chaque personne sur une photo a un droit à l'image. Sans leur accord, tu n'as pas le droit de la publier.",
    },
    {
      id: "1214_09", theme: "harcelement", difficulty: 2,
      situationText: "Quelqu'un publie de fausses rumeurs sur toi en ligne. Que fais-tu ?",
      optionA: "Je réponds publiquement en m'énervant pour défendre ma réputation.",
      optionB: "Je collecte les preuves, signale et en parle à un adulte.",
      optionC: "Je crée des rumeurs sur cette personne pour qu'elle comprenne.",
      correctOption: "B",
      explanation: "Répondre avec colère aggrave la situation. Garder les preuves et impliquer un adulte est la bonne méthode.",
    },
    {
      id: "1214_10", theme: "infos-perso", difficulty: 2,
      situationText: "Pour un concours en ligne, on te demande ta date de naissance complète. Que fais-tu ?",
      optionA: "Je la donne, c'est obligatoire pour les concours.",
      optionB: "Je vérifie d'abord si le site est officiel et fiable.",
      optionC: "Je donne une fausse date sans réfléchir.",
      correctOption: "B",
      explanation: "Les faux concours servent souvent à collecter des données personnelles. Toujours vérifier l'officialité d'un site.",
    },
    {
      id: "1214_11", theme: "temps-ecran", difficulty: 3,
      situationText: "Tu passes beaucoup de temps sur ton téléphone et tu rates des heures de sommeil. Que fais-tu ?",
      optionA: "C'est normal, tout le monde le fait.",
      optionB: "Je mets une heure de coupure et pose le téléphone avant de dormir.",
      optionC: "Je réduis un peu mais continue en cachette.",
      correctOption: "B",
      explanation: "Le manque de sommeil à cause des écrans affecte ta santé et ta concentration. Le cerveau a besoin de se déconnecter.",
    },
    {
      id: "1214_12", theme: "securite-compte", difficulty: 3,
      situationText: "Tu utilises le même mot de passe pour tous tes comptes. Qu'est-ce qui risque de se passer ?",
      optionA: "Rien, c'est plus facile à retenir.",
      optionB: "Si un seul compte est piraté, tous tes autres comptes sont menacés.",
      optionC: "C'est la meilleure stratégie pour ne pas oublier.",
      correctOption: "B",
      explanation: "Un mot de passe unique par compte est essentiel. Utilise un gestionnaire de mots de passe si tu en as trop.",
    },
    {
      id: "1214_13", theme: "inconnu", difficulty: 3,
      situationText: "Un inconnu te propose une collaboration vidéo et te demande une réponse urgente. Tu fais quoi ?",
      optionA: "J'accepte vite pour ne pas rater l'occasion.",
      optionB: "Je vérifie le profil, je demande conseil et je refuse si ce n'est pas clair.",
      optionC: "Je donne d'abord mes infos pour voir ensuite.",
      correctOption: "B",
      explanation: "L'urgence est souvent une technique de pression. Vérifier et prendre du recul protège mieux.",
    },
    {
      id: "1214_14", theme: "fake-news", difficulty: 3,
      situationText: "Une publication dit \"partage sinon ton compte sera bloqué\". Que fais-tu ?",
      optionA: "Je partage immédiatement, c'est peut-être vrai.",
      optionB: "Je ne partage pas et je vérifie l'info sur des sources officielles.",
      optionC: "Je partage juste avec mes proches.",
      correctOption: "B",
      explanation: "Les messages alarmistes sont souvent faux. Vérifie avant de partager.",
    },
    {
      id: "1214_15", theme: "infos-perso", difficulty: 3,
      situationText: "Tu remplis ton profil public. Quelle info vaut mieux éviter ?",
      optionA: "Tes goûts musicaux.",
      optionB: "Ton adresse complète et tes horaires habituels.",
      optionC: "Ton personnage de jeu préféré.",
      correctOption: "B",
      explanation: "Adresse et habitudes peuvent être utilisées contre toi. Garde ces infos privées.",
    },
  ],

  // ── 15-17 ans ────────────────────────────────────────────────────────────
  "15_17": [
    {
      id: "1517_01", theme: "harcelement", difficulty: 1,
      situationText: "Une personne reçoit des centaines de messages haineux sous ses publications. Que fais-tu concrètement ?",
      optionA: "Ce n'est pas mon problème, je ne la connais pas.",
      optionB: "Je soutiens publiquement, signale les messages et l'encourage à porter plainte.",
      optionC: "Je lui conseille de supprimer ses réseaux pour que ça s'arrête.",
      correctOption: "B",
      explanation: "Témoigner du soutien, signaler et orienter vers des recours légaux peut faire une vraie différence pour la victime.",
    },
    {
      id: "1517_02", theme: "infos-perso", difficulty: 1,
      situationText: "Une appli mobile demande l'accès à tes contacts, ta galerie et ta localisation pour fonctionner. Que fais-tu ?",
      optionA: "J'accepte tout pour que l'appli fonctionne bien.",
      optionB: "J'analyse chaque permission et n'accepte que ce qui est strictement nécessaire.",
      optionC: "Je refuse tout systématiquement.",
      correctOption: "B",
      explanation: "Chaque permission doit être justifiée par le service. Une appli de jeu n'a pas besoin de tes contacts.",
    },
    {
      id: "1517_03", theme: "fake-news", difficulty: 1,
      situationText: "Une vidéo montre une personnalité dire quelque chose de choquant. Elle semble très réelle. Que fais-tu ?",
      optionA: "Je la partage immédiatement, c'est scandaleux.",
      optionB: "Je vérifie si c'est un deepfake et consulte des médias reconnus avant toute action.",
      optionC: "Je commente 'honteux' sous la vidéo pour alerter.",
      correctOption: "B",
      explanation: "Les deepfakes sont de plus en plus réalistes. Vérifier les faits avant de réagir ou partager.",
    },
    {
      id: "1517_04", theme: "partage-photo", difficulty: 2,
      situationText: "Tu reçois une image intime de quelqu'un de ton âge que tu connais. Que dois-tu savoir ?",
      optionA: "Regarder ne pose pas de problème si je ne la partage pas.",
      optionB: "Recevoir, conserver ou transmettre ce type d'image est illégal quel que soit l'âge.",
      optionC: "C'est illégal uniquement si je la partage sans la permission de la personne.",
      correctOption: "B",
      explanation: "La loi est claire : conserver ou transmettre des images intimes de mineurs est un délit, même avec consentement.",
    },
    {
      id: "1517_05", theme: "securite-compte", difficulty: 2,
      situationText: "Tu crées un mot de passe pour un compte important. Quel format est le plus sécurisé ?",
      optionA: "Une suite logique de chiffres (ex: 123456789).",
      optionB: "Une phrase avec majuscules, chiffres et symboles (ex: Jeu!Vert@Lune3).",
      optionC: "Mon prénom suivi de ma date de naissance.",
      correctOption: "B",
      explanation: "Une phrase de passe longue est quasi impossible à pirater. Les suites logiques et infos perso sont les premières testées.",
    },
    {
      id: "1517_06", theme: "pression", difficulty: 2,
      situationText: "Tes amis te poussent à publier quelque chose d'humiliant sur quelqu'un. Que fais-tu ?",
      optionA: "Je le fais, c'est pour rire et ça dure pas longtemps.",
      optionB: "Je refuse et explique que ça peut avoir des conséquences judiciaires.",
      optionC: "Je fais une version moins grave pour satisfaire le groupe.",
      correctOption: "B",
      explanation: "Publier du contenu humiliant peut être qualifié de cyber-harcèlement avec de vraies conséquences pénales.",
    },
    {
      id: "1517_07", theme: "temps-ecran", difficulty: 2,
      situationText: "Tu vérifies ton téléphone toutes les 5 minutes sans raison précise. Que fais-tu ?",
      optionA: "C'est normal à mon âge, tout le monde est pareil.",
      optionB: "Je reconnais un comportement addictif et utilise les outils de contrôle du temps d'écran.",
      optionC: "Je désinstalle toutes mes applis d'un coup.",
      correctOption: "B",
      explanation: "L'addiction aux écrans est un phénomène réel. En prendre conscience et utiliser les outils de gestion du temps est la première étape.",
    },
    {
      id: "1517_08", theme: "infos-perso", difficulty: 2,
      situationText: "Un service en ligne est entièrement 'gratuit'. Comment comprendre son modèle économique ?",
      optionA: "C'est gratuit car c'est une association à but non lucratif.",
      optionB: "Tes données personnelles sont le produit : tu paies avec ta vie privée.",
      optionC: "Il n'y a aucune contrepartie, c'est vraiment un cadeau.",
      correctOption: "B",
      explanation: "Le modèle 'si c'est gratuit, tu es le produit' s'applique à la plupart des réseaux sociaux qui vendent tes données.",
    },
    {
      id: "1517_09", theme: "harcelement", difficulty: 2,
      situationText: "Quelqu'un utilise tes photos sans permission sur un faux compte à ton nom. Quels sont tes droits ?",
      optionA: "Une fois publiée, une photo est publique, je ne peux rien faire.",
      optionB: "J'ai un droit à l'image : je peux exiger le retrait et porter plainte.",
      optionC: "Je dois supprimer mes propres photos pour que ça s'arrête.",
      correctOption: "B",
      explanation: "Le droit à l'image est fondamental. L'usurpation d'identité en ligne est un délit pénal.",
    },
    {
      id: "1517_10", theme: "securite-compte", difficulty: 2,
      situationText: "Tu reçois un email qui semble venir de ta banque et demande de confirmer ton code. Que fais-tu ?",
      optionA: "Je réponds rapidement car c'est urgent.",
      optionB: "Je reconnais un phishing et appelle directement ma banque pour vérifier.",
      optionC: "Je clique sur le lien mais sans renseigner mon code.",
      correctOption: "B",
      explanation: "Le phishing imite les communications officielles. Une vraie banque ne demande jamais ton code par email.",
    },
    {
      id: "1517_11", theme: "partage-photo", difficulty: 3,
      situationText: "Tu publies des photos sur un réseau social public. Que devient-il de leur propriété ?",
      optionA: "Mes photos restent entièrement les miennes après publication.",
      optionB: "En publiant, j'accorde souvent une licence d'utilisation à la plateforme selon les CGU.",
      optionC: "Les réseaux sociaux n'ont aucun droit sur les photos que je publie.",
      correctOption: "B",
      explanation: "Les CGU accordent souvent aux plateformes des droits larges sur ton contenu. Lire les CGU, c'est important.",
    },
    {
      id: "1517_12", theme: "fake-news", difficulty: 3,
      situationText: "Tu veux vérifier une information choquante. Quelle méthode est la plus fiable ?",
      optionA: "Regarder combien de fois elle a été partagée sur les réseaux.",
      optionB: "Croiser plusieurs sources fiables et indépendantes pour confirmer l'information.",
      optionC: "Compter le nombre de 'j'aime' sur la publication.",
      correctOption: "B",
      explanation: "La vérification par recoupement de sources fiables est la méthode la plus solide pour distinguer le vrai du faux.",
    },
    {
      id: "1517_13", theme: "securite-compte", difficulty: 3,
      situationText: "Ton compte mail principal n'a pas de double authentification. Quel est le risque principal ?",
      optionA: "Aucun, le mot de passe suffit toujours.",
      optionB: "Un vol de mot de passe peut donner accès à tous tes autres comptes liés.",
      optionC: "Seulement les emails récents sont en danger.",
      correctOption: "B",
      explanation: "Le mail est souvent la clé de récupération de tous tes comptes. Active la double authentification.",
    },
    {
      id: "1517_14", theme: "infos-perso", difficulty: 3,
      situationText: "Une appli \"IA portrait\" demande photo, voix et accès galerie. Quelle approche est la plus responsable ?",
      optionA: "Tout accepter pour tester vite.",
      optionB: "Lire les conditions, limiter les permissions et éviter d'envoyer des données sensibles.",
      optionC: "Envoyer aussi la pièce d'identité pour améliorer le résultat.",
      correctOption: "B",
      explanation: "Les données biométriques sont sensibles. Limiter l'exposition est essentiel.",
    },
    {
      id: "1517_15", theme: "pression", difficulty: 3,
      situationText: "Un groupe te demande de republier un contenu humiliant \"pour la blague\". Quel réflexe montre de l'autonomie ?",
      optionA: "Publier vite puis supprimer ensuite.",
      optionB: "Refuser, expliquer le risque et proposer une alternative respectueuse.",
      optionC: "Publier sans nommer la personne.",
      correctOption: "B",
      explanation: "Poser une limite claire protège les autres et ta responsabilité numérique.",
    },
  ],
};

// Retourne les questions locales pour un ageBandId donné.
// Extrait les chiffres de l'id pour détecter la tranche, fallback "12_14".
export function getLocalQuestions(ageBandId, count = 8) {
  const s = String(ageBandId ?? "");

  // Essai direct sur le code
  if (LOCAL_QUESTIONS[s]) return shuffle(LOCAL_QUESTIONS[s]).slice(0, count);

  // Extraction numérique
  const nums = (s.match(/\d+/g) ?? []).map(Number);
  const maxAge = nums.length ? Math.max(...nums) : 0;

  let band;
  if (maxAge > 0 && maxAge <= 11) band = "7_11";
  else if (maxAge >= 15) band = "15_17";
  else band = "12_14";

  return shuffle(LOCAL_QUESTIONS[band]).slice(0, count);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
