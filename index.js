const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1500
canvas.height = 700


//bottom
const bg = new Image()
const bgNight = new Image() 
bg.src = 'bg.png'
bgNight.src = "bg-night.jpg"

let isDay = true



const addBottom = () => {

    ctx.beginPath()

    ctx.fillStyle =  isDay ? "#3cc252" : 'gray'

    ctx.fillRect(0, canvas.height - 100, canvas.width, 100)

    ctx.drawImage(isDay ? bg : bgNight, 0, 0, canvas.width, canvas.height - 100)

}

//player
const leftImg = new Image()
leftImg.src = "left.png"

const rightImg = new Image()
rightImg.src = "right.png"


let currentImg = rightImg

let goLeft = false
let goRight = false
let jumpUp = false
let jumpDown = false

const defaultPositionDog = canvas.height - 180

let imgPosX = 50;
let imgPosY = defaultPositionDog

const playerStep = 5
const jumpPlayerStep = 5

let left = false

const addImage = () => {

    if(goLeft) {

        let goLeft = true
        
        platforms.forEach(({ platformX, width }) => {
            
            if(imgPosX <= platformX + width && imgPosX + 130 >= platformX + 10) {

                if(imgPosX - playerStep > platformX && imgPosX - playerStep < platformX + width && imgPosY > canvas.height - 190) {

                    goLeft = false
                    
                } 
                
                if(imgPosX + 100 <= platformX) {
                    jumpDown = true
                }

            }
            
            
        })
        
        if(goLeft) {
            imgPosX = imgPosX - playerStep
        }

        if(imgPosY >= defaultPositionDog) {
            jumpDown = false
        }
        
    }

    if(goRight) {

        let goRight = true

        platforms.forEach(({ platformX, platformY, width }) => {

            if(imgPosX + 130 > platformX - 50 && imgPosX < platformX + width + 10 ) {

                if(imgPosX + 130 + playerStep > platformX && imgPosX + 120 - playerStep < platformX + width && imgPosY > canvas.height - 190) {

                    goRight = false

                }

                if(imgPosY <= platformY && imgPosX > platformX + width) {

                    jumpDown = true

                }
            }


        })

        if(goRight) {
            imgPosX = imgPosX + playerStep
        }


        if(imgPosY === defaultPositionDog) {
            jumpDown = false
        }

    }

    if(imgPosX > 1200) {

        isDay = false

    } else {

        isDay = true

    }

    if(jumpUp) {
        imgPosY = imgPosY - jumpPlayerStep
    }

    if(jumpDown) {

        imgPosY = imgPosY + jumpPlayerStep


        platforms.forEach(({ platformX, platformY, width }) => {

            if(imgPosX + 130 > platformX - width + 5 && imgPosX < platformX + width + 5) {

                if(imgPosX >= platformX && imgPosX <= platformX + width + 10 || imgPosX + 130 >= platformX && imgPosX <= platformX + width + 10) {
                    
                    if(imgPosY + 80 === platformY) jumpDown = false
        
                }
            }
        })


        
        if(imgPosY >= canvas.height - 180) {
            jumpDown = false
        }

    }

    boxes.forEach(({ boxPosX }, index) => {

        if(imgPosX >= boxPosX && imgPosX <= boxPosX + 100 || imgPosX + 130 >=  boxPosX && imgPosX <= boxPosX + 100) {

            boxes.splice(index, 1)

            boxScore++
        }
    })
    
    ctx.drawImage(currentImg, imgPosX, imgPosY, 130, 80)
}

const startJump = () => {

    jumpUp = true

    setTimeout(() => {
        jumpUp = false
        jumpDown = true
    }, 350)
}

//add C++
const cImg = new Image()
cImg.src = "cpp.png"

const c = [
    
]

const addCPP = () => {

    c.push({
        cPosX: !left ? imgPosX + 130 : imgPosX - 50,
        cPosY: imgPosY + 20,
        isRight: left ? false : true
    })

    
}

const renderCPP = () => {

    c.forEach(({ cPosX, cPosY, isRight }, index) => {

        ctx.drawImage(cImg, cPosX, cPosY, 50, 50)

        c[index].cPosX = isRight ? cPosX + 10 : cPosX - 10

        if(cPosX > canvas.width || cPosX < 0) {
            c.slice(index, 1)
        }

        if(frontenders[0].frontPosX === 650 && cPosX + 40 > 750 && cPosX < 800 && cPosY + 50 > canvas.height - 300 && frontenders.length > 0) {

            c.splice(index, 1)

            frontenders[0].hp = frontenders[0].hp - 10

        }

    })
}


//box
const boxImage = new Image()
boxImage.src = "box.png"

let boxScore = 0


const defaultBoxPosY = canvas.height - 120
const createXpos = () => Math.round(Math.random() * (1200 - 100) + 100)

const boxes = [
    {
        id: 1,
        boxPosX: createXpos(),
    },
    {
        id: 2,
        boxPosX: createXpos(),
    },
    {
        id: 3,
        boxPosX: createXpos(),
    },
    {
        id: 4,
        boxPosX: createXpos(),
    },
    {
        id: 5,
        boxPosX: 470,
        boxPosY: canvas.height - 250,
    },
]

