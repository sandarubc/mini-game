const player=document.querySelector("#player");
const ground=document.querySelector("#ground");



let dx=0;
let dy=2;
let position=0;
let accelaration=0.3;
let index=1;

const ObstacleWidth=50;

class Obstacle{

    #left=0;

    constructor(){
        
        while((this.#left<player.offsetWidth)||(this.#left>(innerWidth-player.offsetWidth-ObstacleWidth)))this.#left=Math.random()*innerWidth;
        console.log(this.#left>(innerWidth-player.offsetLeft))
        if(this.#left>=ObstacleWidth){
            const element=document.createElement("div");
            element.classList.add("obstacle");
            element.style.position="absolute";
            element.style.width=`${ObstacleWidth}px`;
            element.style.height="50px";
            element.style.backgroundColor=`rgb(${256*Math.random()},${256*Math.random()},${256*Math.random()})`
            element.style.bottom=`${ground.offsetHeight}px`
            element.style.left=`${this.#left}px`;
            document.querySelector("body").append(element);

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
    if(key===" "){
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
        if(index>0) index=1;
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

requestAnimationFrame(animate);
new Obstacle();
const elements=document.querySelectorAll(".obstacle");
const playing=function (){
    
    elements.forEach((element)=>{
        if((element.offsetTop>player.offsetTop)&&(element.offsetTop<(player.offsetTop+player.offsetHeight))){
            if((player.offsetLeft<element.offsetLeft)&&((player.offsetLeft+player.offsetWidth)>(element.offsetLeft))||((player.offsetLeft>element.offsetLeft)&&(player.offsetLeft<(element.offsetLeft+element.offsetWidth)))){
                player.remove();
                document.querySelector("#msg").classList.add("display");
            }
            
        }
        
    })



    requestAnimationFrame(playing);
}


requestAnimationFrame(playing);