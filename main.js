const startbtn = document.getElementById("start");
let height = screen.height;
let width = screen.width;
let w;
var screenshoturl;
if (startbtn) {
  startbtn.addEventListener("click", Resize);
}
let leftpane;
function Resize() {
  let newh = Math.floor((height / 100) * 69);
  let neww = Math.floor((width / 100) * 69);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    let features = `width="100%",height="100%",right=${width},top=${0}`;
    leftpane = window.open(currentUrl, "", features);
   
  });
  Openpanel(neww,newh);
}
function Addscreenshot(){
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
    const screenshotImage = new Image();
    screenshotImage.src = dataUrl;
    screenshoturl = dataUrl;
    screenshotImage.style.width = "100%";
    screenshotImage.style.height = "100%";
    w.document.body.appendChild(screenshotImage);
})
}

function Openpanel(neww, newh) {
  let left = neww;
  let top = 0;
  let features = `width=${width-neww},height=${height-newh},left=${left},top=${0}`;
  
  w = window.open("", "", features);
  w.document.write("<button id='downloadBtn'>Download</button>");
  let button = w.document.getElementById("downloadBtn");

  button.style.background = "green";
  button.style.padding = "10px"
  button.style.margin = "10px"
  button.addEventListener('click', () => {
    if(screenshoturl){
    const anchor = document.createElement('a');
    anchor.href = screenshoturl;
    anchor.download = 'screenshot.png';
    anchor.click();
    }
    else{
      Addscreenshot();
    }
  });
}