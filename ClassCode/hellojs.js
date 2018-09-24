const clickBut = document.getElementById('clickBut');

clickBut.addEventListener("click", () => {  
    alert('EventListener ex');         
});        

clickBut.addEventListener("click", ()=>{
    document.getElementById('hdr').classList.add('color');
            
});
