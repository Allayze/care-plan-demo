export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function metrics(data){const complete=data.tasks.filter(t=>t.done).length;return {people:data.people.length,plans:data.plans.length,complete,total:data.tasks.length,percent:data.tasks.length?Math.round(complete/data.tasks.length*100):0,reviews:data.plans.filter(p=>p.status==='Review due').length,flags:data.notes.filter(n=>n.flag).length};}
export function validData(data){return data?.version===1&&['people','plans','tasks','notes'].every(k=>Array.isArray(data[k]));}
export function toggleTask(data,id){const task=data.tasks.find(t=>t.id===id);if(!task)return false;task.done=!task.done;return true;}
export function reviewPlan(data,id){const plan=data.plans.find(p=>p.id===id);if(!plan)return false;plan.status='Active';const date=new Date();date.setDate(date.getDate()+30);plan.review=date.toISOString().slice(0,10);return true;}
