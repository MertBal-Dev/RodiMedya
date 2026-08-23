// Dilli Mobilya Luxury Interaction Engine (V6 Stable)
document.addEventListener('DOMContentLoaded', () => {
  renderWeddingSets();
  initCategories();
  renderProducts('all');
  initPackageBuilder();
  renderBranches();
  initTestimonials();
  initModalListeners();
  initLightbox();
  initHeroSlider();

  // Scroll reveal after all content is rendered
  setTimeout(() => initScrollReveal(), 100);
});

// Format Currency
function formatTL(amount) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
}

// 1. Detaylı Düğün Paketleri Vitrini
function renderWeddingSets() {
  const container = document.getElementById('weddingSetsGrid');
  if (!container) return;

  container.innerHTML = DILLI_DATA.weddingPackages.map(pkg => `
    <div class="wedding-set-card ${pkg.id === 'pkg-gold' ? 'featured-gold' : ''}">
      <div class="set-card-media" role="button" tabindex="0" aria-label="${pkg.title} HD görsel" onclick="openLightbox('${pkg.image}', '${pkg.title}')">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <span class="set-badge-banner">${pkg.badge}</span>
        <span class="hero-zoom-cue"><i class="bi bi-arrows-fullscreen"></i> HD İncele</span>
      </div>
      <div class="set-card-content">
        <h3 class="set-title-h3">${pkg.title}</h3>
        <p class="set-subtitle-p">${pkg.subtitle}</p>
        <div class="set-checklist-box">
          <div class="set-check-row"><i class="bi bi-check-circle-fill"></i><div><strong>Koltuk Takımı:</strong> ${pkg.includes.koltuk}</div></div>
          <div class="set-check-row"><i class="bi bi-check-circle-fill"></i><div><strong>Yatak Odası:</strong> ${pkg.includes.yatak}</div></div>
          <div class="set-check-row"><i class="bi bi-check-circle-fill"></i><div><strong>Yemek Odası:</strong> ${pkg.includes.yemek}</div></div>
        </div>
        <div class="set-gift-banner"><i class="bi bi-gift-fill"></i><span>${pkg.includes.hediye}</span></div>
        <div class="set-price-footer">
          <div>
            <span class="set-price-old">${formatTL(pkg.oldPrice)}</span>
            <div class="set-price-current">${formatTL(pkg.price)}</div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.725rem;color:var(--emerald);font-weight:800;display:block;">Elden Taksitle</span>
            <strong style="color:var(--emerald);font-size:0.95rem;">${pkg.installment}</strong>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:1.25rem;">
          <button class="btn-lux btn-outline-lux btn-sm-lux" onclick="openLightbox('${pkg.image}', '${pkg.title}')"><i class="bi bi-images"></i> Galeri</button>
          <a href="https://wa.me/${DILLI_DATA.storeInfo.whatsappPhone}?text=${encodeURIComponent('Merhaba Dilli Mobilya, \"' + pkg.title + '\" için mağazanızda randevu ve 16 ay elden taksit koşullarını öğrenmek istiyorum.')}" target="_blank" class="btn-lux btn-wa-lux btn-sm-lux"><i class="bi bi-whatsapp"></i> Fiyat Sor</a>
        </div>
      </div>
    </div>
  `).join('');
}

// 2. Kategoriler (Dinamik Sayım)
function initCategories() {
  const container = document.getElementById('categoryFilterTabs');
  if (!container) return;

  container.innerHTML = DILLI_DATA.categories.map((cat, idx) => {
    const count = cat.id === 'all'
      ? DILLI_DATA.products.length
      : DILLI_DATA.products.filter(p => p.categoryId === cat.id).length;
    return `
      <button class="filter-pill-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat.id}">
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
        <small style="opacity:0.75;font-weight:700;font-size:0.75rem;margin-left:3px;background:rgba(0,0,0,0.06);padding:1px 6px;border-radius:999px;">(${count})</small>
      </button>
    `;
  }).join('');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill-btn');
    if (!btn) return;
    container.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.cat);
  });
}

