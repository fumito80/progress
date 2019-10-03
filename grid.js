const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const $  = (selector, parent = document) => parent.querySelector(selector);
const on = (element, eventName, f) => element.addEventListener(eventName, f);

function imp(selector) {
  return document.importNode($(selector, $('template').content), true);
}

on(document, 'DOMContentLoaded', _ => {
  $('.unit-container').append(imp('.unit'));
});
