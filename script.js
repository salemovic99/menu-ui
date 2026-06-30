/* =================================================================
   ENTRECÔTE · Menu interactions (vanilla ES6+)
   1. Data   2. Icons   3. Render   4. Nav/scroll-spy
   5. Search & filter   6. Favourites   7. Modal
   8. Reveal/counters/ripple   9. Boot
   ================================================================= */
'use strict';

/* ----------------------------------------------------------------
   1. CATEGORIES + MENU DATA
   Images: Unsplash CDN (lazy + skeleton + graceful fallback).
---------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'cuts',        label: 'The Cuts',         icon: 'flame' },
  { id: 'starters',    label: 'Before the Steak', icon: 'leaf' },
  { id: 'desserts',    label: 'The Final Act',    icon: 'cake' },
  { id: 'hot-drinks',  label: 'Hot Drinks',       icon: 'coffee' },
  { id: 'cold-drinks', label: 'Cold Drinks',      icon: 'glass' },
  { id: 'water',       label: 'Water',            icon: 'drop' },
];

// Unsplash helper — stable photo IDs, auto format/crop, low-bandwidth quality.
const ph = (id, w = 760) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const FALLBACK = 'assets/images/placeholder.svg';

// Convenience builders for ingredient + allergen tags
const ing = (name, icon) => ({ name, icon });

const MENU = [
  /* ---- The Cuts · served with Café de Paris sauce, House Frites & Chef's Salad ---- */
  { id:'c1', cat:'cuts', name:'Le Suprême — Wagyu 9', price:575, meat:'beef', spice:0, time:30, cal:1000,
    desc:'Australian Wagyu striploin, marbling score 9. The fat is so dense it softens before the flame touches it. Limited daily — once gone, no second batch tonight.',
    img:ph('1546964124-0cce460f38ef'), pop:96, added:'2026-05-20',
    badges:['chef','premium','limited','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Wagyu Striploin','beef'),ing('Café de Paris Sauce','herb'),ing('House Frites','potato'),ing('Chef\'s Salad','leaf')],
    allergens:['Dairy'], pairing:'k2' },
  { id:'c2', cat:'cuts', name:'Le Marbré — Wagyu 7', price:445, meat:'beef', spice:0, time:28, cal:790,
    desc:'Australian Wagyu striploin, marbling score 7 — the point where fat becomes a flavour system. Deeply indulgent, perfectly balanced.',
    img:ph('1544025162-d76694265947'), pop:92, added:'2026-03-10',
    badges:['chef','premium','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Wagyu Striploin','beef'),ing('Café de Paris Sauce','herb'),ing('House Frites','potato'),ing('Chef\'s Salad','leaf')],
    allergens:['Dairy'], pairing:'f2' },
  { id:'c3', cat:'cuts', name:'Le Noir — Black Angus', price:390, meat:'beef', spice:0, time:26, cal:880,
    desc:'Black Angus tenderloin, 200g. A richer, more pronounced flavour — naturally smoother in texture, deeper in character.',
    img:ph('1558030006-450675393462'), pop:88, added:'2025-12-01',
    badges:['popular','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Black Angus Tenderloin','beef'),ing('Café de Paris Sauce','herb'),ing('House Frites','potato'),ing('Chef\'s Salad','leaf')],
    allergens:['Dairy'], pairing:'h3' },
  { id:'c4', cat:'cuts', name:'Le Filet', price:295, meat:'beef', spice:0, time:24, cal:700,
    desc:'Australian tenderloin, 200g, silk-fine texture. Lean, tender, virtually without resistance — it dissolves rather than chews.',
    img:ph('1432139509613-5c4255815697'), pop:84, added:'2025-10-12',
    badges:['halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Australian Tenderloin','beef'),ing('Café de Paris Sauce','herb'),ing('House Frites','potato'),ing('Chef\'s Salad','leaf')],
    allergens:['Dairy'], pairing:'k2' },
  { id:'c5', cat:'cuts', name:'The Classic', price:220, meat:'beef', spice:0, time:24, cal:550,
    desc:'Australian striploin, 200g · the original cut. The one Monsieur Boubier chose in 1930. It has not needed to change since.',
    img:ph('1600891964599-f61ba0e24092'), pop:90, added:'2025-08-15',
    badges:['popular','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Australian Striploin','beef'),ing('Café de Paris Sauce','herb'),ing('House Frites','potato'),ing('Chef\'s Salad','leaf')],
    allergens:['Dairy'], pairing:'f1' },

  /* ---- Before the Steak · made in-house, daily (included) ---- */
  { id:'b1', cat:'starters', name:'Fresh Bread, White & Brown', price:0, meat:'veg', spice:0, time:5, cal:180,
    desc:'Baked daily, never reheated. White and brown loaves, served warm before the steak.',
    img:ph('1568471173242-461f0a730452'), pop:70, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Wheat Flour','wheat'),ing('Sea Salt','salt'),ing('Olive Oil','drop')],
    allergens:['Gluten'], pairing:'b2' },
  { id:'b2', cat:'starters', name:'Herb Butter de Maison', price:0, meat:'veg', spice:0, time:3, cal:90,
    desc:'Thyme, rosemary, parsley and coriander — piped to order alongside the bread.',
    img:ph('1589985270826-4b7bb135bc9d'), pop:74, added:'2025-08-01',
    badges:['chef','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Butter','butter'),ing('Thyme','herb'),ing('Parsley','herb'),ing('Coriander','herb')],
    allergens:['Dairy'], pairing:'b1' },
  { id:'b3', cat:'starters', name:'The Black Olive Dip', price:0, meat:'veg', spice:0, time:3, cal:120,
    desc:'Black olives blended smooth with premium olive oil — a savoury start to the table.',
    img:ph('1611171711791-b34fa42e9fcc'), pop:64, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Black Olives','leaf'),ing('Olive Oil','drop'),ing('Sea Salt','salt')],
    allergens:[], pairing:'c5' },

  /* ---- The Final Act ---- */
  { id:'f1', cat:'desserts', name:'Crème Brûlée', price:55, meat:'sweet', spice:0, time:10, cal:360,
    desc:'Tahitian vanilla custard under a torched caramel crust.',
    img:ph('1470124182917-cc6e71b22ecc'), pop:80, added:'2025-09-01',
    badges:['popular','chef','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Vanilla','vanilla'),ing('Custard','egg'),ing('Caramel','caramel'),ing('Cream','butter')],
    allergens:['Dairy','Egg'], pairing:'h1' },
  { id:'f2', cat:'desserts', name:'Chocolate Fondant', price:69, meat:'sweet', spice:0, time:14, cal:520,
    desc:'Dark chocolate fondant with a molten salted-caramel core.',
    img:ph('1551024601-bec78aea704b'), pop:83, added:'2026-01-12',
    badges:['popular','halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Chocolate','choc'),ing('Caramel','caramel'),ing('Egg','egg'),ing('Cream','butter')],
    allergens:['Dairy','Egg','Gluten'], pairing:'h2' },
  { id:'f3', cat:'desserts', name:'Italian Cheesecake', price:50, meat:'sweet', spice:0, time:10, cal:430,
    desc:'Burnt Basque-style cheesecake — creamy centre, caramelised top.',
    img:ph('1565958011703-44f9829ba187'), pop:72, added:'2025-11-05',
    badges:['halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Cream Cheese','cheese'),ing('Egg','egg'),ing('Sugar','sugar'),ing('Vanilla','vanilla')],
    allergens:['Dairy','Egg'], pairing:'h4' },
  { id:'f4', cat:'desserts', name:'Tiramisu Maison', price:50, meat:'sweet', spice:0, time:10, cal:410,
    desc:'Mascarpone and espresso-soaked savoiardi, dusted with cocoa.',
    img:ph('1571877227200-a0d98ea607e9'), pop:78, added:'2026-02-18',
    badges:['chef','halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Mascarpone','cheese'),ing('Espresso','coffee'),ing('Cocoa','choc'),ing('Egg','egg')],
    allergens:['Dairy','Egg','Gluten'], pairing:'h1' },
  { id:'f5', cat:'desserts', name:'Profiteroles', price:55, meat:'sweet', spice:0, time:12, cal:480,
    desc:'Choux puffs filled with vanilla cream under warm chocolate sauce.',
    img:ph('1612203985729-70726954388c'), pop:70, added:'2026-03-22',
    badges:['halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Choux','wheat'),ing('Vanilla Cream','vanilla'),ing('Chocolate','choc'),ing('Sugar','sugar')],
    allergens:['Dairy','Egg','Gluten'], pairing:'h3' },

  /* ---- Hot Drinks ---- */
  { id:'h1', cat:'hot-drinks', name:'Espresso', price:22, meat:'drink', spice:0, time:3, cal:5,
    desc:'A short, intense shot with a velvet crema.',
    img:ph('1509042239860-f550ce710b93'), pop:75, added:'2025-07-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Espresso','coffee')], allergens:[], pairing:'f2' },
  { id:'h2', cat:'hot-drinks', name:'Cappuccino', price:25, meat:'drink', spice:0, time:4, cal:120,
    desc:'Espresso crowned with steamed milk and a dense foam.',
    img:ph('1572442388796-11668a67e53d'), pop:73, added:'2025-07-01',
    badges:['halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Espresso','coffee'),ing('Steamed Milk','drop')], allergens:['Dairy'], pairing:'f5' },
  { id:'h3', cat:'hot-drinks', name:'Turkish Coffee', price:22, meat:'drink', spice:0, time:6, cal:30,
    desc:'Finely ground, slow-brewed and served with the grounds.',
    img:ph('1578374173705-969cbe6f2d6b'), pop:68, added:'2025-09-15',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Coffee','coffee'),ing('Sugar','sugar')], allergens:[], pairing:'f4' },
  { id:'h4', cat:'hot-drinks', name:'Café Latte', price:25, meat:'drink', spice:0, time:4, cal:150,
    desc:'A long milk coffee, smooth and mild.',
    img:ph('1541167760496-1628856ab772'), pop:71, added:'2025-07-01',
    badges:['halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Espresso','coffee'),ing('Steamed Milk','drop')], allergens:['Dairy'], pairing:'f3' },
  { id:'h5', cat:'hot-drinks', name:'Tea', price:20, meat:'drink', spice:0, time:5, cal:5,
    desc:'A pot of freshly brewed black or green tea.',
    img:ph('1576092768241-dec231879fc3'), pop:60, added:'2025-07-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Tea Leaves','herb')], allergens:[], pairing:'f1' },

  /* ---- Cold Drinks ---- */
  { id:'k1', cat:'cold-drinks', name:'Saudi Cool', price:48, meat:'drink', spice:0, time:4, cal:140,
    desc:'The house signature cooler — bright, aromatic and refreshing.',
    img:ph('1437418747212-8d9709afab22'), pop:79, added:'2026-04-01',
    badges:['popular','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('House Blend','herb'),ing('Citrus','citrus'),ing('Soda','drop')], allergens:[], pairing:'c1' },
  { id:'k2', cat:'cold-drinks', name:'Red Grape Sparkling', price:132, meat:'drink', spice:0, time:3, cal:160,
    desc:'Sparkling red grape, served chilled in a flute — the cut\'s natural partner.',
    img:ph('1621263764928-df1444c5e859'), pop:82, added:'2026-02-01',
    badges:['chef','premium','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Red Grape','wine'),ing('Sparkling Water','drop')], allergens:[], pairing:'c1' },
  { id:'k3', cat:'cold-drinks', name:'Classic Mojito', price:35, meat:'drink', spice:0, time:5, cal:130,
    desc:'Virgin mojito — lime, fresh mint and soda over crushed ice.',
    img:ph('1551538827-9c037cb4f32a'), pop:74, added:'2025-10-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Lime','citrus'),ing('Mint','herb'),ing('Soda','drop'),ing('Sugar','sugar')], allergens:[], pairing:'c4' },
  { id:'k4', cat:'cold-drinks', name:'Fresh Orange Juice', price:35, meat:'drink', spice:0, time:3, cal:120,
    desc:'Pressed to order from whole oranges.',
    img:ph('1600271886742-f049cd451bba'), pop:76, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Orange','citrus')], allergens:[], pairing:'b1' },
  { id:'k5', cat:'cold-drinks', name:'Lemonade', price:35, meat:'drink', spice:0, time:3, cal:110,
    desc:'House lemonade with a hint of mint.',
    img:ph('1523677011781-c91d1bbe2f9e'), pop:69, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Lemon','citrus'),ing('Mint','herb'),ing('Sugar','sugar')], allergens:[], pairing:'b3' },
  { id:'k6', cat:'cold-drinks', name:'Iced Tea', price:39, meat:'drink', spice:0, time:3, cal:90,
    desc:'Chilled black tea over ice with a wedge of lemon.',
    img:ph('1499638673689-79a0b5115d87'), pop:66, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Black Tea','herb'),ing('Lemon','citrus'),ing('Ice','drop')], allergens:[], pairing:'f4' },
  { id:'k7', cat:'cold-drinks', name:'Soft Drinks', price:20, meat:'drink', spice:0, time:1, cal:140,
    desc:'Chilled cola, lemon-lime and other classics.',
    img:ph('1581636625402-29b2a704ef13'), pop:62, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Soda','soda'),ing('Citrus','citrus')], allergens:[], pairing:'c5' },

  /* ---- Water ---- */
  { id:'wt1', cat:'water', name:'Evian Still 750ml', price:33, meat:'drink', spice:0, time:1, cal:0,
    desc:'Natural still mineral water, chilled.',
    img:ph('1559839734-2b71ea197ec2'), pop:58, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Spring Water','drop')], allergens:[], pairing:'c1' },
  { id:'wt2', cat:'water', name:'Evian Sparkling 750ml', price:39, meat:'drink', spice:0, time:1, cal:0,
    desc:'Natural sparkling mineral water, fine perlage.',
    img:ph('1610631066894-62452ccb927c'), pop:56, added:'2025-08-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Mineral Water','drop'),ing('Bubbles','drop')], allergens:[], pairing:'c2' },
];

const byId = (id) => MENU.find(m => m.id === id);

/* ----------------------------------------------------------------
   2. INLINE SVG ICON LIBRARY (no emoji, stroke-consistent)
---------------------------------------------------------------- */
const ICON = {
  // nav / meta
  flame:'<path d="M12 3c2 4 5 5 5 9a5 5 0 11-10 0c0-2 1-3 2-4 .5 1 1 1.5 2 1.5C12 8 11 6 12 3z"/>',
  cut:'<path d="M5 5l9 9M14 5l-4 4M19 14a3 3 0 11-6 0 3 3 0 016 0zM7 17a3 3 0 11-6 0 3 3 0 016 0z"/>',
  star:'<path d="M12 4l2.3 4.7L19.5 9l-3.7 3.6.9 5.1L12 15.3 7.3 17.7l.9-5.1L4.5 9l5.2-.3z"/>',
  plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/>',
  leaf:'<path d="M5 19c0-8 6-13 14-14 0 8-5 14-14 14zM5 19c2-4 5-6 9-7"/>',
  cake:'<path d="M4 20h16v-7H4zM12 4v3M8 7h8M5 13c1.5 1.5 3.5 1.5 5 0s3.5-1.5 5 0 3.5 1.5 4 0"/>',
  coffee:'<path d="M4 8h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 9h2a2 2 0 010 4h-2M7 3v2M11 3v2"/>',
  glass:'<path d="M7 4h10l-1 7a4 4 0 01-8 0zM12 15v5M9 20h6"/>',
  soda:'<path d="M8 7h8l-1 12a2 2 0 01-2 2h-2a2 2 0 01-2-2zM8 7l1-3h6l1 3M9 11h6"/>',
  drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>',
  // meta icons
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  fire:'<path d="M12 3c2 4 5 5 5 9a5 5 0 11-10 0c0-2 1-3 2-4 .5 1 1 1.5 2 1.5C12 8 11 6 12 3z"/>',
  cal:'<path d="M12 21a9 9 0 119-9c0 1-1 1-2 1-3 0-4-3-2-5-5 0-9 3-9 8a4 4 0 004 5z"/>',
  chef:'<path d="M7 14a4 4 0 01-1-7.8A4 4 0 0113 5a4 4 0 015 6 4 4 0 01-1 3M7 14h10v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"/>',
  heart:'<path d="M12 21s-7-4.5-9.5-8.5C.8 9.6 2.3 6 5.6 6c2 0 3.3 1.2 4.4 2.6C11.1 7.2 12.4 6 14.4 6c3.3 0 4.8 3.6 3.1 6.5C19 16.5 12 21 12 21z"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  arrow:'<path d="M9 6l6 6-6 6"/>',
  pair:'<path d="M7 4h10l-1 7a4 4 0 01-8 0zM12 15v5M9 20h6"/>',
  // ingredient icons
  beef:'<path d="M6 9a5 5 0 0110 0c2 0 3 2 3 4s-2 4-5 4H8a4 4 0 01-2-8z"/><circle cx="9" cy="11" r="1"/>',
  butter:'<path d="M4 14l6-9 10 5-6 9zM10 5l4 9"/>',
  herb:'<path d="M12 21V9M12 9c-4 0-6-3-6-6 4 0 6 3 6 6zM12 9c4 0 6-3 6-6-4 0-6 3-6 6z"/>',
  salt:'<path d="M9 8h6l1 12H8zM10 8V5h4v3M11 4h2"/>',
  pepper:'<path d="M9 9c0-2 6-2 6 0 2 3 1 11-3 11s-5-8-3-11zM10 6c0-1 1-2 3-1"/>',
  marrow:'<path d="M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4M12 9v6"/>',
  onion:'<path d="M12 21c-4 0-6-3-6-7s3-9 6-9 6 5 6 9-2 7-6 7zM12 5v16"/>',
  chili:'<path d="M5 19c8 0 12-5 12-11 1 0 2-1 2-3M5 19c0-3 2-5 5-6"/>',
  garlic:'<path d="M12 3c-1 2-1 4 0 5M12 8c-3 0-5 3-5 7s2 6 5 6 5-2 5-6-2-7-5-7zM12 12v9"/>',
  wine:'<path d="M7 4h10l-1 6a4 4 0 01-8 0zM12 14v5M9 19h6"/>',
  mushroom:'<path d="M4 11a8 8 0 0116 0zM10 11v6a2 2 0 004 0v-6"/>',
  wheat:'<path d="M12 21V8M12 8c-2-1-3-3-3-5 2 0 3 2 3 5zM12 8c2-1 3-3 3-5-2 0-3 2-3 5zM12 13c-2-1-3-2-3-4M12 13c2-1 3-2 3-4"/>',
  potato:'<path d="M7 8a6 5 0 0110 4c2 4-2 7-6 6S3 11 7 8z"/><circle cx="10" cy="11" r=".8"/><circle cx="14" cy="13" r=".8"/>',
  cheese:'<path d="M4 13l9-6 7 3v6H4zM4 13h16M9 16v1M13 16v1"/>',
  fish:'<path d="M3 12c4-5 11-5 15 0-4 5-11 5-15 0zM18 12l3-3v6zM8 11h.01"/>',
  citrus:'<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17"/>',
  tomato:'<circle cx="12" cy="13" r="7"/><path d="M12 6c-1-2-3-2-3-2M12 6c1-2 3-2 3-2"/>',
  egg:'<path d="M12 3c4 4 6 8 6 11a6 6 0 01-12 0c0-3 2-7 6-11z"/>',
  lamb:'<path d="M7 10a4 4 0 018 0c2 0 3 2 3 4s-2 4-4 4H8a4 4 0 01-1-8z"/><path d="M9 18v2M14 18v2"/>',
  chicken:'<path d="M14 4a4 4 0 00-4 6c-3 1-5 3-5 6h11a5 5 0 002-12zM7 16l-2 4M10 16l-1 4"/>',
  rice:'<path d="M6 12c0-3 6-3 6 0M12 12c0-3 6-3 6 0M9 17c0-3 6-3 6 0M5 17h14v3H5z"/>',
  choc:'<path d="M5 5h14v14H5zM5 9h14M5 13h14M9 5v14M13 5v14"/>',
  caramel:'<path d="M5 7l14-2v9a5 5 0 01-5 5H9a4 4 0 01-4-4z"/>',
  vanilla:'<path d="M12 3v18M9 7c0-2 6-2 6 0M8 12c0-2 8-2 8 0M9 17c0-2 6-2 6 0"/>',
  sugar:'<path d="M5 9l3-4h8l3 4-3 4H8zM5 9h14"/>',
  seed:'<path d="M12 4c4 2 5 6 3 10s-6 5-9 3M12 4c-3 1-4 5-2 9"/>',
  honey:'<path d="M12 3l7 4v8l-7 4-7-4V7zM12 11v-2M9 9h6"/>',
  pumpkin:'<path d="M12 6v12M9 6c-4 0-5 4-5 6s1 6 5 6M15 6c4 0 5 4 5 6s-1 6-5 6M12 6c-1-2 1-3 2-3"/>',
};
const svg = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name] || ''}</svg>`;
const ICON_OF = {}; CATEGORIES.forEach(c => ICON_OF[c.id] = c.icon);

/* ----------------------------------------------------------------
   3. STATE
---------------------------------------------------------------- */
const LS = { fav:'ec_favs', recent:'ec_recent' };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const state = {
  favs: new Set(load(LS.fav, [])),
  recent: load(LS.recent, []),
  q: '',
  meat: new Set(),
  spice: new Set(),
  diet: new Set(),
  maxPrice: 9999,
  sort: 'pop',
  filtering: false,
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => n > 0 ? 'SAR ' + n.toFixed(0) : 'Included';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ----------------------------------------------------------------
   4. CARD TEMPLATES
---------------------------------------------------------------- */
function badgeHTML(b) {
  const map = {
    popular:  ['popular', svg('fire'),  'Popular'],
    chef:     ['chef',    svg('chef'),  "Chef's Pick"],
    new:      ['new',     svg('star'),  'New'],
    limited:  ['limited', svg('star'),  'Limited'],
    halal:    ['halal',   svg('check'), 'Halal'],
    premium:  ['premium', svg('star'),  'Premium'],
  };
  const m = map[b]; if (!m) return '';
  return `<span class="badge badge--${m[0]}">${m[1]}${m[2]}</span>`;
}
function spiceHTML(level) {
  if (!level) return '';
  let dots = '';
  for (let i = 0; i < 3; i++) dots += `<i class="${i < level ? 'on' : ''}"></i>`;
  return `<span class="meta-item" title="Spice level ${level} of 3" aria-label="Spice level ${level} of 3">
    ${svg('fire')}<span class="spice-dots" aria-hidden="true">${dots}</span></span>`;
}

function cardHTML(item, idx = 0) {
  const isFav = state.favs.has(item.id);
  const badges = item.badges.filter(b => b !== 'halal').slice(0, 3).map(badgeHTML).join('');
  return `
  <article class="card reveal" data-id="${item.id}" style="--d:${Math.min(idx * 0.05, 0.3)}s" tabindex="0" role="button" aria-label="${item.name}, ${money(item.price)}. View details">
    <div class="card__media">
      <div class="card__img">
        <img data-src="${item.img}" alt="${item.name}" width="760" height="475" loading="lazy" decoding="async" />
      </div>
      <div class="card__badges">${badges}</div>
      <button class="fav-btn ${isFav ? 'is-fav' : ''} ripple" data-fav="${item.id}" aria-pressed="${isFav}" aria-label="${isFav ? 'Remove from' : 'Add to'} favourites">
        ${svg('heart')}
      </button>
    </div>
    <div class="card__body">
      <div class="card__head">
        <h3 class="card__name">${item.name}</h3>
        <span class="card__price">${money(item.price)}</span>
      </div>
      <p class="card__desc">${item.desc}</p>
      <div class="card__meta">
        <span class="meta-item">${svg('clock')}${item.time} min</span>
        <span class="meta-item">${svg('cal')}${item.cal} kcal</span>
        ${spiceHTML(item.spice)}
      </div>
    </div>
  </article>`;
}

function miniHTML(item, rankLabel) {
  return `
  <button class="mini ripple" data-id="${item.id}" aria-label="${item.name}, ${money(item.price)}">
    <img class="mini__img" data-src="${item.img}" alt="" width="72" height="72" loading="lazy" decoding="async" />
    <span class="mini__body">
      <span class="mini__name">${item.name}</span>
      <span class="mini__row">
        <span class="mini__price">${money(item.price)}</span>
        <span class="mini__rank">${rankLabel}</span>
      </span>
    </span>
  </button>`;
}

/* ----------------------------------------------------------------
   5. RENDER SECTIONS
---------------------------------------------------------------- */
const sectionsEl = $('#sections');

function visibleItems() {
  const q = state.q.trim().toLowerCase();
  return MENU.filter(m => {
    if (q && !(`${m.name} ${m.desc} ${m.cat}`.toLowerCase().includes(q))) return false;
    if (state.meat.size && !state.meat.has(m.meat)) return false;
    if (state.spice.size && !state.spice.has(String(m.spice))) return false;
    if (state.diet.size && ![...state.diet].every(d => m.diet.includes(d))) return false;
    if (m.price > state.maxPrice) return false;
    return true;
  }).sort((a, b) => {
    if (state.sort === 'price-asc')  return a.price - b.price;
    if (state.sort === 'price-desc') return b.price - a.price;
    if (state.sort === 'new') return new Date(b.added) - new Date(a.added);
    return b.pop - a.pop; // popularity
  });
}

function renderSections() {
  const items = visibleItems();
  const meta = $('#resultsMeta');

  // Empty state
  $('#emptyState').hidden = items.length !== 0;

  if (state.filtering) {
    meta.hidden = false;
    $('#resultsCount').textContent = `${items.length} dish${items.length === 1 ? '' : 'es'} match`;
  } else {
    meta.hidden = true;
  }

  // Group by category (preserving CATEGORIES order)
  const groups = new Map(CATEGORIES.map(c => [c.id, []]));
  items.forEach(it => groups.get(it.cat)?.push(it));

  let html = '';
  CATEGORIES.forEach(cat => {
    const list = groups.get(cat.id);
    if (!list.length) return;
    html += `
    <section class="cat-section" id="cat-${cat.id}" data-cat="${cat.id}" aria-label="${cat.label}">
      <div class="section-head reveal">
        <span class="section-head__kicker">${list.length} selection${list.length === 1 ? '' : 's'}</span>
        <h2 class="section-head__title">${cat.label}</h2>
      </div>
      <div class="menu-grid">
        ${list.map((it, i) => cardHTML(it, i)).join('')}
      </div>
    </section>`;
  });
  sectionsEl.innerHTML = html;

  hydrateImages(sectionsEl);
  observeReveals(sectionsEl);
  observeSections();
}

/* Chef's picks carousel, Today's special, Best sellers, Recently viewed */
function renderFeatured() {
  const chefs = MENU.filter(m => m.badges.includes('chef')).slice(0, 6);
  $('#chefTrack').innerHTML = chefs.map((it, i) => cardHTML(it, i)).join('');

  const dots = $('#chefDots');
  dots.innerHTML = chefs.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('');

  // Today's special — the highest-pop limited/new item
  const sp = MENU.find(m => m.id === 'c1');
  $('#specialCard').innerHTML = `
    <div class="special__bg" style="background-image:url('${sp.img.replace('w=760','w=1100')}')"></div>
    <span class="special__tag">${svg('star')}Today's Special</span>
    <h3 class="special__title">${sp.name}</h3>
    <p class="special__desc">${sp.desc}</p>
    <div class="special__row">
      <span class="special__price">${money(sp.price)}</span>
      <button class="btn btn--gold ripple" data-id="${sp.id}">View dish ${svg('arrow')}</button>
    </div>`;

  // Best sellers
  const best = [...MENU].sort((a, b) => b.pop - a.pop).slice(0, 8);
  $('#bestTrack').innerHTML = best.map((it, i) => miniHTML(it, `#${i + 1} loved`)).join('');

  hydrateImages($('#chefTrack'));
  hydrateImages($('#bestTrack'));
  observeReveals($('#chefPicks'));
}

