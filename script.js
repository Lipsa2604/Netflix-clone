// ============================================================
//  script.js  —  Netflix Clone main app logic
//  Features: genre filter tabs, progress bars, hover trailer
//            preview, download badges, watch history tracking
// ============================================================

// ---------- Movie data with genres + download flag ----------
const ALL_MOVIES = [
  { title:"Avengers: Endgame",        poster:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",   videoId:"hA6hldpSTF8",   genres:["Action","Sci-Fi"],      downloaded:false, mood:["epic","superhero","adventure","exciting"] },
  { title:"The Dark Knight",          poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",   videoId:"EXeTwQWrcwY",   genres:["Action","Thriller"],    downloaded:true,  mood:["dark","intense","psychological","gritty"] },
  { title:"Interstellar",             poster:"https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",   videoId:"zSWdZVtXT7E",   genres:["Sci-Fi","Drama"],       downloaded:false, mood:["emotional","thought-provoking","beautiful","cry"] },
  { title:"Spider-Man: No Way Home",  poster:"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",   videoId:"JfVOs4VSpmA",   genres:["Action","Sci-Fi"],      downloaded:false, mood:["fun","superhero","exciting","adventure"] },
  { title:"Black Panther",            poster:"https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",   videoId:"xjDjIWPwcPU",   genres:["Action"],               downloaded:true,  mood:["epic","superhero","exciting","adventure"] },
  { title:"Inception",                poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",   videoId:"YoHD9XEInc0",   genres:["Thriller","Sci-Fi"],    downloaded:false, mood:["mind-bending","psychological","thrilling"] },
  { title:"Inglourious Basterds",     poster:"https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg", videoId:"KnrRy6kSFF0", genres:["Action","Drama"], downloaded:false, mood:["dark","intense","gritty"] },
  { title:"Finding Nemo",             poster:"https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",                videoId:"2zLkasScy7A",  genres:["Animation","Kids"],  downloaded:true,  mood:["family-friendly","adventure","heartwarming"] },
  { title:"Frozen",                   poster:"https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg",videoId:"TbQm5doF_Uc",  genres:["Animation","Kids"],  downloaded:true,  mood:["family-friendly","fun","musical"] },
  { title:"The Prestige",             poster:"https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg",             videoId:"ijXruSzfGEc",  genres:["Thriller","Drama"],  downloaded:false, mood:["mind-bending","psychological","mystery"] },
  { title:"Forrest Gump",             poster:"https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",         videoId:"bLvqoHBptjg",  genres:["Drama"],             downloaded:false, mood:["emotional","inspiring","heartwarming","cry","moving"] },
  { title:"La La Land",               poster:"https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",       videoId:"0pdqf4P9MB8",  genres:["Romance","Drama"],   downloaded:true,  mood:["romantic","beautiful","emotional","cry","dreamy"] },
  { title:"Joker",                    poster:"https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",videoId:"zAGVQLHvwOY",  genres:["Thriller","Drama"],  downloaded:false, mood:["dark","psychological","intense","sad"] },
  { title:"The Matrix",               poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",   videoId:"m8e-FF8MsqU",   genres:["Action","Sci-Fi"],      downloaded:false, mood:["mind-bending","cool","exciting","adventure"] },
  { title:"The Avengers",             poster:"https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",    videoId:"eOrNdBpGMv8",   genres:["Action","Sci-Fi"],      downloaded:false, mood:["fun","superhero","exciting","epic","adventure"] },
  { title:"Mad Max: Fury Road",       poster:"https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",   videoId:"hEJnMQG9ev8",   genres:["Action"],               downloaded:false, mood:["adrenaline","intense","exciting","adventure"] },
  { title:"John Wick",                poster:"https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",   videoId:"2AUmvWm5ZDQ",   genres:["Action","Thriller"],    downloaded:true,  mood:["adrenaline","intense","exciting","cool"] },
  { title:"The Lion King",            poster:"https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",        videoId:"7TavVZMewpY",  genres:["Animation","Kids"],  downloaded:false, mood:["emotional","family-friendly","classic","cry","moving"] },
  { title:"The Shawshank Redemption", poster:"https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",videoId:"6hB3S9bIaco", genres:["Drama"],            downloaded:false, mood:["inspiring","emotional","hope","moving","cry"] },
  { title:"Guardians of the Galaxy Vol. 2", poster:"https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg", videoId:"dW1BIid8Osg", genres:["Action","Sci-Fi"],    downloaded:false, mood:["fun","funny","adventure","exciting"] },
  { title:"Doctor Strange in the Multiverse of Madness", poster:"https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", videoId:"aWzlQ2N6qqg", genres:["Action","Sci-Fi"], downloaded:false, mood:["dark","scary","exciting","adventure"] },
  { title:"Eternal Sunshine",         poster:"https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",   videoId:"gHCzXHCJN9M",   genres:["Romance","Drama"],      downloaded:false, mood:["emotional","romantic","sad","beautiful","cry"] },
  { title:"Get Out",                  poster:"https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",   videoId:"DzfpyUB60YY",   genres:["Thriller","Horror"],    downloaded:false, mood:["dark","psychological","scary","intense"] },
  { title:"Knives Out",               poster:"https://image.tmdb.org/t/p/w500/pThyQovXQrws2Q07WV2B5K0HBsW.jpg",   videoId:"qGqiHJTsRkQ",   genres:["Thriller","Comedy"],    downloaded:true,  mood:["fun","mystery","witty","clever"] },
];

const ROWS_CONFIG = [
  { title:"Trending Now",        filter: m => m.genres.includes("Action") || m.genres.includes("Sci-Fi") },
  { title:"Top Rated",           filter: m => m.genres.includes("Drama")  || m.genres.includes("Thriller") },
  { title:"🔥 Feeling Adventurous?", filter: m => m.mood && m.mood.some(t => ["adventure","exciting","adrenaline","epic"].includes(t)) },
  { title:"😢 Need a Good Cry?",  filter: m => m.mood && m.mood.some(t => ["cry","emotional","moving","sad"].includes(t)) },
  { title:"Continue Watching",   filter: m => true, limit: 8 },
];

// ---------- Genre tabs ----------
const GENRES = ["All","Action","Drama","Thriller","Sci-Fi","Animation","Romance","Comedy","Horror","Kids"];

// ---------- Session ----------
const _session = JSON.parse(localStorage.getItem('nf_session') || sessionStorage.getItem('nf_session') || 'null');

// ---------- Watch history helpers ----------
function getHistory() {
  if (!_session) return [];
  return JSON.parse(localStorage.getItem(profileKey('nf_history')) || '[]');
}
function getHistoryProgress(title) {
  const h = getHistory().find(x => x.title === title);
  return h ? h.progress : null;
}
function saveToHistory(movie) {
  if (!_session) return;
  const key = profileKey('nf_history');
  let history = JSON.parse(localStorage.getItem(key) || '[]');
  history = history.filter(h => h.title !== movie.title);
  history.unshift({
    title: movie.title,
    poster: movie.poster,
    progress: Math.floor(Math.random() * 60) + 20,
    watchedOn: 'Just now',
    watchedAt: new Date().toISOString()
  });
  history = history.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(history));
}

// ---------- Download toggle ----------
function isDownloaded(title) {
  const dl = JSON.parse(localStorage.getItem(profileKey('nf_downloads')) || '[]');
  return dl.includes(title);
}
function toggleDownload(title) {
  const key = profileKey('nf_downloads');
  let dl = JSON.parse(localStorage.getItem(key) || '[]');
  if (dl.includes(title)) { dl = dl.filter(t => t !== title); }
  else { dl.push(title); }
  localStorage.setItem(key, JSON.stringify(dl));
}

// ---------- SKELETON LOADING ----------
function buildSkeletonRows() {
  const container = document.getElementById('rowsContainer');
  container.innerHTML = '';
  ['Trending Now', 'Top Rated', 'Continue Watching'].forEach(title => {
    const section = document.createElement('section');
    section.className = 'row';
    section.innerHTML = `
      <div class="row-header"><div class="row-title skeleton" style="width:160px;height:18px;border-radius:4px;">&nbsp;</div></div>
      <div class="track-wrap">
        <div class="track" style="gap:12px;padding:10px 2px;">
          ${Array(7).fill(`
            <div style="flex-shrink:0;width:150px;">
              <div class="skeleton" style="width:150px;height:225px;border-radius:8px;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(section);
  });
}

// ---------- TTS: speak movie synopsis on hover ----------
const MOVIE_SYNOPSES = {
  "Avengers: Endgame":       "Avengers Endgame. The Avengers assemble one final time to undo Thanos and restore the universe.",
  "The Dark Knight":         "The Dark Knight. Batman faces his greatest test as the Joker unleashes chaos across Gotham City.",
  "Interstellar":            "Interstellar. A team of astronauts travels through a wormhole in search of a new home for humanity.",
  "Inception":               "Inception. A thief who enters dreams is tasked with planting an idea inside a target's mind.",
  "Spider-Man: No Way Home": "Spider-Man No Way Home. Peter Parker's secret identity is revealed, unleashing chaos across the multiverse.",
  "Black Panther":           "Black Panther. T'Challa returns to Wakanda to claim the throne but faces a powerful challenger.",
  "The Matrix":              "The Matrix. A programmer discovers reality is a simulation and joins the fight to free humanity.",
  "The Avengers":            "The Avengers. Earth's mightiest heroes unite to stop Loki and his alien army from conquering the world.",
  "Joker":                   "Joker. A failed comedian descends into madness and becomes Gotham's most iconic criminal.",
  "Forrest Gump":            "Forrest Gump. A kind-hearted man from Alabama witnesses and shapes decades of American history.",
  "La La Land":              "La La Land. A jazz pianist and an actress fall in love in Los Angeles while chasing their dreams.",
  "The Prestige":            "The Prestige. Two rival magicians obsessively try to outdo each other with increasingly dangerous illusions.",
  "The Shawshank Redemption":"The Shawshank Redemption. An innocent man survives years in prison through friendship, hope, and quiet resistance.",
  "Finding Nemo":            "Finding Nemo. An overprotective clownfish crosses the ocean to rescue his son, helped by a forgetful fish named Dory.",
  "Frozen":                  "Frozen. Princess Anna embarks on a quest to find her sister Elsa, whose icy powers have frozen the kingdom.",
  "The Lion King":           "The Lion King. A young lion prince is exiled after his uncle murders his father, and must return to reclaim his throne.",
  "Mad Max: Fury Road":      "Mad Max Fury Road. In a post-apocalyptic wasteland, a group of women make a daring escape from a warlord.",
  "John Wick":               "John Wick. A retired hitman seeks brutal revenge after gangsters kill his dog, a final gift from his late wife.",
  "Inglourious Basterds":    "Inglourious Basterds. A group of Jewish soldiers plots to assassinate Nazi leaders in occupied France.",
  "Guardians of the Galaxy Vol. 2": "Guardians of the Galaxy Volume Two. Star-Lord discovers the truth about his father while the Guardians fight to stay together.",
  "Doctor Strange in the Multiverse of Madness": "Doctor Strange in the Multiverse of Madness. Strange must protect a girl who can travel between universes from a terrifying enemy.",
  "Eternal Sunshine":        "Eternal Sunshine of the Spotless Mind. A couple erases each other from their memories, only to find themselves drawn back together.",
  "Get Out":                 "Get Out. A young man visits his girlfriend's family and uncovers a terrifying secret lurking beneath their friendly facade.",
  "Knives Out":              "Knives Out. When a wealthy crime novelist is found dead, a sharp detective unravels a web of family lies and hidden motives.",
};

let ttsEnabled = localStorage.getItem('nf_tts_enabled') !== 'false'; // default ON

// Keep in sync if changed on mood.html
window.addEventListener('storage', e => {
  if (e.key === 'nf_tts_enabled') ttsEnabled = e.newValue !== 'false';
});
let currentUtterance = null;

function speakSynopsis(title) {
  if (!ttsEnabled) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = MOVIE_SYNOPSES[title] || title;
  const utt  = new SpeechSynthesisUtterance(text);
  utt.rate   = 0.92;
  utt.pitch  = 1;
  utt.volume = 0.85;
  // Pick a good voice if available
  const voices = window.speechSynthesis.getVoices();
  const pref   = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
               || voices.find(v => v.lang.startsWith('en') && !v.name.includes('Microsoft'))
               || voices.find(v => v.lang.startsWith('en'))
               || voices[0];
  if (pref) utt.voice = pref;
  currentUtterance = utt;
  window.speechSynthesis.speak(utt);
}

function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  currentUtterance = null;
}

// ---------- Build a poster card ----------
let hoverTimer = null;
let previewActive = null;

function buildPosterCard(movie) {
  const progress = getHistoryProgress(movie.title);
  const downloaded = isDownloaded(movie.title);

  const wrap = document.createElement('div');
  wrap.className = 'poster-wrap';
  wrap.style.cssText = 'position:relative;flex-shrink:0;width:150px;';

  // Badge row (download + new)
  const badges = document.createElement('div');
  badges.className = 'poster-badges';
  badges.style.cssText = 'position:absolute;top:6px;left:6px;right:6px;display:flex;gap:5px;z-index:4;pointer-events:none;';

  if (downloaded) {
    const dlBadge = document.createElement('div');
    dlBadge.style.cssText = 'background:rgba(34,197,94,0.9);color:#fff;border-radius:4px;padding:2px 7px;font-size:0.62rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:3px;';
    dlBadge.innerHTML = '⬇ Downloaded';
    badges.appendChild(dlBadge);
  }

  wrap.appendChild(badges);

  // Actual poster img
  const img = document.createElement('img');
  img.className = 'poster';
  img.src = movie.poster;
  img.alt = movie.title;
  img.dataset.title = movie.title;
  img.dataset.video = movie.videoId;
  img.style.width = '150px';
  wrap.appendChild(img);

  // Progress bar (if watched)
  if (progress !== null) {
    const barWrap = document.createElement('div');
    barWrap.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:4px;background:rgba(255,255,255,0.2);border-radius:0 0 8px 8px;overflow:hidden;z-index:3;';
    const barFill = document.createElement('div');
    barFill.style.cssText = `height:100%;background:#e50914;width:${progress}%;border-radius:0 0 0 8px;transition:width .3s;`;
    barWrap.appendChild(barFill);
    wrap.appendChild(barWrap);
  }

  // Hover card overlay (title + action buttons)
  const hoverCard = document.createElement('div');
  hoverCard.className = 'poster-hover-card';
  hoverCard.style.cssText = `
    position:absolute;bottom:0;left:0;right:0;
    background:linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.7) 60%,transparent 100%);
    padding:8px 8px 10px;
    border-radius:0 0 8px 8px;
    opacity:0;transition:opacity .18s;
    z-index:5;pointer-events:none;
  `;
  hoverCard.innerHTML = `
    <div style="font-size:0.72rem;font-weight:600;margin-bottom:6px;line-height:1.2;">${movie.title}</div>
    <div style="display:flex;gap:5px;">
      <button class="hc-play" data-video="${movie.videoId}" data-title="${movie.title}" data-poster="${movie.poster}"
        style="flex:1;padding:5px 4px;background:#fff;color:#000;border:none;border-radius:4px;font-size:0.65rem;font-weight:700;cursor:pointer;">▶ Play</button>
      <button class="hc-info" data-title="${movie.title}"
        style="padding:5px 6px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;font-size:0.65rem;cursor:pointer;"
        title="More Info">ⓘ</button>
      <button class="hc-tts" data-title="${movie.title}"
        style="padding:5px 6px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;font-size:0.65rem;cursor:pointer;"
        title="Read synopsis aloud">🔊</button>
      <button class="hc-share" data-title="${movie.title}"
        style="padding:5px 6px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;font-size:0.65rem;cursor:pointer;"
        title="Share">⬆</button>
      <button class="hc-dl" data-title="${movie.title}"
        style="padding:5px 6px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;font-size:0.65rem;cursor:pointer;white-space:nowrap;"
        title="${downloaded ? 'Remove download' : 'Download'}">
        ${downloaded ? '✓⬇' : '⬇'}
      </button>
    </div>
  `;
  wrap.appendChild(hoverCard);

  // Hover preview iframe (lazy — only injected after delay)
  let previewIframe = null;

  wrap.addEventListener('mouseenter', () => {
    hoverCard.style.opacity = '1';
    hoverCard.style.pointerEvents = 'auto';
    img.style.transform = 'translateY(-8px) scale(1.06)';

    // TTS: speak synopsis after short hover delay (2s)
    hoverTimer = setTimeout(() => {
      speakSynopsis(movie.title);
      // Also start trailer preview
      if (!previewIframe) {
        previewIframe = document.createElement('iframe');
        previewIframe.src = `https://www.youtube.com/embed/${movie.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.videoId}&modestbranding=1&rel=0`;
        previewIframe.allow = 'autoplay';
        previewIframe.style.cssText = `position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;z-index:2;object-fit:cover;`;
        wrap.insertBefore(previewIframe, img);
        img.style.opacity = '0';
      }
    }, 1800);
  });

  wrap.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
    stopSpeaking();
    hoverCard.style.opacity = '0';
    hoverCard.style.pointerEvents = 'none';
    img.style.transform = '';
    if (previewIframe) {
      previewIframe.remove();
      previewIframe = null;
      img.style.opacity = '1';
    }
  });

  // Play button inside hover card
  hoverCard.querySelector('.hc-play').addEventListener('click', (e) => {
    e.stopPropagation();
    openTrailer(movie.videoId, movie.title, movie.poster);
  });

  // TTS button — click to speak/stop
  hoverCard.querySelector('.hc-tts').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    if (window.speechSynthesis?.speaking) {
      stopSpeaking();
      btn.textContent = '🔊';
    } else {
      speakSynopsis(movie.title);
      btn.textContent = '🔇';
      // Reset icon when speech ends
      if (currentUtterance) {
        currentUtterance.onend = () => { btn.textContent = '🔊'; };
      }
    }
  });

  // More Info button
  hoverCard.querySelector('.hc-info').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = `movie.html?title=${encodeURIComponent(movie.title)}`;
  });

  // Share button
  hoverCard.querySelector('.hc-share').addEventListener('click', (e) => {
    e.stopPropagation();
    shareMovie(movie);
  });

  // Download button inside hover card
  hoverCard.querySelector('.hc-dl').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDownload(movie.title);
    // Rebuild this card in place
    const newCard = buildPosterCard(movie);
    wrap.parentNode.replaceChild(newCard, wrap);
    showDownloadToast(movie.title);
  });

  // Click poster itself = play
  img.addEventListener('click', () => openTrailer(movie.videoId, movie.title, movie.poster));

  return wrap;
}

