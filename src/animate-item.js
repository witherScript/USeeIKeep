import { gsap } from "gsap";

export default class ApplyAnimation{
  constructor(elementId){
    this.toAnimate = document.getElementById(elementId);
    this.elementId=elementId;
    console.log('animated ', elementId);
    this.elemAdded = [];
  }

  //animateItems
  toBox(){
    //click event listener
    gsap.to(`#${this.elementId}`, { x: -300, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(`#${this.elementId}`, { opacity: 0, duration: 0.5 });
  }

  windowHover(size){

  if(size==='big'){
    gsap.to(`#${this.elementId}`, { x: -100, duration: 0.5, ease: 'power2.inOut' });
  } else if (size ==='small'){
    gsap.to(`#${this.elementId}`, { x: -40, duration: 0.5, ease: 'power2.inOut' });
  }
   
  }
  windowunHover(){
    gsap.to(`#${this.elementId}`, { x: 0, duration: 0.5, ease: 'power2.inOut' });
  }

}