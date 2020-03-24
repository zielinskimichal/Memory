function putPictures(){
    let position=[];
    for (let i=1; i < 7; i++){
        position.push(i);
        position.push(i);
    }
    position.sort(() => Math.random()-0.5);
    for (let i=1; i < 13; i++){ 
       document.getElementById(i).style.background=`url(./memoryPictures/${position[i-1]}.jpg)`;  
       document.getElementById(i).style.backgroundRepeat="no-repeat";
       document.getElementById(i).style.backgroundSize="250px 250px";
    }
    return position;
}
let idsToCheck=[];
let cardPosition=putPictures();
cardPosition.forEach((e)=>console.log(e));
let flagCardOne=false;
let flagCardTwo=false;

function handleTwoFlipped(){
    let flippedCards=document.querySelectorAll(".flipped");
    let flag=false;
    console.log(idsToCheck[0]);
    console.log(idsToCheck[1]);
   // console.log(cardPosition[idsToCheck[0]-1]);
    //console.log(cardPosition[idsToCheck[1]-1]);
    if(cardPosition[idsToCheck[0]-1]==cardPosition[idsToCheck[1]-1]) flag=true;
    if (flag===false){
    setTimeout(()=>{flippedCards.forEach(element => element.classList.remove("flipped")); flagCardOne=false; flagCardTwo=false;},1250); idsToCheck=[]}
    else if(flag===true){
        flagCardOne=false;
        flagCardTwo=false;
        idsToCheck.forEach(e => {
            document.getElementById(e).parentElement.classList.add("flippedForever");
        })
        idsToCheck=[];
        
    }

    idsToCheck.forEach(e => console.log(e));
}

let cards = document.querySelectorAll(".oneCard");

cards.forEach( element => element.addEventListener('click', e => {
    if ((flagCardOne==true && flagCardTwo==true)==false){
    idsToCheck.push(e.target.nextElementSibling.id);
    e.target.parentElement.classList.add("flipped");
    if (flagCardOne==false) flagCardOne=true;
    else if(flagCardOne==true) {flagCardTwo=true; handleTwoFlipped();}
    
    };}));
