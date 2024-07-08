import { describe, expect } from 'vitest'

class Emitter {
  private events: Record<string, CallableFunction>

  constructor() {
    this.events = {}
  }

  subscribe(eventName: string, callback: CallableFunction) {
    if (this.events[eventName])
      throw new Error(`Event subscription: '${eventName}' already added.`)
    this.events[eventName] = callback
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(eventName: string, ...fnArgs: any[]): boolean {
    if (!this.events[eventName])
      throw new Error(`Event subscription: '${eventName}' does not exist.`)
    this.events[eventName](...fnArgs)
    return true
  }

  release() {
    this.events = {}
  }
}

describe('Emitter', () => {
  describe('when subscribing to multiple events and an event is emitted', () => {
    it('should call registered callback with emitted arguments', () => {
      const sut = new Emitter()

      const callback1 = vi.fn()
      sut.subscribe('some-event-1', callback1)

      const callback2 = vi.fn()
      sut.subscribe('some-event-2', callback2)

      sut.emit('some-event-2', 'foo', 'bar')

      expect(callback2).toHaveBeenCalledWith('foo', 'bar')
    })

    it('it should remove all subscriptions when release is called', () => {
      const sut = new Emitter()

      const callback1 = vi.fn()
      sut.subscribe('some-event-1', callback1)

      const callback2 = vi.fn()
      sut.subscribe('some-event-2', callback2)

      sut.release()

      expect(() => sut.emit('some-event-1')).toThrowError(
        "Event subscription: 'some-event-1' does not exist."
      )
    })
  })
})