function showDownloadToast(title) {
  let toast = document.getElementById('dl-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dl-toast';
    toast.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
      background:rgba(20,20,20,.96);border:1px solid rgba(255,255,255,.12);
      border-radius:8px;padding:12px 22px;color:#fff;font-size:.85rem;
      opacity:0;transition:opacity .3s;z-index:200;pointer-events:none;white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  const dl = isDownloaded(title);
  toast.textContent = dl ? `⬇ "${title}" saved for offline` : `✕ "${title}" removed from downloads`;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ---------- GENRE FILTER TABS ----------
let activeGenre = 'All';

function buildGenreTabs() {
  const container = document.getElementById('genreTabs');
  if (!container) return;
  container.innerHTML = GENRES.map(g => `
    <button class="genre-tab ${g === activeGenre ? 'active' : ''}" data-genre="${g}">${g}</button>
  `).join('');
  container.querySelectorAll('.genre-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeGenre = btn.dataset.genre;
      buildGenreTabs();
      buildRows();
    });
  });
}

// ---------- BUILD ROWS ----------
function buildRows() {
  const container = document.getElementById('rowsContainer');
  container.innerHTML = '';

  const filtered = activeGenre === 'All'
    ? ALL_MOVIES
    : ALL_MOVIES.filter(m => m.genres.includes(activeGenre));

  if (!filtered.length) {
    container.innerHTML = `<div style="text-align:center;padding:60px 0;color:#555;">
      <div style="font-size:2.5rem;margin-bottom:12px;">🎬</div>
      <div style="font-size:1rem;color:#888;">No movies in this genre yet.</div>
    </div>`;
    return;
  }

  ROWS_CONFIG.forEach((row, rowIndex) => {
    let movies = filtered.filter(row.filter);
    if (row.limit) movies = movies.slice(0, row.limit);
    if (!movies.length) return;

    const section = document.createElement('section');
    section.className = 'row';

    const header = document.createElement('div');
    header.className = 'row-header';
    header.innerHTML = `<div class="row-title">${row.title}</div>`;
    section.appendChild(header);

    const wrap = document.createElement('div');
    wrap.className = 'track-wrap';

    const track = document.createElement('div');
    track.className = 'track';
    track.id = `track-${rowIndex}`;

    movies.forEach(m => track.appendChild(buildPosterCard(m)));

    const left  = document.createElement('div');
    left.className  = 'arrow left';
    left.innerHTML  = '&#10094;';
    const right = document.createElement('div');
    right.className = 'arrow right';
    right.innerHTML = '&#10095;';

    wrap.appendChild(track);
    wrap.appendChild(left);
    wrap.appendChild(right);
    section.appendChild(wrap);
    container.appendChild(section);

    left.addEventListener('click',  () => track.scrollBy({ left: -480, behavior:'smooth' }));
    right.addEventListener('click', () => track.scrollBy({ left:  480, behavior:'smooth' }));

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive:true });
    track.addEventListener('touchmove',  e => {
      track.scrollLeft += startX - e.touches[0].clientX;
      startX = e.touches[0].clientX;
    }, { passive:true });
  });
}

