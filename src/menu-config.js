
import {hideElem, showElem} from './util.js';
import ApplyAnimation from './animate-item.js';
import Tooltip from './tooltip.js';
export default class Menu{
  constructor(topMiddle, bottomMiddle, bottomLeft){
    this.topMiddle = topMiddle; // <div id="to-bedroom" class="menu-item">Top Middle</div>
    this.bottomMiddle = bottomMiddle; // <div id="to-empty"></div>
    this.bottomLeft = bottomLeft;// <div id="to-kitchen"></div>
    this.toListen = [this.topMiddle, this.bottomMiddle, this.bottomLeft];
    this.size = null;
  }

  loadMenu(){
    
    const buttons = [
      { buttonId: 'next1', targetId: 'to-show-1', hideId: 'to-show-0' },
      { buttonId: 'show-next', targetId: 'to-show-2', hideId: 'to-show-1' },
    ];
    
    buttons.forEach(({ buttonId, targetId, hideId }) => {
      document.getElementById(buttonId).addEventListener('click', function() {
        if (hideId) {
          hideElem(hideId);
        }
        document.getElementById(targetId).classList.remove('hidden');
      });
    });

    this.animateWindows();

    
    this.toListen.forEach(function(element){
      console.log(element.id);
      let room = element.id.split('-')[1];
      element.addEventListener('click', function(){
        hideElem('menu');
        showElem(`${room}`);
        showElem('box');
      });

    });
  }

  returnToMenu(room){
    hideElem(`${room}`);
    hideElem('box');
    showElem('menu');
  }

  animateWindows() {
    this.toListen.forEach((window) => { // Use an arrow function here
      let animation = new ApplyAnimation(`${window.id}`);
      let tooltip = new Tooltip(`${window.id}`);
      if (window.id === 'top-middle') {
        this.size = 'small';
      } else {
        this.size = 'big';
      }
      window.addEventListener('mouseenter', () => { // Use an arrow function here
        animation.windowHover(this.size);
        tooltip.windowPreview(`${window.id.slice(3,)}`);

      });
      window.addEventListener('mouseleave', () => { // Use an arrow function here
        animation.windowunHover();
        tooltip.remove();
      });
    });
  }
  
  
}