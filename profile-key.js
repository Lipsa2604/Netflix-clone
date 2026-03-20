// ============================================================
//  profile-key.js  —  Per-profile storage key resolver
//
//  Every piece of data that should be SEPARATE per profile
//  (watch history, my list, settings, downloads) uses:
//
//    profileKey('nf_history')   →  "nf_history__{email}__{profileId}"
//
//  Account-level data (users list, password) still uses email.
// ============================================================

function getActiveProfileId() {
  try {
    const session = JSON.parse(
      localStorage.getItem('nf_session') ||
      sessionStorage.getItem('nf_session') ||
      'null'
    );
    if (!session) return null;
    const key = 'nf_active_profile_' + session.email;
    return localStorage.getItem(key) || 'default';
  } catch(e) { return 'default'; }
}

function getSessionEmail() {
  try {
    const session = JSON.parse(
      localStorage.getItem('nf_session') ||
      sessionStorage.getItem('nf_session') ||
      'null'
    );
    return session ? session.email : null;
  } catch(e) { return null; }
}

/**
 * Returns a storage key scoped to the active profile.
 * e.g. profileKey('nf_history') => 'nf_history__user@x.com__p1234'
 */
function profileKey(base) {
  const email     = getSessionEmail() || 'guest';
  const profileId = getActiveProfileId() || 'default';
  return `${base}__${email}__${profileId}`;
}

/**
 * Returns a storage key scoped to the account only (not per-profile).
 * e.g. accountKey('nf_settings') => 'nf_settings__user@x.com'
 */
function accountKey(base) {
  const email = getSessionEmail() || 'guest';
  return `${base}__${email}`;
}

// ============================================================
//  Auto-inject "Viewing as: ProfileName" pill into .nav-actions
//  on every page that loads this script.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    const session = JSON.parse(
      localStorage.getItem('nf_session') ||
      sessionStorage.getItem('nf_session') || 'null'
    );
    if (!session) return;

    const profileId  = getActiveProfileId();
    const profilesRaw = localStorage.getItem('nf_profiles_' + session.email);
    const profiles   = profilesRaw ? JSON.parse(profilesRaw) : [];
    const active     = profiles.find(p => p.id === profileId);
    if (!active && !session.activeProfile) return;

    const name  = active ? active.name  : (session.activeProfile || session.name);
    const color = active ? active.color : (session.activeProfileColor || '#e50914');
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    // Find nav-actions on the page
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // Don't double-inject
    if (document.getElementById('profile-indicator-pill')) return;

    const pill = document.createElement('a');
    pill.id        = 'profile-indicator-pill';
    pill.href      = 'profiles.html';
    pill.className = 'profile-indicator';
    pill.title     = 'Switch profile';
    pill.innerHTML = `
      <span class="pi-dot" style="background:${color}">${initial}</span>
      ${name}
    `;

    // Insert before the avatar button (or at the start of nav-actions)
    const avatar = navActions.querySelector('.user-menu') || navActions.querySelector('.avatar');
    if (avatar) {
      navActions.insertBefore(pill, avatar);
    } else {
      navActions.prepend(pill);
    }
  } catch(e) {}
});