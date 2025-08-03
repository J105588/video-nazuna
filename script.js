// --- 初期設定とDOM要素取得 ---
const loader = document.getElementById('loader');
const scene1 = document.getElementById('scene-1');
const scene2 = document.getElementById('scene-2');
const scene3 = document.getElementById('scene-3');
const windowOverlay = document.querySelector('.window-overlay');
const chalkContainer = document.getElementById('chalk-container');
const chalkLottieContainer = document.getElementById('chalk-lottie');
const lottieContainer = document.getElementById('lottie-animation');
const titleContainer = document.querySelector('.title-container');
const skipButton = document.getElementById('skip-button');
const curtainLeft = document.querySelector('.curtain-left');
const curtainRight = document.querySelector('.curtain-right');

// --- ローディング処理 ---
window.addEventListener('load', () => {
    gsap.to(loader, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
            loader.style.display = 'none';
            scene1.classList.add('active'); // 最初のシーンを表示
            // チョークが書くLottieアニメーションを再生
            lottie.loadAnimation({
                container: chalkLottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://assets9.lottiefiles.com/packages/lf20_c5xhy2ee.json'
            });
        }
    });
});

// --- シーン遷移の汎用関数 ---
function switchScene(hideScene, showScene) {
    hideScene.classList.remove('active');
    showScene.classList.add('active');
}

// --- 第一幕の処理 ---
// 小ネタ：窓をクリックで昼夜反転
windowOverlay.addEventListener('click', () => {
    scene1.classList.toggle('night');
});
// チョークのコンテナをクリックで第二幕へ
chalkContainer.addEventListener('click', () => {
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3').play();
    gsap.to(chalkContainer, { duration: 0.5, scale: 1.2, opacity: 0, onComplete: startScene2 });
});

// --- 第二幕の処理 ---
function startScene2() {
    switchScene(scene1, scene2);
    const bgm = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/bensound-epic.mp3');
    bgm.volume = 0.5;
    bgm.play();

    // メインのLottieアニメーションを再生
    const mainAnimation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_Lpuvb4.json' // 花火のようなパーティクル
    });

    // タイトルをアニメーション表示
    gsap.to(titleContainer, { duration: 2, opacity: 1, delay: 1, ease: 'power2.out' });

    // アニメーション完了時、またはスキップ時の処理
    const onFinish = () => {
        bgm.pause(); // BGMを停止
        mainAnimation.stop(); //念のためアニメーションも停止
        gsap.to([titleContainer, lottieContainer, skipButton], {
            duration: 1,
            opacity: 0,
            onComplete: startScene3 // 全て消えたら第三幕へ
        });
    };
    
    mainAnimation.addEventListener('complete', onFinish);
    skipButton.addEventListener('click', onFinish);
}

// --- 第三幕の処理：カーテンコールとページ遷移 ---
function startScene3() {
    switchScene(scene2, scene3); // 第三幕（カーテンのシーン）を表示
    
    // カーテンを閉めるアニメーション
    gsap.fromTo(curtainLeft, { x: '-100%' }, { duration: 1.5, x: '0%', ease: 'power2.inOut' });
    gsap.fromTo(curtainRight, { x: '100%' }, { 
        duration: 1.5, 
        x: '0%', 
        ease: 'power2.inOut',
        // 閉まりきったら、0.5秒後に開け始める
        onComplete: () => {
            setTimeout(openCurtainsAndTransition, 500);
        }
    });
}

function openCurtainsAndTransition() {
    // カーテンを開けるアニメーション
    gsap.to(curtainLeft, { 
        duration: 2.5, 
        x: '-100%', 
        ease: 'power3.inOut'
    });
    gsap.to(curtainRight, { 
        duration: 2.5, 
        x: '100%', 
        ease: 'power3.inOut',
        // 右のカーテンが完全に開ききった瞬間にページ遷移
        onComplete: () => {
            window.location.href = 'index/video.html';
        }
    });
}
