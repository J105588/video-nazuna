// --- DOM要素の取得 ---
const opWrapper = document.getElementById('opWrapper');
const glow = document.getElementById('glow');
const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');

// --- メインのアニメーションタイムライン ---
const tl = gsap.timeline({
    // タイムライン完了時の処理
    onComplete: () => {
        gsap.to(opWrapper, {
            duration: 1.5,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
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
tl.to(glow, { duration: 0.5, opacity: 0 }, ">-0.3");

// [SEQ 3] サブタイトル表示 (1.8秒後から)
tl.to(subTitle, { duration: 1.5, opacity: 1, ease: 'power2.out' }, 1.8);

// [SEQ 4] ページ遷移前の待機時間
tl.to({}, {duration: 2});


// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★ ここが最重要ポイントです！★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// ページが読み込まれたら（HTMLの準備が完了したら）、舞台裏のセットアップを実行
document.addEventListener('DOMContentLoaded', () => {
    // メインタイムライン(tl)を渡して、一時停止・再開できるようにする
    setupBackstage(tl);
});
