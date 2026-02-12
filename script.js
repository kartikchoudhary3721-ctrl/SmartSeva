if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}

document.querySelectorAll(".nav-item").forEach(item=>{
item.addEventListener("click",function(){

document.querySelectorAll(".nav-item")
.forEach(i=>i.classList.remove("active"));

this.classList.add("active");

});
});
