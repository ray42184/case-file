(function(){
"use strict";
var C = CASE1, KEY = "casefile_" + C.id + "_v1";
var S = load();
function fresh(){ return {reviewed:{}, notes:"", pins:[], board:{}, order:shuffle(C.timelineEvents.map(function(e){return e.id;})), strikes:0, hintsUsed:0, solved:false, failed:false, tab:"locker"}; }
function load(){ try{ var s=JSON.parse(localStorage.getItem(KEY)); if(s) return s; }catch(e){} return fresh(); }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function toast(m){ var t=$("toast"); t.textContent=m; t.hidden=false; clearTimeout(toast.t); toast.t=setTimeout(function(){t.hidden=true;},2600); }
function reviewedCount(){ return Object.keys(S.reviewed).length; }
function bd(id){ return S.board[id] || (S.board[id]={m:false,w:false,o:false,status:"unknown"}); }
function isUnlocked(ev){
  var u=ev.unlock; if(!u) return true;
  if(u.type==="count") return reviewedCount()>=u.n;
  if(u.type==="reviewed") return u.ids.every(function(i){return S.reviewed[i];});
  if(u.type==="suspect") return C.suspects.filter(function(s){return bd(s.id).status==="suspect";}).length>=u.n;
  return false;
}
var known = {}; // track newly unlocked
C.evidence.forEach(function(e){ known[e.id]=isUnlocked(e); });
function checkUnlocks(){ C.evidence.forEach(function(e){ var u=isUnlocked(e); if(u && !known[e.id]) toast("🔓 New evidence: "+e.title); known[e.id]=u; }); }

var V = {
locker: function(){
  var h='<div class="folder"><h2>'+esc(C.title)+'</h2><p>'+esc(C.premise)+'</p><p><b>Reviewed:</b> '+reviewedCount()+' / '+C.evidence.length+'</p></div><div class="grid">';
  C.evidence.forEach(function(e){
    if(isUnlocked(e)) h+='<button class="card'+(S.reviewed[e.id]?' done':'')+'" data-open="'+e.id+'"><div class="ty">'+e.id+' · '+esc(e.type)+'</div><div class="ti">'+esc(e.title)+'</div></button>';
    else h+='<div class="card locked"><div class="ty">'+e.id+' · 🔒 Sealed</div><div class="ti">'+esc(e.unlock.label)+'</div></div>';
  });
  h+='</div><div class="panel" style="margin-top:12px"><b>Hints</b> ('+(3-S.hintsUsed)+' free left)<br>';
  for(var i=0;i<S.hintsUsed;i++) h+='<p>'+esc(C.hints[i])+'</p>';
  h+= S.hintsUsed<3 ? '<button class="btn" id="hintBtn">Get a nudge</button>' : '<p class="note">Out of free hints. Extra hint packs are in the Cases tab (placeholder).</p>';
  h+='</div>';
  return h;
},
board: function(){
  var h='<h2 class="w">Suspect Board</h2><p class="w">Set Motive / Means / Opportunity and a status. Marking someone SUSPECT lets you subpoena phone records.</p>';
  C.suspects.forEach(function(s){
    var b=bd(s.id);
    h+='<div class="suspect s-'+b.status+'"><h3>'+esc(s.name)+'</h3><div class="note">'+esc(s.role)+'</div><p><b>Motive:</b> '+esc(s.motive)+'</p><p><b>Alibi:</b> '+esc(s.alibi)+'</p><div class="row">';
    [["m","Motive"],["w","Means"],["o","Opportunity"]].forEach(function(k){ h+='<button class="tog'+(b[k[0]]?' on':'')+'" data-tog="'+s.id+':'+k[0]+'">'+k[1]+'</button>'; });
    h+='</div><div class="row">';
    [["unknown","Unknown"],["suspect","Suspect"],["cleared","Cleared"]].forEach(function(k){ h+='<button class="tog'+(b.status===k[0]?' on':'')+'" data-st="'+s.id+':'+k[0]+'">'+k[1]+'</button>'; });
    h+='</div></div>';
  });
  return h;
},
timeline: function(){
  var map={}; C.timelineEvents.forEach(function(e){map[e.id]=e;});
  var h='<h2 class="w">Timeline</h2><p class="w">Use ▲ ▼ to put events in order. Some times are only in the documents.</p><ol class="tl">';
  S.order.forEach(function(id,i){ h+='<li><b>'+(i+1)+'</b><span>'+esc(map[id].text)+'</span><button data-mv="'+i+':-1" aria-label="up">▲</button><button data-mv="'+i+':1" aria-label="down">▼</button></li>'; });
  return h+'</ol><button class="btn" id="tlCheck">Check order</button>';
},
notes: function(){
  var h='<h2 class="w">Notebook</h2><textarea id="notes" placeholder="Your notes save automatically…">'+esc(S.notes)+'</textarea><h3 style="color:#f3e7c9">Pinned quotes</h3>';
  if(!S.pins.length) h+='<p class="w">Select text inside a document and tap 📌 Pin selection.</p>';
  S.pins.forEach(function(p,i){ h+='<div class="pin"><div>“'+esc(p.q)+'”<br><small>— '+p.id+'</small></div><button data-unpin="'+i+'" aria-label="remove">✕</button></div>'; });
  return h;
},
accuse: function(){
  var h='<h2 class="w">Accusation</h2><p class="w">Strikes: '+S.strikes+' / 3. A wrong accusation costs a strike. Three strikes closes the case unsolved.</p>';
  if(S.solved||S.failed) return h+debrief();
  h+='<label>Killer</label><select id="aK"><option value="">— choose —</option>'+C.suspects.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+'</option>';}).join('')+'</select>';
  h+='<label>Motive</label><select id="aM"><option value="">— choose —</option>'+C.motives.map(function(m){return '<option value="'+m.id+'">'+esc(m.label)+'</option>';}).join('')+'</select>';
  h+='<label>Key evidence (breaks the alibi)</label><select id="aE"><option value="">— choose —</option>'+C.evidence.filter(isUnlocked).map(function(e){return '<option value="'+e.id+'">'+e.id+' · '+esc(e.title)+'</option>';}).join('')+'</select>';
  h+='<button class="btn red" id="aGo" style="width:100%">Submit accusation</button><div id="aRes"></div>';
  h+='<div class="panel" style="margin-top:16px"><button class="btn sec" id="reset">Reset case</button> <span class="note">Clears notes, board, progress.</span></div>';
  return h;
},
shop: function(){
  var items=[["Case 2: The Lantern Street Fire","Coming soon","$2.99 per case"],["Case 3: Drowned Choir of Pell Lake","Coming soon","$2.99 per case"],["Case 4: The Switchyard Letters","Locked","$2.99 per case"],["Detective Pass (all cases)","Coming soon","$4.99 / month"],["Extra Hints Pack (5 hints)","Coming soon","$0.99"]];
  var h='<h2 class="w">Case Files</h2><div class="panel"><b>Case 1: '+esc(C.title)+'</b><br><span class="free">FREE — playing now</span></div>';
  items.forEach(function(it,i){ h+='<div class="panel"><b>'+esc(it[0])+'</b><br><span class="note">'+it[1]+' · '+it[2]+'</span><br><button class="btn sec" data-shop="'+i+'" style="margin-top:8px">'+it[2]+' — Demo only, no card is charged</button></div>'; });
  return h+'<p class="w">This is a prototype. No payments are processed and no network calls are made.</p>';
}
};
function debrief(){
  var sol=C.solution, h='<div class="paper">';
  h+= S.solved ? '<h3>🟥 CASE CLOSED</h3><p>Solved with '+S.strikes+' strike(s).</p>' : '<h3>CASE UNSOLVED — FULL SOLUTION</h3><p>Three strikes. Here is what really happened.</p>';
  h+='<p><b>Killer:</b> Owen Pratt. <b>Motive:</b> covering up ~$41,200 in embezzlement. <b>Key evidence:</b> E08 Dusty\'s receipt vs. E04 interview.</p><ol>';
  sol.debrief.forEach(function(d){ h+='<li>'+esc(d)+'</li>'; });
  return h+'</ol><button class="btn sec" id="reset">Reset case &amp; replay</button></div>';
}
function render(){
  $("caseTitle").textContent=C.title;
  $("strikes").textContent="✖".repeat(S.strikes)+"○".repeat(3-S.strikes);
  document.querySelectorAll("nav button").forEach(function(b){ b.classList.toggle("on", b.dataset.tab===S.tab); });
  $("view").innerHTML=V[S.tab]();
  var n=$("notes"); if(n) n.addEventListener("input",function(){ S.notes=n.value; save(); });
}
var openId=null;
function openDoc(id){
  var e=C.evidence.filter(function(x){return x.id===id;})[0]; openId=id;
  $("mBody").innerHTML='<div class="note">'+e.id+' · '+esc(e.type)+'</div>'+e.html;
  $("mDone").textContent=S.reviewed[id]?"✓ Reviewed":"Mark reviewed";
  $("modal").hidden=false; $("mBody").scrollTop=0;
}
document.addEventListener("click",function(ev){
  var t=ev.target.closest("button"); if(!t) return;
  var d=t.dataset;
  if(d.tab){ S.tab=d.tab; save(); render(); window.scrollTo(0,0); return; }
  if(d.open){ openDoc(d.open); return; }
  if(t.id==="mClose"){ $("modal").hidden=true; render(); return; }
  if(t.id==="mDone"){ S.reviewed[openId]=!S.reviewed[openId]; if(!S.reviewed[openId]) delete S.reviewed[openId]; save(); $("mDone").textContent=S.reviewed[openId]?"✓ Reviewed":"Mark reviewed"; checkUnlocks(); return; }
  if(t.id==="mPin"){ var q=String(window.getSelection()).trim(); if(!q){ toast("Select some text in the document first."); return; } S.pins.push({id:openId,q:q.slice(0,400)}); save(); toast("📌 Pinned to notebook"); return; }
  if(t.id==="hintBtn"){ if(S.hintsUsed<3){ S.hintsUsed++; save(); render(); } return; }
  if(d.tog){ var p=d.tog.split(":"); var b=bd(p[0]); b[p[1]]=!b[p[1]]; save(); render(); return; }
  if(d.st){ var q2=d.st.split(":"); bd(q2[0]).status=q2[1]; save(); checkUnlocks(); render(); return; }
  if(d.mv){ var m=d.mv.split(":").map(Number), j=m[0]+m[1]; if(j<0||j>=S.order.length) return; var tmp=S.order[m[0]]; S.order[m[0]]=S.order[j]; S.order[j]=tmp; save(); render(); return; }
  if(t.id==="tlCheck"){ var ok=0; S.order.forEach(function(id,i){ if(C.timelineEvents[i].id===id) ok++; }); toast(ok===S.order.length?"✅ Timeline is in order.":ok+" of "+S.order.length+" events in the right slot."); return; }
  if(d.unpin){ S.pins.splice(+d.unpin,1); save(); render(); return; }
  if(d.shop){ toast("Demo only — nothing purchased, no card charged."); return; }
  if(t.id==="reset"){ if(confirm("Reset all progress for this case?")){ S=fresh(); S.tab="locker"; save(); C.evidence.forEach(function(e){known[e.id]=isUnlocked(e);}); render(); } return; }
  if(t.id==="aGo"){ accuse(); return; }
});
function accuse(){
  var k=$("aK").value, m=$("aM").value, e=$("aE").value, sol=C.solution;
  if(!k||!m||!e){ toast("Choose a killer, motive and key evidence."); return; }
  var score=(k===sol.killer?1:0)+(m===sol.motive?1:0)+(sol.acceptableKey.indexOf(e)>=0?1:0);
  if(score===3){ S.solved=true; save(); render(); return; }
  S.strikes++;
  var hint = k!==sol.killer ? sol.wrongHints[k] : (m!==sol.motive ? sol.wrongHints.owen_motive : sol.wrongHints.owen_key);
  if(S.strikes>=3){ S.failed=true; save(); render(); return; }
  save(); render();
  $("aRes").innerHTML='<div class="paper" style="margin-top:12px"><h3>D.A. DECLINES TO PROSECUTE</h3><p>Score: '+score+' / 3 correct. Strike '+S.strikes+' of 3.</p><p><b>Debrief:</b> '+esc(hint)+'</p></div>';
}
render();
})();
