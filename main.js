// 全局时钟同步
setInterval(() => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
    document.getElementById('current-date').innerText = `${dateStr} ${timeStr}`;
}, 1000);

const homeData = [
    { id: 'anti-fraud', icon: '💰', title: '反诈宝典', slogan: '警惕电信诈骗，守住血汗钱', marquee: '1.警惕电信诈骗，守住血汗钱 2.陌生来电多警惕，转账汇款先核实 3.下载国家反诈中心APP，守护财产安全 4.96110为反诈劝阻专线，请及时接听' },
    { id: 'traffic', icon: '🚒', title: '交通安全', slogan: '文明出行，平安相伴', marquee: '文明出行，遵守交规' },
    { id: 'campus', icon: '🎒', title: '平安校园', slogan: '平安校园，守护成长', marquee: '拒绝欺凌，阳光成长' },
    { id: 'fire', icon: '🧯', title: '消防知识站', slogan: '消防无小事，安全记心间', marquee: '隐患排查，从我做起' },
    { id: 'fight', icon: '🔨', title: '冲动零容忍', slogan: '遇事冷静，守法安心', marquee: '打架成本高，维权靠合法' },
    { id: 'bully', icon: '✋', title: '拒绝校园欺凌', slogan: '拒绝欺凌，守护青春', marquee: '不做旁观者，不当施暴者' }
];

// 初始化主页卡片轮播
const track = document.getElementById('carousel-track');
const generateCards = () => {
    let html = '';
    homeData.forEach(item => {
        html += `<div class="card" onclick="openCategory('${item.id}')">
            <div class="icon">${item.icon}</div>
            <h2>${item.title}</h2>
        </div>`;
    });
    return html;
};
track.innerHTML = generateCards() + generateCards(); // 复制一份以实现无缝滚动

