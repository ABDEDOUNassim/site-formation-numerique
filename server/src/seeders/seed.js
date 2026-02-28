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

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENUS DES HISTOIRES
   Style inspiré de Freida McFadden : phrases courtes, tension par les détails,
   monologue intérieur, révélation progressive, résolution sans morale plaquée.
   Chaque histoire est ancrée dans un fait réel documenté.
─────────────────────────────────────────────────────────────────────────────── */

const STORIES_CONTENT = {

  /* ── 7-11 ans ── */

  clubEtoiles: `Mina adore le mercredi. C'est son jour préféré — pas l'école, pas les devoirs. Le club de dessin.

La vieille salle du centre culturel sent les feutres et la colle. Les chaises grincent. Le tableau blanc au fond est couvert d'horaires écrits au marqueur noir. Mina s'en moque. Elle est là pour les couleurs.

Ce mercredi, avant de partir, elle sort son téléphone. "On fait une photo !" Les amis se serrent. Tout le monde sourit. Elle appuie.

Elle poste la photo le soir même. En deux heures, quatre-vingts likes. Des cœurs, des étoiles, des "trop mignon". Elle se couche heureuse.

Le lendemain, un commentaire qu'elle ne reconnaît pas. Un pseudo bizarre, aucune photo de profil. "C'est où ce club ? Ça a l'air sympa."

Mina hausse les épaules. Elle ne répond pas.

Le surlendemain, un message direct dans sa messagerie privée. "Salle 3, rue du Moulin, c'est bien ça ? J'habitais dans le coin."

Cette fois, elle se fige.

Comment ce compte connaît l'adresse exacte ?

Elle retourne regarder la photo. Elle zoome sur le fond. Le tableau blanc — elle ne l'avait pas remarqué. L'emploi du temps du club y était écrit en entier. Mercredi. 14h-16h. Salle 3. Rue du Moulin. Et les prénoms de tous les enfants inscrits, listés en colonne.

Tout. Absolument tout était là, dans un coin de l'image.

Elle supprime la photo immédiatement. Trop tard pour les captures d'écran que quelqu'un aurait pu faire — elle ne peut pas le savoir. Mais elle fait ce qu'elle peut.

Elle montre les deux messages à son père. Il les lit deux fois sans rien dire. Puis il pose le téléphone sur la table, doucement, comme si c'était quelque chose de fragile.

"C'est bien que tu m'aies montré."

Ensemble, ils signalent les deux comptes. Ils passent le profil de Mina en privé. Ils préviennent l'animatrice du club, qui efface le tableau blanc avant la prochaine séance.

L'animatrice dit qu'elle ne savait pas. Personne ne savait. Ce genre d'information, visible en arrière-plan d'une photo joyeuse, ça ne se remarque pas. Pas au premier coup d'œil.

Mais ça se voit, si on sait quoi chercher.

Les semaines suivantes, Mina continue de poster ses dessins — des créations, des couleurs, des gribouillages qui font rire. Mais avant chaque photo, elle regarde l'arrière-plan. Elle cherche les tableaux, les agendas, les enseignes, les adresses.

Elle apprend le même réflexe à ses amis. L'un d'eux trouve, sur une vieille photo de classe, le nom de son école sur un cahier ouvert posé sur un bureau.

Ils passent un mercredi entier à revoir leurs anciens posts.

L'animatrice dit que c'est la chose la plus utile qu'ils aient jamais faite au club.

Mina, elle, pense encore à ce tableau blanc. À cette information invisible qui était là, dans chaque image, depuis le début.

Elle ne regardera plus jamais une photo de la même façon.`,

  dragonGentil: `Noé joue à Minecraft depuis l'âge de six ans. Il connaît les recettes par cœur. Il sait construire une maison en quinze minutes et éviter les creepers dans le noir.

Ce qu'il ne sait pas encore, c'est reconnaître certains joueurs.

DragonGentil arrive sur son serveur un mardi soir. Il joue bien. Très bien. Il aide Noé à finir sa tour, lui offre des ressources rares, le fait rire avec des blagues sur les cochons en feu. En deux jours, ils jouent ensemble chaque soir après les devoirs.

"T'as quel âge ?" demande DragonGentil, entre deux blocs posés.

"Neuf ans."

"Trop bien. Moi j'ai onze ans. On est presque pareils."

Noé ne se pose pas de question. C'est normal de parler dans le jeu.

Le lendemain, DragonGentil demande son prénom. "Pour savoir comment t'appeler pour de vrai."

Noé dit Noé.

Trois jours plus tard, DragonGentil demande dans quelle école il va. "Pour voir si on est du même quartier — peut-être qu'on se connaît dans la vraie vie !"

Noé commence à taper le nom de l'école. Puis il s'arrête.

Un truc le dérange. Il n'arrive pas à mettre des mots dessus. Juste quelque chose qui gratte, quelque chose qui dit non.

Il met le jeu en pause. Il va voir sa mère.

Elle lit les messages. Elle relit. Puis elle fait quelque chose de simple — elle aligne les questions posées par DragonGentil dans l'ordre où elles sont venues. Âge. Prénom. École. Quartier. Une par une, étalées sur huit jours. Chacune semblait normale. Ensemble, elles forment quelque chose de différent.

Une carte. Un profil. Une adresse qui se construit, morceau par morceau.

"Est-ce que tu l'as vu en vrai ?" demande sa mère.

"Non."

"Est-ce que tu sais son vrai nom ?"

"Non."

Elle lui montre ce qu'elle voit. Noé regarde longtemps. Il pense à combien il aimait jouer avec DragonGentil. Combien c'était marrant. Puis il pense à l'école qu'il avait failli taper.

Il bloque le compte. Il le signale au serveur.

Deux semaines plus tard, un autre enfant de la même session raconte la même histoire. DragonGentil, les mêmes questions, dans le même ordre, sur le même ton sympa. Cet enfant avait donné le nom de son école. Et l'heure à laquelle sa mère venait le chercher.

DragonGentil n'avait probablement pas onze ans. Il n'était probablement pas non plus un enfant.

Noé continue de jouer à Minecraft. Il aide les nouveaux, il construit, il rit. Mais maintenant, il a une règle simple : les vrais amis, il les connaît dans la vraie vie d'abord.

Les inconnus en ligne, même les plus gentils, n'ont pas besoin de savoir où il est à l'école, à quelle heure il sort, et dans quel quartier il habite.

Ce reflexe — celui de s'arrêter juste avant de taper l'information — lui avait semblé tout petit sur le moment.

Il ne l'était pas.`,

  secretGroupe: `Le groupe s'appelait "Arc-en-ciel 🌈" et il existait depuis octobre. Quinze enfants de la classe. Des mèmes, des blagues, des photos de devoirs. Lina l'adorait.

Jusqu'à jeudi matin.

Jeudi matin, Matteo poste un message : "Nouveau défi. Si tu restes dans le groupe, tu dois dire un secret que t'as jamais dit à personne. Sinon t'es exclu."

Les premiers secrets arrivent vite. Des petites choses. Quelqu'un qui a triché à un devoir. Quelqu'un qui mange des bonbons la nuit sous la couette.

Lina rit. Tout le monde rit.

Le lendemain, les secrets changent. Plus personnels. Un enfant écrit qu'il a peur du noir. Un autre qu'il pleure parfois le soir sans savoir pourquoi. Un troisième confie quelque chose sur sa famille qu'il n'avait jamais dit à voix haute.

Ces choses-là, elles ne font plus rire Lina de la même façon.

Elle lit. Elle relit. Elle pense à ces mots écrits dans la précipitation, dans l'envie de rester dans le groupe. Des mots vrais. Des mots fragiles.

Le soir, elle voit un message d'un élève d'une autre classe — quelqu'un qui n'est même pas dans le groupe "Arc-en-ciel". Il cite le secret de ce garçon qui pleure la nuit. Mot pour mot. Avec des émojis moqueurs.

Quelqu'un avait fait une capture. Et l'avait envoyée à l'extérieur.

Lina quitte le groupe.

Elle n'est pas sûre que c'est la bonne décision. Elle a peur d'être exclue. D'être celle qui a "cassé l'ambiance". Mais elle ne peut pas effacer l'image de ce message moqueur dans sa tête.

Elle montre la capture à sa maîtresse. La maîtresse est silencieuse un long moment. Elle ne crie pas. Elle ne punit pas. Elle demande juste : "Tu sais comment ce message est sorti du groupe ?"

"Quelqu'un a fait une capture."

"C'est ça." Elle pose la tablette. "Lina, un secret dans un groupe de quinze personnes, c'est un secret que quinze personnes peuvent partager."

Le lendemain, la maîtresse parle à la classe entière. Pas pour punir. Pour expliquer. Un groupe privé sur une application n'a rien d'une boîte fermée à clé. N'importe qui, à n'importe quel moment, peut capturer ce qui y est écrit.

L'enfant qui avait parlé de ses larmes est assis au fond. Il ne dit rien pendant toute la séance.

Ce soir-là, Lina lui envoie un message direct — rien qu'à lui, pas dans le groupe.

"Je suis désolée que ça soit sorti."

Il répond un seul mot : "Merci."

Le groupe "Arc-en-ciel" est dissous. Un nouveau groupe naît la semaine suivante — sans défi, sans secrets forcés, sans pression d'entrée.

Lina y retourne. Cette fois, elle sait exactement ce qu'elle n'écrira jamais dans un groupe, peu importe combien il semble fermé.

Fermé ne veut pas dire sûr. Ça veut juste dire que moins de gens voient.

Pour l'instant.`,

  /* ── 12-14 ans ── */

  defiViral: `Le défi s'appelait #StuntSchool. La règle était simple : filmer quelqu'un qui glisse ou trébuche en classe, à son insu, et poster la vidéo.

En une semaine : deux cents vidéos. Des milliers de vues. Des collégiens qui riaient sur les écrans. D'autres qui pleuraient dans les couloirs.

Yanis refuse dès le premier jour.

Ses amis insistent. "C'est pour rire." Puis : "T'es trop sérieux." Puis : "T'as même pas posté — t'as peur ou quoi ?"

Yanis dit non. Il ne filme pas. Il ne poste pas. Il ne partage pas.

Mais la pression dure. Chaque matin, un nouveau message dans le groupe de classe. Chaque soir, une nouvelle vidéo où quelqu'un trébuche, tombe, se retrouve humilié pour un instant capturé sans son accord. Et parfois, de plus en plus souvent, le visage de la personne filmée ne rit pas.

Il a peur. Vraiment peur.

Le vrai tournant arrive un vendredi. Une vidéo de Sofiane — élève de troisième, que tout le monde connaît — devient virale. Pas seulement dans le collège. Dans le département entier. Sur TikTok, sur Instagram, dans des groupes WhatsApp que personne ne contrôle.

En quatre-vingt-seize heures, Sofiane est devenu un mème.

Yanis regarde la vidéo. Il reconnaît quelque chose dans le visage de Sofiane. Ce n'est pas de la honte. C'est de la terreur. Ce moment — une demi-seconde de chute captée sans prévenir — tourne en boucle, découpé, remonté, commenté, moqué.

Sofiane n'avait rien fait. Il était juste là.

Le lundi matin, la chaise de Sofiane est vide.

Yanis montre tout au CPE. Les captures de conversation. Les pressions qu'il avait reçues. La vidéo de Sofiane et les comptes qui la relayaient. Il ne dénonce personne par vengeance. Il documente ce qui s'est passé.

Le CPE contacte les parents de Sofiane. L'établissement signale la vidéo en masse sur la plateforme. Elle est retirée au bout de quarante-huit heures.

Sofiane revient deux semaines plus tard. Il s'assoit. Il ne dit pas grand-chose la première journée.

Dans le couloir de la cantine, il passe près de Yanis et dit simplement : "Merci."

Juste ça. Puis il continue de marcher.

Le défi #StuntSchool sera plus tard cité dans un rapport parlementaire sur les challenges violents sur les plateformes. Plusieurs élèves de différents établissements ont été victimes de la même mécanique : filmer l'autre sans son accord, humilier en public, forcer la participation par la peur de l'exclusion.

Yanis n'est jamais devenu populaire pour ce qu'il a fait. Certains lui en ont voulu pendant des semaines.

Mais il y a des choses qu'il ne peut pas défaire. Sofiane dans ce couloir. Ce "merci" dit rapidement, sans s'arrêter.

C'est suffisant.`,

  fauxCompte: `Camille le découvre par hasard, à vingt-deux heures.

Juliette lui envoie un message : "T'as ouvert un deuxième compte ?"

Camille ne comprend pas. Elle tape son prénom et son nom sur Instagram.

Le compte apparaît immédiatement. Sa vraie photo de profil. Son vrai prénom et son vrai nom de famille. Le nom de son collège dans la bio.

Et des messages — envoyés à ses amis, depuis ce faux compte, depuis au moins dix jours. Des demandes de photos. Des questions sur leur vie privée. Des rumeurs sur des élèves qu'elle n'a jamais rencontrés, racontées avec sa voix, son ton, ses emojis habituels.

En lisant les messages, Camille a froid.

Quelqu'un se fait passer pour elle. Depuis combien de temps ? Combien de personnes ont répondu en croyant parler à elle ?

Elle compte. Dix-sept contacts de sa liste d'amis avaient répondu au faux compte. Certains avaient donné des informations. Des photos de groupe. Des captures de conversations privées. Des détails sur d'autres élèves.

Elle prend une capture d'écran du faux profil. Elle change son mot de passe. Elle active la double vérification.

Elle appelle sa mère.

Ensemble, elles déposent un signalement pour usurpation d'identité sur Instagram. Elles envoient également un signalement à Cybermalveillance.gouv.fr, la plateforme nationale. Le faux compte est suspendu quarante-huit heures plus tard.

Mais Camille ne sait pas ce qui a été envoyé pendant ces dix jours. Elle ne sait pas qui a répondu, quoi, à quel moment.

Le lendemain à l'école, elle explique à ses amis ce qui s'est passé. Ceux qui avaient répondu au faux compte sont gênés. Elle ne leur en veut pas. Elle aurait peut-être répondu aussi, si quelqu'un avait copié l'identité d'une amie à elle.

Ce qui l'avait sauvée, c'était la question de Juliette. Pas une certitude — juste un doute. "T'as ouvert un deuxième compte ?"

Une question posée avant de répondre. Un instant de vérification.

Le professeur principal organise un atelier avec le référent numérique de l'établissement. Camille y raconte ce qu'elle a vécu. Comment le faux compte était convaincant — les mêmes emojis, le même ton, son vrai visage en photo de profil.

Un élève lève la main : "Comment on vérifie que c'est le vrai compte de quelqu'un ?"

C'est la bonne question.

Camille explique. La date de création du compte. Le nombre d'abonnements. Les incohérences dans les messages. Et surtout : appeler directement la personne, en vrai, avant de répondre à quoi que ce soit.

Une règle simple. Presque évidente, une fois qu'on l'a apprise.`,

  groupePrive: `Le groupe s'appelait "La vraie vie 👀". Dix-neuf membres. Inès l'adorait — les mèmes, les blagues, les rires du vendredi soir.

Jusqu'à ce vendredi-là.

Ce vendredi, quelqu'un poste une photo de Damien. Prise sans qu'il le sache, en classe, cadrage serré sur son visage, avec un commentaire cruel sur son apparence. Le groupe explose. Les messages s'enchaînent. Vingt. Trente. Cinquante réponses en quarante minutes.

Inès lit. Elle ne rit pas.

Elle n'écrit rien non plus. Elle reste là à regarder les messages défiler, avec cette sensation de plus en plus lourde — quelque chose entre la gêne et quelque chose qui ressemble à de la honte. Pas parce qu'elle a participé. Parce qu'elle est là.

Le samedi matin, un message direct dans sa messagerie privée.

"T'as pas répondu dans le groupe. Tu prends la défense de Damien ? Attention, la prochaine, ça pourrait être toi."

Inès fait une capture du message. Puis elle quitte le groupe.

Le lundi, un montage — photo de Damien, texte exagéré, émojis moqueurs — commence à circuler en dehors du groupe. Dans d'autres classes. Dans un groupe de quartier. La mère de Damien le voit sur le téléphone d'un cousin.

Elle appelle l'établissement.

Inès montre ses captures à la CPE ce matin-là — avant même d'avoir su que la mère de Damien avait appelé. Tout : le premier message cruel, les cinquante réponses, la menace reçue en direct. Elle ne cache rien, elle n'arrange rien.

L'enquête de l'établissement prend deux semaines. Plusieurs élèves sont convoqués. Le groupe est dissous. Certains parents sont contactés.

Damien revient en classe quelques jours après. Il s'assoit. Il ne dit pas grand-chose.

Inès ne sait pas s'il sait qu'elle a transmis les captures. Elle n'a pas demandé de remerciements. Elle avait juste fait ce qui lui semblait juste au moment où c'était encore possible d'agir.

Ce que le groupe avait oublié — et qu'Inès n'oublie plus — c'est que "privé" ne veut pas dire "invisible". Ça veut juste dire que moins de gens voient.

Pour l'instant.

Une fois qu'une capture sort, le groupe n'est plus privé. Il n'y a pas de retour arrière possible. Ce qui a été écrit en riant, à vingt-deux heures un vendredi soir, peut se retrouver dans la main d'un parent, d'un professeur, d'un étranger — le lundi matin, sans prévenir.

Inès y pense encore, parfois, avant d'envoyer un message dans un groupe.

Elle pense à Damien. Et elle ne l'envoie pas.`,

  /* ── 15-17 ans ── */

  captureStage: `Sara avait trouvé le stage de ses rêves.

Cabinet d'architecture. Trois semaines. Rémunéré. L'entretien téléphonique s'était bien passé — la responsable avait semblé convaincue. Sara attendait la confirmation depuis cinq jours.

Le message est arrivé un jeudi soir. Pas un appel. Pas un email. Un DM Instagram, d'un compte qu'elle ne reconnaissait pas.

"Tu savais que ta conversation avec Léa circule dans un groupe ?"

Sara avait eu quinze ans en 2022. Cette nuit-là — la nuit où elle avait écrit des choses blessantes sur sa prof de physique dans un groupe WhatsApp — elle s'était réveillée le lendemain comme si rien ne s'était passé.

La conversation, elle, n'avait pas oublié.

Quelqu'un l'avait capturée. L'avait gardée. Puis l'avait repartagée deux ans plus tard, dans un groupe local, avec son nom complet en visible — et le nom du cabinet où elle postulait.

Sara cherche la conversation sur ses anciens téléphones. Elle la retrouve. Elle relit. Elle voit ce qu'elle avait écrit à quinze ans, fatiguée, dans un groupe qu'elle croyait fermé.

Ces mots-là, elle ne les écrirait plus. Mais ils existent encore, quelque part, dans la mémoire d'un téléphone qu'elle ne contrôle pas.

L'entretien de confirmation avec la responsable du cabinet a lieu le lendemain. La femme ne mentionne rien pendant les vingt premières minutes. Puis :

"J'ai vu circuler quelque chose à votre sujet. Je veux vous donner la chance de vous expliquer."

Sara explique. Pas d'excuses vides. Des faits. Elle avait quinze ans. Le contexte d'une conversation de fin de journée dans un groupe de classe. Ce qu'elle a appris depuis. Elle regarde la responsable dans les yeux sans détourner le regard.

Silence.

"Je vous rappelle demain."

La nuit est longue.

Le lendemain, la responsable rappelle. Elle dit oui.

Sara ne sait pas si elle aurait obtenu le même résultat avec quelqu'un d'autre. Elle ne le saura jamais. D'autres candidats, dans d'autres secteurs, n'ont pas eu cette chance.

Ce qu'elle sait maintenant : elle passe une heure, une fois par mois, à chercher son nom sur Google. À vérifier ses anciens comptes et leurs paramètres de visibilité. À supprimer ce qui n'appartient plus à qui elle est.

Pas par peur. Par précaution.

Elle conseille la même chose à ses amis. La plupart haussent les épaules — "personne va chercher mon nom". Certains ont cherché. Ils ont trouvé des choses qu'ils avaient oubliées.

Une photo de 2021 sur un compte désactivé, toujours indexée par Google. Un commentaire d'une vieille vidéo YouTube. Un pseudo d'enfance lié à leur vrai nom dans un forum de jeu.

Des traces légères. Presque invisibles. Jusqu'au moment où quelqu'un les cherche vraiment.

À dix-sept ans, on construit quelque chose. L'image en ligne fait partie de cette construction — que ce soit voulu ou non.

Sara préfère la construire consciemment.`,

  vocalPression: `Nassim avait envoyé le vocal en mars. Une vraie confidence. Il faisait confiance à Karim — ils se connaissaient depuis le CM2.

En mai, Karim avait besoin d'une faveur.

Un message simple, sans ponctuation, envoyé comme si c'était une blague : "tu te rappelles ton vocal de mars il est encore là"

Nassim a relu trois fois. Puis il a compris.

Karim voulait que Nassim dise quelque chose à la petite amie de son frère. Un mensonge précis. Un service rendu en échange d'un silence.

Nassim écrit : "Non."

Karim répond avec une capture du vocal. "T'es sûr ?"

Nassim pose le téléphone. Il s'assoit sur son lit. Il pense.

Il aurait pu céder. C'est ce que le chantage demande — juste une fois, juste pour que ça s'arrête. Mais il sait comment ça finit. Une fois n'arrête jamais rien. Une faveur appelle une faveur. Et la personne qui cède devient une personne qu'on peut faire céder encore.

Il ouvre une nouvelle conversation, fait des captures de tout l'échange — chaque message, chaque capture envoyée par Karim. Puis il bloque le numéro.

Le soir même, il parle à sa sœur. Elle lit les messages en silence. Elle dit : "T'as bien fait."

Ensemble, ils vont sur Cybermalveillance.gouv.fr et lisent la procédure pour signaler un chantage numérique. Ils déposent un signalement sur la plateforme Pharos — la plateforme nationale de signalement des contenus illicites sur Internet. Ils appellent le 3018, le numéro national de lutte contre le cyberharcèlement, pour avoir des conseils.

Karim envoie le vocal à deux personnes. Nassim l'apprend. Il contacte lui-même ces deux personnes pour leur expliquer le contexte — ce qu'il avait dit, pourquoi, et ce qui s'était passé ensuite. Sans honte. Avec des faits.

Elles comprennent.

Le chantage avait misé sur deux choses : la honte et l'isolement. Dès que Nassim avait parlé — à sa sœur, aux deux personnes visées — le levier avait disparu. Il n'y avait plus rien à menacer de révéler, puisque Nassim l'avait dit lui-même.

Nassim ne reverra plus Karim. Ce n'est pas une perte.

Ce qu'il comprend maintenant — et qu'il n'avait pas vu venir — c'est à quelle vitesse une confidence peut devenir une arme dans de mauvaises mains. Pas parce que la confidence était honteuse. Mais parce que la personne en face avait décidé de s'en servir.

Les vocaux restent. Les messages restent. Les captures restent. Tant qu'ils sont entre des mains malveillantes, ils peuvent servir de levier.

La meilleure réponse n'est pas le silence. Ce n'est pas céder non plus. C'est parler aux bonnes personnes, avant que la peur ne décide à la place.`,

  compteEsport: `Rayan avait mis quatre ans à construire ce compte.

Quatre ans de parties, de classements, de skins achetés avec de l'argent de poche économisé semaine après semaine. Son équipe le connaissait. Les tournois régionaux le connaissaient. Son pseudo — RK_Rayan — apparaissait dans les archives de trois compétitions en ligne.

Le vendredi soir, son compte se déconnecte automatiquement.

Il se reconnecte. Mot de passe refusé.

Il essaie de réinitialiser. L'adresse email de récupération — celle qu'il utilise depuis la cinquième — renvoie un message d'erreur : compte inexistant.

Quelqu'un avait changé l'adresse de récupération.

Rayan passe deux heures sur les forums. Les tutoriels. La page support officielle. Il suit la procédure — longue, avec des formulaires en anglais, sans aucune garantie.

En attendant, il cherche son pseudo sur Google.

Premier résultat : une annonce sur un forum gris. "Compte Valorant niveau 800, skins rares, 17 victoires de tournoi. Vente immédiate : 120 euros."

Son propre compte. En vente par quelqu'un d'autre.

Son père l'aide à contacter le support officiel. Un ami plus âgé lui montre le site HaveIBeenPwned.com — une base de données qui recense les fuites de données signalées. Il entre l'adresse email qu'il utilisait depuis la cinquième.

Résultat immédiat : cette adresse avait été compromise dans une fuite de données d'un site de streaming en 2021. Des millions d'adresses et de mots de passe exposés.

Rayan avait utilisé le même mot de passe sur le site de streaming et sur son compte de jeu.

C'était tout ce qu'il avait fallu. Une fuite sur un site qu'il avait oublié. Le même mot de passe réutilisé. Deux secondes pour entrer.

Le support récupère le compte en dix-huit jours.

Dix-huit jours sans équipe. Sans parties. Sans tournois.

Quand il retrouve l'accès, il passe une soirée entière à sécuriser chacun de ses comptes. Un mot de passe unique pour chacun, généré par un gestionnaire de mots de passe. Double vérification sur tous les comptes importants. Sessions actives vérifiées et fermées une par une — il trouve des connexions depuis des villes qu'il n'a jamais visitées.

Son père fait la même chose pour ses comptes à lui, ce soir-là.

RK_Rayan joue à nouveau. Les tournois recommencent. L'équipe l'attend.

Mais le mot de passe de la cinquième — celui qu'il gardait depuis trois ans parce qu'il était "facile à retenir", parce que le changer semblait compliqué, parce que ça n'arriverait sûrement pas à lui — n'existe plus nulle part.

Ce n'est pas grand-chose, changer un mot de passe. Ça prend deux minutes.

Ça avait failli lui coûter quatre ans de travail.`

};