// ---------- Share Movie ----------
function shareMovie(movie) {
  const url  = `${location.origin}${location.pathname.replace('index.html','')}movie.html?title=${encodeURIComponent(movie.title)}`;
  const text = `Watch "${movie.title}" on Netflix Clone!`;

  if (navigator.share) {
    navigator.share({ title: movie.title, text, url }).catch(() => {});
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showShareToast(`🔗 Link copied for "${movie.title}"`);
    }).catch(() => {
      // Last resort: show share modal
      showShareModal(movie, url);
    });
  }
}

function showShareToast(msg) {
  let t = document.getElementById('share-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'share-toast';
    t.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
      background:rgba(20,20,20,.97);border:1px solid rgba(255,255,255,.15);
      border-radius:10px;padding:13px 24px;color:#fff;font-size:.85rem;
      opacity:0;transition:opacity .3s;z-index:300;white-space:nowrap;
      pointer-events:none;display:flex;align-items:center;gap:8px;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

function showShareModal(movie, url) {
  let modal = document.getElementById('share-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'share-modal';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;
      align-items:center;justify-content:center;z-index:200;padding:20px;
    `;
    modal.innerHTML = `
      <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,.1);border-radius:12px;
        padding:28px 32px;max-width:420px;width:100%;animation:fadeUp .25s ease;">
        <div style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#e50914;margin-bottom:14px;">Share Movie</div>
        <div id="share-modal-title" style="font-size:1.1rem;font-weight:600;margin-bottom:18px;"></div>
        <div style="display:flex;gap:12px;margin-bottom:18px;">
          <input id="share-url-input" readonly style="flex:1;padding:11px 14px;background:rgba(255,255,255,.07);
            border:1px solid rgba(255,255,255,.12);border-radius:7px;color:#aaa;font-family:'DM Sans',sans-serif;
            font-size:.82rem;outline:none;" />
          <button id="share-copy-btn" style="padding:11px 18px;background:#e50914;color:#fff;border:none;
            border-radius:7px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;">Copy</button>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;" id="share-social-row"></div>
        <button id="share-close-btn" style="width:100%;padding:10px;background:rgba(255,255,255,.07);
          color:#ccc;border:1px solid rgba(255,255,255,.1);border-radius:7px;
          font-family:'DM Sans',sans-serif;font-size:.9rem;cursor:pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('share-copy-btn').addEventListener('click', () => {
      const inp = document.getElementById('share-url-input');
      inp.select();
      document.execCommand('copy');
      document.getElementById('share-copy-btn').textContent = 'Copied!';
      setTimeout(() => { document.getElementById('share-copy-btn').textContent = 'Copy'; }, 2000);
    });
    document.getElementById('share-close-btn').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  }

  // Social share links
  const encoded = encodeURIComponent(url);
  const text    = encodeURIComponent(`Watch "${movie.title}" on Netflix Clone!`);
  const socials = [
    { name:'WhatsApp', icon:'💬', href:`https://wa.me/?text=${text}%20${encoded}`, color:'#25d366' },
    { name:'Twitter',  icon:'🐦', href:`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`, color:'#1da1f2' },
    { name:'Telegram', icon:'✈️', href:`https://t.me/share/url?url=${encoded}&text=${text}`, color:'#0088cc' },
    { name:'Email',    icon:'📧', href:`mailto:?subject=${encodeURIComponent('Movie Recommendation')}&body=${text}%20${encoded}`, color:'#888' },
  ];
  document.getElementById('share-social-row').innerHTML = socials.map(s => `
    <a href="${s.href}" target="_blank" rel="noopener"
      style="display:flex;align-items:center;gap:6px;padding:8px 14px;
      background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
      border-radius:7px;color:#ccc;text-decoration:none;font-size:.82rem;
      transition:background .15s;"
      onmouseover="this.style.borderColor='${s.color}';this.style.color='#fff'"
      onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.color='#ccc'">
      ${s.icon} ${s.name}
    </a>
  `).join('');

  document.getElementById('share-modal-title').textContent = movie.title;
  document.getElementById('share-url-input').value = url;
  modal.style.display = 'flex';
}

// ---------- Trailer Modal ----------
const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');
const closeModal   = document.getElementById('closeModal');

function openTrailer(youtubeId, movieTitle, moviePoster) {
  trailerFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  trailerModal.classList.remove('hidden');
  trailerModal.setAttribute('aria-hidden', 'false');

  if (movieTitle && _session) {
    const key = profileKey('nf_history');
    let history = JSON.parse(localStorage.getItem(key) || '[]');
    history = history.filter(h => h.title !== movieTitle);
    history.unshift({
      title: movieTitle, poster: moviePoster || '',
      progress: Math.floor(Math.random() * 60) + 20,
      watchedOn: 'Just now', watchedAt: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(history.slice(0, 10)));
  }
}
function closeTrailer() {
  trailerFrame.src = '';
  trailerModal.classList.add('hidden');
  trailerModal.setAttribute('aria-hidden', 'true');
}

closeModal.addEventListener('click', closeTrailer);
trailerModal.addEventListener('click', e => { if (e.target === trailerModal) closeTrailer(); });

// Hero play button
document.addEventListener('click', e => {
  if (e.target.classList.contains('play-hero')) {
    openTrailer(e.target.dataset.videoid || 'hA6hldpSTF8', 'Avengers: Endgame', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg');
  }
});

// ---------- Hamburger ----------
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger && hamburger.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// ---------- Search filter ----------
const searchInput = document.getElementById('search');
searchInput && searchInput.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.poster').forEach(p => {
    const match = q === '' || p.dataset.title.toLowerCase().includes(q);
    p.closest('.poster-wrap').style.opacity   = match ? '1'    : '0.18';
    p.closest('.poster-wrap').style.transform = match ? ''     : 'scale(0.97)';
  });
});

// ---------- INIT ----------
buildSkeletonRows();
setTimeout(() => {
  buildGenreTabs();
  buildRows();
}, 800);