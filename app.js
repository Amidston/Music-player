const carousel = [...document.querySelectorAll(".carousel img")]
const backToHomeBtn = document.querySelector(".music-player-section .back-btn")
const musicPlayerSection = document.querySelector(".music-player-section")
const playlistSection = document.querySelector(".playlist")
const navBtn = document.querySelector(".music-player-section .nav-btn")
const backToMusicPlayer = document.querySelector(".playlist .back-btn")
const music = document.querySelector("#audio-source")
const seekBar = document.querySelector(".music-seek-bar")
const songName = document.querySelector(".current-song-name")
const artistName = document.querySelector(".artist-name")
const coverImage = document.querySelector(".cover")
const currentMusicTime = document.querySelector(".current-time")
const musicDuration = document.querySelector(".duration")
const queue = [...document.querySelectorAll(".queue")]
const forwardBtn = document.querySelector("i.fa-forward")
const backwardBtn = document.querySelector("i.fa-backward")
const playBtn = document.querySelector("i.fa-play")
const pauseBtn = document.querySelector("i.fa-pause")
const repeatBtn = document.querySelector("span.fa-redo")
const volumeBtn = document.querySelector("span.fa-volume-up")
const volumeSlider = document.querySelector(".volume-slider")
let carouselImageIndex = 0
let currentMusic = 0

const changeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle("active")

  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0
  } else {
    carouselImageIndex++
  }

  carousel[carouselImageIndex].classList.toggle("active")
}

setInterval(() => {
  changeCarousel()
}, 5000)

musicPlayerSection.addEventListener("touchmove", () => {
  musicPlayerSection.classList.add("active")
})

backToHomeBtn.addEventListener("click", () => {
  musicPlayerSection.classList.remove("active")
})

navBtn.addEventListener("click", () => {
  playlistSection.classList.add("active")
})

backToMusicPlayer.addEventListener("click", () => {
  playlistSection.classList.remove("active")
})

const setMusic = (i) => {
  seekBar.value = 0
  let song = songs[i]
  currentMusic = i

  music.src = song.path

  songName.innerHTML = song.name
  artistName.innerHTML = song.artist
  coverImage.src = song.cover

  setTimeout(() => {
    seekBar.max = music.duration
    musicDuration.innerHTML = formatTime(music.duration)
  }, 300)
  currentMusicTime.innerHTML = "00 : 00"
  queue.forEach((item) => item.classList.remove("active"))
  queue[currentMusic].classList.add("active")
}
console.log(music.duration)
setMusic(0)

const formatTime = (time) => {
  let min = Math.floor(time / 60)
  if (min < 10) {
    min = "0" + min
  }

  let sec = Math.floor(time % 60)
  if (sec < 10) {
    sec = "0" + sec
  }

  return `${min} : ${sec}`
}

playBtn.addEventListener("click", () => {
  music.play()
  playBtn.classList.remove("active")
  pauseBtn.classList.add("active")
})

pauseBtn.addEventListener("click", () => {
  music.pause()
  pauseBtn.classList.remove("active")
  playBtn.classList.add("active")
})

forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0
  } else {
    currentMusic++
  }
  setMusic(currentMusic)
  playBtn.click()
})

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1
  } else {
    currentMusic--
  }
  setMusic(currentMusic)
  playBtn.click()
})

repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active")
})

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("active")
  volumeSlider.classList.toggle("active")
})

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value
})

setInterval(() => {
  seekBar.value = music.currentTime
  currentMusicTime.innerHTML = formatTime(music.currentTime)
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    if (repeatBtn.className.includes("active")) {
      setMusic(currentMusic)
      playBtn.click()
    } else {
      forwardBtn.click()
    }
  }
}, 500)
seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value
})

queue.forEach((item, i) => {
  item.addEventListener("click", () => {
    setMusic(i)
    playBtn.click()
  })
})