function openCategory(id) {
    if(window.bgInterval) { clearInterval(window.bgInterval); window.bgInterval = null; }
    
    const data = homeData.find(d => d.id === id);
    document.getElementById('theme-slogan').innerText = data.slogan;
    document.getElementById('scrolling-marquee').innerText = data.marquee;
    
    document.getElementById('global-nav').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    
    const bg = document.getElementById('page-bg');
    const content = document.getElementById('detail-content');
    content.innerHTML = '';
    bg.style.backgroundImage = 'none';
    bg.style.backgroundColor = 'transparent';

    if (id === 'anti-fraud') {
        const antiFraudBgs = [];
        for(let i=1; i<=16; i++) antiFraudBgs.push(`素材/1.反诈/社区反诈照片/${i}.jpg`);
        let bgIdx = 0;
        bg.style.backgroundImage = `url('${antiFraudBgs[0]}')`;
        bg.style.transition = "background-image 1s ease-in-out";
        window.bgInterval = setInterval(() => {
            bgIdx = (bgIdx + 1) % antiFraudBgs.length;
            bg.style.backgroundImage = `url('${antiFraudBgs[bgIdx]}')`;
        }, 4000);

        content.innerHTML = `
            <h1 style="font-size:2.8rem; text-shadow:2px 2px 5px rgba(0,0,0,0.5); color:#1e3c72; margin-bottom: 20px;">反诈骗：守护您的钱袋子，远离电信网络诈骗</h1>
            <div class="btn-module" onclick="openMedia({type:'image', url:'素材/1.反诈/涉诈app合集.jpg'})">📱 常见涉诈APP合集 (点击查看)</div>
            <div class="btn-module" onclick="openMedia({type:'ppt'})">⚠️ 真实案例警示 (PPT图文轮播)</div>
            <div class="btn-module" onclick="openMedia({type:'report'})">📥 举报与求助与反诈视频</div>
        `;
    } 
    else if (id === 'traffic') {
        const trafficPhotos = ["1.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","会骑车≠会安全骑行！年龄限制、安全头盔、骑行规范，这些都是守护骑行安全的 “硬规矩”，缺一不可。未满12岁不骑自行车上路，未满16岁不骑电动车，骑行必须佩戴安全头盔！.GIF","文字图片1.png","文字图片2.png","文字图片3.png","文字图片4.png","车辆盲区真致命，不是司机没看到，而是根本看不到！家长务必叮嘱孩子，绝对不要在车辆周围玩耍或停留，远离大车就是远离危险。.GIF","遇到视线受阻的区域（如停靠车辆、障碍物后），过马路时一定要 “一停二看三通过”，不突然冲出，避免 “鬼探头” 风险。.GIF","骑行时不并排占道，不伸手打闹，转弯、变道前注意观察后方车辆，确保安全再行动。.GIF"];
        let trafficWall = trafficPhotos.map(f => `<img src="素材/2.交通安全/图片/${f}" class="photo-wall-img" onclick="openMedia({type:'image', url:this.src}); pauseWall()" onerror="this.src='https://via.placeholder.com/350x240?text=交通案例图'">`).join('');
        
        content.innerHTML = `
            <div class="media-grid" style="margin-bottom: 20px;">
                <div class="media-card" onclick="openMedia({type:'video', url:'素材/2.交通安全/视频/视频1.MP4'})">
                    <div class="video-ph">▶️</div>
                    <div class="title">播放交通安全警示视频</div>
                </div>
            </div>
            <h2 style="color:#2c3e50; font-size:2rem; margin-bottom: 10px;">交通安全图文案例墙 (点击图片放大)</h2>
            <div class="photo-wall-container">
                <div class="photo-wall-track" id="traffic-track" style="animation: scrollWall 40s linear infinite;">${trafficWall}${trafficWall}</div>
            </div>
        `;
    }
    else if (id === 'campus') {
        bg.style.backgroundColor = "rgba(144, 238, 144, 0.4)";
        let wallpapers = '';
        for(let i=1; i<=13; i++) {
            wallpapers += `<img src="素材/3.校园安全/校园安全 入校宣讲图片/${i}.jpg" class="photo-wall-img" onclick="openMedia({type:'image', url:this.src}); pauseWall()" onerror="this.src='https://via.placeholder.com/350x240?text=民警进校园${i}'">`;
        }
        content.innerHTML = `
            <h2 style="color:#2c3e50; font-size:2rem;">民警进校园 (点击照片放大)</h2>
            <div class="photo-wall-container">
                <div class="photo-wall-track" id="photo-track">${wallpapers}${wallpapers}</div>
            </div>
            <div class="btn-module" style="margin-top:20px;" onclick="openMedia({type:'video-list', videos: ['素材/3.校园安全/视频/8ab6e1fdc52e1558faaf57d8b613edc6.mp4','素材/3.校园安全/视频/cc47134201aa5fbdc1646fdf5c065394.mp4','素材/3.校园安全/视频/学生安全教育日.mp4'], title: '🎬 校园日常安全视频'})">🎬 选择播放校园安全视频片段</div>
        `;
    }
    else if (id === 'fire') {
        const fireBgs = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"].map(f => `素材/4.消防安全/民警查消防照片/${f}`);
        let bgIdx = 0;
        bg.style.backgroundImage = `url('${fireBgs[0]}')`;
        bg.style.transition = "background-image 2s ease-in-out";
        window.bgInterval = setInterval(() => {
            bgIdx = (bgIdx + 1) % fireBgs.length;
            bg.style.backgroundImage = `url('${fireBgs[bgIdx]}')`;
        }, 4000);

        const firePosters = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"].map(f => `素材/4.消防安全/宣传海报/${f}`);
        content.innerHTML = `
            <div class="fire-text-btn" onclick='openMedia({type:"marquee-slideshow", images: ${JSON.stringify(firePosters)}, title:"消防知识海报轮播"})'>
                🔥 叮！一组图教你解锁这些消防安全知识点
            </div>
        `;
    }
    else if (id === 'fight') {
        const fightImages = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","文字1.png","文字2.png"].map(f => '素材/5.打架教育/宣传海报（图片）/'+f);
        content.innerHTML = `
            <div class="btn-module" onclick="openMedia({type:'video-list', videos: ['素材/5.打架教育/视频/26531743d08ca088a37f5249446036e6.mp4','素材/5.打架教育/视频/c48b27625db7ad6ec749801a87a5fda9.mp4'], title: '⚖️ 选择播放调解教学视频'})">⚖️ 矛盾化解指南 (播放调解教学视频)</div>
            <div class="btn-module" onclick='openMedia({type:"marquee-slideshow", images: ${JSON.stringify(fightImages)}, title:"求助渠道指引 (自动轮播展示)"})'>📍 求助渠道指引 (全屏自动轮播展示)</div>
        `;
    }
    else if (id === 'bully') {
        const bullyImages = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"].map(f => '素材/6.防欺凌宣传/图片/'+f);
        content.innerHTML = `
            <div class="media-grid">
                <div class="media-card" onclick="openMedia({type:'video', url:'素材/6.防欺凌宣传/视频/1.MP4'})">
                    <div class="video-ph">▶️</div>
                    <div class="title">校园欺凌防治视频</div>
                </div>
                <div class="media-card" onclick='openMedia({type:"marquee-slideshow", images: ${JSON.stringify(bullyImages)}, title:"防欺凌图文宣传 (自动轮播展示)"})'>
                    <img src="素材/6.防欺凌宣传/图片/1.png" onerror="this.src='https://via.placeholder.com/300x200?text=防欺凌宣传图'">
                    <div class="title">防欺凌图文资料 (点击全屏查看自动轮播)</div>
                </div>
            </div>
        `;
    }

    document.getElementById('detail-page').classList.add('active');
}

