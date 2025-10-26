const cover = document.getElementById('cover');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('videoPlayer');
const choices = document.getElementById('choices');
const endImage = document.getElementById('endImage');

// 流程資料
// 流程資料 (已修正 A 結局流程)
const flow = {
  intro: { src:'videos/前言.mp4', next:'select' },

  select: { type:'choice', img:'images/劇本選擇.jpg', options:[
    { next:'A文學', top:'30%', left:'18%', width:'20%', height:'20%' },
    { next:'B程設', top:'30%', left:'60%', width:'20%', height:'20%' }
  ]},

  'A文學': { src:'videos/A文學.mp4', next:'A選擇' },
  'A選擇': { type:'choice', img:'images/A選擇.jpg', options:[
    { next:'A結局影片', top:'30%', left:'18%', width:'20%', height:'20%' }, // <--- 點擊後先到影片
    { next:'D友情', top:'30%', left:'60%', width:'20%', height:'20%' }
  ]},
  
  // *** 新增的 A 結局影片步驟 ***
  'A結局影片': { src:'videos/A結局.mp4', next:'A結局畫面' }, 
  // *** 結尾圖片步驟 (名稱從 A結局 改為 A結局畫面) ***
  'A結局畫面': { endImg:'images/A結尾.jpg' }, 

  'D友情': { src:'videos/D友情.mp4', next:'D選擇' },
  'D選擇': { type:'choice', img:'images/D選擇.jpg', options:[
    { next:'D結局', top:'30%', left:'18%', width:'20%', height:'20%' },
    { next:'G靈異', top:'30%', left:'60%', width:'20%', height:'20%' }
  ]},
  'D結局': { endImg:'images/D結尾.jpg' },

  'G靈異': { src:'videos/G靈異.mp4', next:'G結局' },
  'G結局': { endImg:'images/G結尾.jpg' },

  'B程設': { src:'videos/B程設.mp4', next:'B選擇' },
  'B選擇': { type:'choice', img:'images/B選擇.jpg', options:[
    { next:'C療癒', top:'30%', left:'18%', width:'20%', height:'20%' },
    { next:'B作弊', top:'30%', left:'60%', width:'20%', height:'20%' }
  ]},
  // B程設 選擇 'C療癒'
  'C療癒': { src:'videos/C療癒.mp4', next:'C結局影片' }, // 影片播完，跳到 C 結局影片
  'C結局影片': { src:'videos/C結局.mp4', next:'C結局畫面' }, // C 結局影片播放
  'C結局畫面': { endImg:'images/C結尾.jpg' }, // 顯示 C 結尾圖片

  'B作弊': { src:'videos/B作弊.mp4', next:'B選擇2' },
  'B選擇2': { type:'choice', img:'images/B選擇2.jpg', options:[
    { next:'B結局', top:'30%', left:'18%', width:'20%', height:'20%' },
    { next:'E魔王', top:'30%', left:'60%', width:'20%', height:'20%' }
  ]},
  'B結局': { endImg:'images/B結尾.jpg' },
  'E魔王': { src:'videos/E魔王.mp4', next:'E結局' },
  'E結局': { endImg:'images/E結尾.jpg' }
};

// 點封面開始
cover.addEventListener('click', () => {
  cover.style.display = 'none';
  playStep('intro');
});

function playStep(key){
  endImage.style.display = 'none';
  const step = flow[key];
  if(!step) return;

  console.log("播放步驟:", key);

  if(step.src){
    videoContainer.style.display = 'block';
    video.src = step.src;
    video.load();
    video.play();

    // 移除之前的事件，避免衝突
    video.removeEventListener('ended', videoEndedHandler);
    video.addEventListener('ended', videoEndedHandler);

    function videoEndedHandler(){
      videoContainer.style.display = 'none';
      if(step.next) playStep(step.next);
    }

    return;
  }

  if(step.type === 'choice'){
    showChoices(step);
    return;
  }

  if(step.endImg){
    endImage.src = step.endImg;
    endImage.style.display = 'block';
    endImage.onclick = resetToCover;
    return;
  }
}


// 顯示選擇畫面
function showChoices(step){
  choices.style.display='block';
  choices.innerHTML = `<img src="${step.img}" alt="選擇畫面">`;

  step.options.forEach(opt=>{
    const zone = document.createElement('div');
    zone.className = 'hotzone';
    zone.style.top = opt.top;
    zone.style.left = opt.left;
    zone.style.width = opt.width;
    zone.style.height = opt.height;
    zone.onclick = ()=>{
      choices.style.display='none';
      playStep(opt.next);
    };
    choices.appendChild(zone);
  });
}


// 回到封面
function resetToCover(){
  endImage.style.display = 'none';
  cover.style.display = 'block';
}