function renderRecent() {
  const block = $('#recentBlock');
  const items = state.recent.map(byId).filter(Boolean).slice(0, 8);
  if (!items.length) { block.hidden = true; return; }
  block.hidden = false;
  $('#recentTrack').innerHTML = items.map(it => miniHTML(it, 'viewed')).join('');
  hydrateImages($('#recentTrack'));
}

/* ----------------------------------------------------------------
   6. LAZY IMAGE HYDRATION (skeleton → fade-in, fallback on error)
---------------------------------------------------------------- */
let imgObserver;
function hydrateImages(root) {
  const imgs = $$('img[data-src]', root);
  if (!('IntersectionObserver' in window)) { imgs.forEach(loadImg); return; }
  if (!imgObserver) {
    imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { loadImg(e.target); obs.unobserve(e.target); } });
    }, { rootMargin: '200px' });
  }
  imgs.forEach(img => imgObserver.observe(img));
}
function loadImg(img) {
  const src = img.dataset.src; if (!src) return;
  delete img.dataset.src;
  const done = () => {
    img.classList.add('is-loaded');
    img.closest('.card__img')?.classList.add('is-ready');
  };
  img.addEventListener('load', done, { once: true });
  img.addEventListener('error', () => { img.src = FALLBACK; done(); }, { once: true });
  img.src = src;
}

