/* ─────────────────────────────────────────────────────────────────────────────
   storyData.js
   Données narratives pour l'InteractiveStoryEngine.
   3 héros × 3 lieux × 3 situations = 27 histoires possibles.
   Inspiré de faits réels documentés (Discord Nitro scam, challenge emploi du
   temps TikTok 2023, fausses APK Roblox/Minecraft).
─────────────────────────────────────────────────────────────────────────────── */

export const HEROES = [
  {
    id: "nino",
    emoji: "🎮",
    name: "Nino",
    tagline: "Accro aux jeux en ligne",
    pronoun: "il",
    riskyData: "sa date de naissance, son vrai prénom et son adresse",
    safeReflex: "Il n'utilise jamais son vrai nom en ligne — toujours un pseudo.",
    badReflex: "Nino clique sans lire. Il veut aller vite.",
  },
  {
    id: "lina",
    emoji: "🎬",
    name: "Lina",
    tagline: "Créatrice de vidéos",
    pronoun: "elle",
    riskyData: "le nom de son collège, sa classe et son emploi du temps",
    safeReflex: "Elle demande toujours à ses parents avant de publier quoi que ce soit.",
    badReflex: "Lina partage sa vie en détail. Elle aime montrer son quotidien.",
  },
  {
    id: "sam",
    emoji: "🎵",
    name: "Sam",
    tagline: "Passionné·e de musique",
    pronoun: "iel",
    riskyData: "ses contacts, ses photos et son numéro de téléphone",
    safeReflex: "Iel utilise des mots de passe différents sur chaque application.",
    badReflex: "Sam répond volontiers aux inconnus qui parlent de musique.",
  },
];

export const PLACES = [
  {
    id: "home",
    emoji: "🏠",
    name: "À la maison",
    tagline: "Wifi familial sécurisé",
    risk: "low",
    context: "à la maison, sur le wifi familial",
    detail: "Le réseau est protégé. Mais l'écran est visible par toute la famille.",
  },
  {
    id: "library",
    emoji: "📚",
    name: "À la bibliothèque",
    tagline: "Wifi public ouvert",
    risk: "high",
    context: "à la bibliothèque, connecté·e au wifi public",
    detail: "Sur un réseau ouvert, n'importe qui peut intercepter ce qui transite.",
  },
  {
    id: "school",
    emoji: "🏫",
    name: "Au collège",
    tagline: "Ordinateur partagé",
    risk: "high",
    context: "au collège, depuis un ordinateur partagé",
    detail: "Un ordi partagé garde en mémoire ce qu'on y laisse — identifiants, historique, tout.",
  },
];

