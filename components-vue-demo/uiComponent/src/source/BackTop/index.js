import Vue from 'vue';
import BackTopComp from './backTop';
const BackTop = Vue.extend(BackTopComp);

let backTop = null;

const keys = ["right", "bottom", "radius"];

const updateConfig = function (el, config) {
  if (config)
    for (var key of keys)
      if (config[key]) el[key] = config[key]
}

Vue.directive('backTop', {
  bind: function (el, binding) {
    el.classList.add('ferm-backtop-outter-relative');
    el.innerHTML = "<div class='full' style='overflow:auto'>" + el.innerHTML + "</div>";

    backTop = new BackTop({
      el: document.createElement('div')
    });
    el.appendChild(backTop.$el);

    backTop.scrollEL = el.children[0];
    el.children[0].addEventListener("scroll", backTop.handleScroll);
    updateConfig(backTop, binding.value);
  },
  update: function (el, binding) {
    updateConfig(backTop, binding.value);
  }
})