function goBack() {
    goHome(); // 所有页面皆可一键退回上一层/首页
}
if(window.bgInterval) { clearInterval(window.bgInterval); window.bgInterval = null; }
    
function goHome() {
    document.getElementById('theme-slogan').innerText = '警务站互动科普终端';
    document.getElementById('scrolling-marquee').innerText = homeData[0].marquee;
    document.getElementById('global-nav').classList.remove('active');
    document.getElementById('detail-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
}

function pauseWall() {
    const track = document.getElementById('photo-track');
    if(track) track.style.animationPlayState = 'paused';
}
function resumeWall() {
    const track = document.getElementById('photo-track');
    if(track) track.style.animationPlayState = 'running';
}

function openMedia(item, event) {
    if(event) event.stopPropagation();
    const modal = document.getElementById('media-modal');
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    
    if (item.type === 'image') {
        content.innerHTML = `<img src="${item.url}" onerror="this.src='https://via.placeholder.com/1200x800?text=暂无高清图片，请配置实际素材'">`;
    } else if (item.type === 'video') {
        content.innerHTML = `<video src="${item.url}" controls muted autoplay></video>`;
    } else if (item.type === 'ppt') {
        const pptFiles = [
            "微信图片_20260326111755_106_51.jpg","微信图片_20260326111756_107_51.jpg","微信图片_20260326111757_108_51.jpg",
            "微信图片_20260326111758_109_51.jpg","微信图片_20260326111758_110_51.jpg","微信图片_20260326111759_111_51.jpg",
            "微信图片_20260326111800_112_51.jpg","微信图片_20260326111801_113_51.jpg","微信图片_20260326111802_114_51.jpg",
            "微信图片_20260326111802_115_51.jpg","微信图片_20260326111803_116_51.jpg","微信图片_20260326111804_117_51.jpg",
            "微信图片_20260326111805_118_51.jpg","微信图片_20260326111806_119_51.jpg","微信图片_20260326111806_120_51.jpg"
        ];
        let pptImages = pptFiles.map(f => `<img src="素材/1.反诈/ppt图片/${f}" style="height:80vh; width:auto; border:4px solid #fff; border-radius:15px; cursor:zoom-in;" onclick="openMedia({type:'image', url:this.src}, event)">`).join('');
        let pptHtml = `
            <div style="width:90vw; height:85vh; overflow:hidden; position:relative; background:rgba(0,0,0,0.5); border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <div style="display:flex; gap:20px; align-items:center; width:max-content; height:80vh; animation: scrollPPT 40s linear infinite;" onmouseenter="this.style.animationPlayState='paused'" onmouseleave="this.style.animationPlayState='running'">
                    ${pptImages}${pptImages}
                </div>
                <div style="color:white; font-size:1.5rem; margin-top:10px;">真实案例自动全屏无缝轮播（悬停暂停）</div>
            </div>
            <style>@keyframes scrollPPT { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 10px)); } }</style>
        `;
        content.innerHTML = pptHtml;
    } else if (item.type === 'video-list') {
        let vHtml = `<h3 style="font-size:2.2rem; color:#f1c40f; margin-bottom:30px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 15px;">${item.title}</h3><div class="media-grid" style="padding-bottom:50px;">`;
        item.videos.forEach((v, idx) => {
            vHtml += `<div class="media-card" style="box-shadow: 0 5px 15px rgba(0,0,0,0.5); background:#34495e;" onclick="openMedia({type:'video', url:'${v}'}, event)">
                <div class="video-ph" style="background:#2c3e50;">▶️</div>
                <div class="title" style="color:#fff;">点击播放短片 ${idx + 1}</div>
            </div>`;
        });
        vHtml += '</div>';
        content.innerHTML = `<div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:40px; border-radius:20px; text-align:center; width:90vw; height:85vh; overflow-y:auto; border:2px solid rgba(255,255,255,0.2);">${vHtml}</div>`;
    } else if (item.type === 'marquee-slideshow') {
        let imgs = item.images.map(src => `<img src="${src}" style="height:80vh; width:auto; border:4px solid #fff; border-radius:15px; cursor:zoom-in;" onclick="openMedia({type:'image', url:this.src}, event)">`).join('');
        let html = `
            <div style="width:90vw; height:85vh; overflow:hidden; position:relative; background:rgba(0,0,0,0.5); border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <div style="display:flex; gap:20px; align-items:center; width:max-content; height:80vh; animation: scrollMarquee ${item.images.length * 6}s linear infinite;" onmouseenter="this.style.animationPlayState='paused'" onmouseleave="this.style.animationPlayState='running'">
                    ${imgs}${imgs}
                </div>
                <div style="color:white; font-size:1.5rem; margin-top:10px;">${item.title} （悬停暂停，点击单张可再次放大）</div>
            </div>
            <style>@keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 10px)); } }</style>
        `;
        content.innerHTML = html;
    } else if (item.type === 'report') {
        const videos = [
            "268a8d14a9fc59975b4ef48eae13415c.mp4", "5bd3b0777225e6e003605f92f2888476.mp4", "61b4c7aa4619efdfbdbd7fe1c25b69ab.mp4",
            "9edc205dff79426f67bea2b54a61effc.mp4", "b86ac56e85f618854fef7a40617bd197.mp4", "c3d747e7b3eba485e298a0ddb5dcf047.mp4",
            "fee00ade74a91587a0ef980cb02127a2.mp4", "反诈短片.mp4"
        ];
        let vHtml = '<h3 style="font-size:2.2rem; color:#f1c40f; margin-bottom:30px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 15px;">📺 选择播放以下反诈宣传视频，了解更多防骗知识</h3><div class="media-grid" style="padding-bottom:50px;">';
        videos.forEach((v, idx) => {
            vHtml += `<div class="media-card" style="box-shadow: 0 5px 15px rgba(0,0,0,0.5); background:#34495e;" onclick="openMedia({type:'video', url:'素材/1.反诈/宣传视频/${v}'}, event)">
                <div class="video-ph" style="background:#2c3e50;">▶️</div>
                <div class="title" style="color:#fff;">宣传短片 ${idx + 1}</div>
            </div>`;
        });
        vHtml += '</div>';
        
        content.innerHTML = `
            <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:40px; border-radius:20px; text-align:center; width:90vw; height:85vh; overflow-y:auto; border:2px solid rgba(255,255,255,0.2);">
                <h2 style="color:#ff4757; font-size:3.5rem; margin-bottom:20px; text-shadow:0 2px 10px rgba(0,0,0,0.5);">🚨 举报与求助</h2>
                <div style="font-size:2.5rem; font-weight:bold; margin-bottom:20px; color:white;">
                    全国反诈劝阻专线：<span style="color:#ff4757; font-size:6rem; font-weight:900;">96110</span>
                </div>
                <div style="font-size:1.8rem; margin-bottom:40px; color:#ecf0f1; background:#c0392b; display:inline-block; padding:15px 30px; border-radius:50px; font-weight:bold;">
                    👇 请立即进入应用商店搜索下载「国家反诈中心 APP」守护财产安全！
                </div>
                ${vHtml}
            </div>
        `;
    }
    
    modal.classList.add('active');
}

function closeModal(event) {
    if(event) event.stopPropagation();
    const modal = document.getElementById('media-modal');
    modal.classList.remove('active');
    const content = document.getElementById('modal-content');
    const video = content.querySelector('video');
    if(video) video.pause();
    
    setTimeout(() => {
        content.innerHTML = '';
        resumeWall();
    }, 300);
}