/* ----------------------------------------------------------------
   7. CATEGORY NAV + SCROLL SPY
---------------------------------------------------------------- */
const catTrack = $('#catTrack');
const catIndicator = $('#catIndicator');
let activeCat = CATEGORIES[0].id;

function buildCatNav() {
  const tabs = CATEGORIES.map((c, i) => `
    <button class="cat-tab ${i === 0 ? 'is-active' : ''}" role="tab" data-target="cat-${c.id}" aria-selected="${i === 0}">
      ${svg(c.icon, 'cat-tab__ico')}<span>${c.label}</span>
    </button>`).join('');
  catTrack.insertAdjacentHTML('afterbegin', tabs);

  catTrack.addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab'); if (!tab) return;
    const el = document.getElementById(tab.dataset.target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
        - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) + 56 + 8);
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });
}

function setActiveTab(catId) {
  if (catId === activeCat) { moveIndicator(); return; }
  activeCat = catId;
  $$('.cat-tab', catTrack).forEach(t => {
    const on = t.dataset.target === `cat-${catId}`;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', on);
    if (on) t.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  moveIndicator();
}

function moveIndicator() {
  const tab = $(`.cat-tab[data-target="cat-${activeCat}"]`, catTrack);
  if (!tab) { catIndicator.style.width = '0'; return; }
  catIndicator.style.width = tab.offsetWidth + 'px';
  catIndicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}

let sectionObserver;
function observeSections() {
  if (sectionObserver) sectionObserver.disconnect();
  const opts = { rootMargin: '-45% 0px -50% 0px', threshold: 0 };
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) setActiveTab(e.target.dataset.cat); });
  }, opts);
  $$('.cat-section', sectionsEl).forEach(s => sectionObserver.observe(s));
  // ensure indicator placed correctly after layout
  requestAnimationFrame(moveIndicator);
}

