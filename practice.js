// Promises 


// console.log("akshay")

// const tareef = (message) => {
//     console.log(message);
// }

// const a = 10

// const delay = (ms) => {
//     return new Promise((resolve)=> {
//         setTimeout(() => {
//             resolve()
//         }, ms);
//     })
// }

// delay(2000)
// .then(()=>{
//     console.log("jain");
//     tareef("accha aadmi hai");
// })
// .catch((error)=>{
//     console.error(error)
// })


// async/await

// console.log("akshay jain");

// function tareef (message){
//     console.log(message);
// }

// function delay(ms){
//     setTimeout(()=>{
//         console.log("hi")
//     },ms)
// }
// function doubleDelay(ms){
//     setTimeout(()=>{
//         console.log("hello")
//     },ms)
// }
// function delay(ms){
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve()
//         },ms)
//     })
// }
// function doubleDelay(ms){
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve()
//         },ms)
//     })
// }

// try {
//     const aj = async() => {
//         console.log("1")
//         await delay(3000)
//         console.log("2")
//         await doubleDelay(3000)
//         console.log("3")

//     }
//     aj()
// } catch (error) {
//     console.error(error)
// }


// callbacks

// console.log("akshay")

// function tareef(message){
//     console.log(message)
// }

// function parentFunc(childFunc,ms){
//         setTimeout(()=>{
//             console.log("jain")
//             childFunc("accha aadmi hai")
//         },ms)
// }

// parentFunc(tareef,2000)