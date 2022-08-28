let events = {
    events: {},
    receive: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    send: function (eventName, newInfo) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(newInfo);
            });
        }
    }
};