class LSHandler {
    constructor() {
        this.ls = localStorage
    }
    setObject(key, object) {
        this.ls.setItem(key, JSON.stringify(object));
    }
    retrieveObject(key) {
        if(!this.ls.getItem(key)) return;
        return JSON.parse(this.ls.getItem(key));
    }
    wipeLocalStorage() {
        this.ls.clear();
    }

    removeObject(key) {
        this.ls.removeItem(key);
    } 
    retrieveValueFromObject(keyOfObject, keyOfItemInObject) {
        const object = this.retrieveObject(keyOfObject);
        if(!object) return;
        if (!JSON.parse(object)[keyOfItemInObject]) return;
        return JSON.parse(object)[keyOfItemInObject];
    }
}