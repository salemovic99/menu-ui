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
  { id: 'signature',   label: 'Signature Steaks', icon: 'flame' },
  { id: 'tenderloin',  label: 'Tenderloin',       icon: 'cut' },
  { id: 'wagyu',       label: 'Wagyu',            icon: 'star' },
  { id: 'mains',       label: 'Main Meals',       icon: 'plate' },
  { id: 'appetizers',  label: 'Appetizers',       icon: 'leaf' },
  { id: 'desserts',    label: 'Desserts',         icon: 'cake' },
  { id: 'hot-drinks',  label: 'Hot Drinks',       icon: 'coffee' },
  { id: 'cold-drinks', label: 'Cold Drinks',      icon: 'glass' },
  { id: 'soft-drinks', label: 'Soft Drinks',      icon: 'soda' },
  { id: 'water',       label: 'Water',            icon: 'drop' },
];

// Unsplash helper — stable photo IDs, auto format/crop, low-bandwidth quality.
const ph = (id, w = 760) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const FALLBACK = 'assets/images/placeholder.svg';

// Convenience builders for ingredient + allergen tags
const ing = (name, icon) => ({ name, icon });

const MENU = [
  /* ---- Signature Steaks ---- */
  { id:'s1', cat:'signature', name:'Entrecôte Royale', price:64, meat:'beef', spice:1, time:25, cal:780,
    desc:'Our namesake bone-in ribeye, 28-day dry-aged, seared over almond-wood and finished with maître d’ butter.',
    img:ph('1546964124-0cce460f38ef'), pop:99, added:'2025-12-01',
    badges:['popular','chef','premium','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Ribeye','beef'),ing('Maître Butter','butter'),ing('Thyme','herb'),ing('Sea Salt','salt')],
    allergens:['Dairy'], pairing:'cd2' },
  { id:'s2', cat:'signature', name:'Porterhouse for Two', price:98, meat:'beef', spice:0, time:32, cal:1240,
    desc:'A grand 900g porterhouse carved tableside, served with bone-marrow jus and charred shallots.',
    img:ph('1558030006-450675393462'), pop:88, added:'2025-10-12',
    badges:['chef','premium','halal'], diet:['halal'],
    ingredients:[ing('Porterhouse','beef'),ing('Bone Marrow','marrow'),ing('Shallot','onion'),ing('Pepper','pepper')],
    allergens:[], pairing:'cd1' },
  { id:'s3', cat:'signature', name:'Tomahawk Smoked', price:120, meat:'beef', spice:2, time:38, cal:1480,
    desc:'Theatrical long-bone tomahawk, hickory-smoked and basted in spiced chimichurri.',
    img:ph('1600891964599-f61ba0e24092'), pop:84, added:'2026-05-20',
    badges:['new','limited','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Tomahawk','beef'),ing('Chimichurri','herb'),ing('Chili','chili'),ing('Garlic','garlic')],
    allergens:[], pairing:'cd3' },
  { id:'s4', cat:'signature', name:'Sirloin au Poivre', price:58, meat:'beef', spice:2, time:24, cal:690,
    desc:'Classic peppercorn-crusted sirloin flamed in cognac cream.',
    img:ph('1588168333986-5078d3ae3976'), pop:79, added:'2025-09-02',
    badges:['popular','halal'], diet:['halal'],
    ingredients:[ing('Sirloin','beef'),ing('Peppercorn','pepper'),ing('Cream','butter'),ing('Cognac','wine')],
    allergens:['Dairy','Alcohol'], pairing:'hd1' },

  /* ---- Tenderloin ---- */
  { id:'t1', cat:'tenderloin', name:'Filet Mignon Classic', price:72, meat:'beef', spice:0, time:22, cal:560,
    desc:'Centre-cut tenderloin, butter-poached to a velvet medium-rare, red-wine reduction.',
    img:ph('1432139509613-5c4255815697'), pop:95, added:'2025-08-15',
    badges:['popular','chef','premium','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Tenderloin','beef'),ing('Red Wine','wine'),ing('Butter','butter'),ing('Rosemary','herb')],
    allergens:['Dairy','Alcohol'], pairing:'cd1' },
  { id:'t2', cat:'tenderloin', name:'Beef Wellington Petit', price:84, meat:'beef', spice:1, time:35, cal:910,
    desc:'Tenderloin in mushroom duxelles and golden puff pastry, truffle jus.',
    img:ph('1432139555190-58524dae6a55'), pop:82, added:'2026-02-10',
    badges:['chef','new','halal'], diet:['halal'],
    ingredients:[ing('Tenderloin','beef'),ing('Mushroom','mushroom'),ing('Truffle','mushroom'),ing('Pastry','wheat')],
    allergens:['Gluten','Egg'], pairing:'hd1' },
  { id:'t3', cat:'tenderloin', name:'Châteaubriand', price:110, meat:'beef', spice:0, time:34, cal:1020,
    desc:'The prized heart of the fillet for two, béarnaise and pommes purée.',
    img:ph('1504973960431-1c467e159aa4'), pop:77, added:'2025-11-05',
    badges:['premium','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Fillet Heart','beef'),ing('Béarnaise','butter'),ing('Tarragon','herb'),ing('Potato','potato')],
    allergens:['Dairy','Egg'], pairing:'cd2' },

  /* ---- Wagyu ---- */
  { id:'w1', cat:'wagyu', name:'A5 Wagyu Ribeye', price:185, meat:'beef', spice:0, time:18, cal:820,
    desc:'Authentic Japanese A5, marbled like silk, seared on hot stone with yuzu salt.',
    img:ph('1544025162-d76694265947'), pop:97, added:'2026-04-01',
    badges:['chef','premium','limited','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('A5 Wagyu','beef'),ing('Yuzu Salt','salt'),ing('Wasabi','chili'),ing('Scallion','onion')],
    allergens:[], pairing:'hd2' },
  { id:'w2', cat:'wagyu', name:'Wagyu Truffle Sliders', price:46, meat:'beef', spice:1, time:20, cal:640,
    desc:'Three brioche sliders of minced wagyu, truffle aioli and aged gouda.',
    img:ph('1568901346375-23c9450c58cd'), pop:90, added:'2026-03-18',
    badges:['popular','new','halal'], diet:['halal'],
    ingredients:[ing('Wagyu','beef'),ing('Truffle','mushroom'),ing('Gouda','cheese'),ing('Brioche','wheat')],
    allergens:['Gluten','Dairy','Egg'], pairing:'sd1' },
  { id:'w3', cat:'wagyu', name:'Wagyu Tataki', price:68, meat:'beef', spice:1, time:15, cal:380,
    desc:'Lightly torched wagyu, ponzu pearls, crispy garlic and micro-herbs.',
    img:ph('1535007813616-79dc02ba4021'), pop:74, added:'2026-01-22',
    badges:['chef','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Wagyu','beef'),ing('Ponzu','citrus'),ing('Garlic','garlic'),ing('Micro Herb','herb')],
    allergens:['Soy'], pairing:'cd3' },

  /* ---- Main Meals ---- */
  { id:'m1', cat:'mains', name:'Herb Roast Chicken', price:38, meat:'chicken', spice:0, time:28, cal:620,
    desc:'Free-range half chicken, lemon-thyme butter, confit potatoes.',
    img:ph('1598103442097-8b74394b95c6'), pop:80, added:'2025-07-19',
    badges:['popular','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Chicken','chicken'),ing('Lemon','citrus'),ing('Thyme','herb'),ing('Potato','potato')],
    allergens:['Dairy'], pairing:'cd2' },
  { id:'m2', cat:'mains', name:'Grilled Sea Bass', price:52, meat:'seafood', spice:1, time:24, cal:480,
    desc:'Whole Mediterranean sea bass, fennel, caper-brown-butter.',
    img:ph('1519708227418-c8fd9a32b7a2'), pop:76, added:'2025-11-28',
    badges:['chef','halal'], diet:['halal','gluten-free'],
    ingredients:[ing('Sea Bass','fish'),ing('Fennel','herb'),ing('Caper','herb'),ing('Lemon','citrus')],
    allergens:['Fish','Dairy'], pairing:'cd3' },
  { id:'m3', cat:'mains', name:'Lamb Rack Provençal', price:66, meat:'lamb', spice:2, time:30, cal:760,
    desc:'Herb-crusted rack of lamb, ratatouille and rosemary jus.',
    img:ph('1606851091851-e8c8c0fca5ba'), pop:78, added:'2026-02-25',
    badges:['premium','new','halal'], diet:['halal'],
    ingredients:[ing('Lamb','lamb'),ing('Herb Crust','herb'),ing('Tomato','tomato'),ing('Garlic','garlic')],
    allergens:['Gluten'], pairing:'cd1' },
  { id:'m4', cat:'mains', name:'Wild Mushroom Risotto', price:34, meat:'veg', spice:0, time:26, cal:540,
    desc:'Carnaroli rice, porcini, truffle oil, aged parmesan.',
    img:ph('1476124369491-e7addf5db371'), pop:70, added:'2025-09-30',
    badges:['halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Risotto Rice','rice'),ing('Porcini','mushroom'),ing('Truffle','mushroom'),ing('Parmesan','cheese')],
    allergens:['Dairy'], pairing:'cd1' },

  /* ---- Appetizers ---- */
  { id:'a1', cat:'appetizers', name:'Steak Tartare', price:28, meat:'beef', spice:1, time:12, cal:320,
    desc:'Hand-cut prime beef, quail yolk, capers, toasted sourdough.',
    img:ph('1432139555190-58524dae6a55'), pop:85, added:'2025-08-08',
    badges:['chef','halal'], diet:['halal'],
    ingredients:[ing('Beef','beef'),ing('Quail Egg','egg'),ing('Caper','herb'),ing('Sourdough','wheat')],
    allergens:['Egg','Gluten'], pairing:'cd1' },
  { id:'a2', cat:'appetizers', name:'Burrata & Heirloom', price:22, meat:'veg', spice:0, time:8, cal:290,
    desc:'Creamy burrata, heirloom tomato, basil oil, aged balsamic.',
    img:ph('1546069901-ba9599a7e63c'), pop:81, added:'2026-03-01',
    badges:['popular','new','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Burrata','cheese'),ing('Tomato','tomato'),ing('Basil','herb'),ing('Balsamic','wine')],
    allergens:['Dairy'], pairing:'cd3' },
  { id:'a3', cat:'appetizers', name:'Truffle Fries', price:16, meat:'veg', spice:0, time:10, cal:430,
    desc:'Triple-cooked fries, truffle, parmesan, garlic aioli.',
    img:ph('1573080496219-bb080dd4f877'), pop:92, added:'2025-06-14',
    badges:['popular','halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Potato','potato'),ing('Truffle','mushroom'),ing('Parmesan','cheese'),ing('Garlic','garlic')],
    allergens:['Dairy','Egg'], pairing:'sd1' },
  { id:'a4', cat:'appetizers', name:'Roasted Pumpkin Soup', price:18, meat:'veg', spice:1, time:14, cal:240,
    desc:'Velvet pumpkin, toasted seeds, sage cream — seasonal special.',
    img:ph('1547592180-85f173990554'), pop:64, added:'2026-05-30',
    badges:['new','limited','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Pumpkin','pumpkin'),ing('Sage','herb'),ing('Cream','butter'),ing('Seeds','seed')],
    allergens:['Dairy'], pairing:'hd2' },

  /* ---- Desserts ---- */
  { id:'d1', cat:'desserts', name:'Molten Gold Fondant', price:18, meat:'none', spice:0, time:16, cal:520,
    desc:'Dark chocolate fondant, 24k gold leaf, salted caramel core.',
    img:ph('1551024601-bec78aea704b'), pop:93, added:'2026-04-12',
    badges:['popular','chef','premium','halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Chocolate','choc'),ing('Caramel','caramel'),ing('Gold Leaf','star'),ing('Cream','butter')],
    allergens:['Dairy','Egg','Gluten'], pairing:'hd1' },
  { id:'d2', cat:'desserts', name:'Crème Brûlée', price:14, meat:'none', spice:0, time:10, cal:360,
    desc:'Tahitian vanilla custard, torched caramel crust.',
    img:ph('1470124182917-cc6e71b22ecc'), pop:86, added:'2025-10-01',
    badges:['popular','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Vanilla','vanilla'),ing('Custard','egg'),ing('Caramel','caramel'),ing('Cream','butter')],
    allergens:['Dairy','Egg'], pairing:'hd2' },
  { id:'d3', cat:'desserts', name:'Pistachio Basque Cake', price:16, meat:'none', spice:0, time:12, cal:410,
    desc:'Burnt Basque cheesecake swirled with Sicilian pistachio.',
    img:ph('1565958011703-44f9829ba187'), pop:72, added:'2026-03-22',
    badges:['new','halal'], diet:['halal','vegetarian'],
    ingredients:[ing('Pistachio','seed'),ing('Cream Cheese','cheese'),ing('Egg','egg'),ing('Sugar','sugar')],
    allergens:['Dairy','Egg','Nuts'], pairing:'hd1' },

  /* ---- Hot Drinks ---- */
  { id:'hd1', cat:'hot-drinks', name:'Single-Origin Espresso', price:6, meat:'none', spice:0, time:3, cal:5,
    desc:'Ethiopian Yirgacheffe, bright citrus, velvet crema.',
    img:ph('1509042239860-f550ce710b93'), pop:88, added:'2025-05-01',
    badges:['popular','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Espresso','coffee'),ing('Crema','coffee')],
    allergens:[], pairing:'d2' },
  { id:'hd2', cat:'hot-drinks', name:'Saffron Cardamom Latte', price:9, meat:'none', spice:0, time:5, cal:160,
    desc:'Steamed milk, saffron, cardamom, a thread of honey.',
    img:ph('1541167760496-1628856ab772'), pop:75, added:'2026-04-20',
    badges:['new','chef','halal'], diet:['halal','vegetarian','gluten-free'],
    ingredients:[ing('Espresso','coffee'),ing('Saffron','herb'),ing('Cardamom','seed'),ing('Honey','honey')],
    allergens:['Dairy'], pairing:'d3' },
  { id:'hd3', cat:'hot-drinks', name:'Moroccan Mint Tea', price:7, meat:'none', spice:0, time:5, cal:40,
    desc:'Gunpowder green tea, fresh mint, poured from height.',
    img:ph('1576092768241-dec231879fc3'), pop:66, added:'2025-12-12',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Green Tea','herb'),ing('Mint','herb'),ing('Sugar','sugar')],
    allergens:[], pairing:'d3' },

  /* ---- Cold Drinks ---- */
  { id:'cd1', cat:'cold-drinks', name:'Velvet Cold Brew', price:8, meat:'none', spice:0, time:3, cal:25,
    desc:'18-hour cold brew over a single clear ice diamond.',
    img:ph('1461023058943-07fcbe16d735'), pop:84, added:'2025-07-07',
    badges:['popular','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Cold Brew','coffee'),ing('Ice','drop')],
    allergens:[], pairing:'d1' },
  { id:'cd2', cat:'cold-drinks', name:'Pomegranate Cooler', price:9, meat:'none', spice:0, time:4, cal:120,
    desc:'Fresh pomegranate, lime, rose water, sparkling finish.',
    img:ph('1621263764928-df1444c5e859'), pop:78, added:'2026-05-05',
    badges:['new','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Pomegranate','tomato'),ing('Lime','citrus'),ing('Rose','herb'),ing('Soda','drop')],
    allergens:[], pairing:'s1' },
  { id:'cd3', cat:'cold-drinks', name:'Iced Matcha Cloud', price:10, meat:'none', spice:0, time:4, cal:150,
    desc:'Ceremonial matcha, oat milk, vanilla cloud foam.',
    img:ph('1515823064-d6e0c04616a7'), pop:71, added:'2026-02-02',
    badges:['chef','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Matcha','herb'),ing('Oat Milk','drop'),ing('Vanilla','vanilla')],
    allergens:['Oats'], pairing:'d3' },

  /* ---- Soft Drinks ---- */
  { id:'sd1', cat:'soft-drinks', name:'House Cola', price:5, meat:'none', spice:0, time:1, cal:140,
    desc:'Small-batch cola, spiced bark, citrus oils.',
    img:ph('1581636625402-29b2a704ef13'), pop:69, added:'2025-06-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Cola','soda'),ing('Citrus','citrus'),ing('Spice','pepper')],
    allergens:[], pairing:'a3' },
  { id:'sd2', cat:'soft-drinks', name:'Ginger Berry Fizz', price:6, meat:'none', spice:1, time:2, cal:110,
    desc:'Sparkling ginger, wild berries, a hint of chili.',
    img:ph('1437418747212-8d9709afab22'), pop:73, added:'2026-01-10',
    badges:['new','halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Ginger','herb'),ing('Berry','tomato'),ing('Chili','chili'),ing('Soda','drop')],
    allergens:[], pairing:'w2' },

  /* ---- Water ---- */
  { id:'wt1', cat:'water', name:'Alpine Still', price:4, meat:'none', spice:0, time:1, cal:0,
    desc:'Naturally filtered alpine spring water, chilled.',
    img:ph('1559839734-2b71ea197ec2'), pop:60, added:'2025-05-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Spring Water','drop')], allergens:[], pairing:'s1' },
  { id:'wt2', cat:'water', name:'Sparkling Mineral', price:5, meat:'none', spice:0, time:1, cal:0,
    desc:'Natural sparkling mineral water, fine perlage.',
    img:ph('1610631066894-62452ccb927c'), pop:58, added:'2025-05-01',
    badges:['halal'], diet:['halal','vegan','gluten-free'],
    ingredients:[ing('Mineral Water','drop'),ing('Bubbles','drop')], allergens:[], pairing:'w1' },
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
  maxPrice: 200,
  sort: 'pop',
  filtering: false,
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => '$' + n.toFixed(0);
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
  const sp = MENU.find(m => m.id === 'w1');
  $('#specialCard').innerHTML = `
    <div class="special__bg" style="background-image:url('${sp.img.replace('w=760','w=1100')}')"></div>
    <span class="special__tag">${svg('star')}Today's Special</span>
    <h3 class="special__title">${sp.name}</h3>
    <p class="special__desc">${sp.desc}</p>
    <div class="special__row">
      <span class="special__price"><del>$210</del>${money(sp.price)}</span>
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

const MEATS = [['beef','Beef'],['chicken','Chicken'],['lamb','Lamb'],['seafood','Seafood'],['veg','Vegetarian'],['none','Drinks']];
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
