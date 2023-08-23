export default class ToolTipManager{
  constructor(){
    this.tooltips = {};
  }
  manage(tooltip){
  tooltip.on('tooltip:added', (event) => { // Using arrow function to capture `this`
    if (this.tooltips[tooltip.element.id]) return;
    this.tooltips[tooltip.element.id] = tooltip;
  });    

  }
}