// Write Javascript code here!
const app = document.getElementById('app');

const itemString = `
    <div class="item">
        Lorem ipsum dolor sit amet,
        <div class="context">consectetur adipisicing elit.</div>
    </div>`;


app.addEventListener('click', function (e) {

    if (e.target.classList.contains('context')) {
        return;
    }

    document.querySelector('.item.open')?.classList.remove('open');
   
    if (e.target.classList.contains('item')) {
        if (e.target.classList.contains('open')) {
            return;
        } else {
            e.target.classList.add('open');
        }
    }
});



// const wrapper = document.querySelector('.wrapper');
// const items = document.querySelectorAll('.item');

// document.body.addEventListener('click', function(e) {
//   const targetClassList = e.target.classList;

//   if (targetClassList.contains('context')) {
//       return;
//   }

//   if (targetClassList.contains('item')) {
//     targetClassList.toggle('open');
//     items.forEach(function(elem) {
//       if (elem !== e.target) elem.classList.remove('open');
//     });
//     return;
//   }

//   items.forEach(function(elem) {
//     elem.classList.remove('open');
//   });

// });




