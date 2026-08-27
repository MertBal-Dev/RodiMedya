/**
 * ═══════════════════════════════════════════════════════════════
 *  SUNUM ÇUBUĞU — Anaokulu web sitesi tasarım demosu
 * ═══════════════════════════════════════════════════════════════
 *  Masaüstü : üstte tek sıra ince bar
 *  Mobil    : altta başparmakla erişilir bar + açılır seçim paneli
 *
 *  • Tasarım geçişinde bulunduğunuz bölüm korunur
 *  • Renk paleti tasarımdan bağımsız, tercih hatırlanır
 *  • Gizle/göster (Ctrl/Cmd + Alt + T)
 *  • Seçimi WhatsApp ile gönder / kopyala
 *
 *  Yayına alırken: bu <script> etiketini silmek yeterlidir.
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  var TASARIMLAR = [
    { no: 1, ad: 'Orman',    dosya: '/anaokulu-demo/' },
    { no: 2, ad: 'Atölye',   dosya: '/anaokulu-demo/tasarim-2.html' },
    { no: 3, ad: 'Bahçe',    dosya: '/anaokulu-demo/tasarim-3.html' },
    { no: 4, ad: 'Kemer',    dosya: '/anaokulu-demo/tasarim-4.html' },
    { no: 5, ad: 'Dergi',    dosya: '/anaokulu-demo/tasarim-5.html' },
    { no: 6, ad: 'Yolculuk', dosya: '/anaokulu-demo/tasarim-6.html' }
  ];

  /* Metin renkleri WCAG 2.2 AA (4.5:1) sağlayacak şekilde seçildi. */
  var PALETLER = [
    { id:'cimen', ad:'Çimen & Gökyüzü', not:'Yeşil + gök mavisi',
      c1:'#27844C', c2:'#4FB3E8', c3:'#FF7A9C', c4:'#FFC53D', c5:'#7FD8B8',
      bg:'#F5FBF7', surface:'#FFFFFF', ink:'#17302A', muted:'#556F65',
      line:'#DAEBE1', onC1:'#FFFFFF', onC3:'#3B1220', onC4:'#3A2A05' },
    { id:'deniz', ad:'Deniz & Mercan', not:'Mavi + mercan',
      c1:'#1A7CB1', c2:'#22B5B5', c3:'#FF6F5E', c4:'#FFC24B', c5:'#8FD26A',
      bg:'#F3FAFD', surface:'#FFFFFF', ink:'#12303F', muted:'#4E6E7D',
      line:'#D5E8F2', onC1:'#FFFFFF', onC3:'#3A140F', onC4:'#3A2A05' },
    { id:'pamuk', ad:'Pamuk Şeker', not:'Pembe + lila',
      c1:'#D52F77', c2:'#9B6FDB', c3:'#43AEE8', c4:'#FFB86B', c5:'#5FCFA6',
      bg:'#FFF6FA', surface:'#FFFFFF', ink:'#3A2132', muted:'#71586A',
      line:'#F2DBE6', onC1:'#FFFFFF', onC3:'#0C2735', onC4:'#3A2405' },
    { id:'gokkusagi', ad:'Gökkuşağı', not:'Logonun renkleri',
      c1:'#D63B33', c2:'#EE8B33', c3:'#2D74CE', c4:'#F5C518', c5:'#2F9E68',
      bg:'#FFF9F2', surface:'#FFFFFF', ink:'#2A1E18', muted:'#67564A',
      line:'#EFE1D3', onC1:'#FFFFFF', onC3:'#FFFFFF', onC4:'#33280A' },
    { id:'orman', ad:'Orman & Papatya', not:'Koyu yeşil + papatya',
      c1:'#24815A', c2:'#7FB53A', c3:'#F2789F', c4:'#EFB100', c5:'#46B6C6',
      bg:'#F4FAF6', surface:'#FFFFFF', ink:'#14291F', muted:'#4F6B5B',
      line:'#D7E9DE', onC1:'#FFFFFF', onC3:'#3A1220', onC4:'#33260A' },
    { id:'pudra', ad:'Pudra & Gül Kurusu', not:'Yumuşak pembe + ahşap',
      c1:'#B85667', c2:'#588157', c3:'#DDA15E', c4:'#E9C46A', c5:'#E7C9D2',
      bg:'#FAF2F4', surface:'#FFFFFF', ink:'#2C2124', muted:'#6E5C61',
      line:'#ECE0E4', onC1:'#FFFFFF', onC3:'#2C2124', onC4:'#2C2124' },
    { id:'cam', ad:'Çam Ormanı', not:'Çam yeşili + terrakota',
      c1:'#1F3D2B', c2:'#4A7C59', c3:'#C08A54', c4:'#D2694A', c5:'#9DBCA8',
      bg:'#FAF7F2', surface:'#FFFFFF', ink:'#1D2620', muted:'#536157',
      line:'#E7E1D7', onC1:'#FFFFFF', onC3:'#1D2620', onC4:'#2C1A10' },
    { id:'adacayi', ad:'Ahşap & Adaçayı', not:'Japandi sakinliği',
      c1:'#6D7A48', c2:'#588157', c3:'#C59B6D', c4:'#D4A373', c5:'#BFCBA4',
      bg:'#F7F5F0', surface:'#FFFFFF', ink:'#2B2925', muted:'#5E5B54',
      line:'#E6E2D8', onC1:'#FFFFFF', onC3:'#2B2925', onC4:'#2B2925' },
    { id:'terrakota', ad:'Güneşli Bahçe', not:'Terrakota + turkuaz',
      c1:'#D2411D', c2:'#2A9D8F', c3:'#F4A261', c4:'#E9C46A', c5:'#F2C9B4',
      bg:'#FAF6EE', surface:'#FFFFFF', ink:'#261E1A', muted:'#61524B',
      line:'#EDE6D9', onC1:'#FFFFFF', onC3:'#261E1A', onC4:'#261E1A' }
  ];

  var WA_NUMARA = '905446012418';
  var WA_GOSTER = '+90 544 601 24 18';

  /* Aynı alan adında birden fazla demo olduğu için anahtarlar ayrık tutulur. */
  var A_PALET = 'anaokulu_palet', A_KAPALI = 'anaokulu_cubuk_kapali',
      A_BOLUM = 'anaokulu_bolum', A_IPUCU = 'anaokulu_ipucu';

  var kok = document.documentElement;
  var aktifNo = document.body.getAttribute('data-tasarim-no') || '1';

  /* Tasarımların ortak bölüm kimlikleri — geçişte konum korumak için */
  var BOLUMLER = ['tepe','hakkimizda','felsefe','egitim','yas','branslar',
                  'gunumuz','rehberlik','galeri','iletisim'];

  function oku(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function yaz(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

  function paletBul(id){
    for (var i=0;i<PALETLER.length;i++) if (PALETLER[i].id===id) return PALETLER[i];
    return PALETLER[0];
  }
  function paletUygula(p){
    var m = { '--c1':p.c1,'--c2':p.c2,'--c3':p.c3,'--c4':p.c4,'--c5':p.c5,
              '--bg':p.bg,'--surface':p.surface,'--ink':p.ink,'--muted':p.muted,
              '--line':p.line,'--on-c1':p.onC1,'--on-c3':p.onC3,'--on-c4':p.onC4 };
    for (var k in m) if (m.hasOwnProperty(k)) kok.style.setProperty(k,m[k]);
    kok.setAttribute('data-palet', p.id);
  }
  /* Boyamadan önce uygula — açılışta renk sıçraması olmasın */
  paletUygula(paletBul(oku(A_PALET) || 'cimen'));

  function tasarimBul(no){
    for (var i=0;i<TASARIMLAR.length;i++)
      if (String(TASARIMLAR[i].no)===String(no)) return TASARIMLAR[i];
    return TASARIMLAR[0];
  }

  var STIL = [
'#sc,#scAlt{--sc-bg:#17161B;--sc-cizgi:rgba(255,255,255,.14)}',
'#sc *,#scAlt *,#scPanel *,#scPencere *{box-sizing:border-box}',
'#sc{position:fixed;top:0;left:0;right:0;z-index:900;background:var(--sc-bg);color:#fff;',
'font:500 13px/1.2 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;',
'border-bottom:1px solid var(--sc-cizgi);transition:transform .28s cubic-bezier(.4,0,.2,1)}',
'#sc[kapali]{transform:translateY(-105%)}',
'#sc .sc-ic{max-width:1680px;margin:0 auto;padding:8px 18px;display:flex;align-items:center;gap:10px}',
'#sc .sc-mark{display:flex;align-items:center;gap:7px;color:rgba(255,255,255,.55);font-size:11px;',
'text-transform:uppercase;letter-spacing:.1em;white-space:nowrap;flex:none}',
'#sc .sc-nokta{width:7px;height:7px;border-radius:50%;background:#4ADE80;flex:none}',
'#sc .sc-ayrac{width:1px;height:22px;background:var(--sc-cizgi);flex:none}',
'#sc .sc-grup{display:flex;gap:5px;align-items:center;min-width:0}',
'#sc .sc-kaydir{overflow-x:auto;scrollbar-width:none;padding:1px;flex:0 1 auto}',
'#sc .sc-kaydir::-webkit-scrollbar{display:none}',
'.sc-d{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:8px;',
'background:rgba(255,255,255,.08);color:rgba(255,255,255,.86);text-decoration:none;',
'border:1px solid transparent;cursor:pointer;font:inherit;white-space:nowrap;min-height:32px;',
'transition:background .15s,color .15s}',
'.sc-d:hover{background:rgba(255,255,255,.18);color:#fff}',
'.sc-d:focus-visible{outline:2px solid #6EE7A8;outline-offset:2px}',
'.sc-d[aria-current="page"],.sc-d[aria-pressed="true"]{background:#fff;color:#17161B;',
'border-color:#fff;font-weight:700}',
'.sc-serit{display:flex;width:30px;height:11px;border-radius:3px;overflow:hidden;flex:none;',
'box-shadow:inset 0 0 0 1px rgba(255,255,255,.32)}',
'.sc-d[aria-pressed="true"] .sc-serit{box-shadow:inset 0 0 0 1px rgba(0,0,0,.3)}',
'.sc-serit i{flex:1}',
'#sc .sc-gonder{margin-left:auto;background:#2FA96A;color:#fff;font-weight:700;flex:none}',
'#sc .sc-gonder:hover{background:#268A56;color:#fff}',
'#sc .sc-gizle{background:transparent;border-color:rgba(255,255,255,.24);flex:none;padding:7px 9px}',
'#sc .sc-renk{flex:none;gap:8px;font-weight:600}',
'#scAlt{position:fixed;left:0;right:0;bottom:0;z-index:900;display:none;background:var(--sc-bg);',
'color:#fff;border-top:1px solid var(--sc-cizgi);',
'padding:9px 12px calc(9px + env(safe-area-inset-bottom,0px));gap:8px;',
'font:600 13px/1.2 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;',
'transition:transform .28s cubic-bezier(.4,0,.2,1);box-shadow:0 -6px 24px rgba(0,0,0,.28)}',
'#scAlt[kapali]{transform:translateY(115%)}',
'#scAlt .sc-d{flex:1;justify-content:center;min-height:46px;padding:8px 10px}',
'#scAlt .sc-gonder{background:#2FA96A;color:#fff}',
'#scAc{position:fixed;z-index:901;display:none;align-items:center;gap:8px;padding:10px 15px;',
'border:none;border-radius:999px;background:#17161B;color:#fff;cursor:pointer;min-height:42px;',
'font:700 12.5px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;',
'box-shadow:0 8px 24px rgba(0,0,0,.34)}',
'#scAc[gorunur]{display:inline-flex}',
'#scAc:hover{background:#2A2830}',
'#scAc:focus-visible{outline:2px solid #6EE7A8;outline-offset:2px}',
'#scPanel{position:fixed;inset:0;z-index:1200;display:none;align-items:center;',
'justify-content:center;padding:20px;',
'background:rgba(8,10,12,.58)}',
'#scPanel[open]{display:flex}',
'#scPanel .sp-ic{background:#fff;color:#17161B;width:100%;max-width:440px;border-radius:20px;',
'padding:8px 18px 20px;max-height:84vh;overflow-y:auto;box-shadow:0 26px 60px rgba(0,0,0,.34);',
'font:400 15px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}',
'#scPanel .sp-tut{display:none}',
'#scPanel h2{margin:0 0 4px;font-size:17px;font-weight:800}',
'#scPanel .sp-alt{margin:0 0 16px;font-size:13.5px;color:#6B6B77}',
'#scPanel .sp-liste{display:flex;flex-direction:column;gap:8px}',
'#scPanel .sp-oge{display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:13px;',
'border:2px solid #ECECF1;background:#fff;text-decoration:none;color:inherit;cursor:pointer;',
'font:inherit;text-align:left;width:100%;min-height:58px}',
'#scPanel .sp-oge[aria-current="page"],#scPanel .sp-oge[aria-pressed="true"]',
'{border-color:#17161B;background:#F7F7FA}',
'#scPanel .sp-no{width:30px;height:30px;border-radius:9px;background:#17161B;color:#fff;',
'display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex:none}',
'#scPanel .sp-oge b{display:block;font-size:15px;font-weight:700}',
'#scPanel .sp-oge small{display:block;font-size:12.5px;color:#6B6B77}',
'.sp-serit{display:flex;width:54px;height:28px;border-radius:8px;overflow:hidden;flex:none;',
'box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)}',
'.sp-serit i{flex:1}',
'#scPanel .sp-kapat{width:100%;margin-top:12px;padding:13px;border-radius:12px;border:none;',
'background:#F1F1F5;color:#17161B;font:700 15px/1 inherit;cursor:pointer;min-height:48px}',
'#scIpucu{position:fixed;z-index:902;display:none;max-width:290px;padding:14px 16px;',
'border-radius:14px;background:#2FA96A;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.3);',
'font:600 13.5px/1.45 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}',
'#scIpucu[gorunur]{display:block}',
'#scIpucu button{margin-top:10px;padding:8px 14px;border:none;border-radius:8px;background:#fff;',
'color:#17161B;font:700 12.5px/1 inherit;cursor:pointer;min-height:36px}',
'#scPencere{position:fixed;inset:0;z-index:2000;display:none;align-items:center;',
'justify-content:center;padding:18px;background:rgba(8,10,12,.66)}',
'#scPencere[open]{display:flex}',
'#scPencere .sp-kutu{background:#fff;color:#17161B;border-radius:20px;max-width:430px;width:100%;',
'padding:26px;box-shadow:0 26px 60px rgba(0,0,0,.34);max-height:90vh;overflow-y:auto;',
'font:400 15px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}',
'#scPencere h2{margin:0 0 6px;font-size:20px;font-weight:800}',
'#scPencere .sp-not{color:#6B6B77;font-size:13.5px;margin:0 0 18px}',
'#scPencere .sp-ozet{background:#F5F5F9;border-radius:14px;padding:16px;margin-bottom:14px}',
'#scPencere .sp-ozet b{display:block;font-size:16px;font-weight:800}',
'#scPencere .sp-ozet span{display:block;color:#6B6B77;font-size:13.5px;margin-top:3px}',
'#scPencere .sp-serit2{display:flex;height:12px;border-radius:5px;overflow:hidden;margin-top:12px}',
'#scPencere .sp-serit2 i{flex:1}',
'#scPencere .sp-tel{display:flex;align-items:center;gap:9px;padding:12px 14px;border-radius:12px;',
'background:#F5F5F9;text-decoration:none;color:#17161B;font-weight:700;margin-bottom:14px;',
'min-height:48px}',
'#scPencere .sp-dug{display:flex;gap:9px;flex-wrap:wrap}',
'#scPencere .sp-dug > *{flex:1;min-width:140px;padding:14px 16px;border-radius:12px;border:none;',
'cursor:pointer;font:700 15px/1 inherit;text-align:center;text-decoration:none;min-height:50px;',
'display:inline-flex;align-items:center;justify-content:center;gap:7px}',
'#scPencere .sp-wa{background:#25D366;color:#08321B}',
'#scPencere .sp-kop{background:#17161B;color:#fff}',
'#scPencere .sp-vaz{flex:0 0 100%;background:transparent;color:#6B6B77;min-height:40px;padding:8px}',
'#scPencere :focus-visible,#scPanel :focus-visible{outline:2px solid #2FA96A;outline-offset:2px}',
'.demo-logo-img{display:block;height:100%;width:auto;max-height:100%}',
'.demo-logo{display:block;height:100%;width:auto;aspect-ratio:1/1}',
'@media (max-width:860px){',
'  #sc{display:none}#scAlt{display:flex}',
'  #scPanel{align-items:flex-end;padding:0}',
'  #scPanel .sp-ic{max-width:none;border-radius:20px 20px 0 0;',
'    padding:8px 16px calc(20px + env(safe-area-inset-bottom,0px))}',
'  #scPanel .sp-tut{display:block;width:42px;height:4px;border-radius:99px;',
'    background:#D9D9E0;margin:6px auto 14px}',
'  #scAc{left:50%;transform:translateX(-50%);bottom:14px}',
'  #scIpucu{left:14px;right:14px;bottom:80px;max-width:none}',
'}',
'@media (min-width:861px){#scAc{top:10px;right:14px}#scIpucu{top:58px;right:14px}}',
'@media (prefers-reduced-motion:reduce){#sc,#scAlt{transition:none}}'
  ].join('');

  /* Genel demo logosu — palet renklerini kullanır, her temada uyumlu kalır.
     Okulun kendi logosu geldiğinde bu fonksiyon <img> ile değiştirilir. */
  var LOGO_SVG =
    '<svg class="demo-logo" viewBox="0 0 48 48" role="img" aria-label="Örnek Anaokulu">' +
      '<rect x="1.5" y="1.5" width="45" height="45" rx="13" ' +
        'fill="var(--c1)" stroke="var(--c1)" stroke-width="1.5"/>' +
      '<circle cx="35" cy="13" r="3.6" fill="var(--c4)"/>' +
      '<path d="M24 37V22" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M24 24.5c0-5.4 4.4-9.8 9.8-9.8 0 5.4-4.4 9.8-9.8 9.8Z" fill="#fff"/>' +
      '<path d="M24 30c0-4.5-3.6-8.1-8.1-8.1 0 4.5 3.6 8.1 8.1 8.1Z" fill="#fff" opacity=".72"/>' +
    '</svg>';

  function logoYerlestir(){
    var yuvalar = document.querySelectorAll('[data-logo]');
    /* Önce SVG yer tutucuyu koy — sayfa hiçbir zaman boş görünmesin */
    Array.prototype.forEach.call(yuvalar, function (yuva) { yuva.innerHTML = LOGO_SVG; });

    /* ortak/logo.png varsa onunla değiştir (okulun kendi logosu) */
    var img = new Image();
    img.onload = function () {
      Array.prototype.forEach.call(yuvalar, function (yuva) {
        var k = img.cloneNode();
        k.alt = 'Örnek Anaokulu';
        k.className = 'demo-logo-img';
        k.decoding = 'async';
        yuva.innerHTML = '';
        yuva.appendChild(k);
      });
    };
    img.src = '/anaokulu-demo/ortak/logo-amblem.png';
  }

  function gorunenBolum(){
    var enIyi=null, enKucuk=Infinity;
    BOLUMLER.forEach(function(id){
      var el=document.getElementById(id); if(!el) return;
      var t=el.getBoundingClientRect().top, d=Math.abs(t-90);
      if (t < window.innerHeight*0.75 && d < enKucuk){ enKucuk=d; enIyi=id; }
    });
    return enIyi;
  }
  function bolumGeriYukle(){
    var id=oku(A_BOLUM); if(!id) return;
    yaz(A_BOLUM,'');
    var el=document.getElementById(id);
    if(!el || id==='tepe') return;
    setTimeout(function(){ el.scrollIntoView({behavior:'auto',block:'start'}); }, 140);
  }

  function kur(){
    var stil=document.createElement('style'); stil.textContent=STIL; document.head.appendChild(stil);
    var aktifT=tasarimBul(aktifNo);

    function seritHTML(p,sinif){
      return '<span class="'+(sinif||'sc-serit')+'" aria-hidden="true">'+
        '<i style="background:'+p.c1+'"></i><i style="background:'+p.c2+'"></i>'+
        '<i style="background:'+p.c3+'"></i><i style="background:'+p.c4+'"></i>'+
        '<i style="background:'+p.c5+'"></i></span>';
    }
    var IK_TIK='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
      'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
      '<path d="M20 6 9 17l-5-5"/></svg>';

    /* üst bar */
    var ust=document.createElement('div'); ust.id='sc';
    var h='<div class="sc-ic"><span class="sc-mark"><span class="sc-nokta"></span>Tasarım sunumu</span>'+
      '<span class="sc-ayrac"></span><div class="sc-grup sc-kaydir" role="navigation" '+
      'aria-label="Tasarım seçimi">';
    TASARIMLAR.forEach(function(t){
      h+='<a class="sc-d" href="'+t.dosya+'" data-tasarim="'+t.no+'"'+
         (String(t.no)===aktifNo?' aria-current="page"':'')+'>'+t.no+'. '+t.ad+'</a>';
    });
    h+='</div><span class="sc-ayrac"></span>'+
       '<button type="button" class="sc-d sc-renk" data-panel="renk" aria-haspopup="dialog">'+
       '<span data-renk-serit-ust></span><span data-renk-ad-ust></span>'+
       '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
       'stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
       '<path d="m6 9 6 6 6-6"/></svg></button>'+
       '<button type="button" class="sc-d sc-gonder" data-ac-pencere>'+IK_TIK+
       'Seçimimi gönder</button>'+
       '<button type="button" class="sc-d sc-gizle" data-gizle aria-label="Sunum çubuğunu gizle" '+
       'title="Gizle (Ctrl+Alt+T)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" '+
       'stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" '+
       'aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg></button></div>';
    ust.innerHTML=h; document.body.appendChild(ust);

    /* alt bar (mobil) */
    var alt=document.createElement('div'); alt.id='scAlt';
    alt.innerHTML=
      '<button type="button" class="sc-d" data-panel="tasarim">'+
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
        'stroke-width="2.2" stroke-linecap="round" aria-hidden="true">'+
        '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/></svg>'+
        'Tasarım '+aktifT.no+'</button>'+
      '<button type="button" class="sc-d" data-panel="renk" aria-label="Renk paleti seç">'+
        '<span data-renk-serit></span>Renk</button>'+
      '<button type="button" class="sc-d sc-gonder" data-ac-pencere>'+IK_TIK+'Gönder</button>'+
      '<button type="button" class="sc-d sc-gizle" data-gizle style="flex:0 0 46px" '+
      'aria-label="Sunum çubuğunu gizle"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" '+
      'stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" '+
      'aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>';
    document.body.appendChild(alt);

    var acDug=document.createElement('button'); acDug.id='scAc'; acDug.type='button';
    acDug.setAttribute('aria-label','Sunum çubuğunu göster'); document.body.appendChild(acDug);

    var panel=document.createElement('div'); panel.id='scPanel';
    panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true');
    panel.innerHTML='<div class="sp-ic"><div class="sp-tut"></div><h2 data-p-bas></h2>'+
      '<p class="sp-alt" data-p-alt></p><div class="sp-liste" data-p-liste></div>'+
      '<button type="button" class="sp-kapat" data-p-kapat>Kapat</button></div>';
    document.body.appendChild(panel);

    var pen=document.createElement('div'); pen.id='scPencere';
    pen.setAttribute('role','dialog'); pen.setAttribute('aria-modal','true');
    pen.setAttribute('aria-labelledby','scPenBaslik');
    pen.innerHTML='<div class="sp-kutu"><h2 id="scPenBaslik">Seçiminiz hazır</h2>'+
      '<p class="sp-not">Aşağıdaki bilgiyi bize iletin, bu kombinasyonla devam edelim.</p>'+
      '<div class="sp-ozet" id="scOzet"></div>'+
      '<a class="sp-tel" href="tel:+'+WA_NUMARA+'"><svg width="18" height="18" viewBox="0 0 24 24" '+
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" '+
      'stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 '+
      '1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 '+
      '.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8'+
      '.7a2 2 0 0 1 1.7 2Z"/></svg>'+WA_GOSTER+'</a>'+
      '<div class="sp-dug"><a class="sp-wa" id="scWa" target="_blank" rel="noopener">'+
      'WhatsApp ile gönder</a><button type="button" class="sp-kop" id="scKopya">Metni kopyala</button>'+
      '<button type="button" class="sp-vaz" id="scVaz">Vazgeç</button></div></div>';
    document.body.appendChild(pen);

    var ipucu=document.createElement('div'); ipucu.id='scIpucu';
    ipucu.innerHTML='6 farklı tasarım ve 9 renk paleti hazırladık. Buradan gezip beğendiğinizi '+
      'tek tuşla bize gönderebilirsiniz.<br><button type="button" id="scIpucuTamam">Anladım</button>';
    document.body.appendChild(ipucu);

    /* ── davranış ── */
    function renkSeritYenile(){
      var p=paletBul(kok.getAttribute('data-palet'));
      var y=document.querySelector('[data-renk-serit]');
      if(y){ y.innerHTML=seritHTML(p); }
      var yu=document.querySelector('[data-renk-serit-ust]');
      if(yu){ yu.innerHTML=seritHTML(p); }
      var ad=document.querySelector('[data-renk-ad-ust]');
      if(ad){ ad.textContent=p.ad; }
      acDug.innerHTML=seritHTML(p)+'Tasarım '+aktifT.no;
    }
    function paletDugYenile(){
      var id=kok.getAttribute('data-palet');
      Array.prototype.forEach.call(document.querySelectorAll('[data-palet-sec]'),function(d){
        d.setAttribute('aria-pressed', d.getAttribute('data-palet-sec')===id ? 'true':'false');
      });
      renkSeritYenile();
    }
    function paletSec(id){ paletUygula(paletBul(id)); yaz(A_PALET,id); paletDugYenile(); }

    function boslukAyarla(){
      var kapali=ust.hasAttribute('kapali');
      var mobil=window.matchMedia('(max-width:860px)').matches;
      var y=(!kapali && !mobil) ? ust.offsetHeight : 0;
      document.body.style.paddingTop=y+'px';
      kok.style.setProperty('--sunum-yukseklik', y+'px');
      kok.style.scrollPaddingTop=(y+16)+'px';
      document.body.style.paddingBottom=((!kapali && mobil) ? alt.offsetHeight : 0)+'px';
    }
    function durum(kapat){
      if(kapat){ ust.setAttribute('kapali',''); alt.setAttribute('kapali','');
                 acDug.setAttribute('gorunur',''); }
      else { ust.removeAttribute('kapali'); alt.removeAttribute('kapali');
             acDug.removeAttribute('gorunur'); }
      yaz(A_KAPALI, kapat?'1':'0'); renkSeritYenile(); boslukAyarla();
    }

    var oncekiOdak=null;
    function panelAc(tip){
      var bas=panel.querySelector('[data-p-bas]'), al=panel.querySelector('[data-p-alt]'),
          lis=panel.querySelector('[data-p-liste]'), h='';
      if(tip==='tasarim'){
        bas.textContent='Tasarım seçin';
        al.textContent='Altı tasarımın içeriği aynı; düzen, tipografi ve karakter değişiyor.';
        TASARIMLAR.forEach(function(t){
          h+='<a class="sp-oge" href="'+t.dosya+'" data-tasarim="'+t.no+'"'+
             (String(t.no)===aktifNo?' aria-current="page"':'')+'>'+
             '<span class="sp-no">'+t.no+'</span><span><b>'+t.ad+'</b>'+
             '<small>Tasarım '+t.no+'</small></span></a>';
        });
      } else {
        bas.textContent='Renk paleti seçin';
        al.textContent='Renk, tasarımdan bağımsızdır. Dokuzu da okunabilirlik testinden geçti.';
        PALETLER.forEach(function(p){
          h+='<button type="button" class="sp-oge" data-palet-sec="'+p.id+'" aria-pressed="'+
             (kok.getAttribute('data-palet')===p.id)+'">'+seritHTML(p,'sp-serit')+
             '<span><b>'+p.ad+'</b><small>'+p.not+'</small></span></button>';
        });
      }
      lis.innerHTML=h;
      oncekiOdak=document.activeElement;
      panel.setAttribute('open',''); document.body.style.overflow='hidden';
      var ilk=lis.querySelector('.sp-oge'); if(ilk) ilk.focus();
    }
    function panelKapat(){
      panel.removeAttribute('open'); document.body.style.overflow='';
      if(oncekiOdak) oncekiOdak.focus();
    }

    function secim(){
      var p=paletBul(kok.getAttribute('data-palet'));
      return { t:aktifT, p:p,
        metin:'Merhaba Rodi Medya,\n\nAnaokulu web sitesi demonuzdaki seçimim:\n'+
              '🌿 Tasarım: '+aktifT.no+'. '+aktifT.ad+'\n🎨 Renk paleti: '+p.ad+
              '\n\nBu kombinasyonla ilerlemek istiyorum.' };
    }
    function pencereAc(){
      var s=secim();
      document.getElementById('scOzet').innerHTML=
        '<b>Tasarım '+s.t.no+' — '+s.t.ad+'</b><span>Renk paleti: '+s.p.ad+'</span>'+
        '<span class="sp-serit2" aria-hidden="true"><i style="background:'+s.p.c1+'"></i>'+
        '<i style="background:'+s.p.c2+'"></i><i style="background:'+s.p.c3+'"></i>'+
        '<i style="background:'+s.p.c4+'"></i><i style="background:'+s.p.c5+'"></i></span>';
      document.getElementById('scWa').href='https://wa.me/'+WA_NUMARA+'?text='+
        encodeURIComponent(s.metin);
      oncekiOdak=document.activeElement;
      pen.setAttribute('open',''); document.body.style.overflow='hidden';
      document.getElementById('scWa').focus();
    }
    function pencereKapat(){
      pen.removeAttribute('open'); document.body.style.overflow='';
      if(oncekiOdak) oncekiOdak.focus();
    }

    document.addEventListener('click', function(e){
      var t=e.target;
      if(!t.closest) return;
      var pd=t.closest('[data-palet-sec]');
      if(pd){ paletSec(pd.getAttribute('data-palet-sec')); if(panel.hasAttribute('open')) panelKapat(); return; }
      var td=t.closest('a[data-tasarim]');
      if(td){ var b=gorunenBolum(); if(b) yaz(A_BOLUM,b); return; }
      if(t.closest('[data-gizle]')){ durum(true); return; }
      var pb=t.closest('[data-panel]');
      if(pb){ panelAc(pb.getAttribute('data-panel')); return; }
      if(t.closest('[data-p-kapat]') || t===panel){ panelKapat(); return; }
      if(t.closest('[data-ac-pencere]')){ panelKapat(); pencereAc(); return; }
      if(t===pen){ pencereKapat(); }
    });

    acDug.addEventListener('click', function(){ durum(false); });
    document.getElementById('scVaz').addEventListener('click', pencereKapat);
    document.addEventListener('keydown', function(e){
      if((e.ctrlKey||e.metaKey) && e.altKey && (e.key==='t'||e.key==='T')){
        e.preventDefault(); durum(!ust.hasAttribute('kapali')); return;
      }
      if(e.key==='Escape'){
        if(pen.hasAttribute('open')) pencereKapat();
        else if(panel.hasAttribute('open')) panelKapat();
      }
    });
    document.getElementById('scKopya').addEventListener('click', function(){
      var d=this, m=secim().metin;
      function bitti(){ d.textContent='Kopyalandı ✓';
        setTimeout(function(){ d.textContent='Metni kopyala'; },2200); }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(m).then(bitti,bitti);
      } else {
        var a=document.createElement('textarea'); a.value=m; document.body.appendChild(a); a.select();
        try{ document.execCommand('copy'); }catch(err){}
        document.body.removeChild(a); bitti();
      }
    });

    if(!oku(A_IPUCU)){
      setTimeout(function(){ ipucu.setAttribute('gorunur',''); },1500);
      setTimeout(function(){ ipucu.removeAttribute('gorunur'); yaz(A_IPUCU,'1'); },12000);
    }
    document.getElementById('scIpucuTamam').addEventListener('click', function(){
      ipucu.removeAttribute('gorunur'); yaz(A_IPUCU,'1');
    });

    paletDugYenile();
    durum(oku(A_KAPALI)==='1');
    window.addEventListener('resize', boslukAyarla);
    bolumGeriYukle();
  }

  function baslat(){ kur(); logoYerlestir(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', baslat);
  else baslat();
})();
