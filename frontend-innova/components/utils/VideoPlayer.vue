<template>
    <div>
            <div class="player-container">
              <div class="video-progress">
                <div class="video-progress-filled"></div>
              </div>
              <div class="player-controls">
                <div class="player-buttons">
                  <button
                    aria-label="play"
                    class="button play"
                    title="play"
                    @click="playVideo()"
                    type="button"
                  ></button>
                  <button
                    aria-label="pause"
                    class="button pause"
                    hidden
                    title="pause"
                    @click="pauseVideo()"
                    type="button"
                  ></button>
                  <button
                    aria-label="backward"
                    class="button backward"
                    title="backward"
                    type="button"
                  ></button>
                  <button
                    aria-label="forward"
                    class="button forward"
                    title="forward"
                    type="button"
                  ></button>
                  <button
                    aria-label="volume"
                    class="button volume"
                    title="volume"
                    type="button"
                  ></button>
                  <button
                    aria-label="silence"
                    class="button silence"
                    hidden
                    title="silence"
                    type="button"
                  ></button>
                  <div class="volume-progress">
                    <div class="volume-progress-filled"></div>
                  </div>
                  <div class="time-container">
                    <p class="current-time">0:00</p>
                    <p class="time-separator">/</p>
                    <p class="duration-video">0:00</p>
                  </div>
                </div>
                <div class="expand-container">
                  <button
                    aria-label="expand"
                    class="button expand"
                    title="expand"
                    type="button"
                  ></button>
                  <button
                    aria-label="reduce"
                    class="button reduce"
                    hidden
                    title="reduce"
                    type="button"
                  ></button>
                </div>
              </div>
            </div>
        <video
          class="video"
          src="@/assets/rain.mp4"
        ></video>
</div>
</template>


<script>

export default {
    data() {
        return {
            video: null,
        }
    },
    methods: {

        pauseVideo() {
        video.pause();
            pause.hidden = true;
            play.hidden = false;
        },

        playVideo() {
        video.play();
            play.hidden = true;
            pause.hidden = false;
        },

        backwardVideo() {
            video.currentTime -= 5;
        },

        forwardVideo() {
            video.currentTime += 5;
        },

        showSilenceIcon() {
            volume.hidden = true;
            silence.hidden = false;
        },

        showVolumeIcon() {
            volume.hidden = false;
            silence.hidden = true;
        }
    }
}
</script>


<style lang="scss">
.button {
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  background-repeat: none;
  background-position: center;
  cursor: pointer;
  margin-right: 30px;
  outline: none;
}

.button:active {
  transform: scale(0.9);
}

.backward {
  background-image: url('../../assets/icons/backward.svg');
}

.expand {
  background-image: url('../../assets/icons/expandd.svg');
  margin-right: 0;
}

.forward {
  background-image: url('../../assets/icons/forward.svg');
}

.pause {
  background-image: url('../../assets/icons/pause.svg');
}

.play {
  background-image: url('../../assets/icons/play.svg');
}

.reduce {
  background-image: url('../../assets/icons/reduce.svg');
  margin-right: 0;
}

.silence {
  background-image: url('../../assets/icons/silence.svg');
}

.volume {
  background-image: url('../../assets/icons/volume.svg');
}

.player {
  height: 100%;
  width: 100%;
}

.player-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) -22.28%,
    rgba(0, 0, 0, 0.2) 100%
  );
  z-index: 1;
  transition: 0.3s opacity;
}

.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 100px;
}

.information-container {
  width: 100%;
  height: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.player-container {
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-progress-bar {
  width: 100%;
}

.video {
  width: 100%;
  height: 100%;
  overflow: hidden;
}


.video-progress {
  display: flex;
  width: 100%;
  height: 6px;
  transition: 0.3s;
  background-color: #7c7c7c;
  cursor: pointer;
}

.video-progress-filled {
  width: 0;
  background-color: white;
}

.player-controls {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.player-buttons {
  display: flex;
  align-items: center;
}

.volume-progress {
  display: flex;
  width: 100px;
  height: 6px;
  transition: 0.3s;
  background-color: #7c7c7c;
  cursor: pointer;
}

.volume-progress-filled {
  width: 0;
  background-color: white;
}

.time-container {
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.current-time {
  width: 40px;
}

.duration-video {
  width: 40px;
}

.time-separator {
  margin: 0 10px 0 5px;
}

.expand-container {
  display: flex;
  align-items: center;
}

</style>