/* ----------------------------------------------------------------
   8. SCROLL REVEAL
---------------------------------------------------------------- */
let revealObserver;
function observeReveals(root) {
  if (reduceMotion) { $$('.reveal', root).forEach(el => el.classList.add('is-in')); return; }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  }
  $$('.reveal:not(.is-in)', root).forEach(el => revealObserver.observe(el));
}

/* ----------------------------------------------------------------
   9. ANIMATED COUNTERS (hero stats)
---------------------------------------------------------------- */
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1400; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ----------------------------------------------------------------
   10. RIPPLE EFFECT
---------------------------------------------------------------- */
document.addEventListener('pointerdown', (e) => {
  const host = e.target.closest('.ripple'); if (!host || reduceMotion) return;
  const r = host.getBoundingClientRect();
  const size = Math.max(r.width, r.height);
  const rip = document.createElement('span');
  rip.className = 'rip';
  rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
  host.appendChild(rip);
  rip.addEventListener('animationend', () => rip.remove());
});

/* ----------------------------------------------------------------
   11. FAVOURITES
---------------------------------------------------------------- */
function toggleFav(id, sourceBtn) {
  const item = byId(id); if (!item) return;
  let on;
  if (state.favs.has(id)) { state.favs.delete(id); on = false; }
  else { state.favs.add(id); on = true; }
  save(LS.fav, [...state.favs]);
  // sync every fav button for this id
  $$(`[data-fav="${id}"]`).forEach(b => {
    b.classList.toggle('is-fav', on);
    b.setAttribute('aria-pressed', on);
    b.setAttribute('aria-label', `${on ? 'Remove from' : 'Add to'} favourites`);
  });
  $$('.modal__fav').forEach(b => { if (b.dataset.fav === id) b.classList.toggle('is-fav', on); });
  updateFavBadge();
  toast(on ? `${item.name} added to favourites` : `${item.name} removed`);
}
function updateFavBadge() {
  const badge = $('#favBadge');
  const n = state.favs.size;
  badge.textContent = n;
  badge.hidden = n === 0;
}

