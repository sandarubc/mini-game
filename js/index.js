const player=document.querySelector("#player");
const ground=document.querySelector("#ground");

let dx=0;
let dy=2;
let position=0;
let accelaration=0.3;
let index=1;



addEventListener("keydown",({key})=>{
    console.log(key);
    if(key==="ArrowRight"){
        player.classList.remove('turn');
        dx=10;
    }else if(key==="ArrowLeft"){
        player.classList.add('turn');
        dx=-10;
    }
    
});



addEventListener("keyup",({key})=>{
    if(key==="ArrowRight" || key === "ArrowLeft"){
        dx=0;
    }
    

})

addEventListener("keypress",({key})=>{
    if(key===" "){
        dy=-10;
        accelaration=0.3;
    }

})

const animate=()=>{


    if(dx !==0){
        player.style.backgroundImage=`url(../image/Run__00${index++}.png)`;

    }
    
    else if(dy !==0 ){
        player.style.backgroundImage=`url(../image/Jump__00${index++}.png)`;
        if(index>0) index=1;
    }
    else{
        player.style.backgroundImage=`url(../image/Idle__00${index++}.png)`;
    }
    if(index>9) index=1;
    
    
    if((player.offsetLeft+player.offsetWidth)>innerWidth){
        dx=0;
        player.style.left=`${innerWidth-player.offsetWidth}px`;
    }
    else if(player.offsetLeft<0){
        dx=0;
        player.style.left="0";
    }
    player.style.left=`${player.offsetLeft+dx}px`;
    if((player.offsetTop+player.offsetHeight)>ground.offsetTop){
        dy=0;
        accelaration=0;
        player.style.top=`${ground.offsetTop-player.offsetHeight}px`;
    }
    player.style.top=`${player.offsetTop+dy}px`;
    dy+=accelaration;
    

    requestAnimationFrame(animate);
    
}

requestAnimationFrame(animate);