// 3. Ürünleri Listele
function renderProducts(categoryId) {
  const container = document.getElementById('productsShowcaseGrid');
  if (!container) return;

  let filtered = categoryId === 'all' ? DILLI_DATA.products : DILLI_DATA.products.filter(p => p.categoryId === categoryId);

  if (filtered.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;"><p style="color:var(--text-muted);font-size:1.15rem;">Bu kategoride ürünler güncelleniyor.</p></div>';
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card-lux" data-id="${p.id}">
      <div class="product-visual-box" role="button" tabindex="0" aria-label="${p.title} HD görsel" onclick="openLightbox('${p.image}', '${p.title}')">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        ${p.badge ? `<span class="product-badge-float">${p.badge}</span>` : ''}
        <span class="product-score-float">★ ${p.rating} (${p.reviewCount})</span>
        <span class="hero-zoom-cue"><i class="bi bi-arrows-fullscreen"></i> HD</span>
      </div>
      <div class="product-content-body">
        <h3 class="product-name-title">${p.title}</h3>
        <p class="product-sub-desc">${p.subtitle}</p>
        <div class="specs-mini-table">
          <div class="spec-line"><i class="bi bi-shield-check" style="color:var(--gold-500);"></i><span><strong>İskelet:</strong> ${p.material}</span></div>
          <div class="spec-line"><i class="bi bi-palette" style="color:var(--gold-500);"></i><span><strong>Kumaş:</strong> ${p.fabric}</span></div>
        </div>
        <div class="product-card-pricing">
          <div>
            ${p.oldPrice ? `<span class="old-price-strike">${formatTL(p.oldPrice)}</span>` : ''}
            <span class="current-price-val">${formatTL(p.price)}</span>
          </div>
          <div class="installment-monthly">Elden ${p.installment}</div>
        </div>
        <div class="product-card-ctas">
          <button class="btn-lux btn-outline-lux btn-sm-lux" onclick="openProductModal('${p.id}')"><i class="bi bi-eye"></i> İncele</button>
          <a href="https://wa.me/${DILLI_DATA.storeInfo.whatsappPhone}?text=${encodeURIComponent('Merhaba Dilli Mobilya, \"' + p.title + '\" modelinizi inceledim. Elden senet seçenekleri ve şubede teşhir durumu hakkında bilgi rica ediyorum.')}" target="_blank" class="btn-lux btn-wa-lux btn-sm-lux"><i class="bi bi-whatsapp"></i> Fiyat Sor</a>
        </div>
      </div>
    </div>
  `).join('');
}

// 4. Görsel Destekli Düğün Paketi Oluşturucu
let builderState = { koltuk: 'b-k1', yatak: 'b-y1', yemek: 'b-ye1' };

function initPackageBuilder() {
  renderVisualBuilderGroup('koltukVisualCardsGrid', DILLI_DATA.builderOptions.koltuk, 'koltuk');
  renderVisualBuilderGroup('yatakVisualCardsGrid', DILLI_DATA.builderOptions.yatak, 'yatak');
  renderVisualBuilderGroup('yemekVisualCardsGrid', DILLI_DATA.builderOptions.yemek, 'yemek');
  updateBuilderSummary();
}

function renderVisualBuilderGroup(containerId, options, groupKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = options.map(opt => `
    <div class="visual-option-card ${builderState[groupKey] === opt.id ? 'active' : ''}" onclick="selectBuilderOption('${groupKey}', '${opt.id}')">
      <div class="visual-card-thumb" role="button" tabindex="0" aria-label="${opt.name} büyüt" onclick="event.stopPropagation(); openLightbox('${opt.image}', '${opt.name}')">
        <img src="${opt.image}" alt="${opt.name}" loading="lazy">
        <span class="card-check-pill">${builderState[groupKey] === opt.id ? '✓' : ''}</span>
        ${opt.badge ? `<span class="card-badge-tag">${opt.badge}</span>` : ''}
        <span class="hero-zoom-cue" style="bottom:8px;right:8px;"><i class="bi bi-arrows-fullscreen"></i></span>
      </div>
      <div class="visual-card-body">
        <h4 class="visual-card-title">${opt.name}</h4>
        <p class="visual-card-sub">${opt.tag}</p>
        ${opt.colors ? `<div class="card-color-swatches">${opt.colors.map(c => `<span class="swatch-dot" style="background-color:${c};"></span>`).join('')}<small style="font-size:0.65rem;color:var(--text-muted);margin-left:3px;">Renkler</small></div>` : ''}
        <div class="visual-card-price-row">
          <span class="visual-price-val">${formatTL(opt.price)}</span>
          <span class="visual-inst-sub">${Math.round(opt.price / 16)} TL/Ay</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.selectBuilderOption = function(groupKey, optId) {
  builderState[groupKey] = optId;
  renderVisualBuilderGroup('koltukVisualCardsGrid', DILLI_DATA.builderOptions.koltuk, 'koltuk');
  renderVisualBuilderGroup('yatakVisualCardsGrid', DILLI_DATA.builderOptions.yatak, 'yatak');
  renderVisualBuilderGroup('yemekVisualCardsGrid', DILLI_DATA.builderOptions.yemek, 'yemek');
  updateBuilderSummary();
};

function updateBuilderSummary() {
  const selK = DILLI_DATA.builderOptions.koltuk.find(o => o.id === builderState.koltuk);
  const selY = DILLI_DATA.builderOptions.yatak.find(o => o.id === builderState.yatak);
  const selYe = DILLI_DATA.builderOptions.yemek.find(o => o.id === builderState.yemek);

  const listContainer = document.getElementById('summaryItemsList');
  if (listContainer && selK && selY && selYe) {
    listContainer.innerHTML = [
      { item: selK, label: 'Koltuk Takımı' },
      { item: selY, label: 'Yatak Odası' },
      { item: selYe, label: 'Yemek Odası' }
    ].map(({ item, label }) => `
      <div class="visual-selected-item">
        <div class="selected-item-thumb" onclick="openLightbox('${item.image}', '${item.name}')">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="selected-item-meta">
          <strong>${item.name}</strong>
          <span>${label} • ${item.material}</span>
        </div>
        <div class="selected-item-price">${formatTL(item.price)}</div>
      </div>
    `).join('');
  }

  if (selK && selY && selYe) {
    const rawTotal = selK.price + selY.price + selYe.price;
    const discount = 12000;
    const finalPrice = rawTotal - discount;
    const inst16 = Math.round(finalPrice / 16);

    const elRaw = document.getElementById('calcRawTotal');
    const elDisc = document.getElementById('calcDiscount');
    const elGrand = document.getElementById('calcGrandTotal');
    const elInst = document.getElementById('calcInstallmentText');

    if (elRaw) elRaw.textContent = formatTL(rawTotal);
    if (elDisc) elDisc.textContent = '-' + formatTL(discount);
    if (elGrand) elGrand.textContent = formatTL(finalPrice);
    if (elInst) elInst.textContent = formatTL(inst16) + ' x 16 Ay Senetle';

    const waBtn = document.getElementById('builderWhatsAppSubmitBtn');
    if (waBtn) {
      const msg = 'Merhaba Dilli Mobilya! Web sitenizdeki Düğün Paketi modülünden şu takımları seçtim:\n' +
        '🛋️ Koltuk: ' + selK.name + ' (' + formatTL(selK.price) + ')\n' +
        '🛏️ Yatak Odası: ' + selY.name + ' (' + formatTL(selY.price) + ')\n' +
        '🍽️ Yemek Odası: ' + selYe.name + ' (' + formatTL(selYe.price) + ')\n\n' +
        '💰 Paket İndirimli Tutar: ' + formatTL(finalPrice) + '\n' +
        '💳 16 Ay Elden Taksit: ' + formatTL(inst16) + ' TL/Ay\n\n' +
        'Bu paket için şubenizde randevu almak istiyorum.';
      waBtn.href = 'https://wa.me/' + DILLI_DATA.storeInfo.whatsappPhone + '?text=' + encodeURIComponent(msg);
    }
  }
}

// 5. Şubeler & Harita
let activeBranchIndex = 0;

function renderBranches() {
  const listContainer = document.getElementById('showroomsScrollList');
  if (!listContainer) return;

  listContainer.innerHTML = DILLI_DATA.branches.map((b, idx) => `
    <div class="showroom-card-item ${idx === activeBranchIndex ? 'active' : ''}" onclick="switchBranch(${idx})">
      <div class="showroom-header-row">
        <h4 class="showroom-title-text">${b.name}</h4>
        <span class="showroom-type-badge">${b.type}</span>
      </div>
      <p class="showroom-address-line"><i class="bi bi-geo-alt-fill" style="color:var(--gold-500);"></i><span>${b.address}</span></p>
      <div class="showroom-actions-row">
        <a href="tel:${b.phoneRaw}" class="btn-lux btn-outline-lux btn-sm-lux"><i class="bi bi-telephone-fill"></i> ${b.phone}</a>
        <a href="${b.gmapsDirectUrl}" target="_blank" class="btn-lux btn-gold btn-sm-lux"><i class="bi bi-map-fill"></i> Yol Tarifi</a>
      </div>
    </div>
  `).join('');

  updateBranchMap(activeBranchIndex);
}

window.switchBranch = function(idx) {
  activeBranchIndex = idx;
  renderBranches();
};

function updateBranchMap(idx) {
  const branch = DILLI_DATA.branches[idx];
  const iframe = document.getElementById('showroomMapIframe');
  if (iframe && branch) {
    iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(branch.mapQuery) + '&t=&z=16&ie=UTF8&iwloc=&output=embed';
  }
}

// 6. Yorumlar
function initTestimonials() {
  const container = document.getElementById('testimonialsCardsGrid');
  if (!container) return;

  container.innerHTML = DILLI_DATA.testimonials.map(t => `
    <div class="testi-card-lux">
      <div>
        <div class="testi-stars-row">${'★'.repeat(t.rating)}</div>
        <p class="testi-quote-text">"${t.text}"</p>
      </div>
      <div class="testi-author-meta">
        <h4>${t.name}</h4>
        <span>${t.district} • ${t.tag}</span>
      </div>
    </div>
  `).join('');
}

// 7. Ürün Detay Modalı (Galeri Destekli)
let modalGallery = [];
let modalGalleryIdx = 0;

window.openProductModal = function(productId) {
  const product = DILLI_DATA.products.find(p => p.id === productId);
  if (!product) return;

  modalGallery = [product.image, ...(product.gallery || [])];
  modalGallery = [...new Set(modalGallery)];
  modalGalleryIdx = 0;

  document.getElementById('modalCoverImg').src = modalGallery[0];
  document.getElementById('modalProductTitle').textContent = product.title;
  document.getElementById('modalProductDesc').textContent = product.description;
  document.getElementById('modalDimensions').textContent = product.dimensions;
  document.getElementById('modalMaterial').textContent = product.material;
  document.getElementById('modalFabric').textContent = product.fabric;
  document.getElementById('modalColors').textContent = (product.colorNames || product.colors).join(', ');
  document.getElementById('modalCashPrice').textContent = formatTL(product.price);
  document.getElementById('modalInstallmentVal').textContent = product.installment;
  updateModalGalleryCounter();

  const modalWaBtn = document.getElementById('modalWhatsAppOrderBtn');
  modalWaBtn.href = 'https://wa.me/' + DILLI_DATA.storeInfo.whatsappPhone + '?text=' + encodeURIComponent('Merhaba Dilli Mobilya, sitenizden "' + product.title + '" modelini inceledim. Taksitli alım ve mağazada teşhir hakkında bilgi almak istiyorum.');

  document.getElementById('productQuickModal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
  document.getElementById('productQuickModal').classList.remove('open');
  document.body.style.overflow = '';
};

window.modalGalleryNext = function() {
  if (modalGallery.length <= 1) return;
  modalGalleryIdx = (modalGalleryIdx + 1) % modalGallery.length;
  document.getElementById('modalCoverImg').src = modalGallery[modalGalleryIdx];
  updateModalGalleryCounter();
};

window.modalGalleryPrev = function() {
  if (modalGallery.length <= 1) return;
  modalGalleryIdx = (modalGalleryIdx - 1 + modalGallery.length) % modalGallery.length;
  document.getElementById('modalCoverImg').src = modalGallery[modalGalleryIdx];
  updateModalGalleryCounter();
};

function updateModalGalleryCounter() {
  const counter = document.getElementById('modalGalleryCounter');
  if (counter) counter.textContent = (modalGalleryIdx + 1) + ' / ' + modalGallery.length;
}

function initModalListeners() {
  const modal = document.getElementById('productQuickModal');
  if (!modal) return;
  modal.addEventListener('click', (e) => { if (e.target === modal) closeProductModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeProductModal(); closeLightbox(); }
    if (e.key === 'Enter' && e.target.hasAttribute('onclick')) e.target.click();
  });
}

// 8. Fullscreen HD Lightbox
window.openLightbox = function(imageUrl, titleText) {
  const backdrop = document.getElementById('lightboxBackdrop');
  const imgEl = document.getElementById('lightboxMainImg');
  const captionEl = document.getElementById('lightboxCaption');
  if (!backdrop || !imgEl) return;
  imgEl.src = imageUrl;
  if (captionEl) captionEl.textContent = titleText || 'Dilli Mobilya HD Detay';
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const backdrop = document.getElementById('lightboxBackdrop');
  if (backdrop) { backdrop.classList.remove('open'); document.body.style.overflow = ''; }
};

function initLightbox() {
  const backdrop = document.getElementById('lightboxBackdrop');
  if (!backdrop) return;
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeLightbox(); });
}

// 9. Hero Slider Engine
let heroSlideIndex = 0;
let heroSlideTimer = null;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  heroSlideTimer = setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    updateHeroSlider();
  }, 5000);
}

window.goToSlide = function(idx) {
  heroSlideIndex = idx;
  updateHeroSlider();
  clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % document.querySelectorAll('.hero-slide').length;
    updateHeroSlider();
  }, 5000);
};

function updateHeroSlider() {
  document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === heroSlideIndex));
  document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === heroSlideIndex));
}

// 10. Scroll Reveal Observer
function initScrollReveal() {
  const targets = document.querySelectorAll('.section-head, .trust-pillar, .wedding-set-card, .product-card-lux, .showroom-card-item, .testi-card-lux, .config-group');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-on-scroll', 'revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => { el.classList.add('reveal-on-scroll'); observer.observe(el); });
}

// 11. Presentation Modal
window.closePresModal = function() {
  const modal = document.getElementById('presWelcomeModal');
  if (modal) modal.classList.remove('open');
};
