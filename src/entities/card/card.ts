import { CARD_TYPE } from "../type/type";
export class Card {
   private id: number;

   constructor(public number: string, public expiry: string, public type: CARD_TYPE, public balance: number, public ownerId: number, public bankName: string) {
   };

   setId(cardId: number) {
      this.id = cardId;
   };
   getOwnerId() {
      return this.ownerId;
   }
   getId() {
      return this.id;
   }
   getNumber() {
      return this.number;
   }

}