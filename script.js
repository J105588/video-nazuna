// --- DOM要素の取得 ---
const opWrapper = document.getElementById('opWrapper');
const glow = document.getElementById('glow');
const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');
const scrollTip = document.getElementById('scrollTip');

// 小ネタ用
const backstageTrigger = document.getElementById('backstage-trigger');
const backstageModal = document.getElementById('backstage-modal');
const closeModal = document.getElementById('closeModal');

// --- メインのアニメーションタイムライン ---
const tl = gsap.timeline({
    // タイムラインが完了したら、オープニングを消してスクロール可能にする
    onComplete: () => {
        gsap.to(opWrapper, {
            duration: 1.5,
            opacity: 0,
            ease: 'power2.inOut',
            onComplete: () => {
                opWrapper.style.display = 'none'; // DOMから消す
            }
        });
    }
});

// [SEQ 1] タイトル表示
tl.to(mainTitle, { duration: 1.5, opacity: 1, ease: 'power2.out' }, 0.5);

// [SEQ 2] 光沢エフェクト
tl.fromTo(glow, { opacity: 0, xPercent: -100 }, 
          { duration: 1.3, opacity: 1, xPercent: 100, ease: 'power1.inOut' }, 
          0.8);
tl.to(glow, { duration: 0.5, opacity: 0 }, ">-0.3");

// [SEQ 3] サブタイトル表示
tl.to(subTitle, { duration: 1.5, opacity: 1, ease: 'power2.out' }, 1.8);

// [SEQ 4] スクロール誘導メッセージ表示
tl.to(scrollTip, { duration: 1, opacity: 1, ease: 'power2.out' }, 3.5);

// [SEQ 5] 全体が消える前の待機時間
tl.to({}, {duration: 2}); // 2秒間待機

// --- 小ネタのイベントリスナー ---
// 「A」の文字をクリックしたらモーダル表示
backstageTrigger.addEventListener('click', (e) => {
    e.stopPropagation(); // 親要素へのイベント伝播を停止
    backstageModal.classList.add('is-active');
});

// 閉じるボタンでモーダル非表示
closeModal.addEventListener('click', () => {
    backstageModal.classList.remove('is-active');
});

// モーダルの背景クリックでも非表示
backstageModal.addEventListener('click', (e) => {
    if (e.target === backstageModal) {
        backstageModal.classList.remove('is-active');
    }
});
