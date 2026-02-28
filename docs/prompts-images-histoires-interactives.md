# Prompts images - Histoires interactives Presque Vrai

Ce fichier contient des prompts prets a coller dans ton generateur d'images.
Chaque prompt inclut un `Nom du fichier souhaite` pour integration rapide dans le site.

Chemin cible dans le projet:
`client/public/images/stories/generated/`

## Regles visuelles communes
- Style: cartoon manga educatif, couleurs vives, ambiance rassurante
- Public: mineurs, ton non anxiogene
- Eviter: violence, peur intense, marques reelles, logos de reseaux sociaux exacts
- Format conseille: PNG, ratio 4:3 ou 16:9, haute qualite

## Template de prompt reutilisable
Nom du fichier souhaite: `story-{slug}-{personnage}-{lieu}-{action}-scene-{intro|choix|fin}.png`

Prompt:
"Illustration pedagogique style cartoon manga, scene numerique responsable pour jeunes, personnage {personnage}, lieu {lieu}, action {action}, phase {phase}, ton {ton}, couleurs claires, expressions lisibles, details d'ecran anonymes, espace libre a droite pour texte, rendu propre, sans texte incruste, sans logo reel."

---

## 7-11 ans (doux et ludique)
### Theme: partage de photo
Nom du fichier souhaite: `story-photo-nino-home-signup_secure-scene-intro.png`
Prompt:
"Style cartoon manga enfant, Nino a la maison cree un compte avec reglages prives, tablette et ordinateur visibles, ambiance joyeuse, icones de cadenas et etoiles, tons bleu et vert, pedagogique, rassurant, sans texte."

Nom du fichier souhaite: `story-photo-nino-home-signup_secure-scene-choix.png`
Prompt:
"Scene de choix numerique responsable pour enfant, Nino hesite entre bouton compte prive et bouton partager publiquement, adulte de confiance en arriere plan, style cartoon manga doux, ambiance positive, sans texte."

Nom du fichier souhaite: `story-photo-nino-home-signup_secure-scene-fin.png`
Prompt:
"Fin positive, enfant souriant avec profil prive active, bouclier numerique lumineux, amis bienveillants, style cartoon manga educatif, couleurs vives et rassurantes, sans texte."

### Theme: inconnu en ligne
Nom du fichier souhaite: `story-inconnu-lina-club-join_challenge-scene-intro.png`
Prompt:
"Lina au club multimedia recoit un message d'un inconnu, style cartoon manga enfant, decor numerique colore, reaction de surprise moderee, ambiance securisante, sans texte."

Nom du fichier souhaite: `story-inconnu-lina-club-join_challenge-scene-choix.png`
Prompt:
"Scene pedagogique, Lina choisit entre repondre a l'inconnu ou demander conseil a un adulte, interface fictive non marquee, style cartoon manga doux, sans texte."

Nom du fichier souhaite: `story-inconnu-lina-club-join_challenge-scene-fin.png`
Prompt:
"Fin responsable, Lina bloque le compte suspect et parle a un adulte, ambiance de soulagement, style cartoon manga educatif, couleurs chaudes, sans texte."

---

## 12-14 ans (cas realistes)
### Theme: pression de groupe
Nom du fichier souhaite: `story-pression-sam-school-signup_fast-scene-intro.png`
Prompt:
"Adolescent Sam apres les cours, groupe de discussion actif, pression pour publier vite, style cartoon manga realiste, ambiance urbaine moderne, sans texte."

Nom du fichier souhaite: `story-pression-sam-school-signup_fast-scene-choix.png`
Prompt:
"Moment de decision, Sam choisit entre partager une info perso ou verifier ses reglages prives, smartphones visibles, style cartoon manga realiste, pedagogique, sans texte."

Nom du fichier souhaite: `story-pression-sam-school-signup_fast-scene-fin.png`
Prompt:
"Fin consequence, Sam comprend l'impact du partage trop rapide, posture reflexive, adulte referent en soutien, style cartoon manga realiste, sans texte."

### Theme: cyberharcelement
Nom du fichier souhaite: `story-harcelement-lina-school-signup_secure-scene-intro.png`
Prompt:
"Preado Lina lit des messages blessants dans un groupe, style cartoon manga realiste, emotions lisibles mais non anxiogene, environnement scolaire, sans texte."

Nom du fichier souhaite: `story-harcelement-lina-school-signup_secure-scene-choix.png`
Prompt:
"Lina choisit entre repondre sous la colere ou capturer des preuves et signaler, visuel pedagogique clair, style cartoon manga realiste, sans texte."

Nom du fichier souhaite: `story-harcelement-lina-school-signup_secure-scene-fin.png`
Prompt:
"Fin constructive, Lina signale et obtient du soutien adulte, ambiance de reparation et confiance, style cartoon manga realiste, sans texte."

---

## 15-17 ans (responsabilisant)
### Theme: reputation numerique
Nom du fichier souhaite: `story-reputation-sam-home-join_challenge-scene-intro.png`
Prompt:
"Ado Sam chez lui envisage un challenge viral, tableau de bord social fictif, style cartoon manga mature, ambiance serieuse mais accessible, sans texte."

Nom du fichier souhaite: `story-reputation-sam-home-join_challenge-scene-choix.png`
Prompt:
"Decision critique, Sam compare publier impulsivement ou proteger son identite numerique, icones de confidentialite et partage, style cartoon manga responsabilisant, sans texte."

Nom du fichier souhaite: `story-reputation-sam-home-join_challenge-scene-fin.png`
Prompt:
"Fin responsable, Sam choisit le controle des donnees et un partage limite, posture confiante, style cartoon manga moderne, sans texte."

### Theme: manipulation
Nom du fichier souhaite: `story-manipulation-nino-club-signup_fast-scene-intro.png`
Prompt:
"Ado recu un message de faux concours, promesse de gain, style cartoon manga moderne, tension legere, sans texte."

Nom du fichier souhaite: `story-manipulation-nino-club-signup_fast-scene-choix.png`
Prompt:
"Choix entre cliquer sur lien suspect ou verifier source + parler a un adulte referent, ecran fictif securite numerique, style cartoon manga responsabilisant, sans texte."

Nom du fichier souhaite: `story-manipulation-nino-club-signup_fast-scene-fin.png`
Prompt:
"Fin positive, tentative de manipulation evitee grace a verification et signalement, ambiance claire, style cartoon manga moderne, sans texte."

---

## Astuce integration rapide
1. Genere les images avec ces noms exacts.
2. Place les fichiers dans `client/public/images/stories/generated/`.
3. Recharge la page d'une histoire interactive: les encarts afficheront automatiquement l'image au lieu du placeholder.
