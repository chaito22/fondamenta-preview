// Sólo registra eventos no personales en memoria. GA4 requiere una cuenta real.
window.dataLayer = window.dataLayer || [];
function track(event, detail={}) { window.dataLayer.push({event,...detail}); }
document.querySelectorAll('[data-track]').forEach(a=>a.addEventListener('click',()=>track(a.dataset.track)));
const form=document.querySelector('#project-form');
if(form){
  let started=false;
  form.addEventListener('input',()=>{if(!started){track('project_form_start');started=true;}document.querySelector('#send-options').hidden=true;});
  form.addEventListener('change',()=>{document.querySelector('#send-options').hidden=true;});
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const d=Object.fromEntries(new FormData(form));
    const message=`Hola Fondamenta, quisiera conversar sobre un proyecto.\n\nNombre: ${d.nombre}\nMarca: ${d.marca||'Sin definir'}\nCorreo: ${d.email}\nProyecto: ${d.tipo}\nUbicación: ${d.ubicacion}\nSuperficie: ${d.superficie}\nPlazo: ${d.plazo}\n\n${d.mensaje||''}`;
    document.querySelector('#send-whatsapp').href='https://wa.me/5491155875161?text='+encodeURIComponent(message);
    document.querySelector('#send-email').href='mailto:fondamentaestudio@gmail.com?subject='+encodeURIComponent('Consulta de proyecto · '+d.nombre)+'&body='+encodeURIComponent(message);
    document.querySelector('#send-options').hidden=false;
    track('project_inquiry_prepared',{project_type:d.tipo});
  });
  document.querySelector('#send-whatsapp').addEventListener('click',()=>track('qualified_whatsapp_click'));
  document.querySelector('#send-email').addEventListener('click',()=>track('qualified_email_click'));
}
const dialog=document.querySelector('#photo-dialog');
if(dialog){document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#dialog-image').src=b.dataset.image;document.querySelector('#dialog-image').alt=b.dataset.title;document.querySelector('#dialog-caption').textContent=b.dataset.title;dialog.showModal();}));dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