/* ----------------------------------------------------------------
   12. RECENTLY VIEWED
---------------------------------------------------------------- */
function pushRecent(id) {
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 10);
  save(LS.recent, state.recent);
  renderRecent();
}

/* ----------------------------------------------------------------
   13. ITEM MODAL
---------------------------------------------------------------- */
const modal = $('#itemModal');
const modalPanel = $('#modalPanel');
let lastFocused = null;

function openItem(id) {
  const it = byId(id); if (!it) return;
  pushRecent(id);
  lastFocused = document.activeElement;

  const pair = byId(it.pairing);
  const isFav = state.favs.has(id);
  const badges = it.badges.map(badgeHTML).join('');
  const allerg = it.allergens.length
    ? it.allergens.map(a => `<span class="allergen">${svg('check')}${a}</span>`).join('')
    : `<span class="allergen" style="border-color:#1c1c18;color:#1c1c18">${svg('check')}No major allergens</span>`;

  modalPanel.innerHTML = `
    <div class="modal__hero">
      <img src="${FALLBACK}" data-src="${it.img.replace('w=760','w=900')}" alt="${it.name}" width="900" height="563" />
      <button class="modal__close" id="modalClose" aria-label="Close details"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <div class="modal__body">
      <div class="modal__badges">${badges}</div>
      <h2 class="modal__title" id="modalTitle">${it.name}</h2>
      <div class="modal__price">${money(it.price)}</div>
      <p class="modal__desc">${it.desc}</p>

      <div class="modal__stats">
        <span class="stat-pill">${svg('clock')}${it.time} min prep</span>
        <span class="stat-pill">${svg('cal')}${it.cal} kcal</span>
        <span class="stat-pill">${svg('fire')}Spice ${it.spice}/3</span>
        <span class="stat-pill">${svg('check')}${it.diet.includes('halal') ? 'Halal' : it.diet[0] || 'Chef select'}</span>
      </div>

      <h3 class="modal__section-label">Crafted with</h3>
      <div class="ingredients">
        ${it.ingredients.map(g => `<span class="ingredient"><span class="ingredient__ico">${svg(g.icon)}</span><span>${g.name}</span></span>`).join('')}
      </div>

      <h3 class="modal__section-label">Allergens</h3>
      <div class="allergens">${allerg}</div>

      ${pair ? `
      <h3 class="modal__section-label">Perfect with</h3>
      <button class="pairing" data-id="${pair.id}">
        <img class="pairing__img" src="${FALLBACK}" data-src="${pair.img.replace('w=760','w=200')}" alt="" width="60" height="60" />
        <span>
          <span class="pairing__label">Sommelier pairs</span>
          <span class="pairing__name">${pair.name}</span>
          <span class="pairing__price">${money(pair.price)}</span>
        </span>
        <span class="pairing__go">${svg('arrow')}</span>
      </button>` : ''}

      <div class="modal__actions">
        <button class="btn btn--ghost ripple modal__fav ${isFav ? 'is-fav' : ''}" data-fav="${it.id}" aria-pressed="${isFav}">
          ${svg('heart')}<span>${isFav ? 'Saved' : 'Save'}</span>
        </button>
        <button class="btn btn--gold ripple" id="modalAdd" data-id="${it.id}">${svg('check')}Mark to order</button>
      </div>
    </div>`;

  hydrateImages(modalPanel);
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}

