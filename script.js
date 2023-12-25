const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const button2 = document.createElement("button");
const question2 = document.querySelector(".question2")

let noButtonsAdded = false;

const goodEmojis = ["😀", "😆", "🎉", "🤗"]; 

// needs to be defined as an async lambda apparently?
yesBtn.addEventListener("click", async () => {
 
  if (noButtonsAdded) {
    button2.remove(); 
  }
  noBtn.remove();

  for(let i = 0; i < 88; i++) {
    const btn = document.createElement("button");
    btn.textContent = goodEmojis[Math.floor(Math.random() * goodEmojis.length)];
    const randomX = randPosWidth();
    const randomY = randPosHeight();
    
    btn.style.position = "absolute";  
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;

    document.body.appendChild(btn); 
    await sleep(50);
  }

  // murk all buttons, no take backs
  document.querySelectorAll("button").forEach(btn => {
    btn.remove(); 
  });

  // for some reason this value needs to be the same as the above sleep
  // or else some weird race condition happens
  await sleep(100)
  question.innerHTML = "you really wanna lose in karting that bad? 😈";
  gif.src =
    "https://media.giphy.com/media/e6delmTIMbzzi/giphy.gif";
  
  question2.innerHTML = "^ you when i pass you on turn 2"
  

});


noBtn.addEventListener("mouseover", () => {
  const randomX = randPosWidth();
  const randomY = randPosHeight();

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  question.innerHTML = "you can't click no!";
  gif.src =
    "https://media.giphy.com/media/2aw9gwZlltbdX92b4w/giphy.gif";
});


const badEmojis = ["😠", "😡", "😭", "😔", "😣", "😖", "😢"];
noBtn.addEventListener("mouseover", () => {
  // get random emoji
  const randomIndex = Math.floor(Math.random() * badEmojis.length);
  const emoji = badEmojis[randomIndex]; 

  button2.textContent = emoji;

  // bound it even further so that the emoji stays within reason
  const randomX = randPosWidth();
  const randomY = randPosHeight();
  
  button2.style.position = "absolute";  
  button2.style.left = `${randomX}px`;
  button2.style.top = `${randomY}px`;  
  
  document.body.appendChild(button2);
  
  // set flag so if yes is pressed, correct order of events is preserved
  noButtonsAdded = true;

});

noBtn.addEventListener("click", () => {
  // removes all the angry emoji buttons if they exist
  if (noButtonsAdded) {
    button2.remove(); 
  }
  question.innerHTML = "How did you even click that?????";
  gif.src =
    "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif";
})

// generic function that only returns rand based on noBtn window size
// not very extendable
// bad swe practice oops
function randPosWidth() {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  return Math.floor(Math.random() * maxX);
}
// oh god should this just be a template?
function randPosHeight() {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerHeight - noBtnRect.width;
  return Math.floor(Math.random() * maxX);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
