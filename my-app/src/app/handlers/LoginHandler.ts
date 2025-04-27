import { Handler } from './Handler';

export class LoginHandler extends Handler {
  handle(request: any): any {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      // User is not logged in, trigger modal state to show the login/sign-up modal
      request.showLoginModal = true;
      return; // Pause the chain and wait for login
    }

    // If token exists, retrieve the userID from storage
    const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID");
    if (userIDString) {
      const userID = parseInt(userIDString, 10);
      request.userID = userID; // Pass userID to the next handler via the request object
    } else {
      alert("No user ID found. Please log in again.");
      request.showLoginModal = true; 
      return; 
    }

    // Proceed with the next handler in the chain
    return super.handle(request);
  }
}