async function seedStories(ageBands, adminId) {
  const byCode = Object.fromEntries(ageBands.map((a) => [a.code, a.id]));
  const stories = [
    {
      title: "Le club des étoiles et la photo trop précise",
      slug: "club-etoiles-photo-trop-precise",
      theme: "image",
      summary: "Une photo joyeuse révèle sans le vouloir l'adresse exacte d'un club, les horaires et les prénoms de tous les enfants.",
      content: STORIES_CONTENT.clubEtoiles,
      whatHappens: "Une photo peut contenir des informations cachées en arrière-plan : adresses, horaires, noms. Ces détails sont invisibles au premier regard, mais lisibles par n'importe qui.",
      howToProtect: "Avant de poster une photo, regarder l'arrière-plan. Chercher les tableaux, les enseignes, les agendas, les noms visibles. Publier en privé et demander l'accord des personnes présentes.",
      whoToTell: "Un parent, un animateur ou un adulte référent du groupe. Signaler les comptes inconnus directement sur l'application.",
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
      summary: "Un joueur très sympa construit la confiance sur plusieurs jours avant de demander, question par question, des informations personnelles.",
      content: STORIES_CONTENT.dragonGentil,
      whatHappens: "Certains adultes se font passer pour des enfants en ligne. Ils construisent la confiance lentement, posent des questions personnelles une par une, séparées de plusieurs jours pour ne pas alerter.",
      howToProtect: "Ne jamais donner son école, son adresse, son quartier ou ses horaires à quelqu'un rencontré uniquement en ligne, même s'il semble sympa. Signaler au parent dès qu'une question semble étrange.",
      whoToTell: "Un parent, un frère ou une sœur adulte, un éducateur. Montrer les messages tels quels, sans les supprimer.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["7_11"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le secret du groupe arc-en-ciel",
      slug: "secret-groupe-arc-en-ciel",
      theme: "secrets",
      summary: "Un défi dans un groupe privé force les enfants à partager des secrets intimes. L'un d'eux est capturé et moqué à l'extérieur du groupe.",
      content: STORIES_CONTENT.secretGroupe,
      whatHappens: "Un groupe de messagerie privé n'est pas une boîte fermée. N'importe quel membre peut capturer ce qui y est écrit et le partager ailleurs. Un secret partagé à quinze personnes n'est plus un secret.",
      howToProtect: "Refuser les défis qui demandent des informations personnelles ou intimes. Quitter un groupe qui devient une source de pression. Garder des captures si des menaces sont envoyées.",
      whoToTell: "La maîtresse, un parent, un éducateur ou un animateur périscolaire. Signaler les captures humiliantes sur la plateforme où elles circulent.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["7_11"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le défi viral du collège",
      slug: "defi-viral-college",
      theme: "pression",
      summary: "Un challenge filmé humilie un élève devant tout le collège. Sa vidéo devient virale. Il n'est plus là le lundi matin.",
      content: STORIES_CONTENT.defiViral,
      whatHappens: "Les challenges viraux utilisent la peur de l'exclusion pour forcer la participation. Filmer quelqu'un sans son accord est une violence, même si tout le monde rit. Une vidéo postée peut circuler pendant des années, hors de tout contrôle.",
      howToProtect: "Refuser de participer sans se justifier. Ne pas filmer quelqu'un sans son accord. Signaler les vidéos humiliantes sur la plateforme. Documenter les pressions reçues avec des captures.",
      whoToTell: "Le CPE, le professeur principal, un parent. Ne pas rester seul face à la pression du groupe.",
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
      summary: "Un faux profil copie l'identité de Camille et contacte ses amis pendant dix jours. Elle le découvre par hasard, à vingt-deux heures.",
      content: STORIES_CONTENT.fauxCompte,
      whatHappens: "L'usurpation d'identité consiste à créer un faux compte avec la photo et le nom de quelqu'un pour contacter ses proches. Elle peut durer des semaines avant d'être détectée. Elle est signalable directement sur les plateformes.",
      howToProtect: "Vérifier ses paramètres de confidentialité. Activer la double vérification. Chercher régulièrement son nom sur les plateformes. Poser une question directe à quelqu'un avant de répondre à un compte qui prétend être lui.",
      whoToTell: "Les parents, le référent numérique de l'établissement. Signaler l'usurpation sur la plateforme et sur Cybermalveillance.gouv.fr.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["12_14"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le groupe privé qui dérape",
      slug: "groupe-prive-derape",
      theme: "insultes",
      summary: "Un groupe de mèmes devient un espace de moqueries ciblées. Une capture sort. La mère de la victime appelle l'établissement.",
      content: STORIES_CONTENT.groupePrive,
      whatHappens: "Les groupes privés peuvent basculer rapidement des blagues vers des attaques personnelles. Les captures sortent du groupe. Ce qui semble limité à un espace fermé peut se retrouver devant des parents ou des professeurs en quelques heures.",
      howToProtect: "Ne pas relayer des contenus qui ciblent quelqu'un. Quitter un groupe qui devient violent. Garder des captures si des menaces sont envoyées. Signaler dès que le contenu sort du groupe.",
      whoToTell: "Le CPE, l'infirmière scolaire, un parent ou un éducateur. Ne pas attendre que la situation s'aggrave.",
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
      summary: "Une conversation capturée à quinze ans ressurgit deux ans plus tard, au moment où Sara postule à son stage de rêve.",
      content: STORIES_CONTENT.captureStage,
      whatHappens: "Une trace numérique ancienne peut réapparaître à n'importe quel moment. Des recruteurs, des responsables de stage ou des établissements cherchent parfois le nom des candidats en ligne. Ce qui a été écrit à quinze ans peut avoir un impact à dix-sept.",
      howToProtect: "Chercher régulièrement son nom sur Google et les plateformes. Vérifier la visibilité des anciens comptes. Supprimer ou rendre privé ce qui ne correspond plus à ce qu'on est. Préparer une explication factuelle en cas de question.",
      whoToTell: "Un professeur référent, un conseiller d'orientation, un parent. Pour les demandes de suppression, contacter la plateforme directement et, si besoin, la CNIL.",
      status: "published",
      publishedAt: new Date(),
      ageBandId: byCode["15_17"],
      createdBy: adminId,
      updatedBy: adminId
    },
    {
      title: "Le vocal gardé pour faire pression",
      slug: "vocal-garde-pour-pression",
      theme: "pression",
      summary: "Nassim envoie un vocal de confiance à un ami. Deux mois plus tard, cet ami s'en sert comme menace.",
      content: STORIES_CONTENT.vocalPression,
      whatHappens: "Le chantage numérique consiste à menacer de diffuser un contenu privé pour obtenir quelque chose. Il mise sur la honte et l'isolement. Céder une fois ne règle rien — ça renforce le levier. Signaler rapidement coupe le mécanisme.",
      howToProtect: "Ne pas céder. Faire des captures de chaque message de menace. Bloquer le contact. Parler immédiatement à un adulte de confiance. Contacter le 3018 (numéro national gratuit, disponible 24h/24).",
      whoToTell: "Un membre de la famille, un éducateur, le 3018. Signaler sur Cybermalveillance.gouv.fr et la plateforme Pharos.",
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
      summary: "Le compte de jeu de Rayan, construit en quatre ans, est piraté en quelques secondes à cause d'un mot de passe réutilisé depuis la cinquième.",
      content: STORIES_CONTENT.compteEsport,
      whatHappens: "Réutiliser le même mot de passe sur plusieurs plateformes crée un effet domino. Si l'une d'elles est piratée et ses données vendues, tous les comptes avec le même mot de passe sont vulnérables. Des millions d'adresses e-mail et de mots de passe circulent sur des forums après chaque fuite.",
      howToProtect: "Un mot de passe unique par compte, généré par un gestionnaire de mots de passe. Double vérification activée sur les comptes importants. Vérifier régulièrement ses adresses e-mail sur HaveIBeenPwned.com pour savoir si elles ont été compromises.",
      whoToTell: "Un parent, un adulte de confiance avec des connaissances techniques, le support officiel de la plateforme. Ne jamais passer par des sites tiers pour récupérer un compte.",
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

  console.log("Seed terminé ✅");
  process.exit(0);
}

run().catch((error) => {
  console.error("Seed error", error);
  process.exit(1);
});
