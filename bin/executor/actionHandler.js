class ActionHandler {
    constructor() {
        this.tools = ["fs", "shell", "net"];
    }

    start() {
        console.log("[EXECUTOR]  🛠️ Action Handler: READY");
    }
}

module.exports = new ActionHandler();
