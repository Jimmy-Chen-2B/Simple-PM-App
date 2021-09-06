import { Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  connect() {
    console.log(
      'Will create subscription to: channel: "ConverstaionsChannel" Converstaions: ' +
        this.data.get("conversationid")
    );

    this.channel = consumer.subscriptions.create(
      {
        channel: "ConversationsChannel",
        conversation_id: this.data.get("conversationid"),
      },
      {
        connected: this._cableConnected.bind(this),
        disconnected: this._cableDisconnected.bind(this),
        received: this._cableReceived.bind(this),
      }
    );
  }

  _cableConnected() {
    console.log("_cableConnected");
  }

  _cableDisconnected() {
    console.log("_cableDisconnected");
  }

  _cableReceived(data) {
    console.log("_cableReceived");
    console.log(data);
    console.log(data.personal_message);
    const newMessage = data.personal_message;
    document
      .querySelector("#conversation-body")
      .insertAdjacentHTML("beforeend", newMessage);
  }
}
