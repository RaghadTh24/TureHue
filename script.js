// العناصر
const imageUpload = document.getElementById('imageUpload');
const imageContainer = document.getElementById('imageContainer');
const pieContainer = document.getElementById('pieContainer');
const clearDotsBtn = document.getElementById('clearDots');

let currentColorBlindType = 'none';
let lastColorObj = null;
let colorBlindActive = false;
let activeButton = null;

// نطاق حجم الصورة
const MIN_WIDTH = 400;
const MAX_WIDTH = 1000;


// ألوان مختصرة
const colors = [
  // أحمر وألوان قريبة
  {name:'أحمر هندي', rgb:[205,92,92], category:'أحمر'}, {name:'كورال فاتح', rgb:[240,128,128], category:'أحمر'},
  {name:'سلمون', rgb:[250,128,114], category:'أحمر'}, {name:'سلمون غامق', rgb:[233,150,122], category:'أحمر'},
  {name:'سلمون فاتح', rgb:[255,160,122], category:'أحمر'}, {name:'كرزم', rgb:[220,20,60], category:'أحمر'},
  {name:'أحمر', rgb:[255,0,0], category:'أحمر'}, {name:'فاير بريك', rgb:[178,34,34], category:'أحمر'}, {name:'أحمر غامق', rgb:[139,0,0], category:'أحمر'},

  // وردي
  {name:'وردي', rgb:[255,192,203], category:'وردي'}, {name:'وردي فاتح', rgb:[255,182,193], category:'وردي'},
  {name:'وردي حار', rgb:[255,105,180], category:'وردي'}, {name:'وردي عميق', rgb:[255,20,147], category:'وردي'},
  {name:'أرجواني متوسط', rgb:[199,21,133], category:'وردي'}, {name:'أرجواني باهت', rgb:[219,112,147], category:'وردي'},

  // برتقالي
  {name:'سلمون فاتح', rgb:[255,160,122], category:'برتقالي'}, {name:'كورال', rgb:[255,127,80], category:'برتقالي'},
  {name:'طماطم', rgb:[255,99,71], category:'برتقالي'}, {name:'أحمر برتقالي', rgb:[255,69,0], category:'برتقالي'},
  {name:'برتقالي غامق', rgb:[255,140,0], category:'برتقالي'}, {name:'برتقالي', rgb:[255,165,0], category:'برتقالي'},

  // أصفر
  {name:'ذهبي', rgb:[255,215,0], category:'أصفر'}, {name:'أصفر', rgb:[255,255,0], category:'أصفر'},
  {name:'أصفر فاتح', rgb:[255,255,224], category:'أصفر'}, {name:'ليمون شيفون', rgb:[255,250,205], category:'أصفر'},
  {name:'أصفر ذهبي فاتح', rgb:[250,250,210], category:'أصفر'}, {name:'بابايا ويب', rgb:[255,239,213], category:'أصفر'},
  {name:'موكاسين', rgb:[255,228,181], category:'أصفر'}, {name:'خوخ فاتح', rgb:[255,218,185], category:'أصفر'},
  {name:'أصفر باهت', rgb:[238,232,170], category:'أصفر'}, {name:'كاكي', rgb:[240,230,140], category:'أصفر'},
  {name:'كاكي غامق', rgb:[189,183,107], category:'أصفر'},

  // بنفسجي وفوشيا
  {name:'لافندر', rgb:[230,230,250], category:'بنفسجي'}, {name:'ثستل', rgb:[216,191,216], category:'بنفسجي'},
  {name:'برقوق', rgb:[221,160,221], category:'بنفسجي'}, {name:'أرجواني', rgb:[238,130,238], category:'بنفسجي'},
  {name:'أوركيد', rgb:[218,112,214], category:'بنفسجي'}, {name:'فوشيا', rgb:[255,0,255], category:'بنفسجي'}, {name:'ماجنتا', rgb:[255,0,255], category:'بنفسجي'},
  {name:'أوركيد متوسط', rgb:[186,85,211], category:'بنفسجي'}, {name:'أرجواني متوسط', rgb:[147,112,219], category:'بنفسجي'},
  {name:'ريبكا بيربل', rgb:[102,51,153], category:'بنفسجي'}, {name:'أزرق بنفسجي', rgb:[138,43,226], category:'بنفسجي'},
  {name:'بنفسجي غامق', rgb:[148,0,211], category:'بنفسجي'}, {name:'أوركيد غامق', rgb:[153,50,204], category:'بنفسجي'},
  {name:'ماجنتا غامق', rgb:[139,0,139], category:'بنفسجي'}, {name:'بنفسجي', rgb:[128,0,128], category:'بنفسجي'},
  {name:'نيلي', rgb:[75,0,130], category:'بنفسجي'}, {name:'أزرق ليلكي', rgb:[106,90,205], category:'بنفسجي'},
  {name:'أزرق ليلكي غامق', rgb:[72,61,139], category:'بنفسجي'}, {name:'أزرق ليلكي متوسط', rgb:[123,104,238], category:'بنفسجي'},

  // أخضر
  {name:'أصفر أخضر', rgb:[173,255,47], category:'أخضر'}, {name:'شارتروز', rgb:[127,255,0], category:'أخضر'},
  {name:'عشب', rgb:[124,252,0], category:'أخضر'}, {name:'ليمون', rgb:[0,255,0], category:'أخضر'},
  {name:'ليمون أخضر', rgb:[50,205,50], category:'أخضر'}, {name:'أخضر باهت', rgb:[152,251,152], category:'أخضر'},
  {name:'أخضر فاتح', rgb:[144,238,144], category:'أخضر'}, {name:'ربيع متوسط', rgb:[0,250,154], category:'أخضر'},
  {name:'ربيع', rgb:[0,255,127], category:'أخضر'}, {name:'أخضر متوسط بحري', rgb:[60,179,113], category:'أخضر'},
  {name:'أخضر بحري', rgb:[46,139,87], category:'أخضر'}, {name:'أخضر غابي', rgb:[34,139,34], category:'أخضر'}, {name:'أخضر', rgb:[0,128,0], category:'أخضر'},
  {name:'أخضر غامق', rgb:[0,100,0], category:'أخضر'}, {name:'أخضر أصفر', rgb:[154,205,50], category:'أخضر'}, {name:'أوليف دراب', rgb:[107,142,35], category:'أخضر'},
  {name:'زيتوني', rgb:[128,128,0], category:'أخضر'}, {name:'أخضر زيتوني غامق', rgb:[85,107,47], category:'أخضر'}, {name:'أكوامارين متوسط', rgb:[102,205,170], category:'أخضر'},
  {name:'أخضر بحري غامق', rgb:[143,188,139], category:'أخضر'}, {name:'أخضر بحري فاتح', rgb:[32,178,170], category:'أخضر'}, {name:'أزرق مخضر غامق', rgb:[0,139,139], category:'أخضر'},
  {name:'تيل', rgb:[0,128,128], category:'أخضر'},

  // أزرق
  {name:'أكوا', rgb:[0,255,255], category:'أزرق'}, {name:'سماوي', rgb:[0,255,255], category:'أزرق'}, {name:'سماوي فاتح', rgb:[224,255,255], category:'أزرق'},
  {name:'تركواز باهت', rgb:[175,238,238], category:'أزرق'}, {name:'أكوامارين', rgb:[127,255,212], category:'أزرق'}, {name:'تركواز', rgb:[64,224,208], category:'أزرق'},
  {name:'تركواز متوسط', rgb:[72,209,204], category:'أزرق'}, {name:'تركواز غامق', rgb:[0,206,209], category:'أزرق'}, {name:'أزرق كاديت', rgb:[95,158,160], category:'أزرق'},
  {name:'أزرق فولاذي', rgb:[70,130,180], category:'أزرق'}, {name:'أزرق فولاذي فاتح', rgb:[176,196,222], category:'أزرق'}, {name:'أزرق باودر', rgb:[176,224,230], category:'أزرق'},
  {name:'أزرق فاتح', rgb:[173,216,230], category:'أزرق'}, {name:'سماء زرقاء', rgb:[135,206,235], category:'أزرق'}, {name:'سماء زرقاء فاتحة', rgb:[135,206,250], category:'أزرق'},
  {name:'سماء زرقاء داكنة', rgb:[0,191,255], category:'أزرق'}, {name:'أزرق دايجر', rgb:[30,144,255], category:'أزرق'}, {name:'زهرة الذرة', rgb:[100,149,237], category:'أزرق'},
  {name:'أزرق ليلكي متوسط', rgb:[123,104,238], category:'أزرق'}, {name:'أزرق ملكي', rgb:[65,105,225], category:'أزرق'}, {name:'أزرق', rgb:[0,0,255], category:'أزرق'},
  {name:'أزرق متوسط', rgb:[0,0,205], category:'أزرق'}, {name:'أزرق غامق', rgb:[0,0,139], category:'أزرق'}, {name:'كحلي', rgb:[0,0,128], category:'أزرق'}, {name:'أزرق منتصف الليل', rgb:[25,25,112], category:'أزرق'},

  // بني
  {name:'ذرة', rgb:[255,248,220], category:'بني'}, {name:'لوز مقشر', rgb:[255,235,205], category:'بني'}, {name:'بيسك', rgb:[255,228,196], category:'بني'},
  {name:'نافاخو', rgb:[255,222,173], category:'بني'}, {name:'قمح', rgb:[245,222,179], category:'بني'}, {name:'خشب فاتح', rgb:[222,184,135], category:'بني'},
  {name:'تان', rgb:[210,180,140], category:'بني'}, {name:'بني وردي', rgb:[188,143,143], category:'بني'}, {name:'بني رملي', rgb:[244,164,96], category:'بني'},
  {name:'ذهبي غامق', rgb:[218,165,32], category:'بني'}, {name:'ذهبي غامق جدًا', rgb:[184,134,11], category:'بني'}, {name:'بيرو', rgb:[205,133,63], category:'بني'},
  {name:'شوكولاتة', rgb:[210,105,30], category:'بني'}, {name:'سرج', rgb:[139,69,19], category:'بني'}, {name:'سيينا', rgb:[160,82,45], category:'بني'}, {name:'بني', rgb:[165,42,42], category:'بني'},
  {name:'مارون', rgb:[128,0,0], category:'بني'},

  // أبيض
  {name:'أبيض', rgb:[255,255,255], category:'أبيض'}, {name:'ثلج', rgb:[255,250,250], category:'أبيض'}, {name:'هاني ديو', rgb:[240,255,240], category:'أبيض'},
  {name:'كريم النعناع', rgb:[245,255,250], category:'أبيض'}, {name:'أزور', rgb:[240,255,255], category:'أبيض'}, {name:'أليس بلو', rgb:[240,248,255], category:'أبيض'},
  {name:'أبيض شبح', rgb:[248,248,255], category:'أبيض'}, {name:'أبيض دخاني', rgb:[245,245,245], category:'أبيض'}, {name:'صدف البحر', rgb:[255,245,238], category:'أبيض'},
  {name:'بيج', rgb:[245,245,220], category:'أبيض'}, {name:'أولد لَس', rgb:[253,245,230], category:'أبيض'}, {name:'أبيض زهري', rgb:[255,250,240], category:'أبيض'},
  {name:'عاجي', rgb:[255,255,240], category:'أبيض'}, {name:'أبيض عتيق', rgb:[250,235,215], category:'أبيض'}, {name:'كتان', rgb:[250,240,230], category:'أبيض'}, {name:'لافندر بلش', rgb:[255,240,245], category:'أبيض'}, {name:'ضباب وردي', rgb:[255,228,225], category:'أبيض'},

  // رمادي وأسود
  {name:'غامض', rgb:[220,220,220], category:'رمادي'}, {name:'رمادي فاتح', rgb:[211,211,211], category:'رمادي'}, {name:'فضي', rgb:[192,192,192], category:'رمادي'},
  {name:'رمادي غامق', rgb:[169,169,169], category:'رمادي'}, {name:'رمادي', rgb:[128,128,128], category:'رمادي'}, {name:'رمادي غامق جدًا', rgb:[105,105,105], category:'رمادي'},
  {name:'رمادي أزرق فاتح', rgb:[119,136,153], category:'رمادي'}, {name:'رمادي أزرق', rgb:[112,128,144], category:'رمادي'}, {name:'رمادي أزرق غامق', rgb:[47,79,79], category:'رمادي'}, {name:'أسود', rgb:[0,0,0], category:'أسود'}
];

