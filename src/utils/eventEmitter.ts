type EventCallback = (...args: any[]) => void

interface EventEmitterInterface {
  on: (event: string, callback: EventCallback) => void
  off: (event: string, callback: EventCallback) => void
  emit: (event: string, ...args: any[]) => void
}

class EventEmitter implements EventEmitterInterface {
  private events: Map<string, EventCallback[]> = new Map()

  on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }

  off(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) return
    const callbacks = this.events.get(event)!
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) return
    const callbacks = this.events.get(event)!
    callbacks.forEach(callback => callback(...args))
  }
}

export const eventEmitter = new EventEmitter()

export default eventEmitter
