const b=document.getElementById('menuBtn');const m=document.getElementById('menu');
if(b)b.onclick=()=>m.classList.toggle('active');
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show')}));
document.querySelectorAll('.card').forEach(c=>obs.observe(c));