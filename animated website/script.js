const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnim(){
    var t1= gsap.timeline();

    t1.from("#nav",{
        y: '-10',
        opacity:0,
        duration:2,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y: '0',
        duration:2,
        delay:-1,
        ease:Expo.easeInOut,
        stagger: .3
    })
    .from("#herofooter",{
        y: '-10',
        opacity:0,
        duration:2,
        delay:-1,
        ease:Expo.easeInOut
    })
}
// jab mouse move ho to hum log skew kar paaye aur maximum skew and minimum kew define kar paaye, jab mouse move ho to chapta ki value badhe, aur jab mouse chalna band ho jaaye to chapta hata lo  
 
function circleskewkaro(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0 ;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
         
         xscale= gsap.utils.clamp(.7,1.1,dets.clientX - xprev);
         yscale= gsap.utils.clamp(.7,1.1,dets.clientY - yprev);

         xprev = dets.clientX;
         yprev = dets.clientY;

         circleMouseFowller(xscale,yscale);

    });
}

function circleMouseFowller(xscale,yscale){
    window.addEventListener("mousemove",function (dets) {
        document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleskewkaro();
circleMouseFowller();
firstPageAnim();
//teeno element ko select karo, uske baad teeno par ek mousemove lagao,
// jab mousemove ho to ye pata karo ki mouse kaha par hai , 
//jiska matlab hai mouse ki x y position ke badle us image ko show karo and us image ko move karo, 
//move karte waqt rotate karo, and jaise jaise mouse tez chale waise rotation bhi tez ho jaye 


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets) {
       
        gsap.to(elem.querySelector("img"), {
            opacity:0,
            ease: Power3,
            duration: 0.9,
        });
    });

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity:1,
            ease: Power3,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.4)
        });
    });
});