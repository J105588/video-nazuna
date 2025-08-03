/**
 * 舞台裏（小ネタ）モーダルの制御スクリプト
 */
function setupBackstage(timeline) {
    // --- DOM要素の取得 ---
    const backstageTrigger = document.getElementById('backstage-trigger');
    const backstageModal = document.getElementById('backstage-modal');
    const closeModal = document.getElementById('closeModal');

    // --- 要素が見つからない場合は処理を中断 ---
    if (!backstageTrigger || !backstageModal || !closeModal) {
        console.error('舞台裏モーダルの要素が見つかりませんでした。');
        return;
    }

    // --- イベントリスナーの設定 ---
    // 「A」の文字をクリックしたらモーダル表示
    backstageTrigger.addEventListener('click', (e) => {
        e.stopPropagation(); // 親要素へのイベント伝播を停止
        if (timeline) {
            timeline.pause(); // メインのアニメーションを一時停止
        }
        backstageModal.classList.add('is-active');
    });

    // モーダルを閉じる処理をまとめる
    const hideModal = () => {
        backstageModal.classList.remove('is-active');
        if (timeline) {
            timeline.resume(); // メインのアニメーションを再開
        }
    };

    // 閉じるボタンでモーダル非表示
    closeModal.addEventListener('click', hideModal);

    // モーダルの背景クリックでも非表示
    backstageModal.addEventListener('click', (e) => {
        if (e.target === backstageModal) {
            hideModal();
        }
    });
}