function closeItem() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { modal.hidden = true; modalPanel.innerHTML = ''; }, reduceMotion ? 0 : 320);
  lastFocused?.focus?.();
}

/* ----------------------------------------------------------------
   14. SEARCH + FILTER SHEET
---------------------------------------------------------------- */
const sheet = $('#searchSheet');
const scrim = $('#scrim');

const MEATS = [['beef','Steak'],['veg','Starters'],['sweet','Dessert'],['drink','Drinks']];
const SPICES = [['0','Mild'],['1','Light'],['2','Medium'],['3','Hot']];
const DIETS = [['halal','Halal'],['vegetarian','Vegetarian'],['vegan','Vegan'],['gluten-free','Gluten-free']];
const SORTS = [['pop','Most popular'],['new','Newest'],['price-asc','Price ↑'],['price-desc','Price ↓']];

function buildChips() {
  $('#meatChips').innerHTML = MEATS.map(([v, l]) => chip(v, l, state.meat.has(v))).join('');
  $('#spiceChips').innerHTML = SPICES.map(([v, l]) => chip(v, l, state.spice.has(v), v !== '0')).join('');
  $('#dietChips').innerHTML = DIETS.map(([v, l]) => chip(v, l, state.diet.has(v))).join('');
  $('#sortChips').innerHTML = SORTS.map(([v, l]) => chip(v, l, state.sort === v)).join('');
  const max = Math.max(...MENU.map(m => m.price));
  $('#priceRange').max = String(Math.ceil(max / 5) * 5);
  $('#priceRange').value = state.maxPrice = state.maxPrice > max ? Math.ceil(max / 5) * 5 : state.maxPrice;
  updatePriceUI();
}
function chip(v, l, on, dot) {
  return `<button class="chip ${on ? 'is-on' : ''}" data-val="${v}" aria-pressed="${on}">${dot ? '<span class="chip__dot"></span>' : ''}${l}</button>`;
}
function updatePriceUI() {
  const r = $('#priceRange');
  $('#priceVal').textContent = money(+r.value);
  const pct = (r.value / r.max) * 100;
  r.style.setProperty('--p', pct + '%');
}

