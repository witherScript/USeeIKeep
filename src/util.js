export function hideElem(elementId){
  document.querySelector(`#${elementId}`).classList.add('hidden');
}

export function showElem(elementId){
  document.querySelector(`#${elementId}`).classList.remove('hidden');
}

