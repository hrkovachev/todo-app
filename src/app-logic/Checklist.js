export default class Checklist {
  #items = [];
  static #itemId = 0;
  constructor() {}
  addItem(item) {
    this.#items.push({
      content: item,
      id: Checklist.#itemId++,
      checked: false,
    });
  }
  removeItem(itemId) {
    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i].id === itemId) {
        this.#items.splice(i, 1);
        break;
      }
    }
  }
  get items() {
    return this.#items;
  }
  changeItemStatus(itemId) {
    this.#items.forEach((item) => {
      if (item.id === itemId) {
        item.checked = item.checked ? fasle : true;
      }
    });
  }
}
