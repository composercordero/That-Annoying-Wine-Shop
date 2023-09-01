// const nav = document.getElementsByClassName('navBtn')
// for(let btn of nav){
//     btn!.addEventListener('click',(e:Event) => {
//         let target = e.currentTarget as HTMLElement
//         if (target.id === 'mode'){
//             if(document.body.dataset.bsTheme === ''){
//                 document.body.dataset.bsTheme = 'dark'
//             }else{
//                 document.body.dataset.bsTheme = ''
//         }}else{
//         changeView(target.id.slice(0, -3)))
//         }
//     })
// }

// function changeView(section){
//     // Turn off the element(s) that are visible
//     const toTurnOff = document.getElementsByClassName('is-visible');
//     for (let element of toTurnOff){
//         console.log('Turning off', element);
//         element.classList.replace('is-visible', 'is-invisible');
//         let navLink = document.getElementsByName(element.id)[0];
//         navLink.classList.remove('active');
//     }

//     // Turn on the element based on the link that was clicked
//     const toTurnOn = document.getElementById(section);
//     toTurnOn!.classList.replace('is-invisible', 'is-visible');
//     event.target.classList.add('active');
// }