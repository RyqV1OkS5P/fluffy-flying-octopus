class KeyObject {
  
  constructor(id, key, account, seconds, minutes, current, active) {
    this.id = id;
    this.key = key;
    this.account = account;
    this.seconds = seconds;
    this.minutes = minutes;
    this.current = current;
    this.active = active;
  }
  
  getProperty(property) {
    return this[property]
  }
}

export { KeyObject }
