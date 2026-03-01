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

La vieille salle du centre culturel sent les feutres et la colle. Les chaises grincent. Le tableau blanc au fond est couvert d'horaires écrits au marqueur noir. Elle s'en moque. Elle est là pour les couleurs.

Ce mercredi, avant de partir, elle sort son téléphone. "On fait une photo !" Les amis se serrent. Tout le monde sourit. Elle appuie.

La photo part en ligne le soir même. En deux heures, quatre-vingts likes. Des cœurs, des étoiles, des "trop mignon". Elle se couche heureuse.

Le lendemain, un commentaire qu'elle ne reconnaît pas. Un pseudo bizarre, aucune photo de profil. "C'est où ce club ? Ça a l'air sympa."

Elle hausse les épaules. Elle ne répond pas.

Le surlendemain, un message direct dans sa messagerie privée. "Salle 3, rue du Moulin, c'est bien ça ? J'habitais dans le coin."

Cette fois, elle se fige.

Comment ce compte connaît l'adresse exacte ?

Elle retourne regarder la photo. Elle zoome sur le fond. Le tableau blanc — elle ne l'avait pas remarqué. L'emploi du temps du club y était écrit en entier. Mercredi. 14h-16h. Salle 3. Rue du Moulin. Et les prénoms de tous les enfants inscrits, listés en colonne.

Tout. Absolument tout était là, dans un coin de l'image.

Elle supprime la photo immédiatement. Trop tard pour les captures d'écran que quelqu'un aurait pu faire — elle ne peut pas le savoir. Mais elle fait ce qu'elle peut.

Elle montre les deux messages à son père. Il les lit deux fois sans rien dire. Puis il pose le téléphone sur la table, doucement, comme si c'était quelque chose de fragile.

"C'est bien que tu m'aies montré."

Ensemble, ils signalent les deux comptes. Ils passent le profil en privé. Ils préviennent l'animatrice du club, qui efface le tableau blanc avant la prochaine séance.

L'animatrice dit qu'elle ne savait pas. Personne ne savait. Ce genre d'information, visible en arrière-plan d'une photo joyeuse, ça ne se remarque pas. Pas au premier coup d'œil.

Mais ça se voit, si on sait quoi chercher.

Les semaines suivantes, elle continue de poster ses dessins — des créations, des couleurs, des gribouillages qui font rire. Mais avant chaque photo, elle regarde l'arrière-plan. Elle cherche les tableaux, les agendas, les enseignes, les adresses.

Elle apprend le même réflexe à ses amis. L'un d'eux trouve, sur une vieille photo de classe, le nom de son école sur un cahier ouvert posé sur un bureau.

Ils passent un mercredi entier à revoir leurs anciens posts.

L'animatrice dit que c'est la chose la plus utile qu'ils aient jamais faite au club.

Mina pense encore à ce tableau blanc. À cette information invisible qui était là, dans chaque image, depuis le début.

Elle ne regardera plus jamais une photo de la même façon.`,

  dragonGentil: `Noé joue à Minecraft depuis l'âge de six ans. Il connaît les recettes par cœur. Il sait construire une maison en quinze minutes et éviter les creepers dans le noir.

Ce qu'il ne sait pas encore, c'est reconnaître certains joueurs.

DragonGentil arrive sur son serveur un mardi soir. Il joue bien. Très bien. Il aide à finir la tour, offre des ressources rares, fait rire avec des blagues sur les cochons en feu. En deux jours, ils jouent ensemble chaque soir après les devoirs.

"T'as quel âge ?" demande DragonGentil, entre deux blocs posés.

"Neuf ans."

"Trop bien. Moi j'ai onze ans. On est presque pareils."

Il ne se pose pas de question. C'est normal de parler dans le jeu.

Le lendemain, DragonGentil demande son prénom. "Pour savoir comment t'appeler pour de vrai."

"Noé."

Trois jours plus tard, il demande dans quelle école il va. "Pour voir si on est du même quartier — peut-être qu'on se connaît dans la vraie vie !"

Il commence à taper le nom de l'école. Puis il s'arrête.

Un truc le dérange. Il n'arrive pas à mettre des mots dessus. Juste quelque chose qui gratte, quelque chose qui dit non.

Il met le jeu en pause. Il va voir sa mère.

Elle lit les messages. Elle relit. Puis elle fait quelque chose de simple — elle aligne les questions posées par DragonGentil dans l'ordre où elles sont venues. Âge. Prénom. École. Quartier. Une par une, étalées sur huit jours. Chacune semblait normale. Ensemble, elles forment quelque chose de différent.

Une carte. Un profil. Une adresse qui se construit, morceau par morceau.

"Est-ce que tu l'as vu en vrai ?" demande sa mère.

"Non."

"Est-ce que tu sais son vrai nom ?"

"Non."

Elle lui montre ce qu'elle voit. Il regarde longtemps. Il pense à combien il aimait jouer avec DragonGentil. Combien c'était marrant. Puis il pense à l'école qu'il avait failli taper.

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

Elle rit. Tout le monde rit.

Le lendemain, les secrets changent. Plus personnels. Un enfant écrit qu'il a peur du noir. Un autre qu'il pleure parfois le soir sans savoir pourquoi. Un troisième confie quelque chose sur sa famille qu'il n'avait jamais dit à voix haute.

Ces choses-là, elles ne font plus rire de la même façon.

Elle lit. Elle relit. Elle pense à ces mots écrits dans la précipitation, dans l'envie de rester dans le groupe. Des mots vrais. Des mots fragiles.

Le soir, elle voit un message d'un élève d'une autre classe — quelqu'un qui n'est même pas dans le groupe "Arc-en-ciel". Il cite le secret de ce garçon qui pleure la nuit. Mot pour mot. Avec des émojis moqueurs.

Quelqu'un avait fait une capture. Et l'avait envoyée à l'extérieur.

Elle quitte le groupe.

Ce n'est pas une décision facile. Elle a peur d'être exclue. D'être celle qui a "cassé l'ambiance". Mais elle ne peut pas effacer l'image de ce message moqueur dans sa tête.

Elle montre la capture à sa maîtresse. La maîtresse est silencieuse un long moment. Elle ne crie pas. Elle ne punit pas. Elle demande juste : "Tu sais comment ce message est sorti du groupe ?"

"Quelqu'un a fait une capture."

"C'est ça." Elle pose la tablette. "Lina, un secret dans un groupe de quinze personnes, c'est un secret que quinze personnes peuvent partager."

Le lendemain, la maîtresse parle à la classe entière. Pas pour punir. Pour expliquer. Un groupe privé sur une application n'a rien d'une boîte fermée à clé. N'importe qui, à n'importe quel moment, peut capturer ce qui y est écrit.

L'enfant qui avait parlé de ses larmes est assis au fond. Il ne dit rien pendant toute la séance.

Ce soir-là, elle lui envoie un message direct — rien qu'à lui, pas dans le groupe.

"Je suis désolée que ça soit sorti."

Il répond un seul mot : "Merci."

Le groupe "Arc-en-ciel" est dissous. Un nouveau groupe naît la semaine suivante — sans défi, sans secrets forcés, sans pression d'entrée.

Elle y retourne. Cette fois, elle sait exactement ce qu'elle n'écrira jamais dans un groupe, peu importe combien il semble fermé.

Fermé ne veut pas dire sûr. Ça veut juste dire que moins de gens voient.

