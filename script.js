// --- DOM要素の取得 ---
const opWrapper = document.getElementById('opWrapper');
const glow = document.getElementById('glow');
const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');

// 小ネタ用
const backstageTrigger = document.getElementById('backstage-trigger');
const backstageModal = document.getElementById('backstage-modal');
const closeModal = document.getElementById('closeModal');

// --- メインのアニメーションタイムライン ---
const tl = gsap.timeline({
    // タイムライン完了時の処理はここに集約
    onComplete: () => {
        // 画面全体をフェードアウト
        gsap.to(opWrapper, {
            duration: 1.5,
            opacity: 0,
            ease: 'power2.in',
            // フェードアウトが完了したらページ遷移
            onComplete: () => {
                // ★★ ここで遷移先のファイルを指定 ★★
                window.location.href = 'index/video.html';
            }
        });
    }
});

// [SEQ 1] タイトル表示 (0.5秒後から)
tl.to(mainTitle, { duration: 1.5, opacity: 1, ease: 'power2.out' }, 0.5);

// [SEQ 2] 光沢エフェクト (0.8秒後から)
tl.fromTo(glow, { opacity: 0, xPercent: -100 }, 
          { duration: 1.3, opacity: 1, xPercent: 100, ease: 'power1.inOut' }, 
          0.8);
tl.to(glow, { duration: 0.5, opacity: 0 }, ">-0.3"); // 直前の動作の0.3秒前から開始

// [SEQ 3] サブタイトル表示 (1.8秒後から)
tl.to(subTitle, { duration: 1.5, opacity: 1, ease: 'power2.out' }, 1.8);

// [SEQ 4] ページ遷移前の待機時間 (最後の演出が終わってから2秒待つ)
tl.to({}, {duration: 2});

// --- 小ネタのイベントリスナー ---
// 「A」の文字をクリックしたらモーダル表示
backstageTrigger.addEventListener('click', (e) => {
    e.stopPropagation(); // 親要素(opWrapper)へのイベント伝播を停止
    // タイムラインを一時停止
    tl.pause();
    backstageModal.classList.add('is-active');
});

// 閉じるボタンでモーダル非表示
closeModal.addEventListener('click', () => {
    backstageModal.classList.remove('is-active');
    // タイムラインを再開
    tl.resume();
});

// モーダルの背景クリックでも非表示
backstageModal.addEventListener('click', (e) => {
    if (e.target === backstageModal) {
        backstageModal.classList.remove('is-active');
        // タイムラインを再開
        tl.resume();
    }
});
