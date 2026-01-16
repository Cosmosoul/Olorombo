// 音频管理系统
class AudioManager {
    constructor() {
        this.bgmVolume = 50;
        this.sfxVolume = 70;
        this.currentBGM = null;
        this.audioContext = null;
        this.isMuted = false;
        this.bgmAudio = null;
        
        // 音效文件路径
        this.soundPaths = {
            click: 'assets/sounds/click.mp3',
            explosion: 'assets/sounds/explosion.mp3',
            bounce: 'assets/sounds/bounce.mp3',
            score: 'assets/sounds/score.mp3',
            purchase: 'assets/sounds/purchase.mp3',
            fail: 'assets/sounds/fail.mp3',
            victory: 'assets/sounds/victory.mp3'
        };
        
        // 背景音乐路径
        this.bgmPaths = {
            menu: 'assets/music/menu.mp3',
            game: 'assets/music/game.mp3',
            shop: 'assets/music/shop.mp3',
            fail: 'assets/music/fail.mp3'
        };
        
        // 预加载音频
        this.preloadSounds();
    }
    
    // 预加载音效
    preloadSounds() {
        this.sounds = {};
        for (const [key, path] of Object.entries(this.soundPaths)) {
            this.sounds[key] = new Audio(path);
            this.sounds[key].load();
        }
    }
    
    // 初始化音频上下文
    initAudioContext() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log("音频上下文初始化失败:", e);
            }
        }
    }
    
    // 播放背景音乐
    playBGM(type) {
        if (this.isMuted) return;
        
        // 停止当前背景音乐
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }
        
        // 播放新背景音乐
        if (this.bgmPaths[type]) {
            this.currentBGM = type;
            this.bgmAudio = new Audio(this.bgmPaths[type]);
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = this.bgmVolume / 100;
            
            // 尝试播放
            const playPromise = this.bgmAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("背景音乐播放失败:", error);
                });
            }
        }
    }
    
    // 停止背景音乐
    stopBGM() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }
    }
    
    // 播放音效
    playSound(type) {
        if (this.isMuted || !this.sounds[type]) return;
        
        try {
            const sound = this.sounds[type].cloneNode();
            sound.volume = this.sfxVolume / 100;
            sound.play().catch(e => {
                console.log(`音效 ${type} 播放失败:`, e);
            });
        } catch (e) {
            console.log("音效播放错误:", e);
        }
    }
    
    // 更新背景音乐音量
    updateBGMVolume(volume) {
        this.bgmVolume = volume;
        if (this.bgmAudio) {
            this.bgmAudio.volume = volume / 100;
        }
    }
    
    // 更新音效音量
    updateSFXVolume(volume) {
        this.sfxVolume = volume;
    }
    
    // 切换静音
    toggleMute() {
        this.isMuted = !this.isMuted;
        const soundToggle = document.getElementById('soundToggle');
        const icon = soundToggle.querySelector('i');
        
        if (this.isMuted) {
            soundToggle.classList.add('muted');
            icon.className = 'fas fa-volume-mute';
            this.stopBGM();
        } else {
            soundToggle.classList.remove('muted');
            icon.className = 'fas fa-volume-up';
            if (this.currentBGM) {
                this.playBGM(this.currentBGM);
            }
        }
    }
    
    // 播放点击音效
    playClick() {
        this.playSound('click');
    }
    
    // 播放爆炸音效
    playExplosion() {
        this.playSound('explosion');
    }
    
    // 播放反弹音效
    playBounce() {
        this.playSound('bounce');
    }
    
    // 播放分数音效
    playScore() {
        this.playSound('score');
    }
    
    // 播放购买音效
    playPurchase() {
        this.playSound('purchase');
    }
    
    // 播放失败音效
    playFail() {
        this.playSound('fail');
    }
    
    // 播放胜利音效
    playVictory() {
        this.playSound('victory');
    }
}

// 创建全局音频管理器实例
const audioManager = new AudioManager();