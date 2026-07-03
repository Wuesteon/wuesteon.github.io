/* wAIser.dev — hero terminal typer + Agent Opportunity Scan (bilingual).
   Both are guarded on element presence, so a page can include this safely
   whether or not it uses the terminal. */
(function(){
  function lang(){ return (typeof getCurrentLang === "function" ? getCurrentLang() : "de"); }

  /* ---------------- hero terminal (optional; #nterm-body) ---------------- */
  var el=document.getElementById('nterm-body');
  if(el){
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){
      el.innerHTML='<span class="p">$</span> <span class="w">nils --what-i-do-for-you</span>\n<span class="g">→ agents that do the work your team hates</span>\n<span class="g">→ hardened so you can actually trust them</span>';
    } else {
      var lines=[
        {t:'$ ',c:'p',x:'nils --for-you',cl:'w'},
        {t:'',c:'c',x:'  reading your workflows ...'},
        {t:'',c:'h',x:'  found: repetitive work → automatable'},
        {t:'',c:'g',x:'→ AI agents that act, not just chat'},
        {t:'',c:'g',x:'→ automate the tasks your team hates'},
        {t:'',c:'g',x:'→ hardened against prompt-injection'},
        {t:'',c:'g',x:'→ self-hosted — your data stays yours'},
        {t:'',c:'g',x:'→ from idea to production in weeks'},
        {t:'$ ',c:'p',x:'nils --status',cl:'w'},
        {t:'',c:'h',x:'  available for a few select projects'},
      ];
      var out='', li=0, ci=0;
      (function frame(){
        if(li>=lines.length){ el.innerHTML=out+'<span class="ncur"></span>'; return; }
        var L=lines[li];
        if(ci===0 && L.t){ out+='<span class="'+L.c+'">'+L.t+'</span>'; }
        if(ci< L.x.length){ out+='<span class="'+(L.cl||L.c)+'">'+L.x[ci].replace('<','&lt;')+'</span>'; ci++; el.innerHTML=out+'<span class="ncur"></span>'; setTimeout(frame, L.x[ci-1]===' '?8:22); }
        else { out+='\n'; li++; ci=0; setTimeout(frame, 260); }
      })();
    }
  }

  /* ---------------- Agent Opportunity Scan ---------------- */
  var form=document.getElementById('az-form');
  if(!form) return;
  var urlEl=document.getElementById('az-url'), runBtn=document.getElementById('az-run');
  var out=document.getElementById('az-out'), con=document.getElementById('az-console'), report=document.getElementById('az-report');
  var REDUCED=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* localized agent-opportunity pool */
  var POOL_EN=[
    {t:'Customer Support Agent', d:'Deflect the repetitive tickets, answer 24/7 from your own docs, escalate only what matters.', fit:'hi'},
    {t:'Lead Qualification Agent', d:'Reads every inbound enquiry, scores intent, and routes hot leads to you instantly.', fit:'hi'},
    {t:'Document Processing', d:'Extract, summarise and file contracts, invoices and forms — no manual data entry.', fit:'md'},
    {t:'Internal Knowledge Agent', d:'Your team asks in plain language, the agent answers from your internal docs & wiki.', fit:'md'},
    {t:'Onboarding Agent', d:'Walks new customers or hires through setup automatically, adapting to each step.', fit:'hi'},
    {t:'Content & SEO Agent', d:'Drafts and optimises pages in your brand voice, learned directly from your site.', fit:'md'},
    {t:'Ops Monitoring Agent', d:'Watches your systems and pings you the moment something drifts — before users notice.', fit:'md'}
  ];
  var POOL_DE=[
    {t:'Kundensupport-Agent', d:'Fängt die wiederkehrenden Tickets ab, antwortet rund um die Uhr aus deinen eigenen Docs, eskaliert nur, was zählt.', fit:'hi'},
    {t:'Lead-Qualifizierungs-Agent', d:'Liest jede eingehende Anfrage, bewertet die Absicht und leitet heiße Leads sofort an dich weiter.', fit:'hi'},
    {t:'Dokumenten-Verarbeitung', d:'Extrahiert, fasst zusammen und legt Verträge, Rechnungen und Formulare ab — ohne manuelle Dateneingabe.', fit:'md'},
    {t:'Internes Wissens-Agent', d:'Dein Team fragt in normaler Sprache, der Agent antwortet aus euren internen Docs & Wiki.', fit:'md'},
    {t:'Onboarding-Agent', d:'Führt neue Kunden oder Mitarbeitende automatisch durch das Setup und passt sich jedem Schritt an.', fit:'hi'},
    {t:'Content- & SEO-Agent', d:'Entwirft und optimiert Seiten in deiner Markenstimme — direkt von deiner Website gelernt.', fit:'md'},
    {t:'Ops-Monitoring-Agent', d:'Überwacht deine Systeme und meldet sich, sobald etwas abweicht — bevor Nutzer es merken.', fit:'md'}
  ];
  function pool(){ return lang()==='de' ? POOL_DE : POOL_EN; }
  function label(fit){
    if(lang()==='de') return fit==='hi' ? 'HOHER IMPACT' : 'MITTLERER IMPACT';
    return fit==='hi' ? 'HIGH IMPACT' : 'MEDIUM IMPACT';
  }
  function verdictText(score){
    if(lang()==='de') return score>=88
      ? 'Starker Fit. Diese drei Agenten würden sich schnell bezahlt machen.'
      : 'Guter Fit. Hier würden Agenten den größten Hebel schaffen.';
    return score>=88
      ? 'Strong fit. These three agents would pay for themselves fast.'
      : 'Good fit. Here’s where agents would create the most leverage.';
  }

  function hash(s){ var h=0; for(var i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))>>>0; } return h; }
  function cleanDomain(v){ return v.trim().replace(/^https?:\/\//i,'').replace(/^www\./i,'').replace(/\/.*$/,'').toLowerCase(); }

  /* ---- BACKEND HOOK ----------------------------------------------------
     Replace with a call to your scraper/analysis API, e.g.:
       const res = await fetch('/api/scan?url='+encodeURIComponent(domain));
       return await res.json();  // { score, verdict, ops:[{t,d,fit}] }
     For now it deterministically simulates a plausible result per domain. */
  function stubCompany(domain){
    var P=pool();
    var h=hash(domain), picks=[], used={}, i=0;
    while(picks.length<3 && i<40){ var idx=(h+i*7)%P.length; if(!used[idx]){ used[idx]=1; picks.push(P[idx]); } i++; }
    var score=78 + (h%18);
    return { score:score, ops:picks, verdict: verdictText(score) };
  }

  function scanLines(domain){
    if(lang()==='de') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  öffentliche Seiten laden ...... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  Inhalt & Struktur parsen ...... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  Stack & Workflows erkennen .... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  Agent-Chancen kartieren ....... '},{c:'h',x:'3 gefunden'},{nl:1},
      {c:'g',x:'✓ Analyse abgeschlossen'}
    ];
    return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  fetching public pages ......... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  parsing content & structure ... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  detecting stack & workflows ... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  mapping agent opportunities ... '},{c:'h',x:'3 found'},{nl:1},
      {c:'g',x:'✓ analysis complete'}
    ];
  }

  var SCAN_ENDPOINT = 'https://scan.waiser.dev/api/scan';
  function fetchScan(domain){
    var ctrl = new AbortController();
    var timer = setTimeout(function(){ ctrl.abort(); }, 28000); // Time budget: client abort 28s (above ~26s backend worst case: scrape 8 + guard 6 + analysis 12)
    return fetch(SCAN_ENDPOINT+'?url='+encodeURIComponent(domain)+'&lang='+lang(), { signal: ctrl.signal })
      .then(function(res){
        clearTimeout(timer);
        if(res.status===451||res.status===422){ return res.json().then(function(b){ var e=new Error('blocked'); e.soft=true; e.status=res.status; e.message=b.message; throw e; }); }
        if(!res.ok){ var e=new Error('http '+res.status); e.status=res.status; throw e; }
        return res.json();
      });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var domain=cleanDomain(urlEl.value);
    if(!domain || domain.indexOf('.')<1){ urlEl.focus(); return; }
    var scanning = lang()==='de' ? 'SCANNE…' : 'SCANNING…';
    var runLabel = (typeof getTranslation==='function') ? getTranslation('bw.scan.run') : 'RUN SCAN ▸';
    runBtn.disabled=true; runBtn.textContent=scanning;
    out.style.display='block'; report.style.display='none'; con.style.display='block'; con.innerHTML='';
    var scanP = fetchScan(domain).catch(function(err){
      if(err && err.soft){ throw err; }              // 451/422 → show honest message, no stub
      if(typeof umami!=='undefined'){ try{ umami.track('scan-fallback',{status:err&&err.status}); }catch(e){} }
      console.warn('[scan] fallback', err && (err.status||err.message));
      return stubCompany(domain);                     // network/other → graceful fake
    });
    var doneMsg = lang()==='de' ? '✓ Analyse abgeschlossen' : '✓ analysis complete';
    var animP;
    if(REDUCED){
      con.innerHTML='<span class="c">'+(lang()==='de'?'Scanne…':'Scanning…')+'</span>';
      animP=Promise.resolve();
    } else {
      animP=new Promise(function(resolve){
        var LINES=scanLines(domain), buf='', li=0, ci=0;
        (function type(){
          if(li>=LINES.length){ con.innerHTML=buf; return setTimeout(resolve, 300); }
          var L=LINES[li];
          if(L.nl){ buf+='\n'; li++; ci=0; return setTimeout(type, 90); }
          var txt=L.x;
          if(ci<txt.length){ if(ci===0){ buf+='<span class="'+L.c+'">'; } buf+=txt[ci]; ci++; con.innerHTML=buf+'</span><span class="azcur"></span>'; setTimeout(type, txt[ci-1]==='.'?10:16); }
          else { buf+='</span>'; li++; ci=0; setTimeout(type, 60); }
        })();
      });
    }
    Promise.all([scanP, animP]).then(function(r){
      if(REDUCED){ con.innerHTML='<span class="g">'+doneMsg+'</span>'; }
      finish(domain, r[0], runLabel);
    }).catch(function(err){
      // soft block (451/422): show honest message instead of a report
      con.innerHTML='<span class="h">'+(err.message||(lang()==='de'?'Diese Seite kann nicht gescannt werden.':'This site can\'t be scanned.'))+'</span>';
      runBtn.disabled=false; runBtn.textContent=runLabel;
    });
  });

  function finish(domain, data, runLabel){
    runBtn.disabled=false; runBtn.textContent=runLabel || 'RUN SCAN ▸';
    document.getElementById('az-target').textContent=domain;
    document.getElementById('az-verdict').textContent=data.verdict;
    var opsWrap=document.getElementById('az-ops');
    opsWrap.innerHTML=data.ops.map(function(o){
      return '<div class="op"><span class="op__fit '+o.fit+'">'+label(o.fit)+'</span><div class="op__t">'+o.t+'</div><div class="op__d">'+o.d+'</div></div>';
    }).join('');
    report.style.display='block';
    var scoreEl=document.getElementById('az-score'), target=data.score, t0=null;
    if(REDUCED){ scoreEl.textContent=target; } else {
      (function anim(ts){ if(!t0)t0=ts; var p=Math.min(1,(ts-t0)/900); scoreEl.textContent=Math.round(p*target); if(p<1) requestAnimationFrame(anim); })(performance.now());
    }
    opsWrap.querySelectorAll('.op').forEach(function(c,i){ setTimeout(function(){ c.classList.add('in'); }, REDUCED?0:120+i*130); });
  }
})();