function syncFilterFlag() {
  state.filtering = !!(state.q.trim() || state.meat.size || state.spice.size || state.diet.size
    || state.sort !== 'pop' || +$('#priceRange').value < +$('#priceRange').max);
}

function applyFilters() {
  syncFilterFlag();
  renderSections();
  const n = visibleItems().length;
  $('#applyCount').textContent = state.filtering ? `${n} dish${n === 1 ? '' : 'es'}` : 'all';
  // Hide featured strips when actively filtering to focus results
  const featuredFiltered = state.filtering;
  ['#chefPicks', '#bestSellers'].forEach(s => { const el = $(s); if (el) el.style.display = featuredFiltered ? 'none' : ''; });
  $('#specialCard').closest('.block').style.display = featuredFiltered ? 'none' : '';
}

function openSheet() {
  buildChips();
  scrim.hidden = false; sheet.hidden = false;
  requestAnimationFrame(() => { scrim.classList.add('is-open'); sheet.classList.add('is-open'); });
  document.body.style.overflow = 'hidden';
  $('#searchToggle').setAttribute('aria-expanded', 'true');
  setTimeout(() => $('#searchInput').focus(), 280);
}
function closeSheet() {
  scrim.classList.remove('is-open'); sheet.classList.remove('is-open');
  document.body.style.overflow = '';
  $('#searchToggle').setAttribute('aria-expanded', 'false');
  setTimeout(() => { scrim.hidden = true; sheet.hidden = true; }, reduceMotion ? 0 : 320);
}

