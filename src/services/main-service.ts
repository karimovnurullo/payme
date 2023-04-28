import { Card } from "../entities/card/card";
import { User } from "../entities/user/user";
import { CardRepository } from "../repository/card/card-repository";
import { UserRepository } from "../repository/user/user-repository";
export class MainService {
   private cardRepository = new CardRepository();
   private userRepository = new UserRepository();

   register(...users: User[]) {
      this.userRepository.create(...users);
   }
   registerCard(...cards: Card[]) {
      this.cardRepository.create(...cards);
   }
   getUserList(): User[] {
      return this.userRepository.getList();
   }
   getCardList(): Card[] {
      return this.cardRepository.getList();
   }
   getCardByUserId(userId: number): Card[] {
      let userCards: Card[] = [];
      for (const card of this.cardRepository.getList()) {
         const ownerId: number = card.getOwnerId();
         if (ownerId === userId) {
            userCards.push(card);
         }
      }
      return userCards;
   }
   getUserId(userId: number) {
      return this.cardRepository.getByID(1)
   }
}