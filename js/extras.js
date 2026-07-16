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

  /* ops text (t/d) is model-generated and reflects scraped page content — never
     trust it as HTML. Escape before interpolating into innerHTML. */
  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  /* Impact label for an opportunity card (ops text itself comes from the backend). */
  function label(fit){
    var l=lang();
    if(l==='de') return fit==='hi' ? 'HOHER IMPACT' : 'MITTLERER IMPACT';
    if(l==='zh') return fit==='hi' ? '高影响' : '中等影响';
    return fit==='hi' ? 'HIGH IMPACT' : 'MEDIUM IMPACT';
  }

  function cleanDomain(v){ return v.trim().replace(/^https?:\/\//i,'').replace(/^www\./i,'').replace(/\/.*$/,'').toLowerCase(); }

  // Neutral progress lines — TRUE whether or not the live fetch succeeds (a
  // bot-walled site yields a public-knowledge result, so no line may assert a
  // successful fetch/parse). The completion/"ok" claims are gone; the console
  // holds on a working line until the REAL fetch settles (see submit handler).
  // domain is user-typed → escaped here, the single chokepoint before innerHTML.
  function scanLines(domain){
    domain = esc(domain);
    if(lang()==='de') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  Seite abrufen …'},{nl:1},
      {c:'c',x:'  Seite & Struktur prüfen …'},{nl:1},
      {c:'c',x:'  Agent-Chancen kartieren …'},{nl:1}
    ];
    if(lang()==='zh') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  访问网站 …'},{nl:1},
      {c:'c',x:'  检查网站与结构 …'},{nl:1},
      {c:'c',x:'  梳理智能体机会 …'},{nl:1}
    ];
    return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  reaching site …'},{nl:1},
      {c:'c',x:'  checking site & structure …'},{nl:1},
      {c:'c',x:'  mapping agent opportunities …'},{nl:1}
    ];
  }

  var SCAN_ENDPOINT = 'https://scan.waiser.dev/api/scan';
  var currentDomain = '';   // set at submit time; used to template block copy
  var runSeq = 0; // increments per submit; stale runs bail (concurrent-submit guard)
  function t(key){ return (typeof getTranslation==='function') ? getTranslation(key) : ''; }

  // Umami: never send the typed domain (privacy). Prefer trackEvent() from main.js.
  function trackScan(name, data){
    if(typeof trackEvent==='function'){ trackEvent(name, data); return; }
    if(typeof umami!=='undefined' && umami.track){ try{ umami.track(name, data); }catch(e){} }
  }

  // Route purely off HTTP status + the JSON `error` code / `blocked`/`source` fields.
  // NEVER fabricate: a non-2xx becomes a soft (honest-message) error, not a fake report.
  function fetchScan(domain){
    var ctrl = new AbortController();
    var timer = setTimeout(function(){ ctrl.abort(); }, 30000); // client abort; per-tier budget is server-side (see Phase B)
    return fetch(SCAN_ENDPOINT+'?url='+encodeURIComponent(domain)+'&lang='+lang(), { signal: ctrl.signal })
      .then(function(res){
        clearTimeout(timer);
        return res.json().then(function(b){ return { status: res.status, ok: res.ok, body: b || {} }; },
                              function(){ return { status: res.status, ok: res.ok, body: {} }; });
      })
      .then(function(r){
        var b = r.body;
        // 2xx → a real result (live / rendered / knowledge). finish() renders it; the
        // knowledge banner is driven by b.source === 'knowledge'.
        if(r.status>=200 && r.status<300){ return b; }
        // rate/daily limit / thin → honest soft message (existing behavior).
        if(r.status===451 || r.status===422 || r.status===429){
          var e=new Error('soft'); e.soft=true; e.status=r.status; e.code=b.error; e.message=softMessage(r.status, b); throw e;
        }
        // bot-protection block (DataDome et al.): FETCH_FAILED / BLOCKED / any blocked:true.
        // Honest, protector-aware message + a personal-outreach CTA — never a fake result.
        if(b.error==='FETCH_FAILED' || b.error==='BLOCKED' || b.blocked===true){
          var eb=new Error('blocked'); eb.soft=true; eb.status=r.status; eb.code='BLOCKED_SITE';
          eb.blocked=true; eb.message=blockedMessage(b.protector); throw eb;
        }
        // anything else non-2xx (500/502 with no useful body) → honest "unavailable".
        var e2=new Error('unavailable'); e2.soft=true; e2.status=r.status; e2.code='UNAVAILABLE'; e2.message=unavailableMessage(); throw e2;
      });
  }

  // Honest, localized copy for the soft-error cases (block / thin / limits).
  function softMessage(status, body){
    var l=lang();
    if(body && body.error==='DAILY_LIMIT'){
      if(l==='de') return 'Das kostenlose Tageslimit an Scans ist erreicht. Versuch es morgen wieder — oder buch direkt ein Gespräch.';
      if(l==='zh') return '今日的免费扫描额度已用完。明天再试——或直接预约一次通话。';
      return "Today's free-scan limit is reached. Try again tomorrow — or just book a call.";
    }
    if(status===429){
      if(l==='de') return 'Zu viele Scans in kurzer Zeit. Bitte einen Moment warten und erneut versuchen.';
      if(l==='zh') return '短时间内扫描次数过多。请稍候片刻再试。';
      return "Too many scans in a short time. Please wait a moment and try again.";
    }
    // 451/422 — trust the backend's fixed message, fall back to a localized default.
    if(body && body.message) return body.message;
    if(l==='de') return 'Diese Seite kann nicht gescannt werden.';
    if(l==='zh') return '该网站无法被扫描。';
    return "This site can't be scanned.";
  }

  // Bot-protection block: name the protector only when the backend proved it.
  function blockedMessage(protector){
    var l=lang(), key = protector ? 'bw.scan.blocked.named' : 'bw.scan.blocked.generic', tmpl = t(key);
    // protector is backend-controlled (detectProtector allowlist); domain is
    // user-typed and reaches innerHTML via con.innerHTML — must be escaped even
    // though no current translation string uses {domain} (defense against the
    // next template that does).
    if(tmpl) return tmpl.replace('{protector}', esc(protector || '')).replace('{domain}', esc(currentDomain));
    if(l==='de') return protector
      ? ('Diese Seite sitzt hinter Bot-Schutz ('+protector+') — automatisierte Analysen werden blockiert. Genau solche Fälle schaue ich mir persönlich an — buch dir ein Gespräch.')
      : 'Diese Seite blockiert automatisierte Analysen (Bot-Schutz). Genau solche Fälle schaue ich mir persönlich an — buch dir ein Gespräch.';
    if(l==='zh') return protector
      ? ('该网站位于机器人防护（'+protector+'）之后——自动分析被拦截。这类情况我会亲自来看——欢迎预约通话。')
      : '该网站屏蔽了自动分析（机器人防护）。这类情况我会亲自来看——欢迎预约通话。';
    return protector
      ? ('This site sits behind bot protection ('+protector+') — automated scans are blocked. I look at cases like this personally — book a call.')
      : 'This site blocks automated scanning (bot protection). I look at cases like this personally — book a call.';
  }

  // Backend/service unreachable (network error, edge 5xx with no useful body).
  function unavailableMessage(){
    var l=lang(), tmpl=t('bw.scan.unavailable');
    if(tmpl) return tmpl;
    if(l==='de') return 'Der Live-Scan ist gerade nicht erreichbar. Bitte später erneut versuchen — oder direkt ein Gespräch buchen.';
    if(l==='zh') return '实时扫描暂时不可用。请稍后再试——或直接预约一次通话。';
    return "The live scan is temporarily unavailable. Please try again later — or just book a call.";
  }

  // Final console line, derived from the REAL result. Honest-by-default: the
  // green ✓ + "live analysis" wording is reserved for a genuine live/rendered
  // scan; knowledge/unknown/undefined → the terse public-knowledge line (the
  // full disclosure lives in the report banner). Keys have inline fallbacks so a
  // missing translation never blanks the line.
  function finalLine(source){
    var live = (source==='live' || source==='rendered');
    var key = live ? 'bw.scan.final.live' : 'bw.scan.final.knowledge';
    var tmpl = t(key); if(tmpl) return tmpl;
    var l=lang();
    if(live){
      if(l==='de') return '✓ Live-Analyse abgeschlossen';
      if(l==='zh') return '✓ 实时分析完成';
      return '✓ live analysis complete';
    }
    if(l==='de') return '· Ergebnis aus öffentlichem Wissen (kein Live-Scan)';
    if(l==='zh') return '· 结果基于公开信息（非实时扫描）';
    return '· result from public knowledge (no live scan)';
  }

  // Write to the polite aria-live region (SR-only). Never announces "complete"
  // until called from the settle path.
  var liveEl = document.getElementById('az-live');
  function announce(text){ if(liveEl){ liveEl.textContent = text; } }

  // Mandatory honesty banner for public-knowledge results.
  function knowledgeBanner(){
    var l=lang(), tmpl=t('bw.scan.banner.knowledge');
    if(tmpl) return tmpl;
    if(l==='de') return 'Diese Website blockiert automatisierte Analysen — daher basiert dieses Ergebnis auf öffentlich verfügbaren Informationen, nicht auf einem Live-Scan.';
    if(l==='zh') return '该网站屏蔽了自动扫描——因此本结果基于公开可得的信息，而非对网站的实时扫描。';
    return "This site blocks automated scanning — so this result is based on publicly available information, not a live scan of the site.";
  }
  function bookCtaLabel(){
    var l=lang(), tmpl=t('bw.scan.blocked.cta');
    if(tmpl) return tmpl;
    return l==='de' ? 'GESPRÄCH BUCHEN ▸' : (l==='zh' ? '预约通话 ▸' : 'BOOK A CALL ▸');
  }

  var banner=document.getElementById('az-banner');
  function hideBanner(){ if(banner){ banner.style.display='none'; banner.textContent=''; } }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var domain=cleanDomain(urlEl.value);
    if(!domain || domain.indexOf('.')<1){ urlEl.focus(); return; }
    currentDomain=domain;
    trackScan('scan-submit', { lang: lang() });
    var scanning = lang()==='de' ? 'SCANNE…' : (lang()==='zh' ? '扫描中…' : 'SCANNING…');
    var runLabel = (typeof getTranslation==='function') ? getTranslation('bw.scan.run') : 'RUN SCAN ▸';
    runBtn.disabled=true; runBtn.textContent=scanning;
    out.style.display='block'; report.style.display='none'; con.style.display='block'; con.innerHTML=''; hideBanner();
    var run = ++runSeq;
    var stopped = false;               // set true the instant the fetch settles
    var typingDone = false, result = null, settledErr = null;
    var slowTimer = null;              // pending "still working / slow" timer (non-REDUCED path); hoisted so onSettled can clear it
    announce((function(){
      // announce() writes via textContent (never innerHTML) → NO escaping: escaping
      // here would make a screen reader read an '&' domain as "&amp;".
      var tmpl=t('bw.scan.aria.scanning');
      if(tmpl) return tmpl.replace('{domain}', domain);
      return (lang()==='de'?'Scanne ':(lang()==='zh'?'正在扫描 ':'Scanning '))+domain;
    })());

    var scanP = fetchScan(domain).catch(function(err){
      if(err && err.soft){ throw err; }
      console.warn('[scan] unavailable', err && (err.status||err.message));
      var e2=new Error('unavailable'); e2.soft=true; e2.code='UNAVAILABLE'; e2.status=err&&err.status; e2.message=unavailableMessage(); throw e2;
    });

    // Safety net: just past fetchScan's 30s AbortController. If the fetch somehow
    // never settles, route to the honest error — NEVER to a fake completion.
    var safety = setTimeout(function(){
      if(stopped || run!==runSeq) return;
      settledErr = { soft:true, code:'UNAVAILABLE', message:unavailableMessage() };
      onSettled();
    }, 33000);

    function paintFinal(){
      if(run!==runSeq) return;
      runBtn.disabled=false; runBtn.textContent=runLabel;
      if(settledErr){
        var msg=settledErr.message||unavailableMessage();
        var html='<span class="h">'+msg+'</span>';
        if(settledErr.code==='BLOCKED_SITE' || settledErr.code==='DAILY_LIMIT'){
          html+='<div style="margin-top:14px"><a href="#contact" class="btn btn--pri">'+bookCtaLabel()+'</a></div>';
        }
        con.innerHTML=html; hideBanner(); announce(msg);
        trackScan('scan-error', { code: settledErr.code||'UNAVAILABLE', status: settledErr.status, lang: lang() });
        return;
      }
      // success: render the report, then the honest final console line.
      try {
        finish(domain, result, runLabel);
      } catch(e){
        // finish() throws a soft error on an unusable 2xx body — treat as error.
        settledErr = (e && e.soft) ? e : { soft:true, code:'UNAVAILABLE', message:unavailableMessage() };
        return paintFinal();
      }
      var fl = finalLine(result && result.source);
      var cls = (result && (result.source==='live'||result.source==='rendered')) ? 'g' : 'c';
      con.innerHTML += '\n<span class="'+cls+'">'+esc(fl)+'</span>';
      announce(fl);
    }

    // Resolution gate: paint the final state only when BOTH the fetch has settled
    // AND the neutral typing has finished (or been short-circuited). A warm/cached
    // fetch that resolves mid-typing short-circuits typing (see the loop below).
    function onSettled(){
      if(stopped || run!==runSeq) return;
      stopped = true; clearTimeout(safety);
      if(slowTimer) clearTimeout(slowTimer);
      if(typingDone) paintFinal();
      // else: the typing loop, seeing `stopped`, will jump to paintFinal().
    }

    scanP.then(function(data){ result=data; onSettled(); },
               function(err){ settledErr=err; onSettled(); });

    if(REDUCED){
      con.innerHTML='<span class="c">'+(lang()==='de'?'Scanne…':(lang()==='zh'?'扫描中…':'Scanning…'))+'</span>';
      typingDone = true;
      if(stopped) paintFinal(); // fetch may have already settled
    } else {
      var LINES=scanLines(domain), buf='', li=0, ci=0, workingShown=false;
      var WORK = t('bw.scan.working') || (lang()==='de'?'mit KI analysieren':(lang()==='zh'?'使用 AI 分析中':'analysing with AI'));
      var SLOW = t('bw.scan.workingSlow') || (lang()==='de'?'das kann bei größeren Seiten ein paar Sekunden dauern …':(lang()==='zh'?'较大的网站可能需要几秒钟 …':'this can take a few seconds for larger sites …'));
      function showWorking(){
        if(workingShown) return; workingShown=true;
        con.innerHTML = buf + '<span class="c">  '+esc(WORK)+' </span><span class="azcur"></span>';
        slowTimer = setTimeout(function(){
          if(!stopped && run===runSeq){ con.innerHTML = buf + '<span class="c">  '+esc(WORK)+'</span>\n<span class="c">  '+esc(SLOW)+' </span><span class="azcur"></span>'; }
        }, 4000);
      }
      (function type(){
        if(run!==runSeq) return;                 // superseded by a newer submit
        if(stopped){                             // fetch already settled → finish now
          if(slowTimer) clearTimeout(slowTimer);
          typingDone = true; con.innerHTML = buf; return paintFinal();
        }
        if(li>=LINES.length){                    // typed lines done → working phase
          typingDone = true; showWorking();
          if(stopped){ if(slowTimer) clearTimeout(slowTimer); con.innerHTML = buf; return paintFinal(); }
          return; // hold; scanP settling (onSettled) will paint the final state
        }
        var L=LINES[li];
        if(L.nl){ buf+='\n'; li++; ci=0; return setTimeout(type, 90); }
        var txt=L.x;
        if(ci<txt.length){ if(ci===0){ buf+='<span class="'+L.c+'">'; } buf+=txt[ci]; ci++; con.innerHTML=buf+'</span><span class="azcur"></span>'; setTimeout(type, txt[ci-1]==='.'?10:16); }
        else { buf+='</span>'; li++; ci=0; setTimeout(type, 60); }
      })();
    }
  });

  function finish(domain, data, runLabel){
    // A 2xx with an unusable body (proxy/CDN edge case, or a backend regression)
    // must degrade to the honest "unavailable" message, never a raw JS error
    // string — thrown here so it flows into the same soft-error .catch as any
    // other failure (never fabricate, never leak an internal error to the visitor).
    if(!data || !Array.isArray(data.ops) || typeof data.verdict!=='string' || typeof data.score!=='number'){
      var e=new Error('unavailable'); e.soft=true; e.code='UNAVAILABLE'; e.message=unavailableMessage(); throw e;
    }
    trackScan('scan-success', { source: data.source || 'live', lang: lang() });
    runBtn.disabled=false; runBtn.textContent=runLabel || 'RUN SCAN ▸';
    // Mandatory honesty banner when the result came from public knowledge, not a live scan.
    if(banner){
      if(data.source==='knowledge'){ banner.textContent=knowledgeBanner(); banner.style.display='block'; }
      else { hideBanner(); }
    }
    document.getElementById('az-target').textContent=domain;
    document.getElementById('az-verdict').textContent=data.verdict;
    var opsWrap=document.getElementById('az-ops');
    opsWrap.innerHTML=data.ops.map(function(o){
      return '<div class="op"><span class="op__fit '+o.fit+'">'+label(o.fit)+'</span><div class="op__t">'+esc(o.t)+'</div><div class="op__d">'+esc(o.d)+'</div></div>';
    }).join('');
    report.style.display='block';
    var reasonsWrap=document.getElementById('az-reasons');
    if(reasonsWrap){
      reasonsWrap.innerHTML=(Array.isArray(data.reasons)?data.reasons:[]).map(function(r){
        return '<li>'+esc(r)+'</li>';
      }).join('');
    }
    var scoreEl=document.getElementById('az-score'), target=data.score, t0=null;
    if(REDUCED){ scoreEl.textContent=target; } else {
      (function anim(ts){ if(!t0)t0=ts; var p=Math.min(1,(ts-t0)/900); scoreEl.textContent=Math.round(p*target); if(p<1) requestAnimationFrame(anim); })(performance.now());
    }
    opsWrap.querySelectorAll('.op').forEach(function(c,i){ setTimeout(function(){ c.classList.add('in'); }, REDUCED?0:120+i*130); });
  }
})();