const addBox = () => {

    ctx.fillStyle = "black"

    ctx.font = "48px serif";

    ctx.fillText(`Your opened presents: ${boxScore}`, 200, 200)

    boxes.forEach(({ boxPosX, boxPosY }) => ctx.drawImage(boxImage, boxPosX, boxPosY || defaultBoxPosY, 70, 30))

}

//key listeners
document.addEventListener('keypress', ({ key }) => {
    if(key === "a") {
        goLeft = true
        currentImg = leftImg
        left = true
    }

    if(key === 'd') {
        goRight = true
        currentImg = rightImg
        left = false
    }

    if(key === ' ') {
        startJump()
    }


    if(key === 'e') {
        addCPP()
    }

})


document.addEventListener('keyup', ({ key }) => {
    if(key === 'a') {
        goLeft = false
    }

    if(key === 'd') {
        goRight = false
    }
})

//platforms
const platforms = [
    {
        platformX: 900,
        platformY: canvas.height - 170,
        width: 100,
        height: 50
    },
    {
        platformX: 200,
        platformY: canvas.height - 170,
        width: 80,
        height: 50
    },
    {
        platformX: 350,
        platformY: canvas.height - 220,
        width: 80,
        height: 120
    },

    {
        platformX: 480,
        platformY: canvas.height - 150,
        width: 80,
        height: 40
    },
    
]
const addPlatform = () => {

    ctx.beginPath()
    ctx.fillStyle = isDay ? "#3cc252" : 'gray'
    
    platforms.forEach(({ platformX, platformY, height, width}) => {
        ctx.fillRect(platformX, platformY, width, height)
    })
}

//castle
const castle = new Image()
castle.src = 'castle.png'

const castleHeight = 200
const castleWidth = 300
const castleY = canvas.height - 295
const castleX = 1200

const addCastle = () => {
    ctx.drawImage(castle, castleX, castleY, castleWidth, castleHeight)
}


//small dogs

const dogsStep = 2


const dogs = [
    {
        isLeft: false,
        dogPosX: 1250,
        posY: canvas.height - 130,
        dogStep: Math.floor(Math.random() * (3 - 1) + 1)
    },
    {
        isLeft: false,
        dogPosX: 1370,
        posY: canvas.height - 130,
        dogStep: Math.floor(Math.random() * (3 - 1) + 1)
    },
    {
        isLeft: false,
        dogPosX: 1320,
        posY: canvas.height - 100,
        dogStep: Math.floor(Math.random() * (3 - 1) + 1)
    }
]

const addDogs = () => {

    dogs.forEach(({ dogPosX, posY, isLeft, dogStep }, index) => {

        if(dogPosX + dogStep > 1410) {
            dogs[index].dogStep = -dogStep
            dogs[index].isLeft = !isLeft
            
        }

        if(dogPosX + dogStep < 1210) {
            dogs[index].dogStep = -dogStep
            dogs[index].isLeft = !isLeft
        }

        dogs[index].dogPosX = dogPosX + dogStep


        ctx.drawImage(isLeft ? leftImg : rightImg, dogPosX, posY, 90, 50)

    })

}


//add frontender
const frontImg = new Image()
frontImg.src = 'front.gif'

let killedGovnokoderov = 0


const frontenders = [
    {
        img: frontImg,
        frontPosX: 650,
        fronPosY: canvas.height - 300,
        hp: 100
    }
]


const addFront = () => {
    ctx.fillStyle = "black"
    ctx.fillText(`Killed jsnikov: ${killedGovnokoderov}`, 1000, 200)

    frontenders.forEach(( { img, frontPosX, fronPosY, hp }, index) => {

        if(hp > 0) {
            ctx.strokeRect(frontPosX + 69,  fronPosY - 16, 101, 12)
            ctx.fillStyle = 'red'
            ctx.fillRect(frontPosX + 70, fronPosY - 15, hp, 10)
            ctx.fillStyle = hp > 50 ? 'white' : 'black'
        }

        ctx.font = "10px serif";
        ctx.fillText(hp, frontPosX + 115, fronPosY - 6)
        ctx.drawImage(img, frontPosX, fronPosY, 220, 200)

        
        if(hp <= 0) {

            ctx.fillStyle = "white"
            ctx.fillRect(frontPosX - 120, fronPosY - 80, 170, 100)
            ctx.moveTo(frontPosX - 120 + 170, fronPosY)
            ctx.lineTo(frontPosX - 120 + 170, fronPosY + 20);
            ctx.lineTo(frontPosX - 120 + 170 + 30, fronPosY + 20)
            ctx.fill()

            ctx.fillStyle = "black"
            ctx.font = "30px serif"
            ctx.fillText('Аааа!!111', frontPosX - 110, fronPosY - 50)
            ctx.fillText('я учить с++', frontPosX - 110, fronPosY - 15)

            frontenders[index].frontPosX = frontPosX + 10
            

        }

        if(frontPosX + 220 > canvas.width) {
            frontenders.slice(index, 1)
        }
        
    })

}




//start
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addBottom()
    addPlatform()
    addFront()
    addImage()
    addCastle()
    addBox()
    addDogs()
    renderCPP()
}



const frontenderInterval = setInterval(() => {
    frontenders[0] = {
        img: frontImg,
        frontPosX: 650,
        fronPosY: canvas.height - 300,
        hp: 100
    }
}, 20000)

const interval = setInterval(() => update(), 16)