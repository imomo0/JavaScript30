// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

let scroll = false;

// Build functions
function togglePlay() {
    if(video.paused) video.play();
    else video.pause();
}

function skip() {
    /*Kjelltech
    if(this.textContent === '25s »') video.currentTime += 25;
    else video.currentTime -= 10; */

    // Protos
    video.currentTime += parseFloat(this.dataset.skip);
}

function skipKey(second) {
    video.currentTime += second;
}

function slide() {
    video[this.name] = this.value;
}

function updateProgress() {
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}

function scrub(e) {
    if(scroll)
    {
    const jumpTo = (e.offsetX / 640) * video.duration;
    video.currentTime = jumpTo;
    }
}

function toggleFullscreen() {
    video.webkitRequestFullscreen();
}

function checkKey(e) {
    console.log(e.keyCode);
    if(e.keyCode === 32) togglePlay();
    if(e.keyCode === 39) skipKey(25);
    if(e.keyCode === 37) skipKey(-10);
}

// Hook up event listners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', toggleFullscreen);
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('pause', () => toggle.textContent = '►');
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', slide));
ranges.forEach(range => range.addEventListener('mousemove', slide));
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => scroll = true);
progress.addEventListener('mouseup', () => scroll = false);
window.addEventListener('keydown', checkKey);