import "./styles.css";
import BoxMethod from './four-box.js';
import Menu from './menu-config.js';


window.addEventListener("load", function () {
//when the page first loads the menu should be the first thing to display

  // const kitchen =  document.querySelector('div#kitchen');
  // const bedroom = document.querySelector('div#bedroom');
 
  const toBed = document.getElementById('to-bedroom');
  const toEmpty = document.getElementById('to-empty');
  const toKitchen =  document.getElementById('to-kitchen');
  const menu = new Menu(toBed, toEmpty, toKitchen);
  menu.loadMenu();
  const box = new BoxMethod("box"); 
  box.populateItem("kitchen"); //emit cleaned

});