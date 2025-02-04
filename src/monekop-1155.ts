import { BigInt } from "@graphprotocol/graph-ts"
import { TransferSingle as TransferSingleEvent } from "../generated/Monekop1155/Monekop1155"
import { User, Pokemon } from "../generated/schema"

export function handleTransferSingle(event: TransferSingleEvent): void {
  const userAddress = event.params.to.toHex()
  let user = User.load(userAddress)

  if (!user) {
    user = new User(userAddress)
  }

  const pokemonId = event.params.id.toString()
  let pokemon = Pokemon.load(pokemonId)

  if (!pokemon) {
    pokemon = new Pokemon(pokemonId)
    pokemon.owner = user.id
    pokemon.save()
  }
  user.save()
}
