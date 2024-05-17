//elements
const playBtn = document.getElementById("playBtnToggle")
const audioEl = document.getElementById("audio")
const coverEl = document.getElementById("cover")
const songNameEl = document.getElementById("songName")
const changeVolume = document.getElementById("changeVolume")
const progressEl = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const muteEl = document.getElementById("mute")
let currentTrack = 0
//buttons
const player = document.getElementById("player")
const backwardEL = document.getElementById("backward")
const forwardEL = document.getElementById("forward")

//all musics
const tracks = [ 'chumoli-konsta','insonlar-konsta']

//change music
const changeTrack = (index) => {
    audioEl.src = `./musics/${tracks[index]}.mp3`
    coverEl.src = `./images/${tracks[index]}.jpg`
    songNameEl.textContent = tracks[index]
};
changeTrack(currentTrack)

//events
playBtn.addEventListener("click", () => {
    if(player.classList.contains("play")){
        audioEl.pause()
        coverEl.style.animationPlayState = "paused"
        player.classList.remove("play")
        playBtn.classList = "fa-solid fa-play"
    } else {
        coverEl.style.animationPlayState = "running"
        player.classList.add("play")
        audioEl.play()
        playBtn.classList = "fa-solid fa-pause"
    }
})
changeVolume.addEventListener("input" , (e) => {
    audioEl.volume = e.target.value
})
const plus = () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    changeTrack(currentTrack);
    coverEl.style.animationPlayState = "running"
    audioEl.play();
    playBtn.classList = "fa-solid fa-pause"
}
const minus = () => {
    currentTrack = (currentTrack - 1 + tracks.length ) % tracks.length;
    changeTrack(currentTrack);
    coverEl.style.animationPlayState = "running"
    audioEl.play();
    playBtn.classList = "fa-solid fa-pause"
}
backwardEL.addEventListener('click', () => {
    plus();
});
forwardEL.addEventListener('click', () => {
    minus();
});
const progress = (e) => {
    const { currentTime, duration } = e.srcElement
    const currentTimeMusic = currentTime
    const durationMusic = duration
    const progressPresent = (currentTimeMusic / durationMusic) * 100
    progressContainer.style.width = `${progressPresent}%`
    let minutes = Math.floor(durationMusic / 60)
    let seconds = Math.floor(durationMusic % 60)
    end.textContent = `${minutes}:${(seconds =
    seconds < 10 ? '0' + seconds : seconds)}`
  
    let currentMinutes = Math.floor(currentTimeMusic / 60)
    let currentSecond = Math.floor(currentTimeMusic % 60)
    start.textContent = `${currentMinutes}:${(currentSecond =
    currentSecond < 10 ? '0' + currentSecond : currentSecond)}`
}
function setProgressTime(e) {
    const width = this.clientWidth
    const clientX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clientX / width) * duration
}    
audioEl.addEventListener('timeupdate', progress)
progressEl.addEventListener('click', setProgressTime)
audio.addEventListener('ended', plus)