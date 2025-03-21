(function(){
    'use strict';

    var camera = new Swiper('#camera .swiper',{
       speed:600, 
       spaceBetween: 12,
       loop:true,
       navigation: {
          enabled:true,
          prevEl:'.swiper-button-prev',
          nextEl:'.swiper-button-next',
       }
    });

})();
