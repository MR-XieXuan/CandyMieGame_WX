let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if (instance) return instance;

    instance = this;

    this.bgmAudio = new wx.createInnerAudioContext();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = wx.env.USER_DATA_PATH + '/' +'XingYueYe.mp3';

    this.playBgm();
  }

  playBgm() {
    this.bgmAudio.play();
  }

}
