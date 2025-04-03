export enum EventType {
  UNAUTHORIZED = "unauthorized",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback<T = any> = (data?: T) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  // Subscribe
  subscribe<T>(event: EventType, callback: EventCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // Clear event
  unsubscribe<T>(event: EventType, callback: EventCallback<T>) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  // Emit
  emit<T>(event: EventType, data?: T) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

const eventBus = new EventBus();

export default eventBus;
