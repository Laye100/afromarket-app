Design mobile screens for AfroMarket app - Product Search and Detail pages.

COLOR PALETTE:
- Primary: #0F7B6C (green)
- CTA: #FFC300 (yellow)
- Secondary: #1E3A8A (blue)
- Accent: #C1121F (red)
- Background: #F8F9FA
- Text: #1F2937
- White: #FFFFFF

═══════════════════════════════════════════════════════
SCREEN 1: RECHERCHE PRODUITS (F-CLI-003)
═══════════════════════════════════════════════════════

Header (fixed, green #0F7B6C):
- Back arrow (left)
- Search bar (white, rounded, full width)
  * Placeholder: "Rechercher wax, chaussures, téléphone..."
  * Search icon left, mic icon right
  * Real-time results appear after 2 characters
- Cart icon with badge (top-right)

Search Suggestions (appears while typing):
- Recent searches section with clock icons
- Popular searches with fire emoji 🔥
- Category quick filters chips (horizontal scroll):
  "Tissus Africains" | "Vêtements" | "Chaussures" | "Électronique" | etc.

Filter Bar (sticky below header):
- "Filtres" button (left) with filter icon and active count badge "(3)"
- Sort dropdown: "Pertinence" | "Prix ↓" | "Prix ↑" | "Nouveautés"
- Grid/List view toggle (right)

Results Section:
- Results count: "248 produits trouvés"
- Product grid (2 columns):
  * Product image (square, rounded 12px)
  * Out of stock overlay: semi-transparent with "Rupture" text (gray)
  * Heart icon (favorite, top-right corner)
  * Product name (2 lines max, ellipsis)
  * Seller badge: "Stock Tissenza" (green pill) or vendor name
  * Price (bold, green #0F7B6C)
  * Rating stars + review count "(127)"
  * "Ajouter au panier" button (yellow #FFC300, compact)
- Load more on scroll
- Empty state: illustration + "Aucun résultat pour 'xyz'" + "Essayez ces catégories"

Filter Modal (slides from bottom):
- Title: "Filtres" with close X
- Active filters chips (removable X badges)
- "Réinitialiser" link (right)
- Accordion sections:
  
  📦 CATÉGORIE
  - Checkboxes: Tissus Africains, Vêtements, Chaussures, etc.
  
  💰 PRIX
  - Dual range slider (0 - 500,000 CFA)
  - Min/Max input fields
  
  🏪 VENDEUR
  - Radio buttons: Tous | Stock Tissenza | Vendeurs partenaires
  
  ✅ DISPONIBILITÉ
  - Toggle: "Masquer ruptures de stock"
  
  [CATEGORY-SPECIFIC FILTERS - shown only when category selected]
  
  For TISSUS AFRICAINS:
  - Type: Wax | Bazin | Pagne | Dentelle (chips)
  - Couleurs: color picker grid
  - Occasions: Mariage | Baptême | Quotidien (chips)
  - Largeur: 90cm | 120cm | 150cm (radio)
  
  For VÊTEMENTS:
  - Taille: XS | S | M | L | XL | XXL (size chips)
  - Genre: Homme | Femme | Unisexe (tabs)
  - Type: Robe | Pantalon | Chemise | etc. (checkboxes)
  
  For CHAUSSURES:
  - Pointure: slider 35-48
  - Type: Baskets | Sandales | Escarpins (chips)
  - Genre: Homme | Femme | Enfant
  - Marque: searchable dropdown
  
  For ÉLECTRONIQUE:
  - Marque: dropdown with search
  - État: Neuf | Occasion (toggle)
  - Garantie: Oui | Non (toggle)

- Bottom sticky buttons:
  * "Effacer tout" (outline)
  * "Voir 248 résultats" (yellow CTA)

═══════════════════════════════════════════════════════
SCREEN 2: FICHE PRODUIT (F-CLI-004)
═══════════════════════════════════════════════════════

Image Gallery (top):
- Full-width swipeable carousel (2-10 images)
- Image counter: "3/7" (top-right overlay)
- Pinch-to-zoom enabled
- Pagination dots (bottom)
- Back button (top-left, white circle)
- Share icon (top-right, white circle)
- Heart/favorite icon (top-right, white circle)

Product Info Card (white, rounded top corners):
- Product name (bold, 20px, 2 lines)
- Rating: ★★★★☆ 4.6 (127 avis)
- Price section:
  * Large price (green #0F7B6C, 28px bold)
  * Original price strikethrough if discount
  * Discount badge: "-25%" (red #C1121F pill)
  * Unit info: "/mètre" for fabrics, "pièce" for others

- Seller card (horizontal):
  * Shop avatar (circular)
  * Shop name "Mode AfroStyle"
  * Rating ★★★★ 4.8 + "Voir la boutique >" link
  * Badge: "Stock Tissenza" (green) or "Vendeur vérifié ✓"

- Stock indicator:
  * Green: "En stock (12 unités)"
  * Orange: "Stock limité (3 restants)"
  * Red: "Rupture de stock"

[CATEGORY-SPECIFIC SECTIONS]

For TISSUS AFRICAINS:
- Type: "Wax Premium"
- Couleurs: color chips with names
- Composition: "100% Coton"
- Largeur: tabs "90cm | 120cm | 150cm" (price updates)
- Occasions: chips "Mariage" "Cérémonies"
- Métrage selector:
  * Stepper: [-] [3 mètres] [+]
  * Quick buttons: 2m | 5m | 10m

For VÊTEMENTS:
- Taille: size selector (XS to XXL chips, sold out = gray)
- "Guide des tailles" link → modal with measurement table
- Couleur: color swatches (clickable)
- Matière: "Coton Wax" with icon
- Genre: "Femme" badge

For CHAUSSURES:
- Pointure: scrollable size chips (35-48)
- Genre: "Homme" badge
- Type: "Baskets casual"
- Marque: "Nike" with logo
- Matière: "Cuir synthétique"

For ÉLECTRONIQUE:
- Marque/Modèle: "Samsung Galaxy A54"
- État: "Neuf sous blister" (green badge)
- Garantie: "12 mois constructeur" with shield icon
- Caractéristiques (expandable table):
  * Écran: 6.4" AMOLED
  * RAM: 8GB
  * Stockage: 256GB
  * Appareil photo: 50MP
- Accessoires inclus: chips "Chargeur" "Écouteurs" "Housse"

Description section (expandable):
- Title: "Description"
- Text (4 lines preview, "Lire plus" link)
- Full text in expanded state

Action buttons (sticky bottom):
- "Ajouter au panier" (yellow #FFC300, 60% width)
- Heart icon button (outline, 20% width)
- Share icon button (outline, 20% width)

Avis clients section:
- Title: "Avis clients (127)" with filter "Plus récents ▾"
- Rating breakdown:
  * 5★ ▓▓▓▓▓▓▓▓ 78%
  * 4★ ▓▓▓ 15%
  * 3★ ▓ 5%
  * 2★ ░ 1%
  * 1★ ░ 1%
- Review cards:
  * User avatar + name
  * Star rating + date
  * Review text (3 lines, "Lire plus")
  * Photos (if attached, horizontal scroll)
  * Helpful buttons: 👍 12 | 👎 1
- "Voir tous les avis" button

Produits similaires carousel:
- Title: "Vous aimerez aussi"
- Horizontal scroll (10 products)
- Same card design as search results
- Arrow navigation

Report button (bottom):
- Text link: "Signaler ce produit" (small, gray)
- Modal: Contenu inapproprié | Prix erroné | Autre

═══════════════════════════════════════════════════════
DESIGN GUIDELINES
═══════════════════════════════════════════════════════

Typography:
- Product names: Semibold 16-20px
- Prices: Bold 24-28px
- Body text: Regular 14px
- Labels: Medium 12px uppercase

Components:
- Cards: 12px border radius, subtle shadow
- Buttons: 14px border radius, 48px height minimum
- Chips: 20px border radius, 32px height
- Input fields: 12px border radius, 44px height

Interactions:
- Shimmer loading on product cards
- Smooth scroll animations
- Pull-to-refresh on lists
- Haptic feedback on buttons
- Toast notifications for actions ("Ajouté au panier ✓")

African design elements:
- Kente pattern dividers between sections
- Colorful badges with African patterns
- Warm product photography
- Decorative geometric shapes in empty states