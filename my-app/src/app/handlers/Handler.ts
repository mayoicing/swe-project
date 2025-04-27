export class Handler {
    nextHandler: Handler | null = null;
  
    setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(request: any): any {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return null;
    }
}