(function (src, cb) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = cb;
    (document.head || document.body).appendChild(s);
})('https://ucarecdn.com/libs/blinkloader/3.x/blinkloader.min.js', function () {
    window.Blinkloader.optimize({
        pubkey: '8655037f335d8f4f0419',
        fadeIn: false,
        lazyload: true,
        smartCompression: true,
        responsive: true,
        retina: true,
        webp: true
    });
});
