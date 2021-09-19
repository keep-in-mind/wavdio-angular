import {ElementRef, Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class MediaplayerService {

    videoPlaying = false
    audioPlaying = false

    constructor() {
    }

    public playPausePlayer(player: ElementRef, vid: boolean) {
        if (player.nativeElement.paused) {
            player.nativeElement.play()
            if (vid) {
                this.videoPlaying = true
            } else {
                this.audioPlaying = true
            }
        } else {
            player.nativeElement.pause()
            if (vid) {
                this.videoPlaying = false
            } else {
                this.audioPlaying = false
            }
        }
    }

    public stopPlayer(player: ElementRef, vid: boolean) {
        player.nativeElement.pause()
        player.nativeElement.currentTime = 0
        if (vid) {
            this.videoPlaying = false
        } else {
            this.audioPlaying = false
        }
    }

    public rewindPlayer(player: ElementRef) {
        player.nativeElement.currentTime -= 3
    }

    public forwardPlayer(player: ElementRef, vid: boolean) {
        player.nativeElement.currentTime += 3
        if (player.nativeElement.currentTime >=
            player.nativeElement.duration || player.nativeElement.paused) {
            player.nativeElement.pause()
            player.nativeElement.currentTime = 0
            if (vid) {
                this.videoPlaying = false
            } else {
                this.audioPlaying = false
            }
        }
    }

    public timeUpdate(player: ElementRef, time: ElementRef,
                      progress: ElementRef, vid: boolean) {
        const minutes: any = Math.floor(player.nativeElement.currentTime / 60)
        const seconds: any = Math.floor(player.nativeElement.currentTime - minutes * 60)
        let minuteValue: any
        let secondValue: any

        if (minutes < 10) {
            minuteValue = '0' + minutes
        } else {
            minuteValue = minutes
        }

        if (seconds < 10) {
            secondValue = '0' + seconds
        } else {
            secondValue = seconds
        }

        const mediaTime: any = minuteValue + ':' + secondValue
        time.nativeElement.textContent = mediaTime
        const percentage = Math.floor((100 / player.nativeElement.duration) *
            player.nativeElement.currentTime)
        progress.nativeElement.value = percentage
        progress.nativeElement.innerHTML = percentage + '% played'
        if (player.nativeElement.currentTime >= player.nativeElement.duration) {
            this.stopPlayer(player, vid)
        }
    }
}