function resetAll() {
  state.q = ''; state.meat.clear(); state.spice.clear(); state.diet.clear();
  state.sort = 'pop'; state.maxPrice = +$('#priceRange').max;
  $('#searchInput').value = ''; $('#searchClear').hidden = true;
  buildChips();
  applyFilters();
}

/* ----------------------------------------------------------------
   15. TOAST
---------------------------------------------------------------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.innerHTML = `${svg('check')}<span>${msg}</span>`;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add('is-show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove('is-show');
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2600);
}

/* ----------------------------------------------------------------
   16. HEADER / HERO / FAB SCROLL BEHAVIOUR
---------------------------------------------------------------- */
const header = $('#siteHeader');
const heroBg = $('#heroBg');
const progress = $('#scrollProgress');
const topFab = $('#topFab');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-stuck', y > 30);
  // hero parallax
  if (heroBg && !reduceMotion && y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.4}px) scale(1.05)`;
  // scroll progress
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  // back-to-top fab
  topFab.hidden = y < window.innerHeight * 0.8;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });

/* Carousel dot sync */
function bindCarouselDots() {
  const track = $('#chefTrack');
  const dots = $$('#chefDots i');
  if (!track || !dots.length) return;
  let raf;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / (track.scrollWidth / dots.length));
      dots.forEach((d, k) => d.classList.toggle('on', k === Math.min(i, dots.length - 1)));
      raf = null;
    });
  }, { passive: true });
}

/* ----------------------------------------------------------------
   17. GLOBAL EVENT DELEGATION
---------------------------------------------------------------- */
document.addEventListener('click', (e) => {
  // favourite buttons
  const fav = e.target.closest('[data-fav]');
  if (fav) { e.stopPropagation(); toggleFav(fav.dataset.fav, fav); return; }

  // open item (card / mini / special button / pairing / recent)
  const opener = e.target.closest('[data-id]');
  if (opener && !e.target.closest('.fav-btn')) {
    if (opener.id === 'modalAdd') { toast(`${byId(opener.dataset.id).name} marked to order`); return; }
    openItem(opener.dataset.id);
    return;
  }

  // smooth-scroll hero CTA
  const anchor = e.target.closest('[data-scroll]');
  if (anchor) {
    e.preventDefault();
    const el = document.querySelector(anchor.getAttribute('href'));
    el?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
});

// keyboard activation for cards (role=button)
sectionsEl.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) {
    e.preventDefault(); openItem(e.target.dataset.id);
  }
});

// Modal interactions (delegated to panel/scrim)
$('#modalScrim').addEventListener('click', closeItem);
modal.addEventListener('click', (e) => { if (e.target.closest('#modalClose')) closeItem(); });

// Sheet open/close
$('#searchToggle').addEventListener('click', openSheet);
$('#filterToggle').addEventListener('click', openSheet);
$('#searchFab').addEventListener('click', openSheet);
$('#sheetClose').addEventListener('click', closeSheet);
$('#scrim').addEventListener('click', closeSheet);
$('#applySheet').addEventListener('click', closeSheet);
$('#resetSheet').addEventListener('click', resetAll);
$('#clearFilters')?.addEventListener('click', resetAll);
$('#emptyReset').addEventListener('click', () => { resetAll(); });
$('#favFab').addEventListener('click', () => {
  if (!state.favs.size) { toast('No favourites yet — tap the heart on a dish'); return; }
  // filter to show only favourites by faking a search across fav names
  openSheet();
  toast(`${state.favs.size} favourite${state.favs.size === 1 ? '' : 's'} saved`);
});
$('#topFab').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// Live search (debounced)
let searchDebounce;
$('#searchInput').addEventListener('input', (e) => {
  state.q = e.target.value;
  $('#searchClear').hidden = !e.target.value;
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(applyFilters, 160);
});
$('#searchClear').addEventListener('click', () => {
  state.q = ''; $('#searchInput').value = ''; $('#searchClear').hidden = true;
  $('#searchInput').focus(); applyFilters();
});

// Chip toggles (delegated)
$('#searchSheet').addEventListener('click', (e) => {
  const c = e.target.closest('.chip'); if (!c) return;
  const v = c.dataset.val;
  const group = c.closest('.filter-group').querySelector('.filter-group__label').textContent;
  if (group.startsWith('Sort')) {
    state.sort = v;
    $$('#sortChips .chip').forEach(x => { x.classList.toggle('is-on', x === c); x.setAttribute('aria-pressed', x === c); });
  } else {
    const set = group.startsWith('Meat') ? state.meat : group.startsWith('Spice') ? state.spice : state.diet;
    if (set.has(v)) set.delete(v); else set.add(v);
    const on = set.has(v);
    c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on);
  }
  applyFilters();
});
$('#priceRange').addEventListener('input', (e) => {
  state.maxPrice = +e.target.value; updatePriceUI(); applyFilters();
});

// Escape closes overlays
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (modal.classList.contains('is-open')) closeItem();
  else if (sheet.classList.contains('is-open')) closeSheet();
});

// Re-place indicator on resize
let rsz;
window.addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(moveIndicator, 120); });

/* ----------------------------------------------------------------
   18. BOOT
---------------------------------------------------------------- */
function boot() {
  buildCatNav();
  renderFeatured();
  renderSections();
  renderRecent();
  updateFavBadge();
  bindCarouselDots();
  observeReveals(document);
  onScroll();

  // Preloader off + hero entrance + counters
  const finish = () => {
    $('#preloader').classList.add('is-done');
    animateCounters();
    $$('.hero .reveal').forEach(el => el.classList.add('is-in'));
  };
  if (document.readyState === 'complete') setTimeout(finish, 500);
  else window.addEventListener('load', () => setTimeout(finish, 450));
  // Safety net: never let the preloader hang
  setTimeout(finish, 2200);
}

boot();
