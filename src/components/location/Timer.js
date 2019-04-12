
export class Timer {
    constructor(time) {
        this.time = time;
    }
    end() {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.cb();
    }
    update(cb) {
        this.cb = cb;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>this.end(),this.time);
    }

}

export default Timer;