const elms = []

function createElm() {
    const elm = document.createElement('div')
    elm.id = 'maze_elm'
    elms.push(elm)
    document.body.appendChild(elm)
}


const sings = [ String.fromCharCode("0x" + 2571), String.fromCharCode("0x" + (2571+1)) , String.fromCharCode("0x" + (2571+2)) ]
let content = ""

async function animate() {
    for(let elm of elms) {
        content = ""
        for (let n = 0; n < Math.floor(0.007 * elm.offsetHeight * elm.offsetWidth); n++) {
            content += sings[Math.floor(Math.random() * sings.length)]//String.fromCharCode("0x" + (2571 + Math.floor(Math.random() * Math.floor(2))))
        }
        elm.innerHTML = content
        await sleep(0.5/(elms.length*0.98))
        await pauseHalt()
    }
    requestAnimationFrame(animate)
}

// repeatF(()=>createElm(), 6)
// animate()





let o =  setInterval(()=> {
    const elm=document.body
    content = ""
    for (let n = 0; n < Math.floor(0.007 * elm.offsetHeight * elm.offsetWidth); n++) {
        content += sings[Math.floor(Math.random() * sings.length)]//String.fromCharCode("0x" + (2571 + Math.floor(Math.random() * Math.floor(2))))
    }
    elm.innerHTML = content
    //clearInterval(o)
}, 500)