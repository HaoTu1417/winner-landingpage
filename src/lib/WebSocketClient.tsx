export class WebSocketClient {
  public socket: WebSocket;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(this.url);

    this.initializeEvents();
  }

  // Initialize WebSocket events
  private initializeEvents(): void {
    // Handle connection open
    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
      // Send an initial message if needed
      this.sendMessage({ type: 'subscribe', channel: 'stocks' });
    };

    // Handle incoming messages
    this.socket.onmessage = (event: MessageEvent) => {
      console.log('Message received:', event.data);
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    // Handle connection errors
    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    // Handle connection close
    this.socket.onclose = (event: CloseEvent) => {
      console.log(`WebSocket connection closed: code=${event.code}, reason=${event.reason}`);
    };
  }

  // Send a message to the WebSocket server
  public sendMessage(message: WebSocketMessage): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Unable to send message.');
    }
  }

  // Handle received messages
  private handleMessage(data: WebSocketMessage): void {
    console.log('handleMessage', data);
    // Process data (customize this based on your data structure)
    if (data.type === 'update' && data.channel === 'stocks') {
      console.log('Stock update:', data.payload);
    }
  }

  // Close the WebSocket connection
  public closeConnection(): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }
}

// Define WebSocket message type
interface WebSocketMessage {
  type: string;
  channel: string;
  payload?: unknown; // Can be more specific if needed
}
