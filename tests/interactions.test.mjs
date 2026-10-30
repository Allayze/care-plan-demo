import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';

test('full demo journey: sign-in, routes, edits, follow-up, persistence, reset and logout',async()=>{
 const seed=JSON.parse(await readFile(new URL('../data.json',import.meta.url)));
 const dom=new JSDOM('<div id="app"></div><dialog id="modal"></dialog><div id="toast"></div>',{url:'https://example.test/care-plan-demo/'});
 const w=dom.window;
 for(const key of ['window','document','location','localStorage','sessionStorage','HTMLFormElement','FormData'])globalThis[key]=key==='window'?w:w[key];
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.scrollTo=()=>{};
 globalThis.fetch=async()=>({ok:true,json:async()=>structuredClone(seed)});
 await import('../app.js');
 const $=s=>w.document.querySelector(s);
 const fill=(s,value)=>{$(s).value=value;};
 const click=s=>{assert.ok($(s),`Missing control: ${s}`);$(s).click();};
 const submit=s=>$(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 const navigate=async path=>{w.location.hash='/'+path;await new Promise(r=>setTimeout(r,5));};
 assert.ok($('#login-form'));
 fill('#username','admin');fill('#password','wrong');submit('#login-form');assert.match($('#login-error').textContent,/incorrect/);
 fill('#password','Allayze2026');submit('#login-form');assert.match($('#app').textContent,/A little clarity/);
 for(const path of ['people','plans','tasks','handover','insights','guide','settings','people/p1']){await navigate(path);assert.ok($('#main-content'),path);assert.doesNotMatch($('#main-content').textContent,/undefined|NaN/);}
 await navigate('people');fill('#people-search','zzzzz');$('#people-search').dispatchEvent(new w.Event('input',{bubbles:true}));assert.match($('#main-content').textContent,/No people match/);
 await navigate('tasks');click('[data-action="task"][data-id="t1"]');assert.equal(JSON.parse(localStorage.getItem('allayze-care-v1')).tasks[0].done,true);
 await navigate('overview');assert.match($('#main-content').textContent,/50%/);
 click('[data-action="note"]');fill('[name="text"]','<script>unsafe</script> A demo care note.');$('[name="flag"]').checked=true;submit('#note-form');
 await navigate('handover');assert.match($('#main-content').textContent,/<script>unsafe<\/script>/);assert.equal($('#main-content script'),null);
 click('[data-action="resolve"]');assert.equal(JSON.parse(localStorage.getItem('allayze-care-v1')).notes[0].flag,false);
 await navigate('plans');click('[data-action="plan"][data-id="c1"]');fill('[name="progress"]','80');$('[name="reviewed"]').checked=true;submit('#plan-form');assert.equal(JSON.parse(localStorage.getItem('allayze-care-v1')).plans[0].progress,80);assert.equal(JSON.parse(localStorage.getItem('allayze-care-v1')).plans[0].status,'Active');
 click('[data-action="new-plan"]');fill('[name="title"]','A meaningful goal');fill('[name="goal"]','Enjoy a new hobby');fill('[name="actions"]','Offer two activities');submit('#new-plan-form');assert.match($('#main-content').textContent,/A meaningful goal/);
 await navigate('tasks');click('[data-action="new-task"]');fill('[name="title"]','Afternoon check in');submit('#task-form');assert.match($('#main-content').textContent,/Afternoon check in/);
 await navigate('people');click('[data-action="person"]');for(const [name,value] of Object.entries({name:'Demo Person',age:'75',room:'07',need:'Wellbeing',about:'Likes music',preferences:'Tea',family:'Demo family'}))fill(`[name="${name}"]`,value);submit('#person-form');assert.match($('#main-content').textContent,/Demo Person/);
 click('[data-action="menu"]');assert.ok(document.body.classList.contains('menu-open'));click('[data-action="menu"]');assert.ok(!document.body.classList.contains('menu-open'));
 await navigate('settings');click('[data-action="reset"]');click('[data-action="confirm-reset"]');assert.deepEqual(JSON.parse(localStorage.getItem('allayze-care-v1')),seed);
 click('[data-action="logout"]');assert.ok($('#login-form'));assert.equal(sessionStorage.getItem('allayze-session'),null);
 await navigate('people/p1');assert.ok($('#login-form'));
 clearTimeout(w.toastTimer);dom.window.close();
});
