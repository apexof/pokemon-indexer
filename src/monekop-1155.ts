import { BigInt } from "@graphprotocol/graph-ts"
import { TransferSingle as TransferSingleEvent } from "../generated/Monekop1155/Monekop1155"
import { User } from "../generated/schema"

export function handleTransferSingle(event: TransferSingleEvent): void {
  const userAddress = event.params.to.toHex()
  let user = User.load(userAddress)
  if (!user){
    user = new User(userAddress)
    user.pokemonsCount = BigInt.fromI32(0);
  }
  const pokemonId = event.params.id
  user.pokemonsCount = user.pokemonsCount.plus(BigInt.fromI32(1));
  user.save()
}


