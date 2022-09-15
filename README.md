# movie-vote

Smart contract Blockchain ETH

# Documentation Smart Contract

La documentation de notre smart contract se trouve dans DocumentationVoting.md

## Production

Adresse du contrat sur le réseaux de test Ropsten :
```
0x6c0F049A549e577BEABe1419c5117f74Fd59333a
```

### Smart contract

Pour publier le smart contract sur la blockchain de test ETH (Ropsten) il faut executer ces lignes de commande:

```
truffle dashboard
```

Une fois le dashboard ouvert il faut connecter son wallet ropsten, il faut ajouter le code ci-dessous dans le fichier de config de truffle.

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
