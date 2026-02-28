/* ─────────────────────────────────────────────────────────────────────────────
   codelabProjects.js  —  snippets en mode DELTA
   Chaque étape contient UNIQUEMENT le nouveau code à ajouter (pas le cumul).
   Le bouton "Insérer" APPENDE au contenu existant de l'éditeur.
   mode: "separated" → 3 onglets HTML / CSS / JS indépendants
───────────────────────────────────────────────────────────────────────────── */

export const PROJECTS = [

  /* ══════════════════════════════════════════════════════════════════════════
     1. BLOG DE RECETTES  ⭐ Facile   (mode séparé — 5 étapes delta)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id: "blog-recettes",
    emoji: "🍳",
    title: "Blog de Recettes",
    tagline: "Crée un vrai site de cuisine !",
    difficulty: 1,
    difficultyLabel: "Facile",
    color: "#ff9f1c",
    colorLight: "#fff4e0",
    mode: "separated",
    steps: [

      /* ── Étape 1 : squelette HTML ── */
      {
        id: "squelette",
        title: "Le squelette HTML",
        focusTab: "html",
        concept: "HTML — la structure",
        conceptDesc: "Le HTML construit la structure de ta page, comme les murs d'une maison. Chaque balise <…> dit au navigateur quoi afficher.",
        explains: [
          { icon: "✍️", text: "<h1> : le plus grand titre de la page" },
          { icon: "📝", text: "<p> : un paragraphe de texte ordinaire" },
          { icon: "💡", text: "À l'étape suivante tu ajouteras ta première recette !" },
        ],
        practice: {
          prompt: "✏️ À toi ! Ajoute une ligne <p> sous le <h1> avec le nom de ton plat préféré !",
          hint: "<p>Mon plat préféré c'est les pâtes !</p>",
        },
        html: `<h1>🍳 Mon Blog de Recettes</h1>
<p>Bienvenue sur mon super blog de cuisine !</p>`,
        css: ``,
        js: ``,
      },

      /* ── Étape 2 : recette complète (delta — ajout après le h1/p) ── */
      {
        id: "recette",
        title: "Ma première recette",
        focusTab: "html",
        concept: "HTML — listes, images & bouton",
        conceptDesc: "<article> regroupe un bloc de contenu indépendant. <ul> liste à puces, <ol> liste numérotée. Le bouton sera activé à l'étape JavaScript !",
        explains: [
          { icon: "📰", text: "<article> : un bloc autonome de contenu (ici une recette)" },
          { icon: "🖼️", text: '<img src="…" alt="…"> : affiche une image depuis une URL' },
          { icon: "2️⃣", text: "<h2> / <h3> : sous-titres de niveaux différents" },
          { icon: "📋", text: "<ul>+<li> : liste à puces  •  <ol>+<li> : liste numérotée" },
          { icon: "🔘", text: 'button onclick="…" : le bouton sera actif à l\'étape JS !' },
        ],
        practice: {
          prompt: "✏️ À toi ! Ajoute un 5ème ingrédient dans la liste <ul> : <li>1 pincée de sel</li>",
          hint: "<li>1 pincée de sel</li>",
        },
        html: `<article class="recette-card">
  <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" alt="Pancakes" />
  <div class="recette-contenu">
    <h2>🥞 Pancakes moelleux</h2>
    <p>⏱️ <strong>15 minutes</strong> · Pour 4 personnes</p>

    <h3>Ingrédients :</h3>
    <ul>
      <li>200 g de farine</li>
      <li>2 œufs</li>
      <li>250 ml de lait</li>
      <li>1 sachet de sucre vanillé</li>
    </ul>

    <h3>Préparation :</h3>
    <ol>
      <li>Mélange la farine, le sel et le sucre vanillé.</li>
      <li>Ajoute les œufs et fouette bien.</li>
      <li>Verse le lait petit à petit en mélangeant.</li>
      <li>Fais cuire dans une poêle chaude 2 min de chaque côté.</li>
    </ol>

    <button class="btn-like" onclick="aimerRecette()">❤️ J'aime cette recette !</button>
    <p id="message-like"></p>
  </div>
</article>`,
        css: ``,
        js: ``,
      },

      /* ── Étape 3 : style de base CSS (delta — premiers styles) ── */
      {
        id: "style-base",
        title: "Couleurs et polices",
        focusTab: "css",
        concept: "CSS — les bases",
        conceptDesc: "Le CSS décore ta page. On écrit : sélecteur { propriété: valeur; }. Chaque règle change l'apparence d'un élément HTML.",
        explains: [
          { icon: "🎨", text: "background : couleur ou image de fond" },
          { icon: "🔤", text: "font-family : la police d'écriture utilisée" },
          { icon: "📐", text: "max-width + margin: auto : centre le contenu" },
          { icon: "🖼️", text: "img { width: 100% } : image sur toute la largeur" },
          { icon: "🟡", text: "color : couleur du texte" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change la couleur du h1. Remplace #c0392b par une couleur de ton choix, par exemple #3498db pour du bleu !",
          hint: "h1 {\n  color: #3498db;\n  font-size: 2rem;\n}",
        },
        html: ``,
        css: `body {
  font-family: Georgia, serif;
  background: #fffbf0;
  color: #3d2b1f;
  margin: 0 auto;
  max-width: 700px;
  padding: 16px;
}

h1 {
  color: #c0392b;
  font-size: 2rem;
}

img {
  width: 100%;
  display: block;
}`,
        js: ``,
      },

      /* ── Étape 4 : style carte (delta — styles de la carte) ── */
      {
        id: "style-carte",
        title: "Une belle carte de recette",
        focusTab: "css",
        concept: "CSS — boîtes & ombres",
        conceptDesc: "border-radius arrondit les coins d'un élément. box-shadow ajoute une ombre portée pour un effet 3D. overflow: hidden coupe ce qui dépasse.",
        explains: [
          { icon: "📦", text: ".recette-card { background } : fond blanc de la carte" },
          { icon: "🔘", text: "border-radius: 16px : coins bien arrondis" },
          { icon: "🌑", text: "box-shadow : ombre portée sous la carte" },
          { icon: "✂️", text: "overflow: hidden : l'image reste dans la carte arrondie" },
          { icon: "🎨", text: "padding : espace intérieur autour du contenu" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change la couleur de l'ombre dans box-shadow. Essaie rgba(255, 100, 0, 0.2) pour une ombre orangée !",
          hint: "box-shadow: 0 6px 20px rgba(255, 100, 0, 0.2);",
        },
        html: ``,
        css: `.recette-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.10);
  overflow: hidden;
  margin-top: 24px;
}
.recette-contenu { padding: 16px 20px 20px; }
.recette-card h2 { color: #e67e22; margin-bottom: 4px; }
.recette-card h3 { color: #c0392b; margin-bottom: 6px; }
li { margin-bottom: 6px; line-height: 1.6; }
ol li::marker { color: #e67e22; font-weight: bold; }
.btn-like { background: #e74c3c; color: #fff; border: none; border-radius: 999px; padding: 10px 20px; font-size: 1rem; cursor: pointer; margin-top: 12px; }
.btn-like:hover { background: #c0392b; }
#message-like { color: #27ae60; font-weight: bold; margin-top: 8px; }`,
        js: ``,
      },

      /* ── Étape 5 : bouton JS (delta — juste la fonction) ── */
      {
        id: "bouton-js",
        title: "Un bouton magique !",
        focusTab: "js",
        concept: "JavaScript — premiers pas",
        conceptDesc: "JavaScript permet à ta page de réagir aux clics ! On utilise document.getElementById pour trouver un élément et .innerHTML pour changer son contenu.",
        explains: [
          { icon: "🔘", text: 'onclick="aimerRecette()" : appelle la fonction quand on clique' },
          { icon: "⚙️", text: "function aimerRecette() { } : un bloc de code réutilisable" },
          { icon: "🔍", text: "document.getElementById('id') : trouve un élément par son id" },
          { icon: "✏️", text: ".innerHTML = '…' : change le contenu HTML de l'élément" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change le message de félicitation pour mettre ton propre texte à la place de 'Merci ! Tu as aimé cette recette !'",
          hint: 'document.getElementById("message-like").innerHTML =\n  "🌟 Excellent choix de recette !";',
        },
        html: ``,
        css: ``,
        js: `function aimerRecette() {
  document.getElementById("message-like").innerHTML =
    "🎉 Merci ! Tu as aimé cette recette !";
}`,
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════════
     2. SITE D'HISTOIRES  ⭐⭐ Moyen   (mode séparé — 5 étapes delta)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id: "site-histoires",
    emoji: "📖",
    title: "Site d'Histoires",
    tagline: "Écris et illustre tes aventures !",
    difficulty: 2,
    difficultyLabel: "Moyen",
    color: "#8b5cf6",
    colorLight: "#f3effe",
    mode: "separated",
    steps: [

      /* ── Étape 1 : en-tête ── */
      {
        id: "squelette",
        title: "La structure de base",
        focusTab: "html",
        concept: "HTML — balises sémantiques",
        conceptDesc: "<header> décrit l'en-tête du site. Ces balises décrivent le rôle de chaque zone de la page.",
        explains: [
          { icon: "🎩", text: "<header> : zone d'en-tête du site" },
          { icon: "✍️", text: "<h1> : le grand titre principal" },
          { icon: "📝", text: "<p> : paragraphe de présentation" },
          { icon: "💡", text: "À l'étape suivante tu ajouteras ta première histoire !" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change le texte du <p> pour écrire ta propre phrase de bienvenue !",
          hint: "<p>Entre dans mon monde de magie et d'aventure !</p>",
        },
        html: `<header class="site-header">
  <h1>✨ Mes Histoires</h1>
  <p>Bienvenue dans mon univers imaginaire !</p>
</header>`,
        css: ``,
        js: ``,
      },

      /* ── Étape 2 : première histoire (delta) ── */
      {
        id: "histoire",
        title: "Écrire une histoire",
        focusTab: "html",
        concept: "HTML — article & bouton",
        conceptDesc: "<article> est fait pour un bloc de contenu autonome. Le bouton et le div caché seront activés à l'étape JavaScript !",
        explains: [
          { icon: "📰", text: "<article> : bloc indépendant — ici une histoire complète" },
          { icon: "🏷️", text: '<span class="badge"> : étiquette de genre colorée' },
          { icon: "2️⃣", text: "<h2> : titre de l'histoire" },
          { icon: "🔘", text: "button + div caché : le texte se révèle au clic (étape JS) !" },
          { icon: "🆔", text: 'id="h1" relie le bouton à son histoire (unique par article)' },
        ],
        practice: {
          prompt: "✏️ À toi ! Ajoute un 3ème paragraphe à l'intérieur du div id='h1' : qu'est-ce que Lyra trouva au sommet de la montagne ?",
          hint: "<p>Au sommet, elle découvrit une grotte où le dragon dormait paisiblement…</p>",
        },
        html: `<article class="histoire">
  <span class="badge">🐉 Fantastique</span>
  <h2>Le Dragon de Cristal</h2>
  <button class="btn-lire" onclick="afficher('h1', this)">📖 Lire</button>
  <div id="h1" style="display:none">
    <p>
      Il était une fois, au sommet de la montagne de Givre, un dragon
      aux écailles de cristal bleu. Chaque nuit, ses écailles brillaient
      comme des milliers d'étoiles.
    </p>
    <p>
      Un jour, une jeune aventurière nommée <em>Lyra</em> décida de
      gravir la montagne pour percer le mystère de cette lumière étrange…
    </p>
  </div>
</article>`,
        css: ``,
        js: ``,
      },

      /* ── Étape 3 : deuxième histoire (delta) ── */
      {
        id: "plusieurs-histoires",
        title: "Une deuxième histoire",
        focusTab: "html",
        concept: "HTML — réutiliser une structure",
        conceptDesc: "En HTML, tu peux copier-coller la même structure autant de fois que tu veux ! Le CSS s'applique automatiquement à chaque nouvel élément.",
        explains: [
          { icon: "🔁", text: "Copier-coller l'<article> pour ajouter d'autres histoires" },
          { icon: "🏷️", text: "Changer le texte du .badge selon le genre littéraire" },
          { icon: "🎨", text: "Même classe = même style automatique, toujours !" },
          { icon: "🆔", text: 'id="h2" pour la 2ème histoire — chaque id doit être unique !' },
        ],
        practice: {
          prompt: "✏️ À toi ! Invente et écris ta propre histoire dans un troisième <article>. Choisis ton genre (🧙 Magie, 🦁 Aventure, 👻 Horreur…) et écris au moins 2 paragraphes !",
          hint: '<article class="histoire">\n  <span class="badge">🧙 Magie</span>\n  <h2>Le Grimoire Perdu</h2>\n  <button class="btn-lire" onclick="afficher(\'h3\', this)">📖 Lire</button>\n  <div id="h3" style="display:none">\n    <p>Dans la bibliothèque secrète…</p>\n  </div>\n</article>',
        },
        html: `<article class="histoire">
  <span class="badge">🚀 Science-fiction</span>
  <h2>La Station Oubliée</h2>
  <button class="btn-lire" onclick="afficher('h2', this)">📖 Lire</button>
  <div id="h2" style="display:none">
    <p>En l'an 2187, la station spatiale Orion IV dérivait en silence loin de toute planète connue…</p>
    <p>Le capitaine <em>Zara</em> ouvrit les yeux dans l'obscurité totale. Une alarme sonnait faiblement…</p>
  </div>
</article>`,
        css: ``,
        js: ``,
      },

      /* ── Étape 4 : CSS ambiance (delta — premier CSS, donc complet) ── */
      {
        id: "style-ambiance",
        title: "L'ambiance visuelle",
        focusTab: "css",
        concept: "CSS — dégradés & typographie",
        conceptDesc: "linear-gradient crée un dégradé de couleurs pour le fond. La police Georgia donne un style élégant, parfait pour les histoires.",
        explains: [
          { icon: "🌌", text: "background: linear-gradient(…) : dégradé du fond" },
          { icon: "🔤", text: "font-family: Georgia : police élégante pour les histoires" },
          { icon: "📏", text: "line-height: 1.85 : espace entre les lignes, plus lisible" },
          { icon: "🖼️", text: "border-left: 4px solid : barre colorée à gauche de la carte" },
          { icon: "🌫️", text: "rgba(…, 0.06) : couleur semi-transparente pour le fond de carte" },
        ],
        practice: {
          prompt: "✏️ À toi ! Essaie un autre dégradé de fond. Remplace #1a0533, #0f1a3d par #1a3320, #0f1a10 pour une ambiance forêt mystérieuse !",
          hint: "background: linear-gradient(135deg, #1a3320, #0f1a10);",
        },
        html: ``,
        css: `body {
  margin: 0;
  font-family: Georgia, serif;
  background: linear-gradient(135deg, #1a0533, #0f1a3d);
  color: #e8d5ff;
  min-height: 100vh;
  padding: 16px;
}

.site-header {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  padding: 32px 0 24px;
}
.site-header h1 { font-size: 2.4rem; color: #d4a8ff; margin: 0 0 8px; }
.site-header p { color: #a78bc0; margin: 0; }

.histoire {
  max-width: 720px;
  margin: 0 auto 24px;
  background: rgba(255, 255, 255, 0.06);
  border-left: 4px solid #9b59b6;
  border-radius: 0 16px 16px 0;
  padding: 24px 28px;
}
.histoire h2 { color: #d4a8ff; font-size: 1.5rem; margin-bottom: 12px; }
.histoire p { line-height: 1.85; color: #d0c0e8; margin-bottom: 12px; }
em { color: #f0c0ff; }
.badge {
  display: inline-block;
  background: rgba(155, 89, 182, 0.35);
  color: #e0b0ff;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  margin-bottom: 12px;
}
.btn-lire {
  display: block;
  background: transparent;
  border: 1.5px solid #9b59b6;
  color: #d4a8ff;
  padding: 6px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-family: Georgia, serif;
  margin-bottom: 12px;
}
.btn-lire:hover { background: rgba(155, 89, 182, 0.25); }`,
        js: ``,
      },

      /* ── Étape 5 : bouton JS (delta — juste la fonction) ── */
      {
        id: "bouton-lire",
        title: "Bouton Lire / Fermer",
        focusTab: "js",
        concept: "JavaScript — afficher / cacher",
        conceptDesc: "JavaScript peut montrer ou cacher des éléments HTML. style.display = 'none' cache et 'block' affiche. On change aussi le texte du bouton.",
        explains: [
          { icon: "🔘", text: 'onclick="afficher(…)" : appelle la fonction au clic' },
          { icon: "🔍", text: "document.getElementById('id') : trouve l'élément" },
          { icon: "👁️", text: "style.display = 'none' : cache l'élément" },
          { icon: "📦", text: "style.display = 'block' : montre l'élément" },
          { icon: "🔀", text: "=== 'none' : vérifie si l'élément est caché" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change le texte du bouton Fermer. Remplace '🔼 Fermer' par '📕 Refermer le livre' !",
          hint: "bouton.textContent = '📕 Refermer le livre';",
        },
        html: ``,
        css: ``,
        js: `function afficher(id, bouton) {
  var div = document.getElementById(id);
  if (div.style.display === "none") {
    div.style.display = "block";
    bouton.textContent = "🔼 Fermer";
  } else {
    div.style.display = "none";
    bouton.textContent = "📖 Lire";
  }
}`,
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════════
     3. JEU 2048  ⭐⭐⭐ Difficile   (mode séparé — 5 étapes delta)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id: "jeu-2048",
    emoji: "🎮",
    title: "Jeu 2048",
    tagline: "Code ton propre jeu de puzzle !",
    difficulty: 3,
    difficultyLabel: "Difficile",
    color: "#10b981",
    colorLight: "#ecfdf5",
    mode: "separated",
    steps: [

      /* ── Étape 1 : structure HTML + CSS Grid ── */
      {
        id: "structure",
        title: "Structure HTML + CSS Grid",
        focusTab: "css",
        concept: "CSS Grid — la grille 4×4",
        conceptDesc: "CSS Grid permet de créer des grilles. display: grid avec grid-template-columns: repeat(4, 1fr) crée 4 colonnes égales. La structure est dans l'onglet HTML, le style dans l'onglet CSS !",
        explains: [
          { icon: "📊", text: "display: grid : active le mode grille CSS" },
          { icon: "🔢", text: "grid-template-columns: repeat(4, 1fr) : 4 colonnes égales" },
          { icon: "📐", text: "gap: 10px : espace entre chaque case" },
          { icon: "⬛", text: "aspect-ratio: 1 : les cases sont carrées" },
          { icon: "🎨", text: "Le CSS va dans l'onglet CSS, la structure dans l'onglet HTML !" },
        ],
        practice: {
          prompt: "✏️ À toi ! Dans l'onglet HTML, change le texte du <h1>. Mets ton prénom : <h1>2048 par Lucas 🎮</h1>",
          hint: "<h1>2048 par Lucas 🎮</h1>",
        },
        html: `<h1>2048 🎮</h1>
<div id="score">Score : 0</div>
<div id="grille"></div>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  background: #1a1a2e;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  min-height: 100vh;
}

h1 { font-size: 2.5rem; color: #f0b429; margin-bottom: 8px; }
#score { font-size: 1.2rem; color: #a0c4ff; margin-bottom: 16px; }

#grille {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #16213e;
  padding: 10px;
  border-radius: 12px;
  width: 320px;
}

.cellule {
  aspect-ratio: 1;
  background: #0f3460;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}`,
        js: ``,
      },

      /* ── Étape 2 : couleurs des tuiles (delta CSS) ── */
      {
        id: "couleurs",
        title: "Couleurs des tuiles",
        focusTab: "css",
        concept: "CSS — une classe par valeur",
        conceptDesc: "Chaque valeur de tuile (2, 4, 8…) a sa propre classe CSS avec sa couleur. JavaScript ajoutera la bonne classe automatiquement. Ajoute ces classes à la suite du CSS !",
        explains: [
          { icon: "🎨", text: ".t-2 { background: … } : une couleur par valeur de tuile" },
          { icon: "🌈", text: "Du beige (petites valeurs) au doré (2048)" },
          { icon: "🔡", text: "font-size réduit pour les grands nombres (1024, 2048)" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change la couleur de la tuile .t-2. Remplace #eee4da par #ffd6e7 pour du rose clair !",
          hint: ".t-2 { background: #ffd6e7; color: #776e65; }",
        },
        html: ``,
        css: `/* ── Couleurs des tuiles ── */
.t-2    { background: #eee4da; color: #776e65; }
.t-4    { background: #ede0c8; color: #776e65; }
.t-8    { background: #f2b179; color: #fff; }
.t-16   { background: #f59563; color: #fff; }
.t-32   { background: #f67c5f; color: #fff; }
.t-64   { background: #f65e3b; color: #fff; }
.t-128  { background: #edcf72; color: #fff; font-size: 1.2rem; }
.t-256  { background: #edcc61; color: #fff; font-size: 1.2rem; }
.t-512  { background: #edc850; color: #fff; font-size: 1.1rem; }
.t-1024 { background: #edc53f; color: #fff; font-size: 0.95rem; }
.t-2048 { background: #f0b429; color: #fff; font-size: 0.95rem; }`,
        js: ``,
      },

      /* ── Étape 3 : créer la grille en JS (delta JS) ── */
      {
        id: "init-js",
        title: "Créer la grille en JavaScript",
        focusTab: "js",
        concept: "JS — tableaux 2D",
        conceptDesc: "Un tableau de tableaux représente la grille. grille[ligne][colonne] donne la valeur de chaque case. getElementById() retrouve un élément HTML, createElement() en crée un nouveau.",
        explains: [
          { icon: "📊", text: "grille = [[0,0,0,0], …] : 4 lignes de 4 cases vides (= 0)" },
          { icon: "🔄", text: "afficherGrille() : lit le tableau et génère le HTML des cases" },
          { icon: "⚙️", text: "document.getElementById('grille') : retrouve la div #grille" },
          { icon: "🎲", text: "Math.random() < 0.9 ? 2 : 4 : 90% de chance d'avoir un 2" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change 0.9 en 0.5 dans ajouterTuile(). Qu'est-ce qui change ? (Indice : il y aura plus de 4 !)",
          hint: "grille[pos[0]][pos[1]] = Math.random() < 0.5 ? 2 : 4;",
        },
        html: ``,
        css: ``,
        js: `/* ── Le tableau représente la grille 4×4 ── */
var grille = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
var score = 0;
var fini = false; /* sera utilisé à l'étape suivante */

/* ── Affiche le tableau en HTML ── */
function afficherGrille() {
  var conteneur = document.getElementById("grille");
  conteneur.innerHTML = "";
  for (var l = 0; l < 4; l++) {
    for (var c = 0; c < 4; c++) {
      var val = grille[l][c];
      var div = document.createElement("div");
      div.className = "cellule" + (val > 0 ? " t-" + val : "");
      div.textContent = val > 0 ? val : "";
      conteneur.appendChild(div);
    }
  }
  document.getElementById("score").textContent = "Score : " + score;
}

/* ── Place un 2 (90%) ou un 4 (10%) dans une case vide au hasard ── */
function ajouterTuile() {
  var vides = [];
  for (var l = 0; l < 4; l++)
    for (var c = 0; c < 4; c++)
      if (grille[l][c] === 0) vides.push([l, c]);
  if (vides.length === 0) return;
  var pos = vides[Math.floor(Math.random() * vides.length)];
  grille[pos[0]][pos[1]] = Math.random() < 0.9 ? 2 : 4;
}

/* ── Démarrage ── */
ajouterTuile();
ajouterTuile();
afficherGrille();`,
      },

      /* ── Étape 4 : bouger les tuiles (delta JS + HTML + CSS) ── */
      {
        id: "mouvements",
        title: "Bouger les tuiles",
        focusTab: "js",
        concept: "JS — algorithme de fusion",
        conceptDesc: "glisserLigne déplace et fusionne les tuiles d'une rangée vers la gauche. En retournant la grille, on gère les 4 directions. Les touches fléchées déclenchent les mouvements.",
        explains: [
          { icon: "⬅️", text: "filter(v ≠ 0) : enlève les cases vides" },
          { icon: "🔗", text: "Si t[i] === t[i+1] : fusionne → multiplie par 2" },
          { icon: "0️⃣", text: "while t.length < 4 : remet des 0 à droite" },
          { icon: "🔄", text: ".reverse() : retourne la ligne pour aller à droite" },
          { icon: "↕️", text: "transposer() : échange lignes/colonnes pour haut/bas" },
        ],
        practice: {
          prompt: "✏️ À toi ! Essaie de changer la taille : remplace les 4 par 5 (dans le tableau grille et les boucles). Qu'est-ce qui se passe ?",
          hint: "// 5 lignes de 5 zéros dans grille\n// l < 5 et c < 5 dans les boucles\n// while t.length < 5 dans glisserLigne",
        },
        html: `<p>Utilise ← → ↑ ↓ pour jouer !</p>`,
        css: `p { color: #7a8cad; font-size: 0.9rem; margin-bottom: 12px; }`,
        js: `/* ── Glisser une ligne vers la gauche ── */
function glisserLigne(ligne) {
  var t = ligne.filter(function(v) { return v !== 0; }); // enlever les 0
  for (var i = 0; i < t.length - 1; i++) {
    if (t[i] === t[i + 1]) { t[i] *= 2; score += t[i]; t.splice(i + 1, 1); }
  }
  while (t.length < 4) t.push(0);
  return t;
}

function transposer() {
  var n = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for (var l = 0; l < 4; l++) for (var c = 0; c < 4; c++) n[c][l] = grille[l][c];
  grille = n;
}

function deplacer(dir) {
  var avant = JSON.stringify(grille);
  if (dir === "gauche") for (var l = 0; l < 4; l++) grille[l] = glisserLigne(grille[l]);
  if (dir === "droite") for (var l = 0; l < 4; l++) { grille[l].reverse(); grille[l] = glisserLigne(grille[l]); grille[l].reverse(); }
  if (dir === "haut")   { transposer(); for (var l = 0; l < 4; l++) grille[l] = glisserLigne(grille[l]); transposer(); }
  if (dir === "bas")    { transposer(); for (var l = 0; l < 4; l++) { grille[l].reverse(); grille[l] = glisserLigne(grille[l]); grille[l].reverse(); } transposer(); }
  if (JSON.stringify(grille) !== avant) { ajouterTuile(); afficherGrille(); }
}

document.addEventListener("keydown", function(e) {
  var map = { ArrowLeft: "gauche", ArrowRight: "droite", ArrowUp: "haut", ArrowDown: "bas" };
  if (map[e.key]) { e.preventDefault(); deplacer(map[e.key]); }
});`,
      },

      /* ── Étape 5 : victoire, défaite & rejouer (delta JS + HTML + CSS) ── */
      {
        id: "fin-rejouer",
        title: "Victoire, défaite & rejouer",
        focusTab: "js",
        concept: "JS — conditions de fin de jeu",
        conceptDesc: "On vérifie si le joueur a gagné (une tuile = 2048) ou si plus aucun mouvement n'est possible. Ajoute les boutons HTML et les styles CSS pour finir !",
        explains: [
          { icon: "🏆", text: "Vérifier si une tuile atteint 2048 → Victoire !" },
          { icon: "🚫", text: "peutJouer() : vérifie si un mouvement est encore possible" },
          { icon: "📱", text: "Boutons fléchés dans l'onglet HTML pour le mobile" },
          { icon: "🔄", text: "init() mis à jour : remet le score à 0 et recrée la grille" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change le message de victoire avec ton prénom. Remplace '🏆 Tu as gagné !' par ton propre message !",
          hint: 'document.getElementById("message").textContent = "🏆 BRAVO [TON PRÉNOM] tu es le meilleur !";',
        },
        html: `<div id="message"></div>
<div class="controles">
  <div></div>
  <button onclick="deplacer('haut')">↑</button>
  <div></div>
  <button onclick="deplacer('gauche')">←</button>
  <button onclick="deplacer('bas')">↓</button>
  <button onclick="deplacer('droite')">→</button>
</div>
<button class="btn-rejouer" onclick="init()">🔄 Rejouer</button>`,
        css: `#message { margin-top: 12px; font-size: 1.2rem; font-weight: bold; min-height: 1.5rem; }
.controles { display: grid; grid-template-columns: repeat(3, 52px); gap: 6px; margin-top: 16px; }
.controles button { padding: 12px; background: #16213e; border: 1px solid #2a3f6a; border-radius: 8px; color: #eee; font-size: 1.1rem; cursor: pointer; }
.btn-rejouer { margin-top: 14px; padding: 10px 24px; background: #f0b429; border: none; border-radius: 999px; color: #1a1a2e; font-weight: bold; cursor: pointer; font-size: 1rem; }`,
        js: `function peutJouer() {
  for (var l = 0; l < 4; l++) for (var c = 0; c < 4; c++) {
    if (grille[l][c] === 0) return true;
    if (c < 3 && grille[l][c] === grille[l][c + 1]) return true;
    if (l < 3 && grille[l][c] === grille[l + 1][c]) return true;
  }
  return false;
}

function verifierFin() {
  for (var l = 0; l < 4; l++) for (var c = 0; c < 4; c++)
    if (grille[l][c] === 2048) {
      document.getElementById("message").textContent = "🏆 Tu as gagné !";
      fini = true;
      window.parent.postMessage({ type: "codelab_score", value: score }, "*");
      return;
    }
  if (!peutJouer()) {
    document.getElementById("message").textContent = "😢 Game Over !";
    fini = true;
    window.parent.postMessage({ type: "codelab_score", value: score }, "*");
  }
}

/* ── deplacer mis à jour pour vérifier la fin de jeu ── */
function deplacer(dir) {
  if (fini) return;
  var avant = JSON.stringify(grille);
  if (dir === "gauche") for (var l = 0; l < 4; l++) grille[l] = glisserLigne(grille[l]);
  if (dir === "droite") for (var l = 0; l < 4; l++) { grille[l].reverse(); grille[l] = glisserLigne(grille[l]); grille[l].reverse(); }
  if (dir === "haut")   { transposer(); for (var l = 0; l < 4; l++) grille[l] = glisserLigne(grille[l]); transposer(); }
  if (dir === "bas")    { transposer(); for (var l = 0; l < 4; l++) { grille[l].reverse(); grille[l] = glisserLigne(grille[l]); grille[l].reverse(); } transposer(); }
  if (JSON.stringify(grille) !== avant) { ajouterTuile(); afficherGrille(); verifierFin(); }
}

/* ── init() mis à jour pour effacer le message ── */
function init() {
  grille = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  score = 0; fini = false;
  document.getElementById("message").textContent = "";
  ajouterTuile(); ajouterTuile(); afficherGrille();
}

init();`,
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════════
     4. CASSE-BRIQUES  ⭐⭐⭐ Difficile   (mode séparé — 4 étapes delta)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id: "casse-briques",
    emoji: "🧱",
    title: "Casse-Briques",
    tagline: "Code un jeu d'arcade avec Canvas !",
    difficulty: 3,
    difficultyLabel: "Difficile",
    color: "#ef4444",
    colorLight: "#fef2f2",
    mode: "separated",
    steps: [

      /* ── Étape 1 : canvas + dessin statique ── */
      {
        id: "canvas",
        title: "Le Canvas — la feuille de dessin",
        focusTab: "html",
        concept: "HTML Canvas + JS",
        conceptDesc: "<canvas> est une zone de dessin. Avec JavaScript et getContext('2d'), tu peux dessiner des formes et des animations ! Le HTML crée la zone, le JS dessine dedans.",
        explains: [
          { icon: "🖼️", text: "<canvas id='jeu'> : la zone de dessin (onglet HTML)" },
          { icon: "📐", text: "width=480 height=320 : taille du canvas en pixels" },
          { icon: "🎨", text: "getContext('2d') : ouvre la boîte à outils de dessin (onglet JS)" },
          { icon: "▬", text: "fillRect(x, y, largeur, hauteur) : dessine un rectangle" },
          { icon: "🔵", text: "arc(x, y, r, 0, Math.PI*2) : dessine un cercle complet" },
        ],
        practice: {
          prompt: "✏️ À toi ! Dans l'onglet JS, change la couleur du fond en remplaçant #1a1a2e par #2d1b33 pour un fond violet foncé !",
          hint: "ctx.fillStyle = '#2d1b33';\nctx.fillRect(0, 0, 480, 320);",
        },
        html: `<h1>🧱 Casse-Briques</h1>
<canvas id="jeu" width="480" height="320"></canvas>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0f0c29;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

h1 { color: #f0b429; font-size: 2rem; margin-bottom: 12px; }

canvas {
  border: 3px solid #333;
  border-radius: 8px;
  display: block;
}`,
        js: `var canvas = document.getElementById("jeu");
var ctx = canvas.getContext("2d");

/* ── Fond sombre ── */
ctx.fillStyle = "#1a1a2e";
ctx.fillRect(0, 0, 480, 320);

/* ── Une brique rouge (pour l'exemple) ── */
ctx.fillStyle = "#ef4444";
ctx.fillRect(50, 50, 80, 24);

/* ── La raquette bleue ── */
ctx.fillStyle = "#60a5fa";
ctx.fillRect(200, 295, 80, 12);

/* ── La balle blanche ── */
ctx.fillStyle = "#ffffff";
ctx.beginPath();
ctx.arc(240, 275, 8, 0, Math.PI * 2);
ctx.fill();`,
      },

      /* ── Étape 2 : briques avec boucles (delta JS) ── */
      {
        id: "briques-boucles",
        title: "Toutes les briques avec des boucles",
        focusTab: "js",
        concept: "JS — boucles imbriquées",
        conceptDesc: "Deux boucles for (une pour les lignes, une pour les colonnes) permettent de dessiner toute la grille de briques automatiquement, sans les écrire une par une !",
        explains: [
          { icon: "🔁", text: "for (l = 0; l < LIGNES; l++) : parcourt chaque ligne" },
          { icon: "🔁", text: "for (c = 0; c < COLONNES; c++) : parcourt chaque colonne" },
          { icon: "📍", text: "x = OX + c * (BL + ESP) : calcule la position horizontale" },
          { icon: "🌈", text: "couleurs[l] : une couleur différente par ligne" },
          { icon: "📊", text: "briques[l][c] = true : chaque brique est visible au départ" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change les couleurs des briques. Remplace les 4 couleurs du tableau par tes propres couleurs !",
          hint: "var couleurs = ['#ff69b4', '#9b59b6', '#3498db', '#2ecc71'];",
        },
        html: ``,
        css: ``,
        js: `var W = 480, H = 320;
var COLONNES = 8, LIGNES = 4;
var BL = 50, BH = 18, ESP = 6;   /* largeur, hauteur, espace */
var OX = 10, OY = 28;             /* décalage gauche et haut */
var couleurs = ["#ef4444", "#f97316", "#facc15", "#22c55e"];

/* ── Tableau des briques (true = visible) ── */
var briques = [];
for (var l = 0; l < LIGNES; l++) {
  briques[l] = [];
  for (var c = 0; c < COLONNES; c++) {
    briques[l][c] = true;
  }
}

/* ── Dessiner tout ── */
function dessiner() {
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, W, H);

  /* Briques */
  for (var l = 0; l < LIGNES; l++) {
    for (var c = 0; c < COLONNES; c++) {
      if (!briques[l][c]) continue;
      ctx.fillStyle = couleurs[l];
      ctx.fillRect(OX + c * (BL + ESP), OY + l * (BH + ESP), BL, BH);
    }
  }

  /* Raquette et balle (positions fixes pour l'instant) */
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(200, 298, 80, 12);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(240, 282, 8, 0, Math.PI * 2);
  ctx.fill();
}

dessiner();`,
      },

      /* ── Étape 3 : animer la balle (delta JS) ── */
      {
        id: "animation",
        title: "Animer la balle",
        focusTab: "js",
        concept: "JS — boucle d'animation",
        conceptDesc: "requestAnimationFrame appelle une fonction environ 60 fois par seconde. C'est comme faire défiler des images très vite pour créer une animation fluide !",
        explains: [
          { icon: "🔄", text: "requestAnimationFrame(boucle) : appelle boucle() à chaque image" },
          { icon: "➕", text: "balle.x += balle.dx : déplace la balle de dx pixels" },
          { icon: "🏓", text: "Si balle touche le bord : inverser dx ou dy (rebond)" },
          { icon: "🧹", text: "fillRect fond : efface l'ancien dessin avant de redessiner" },
        ],
        practice: {
          prompt: "✏️ À toi ! Rends la balle plus rapide en changeant dx: 3 en dx: 5 et dy: -3 en dy: -5. Tu vois la différence ?",
          hint: "var balle = { x: W/2, y: H-60, r: 8, dx: 5, dy: -5 };",
        },
        html: ``,
        css: ``,
        js: `var balle    = { x: W/2, y: H-60, r: 8, dx: 3, dy: -3 };
var raquette = { x: W/2-40, y: H-22, l: 80 };

/* ── Redéfinir dessiner() avec les vraies positions balle/raquette ── */
function dessiner() {
  ctx.fillStyle = "#1a1a2e"; ctx.fillRect(0, 0, W, H);
  for (var l = 0; l < LIGNES; l++) for (var c = 0; c < COLONNES; c++) {
    if (!briques[l][c]) continue;
    ctx.fillStyle = couleurs[l];
    ctx.fillRect(OX + c * (BL + ESP), OY + l * (BH + ESP), BL, BH);
  }
  ctx.fillStyle = "#60a5fa"; ctx.fillRect(raquette.x, raquette.y, raquette.l, 12);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2); ctx.fill();
}

/* ── Boucle d'animation ── */
function boucle() {
  balle.x += balle.dx;
  balle.y += balle.dy;

  /* Rebonds sur les murs gauche et droit */
  if (balle.x - balle.r < 0 || balle.x + balle.r > W) balle.dx *= -1;

  /* Rebond sur le plafond */
  if (balle.y - balle.r < 0) balle.dy *= -1;

  dessiner();
  requestAnimationFrame(boucle);
}

boucle();`,
      },

      /* ── Étape 4 : collisions et contrôles (delta JS + HTML + CSS) ── */
      {
        id: "collisions-controles",
        title: "Collisions et contrôles",
        focusTab: "js",
        concept: "JS — collisions & événements",
        conceptDesc: "On vérifie si la balle touche une brique (la faire disparaître), la raquette (rebond), ou le sol (game over). La souris et le clavier déplacent la raquette.",
        explains: [
          { icon: "💥", text: "Si balle dans zone brique : briques[l][c]=false et dy inversé" },
          { icon: "🏓", text: "Si balle touche la raquette : rebond vers le haut obligatoire" },
          { icon: "🖱️", text: "mousemove : déplace la raquette avec la souris" },
          { icon: "⌨️", text: "ArrowLeft / ArrowRight : touches fléchées clavier" },
          { icon: "🔄", text: "init() : remet tout à zéro pour rejouer" },
        ],
        practice: {
          prompt: "✏️ À toi ! Change les points par brique. Remplace score += 10 par score += 50 pour gagner plus de points à chaque brique cassée !",
          hint: "score += 50;",
        },
        html: `<p>Déplace la raquette avec la souris ou ← →</p>
<button class="btn-rejouer" id="btnRejouer" onclick="init()">🔄 Rejouer</button>`,
        css: `p { color: #7a8cad; font-size: 0.85rem; margin-top: 10px; }
.btn-rejouer { margin-top: 12px; padding: 10px 24px; background: #f0b429; border: none; border-radius: 999px; color: #1a1a2e; font-weight: bold; cursor: pointer; font-size: 1rem; display: none; }`,
        js: `var score = 0, fini = false, raf;

/* ── dessiner() avec score affiché ── */
function dessiner() {
  ctx.fillStyle = "#1a1a2e"; ctx.fillRect(0, 0, W, H);
  for (var l = 0; l < LIGNES; l++) for (var c = 0; c < COLONNES; c++) {
    if (!briques[l][c]) continue;
    ctx.fillStyle = couleurs[l];
    ctx.fillRect(OX + c * (BL + ESP), OY + l * (BH + ESP), BL, BH);
  }
  ctx.fillStyle = "#60a5fa"; ctx.fillRect(raquette.x, raquette.y, raquette.l, 12);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#f0b429"; ctx.font = "14px Arial"; ctx.textAlign = "left";
  ctx.fillText("Score : " + score, 10, 16);
}

function collisions() {
  /* Briques */
  for (var l = 0; l < LIGNES; l++) for (var c = 0; c < COLONNES; c++) {
    if (!briques[l][c]) continue;
    var bx = OX + c * (BL + ESP), by = OY + l * (BH + ESP);
    if (balle.x + balle.r > bx && balle.x - balle.r < bx + BL &&
        balle.y + balle.r > by && balle.y - balle.r < by + BH) {
      briques[l][c] = false; balle.dy *= -1; score += 10;
    }
  }
  /* Raquette */
  if (balle.y + balle.r >= raquette.y && balle.x > raquette.x && balle.x < raquette.x + raquette.l)
    balle.dy = -Math.abs(balle.dy);
  /* Murs */
  if (balle.x - balle.r < 0 || balle.x + balle.r > W) balle.dx *= -1;
  if (balle.y - balle.r < 0) balle.dy *= -1;
  /* Sol → perdu */
  if (balle.y + balle.r > H) { finJeu("😢 Perdu ! Score : " + score, "#ef4444"); return; }
  /* Toutes briques cassées → gagné */
  var cassees = 0;
  for (var l = 0; l < LIGNES; l++) for (var c = 0; c < COLONNES; c++) if (!briques[l][c]) cassees++;
  if (cassees === COLONNES * LIGNES) finJeu("🏆 Bravo ! Score : " + score, "#22c55e");
}

function finJeu(msg, couleur) {
  fini = true; dessiner();
  ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = couleur; ctx.font = "bold 26px Arial"; ctx.textAlign = "center";
  ctx.fillText(msg, W / 2, H / 2);
  document.getElementById("btnRejouer").style.display = "block";
  window.parent.postMessage({ type: "codelab_score", value: score }, "*");
}

/* ── boucle() avec collisions ── */
function boucle() {
  if (fini) return;
  balle.x += balle.dx; balle.y += balle.dy;
  collisions(); dessiner();
  raf = requestAnimationFrame(boucle);
}

/* ── init() : tout remettre à zéro pour rejouer ── */
function init() {
  briques = [];
  for (var l = 0; l < LIGNES; l++) { briques[l] = []; for (var c = 0; c < COLONNES; c++) briques[l][c] = true; }
  balle    = { x: W/2, y: H-60, r: 8, dx: 3, dy: -3 };
  raquette = { x: W/2-40, y: H-22, l: 80 };
  score = 0; fini = false;
  document.getElementById("btnRejouer").style.display = "none";
  if (raf) cancelAnimationFrame(raf);
  boucle();
}

/* ── Contrôles souris ── */
canvas.addEventListener("mousemove", function(e) {
  var r = canvas.getBoundingClientRect();
  raquette.x = Math.max(0, Math.min(W - raquette.l, e.clientX - r.left - raquette.l / 2));
});

/* ── Contrôles clavier ── */
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft")  raquette.x = Math.max(0, raquette.x - 20);
  if (e.key === "ArrowRight") raquette.x = Math.min(W - raquette.l, raquette.x + 20);
});

init();`,
      },
    ],
  },
];
