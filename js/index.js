const player=document.querySelector("#player");
const ground=document.querySelector("#ground");



let dx=0;
let dy=2;
let position=0;
let accelaration=0.3;
let index=1;
let elements=document.querySelectorAll(".obstacle");

const ObstacleWidth=50;

class Obstacle{

    #left=0;

    constructor(){
        
        while((this.#left<player.offsetWidth)||(this.#left>(innerWidth-player.offsetWidth-ObstacleWidth)))this.#left=Math.random()*innerWidth;
        if(this.#left>=ObstacleWidth){
            const element=document.createElement("div");
            element.classList.add("obstacle");
            element.style.position="absolute";
            element.style.width=`${ObstacleWidth}px`;
            element.style.height="50px";
            element.style.bottom=`${ground.offsetHeight}px`
            element.style.left=`${this.#left}px`;
            document.querySelector("body").append(element);

            elements=document.querySelectorAll(".obstacle");

        }
    }
}






addEventListener("keydown",({key})=>{
    if(key==="ArrowRight"){
        player.classList.remove('turn');
        dx=5;
    }else if(key==="ArrowLeft"){
        player.classList.add('turn');
        dx=-5;
    }
    
});



addEventListener("keyup",({key})=>{
    if(key==="ArrowRight" || key === "ArrowLeft"){
        dx=0;
    }
    
    

})

addEventListener("keypress",({key})=>{
    if(key===" "&&player.offsetTop>=innerHeight*50/100){
        dy=-10;
        accelaration=0.3;
    }
    

})


const animate=()=>{


    if(dx !==0){
        player.style.backgroundImage=`url(image/Run__00${index++}.png)`;

    }
    
    else if(dy !==0 ){
        player.style.backgroundImage=`url(image/Jump__00${index++}.png)`;
        // if(index>0) index=1;
    }
    else{
        player.style.backgroundImage=`url(image/Idle__00${index++}.png)`;
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
new Obstacle();
let forward=1;
let backward=0;
let won=false;
let gameOver=false;
requestAnimationFrame(animate);
const playing=function (){

    if(((player.offsetLeft+player.offsetWidth)>=innerWidth)&&(backward+1==forward)){
        backward++;
        if(!won) new Obstacle();

    }
    else if((player.offsetLeft<=0)&&(backward==forward)){
        forward++;
        
        if(backward>=2&&forward>=3&&!won&&!gameOver){
            won=true;
            document.querySelector("#wonmsg").classList.add("display");
            elements.forEach((element)=>{element.remove()})
        }
        if(!won) new Obstacle();
    }



    elements.forEach((element)=>{
        if((element.offsetTop>player.offsetTop)&&(element.offsetTop<(player.offsetTop+player.offsetHeight))){
            if((player.offsetLeft<element.offsetLeft)&&((player.offsetLeft+player.offsetWidth)>(element.offsetLeft))||((player.offsetLeft>element.offsetLeft)&&(player.offsetLeft<(element.offsetLeft+element.offsetWidth)))){
                if(!won){
                    player.remove();
                    document.querySelector("#outmsg").classList.add("display");
                }
                gameOver=true;
                
            }
            
        }
        
    })



    requestAnimationFrame(playing);
}


requestAnimationFrame(playing);