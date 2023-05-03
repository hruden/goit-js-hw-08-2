import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.getElementById("vimeo-player");
const player = new Player(iframe);

player.on("timeupdate", throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))
function onPlay(currentTime){
  localStorage.setItem("videoplayer-current-time", currentTime.seconds)
}