export const SITUATIONS = [
  /* ─────────────────────────────────────────────────────────────────────────
     SITUATION 1 — Arnaque Discord Nitro
     Basé sur un fait réel : des millions de faux liens "Nitro gratuit" ont
     circulé sur Discord entre 2022 et 2024. Les victimes perdaient l'accès
     à leur compte ou voyaient leurs données revendues.
  ───────────────────────────────────────────────────────────────────────── */
  {
    id: "phishing",
    emoji: "🎣",
    title: "Le faux cadeau Discord",
    tagline: "« J'ai un Nitro gratuit pour toi »",

    buildIntro(hero, place) {
      return (
        `Un message privé arrive sur Discord. ${hero.name} est ${place.context}. ` +
        `L'expéditeur s'appelle « Lucas_officiel » — un pseudo que ${hero.name} reconnaît vaguement. ` +
        `« Yo, j'ai reçu 3 mois de Discord Nitro en trop. Je t'en donne un, c'est cadeau. ` +
        `Active-le ici avant ce soir : discord-nitro-gift.co » ` +
        `Le lien ressemble à du Discord. Presque.`
      );
    },

    buildTension(hero, place) {
      return (
        `${hero.name} ouvre le lien. Une page bleue, le logo Discord, un bouton « Réclamer mon Nitro ». ` +
        `${place.detail} ` +
        `La page demande de se connecter avec son compte Discord « pour vérifier l'identité ». ` +
        `Le formulaire réclame l'adresse e-mail, le mot de passe — et le code de double authentification. ` +
        `Tout. ` +
        `L'URL dans la barre dit « disc0rd-nitro-gift.co ». Un zéro à la place du o. ` +
        `${hero.name} le voit. Une fraction de seconde. ` +
        `${hero.badReflex}`
      );
    },

    buildCrisis(hero) {
      return (
        `Un message s'affiche en rouge : « Offre disponible encore 08:42. ` +
        `Passé ce délai, ton Nitro sera offert à quelqu'un d'autre. » ` +
        `${hero.name} hésite. Le Nitro vaut 10 euros par mois. ` +
        `C'est une arnaque connue — des milliers d'ados s'y sont fait avoir en 2023. ` +
        `Mais le timer tourne. Et l'envie, elle, ne s'arrête pas.`
      );
    },

    choicePrompt: "Le timer tourne. Que fait ton personnage ?",

    choices: [
      {
        id: "safe",
        emoji: "🛡️",
        label: "Fermer et vérifier l'URL",
        detail: "L'URL contient un zéro à la place du « o ». C'est un faux site. Fermer sans rien entrer.",
        impact: "safe",

        buildConsequence(hero) {
          return (
            `${hero.name} ferme l'onglet. ` +
            `${hero.pronoun === "il" ? "Il" : hero.pronoun === "elle" ? "Elle" : "Iel"} cherche « discord nitro scam » sur Google. ` +
            `Premier résultat : un article de Numerama. « L'arnaque Discord Nitro : comment la reconnaître. » ` +
            `Des dizaines de captures d'écran. C'est exactement la même page. ` +
            `Le compte « Lucas_officiel » n'était pas son ami — juste un bot qui envoie ce message à des milliers de gens.`
          );
        },
        buildEnding(hero) {
          return (
            `${hero.name} signale le lien à Discord et prévient ses vrais amis du serveur. ` +
            `Deux d'entre eux avaient reçu le même message. ` +
            `${hero.safeReflex} ` +
            `Ce détail — un zéro à la place d'un o — avait failli passer inaperçu. ` +
            `Cette fois, il n'est pas passé.`
          );
        },
        lesson: "Un vrai service ne te demande jamais ton mot de passe depuis un lien reçu en message privé. Jamais.",
        scoreBonus: 3,
      },
      {
        id: "risk",
        emoji: "⚠️",
        label: "Se connecter pour réclamer le Nitro",
        detail: "Entrer son e-mail, son mot de passe et son code 2FA sur la page.",
        impact: "risk",

        buildConsequence(hero) {
          return (
            `${hero.name} entre ses identifiants. La page affiche « Nitro activé ! Merci. » ` +
            `Puis plus rien. Le Nitro n'arrive pas. ` +
            `Vingt minutes plus tard, Discord envoie un vrai mail : ` +
            `« Connexion détectée depuis un appareil inconnu en Roumanie. »`
          );
        },
        buildEnding(hero) {
          return (
            `Le compte est compromis. Le hackeur change l'e-mail de récupération en quelques secondes. ` +
            `${hero.name} n'a plus accès à son compte — ni à ses serveurs, ni à ses amis, ni à son historique. ` +
            `Le même bot envoie maintenant le faux lien à tous ses contacts depuis son compte. ` +
            `${hero.badReflex} ` +
            `Récupérer le compte prendra plusieurs semaines — sans garantie de succès.`
          );
        },
        lesson: "Un faux lien peut ressembler à l'original à 99 %. Regarde toujours l'URL complète avant d'entrer quoi que ce soit.",
        scoreBonus: 0,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     SITUATION 2 — Le challenge emploi du temps
     Basé sur un fait réel : en 2023, un trend TikTok invitait les élèves à
     poster leur planning scolaire pour « trouver des camarades ». Des milliers
     d'enfants ont ainsi publié leur école, leur classe et leurs horaires.
     Des signalements ont été faits à la CNIL et aux rectorats.
  ───────────────────────────────────────────────────────────────────────── */
  {
    id: "challenge",
    emoji: "📅",
    title: "Le challenge emploi du temps",
    tagline: "« Qui a les mêmes cours que moi ? »",

    buildIntro(hero, place) {
      return (
        `Sur TikTok, un son tourne en boucle depuis deux jours. ` +
        `${hero.name} est ${place.context} quand ${hero.pronoun} voit la tendance. ` +
        `« #MonEdT — Poste une photo de ton emploi du temps. ` +
        `Qui a les mêmes cours que moi ? » ` +
        `Des milliers de vidéos. Des plannings en photo, sur fond de musique. ` +
        `L'école, la classe, les horaires. Tout est là.`
      );
    },

    buildTension(hero, place) {
      return (
        `${place.detail} ` +
        `Des amis de ${hero.name} ont déjà posté. Leurs noms complets écrits sur l'emploi du temps, ` +
        `le nom du collège, les jours où ils finissent à 15h30. ` +
        `Dans les commentaires, des comptes inconnus notent : « Ah tu es au collège Ravel à Lyon ? » ` +
        `Ou encore : « Toi t'as mercredi après-midi libre ? » ` +
        `${hero.badReflex}`
      );
    },

    buildCrisis(hero) {
      return (
        `Un ami envoie un message : « T'as posté ton EDT ? Tout le monde le fait. ` +
        `Regarde, j'ai des mêmes cours qu'une fille à Bordeaux. C'est trop bien. » ` +
        `${hero.name} regarde son emploi du temps. Son nom. Le nom du collège. Les créneaux du mercredi. ` +
        `Poster ou pas ?`
      );
    },

    choicePrompt: "L'ami attend. Que décide ton personnage ?",

    choices: [
      {
        id: "safe",
        emoji: "🛡️",
        label: "Ne pas poster et expliquer pourquoi",
        detail: "Un emploi du temps révèle le nom de l'école, les horaires et les jours libres. C'est trop d'infos.",
        impact: "safe",

        buildConsequence(hero) {
          return (
            `${hero.name} répond : « Ton EDT montre où tu es, quand tu es seul·e et le nom de ton école. ` +
            `C'est exactement ce qu'un inconnu malveillant voudrait savoir. » ` +
            `L'ami relit ses commentaires. Le compte qui avait noté son collège et ses horaires. ` +
            `Il supprime sa vidéo.`
          );
        },
        buildEnding(hero) {
          return (
            `Quelques jours plus tard, la CNIL publie un communiqué : ` +
            `le trend #MonEdT avait permis à des individus de cartographier ` +
            `les emplois du temps de milliers d'élèves dans toute la France. ` +
            `${hero.name} l'avait compris avant tout le monde. ` +
            `${hero.safeReflex}`
          );
        },
        lesson: "Un emploi du temps dit quand tu es seul·e et où. Ce n'est pas une information à rendre publique.",
        scoreBonus: 3,
      },
      {
        id: "risk",
        emoji: "⚠️",
        label: "Poster l'emploi du temps",
        detail: "Publier la photo pour suivre la tendance et trouver des camarades.",
        impact: "risk",

        buildConsequence(hero) {
          return (
            `La vidéo est en ligne. Quelques likes, un commentaire sympa. ` +
            `Puis un compte inconnu écrit : « Ah, tu es au collège Victor Hugo ? ` +
            `T'as l'air de finir tôt le mercredi. On peut se croiser. » ` +
            `${hero.name} ne répond pas — mais le message est là.`
          );
        },
        buildEnding(hero) {
          return (
            `${hero.riskyData} étaient visibles sur la photo. ` +
            `Le compte inconnu avait compilé des dizaines de profils d'élèves du même secteur ` +
            `— noms, écoles, horaires de fin de cours. ` +
            `${hero.name} supprime la vidéo. Mais des captures circulent déjà. ` +
            `Les professeurs seront alertés le lendemain.`
          );
        },
        lesson: "Une tendance qui semble inoffensive peut servir à localiser des enfants. Réfléchis avant de publier.",
        scoreBonus: 0,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     SITUATION 3 — Fausse APK de Robux gratuits
     Basé sur un fait réel : des milliers de faux sites proposant des « Robux
     gratuits » ou des « cheat codes Minecraft » ont infecté des appareils
     entre 2021 et 2024. Certaines APK contenaient des logiciels espions qui
     aspiraient les contacts, les photos et les SMS (source : Kaspersky, 2023).
  ───────────────────────────────────────────────────────────────────────── */
  {
    id: "fakeapp",
    emoji: "🎁",
    title: "Les Robux gratuits",
    tagline: "« 10 000 Robux en 30 secondes »",

    buildIntro(hero, place) {
      return (
        `Un lien circule dans le groupe WhatsApp de la classe. ` +
        `${hero.name} est ${place.context}. ` +
        `« robux-gratuit-2024.site — J'ai testé, ça marche vraiment, j'ai eu 10 000 Robux. » ` +
        `Le message vient d'un camarade de confiance. ` +
        `Le site demande de télécharger une application. Pas sur le Play Store — directement.`
      );
    },

    buildTension(hero, place) {
      return (
        `L'installation se lance. Et puis : une liste de permissions. ` +
        `Accès aux contacts. Aux SMS. Aux photos. À la localisation. ` +
        `${place.detail} ` +
        `Une appli qui donne des Robux n'a pas besoin de lire les SMS. ` +
        `Ni de savoir où tu habites. ` +
        `${hero.name} s'arrête. ` +
        `${hero.badReflex}`
      );
    },

    buildCrisis(hero) {
      return (
        `Une fenêtre s'affiche : ` +
        `« Pour vérifier que tu n'es pas un robot, autorise l'accès à tes contacts. ` +
        `Sans ça, les Robux ne peuvent pas être envoyés. » ` +
        `C'est faux. Mais c'est écrit sérieusement, avec un logo Roblox en haut. ` +
        `10 000 Robux. Juste là. Juste un bouton à appuyer.`
      );
    },

    choicePrompt: "La fenêtre attend une réponse. Que choisit ton personnage ?",

    choices: [
      {
        id: "safe",
        emoji: "🛡️",
        label: "Refuser et désinstaller",
        detail: "Roblox ne distribue jamais des Robux via des sites tiers. Cette appli n'a aucune raison légitime d'accéder aux contacts.",
        impact: "safe",

        buildConsequence(hero) {
          return (
            `${hero.name} refuse et désinstalle l'appli. ` +
            `${hero.pronoun === "il" ? "Il" : hero.pronoun === "elle" ? "Elle" : "Iel"} cherche « robux-gratuit-2024.site » sur Google. ` +
            `Un article de 01net : « Ces sites qui volent vos données en promettant des Robux. » ` +
            `L'APK était un spyware référencé par Kaspersky depuis six mois. ` +
            `Le camarade qui avait partagé le lien ? Il ne savait pas. Il l'avait reçu lui aussi.`
          );
        },
        buildEnding(hero) {
          return (
            `${hero.name} prévient le groupe WhatsApp : ne téléchargez pas ce fichier. ` +
            `Trois camarades avaient déjà cliqué. Deux désinstallent à temps. ` +
            `${hero.safeReflex} ` +
            `Roblox ne distribue jamais de Robux via des sites externes. ` +
            `Si quelqu'un te dit que si — c'est une arnaque.`
          );
        },
        lesson: "Si un service officiel existe, les vrais cadeaux passent par lui. Jamais par un lien dans un groupe WhatsApp.",
        scoreBonus: 3,
      },
      {
        id: "risk",
        emoji: "⚠️",
        label: "Accepter les permissions",
        detail: "Appuyer sur « Autoriser » pour recevoir les Robux.",
        impact: "risk",

        buildConsequence(hero) {
          return (
            `${hero.name} appuie sur « Autoriser ». ` +
            `Une roue de chargement tourne. « Robux en cours d'envoi... » ` +
            `Puis : « Erreur. Réessaie dans 24h. » ` +
            `Les Robux n'arrivent pas. Mais en arrière-plan, ` +
            `l'appli a déjà copié la liste de contacts — 87 noms et numéros.`
          );
        },
        buildEnding(hero) {
          return (
            `Deux jours plus tard, des parents reçoivent des SMS frauduleux ` +
            `depuis un numéro inconnu — envoyés à partir des contacts volés. ` +
            `${hero.riskyData} se retrouvent dans une base de données quelque part. ` +
            `${hero.name} doit prévenir tous ses contacts un par un. ` +
            `${hero.badReflex} ` +
            `Cette fois, ce ne sont pas seulement ses données qui ont été prises.`
          );
        },
        lesson: "Une vraie appli n'a besoin que des permissions utiles à ce qu'elle fait. Le reste, c'est du vol.",
        scoreBonus: 0,
      },
    ],
  },
];

/* Renvoie le texte de conclusion selon le score.
   Scores possibles : 0 (mauvais choix), 3 (bon + réseau sûr), 4 (bon + réseau risqué). */
export function getScoreComment(score) {
  if (score >= 4) return { label: "Score parfait — bon réflexe dans un contexte difficile. Impressionnant.", color: "great" };
  if (score >= 3) return { label: "Excellent réflexe. Tu as fait le bon choix.", color: "great" };
  return { label: "C'était risqué cette fois — mais maintenant tu sais exactement quoi faire.", color: "risk" };
}
