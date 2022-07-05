
export class Monitor {
    #apiKey

    constructor(apiKey) {
      this.#apiKey = apiKey
    }

    async start() {
        console.log("starting monitor")
        console.log(this.#apiKey)
    }
}