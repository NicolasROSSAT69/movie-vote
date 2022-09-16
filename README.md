# movie-vote

Smart contract Blockchain ETH

# Documentation Smart Contract

La documentation de notre smart contract se trouve dans DocumentationVoting.md

## Production

Adresse du smart contrat sur le réseaux de test Goerli : ([Lien Etherscan Goerli](https://goerli.etherscan.io/address/0x286c704e4C4Bd3d6D924eEC8Ebff0b86Bbe343f1#code))
```
0x286c704e4C4Bd3d6D924eEC8Ebff0b86Bbe343f1
```

### Smart contract

Pour publier le smart contract sur la blockchain de test ETH (Goerli) il faut executer ces lignes de commande:

```
truffle dashboard
```

Une fois le dashboard ouvert il faut connecter son wallet Goerli, il faut ajouter le code ci-dessous dans le fichier de config de truffle.

```js
module.exports = {
  // ... le reste de la config truffle

  dashboard: {
    port: 24012,
  }

  networks: {
    // ... Les configurations du réseau, y compris le réseau nommé 'dashboard'
  }
}
```

Pour publier le contract :

```
truffle migrate --network dashboard
```

Il faut ensuite penser à valider la transaction sur le dashboard truffle.

## Developpement

### Smart contract locale

Pour publier le smart contract sur la blockchain local (Ganache) il faut lancer Ganache et exécuter ces lignes de commande:

```
truffle migrate --network development
```

### Application web 3 front

Pour lancer le front il faut executer ces lignes de commande :
```
yarn install
```

```
yarn dev
```