// إيجاد أقرب لون
function rgbToColorName([r, g, b]) {
  let closest = colors[0], min = Infinity;
  colors.forEach((c) => {
    const d = Math.sqrt((r - c.rgb[0]) ** 2 + (g - c.rgb[1]) ** 2 + (b - c.rgb[2]) ** 2);
    if (d < min) { min = d; closest = c; }
  });
  return closest;
}

// محاكاة عمى الألوان
function applyColorBlindness(rgb, type) {
  if (type === 'none') return rgb;
  let [r, g, b] = rgb;
  let newR = r, newG = g, newB = b;
  if (type === 'protanopia') { newR=0.56667*r+0.43333*g; newG=0.55833*r+0.44167*g; newB=0.24167*g+0.75833*b; }
  else if (type === 'deuteranopia') { newR=0.625*r+0.375*g; newG=0.7*r+0.3*g; newB=0.3*g+0.7*b; }
  else if (type === 'tritanopia') { newR=0.95*r+0.05*b; newG=0.43333*g+0.56667*b; newB=0.475*g+0.525*b; }
  return [Math.round(newR), Math.round(newG), Math.round(newB)];
}

// إنشاء النقطة على الصورة
function createDot(x, y, colorObj) {
  const dot = document.createElement('div');
  dot.className = 'color-dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  
  const [r,g,b] = colorObj.rgb;
  const brightness = (r + g + b) / 3;
  dot.style.backgroundColor = `rgba(${r},${g},${b},0.35)`;
  dot.style.color = brightness > 200 ? '#000' : '#fff';
  dot.style.border = brightness > 200 ? '2px solid #000' : '2px solid #fff';
  
  // محتوى الدائرة: التصنيف فوق واسم اللون بين قوسين تحت
  dot.innerHTML = `<div style="font-size: 10px; line-height: 1;">${colorObj.category}</div>
                   <div style="font-size: 9px; line-height: 1;">(${colorObj.name})</div>`;
  
  dot.style.display = 'flex';
  dot.style.flexDirection = 'column';
  dot.style.justifyContent = 'center';
  dot.style.alignItems = 'center';
  dot.style.textAlign = 'center';
  
  imageContainer.appendChild(dot);

  dot.animate(
    [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
    { duration: 300, easing: 'ease-out' }
  );
}

// تحديث لون عمى الألوان
function updateBlindColor(colorObj,type){
  if(!colorObj) return;
  currentColorBlindType = type;
  colorBlindActive = type !== 'none';
  const blindColorBox = document.getElementById('blindColor');
  const blindHex = document.getElementById('blindHex');
  const blindName = document.getElementById('blindName');
  const newRgb = applyColorBlindness(colorObj.rgb,type);
  const newColorObj = rgbToColorName(newRgb);
  blindColorBox.style.backgroundColor = `rgb(${newRgb.join(',')})`;
  blindHex.innerText = `RGB(${newRgb.join(',')})`;
  let label='';
  if(type==='protanopia') label='رؤية عمى اللون الأحمر';
  else if(type==='deuteranopia') label='رؤية عمى اللون الأخضر';
  else if(type==='tritanopia') label='رؤية عمى اللون الأزرق';
  else label=`${newColorObj.category} (${newColorObj.name})`;
  blindName.innerText = label;
}

// التعامل مع رفع الصورة وحساب الـ Pie
function handleFile(file) {
  if(!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      imageContainer.innerHTML = '';
      pieContainer.innerHTML = '';

      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;
      const aspect = displayWidth / displayHeight;
      if(displayWidth > MAX_WIDTH){ displayWidth = MAX_WIDTH; displayHeight = MAX_WIDTH / aspect; }
      else if(displayWidth < MIN_WIDTH){ displayWidth = MIN_WIDTH; displayHeight = MIN_WIDTH / aspect; }

      img.width = displayWidth;
      img.height = displayHeight;
      imageContainer.style.width = displayWidth+'px';
      imageContainer.style.height = displayHeight+'px';
      imageContainer.appendChild(img);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const count = {};
      for(let i=0;i<imageData.length;i+=4){
        const key = `${imageData[i]},${imageData[i+1]},${imageData[i+2]}`;
        count[key] = (count[key] || 0) +1;
      }

      const namedCount = {};
      for(const key in count){
        const rgbArr = key.split(',').map(Number);
        const cObj = rgbToColorName(rgbArr);
        const display = `${cObj.name} (${cObj.category})`;
        namedCount[display] = (namedCount[display] || 0) + count[key];
      }

      const sorted = Object.entries(namedCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
      const total = sorted.reduce((sum,i)=>sum+i[1],0);

      const canvasChart = document.createElement('canvas');
      pieContainer.appendChild(canvasChart);
      const labels = sorted.map(i=>i[0]);
      const data = sorted.map(i=>((i[1]/total)*100).toFixed(1));
      const bgColors = labels.map(l=>{
        const base = l.split(' (')[0];
        const c = colors.find(c=>c.name===base);
        return c?`rgb(${c.rgb.join(',')})`:'#ccc';
      });

      new Chart(canvasChart.getContext('2d'), {
        type:'pie',
        data:{
          labels: labels.map((l,i)=>`${l} (${data[i]}%)`),
          datasets:[{ data:data, backgroundColor:bgColors, borderColor:'#fff', borderWidth:2 }]
        },
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ position:'bottom', labels:{ color:'#000', boxWidth:20, padding:15 } } }
        }
      });

      img.addEventListener('click', e=>{
        const rect = img.getBoundingClientRect();
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const colorObj = rgbToColorName([pixel[0],pixel[1],pixel[2]]);
        lastColorObj = colorObj;

        createDot(e.clientX - rect.left, e.clientY - rect.top, colorObj);

        // تحديث المستطيل العادي
        const normalColorBox = document.getElementById('normalColor');
        const normalHex = document.getElementById('normalHex');
        const normalName = document.getElementById('normalName');
        normalColorBox.style.backgroundColor = `rgb(${colorObj.rgb.join(',')})`;
        normalHex.innerText = `RGB(${colorObj.rgb.join(',')})`;
        normalName.innerText = `${colorObj.category} (${colorObj.name})`;

        if(colorBlindActive) updateBlindColor(colorObj,currentColorBlindType);
      });
    };
  };
}

// الأحداث
imageUpload.addEventListener('change', e=>handleFile(e.target.files[0]));
clearDotsBtn.addEventListener('click', ()=>{
  document.querySelectorAll('.color-dot').forEach(dot=>dot.remove());
  document.getElementById('normalColor').style.backgroundColor='';
  document.getElementById('normalHex').innerText='—';
  document.getElementById('normalName').innerText='—';
  document.getElementById('blindColor').style.backgroundColor='';
  document.getElementById('blindHex').innerText='—';
  document.getElementById('blindName').innerText='—';
  currentColorBlindType='none';
  lastColorObj=null;
  colorBlindActive=false;
  if(activeButton) activeButton.classList.remove('active-btn');
  activeButton=null;
  pieContainer.innerHTML='';
});

// أزرار عمى الألوان
['protanopia','deuteranopia','tritanopia'].forEach(type=>{
  const btn = document.getElementById(type);
  btn.addEventListener('click', ()=>{
    if(activeButton) activeButton.classList.remove('active-btn');
    btn.classList.add('active-btn');
    activeButton = btn;
    currentColorBlindType = type;
    colorBlindActive = true;
    if(lastColorObj) updateBlindColor(lastColorObj,type);
  });
});