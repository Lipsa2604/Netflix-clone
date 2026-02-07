// ---------- Sample movie rows data ----------

 const ROWS = [
  {
    title: "Trending Now",
    movies: [
      {title:"Finding Nemo", poster:"https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg", videoId:"2zLkasScy7A"},
      {title:"Inglourious Basterds", poster:"https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg", videoId:"KnrRy6kSFF0"},
      {title:"Avengers: Endgame", poster:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", videoId:"hA6hldpSTF8"},
      {title:"The Dark Knight", poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", videoId:"EXeTwQWrcwY"},
      {title:"Interstellar", poster:"https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", videoId:"zSWdZVtXT7E"},
      {title:"Spider-Man: No Way Home", poster:"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", videoId:"JfVOs4VSpmA"},
      {title:"Black Panther", poster:"https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", videoId:"xjDjIWPwcPU"},
      {title:"Inception", poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", videoId:"YoHD9XEInc0"}
    ]
  },
  {
    title: "Top Rated",
    movies: [
      {title:"Frozen", poster:"https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg", videoId:"TbQm5doF_Uc"},
      {title:"The Prestige", poster:"https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg", videoId:"ijXruSzfGEc"},
      {title:"Forrest Gump", poster:"https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", videoId:"bLvqoHBptjg"}, 
      {title:"La La Land", poster:"https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png", videoId:"0pdqf4P9MB8"},
      {title:"Joker", poster:"https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg", videoId:"zAGVQLHvwOY"},
      {title:"Doctor Strange in the Multiverse of Madness", poster:"https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", videoId:"aWzlQ2N6qqg"},
      {title:"The Matrix", poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", videoId:"m8e-FF8MsqU"},
      {title:"The Avengers", poster:"https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", videoId:"eOrNdBpGMv8"}
    ]
  },
  {
    title: "Continue Watching",
    movies: [
      
      {title:"The Lion King", poster:"https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg", videoId:"7TavVZMewpY"}, 
      {title:"The Shawshank Redemption", poster:"https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", videoId:"6hB3S9bIaco"},  
      {title:"Mad Max: Fury Road", poster:"https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg", videoId:"hEJnMQG9ev8"},
      {title:"John Wick", poster:"https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg", videoId:"2AUmvWm5ZDQ"},
      {title:"Guardians of the Galaxy Vol. 2", poster:"https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg", videoId:"dW1BIid8Osg"},
      {title:"Inception", poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", videoId:"YoHD9XEInc0"}
    ]
  }
  
];


// ---------- Build rows dynamically ----------
const rowsContainer = document.getElementById('rowsContainer');

ROWS.forEach((row, rowIndex) => {
  const section = document.createElement('section');
  section.className = 'row';

  const header = document.createElement('div');
  header.className = 'row-header';
  header.innerHTML = `<div class="row-title">${row.title}</div>`;
  section.appendChild(header);

  const wrap = document.createElement('div');
  wrap.className = 'track-wrap';

  // track (posters)
  const track = document.createElement('div');
  track.className = 'track';
  track.id = `track-${rowIndex}`;

  row.movies.forEach(m => {
    const img = document.createElement('img');
    img.className = 'poster';
    img.src = m.poster;
    img.alt = m.title;
    img.dataset.title = m.title;
    img.dataset.video = m.videoId;
    track.appendChild(img);
  });

  // arrows
  const left = document.createElement('div');
  left.className = 'arrow left';
  left.innerHTML = '&#10094;';
  const right = document.createElement('div');
  right.className = 'arrow right';
  right.innerHTML = '&#10095;';

  wrap.appendChild(track);
  wrap.appendChild(left);
  wrap.appendChild(right);
  section.appendChild(wrap);
  rowsContainer.appendChild(section);

  // Arrow click behavior
  left.addEventListener('click', () => track.scrollBy({left: -420, behavior: 'smooth'}));
  right.addEventListener('click', () => track.scrollBy({left: 420, behavior: 'smooth'}));

  // Autoplay behavior, pause on hover/touch
  let autoplay = setInterval(() => {
    track.scrollBy({left: 220, behavior: 'smooth'});
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) track.scrollTo({left:0, behavior:'smooth'});
  }, 3000);

  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      track.scrollBy({left: 220, behavior: 'smooth'});
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) track.scrollTo({left:0, behavior:'smooth'});
    }, 3000);
  });

  // touch swipe support
  let startX = 0, isDown=false;
  track.addEventListener('touchstart', (e) => { clearInterval(autoplay); isDown=true; startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchmove', (e) => {
    if(!isDown) return;
    const x = e.touches[0].clientX; const dx = startX - x;
    track.scrollLeft += dx; startX = x;
  }, {passive:true});
  track.addEventListener('touchend', () => {
    isDown=false;
    autoplay = setInterval(() => { track.scrollBy({left: 220, behavior:'smooth'}); if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) track.scrollTo({left:0, behavior:'smooth'}); }, 3000);
  });
});

// ---------- HERO Play opens trailer modal ----------
const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');
const closeModal = document.getElementById('closeModal');

document.addEventListener('click', (e) => {
  const t = e.target;

  // posters: open trailer modal
  if (t.classList.contains('poster')) {
    const videoId = t.dataset.video || 'hA6hldpSTF8';
    openTrailer(videoId);
  }

  // hero Play
  if (t.classList && t.classList.contains('play-hero')) {
    const id = t.dataset.videoid || 'hA6hldpSTF8';
    openTrailer(id);
  }
});

closeModal.addEventListener('click', closeTrailer);
trailerModal.addEventListener('click', (e) => { if (e.target === trailerModal) closeTrailer(); });

function openTrailer(youtubeId){
  trailerFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  trailerModal.classList.remove('hidden');
  trailerModal.setAttribute('aria-hidden','false');
}
function closeTrailer(){
  trailerFrame.src = '';
  trailerModal.classList.add('hidden');
  trailerModal.setAttribute('aria-hidden','true');
}

// ---------- Hamburger mobile menu ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// ---------- Basic search highlight ----------
const search = document.getElementById('search');
search && search.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.poster').forEach(p => {
    const t = p.dataset.title.toLowerCase();
    p.style.opacity = q === '' || t.includes(q) ? '1' : '0.18';
    p.style.transform = q === '' || t.includes(q) ? 'scale(1)' : 'scale(0.98)';
  });
});