Pour l'instant.`,

  /* ── 12-14 ans ── */

  defiViral: `Le défi s'appelait #StuntSchool. La règle était simple : filmer quelqu'un qui glisse ou trébuche en classe, à son insu, et poster la vidéo.

En une semaine : deux cents vidéos. Des milliers de vues. Des collégiens qui riaient sur les écrans. D'autres qui pleuraient dans les couloirs.

Yanis refuse dès le premier jour.

Ses amis insistent. "C'est pour rire." Puis : "T'es trop sérieux." Puis : "T'as même pas posté — t'as peur ou quoi ?"

Il dit non. Il ne filme pas. Il ne poste pas. Il ne partage pas.

Mais la pression dure. Chaque matin, un nouveau message dans le groupe de classe. Chaque soir, une nouvelle vidéo où quelqu'un trébuche, tombe, se retrouve humilié pour un instant capturé sans son accord. Et parfois, de plus en plus souvent, le visage de la personne filmée ne rit pas.

Il a peur. Vraiment peur.

Le vrai tournant arrive un vendredi. Une vidéo de Sofiane — élève de troisième, que tout le monde connaît — devient virale. Pas seulement dans le collège. Dans le département entier. Sur TikTok, sur Instagram, dans des groupes WhatsApp que personne ne contrôle.

En quatre-vingt-seize heures, Sofiane est devenu un mème.

Il regarde la vidéo. Il reconnaît quelque chose dans le visage de Sofiane. Ce n'est pas de la honte. C'est de la terreur. Ce moment — une demi-seconde de chute captée sans prévenir — tourne en boucle, découpé, remonté, commenté, moqué.

Sofiane n'avait rien fait. Il était juste là.

Le lundi matin, la chaise de Sofiane est vide.

Yanis montre tout au CPE. Les captures de conversation. Les pressions qu'il avait reçues. La vidéo de Sofiane et les comptes qui la relayaient. Il ne dénonce personne par vengeance. Il documente ce qui s'est passé.

Le CPE contacte les parents de Sofiane. L'établissement signale la vidéo en masse sur la plateforme. Elle est retirée au bout de quarante-huit heures.

Sofiane revient deux semaines plus tard. Il s'assoit. Il ne dit pas grand-chose la première journée.

Dans le couloir de la cantine, il passe près de Yanis et dit simplement : "Merci."

Juste ça. Puis il continue de marcher.

Le défi #StuntSchool sera plus tard cité dans un rapport parlementaire sur les challenges violents sur les plateformes. Plusieurs élèves de différents établissements ont été victimes de la même mécanique : filmer l'autre sans son accord, humilier en public, forcer la participation par la peur de l'exclusion.

Il n'est jamais devenu populaire pour ce qu'il a fait. Certains lui en ont voulu pendant des semaines.

Mais il y a des choses qu'il ne peut pas défaire. Sofiane dans ce couloir. Ce "merci" dit rapidement, sans s'arrêter.

C'est suffisant.`,

  fauxCompte: `Elle le découvre par hasard, à vingt-deux heures.

Juliette lui envoie un message : "T'as ouvert un deuxième compte ?"

Camille ne comprend pas. Elle tape son prénom et son nom sur Instagram.

Le compte apparaît immédiatement. Sa vraie photo de profil. Son vrai prénom et son vrai nom de famille. Le nom de son collège dans la bio.

Et des messages — envoyés à ses amis, depuis ce faux compte, depuis au moins dix jours. Des demandes de photos. Des questions sur leur vie privée. Des rumeurs sur des élèves qu'elle n'a jamais rencontrés, racontées avec sa voix, son ton, ses emojis habituels.

En lisant les messages, elle a froid.

Quelqu'un se fait passer pour elle. Depuis combien de temps ? Combien de personnes ont répondu en croyant parler à elle ?

Elle compte. Dix-sept contacts de sa liste d'amis avaient répondu au faux compte. Certains avaient donné des informations. Des photos de groupe. Des captures de conversations privées. Des détails sur d'autres élèves.

Elle prend une capture d'écran du faux profil. Elle change son mot de passe. Elle active la double vérification.

Elle appelle sa mère.

Ensemble, elles déposent un signalement pour usurpation d'identité sur Instagram. Elles envoient également un signalement à Cybermalveillance.gouv.fr, la plateforme nationale. Le faux compte est suspendu quarante-huit heures plus tard.

Mais elle ne sait pas ce qui a été envoyé pendant ces dix jours. Elle ne sait pas qui a répondu, quoi, à quel moment.

Le lendemain à l'école, elle explique à ses amis ce qui s'est passé. Ceux qui avaient répondu au faux compte sont gênés. Elle ne leur en veut pas. Elle aurait peut-être répondu aussi, si quelqu'un avait copié l'identité d'une amie à elle.

Ce qui l'avait sauvée, c'était la question de Juliette. Pas une certitude — juste un doute. "T'as ouvert un deuxième compte ?"

Une question posée avant de répondre. Un instant de vérification.

Le professeur principal organise un atelier avec le référent numérique de l'établissement. Camille y raconte ce qu'elle a vécu. Comment le faux compte était convaincant — les mêmes emojis, le même ton, son vrai visage en photo de profil.

Un élève lève la main : "Comment on vérifie que c'est le vrai compte de quelqu'un ?"

C'est la bonne question.

Elle explique. La date de création du compte. Le nombre d'abonnements. Les incohérences dans les messages. Et surtout : appeler directement la personne, en vrai, avant de répondre à quoi que ce soit.

Une règle simple. Presque évidente, une fois qu'on l'a apprise.`,

  groupePrive: `Le groupe s'appelait "La vraie vie 👀". Dix-neuf membres. Inès l'adorait — les mèmes, les blagues, les rires du vendredi soir.

Jusqu'à ce vendredi-là.

Ce vendredi, quelqu'un poste une photo de Damien. Prise sans qu'il le sache, en classe, cadrage serré sur son visage, avec un commentaire cruel sur son apparence. Le groupe explose. Les messages s'enchaînent. Vingt. Trente. Cinquante réponses en quarante minutes.

Elle lit. Elle ne rit pas.

Elle n'écrit rien non plus. Elle reste là à regarder les messages défiler, avec cette sensation de plus en plus lourde — quelque chose entre la gêne et quelque chose qui ressemble à de la honte. Pas parce qu'elle a participé. Parce qu'elle est là.

Le samedi matin, un message direct dans sa messagerie privée.

"T'as pas répondu dans le groupe. Tu prends la défense de Damien ? Attention, la prochaine, ça pourrait être toi."

Elle fait une capture du message. Puis elle quitte le groupe.

Le lundi, un montage — photo de Damien, texte exagéré, émojis moqueurs — commence à circuler en dehors du groupe. Dans d'autres classes. Dans un groupe de quartier. La mère de Damien le voit sur le téléphone d'un cousin.

Elle appelle l'établissement.

Inès montre ses captures à la CPE ce matin-là — avant même d'avoir su que la mère de Damien avait appelé. Tout : le premier message cruel, les cinquante réponses, la menace reçue en direct. Elle ne cache rien, elle n'arrange rien.

L'enquête de l'établissement prend deux semaines. Plusieurs élèves sont convoqués. Le groupe est dissous. Certains parents sont contactés.

Damien revient en classe quelques jours après. Il s'assoit. Il ne dit pas grand-chose.

Elle ne sait pas s'il sait qu'elle a transmis les captures. Elle n'a pas demandé de remerciements. Elle avait juste fait ce qui lui semblait juste au moment où c'était encore possible d'agir.

Ce que le groupe avait oublié — et qu'elle n'oublie plus — c'est que "privé" ne veut pas dire "invisible". Ça veut juste dire que moins de gens voient.

Pour l'instant.

Une fois qu'une capture sort, le groupe n'est plus privé. Il n'y a pas de retour arrière possible. Ce qui a été écrit en riant, à vingt-deux heures un vendredi soir, peut se retrouver dans la main d'un parent, d'un professeur, d'un étranger — le lundi matin, sans prévenir.

Elle y pense encore, parfois, avant d'envoyer un message dans un groupe.

Elle pense à Damien. Et elle ne l'envoie pas.`,

  /* ── 15-17 ans ── */

  captureStage: `Sara avait trouvé le stage de ses rêves.

Cabinet d'architecture. Trois semaines. Rémunéré. L'entretien téléphonique s'était bien passé — la responsable avait semblé convaincue. Elle attendait la confirmation depuis cinq jours.

Le message est arrivé un jeudi soir. Pas un appel. Pas un email. Un DM Instagram, d'un compte qu'elle ne reconnaissait pas.

"Tu savais que ta conversation avec Léa circule dans un groupe ?"

Elle avait eu quinze ans en 2022. Cette nuit-là — la nuit où elle avait écrit des choses blessantes sur sa prof de physique dans un groupe WhatsApp — elle s'était réveillée le lendemain comme si rien ne s'était passé.

La conversation, elle, n'avait pas oublié.

Quelqu'un l'avait capturée. L'avait gardée. Puis l'avait repartagée deux ans plus tard, dans un groupe local, avec son nom complet en visible — et le nom du cabinet où elle postulait.

Elle cherche la conversation sur ses anciens téléphones. Elle la retrouve. Elle relit. Elle voit ce qu'elle avait écrit à quinze ans, fatiguée, dans un groupe qu'elle croyait fermé.

Ces mots-là, elle ne les écrirait plus. Mais ils existent encore, quelque part, dans la mémoire d'un téléphone qu'elle ne contrôle pas.

L'entretien de confirmation avec la responsable du cabinet a lieu le lendemain. La femme ne mentionne rien pendant les vingt premières minutes. Puis :

"J'ai vu circuler quelque chose à votre sujet. Je veux vous donner la chance de vous expliquer."

Sara explique. Pas d'excuses vides. Des faits. Elle avait quinze ans. Le contexte d'une conversation de fin de journée dans un groupe de classe. Ce qu'elle a appris depuis. Elle regarde la responsable dans les yeux sans détourner le regard.

Silence.

"Je vous rappelle demain."

La nuit est longue.

Le lendemain, la responsable rappelle. Elle dit oui.

Elle ne sait pas si elle aurait obtenu le même résultat avec quelqu'un d'autre. Elle ne le saura jamais. D'autres candidats, dans d'autres secteurs, n'ont pas eu cette chance.

Ce qu'elle sait maintenant : elle passe une heure, une fois par mois, à chercher son nom sur Google. À vérifier ses anciens comptes et leurs paramètres de visibilité. À supprimer ce qui n'appartient plus à ce qu'elle est.

Pas par peur. Par précaution.

Elle conseille la même chose à ses amis. La plupart haussent les épaules — "personne va chercher mon nom". Certains ont cherché. Ils ont trouvé des choses qu'ils avaient oubliées.

Une photo de 2021 sur un compte désactivé, toujours indexée par Google. Un commentaire d'une vieille vidéo YouTube. Un pseudo d'enfance lié à leur vrai nom dans un forum de jeu.

Des traces légères. Presque invisibles. Jusqu'au moment où quelqu'un les cherche vraiment.

À dix-sept ans, on construit quelque chose. L'image en ligne fait partie de cette construction — que ce soit voulu ou non.

Elle préfère la construire consciemment.`,

  vocalPression: `Nassim avait envoyé le vocal en mars. Une vraie confidence. Il faisait confiance à Karim — ils se connaissaient depuis le CM2.

En mai, Karim avait besoin d'une faveur.

Un message simple, sans ponctuation, envoyé comme si c'était une blague : "tu te rappelles ton vocal de mars il est encore là"

Il a relu trois fois. Puis il a compris.

Karim voulait un service : dire quelque chose à la petite amie de son frère. Un mensonge précis. En échange : le silence.

Il écrit : "Non."

Karim répond avec une capture du vocal. "T'es sûr ?"

Il pose le téléphone. Il s'assoit sur son lit. Il pense.

Il aurait pu céder. C'est ce que le chantage demande — juste une fois, juste pour que ça s'arrête. Mais il sait comment ça finit. Une fois n'arrête jamais rien. Une faveur appelle une faveur. Et la personne qui cède devient une personne qu'on peut faire céder encore.

Il ouvre une nouvelle conversation, fait des captures de tout l'échange — chaque message, chaque capture envoyée par Karim. Puis il bloque le numéro.

Le soir même, il parle à sa sœur. Elle lit les messages en silence. Elle dit : "T'as bien fait."

Ensemble, ils vont sur Cybermalveillance.gouv.fr et lisent la procédure pour signaler un chantage numérique. Ils déposent un signalement sur la plateforme Pharos — la plateforme nationale de signalement des contenus illicites sur Internet. Ils appellent le 3018, le numéro national de lutte contre le cyberharcèlement, pour avoir des conseils.

Karim envoie le vocal à deux personnes. Nassim l'apprend. Il contacte lui-même ces deux personnes pour leur expliquer le contexte — ce qu'il avait dit, pourquoi, et ce qui s'était passé ensuite. Sans honte. Avec des faits.

Elles comprennent.

Le chantage avait misé sur deux choses : la honte et l'isolement. Dès qu'il avait parlé — à sa sœur, aux deux personnes visées — le levier avait disparu. Il n'y avait plus rien à menacer de révéler, puisqu'il l'avait dit lui-même.

Il ne reverra plus Karim. Ce n'est pas une perte.

Ce qu'il comprend maintenant — et qu'il n'avait pas vu venir — c'est à quelle vitesse une confidence peut devenir une arme dans de mauvaises mains. Pas parce que la confidence était honteuse. Mais parce que la personne en face avait décidé de s'en servir.

Les vocaux restent. Les messages restent. Les captures restent. Tant qu'ils sont entre des mains malveillantes, ils peuvent servir de levier.

La meilleure réponse n'est pas le silence. Ce n'est pas céder non plus. C'est parler aux bonnes personnes, avant que la peur ne décide à la place.`,

  compteEsport: `Rayan avait mis quatre ans à construire ce compte.

Quatre ans de parties, de classements, de skins achetés avec de l'argent de poche économisé semaine après semaine. Son équipe le connaissait. Les tournois régionaux le connaissaient. Son pseudo — RK_Rayan — apparaissait dans les archives de trois compétitions en ligne.

Le vendredi soir, son compte se déconnecte automatiquement.

Il se reconnecte. Mot de passe refusé.

Il essaie de réinitialiser. L'adresse email de récupération — celle qu'il utilise depuis la cinquième — renvoie un message d'erreur : compte inexistant.

Quelqu'un avait changé l'adresse de récupération.

Il passe deux heures sur les forums. Les tutoriels. La page support officielle. Il suit la procédure — longue, avec des formulaires en anglais, sans aucune garantie.

En attendant, il cherche son pseudo sur Google.

Premier résultat : une annonce sur un forum gris. "Compte Valorant niveau 800, skins rares, 17 victoires de tournoi. Vente immédiate : 120 euros."

Son propre compte. En vente par quelqu'un d'autre.

Son père l'aide à contacter le support officiel. Un ami plus âgé lui montre le site HaveIBeenPwned.com — une base de données qui recense les fuites de données signalées. Il entre l'adresse email qu'il utilisait depuis la cinquième.

Résultat immédiat : cette adresse avait été compromise dans une fuite de données d'un site de streaming en 2021. Des millions d'adresses et de mots de passe exposés.

Il avait utilisé le même mot de passe sur le site de streaming et sur son compte de jeu.

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
      title: "Mon mot de passe en mode super héros",
      slug: "7-11-mot-de-passe-super-heros",
      theme: "password",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔐",
        intro: "Ton mot de passe, c'est ta clé secrète. Sauras-tu la garder safe ?",
        outro: "Un bon mot de passe = long + unique + jamais partagé. Tu es un vrai super-héros du net !",
        questions: [
          {
            emoji: "🤔",
            q: "Ton copain te demande ton mot de passe pour t'aider sur un jeu. Tu fais quoi ?",
            options: ["Je le lui donne, c'est mon meilleur ami.", "Je refuse poliment, même aux amis.", "Je lui donne juste les 3 premiers caractères."],
            correct: 1,
            explain: "On ne donne son mot de passe à PERSONNE, même à un très bon ami. Il pourrait l'utiliser sans le vouloir, ou quelqu'un d'autre pourrait le voir."
          },
          {
            emoji: "🦸",
            q: "Lequel de ces mots de passe est le plus solide ?",
            options: ["chat", "M0nCh@t€st$uper!", "123456"],
            correct: 1,
            explain: "Un bon mot de passe mélange majuscules, chiffres et symboles. 'M0nCh@t€st$uper!' est long et varié : très difficile à deviner !"
          },
          {
            emoji: "📝",
            q: "Tu as du mal à retenir ton mot de passe. Qu'est-ce que tu fais ?",
            options: ["Je l'écris sur un papier collé sur l'écran.", "Je demande à un adulte de confiance de m'aider à en créer un facile à retenir.", "J'utilise 'azerty' pour m'en souvenir facilement."],
            correct: 1,
            explain: "Un adulte de confiance peut t'aider à créer une phrase-code rigolote, par exemple : 'JAdore3PizzaS!' — facile à retenir, difficile à deviner !"
          }
        ]
      })
    },
    {
      title: "Mon profil privé, pas public",
      slug: "7-11-profil-prive-pas-public",
      theme: "confidentialite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔒",
        intro: "Ton profil en ligne, c'est comme ta chambre. Qui as-tu le droit de laisser entrer ?",
        outro: "Un profil privé = seulement tes vrais amis voient tes posts. Demande à un adulte de vérifier les réglages avec toi !",
        questions: [
          {
            emoji: "👀",
            q: "Ton profil est en mode 'public'. Qui peut voir tes photos ?",
            options: ["Seulement mes amis.", "N'importe qui sur internet, y compris des inconnus.", "Seulement ma famille."],
            correct: 1,
            explain: "Un profil public est visible par TOUT le monde sur internet. Des inconnus peuvent voir tes photos, ton prénom, ton école…"
          },
          {
            emoji: "⚙️",
            q: "Pour passer ton profil en privé, tu dois aller dans :",
            options: ["Les 'Stories'.", "Les 'Paramètres' ou 'Réglages' de l'appli.", "La page d'accueil."],
            correct: 1,
            explain: "Dans les Paramètres de presque toutes les applis, il y a une option Confidentialité ou Compte privé. Cherche-la avec un adulte !"
          },
          {
            emoji: "🤳",
            q: "Un inconnu te suit sur les réseaux et voit tout. Qu'est-ce que tu dois faire ?",
            options: ["Je le laisse, ce n'est pas grave.", "Je passe mon profil en privé et je le bloque.", "Je publie encore plus pour qu'il me trouve cool."],
            correct: 1,
            explain: "Profil privé + bloquer les inconnus = tu contrôles qui te voit. C'est TON espace, tu choisis qui entre !"
          }
        ]
      })
    },
    {
      title: "Photo cool sans infos perso",
      slug: "7-11-photo-cool-sans-infos-perso",
      theme: "image",
      content: JSON.stringify({
        type: "quiz",
        emoji: "📷",
        intro: "Avant de poster une photo, 3 secondes de réflexion peuvent tout changer !",
        outro: "Regarde toujours l'arrière-plan avant de poster. Ta sécurité vaut plus qu'un like !",
        questions: [
          {
            emoji: "🏫",
            q: "Tu postes une photo de toi devant ton école. Qu'est-ce qui est risqué ?",
            options: ["Rien, c'est juste une photo.", "On peut voir le nom de l'école et deviner où tu es chaque matin.", "La photo est floue."],
            correct: 1,
            explain: "Le nom ou l'enseigne de ton école dans une photo peut dire à un inconnu où tu es tous les matins à la même heure. Trop d'infos !"
          },
          {
            emoji: "🗺️",
            q: "Ton appli photo propose d'ajouter ta localisation à l'image. Tu fais quoi ?",
            options: ["J'active la localisation, c'est pratique.", "Je désactive la localisation dans les réglages.", "J'ajoute l'adresse exacte de ma maison."],
            correct: 1,
            explain: "La localisation dans les photos révèle exactement où tu es. Désactive-la dans les réglages de ton appareil photo !"
          },
          {
            emoji: "🔍",
            q: "Avant de poster, tu dois vérifier quoi dans l'arrière-plan ?",
            options: ["Si l'image est bien éclairée.", "Si on voit le nom de ton école, ta rue ou des infos personnelles.", "Si le filtre est joli."],
            correct: 1,
            explain: "L'arrière-plan d'une photo peut trahir ton adresse, ton école ou ta routine. Prends 3 secondes pour vérifier avant de publier !"
          }
        ]
      })
    },
    {
      title: "Que faire si un inconnu écrit",
      slug: "7-11-inconnu-ecrit",
      theme: "inconnus",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🧭",
        intro: "Un inconnu t'envoie un message. Sauris-tu quoi faire ?",
        outro: "Règle d'or : un inconnu en ligne = adulte de confiance au courant. Tu n'es jamais seul(e) !",
        questions: [
          {
            emoji: "💬",
            q: "Un inconnu t'écrit 'Salut, t'es sympa ! C'est quoi ton école ?'. Tu fais quoi ?",
            options: ["Je réponds, c'est gentil.", "Je ne réponds pas et je montre le message à un adulte.", "Je donne mon école mais pas mon prénom."],
            correct: 1,
            explain: "On ne donne jamais d'infos perso à un inconnu en ligne. Et on montre toujours le message à un adulte de confiance !"
          },
          {
            emoji: "🚫",
            q: "Comment bloquer quelqu'un sur la plupart des applis ?",
            options: ["Il n'y a pas de bouton bloquer.", "On clique sur son profil puis 'Bloquer' ou '…' puis 'Signaler'.", "On doit fermer l'appli."],
            correct: 1,
            explain: "Presque toutes les applis ont un bouton 'Bloquer' et 'Signaler'. Ça empêche la personne de te contacter. Demande à un adulte de t'aider si tu ne le trouves pas."
          },
          {
            emoji: "😟",
            q: "L'inconnu dit 'Ne le dis à personne, c'est notre secret'. C'est un signal :",
            options: ["Normal, il est timide.", "Dangereux. Les adultes bienveillants ne demandent pas de garder des secrets.", "Sympa, il me fait confiance."],
            correct: 1,
            explain: "'Garde le secret' de la part d'un inconnu est un signe d'alerte. Dis-le tout de suite à un adulte de confiance. Tu ne trahis personne, tu te protèges !"
          }
        ]
      })
    },
    {
      title: "Dire non à un défi qui gêne",
      slug: "7-11-dire-non-defi-gene",
      theme: "pression",
      content: JSON.stringify({
        type: "quiz",
        emoji: "💪",
        intro: "Tes amis te poussent à faire quelque chose qui te met mal à l'aise. Tu sais dire non ?",
        outro: "Dire non, c'est courageux. Un vrai ami respecte toujours ton choix !",
        questions: [
          {
            emoji: "🎯",
            q: "Tes amis veulent que tu postes une photo bizarre de toi en ligne. Tu te sens mal à l'aise. Tu fais quoi ?",
            options: ["Je le fais pour pas décevoir le groupe.", "Je dis non. Mon ressenti compte plus que leur défi.", "Je fais la photo mais je la supprime après."],
            correct: 1,
            explain: "Ton confort est plus important que n'importe quel défi. Dire non clairement, c'est montrer du respect envers toi-même !"
          },
          {
            emoji: "🤝",
            q: "Un vrai ami, c'est quelqu'un qui :",
            options: ["Te force à faire des trucs pour prouver ton amitié.", "Respecte ton non sans se mettre en colère.", "Se fâche si tu refuses un défi."],
            correct: 1,
            explain: "L'amitié vraie, c'est le respect. Si quelqu'un se fâche parce que tu refuses, ce n'est pas un vrai ami."
          },
          {
            emoji: "📢",
            q: "Si un défi en ligne te fait peur ou te met mal à l'aise, tu dois :",
            options: ["Faire le défi quand même pour ne pas être exclu.", "En parler à un adulte de confiance.", "Regarder d'abord si d'autres le font."],
            correct: 1,
            explain: "Certains défis viraux peuvent être dangereux. Un adulte peut t'aider à comprendre les risques et à dire non avec confiance !"
          }
        ]
      })
    },
    {
      title: "Mon avatar plutôt que ma vraie photo",
      slug: "7-11-avatar-plutot-vraie-photo",
      theme: "identite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🦸",
        intro: "Utiliser un avatar, c'est stylé ET plus sûr. Tu sais pourquoi ?",
        outro: "Un avatar cool te représente sans révéler ton vrai visage. Créatif et prudent à la fois !",
        questions: [
          {
            emoji: "🖼️",
            q: "Pourquoi utiliser un avatar plutôt que ta vraie photo de profil ?",
            options: ["Parce que les avatars sont plus jolis.", "Pour que les inconnus ne puissent pas voir à quoi tu ressembles vraiment.", "Parce que tout le monde le fait."],
            correct: 1,
            explain: "Avec un avatar, les inconnus ne savent pas à quoi tu ressembles. C'est une protection simple et efficace !"
          },
          {
            emoji: "🔄",
            q: "Tu as mis ta vraie photo sur un site de jeux en ligne. Qu'est-ce que tu peux faire ?",
            options: ["Rien, c'est trop tard.", "Remplacer la photo par un avatar dans les réglages du profil.", "Supprimer le compte entier."],
            correct: 1,
            explain: "Tu peux changer ta photo de profil quand tu veux ! Va dans les paramètres et remplace-la par un avatar sympa."
          },
          {
            emoji: "🎨",
            q: "Pour créer un avatar sympa, tu peux :",
            options: ["Prendre la photo d'un camarade sans lui demander.", "Utiliser un site ou une appli de création d'avatars.", "Mettre la photo de ton chien."],
            correct: 1,
            explain: "Des tas d'outils en ligne permettent de créer un avatar unique qui te ressemble sans montrer ta vraie tête. Amusant et sécurisé !"
          }
        ]
      })
    },
    {
      title: "Capture d'écran, ça voyage !",
      slug: "7-11-capture-ecran-voyage",
      theme: "partage",
      content: JSON.stringify({
        type: "quiz",
        emoji: "📸",
        intro: "Tu envoies un message privé… mais est-ce qu'il reste vraiment privé ?",
        outro: "Sur internet, rien n'est vraiment privé. N'écris que ce que tu accepterais de voir partagé partout !",
        questions: [
          {
            emoji: "💌",
            q: "Tu envoies un message privé à un ami. Qui peut le voir ?",
            options: ["Seulement mon ami, c'est privé.", "Ton ami peut faire une capture et le montrer à n'importe qui.", "Personne, les messages disparaissent."],
            correct: 1,
            explain: "Un message 'privé' peut être capturé en une seconde et partagé à des centaines de personnes. Aucune appli ne peut empêcher ça !"
          },
          {
            emoji: "🤔",
            q: "Avant d'envoyer un message ou une photo, tu dois te demander :",
            options: ["Est-ce que c'est drôle ?", "Est-ce que j'accepterais que tout le monde le voie ?", "Est-ce que c'est long ?"],
            correct: 1,
            explain: "La règle d'or : si tu n'acceptes pas que ta famille ou ton prof le voie, ne l'envoie pas. Même en 'privé' !"
          },
          {
            emoji: "😬",
            q: "Ton ami a capturé ton message privé et l'a partagé. Tu fais quoi ?",
            options: ["Je réponds en colère publiquement.", "J'en parle à un adulte de confiance pour trouver la meilleure réaction.", "J'envoie encore plus de messages pour expliquer."],
            correct: 1,
            explain: "Agir sous la colère aggrave souvent les choses. Un adulte peut t'aider à gérer la situation calmement et efficacement !"
          }
        ]
      })
    },
    {
      title: "Parler à un adulte, c'est une force",
      slug: "7-11-parler-adulte-force",
      theme: "aide",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🤝",
        intro: "Quand quelque chose te tracasse sur internet, parler à un adulte c'est la meilleure arme !",
        outro: "Parler, c'est agir. Tu n'es jamais seul(e) face aux problèmes en ligne !",
        questions: [
          {
            emoji: "😟",
            q: "Quelque chose sur internet te fait peur ou te tracasse. C'est mieux de :",
            options: ["Garder ça pour toi pour ne pas inquiéter tes parents.", "En parler à un adulte de confiance.", "En parler seulement à tes amis du même âge."],
            correct: 1,
            explain: "Les adultes ont plus d'expérience pour aider. Parler, ce n'est pas se plaindre — c'est se protéger !"
          },
          {
            emoji: "👥",
            q: "Qui peut être un adulte de confiance ?",
            options: ["Seulement ta maman ou ton papa.", "Un parent, un prof, un éducateur, un grand frère ou sœur majeur.", "N'importe quel adulte sur internet."],
            correct: 1,
            explain: "Un adulte de confiance, c'est quelqu'un que tu connais dans la vraie vie et en qui tu as confiance. Pas un inconnu en ligne !"
          },
          {
            emoji: "🗣️",
            q: "Tu as honte de ce qui s'est passé en ligne et tu ne veux pas en parler. Que faire ?",
            options: ["Garder le secret indéfiniment.", "Essayer quand même d'en parler : la honte disparaît souvent après avoir parlé.", "Supprimer toutes les preuves."],
            correct: 1,
            explain: "La honte, c'est normal. Mais parler à un adulte de confiance, c'est le premier pas vers une solution. Il ne t'en voudra pas !"
          }
        ]
      })
    },
    {
      title: "Temps d'écran et pauses malines",
      slug: "7-11-temps-ecran-pauses",
      theme: "bien-etre",
      content: JSON.stringify({
        type: "quiz",
        emoji: "⏱️",
        intro: "Ton cerveau et tes yeux ont besoin de pauses. Sauras-tu les écouter ?",
        outro: "Des pauses régulières = tu joues mieux, tu dors mieux, tu te sens mieux. Smart !",
        questions: [
          {
            emoji: "👁️",
            q: "Après combien de temps faut-il faire une pause d'écran ?",
            options: ["Après 3 heures.", "Toutes les 30 à 45 minutes.", "Seulement quand les yeux font mal."],
            correct: 1,
            explain: "La règle 20-20-20 : toutes les 20 minutes, regarde quelque chose à 20 pieds (6 m) pendant 20 secondes. Ta vue dit merci !"
          },
          {
            emoji: "😴",
            q: "Tu joues tard le soir sur ton téléphone. Qu'est-ce qui risque d'arriver ?",
            options: ["Rien, j'irai dormir quand j'aurai fini le niveau.", "La lumière bleue perturbe ton sommeil et tu seras fatigué le lendemain.", "Ton téléphone va chauffer."],
            correct: 1,
            explain: "La lumière des écrans retarde l'endormissement. L'idéal : éteindre les écrans 1h avant de dormir pour bien récupérer !"
          },
          {
            emoji: "🏃",
            q: "La meilleure pause d'écran, c'est :",
            options: ["Regarder une autre vidéo sur un autre écran.", "Bouger : marcher, sauter, jouer dehors.", "Fermer les yeux mais rester assis."],
            correct: 1,
            explain: "Bouger, c'est la meilleure pause ! Ça relance la circulation, aide le cerveau et tes yeux se reposent vraiment !"
          }
        ]
      })
    },
    {
      title: "La règle d'or avant de cliquer",
      slug: "7-11-regle-or-avant-cliquer",
      theme: "liens",
      content: JSON.stringify({
        type: "quiz",
        emoji: "⚠️",
        intro: "Tu reçois un lien bizarre… cliquer ou pas ? Teste tes réflexes !",
        outro: "Règle d'or : si un lien semble bizarre ou trop beau pour être vrai, STOP. Demande à un adulte !",
        questions: [
          {
            emoji: "🎁",
            q: "Tu reçois un message : 'Tu as gagné un iPhone ! Clique ici !'. Tu fais quoi ?",
            options: ["Je clique vite avant que ça disparaisse !", "Je ne clique pas, c'est sûrement une arnaque.", "Je le montre à mes amis pour qu'ils cliquent aussi."],
            correct: 1,
            explain: "Les fausses promesses de cadeaux sont des pièges très courants. Si c'est trop beau pour être vrai, c'est faux !"
          },
          {
            emoji: "🔗",
            q: "Un lien suspect, c'est souvent :",
            options: ["Un lien vers YouTube ou Google.", "Un lien très long avec des caractères bizarres, ou écrit avec des fautes.", "Un lien court et simple."],
            correct: 1,
            explain: "Les liens dangereux ont souvent des noms bizarres, des fautes ou imitent de vrais sites (ex: 'g00gle.com' au lieu de 'google.com'). Méfie-toi !"
          },
          {
            emoji: "🧑‍💻",
            q: "Tu as cliqué par accident sur un lien bizarre. Tu dois :",
            options: ["Continuer à naviguer normalement.", "Fermer la page et prévenir un adulte tout de suite.", "Entrer ton mot de passe pour vérifier que c'est sûr."],
            correct: 1,
            explain: "Ferme la page, ne donne aucune info, et préviens un adulte immédiatement. Ne surtout pas entrer de mot de passe ou d'infos perso !"
          }
        ]
      })
    }
  ]);

  addTutorials("12_14", [
    {
      title: "Mot de passe unique pour chaque appli",
      slug: "12-14-mot-de-passe-unique-appli",
      theme: "password",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔑",
        intro: "Un seul mot de passe partout = une catastrophe si un site est piraté. Tu connais l'effet domino ?",
        outro: "Règle pro : 1 compte = 1 mot de passe unique. Un gestionnaire de mots de passe peut tout retenir à ta place !",
        questions: [
          {
            emoji: "💥",
            q: "Tu utilises le même mot de passe partout. Un site se fait pirater. Que risques-tu ?",
            options: ["Rien, c'est juste un site.", "Les hackers essaient ton mot de passe sur TOUS tes autres comptes automatiquement.", "Juste perdre ton compte sur ce site."],
            correct: 1,
            explain: "C'est l'effet domino : un site piraté = tous tes comptes en danger. Les hackers utilisent des robots pour tester tes identifiants partout !"
          },
          {
            emoji: "🧩",
            q: "Comment créer un mot de passe solide et différent pour chaque compte ?",
            options: ["Mettre le nom du site + '123'.", "Utiliser une phrase de passe : ex. 'J3Mange2Pizza@Midi!', varier selon le site.", "Utiliser son prénom + sa date de naissance."],
            correct: 1,
            explain: "Une phrase de passe est longue, facile à retenir et solide. Tu peux y ajouter initiales du site pour le rendre unique : 'J3Mange2Pizza@MidI_TT' pour TikTok !"
          },
          {
            emoji: "🗝️",
            q: "Retenir 20 mots de passe différents c'est impossible. La solution ?",
            options: ["Les noter tous dans un carnet papier.", "Utiliser un gestionnaire de mots de passe (app sécurisée qui retient tout).", "Utiliser le même partout mais le changer souvent."],
            correct: 1,
            explain: "Un gestionnaire de mots de passe (Bitwarden, 1Password…) stocke et génère des mots de passe ultra-solides. Tu n'en retiens plus qu'un seul : le maître !"
          },
          {
            emoji: "🚨",
            q: "Tu penses qu'un de tes comptes a été piraté. Premier réflexe ?",
            options: ["Attendre et voir ce qui se passe.", "Changer le mot de passe immédiatement depuis un appareil sûr.", "Supprimer l'application."],
            correct: 1,
            explain: "Change le mot de passe en urgence ! Si tu utilises ce même mot de passe ailleurs, change-le sur tous ces comptes aussi. Puis active la double authentification !"
          }
        ]
      })
    },
    {
      title: "Active la double authentification",
      slug: "12-14-active-double-auth",
      theme: "securite-compte",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🛡️",
        intro: "La double authentification (2FA), c'est comme une double serrure sur ta porte. Tu sais l'activer ?",
        outro: "La 2FA bloque 99% des tentatives de piratage automatisées. Active-la sur tous tes comptes importants !",
        questions: [
          {
            emoji: "📱",
            q: "La double authentification, c'est quoi exactement ?",
            options: ["Avoir deux mots de passe.", "Un code envoyé par SMS ou appli en plus du mot de passe.", "Changer de mot de passe deux fois par mois."],
            correct: 1,
            explain: "Avec la 2FA, même si quelqu'un vole ton mot de passe, il lui faut aussi ton téléphone pour accéder à ton compte. Double protection !"
          },
          {
            emoji: "⚙️",
            q: "Où activer la double authentification ?",
            options: ["Impossible, c'est réservé aux entreprises.", "Dans les Paramètres > Sécurité ou Confidentialité de chaque appli.", "Sur le site de Google uniquement."],
            correct: 1,
            explain: "Instagram, Snapchat, TikTok, Gmail… presque toutes les applis proposent la 2FA dans leurs réglages de sécurité. Cherche 'Authentification à deux facteurs' !"
          },
          {
            emoji: "📨",
            q: "Tu reçois un code 2FA par SMS alors que tu n'as pas essayé de te connecter. C'est :",
            options: ["Normal, ça arrive tout seul.", "Un signe que quelqu'un essaie de pirater ton compte. Change ton mot de passe immédiatement.", "Un bug de l'opérateur."],
            correct: 1,
            explain: "Un code 2FA que tu n'as pas demandé = quelqu'un a ton mot de passe et tente d'entrer. Change-le en urgence et préviens un adulte !"
          },
          {
            emoji: "✅",
            q: "Sur quels comptes activer la 2FA en priorité ?",
            options: ["Sur aucun, c'est trop compliqué.", "Sur ton email principal, tes réseaux sociaux et tes comptes de jeux.", "Seulement sur la banque."],
            correct: 1,
            explain: "L'email est la clé de tous tes autres comptes (réinitialisation de mots de passe). C'est la priorité absolue, suivi des réseaux et jeux !"
          }
        ]
      })
    },
    {
      title: "Régler qui peut te contacter",
      slug: "12-14-regler-qui-contacter",
      theme: "confidentialite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🎛️",
        intro: "Qui peut t'envoyer des messages ? Qui voit tes posts ? Tu contrôles tout ça !",
        outro: "En 5 min dans tes paramètres, tu peux bloquer les inconnus et reprendre le contrôle de ton espace !",
        questions: [
          {
            emoji: "📩",
            q: "Des inconnus t'envoient des DM non sollicités. Comment les bloquer définitivement ?",
            options: ["Les ignorer un par un.", "Dans Paramètres > Messages : autoriser seulement les amis à t'envoyer des messages.", "Désactiver les notifications."],
            correct: 1,
            explain: "Limiter les DM aux amis dans les paramètres = plus aucun inconnu ne peut te contacter. Simple et efficace !"
          },
          {
            emoji: "👁️",
            q: "Tu veux que tes posts soient vus uniquement par tes abonnés. Il faut :",
            options: ["Poster moins souvent.", "Passer le compte en privé dans Paramètres > Confidentialité.", "Supprimer les stories."],
            correct: 1,
            explain: "Compte privé = seulement tes abonnés approuvés voient tes posts. Les inconnus voient juste ton nom et ta photo de profil."
          },
          {
            emoji: "🔔",
            q: "Une personne que tu ne connais pas te commente de façon insistante. Tu fais quoi ?",
            options: ["Je réponds pour expliquer que ça me dérange.", "Je la bloque, je signale le compte et j'active le filtre de commentaires.", "Je rends mon compte encore plus public pour montrer que ça ne m'affecte pas."],
            correct: 1,
            explain: "Bloquer + signaler = protéger ta communauté en plus de toi. Le filtre de commentaires automatique (Instagram, TikTok) peut aussi filtrer les mots offensants !"
          },
          {
            emoji: "🗂️",
            q: "Tu fais quoi avec les 'demandes d'abonnement' d'inconnus ?",
            options: ["J'accepte tout le monde pour avoir plus d'abonnés.", "Je vérifie le profil : peu de posts, pas de connaissances communes = je refuse.", "Je regarde juste s'ils semblent sympa."],
            correct: 1,
            explain: "Un profil vide ou récent, sans ami en commun, c'est souvent un faux compte ou quelqu'un de mal intentionné. En cas de doute, refuse !"
          }
        ]
      })
    },
    {
      title: "Réagir à la pression du groupe",
      slug: "12-14-reagir-pression-groupe",
      theme: "pression",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🧠",
        intro: "Tout le groupe fait quelque chose que tu trouves pas cool… comment tenir bon ?",
        outro: "Ralentis, respire, pense par toi-même. Le bon choix n'est pas toujours le plus populaire !",
        questions: [
          {
            emoji: "😰",
            q: "Le groupe te pousse à partager une rumeur sur quelqu'un de l'école. Tu fais quoi ?",
            options: ["Je partage, sinon je vais être exclu.", "Je refuse et j'explique que je ne veux pas participer.", "Je partage mais en mode anonyme."],
            correct: 1,
            explain: "Partager une rumeur, même en groupe, peut te mettre en cause pour cyberharcèlement. Refuser, c'est courageux et c'est ton droit !"
          },
          {
            emoji: "⏸️",
            q: "Avant de suivre le groupe dans quelque chose d'incertain, la meilleure technique c'est :",
            options: ["Agir vite pour pas rater.", "Marquer une pause : 'J'ai besoin de réfléchir.' Ça donne le temps de peser le pour et le contre.", "Demander à l'abonné le plus populaire."],
            correct: 1,
            explain: "La pression de groupe crée l'urgence artificielle. Dire 'j'ai besoin de 5 minutes' casse ce mécanisme et te donne le contrôle !"
          },
          {
            emoji: "💬",
            q: "Comment dire non au groupe sans créer de conflit ?",
            options: ["Disparaître du groupe sans rien dire.", "'Moi je passe, mais faites comme vous voulez.' Clair, sans agressivité.", "Insulter celui qui propose."],
            correct: 1,
            explain: "Une phrase courte et neutre = tu te respectes sans attaquer le groupe. Souvent, d'autres dans le groupe pensent pareil mais n'osent pas !"
          },
          {
            emoji: "🆘",
            q: "Le groupe te presse depuis des semaines et tu te sens vraiment mal. Tu dois :",
            options: ["Finir par céder pour que ça s'arrête.", "En parler à un adulte de confiance ou un psy scolaire.", "Changer de groupe d'amis sans rien dire."],
            correct: 1,
            explain: "Une pression persistante, c'est une forme de harcèlement. Le CPE, le psy scolaire ou tes parents peuvent t'aider à reprendre le dessus !"
          }
        ]
      })
    },
    {
      title: "Reconnaître un faux compte",
      slug: "12-14-reconnaitre-faux-compte",
      theme: "manipulation",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🕵️",
        intro: "Les faux comptes existent partout. Sauras-tu repérer un imposteur ?",
        outro: "Vérifie toujours : ancienneté, contenu, amis en commun. En cas de doute = zéro confiance !",
        questions: [
          {
            emoji: "📊",
            q: "Un compte te suit. Il a 3 posts, 0 abonné et a été créé il y a 2 jours. C'est :",
            options: ["Quelqu'un de timide qui débute.", "Un signal d'alerte fort : très probablement un faux compte.", "Normal pour un nouveau compte."],
            correct: 1,
            explain: "Un compte très récent avec peu de contenu et zéro réseau = souvent un faux profil créé pour espionner ou manipuler. Méfiance !"
          },
          {
            emoji: "🖼️",
            q: "La photo de profil semble trop parfaite, comme une photo de magazine. Tu fais quoi ?",
            options: ["C'est sûrement un influenceur.", "Je fais un clic droit > Recherche d'image pour vérifier si c'est une photo volée.", "Je n'y prête pas attention."],
            correct: 1,
            explain: "La recherche inversée d'image (Google Images ou TinEye) révèle si la photo vient d'internet et appartient à quelqu'un d'autre. Astuce de pro !"
          },
          {
            emoji: "💸",
            q: "Un compte inconnu te demande de l'argent ou des cartes cadeaux 'en urgence'. C'est :",
            options: ["Peut-être légitime si la personne semble sympathique.", "Toujours une arnaque. Aucune vraie personne ne te demandera ça en ligne.", "Normal si c'est présenté comme une situation d'urgence."],
            correct: 1,
            explain: "La demande d'argent en ligne par un inconnu ou même un 'ami' soudainement dans la misère = scénario classique d'arnaque. Jamais d'argent à des inconnus !"
          },
          {
            emoji: "🤝",
            q: "Un compte prétend être ton artiste préféré et te DM. C'est :",
            options: ["Super, je vais lui répondre !", "Presque toujours un faux. Les célébrités ont un badge de certification (✓ ou ✅).", "Peut-être vrai s'il connaît les paroles de ses chansons."],
            correct: 1,
            explain: "Les célébrités ont un badge officiel sur les plateformes. Sans badge, c'est un fan account ou un arnaqueur qui usurpe leur identité !"
          }
        ]
      })
    },
    {
      title: "Partage de photo et consentement",
      slug: "12-14-partage-photo-consentement",
      theme: "image",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🤳",
        intro: "Poster la photo d'un ami sans lui demander — ça semble anodin. Mais c'est loin d'être neutre.",
        outro: "Le consentement, c'est simple : pas d'accord explicite = pas de publication. C'est une règle de respect.",
        questions: [
          {
            emoji: "📸",
            q: "Tu as une super photo de groupe. L'un de tes amis te demande de ne pas la poster. Tu fais quoi ?",
            options: ["Je la poste quand même, c'est ma photo.", "Je respecte sa demande et ne la poste pas.", "Je la poste mais je le déstague."],
            correct: 1,
            explain: "Chaque personne a le droit à son image. Poster une photo de quelqu'un sans accord, même en le déstaguant, viole son droit à l'image !"
          },
          {
            emoji: "⚖️",
            q: "En France, publier la photo de quelqu'un sans son accord peut entraîner :",
            options: ["Rien du tout, c'est internet.", "Des poursuites légales pour atteinte à la vie privée.", "Juste une suppression de post."],
            correct: 1,
            explain: "Le droit à l'image est protégé par la loi. Sans accord, tu risques une amende et même des sanctions pénales, même si la personne est ton ami !"
          },
          {
            emoji: "😬",
            q: "Tu trouves une photo gênante d'un camarade publiée par quelqu'un d'autre. Tu fais quoi ?",
            options: ["Je la partage, tout le monde la verra de toute façon.", "Je la signale à la plateforme et j'en parle à un adulte.", "Je la sauvegarde sur mon téléphone."],
            correct: 1,
            explain: "Signaler et ne pas partager, c'est la bonne action. Participer à la diffusion aggrave la situation et peut te rendre complice !"
          },
          {
            emoji: "🔁",
            q: "Tu as posté une photo d'un ami sans réfléchir. Il est en colère. Quoi faire ?",
            options: ["Attendre que ça passe.", "Supprimer la photo immédiatement et s'excuser sincèrement.", "Lui expliquer que c'est pas grave."],
            correct: 1,
            explain: "Supprimer sans délai + s'excuser = la bonne réaction. Ça montre que tu prends au sérieux son droit à l'image !"
          }
        ]
      })
    },
    {
      title: "Que faire en cas d'insulte en ligne",
      slug: "12-14-insulte-en-ligne",
      theme: "harcelement",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🛡️",
        intro: "Quelqu'un t'insulte en ligne. La colère monte. Quelle est la meilleure stratégie ?",
        outro: "Capture → Bloque → Signale → Adulte. Dans cet ordre, ça marche !",
        questions: [
          {
            emoji: "😡",
            q: "Tu reçois des insultes en commentaires. Premier réflexe :",
            options: ["Répondre avec des insultes encore pires.", "Capturer les preuves avant de faire quoi que ce soit d'autre.", "Supprimer mon post pour que ça s'arrête."],
            correct: 1,
            explain: "Les captures d'écran sont tes preuves. Sans elles, signaler devient difficile. Capture d'abord, agis ensuite !"
          },
          {
            emoji: "🚫",
            q: "Après avoir capturé les preuves, tu dois :",
            options: ["Répondre calmement en public.", "Bloquer la personne et signaler le compte à la plateforme.", "Attendre que quelqu'un d'autre réagisse."],
            correct: 1,
            explain: "Bloquer coupe le contact. Signaler aide la plateforme à agir et protège d'autres utilisateurs. Les deux ensemble sont plus efficaces !"
          },
          {
            emoji: "🕊️",
            q: "Pourquoi il ne faut PAS répondre sous la colère ?",
            options: ["Parce que ça prend trop de temps.", "Une réponse agressive peut t'attirer plus d'attaques et te faire passer pour l'agresseur.", "Parce que ça ne changera rien."],
            correct: 1,
            explain: "Les harceleurs cherchent souvent une réaction. Répondre agressivement les nourrit. Le silence actif (bloquer + signaler) est bien plus puissant !"
          },
          {
            emoji: "👨‍🏫",
            q: "Si les insultes continuent ou impliquent des camarades de classe, il faut :",
            options: ["Gérer ça tout seul pour ne pas paraître faible.", "En parler au CPE, au prof principal ou à tes parents avec les captures.", "Changer d'école."],
            correct: 1,
            explain: "Le cyberharcèlement impliquant des camarades de classe peut être traité par l'établissement. Le CPE a des outils pour agir. Parle-lui avec tes preuves !"
          }
        ]
      })
    },
    {
      title: "Concours, cadeaux et arnaques",
      slug: "12-14-concours-cadeaux-arnaques",
      theme: "arnaques",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🎣",
        intro: "Un concours miracle, un cadeau incroyable… ou un piège ? Teste ton flair anti-arnaque !",
        outro: "Si une offre semble trop belle pour être vraie, c'est très probablement une arnaque. Vérifie toujours la source !",
        questions: [
          {
            emoji: "🎁",
            q: "Tu vois : 'Gagne un smartphone en partageant ce post et en suivant ce compte !' C'est :",
            options: ["Un vrai concours, c'est courant.", "Probablement une arnaque pour augmenter les abonnés et récupérer tes données.", "Légal et sûr si c'est une grande marque."],
            correct: 1,
            explain: "Ces 'concours' servent surtout à gonfler les comptes ou récupérer des emails. Les vrais concours de marques ont des règles officielles et un site vérifié !"
          },
          {
            emoji: "📧",
            q: "Tu reçois un email : 'Tu as gagné 500€ ! Donne tes infos bancaires pour recevoir le virement.' Tu :",
            options: ["Donnes tes infos, tu as besoin d'argent.", "Supprimes l'email et n'y touches pas. C'est du phishing.", "Appelles le numéro indiqué dans l'email."],
            correct: 1,
            explain: "Phishing = hameçonnage. Ces emails imitent de vraies entreprises pour voler tes données. Jamais de coordonnées bancaires par email !"
          },
          {
            emoji: "🔍",
            q: "Comment vérifier si un concours est légitime ?",
            options: ["Regarder le nombre de likes du post.", "Chercher le nom de l'organisateur sur le site officiel de la marque.", "Demander à un ami s'il en a entendu parler."],
            correct: 1,
            explain: "Le site officiel de la marque ou une recherche Google 'nom + arnaque' te dit rapidement si c'est réel. Les vraies marques annoncent leurs concours officiellement !"
          },
          {
            emoji: "🚨",
            q: "Tu as donné des infos perso dans un faux concours. Que faire ?",
            options: ["Rien, ce n'est pas grave.", "Prévenir un adulte, changer les mots de passe liés et surveiller tes comptes.", "Attendre de voir si tu reçois quelque chose."],
            correct: 1,
            explain: "Agis vite ! Change tes mots de passe, surveille tes comptes, et préviens un adulte. Plus tôt tu agis, moins les conséquences sont graves !"
          }
        ]
      })
    },
    {
      title: "Gérer son image numérique",
      slug: "12-14-gerer-image-numerique",
      theme: "identite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🪞",
        intro: "Ce que tu postes aujourd'hui peut être vu dans 10 ans. Tu es le patron de ton image numérique !",
        outro: "Avant chaque post, pense à ton futur toi. Ton image numérique se construit à chaque publication !",
        questions: [
          {
            emoji: "📅",
            q: "Tu postes une photo embarrassante en story. En 24h, elle disparaît. Mais :",
            options: ["C'est vrai, personne ne peut la revoir.", "Quelqu'un a pu faire une capture ou la sauvegarder en 24h.", "Elle disparaît même des captures d'écran."],
            correct: 1,
            explain: "Les stories 'éphémères' peuvent être capturées. Ce qui est posté une seconde peut circuler des années. Rien n'est vraiment éphémère sur internet !"
          },
          {
            emoji: "💼",
            q: "Dans quelques années, un employeur pourrait :",
            options: ["Googler ton nom et tomber sur tes anciens posts publics.", "Jamais accéder à tes réseaux sociaux.", "Seulement voir ton CV."],
            correct: 1,
            explain: "De nombreux recruteurs cherchent le nom des candidats en ligne. Des photos ou commentaires anciens peuvent influencer leur décision !"
          },
          {
            emoji: "🧹",
            q: "Comment vérifier et nettoyer ton image numérique ?",
            options: ["C'est impossible une fois posté.", "Chercher ton prénom + nom sur Google et supprimer ou privatiser les posts gênants.", "Changer de prénom en ligne."],
            correct: 1,
            explain: "Fais un audit de toi-même : Google ton nom, vérifie ce qui est public sur tes réseaux, supprime ou restreins ce qui peut nuire à ton image !"
          },
          {
            emoji: "✨",
            q: "Construire une bonne image numérique, ça peut aussi servir à :",
            options: ["Rien, c'est inutile à ton âge.", "Montrer tes projets, créations ou engagements — un atout pour l'avenir.", "Juste accumuler des abonnés."],
            correct: 1,
            explain: "Une image numérique positive (projets, passions, créativité) peut ouvrir des portes. C'est ton portfolio numérique : construis-le consciemment !"
          }
        ]
      })
    },
    {
      title: "À qui demander de l'aide au collège",
      slug: "12-14-aide-au-college",
      theme: "aide",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🆘",
        intro: "Quelque chose se passe mal en ligne et ça déborde sur le collège. Qui peut vraiment t'aider ?",
        outro: "Tu n'es pas seul(e). Le collège a des ressources — et les utiliser, c'est intelligent !",
        questions: [
          {
            emoji: "👩‍🏫",
            q: "Tu subis du cyberharcèlement de la part de camarades. La première personne à informer au collège c'est :",
            options: ["Le directeur du collège directement.", "Le CPE (Conseiller Principal d'Éducation) ou ton prof principal.", "Les autres élèves pour qu'ils se mobilisent."],
            correct: 1,
            explain: "Le CPE est formé pour gérer ces situations. Il peut convoquer les parties, alerter les parents et mettre en place un suivi. C'est son rôle !"
          },
          {
            emoji: "📋",
            q: "Pour signaler efficacement, tu dois apporter :",
            options: ["Juste un témoignage oral.", "Des captures d'écran datées et claires, avec le contexte expliqué.", "Une liste de tes amis comme témoins."],
            correct: 1,
            explain: "Les preuves concrètes (captures, dates, contexte) rendent le signalement crédible et facilitent les actions du collège et de la police si nécessaire !"
          },
          {
            emoji: "🩺",
            q: "Si la situation t'affecte psychologiquement, tu peux aussi parler à :",
            options: ["Personne, ça va passer.", "L'infirmière scolaire ou le/la psychologue de l'Éducation nationale.", "Seulement tes parents."],
            correct: 1,
            explain: "L'infirmière et le psy scolaire sont là pour t'aider à aller mieux. C'est confidentiel. Tu n'as pas à souffrir seul(e) !"
          },
          {
            emoji: "📞",
            q: "En dehors du collège, quel numéro gratuit peut t'aider pour le cyberharcèlement ?",
            options: ["Le 17 (police).", "Le 3018 — numéro national contre le cyberharcèlement, gratuit et confidentiel.", "Le 15 (SAMU)."],
            correct: 1,
            explain: "Le 3018 est le numéro officiel contre le cyberharcèlement. Des conseillers formés répondent 7j/7 et peuvent t'aider à agir concrètement !"
          }
        ]
      })
    }
  ]);

  addTutorials("15_17", [
    {
      title: "Sécuriser ses comptes critiques",
      slug: "15-17-securiser-comptes-critiques",
      theme: "securite-compte",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔐",
        intro: "Mail, réseaux, jeux, banque… certains comptes valent de l'or pour un hacker. Tu sais les blinder ?",
        outro: "Priorité absolue : email + 2FA + audit de sessions. Ces 3 actions bloquent 95% des tentatives.",
        questions: [
          {
            emoji: "📧",
            q: "Pourquoi sécuriser son email en priorité absolue ?",
            options: ["Parce que c'est le seul compte qui coûte cher.", "Parce que l'email permet de réinitialiser TOUS les autres mots de passe.", "Parce que les emails contiennent des données bancaires."],
            correct: 1,
            explain: "L'email est le maître-cadenas. Qui contrôle ton email peut réinitialiser Instagram, Spotify, ta banque… Commence par là, toujours !"
          },
          {
            emoji: "🌐",
            q: "Tu te connectes à des comptes depuis un Wi-Fi public (café, gare). Le risque c'est :",
            options: ["Aucun, HTTPS protège tout.", "Un attaquant sur le même réseau peut intercepter des données non chiffrées.", "La connexion est juste plus lente."],
            correct: 1,
            explain: "Sur un Wi-Fi public, utilise un VPN ou évite les connexions sensibles. Ou active au moins le 2FA pour que le vol de mot de passe seul ne suffise pas !"
          },
          {
            emoji: "📱",
            q: "Comment vérifier si ton compte est connecté sur des appareils inconnus ?",
            options: ["C'est impossible à vérifier.", "Dans Paramètres > Sécurité > Appareils connectés ou Sessions actives.", "En regardant les notifications."],
            correct: 1,
            explain: "Presque tous les grands services (Google, Instagram, Discord) montrent les sessions actives. Si tu vois un appareil ou lieu inconnu, déconnecte-le immédiatement !"
          },
          {
            emoji: "🔔",
            q: "Tu reçois une alerte 'Connexion depuis un nouveau lieu'. Tu n'étais pas toi. Tu fais quoi ?",
            options: ["Ignorer, c'est peut-être un bug.", "Changer le mot de passe immédiatement + activer le 2FA + déconnecter toutes les sessions.", "Supprimer le compte."],
            correct: 1,
            explain: "Réagis vite ! Changer le mot de passe + déconnecter toutes les sessions = éjecter l'intrus. Le 2FA empêchera qu'il revienne même avec le nouveau mot de passe !"
          },
          {
            emoji: "✅",
            q: "Quelle combinaison est la plus solide pour sécuriser un compte ?",
            options: ["Mot de passe long seul.", "Mot de passe unique fort + 2FA par application d'authentification (pas SMS).", "Changer son mot de passe tous les jours."],
            correct: 1,
            explain: "La 2FA par app (Google Authenticator, Authy) est plus sûre que le SMS (le SMS peut être intercepté). Mot de passe solide + app 2FA = le duo gagnant !"
          }
        ]
      })
    },
    {
      title: "Prévenir le doxxing",
      slug: "15-17-prevenir-doxxing",
      theme: "confidentialite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🗂️",
        intro: "Le doxxing = exposer publiquement les infos privées de quelqu'un sans son accord. Tu saurais te protéger ?",
        outro: "Audit régulier de tes infos publiques + localisation désactivée + bio minimaliste = protection solide.",
        questions: [
          {
            emoji: "📍",
            q: "Tu actives la géolocalisation sur tes posts Instagram. Qu'est-ce que tu révèles ?",
            options: ["Juste ton quartier général.", "Potentiellement ton adresse, ton école, ta routine quotidienne sur le long terme.", "Rien de précis."],
            correct: 1,
            explain: "La géolocalisation régulière dessine une carte de ta vie : où tu dors, où tu vas à l'école, tes habitudes. Un doxxeur peut tout reconstituer !"
          },
          {
            emoji: "📝",
            q: "Quelle bio est la moins risquée sur un compte semi-public ?",
            options: ["Prénom + ville + lycée + numéro de portable.", "Pseudo + passion + emoji. Sans lieu ni école précis.", "Nom complet + date de naissance."],
            correct: 1,
            explain: "La bio doit être la plus vague possible. Pas de lycée précis, pas de ville exacte, jamais le numéro de portable. Un pseudo suffit !"
          },
          {
            emoji: "🔍",
            q: "Pour savoir ce qui est public sur toi, tu dois :",
            options: ["Faire confiance aux paramètres par défaut.", "Googler ton prénom + nom + ville, vérifier les images et les vieux posts.", "Rien, tu n'as rien à cacher."],
            correct: 1,
            explain: "L'auto-audit Google révèle ce qu'un inconnu trouve sur toi en 30 secondes. Supprime ou privatise ce qui te semble trop exposé !"
          },
          {
            emoji: "🚨",
            q: "Quelqu'un a posté ton adresse et numéro dans un forum. Tu fais quoi en urgence ?",
            options: ["Demander poliment à la personne de supprimer.", "Signaler à la plateforme + préserver les preuves + alerter un adulte/les autorités.", "Poster ta propre version pour contredire."],
            correct: 1,
            explain: "Le doxxing est illégal. Capture les preuves, signale via le formulaire de la plateforme, et dépose plainte si les infos sont sensibles (adresse, numéro). Agis vite !"
          },
          {
            emoji: "🛡️",
            q: "Pour réduire le risque de doxxing de façon préventive :",
            options: ["Fermer tous tes comptes.", "Pseudonymer les comptes publics, activer le 2FA, désactiver la localisation.", "Ne poster que des photos de paysages."],
            correct: 1,
            explain: "Un pseudonyme sur les comptes publics + localisation désactivée + 2FA = la triade de base. Tu peux être actif en ligne et rester difficile à localiser !"
          }
        ]
      })
    },
    {
      title: "Gérer un chantage numérique",
      slug: "15-17-gerer-chantage-numerique",
      theme: "pression",
      content: JSON.stringify({
        type: "quiz",
        emoji: "⚠️",
        intro: "Quelqu'un menace de diffuser tes photos ou messages si tu ne paies pas. Quelle est la bonne stratégie ?",
        outro: "Ne jamais payer. Jamais négocier. Preuves + signalement + adulte = les 3 leviers qui fonctionnent.",
        questions: [
          {
            emoji: "💰",
            q: "Le chanteur menace de diffuser tes photos si tu ne lui envoies pas de l'argent. Tu fais quoi ?",
            options: ["Je paie une seule fois pour que ça s'arrête.", "Je ne paie pas. Payer ne fait qu'encourager les nouvelles demandes.", "Je négocie un montant plus faible."],
            correct: 1,
            explain: "Payer ou négocier = montrer que tu cèdes. Ça n'arrête jamais le chantage, ça l'amplifie. Les victimes qui paient reçoivent souvent de nouvelles demandes !"
          },
          {
            emoji: "📸",
            q: "Avant de bloquer et signaler, tu dois impérativement :",
            options: ["Répondre pour gagner du temps.", "Capturer toutes les preuves (messages, screenshots) avec les dates visibles.", "Supprimer la conversation."],
            correct: 1,
            explain: "Les preuves sont ton arme principale pour les autorités. Capture tout avant de bloquer : messages, profil, demandes. Sans preuves, impossible d'agir légalement !"
          },
          {
            emoji: "🏛️",
            q: "Le chantage numérique impliquant des images intimes est puni par la loi française :",
            options: ["Non, c'est une zone grise légale.", "Oui, c'est un délit pouvant aller jusqu'à 2 ans de prison et 60 000€ d'amende.", "Seulement si les images ont été volées."],
            correct: 1,
            explain: "La sextorsion (chantage avec images intimes) est un délit en France. Porter plainte est non seulement possible mais recommandé. La police est formée pour ça !"
          },
          {
            emoji: "📞",
            q: "Quel numéro/service contacter en cas de sextorsion ou chantage numérique ?",
            options: ["Le 17 uniquement.", "Le 3018 (cyberharcèlement) ou Cybermalveillance.gouv.fr + porter plainte en commissariat.", "Seulement un avocat."],
            correct: 1,
            explain: "Le 3018 a des conseillers formés à ces situations. Cybermalveillance.gouv.fr guide les démarches. Et tu peux porter plainte au commissariat avec tes preuves !"
          },
          {
            emoji: "🤐",
            q: "Tu as honte et tu ne veux pas que tes parents sachent. C'est mieux de :",
            options: ["Gérer seul(e) pour protéger ton intimité.", "En parler à un adulte de confiance — la honte diminue quand on parle, et l'aide est réelle.", "Attendre que le chanteur abandonne."],
            correct: 1,
            explain: "Le chanteur compte sur ta honte pour te garder silencieux. Parler brise ce pouvoir. Un adulte de confiance peut agir avec toi sans te juger !"
          }
        ]
      })
    },
    {
      title: "Usurpation de profil : que faire",
      slug: "15-17-usurpation-profil",
      theme: "manipulation",
      content: JSON.stringify({
        type: "quiz",
        emoji: "👤",
        intro: "Quelqu'un crée un faux compte à ton nom avec tes photos. C'est l'usurpation d'identité numérique. Tu sais réagir ?",
        outro: "Document + signalement en masse + alerte contacts = la stratégie qui fait tomber un faux profil.",
        questions: [
          {
            emoji: "😱",
            q: "Tu découvres un faux compte avec ton nom et tes photos. Premier geste :",
            options: ["Commenter sur le faux compte pour dire que c'est faux.", "Documenter (captures d'écran) avant que le faux compte ne soit supprimé ou modifié.", "Signaler immédiatement sans rien capturer."],
            correct: 1,
            explain: "Les plateformes suppriment parfois vite — mais toi tu auras besoin des preuves pour les autorités. Capture tout d'abord, signale ensuite !"
          },
          {
            emoji: "🚩",
            q: "Comment signaler efficacement un faux profil sur les réseaux ?",
            options: ["Juste bloquer le compte.", "Signaler en choisissant 'Usurpation d'identité' dans le menu de signalement.", "Envoyer un email au service client."],
            correct: 1,
            explain: "Toutes les plateformes ont une option 'Usurpation d'identité' dans le signalement. C'est prioritaire pour les équipes de modération. Utilise-la précisément !"
          },
          {
            emoji: "👥",
            q: "Pour accélérer la suppression du faux compte, tu peux :",
            options: ["Attendre que la plateforme agisse seule.", "Demander à tes amis et ta famille de signaler aussi le même compte.", "Créer un nouveau compte pour te défendre."],
            correct: 1,
            explain: "Les signalements multiples montent en priorité dans les files de modération. Plus de signalements = action plus rapide de la plateforme !"
          },
          {
            emoji: "⚖️",
            q: "L'usurpation d'identité numérique est :",
            options: ["Légale si on n'utilise pas les infos pour escroquer.", "Un délit en France, passible d'1 an de prison et 15 000€ d'amende.", "Seulement illégale si c'est une célébrité."],
            correct: 1,
            explain: "Article 226-4-1 du Code pénal : usurper l'identité numérique de quelqu'un est un délit. Tu peux porter plainte même si le fautif est inconnu !"
          },
          {
            emoji: "🔔",
            q: "Pour prévenir que tes contacts ne soient trompés par le faux profil :",
            options: ["Ne rien faire pour ne pas amplifier la situation.", "Poster un message sur tes vrais comptes : 'Un faux compte en mon nom existe. Signalez-le !'", "Envoyer un DM à chaque contact individuellement."],
            correct: 1,
            explain: "Alerter ta communauté via tes vrais comptes les protège d'être trompés ET génère des signalements supplémentaires. Double effet !"
          }
        ]
      })
    },
    {
      title: "Cyberharcèlement : stratégie d'action",
      slug: "15-17-cyberharcelement-strategie",
      theme: "harcelement",
      content: JSON.stringify({
        type: "quiz",
        emoji: "⚔️",
        intro: "Tu subis du cyberharcèlement depuis un moment. Le gérer seul ne suffit plus. Quelle stratégie adopter ?",
        outro: "Archive → Bloque → Signale → Relais institutionnels. Chaque étape compte. Ne reste jamais seul(e) !",
        questions: [
          {
            emoji: "📁",
            q: "Pourquoi archiver toutes les preuves (captures, dates, contexte) avant d'agir ?",
            options: ["Pour montrer aux amis.", "Pour constituer un dossier solide pour les autorités et l'établissement scolaire.", "Pour s'en souvenir plus tard."],
            correct: 1,
            explain: "Un dossier avec captures datées, noms de comptes et contexte est indispensable pour que le CPE, la police ou la justice puissent agir efficacement !"
          },
          {
            emoji: "🔇",
            q: "Bloquer un harceleur sur une plateforme suffit-il à arrêter le harcèlement ?",
            options: ["Oui, il ne peut plus rien faire.", "Non, il peut créer un nouveau compte ou passer par d'autres personnes.", "Oui, si tu bloques tous ses amis aussi."],
            correct: 1,
            explain: "Bloquer est nécessaire mais pas suffisant. Il faut aussi signaler à la plateforme (pour supprimer le compte) et alerter les responsables pour stopper la source !"
          },
          {
            emoji: "🏫",
            q: "Quand le harcèlement vient de camarades du lycée, quel relais institutionnel activer ?",
            options: ["Le proviseur uniquement.", "CPE + psy scolaire + parents + plainte si infractions pénales.", "Attendre d'être majeur pour agir."],
            correct: 1,
            explain: "Le lycée a des protocoles anti-harcèlement. CPE + parents = double levier qui force l'institution à agir. La plainte donne un poids légal à la démarche !"
          },
          {
            emoji: "🌐",
            q: "Le harcèlement vient de comptes anonymes en dehors du lycée. Tu peux :",
            options: ["Rien faire, ils sont anonymes.", "Porter plainte : la police peut obtenir les données des plateformes via réquisition judiciaire.", "Répondre pour les intimider en retour."],
            correct: 1,
            explain: "L'anonymat en ligne est relatif. Sur plainte, les autorités peuvent obtenir les adresses IP des harceleurs auprès des plateformes et FAI. L'anonymat ne protège pas !"
          },
          {
            emoji: "💙",
            q: "Le cyberharcèlement affecte ton moral, ton sommeil, ta concentration. Il faut :",
            options: ["Faire semblant que ça va pour ne pas alarmer.", "Consulter le psy scolaire ou un médecin — le soutien psychologique est une étape clé.", "Arrêter tous les réseaux sociaux définitivement."],
            correct: 1,
            explain: "L'impact psychologique du cyberharcèlement est réel et reconnu. Un soutien professionnel t'aide à traverser ça sans laisser de séquelles durables. Tu mérites de l'aide !"
          }
        ]
      })
    },
    {
      title: "Vérifier une info avant de la relayer",
      slug: "15-17-verifier-info-avant-relayer",
      theme: "desinformation",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔎",
        intro: "Une info choc circule sur les réseaux. Vrai ou faux ? En 3 réflexes, tu peux savoir !",
        outro: "Vérifier avant de partager, c'est protéger ta crédibilité et ne pas propager de fake news !",
        questions: [
          {
            emoji: "😲",
            q: "Tu vois une info très choquante et urgente. Ton premier réflexe devrait être :",
            options: ["La partager immédiatement pour alerter le plus de monde.", "Marquer une pause. Plus une info est choquante, plus elle mérite vérification.", "L'ignorer, ce sont des mensonges."],
            correct: 1,
            explain: "Les fake news exploitent l'émotion (choc, peur, colère) pour court-circuiter ton esprit critique. Plus tu es ému, plus tu dois vérifier !"
          },
          {
            emoji: "🗓️",
            q: "L'info semble vraie mais la source te semble peu connue. Tu dois vérifier :",
            options: ["Le nombre de partages.", "La date de publication, l'auteur et la réputation de la source.", "Si c'est bien écrit."],
            correct: 1,
            explain: "Une vieille info resurface souvent hors contexte. Vérifie la date ! Et cherche l'auteur : est-il expert reconnu ou anonyme sans crédibilité ?"
          },
          {
            emoji: "🔄",
            q: "Comment vérifier rapidement une info sur un événement ?",
            options: ["Chercher sur le même réseau social.", "Croiser 2-3 médias de référence (AFP, Reuters, Le Monde, France Info) et Factuel.afp.com.", "Demander à ses abonnés."],
            correct: 1,
            explain: "Les fact-checkers professionnels (AFP Factuel, Les Décodeurs, CheckNews) analysent et démentent les fake news. C'est la source la plus fiable !"
          },
          {
            emoji: "🖼️",
            q: "Une photo 'preuve' de l'info t'est envoyée. Comment vérifier si elle est authentique ?",
            options: ["Faire confiance si elle a beaucoup de likes.", "Faire une recherche d'image inversée sur Google pour voir son historique.", "Zoomer pour voir les détails."],
            correct: 1,
            explain: "La recherche d'image inversée révèle quand et où la photo a été publiée pour la première fois. Des 'preuves' de conflits actuels sont souvent des photos de 2010 ou d'ailleurs !"
          },
          {
            emoji: "🤝",
            q: "Tu réalises que tu as déjà partagé une fake news. Tu dois :",
            options: ["Ignorer, les gens oublieront.", "Supprimer le partage et corriger auprès de tes abonnés avec la vraie information.", "Garder le partage mais ajouter un commentaire 'peut-être faux'."],
            correct: 1,
            explain: "Corriger publiquement est un acte de courage et d'intégrité. Ça montre que tu fais confiance au vrai et que tu assumes tes erreurs. Tout le monde en fait !"
          }
        ]
      })
    },
    {
      title: "Traces numériques et orientation",
      slug: "15-17-traces-numeriques-orientation",
      theme: "identite",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🧭",
        intro: "Ton futur employeur, ta future fac ou ton maître de stage peut te Googler. Qu'est-ce qu'il trouve ?",
        outro: "Ton empreinte numérique se construit maintenant. Un audit régulier et des posts réfléchis font toute la différence !",
        questions: [
          {
            emoji: "💼",
            q: "Avant un entretien de stage, un recruteur cherche ton nom en ligne. Il trouve une vieille story embarrassante. C'est :",
            options: ["Sans conséquence, c'était pour rire.", "Potentiellement éliminatoire : 70% des recruteurs vérifient les réseaux sociaux.", "Normal pour un(e) ado."],
            correct: 1,
            explain: "Des études montrent que la majorité des recruteurs recherchent les candidats en ligne. Des posts imprudents peuvent coûter un stage ou un emploi !"
          },
          {
            emoji: "🧹",
            q: "Comment faire un audit de ton image numérique ?",
            options: ["Supprimer tous ses comptes.", "Googler 'prénom + nom', vérifier chaque réseau, privatiser ou supprimer les contenus problématiques.", "Changer de pseudo."],
            correct: 1,
            explain: "L'auto-audit = te chercher comme un étranger le ferait. Vérifie Google Images, tes vieux posts, les tags d'autres sur toi. Nettoie ce qui ne te représente plus bien !"
          },
          {
            emoji: "✨",
            q: "Une trace numérique positive peut aussi être :",
            options: ["Impossible à construire à ton âge.", "Un portfolio (projets, créations, engagements) mis en ligne via un blog ou LinkedIn jeune.", "Seulement utile pour les influenceurs."],
            correct: 1,
            explain: "Poster ses projets, sa veille, ses créations construit une e-réputation positive. Un lycéen avec un portfolio ou un blog de qualité sort vraiment du lot !"
          },
          {
            emoji: "📌",
            q: "Quelqu'un t'a tagué sur une photo publique problématique. Tu peux :",
            options: ["Rien faire, tu n'es pas l'auteur.", "Demander à retirer le tag, demander la suppression de la photo et signaler si refus.", "Juste te détagger."],
            correct: 1,
            explain: "Te détagger est un début, mais la photo reste visible et cherchable. Tu as le droit de demander sa suppression. En cas de refus, la signaler à la plateforme !"
          },
          {
            emoji: "🔮",
            q: "La meilleure stratégie pour ton image numérique future c'est :",
            options: ["Arrêter les réseaux jusqu'à 18 ans.", "Penser 'est-ce que dans 5 ans je serais fier(e) de ce post ?' avant chaque publication.", "Poster uniquement des photos de nourriture."],
            correct: 1,
            explain: "Le test du futur-toi est la règle la plus simple et efficace. Si tu hesites, c'est souvent la réponse. Et si tu doutes : ne poste pas !"
          }
        ]
      })
    },
    {
      title: "Sexting, consentement et limites",
      slug: "15-17-sexting-consentement-limites",
      theme: "image",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🔒",
        intro: "Le sexting et le consentement numérique — des sujets essentiels pour se protéger et respecter les autres.",
        outro: "Le consentement doit être libre, éclairé et réversible. Sans cela, toute diffusion est une violence et un délit.",
        questions: [
          {
            emoji: "📸",
            q: "Tu envoies une photo intime à quelqu'un en qui tu as confiance. Une fois envoyée :",
            options: ["Tu gardes le contrôle, il peut la supprimer sur demande.", "Tu perds le contrôle. Elle peut être copiée, partagée, ou utilisée pour un chantage.", "C'est safe si tu supprimes ton message."],
            correct: 1,
            explain: "Une image envoyée échappe à tout contrôle. Même si la personne est de confiance, son téléphone peut être hacké, volé, ou elle peut changer d'attitude."
          },
          {
            emoji: "⚖️",
            q: "Partager une photo intime d'une autre personne sans son accord (revenge porn), c'est :",
            options: ["Légal si la photo a été envoyée volontairement.", "Un délit pénal en France : jusqu'à 2 ans de prison et 60 000€ d'amende.", "Illégal seulement si la personne est mineure."],
            correct: 1,
            explain: "La loi du 7 octobre 2016 punit sévèrement la diffusion d'images sexuelles sans consentement. Le consentement initial à l'envoi ne vaut pas consentement à la diffusion !"
          },
          {
            emoji: "🤔",
            q: "Quelqu'un te demande des photos intimes en disant 'si tu m'aimes, tu le feras'. C'est :",
            options: ["Une preuve d'amour normale.", "Une forme de manipulation : le vrai amour ne se prouve pas par contrainte.", "Acceptable si vous êtes ensemble."],
            correct: 1,
            explain: "Utiliser les sentiments pour forcer quelqu'un à envoyer des images, c'est de la manipulation. Un partenaire respectueux n'insiste jamais sur ce sujet !"
          },
          {
            emoji: "🆘",
            q: "Des images intimes de toi circulent sans ton accord. Que faire en urgence ?",
            options: ["Attendre que ça se calme.", "Contacter le 3018, signaler les posts à la plateforme et porter plainte.", "Contacter directement la personne qui diffuse."],
            correct: 1,
            explain: "Le 3018 a une procédure de retrait rapide des contenus. Porter plainte est essentiel. Ne pas contacter le diffuseur seul : risque de chantage ou d'escalade !"
          },
          {
            emoji: "💬",
            q: "Un(e) ami(e) te confie qu'il/elle a reçu des demandes de sexting non désirées. Tu lui conseilles :",
            options: ["De répondre poliment que ça ne l'intéresse pas.", "De ne pas répondre, de bloquer, de capturer les messages et d'en parler à un adulte.", "De changer de numéro."],
            correct: 1,
            explain: "Répondre encourage parfois l'auteur. Bloquer + preuves + adulte = la bonne réaction. Et si les demandes sont d'un inconnu ou insistantes, c'est signalable à la police !"
          }
        ]
      })
    },
    {
      title: "Arnaques : faux jobs, crypto et phishing",
      slug: "15-17-arnaques-cpf-colis-crypto-faux-jobs",
      theme: "arnaques",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🎣",
        intro: "Argent facile, job en ligne incroyable, crypto miracle… les arnaques ciblent spécialement les 15-25 ans. Tu sauras les repérer ?",
        outro: "L'urgence artificielle et l'argent facile sont les deux moteurs de toutes les arnaques. Méfie-t'en systématiquement !",
        questions: [
          {
            emoji: "💼",
            q: "Une offre de job en ligne promet 500€/semaine pour 'juste transférer de l'argent'. C'est :",
            options: ["Un vrai job flexible.", "Du blanchiment d'argent. Tu risques des poursuites pénales même sans le savoir.", "Légal si c'est une plateforme connue."],
            correct: 1,
            explain: "Les 'mules financières' servent à blanchir de l'argent. La victime est complice sans le savoir. Si arrêtée, elle encourt les mêmes peines que les organisateurs !"
          },
          {
            emoji: "📦",
            q: "Tu reçois un SMS : 'Votre colis est bloqué, payez 1,50€ de frais.' Tu n'attends rien. C'est :",
            options: ["Peut-être un cadeau surprise.", "Du phishing par SMS (smishing). Ne clique jamais sur le lien.", "Normal pour les nouvelles réglementations douanières."],
            correct: 1,
            explain: "L'arnaque au 'colis bloqué' est l'une des plus répandues. Le lien installe un malware ou vole tes infos bancaires. La Poste et les transporteurs ne demandent jamais ça par SMS !"
          },
          {
            emoji: "₿",
            q: "Un compte promets de doubler tes crypto-monnaies si tu envoies d'abord une somme. C'est :",
            options: ["Une opportunité réelle pour certains.", "Toujours une arnaque. Personne ne double l'argent des inconnus, jamais.", "Légal si c'est en Bitcoin."],
            correct: 1,
            explain: "'Envoie 100€ et reçois 200€' est l'arnaque de base depuis des siècles. Avec la crypto, c'est identique mais irréversible. Une fois envoyée, impossible de récupérer !"
          },
          {
            emoji: "📧",
            q: "Un email de 'ta banque' te demande de 'confirmer tes identifiants' via un lien. Tu vérifies :",
            options: ["Juste le logo de l'email.", "L'adresse email expéditrice et l'URL du lien (sans cliquer, en passant la souris dessus).", "Si l'email est bien écrit."],
            correct: 1,
            explain: "Les phishers copient logos et mise en page. Mais l'adresse expéditrice ('support@bancemonde.ru') et l'URL trahissent toujours le piège. Vérifie avant de cliquer !"
          },
          {
            emoji: "🚨",
            q: "Tu as déjà cliqué et entré tes infos bancaires sur un site suspect. En urgence :",
            options: ["Attendre de voir si quelque chose de suspect se passe.", "Appeler ta banque immédiatement pour bloquer la carte et signaler sur Cybermalveillance.gouv.fr.", "Changer ton mot de passe email."],
            correct: 1,
            explain: "Chaque minute compte ! Appelle ta banque pour opposition immédiate. Signale sur Cybermalveillance.gouv.fr pour documenter et recevoir de l'aide. Ne tarde pas !"
          }
        ]
      })
    },
    {
      title: "Mon plan perso de sécurité numérique",
      slug: "15-17-plan-perso-securite-numerique",
      theme: "autonomie",
      content: JSON.stringify({
        type: "quiz",
        emoji: "🗺️",
        intro: "Tu as tes règles numériques à toi ? Teste si ton plan de sécurité est au niveau !",
        outro: "Un plan personnel de sécurité numérique, c'est 5 règles que tu tiens vraiment. Définis les tiennes et révise-les tous les 3 mois !",
        questions: [
          {
            emoji: "📋",
            q: "Un bon plan de sécurité numérique perso inclut :",
            options: ["Juste un bon mot de passe.", "Mots de passe, 2FA, confidentialité des réseaux, contacts de confiance, et conduite en cas d'incident.", "Seulement l'antivirus."],
            correct: 1,
            explain: "La sécurité numérique est multi-couches. Un plan complet couvre : accès (mots de passe+2FA), exposition (réseaux), relations (contacts) et réaction (que faire si ça arrive)."
          },
          {
            emoji: "🔄",
            q: "À quelle fréquence réviser et mettre à jour ton plan de sécurité ?",
            options: ["Jamais, un bon plan reste valable à vie.", "Tous les 3 à 6 mois, et après chaque incident ou changement de situation.", "Seulement après un piratage."],
            correct: 1,
            explain: "Les menaces évoluent, tes usages aussi. Un audit régulier (nouveaux appareils, nouvelles applis, nouveaux contacts) garde ton plan pertinent et efficace !"
          },
          {
            emoji: "🆘",
            q: "Dans ton plan, 'adultes ressources' signifie avoir :",
            options: ["Un contact admin en cas de panne.", "Au moins 2 adultes de confiance à qui tu sais exactement comment parler en cas de problème numérique.", "Juste le numéro de ton FAI."],
            correct: 1,
            explain: "En cas d'incident (chantage, harcèlement, arnaque), savoir à qui parler sans perdre de temps est crucial. Identifie tes adultes ressources avant d'en avoir besoin !"
          },
          {
            emoji: "📵",
            q: "Les 'règles de pause' dans un plan numérique, c'est :",
            options: ["Inutile, c'est juste de la philosophie.", "Des plages horaires sans écran décidées à l'avance pour protéger le sommeil et le bien-être.", "Uniquement pour les enfants."],
            correct: 1,
            explain: "Des plages sans écran (soirée, repas, nuit) réduisent le stress, améliorent le sommeil et la concentration. C'est une règle d'hygiène numérique que tu décides toi-même !"
          },
          {
            emoji: "✅",
            q: "La première chose à faire pour créer ton plan de sécurité numérique :",
            options: ["Acheter un antivirus premium.", "Faire un audit : lister tes comptes, vérifier les mots de passe, les 2FA activés et ce qui est public.", "Tout supprimer et recommencer de zéro."],
            correct: 1,
            explain: "L'audit de départ te donne une photo claire de ta situation actuelle. Tu sais ensuite quoi corriger en priorité. Fais-le maintenant, ça prend 15 minutes !"
          }
        ]
      })
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
  if (env.dbSyncOnStartup) {
    await sequelize.sync();
    console.log("DB sync executee pour le seed (mode dev)");
  }

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
