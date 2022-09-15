const addRow = (id, title, cover, votes, canVote) => {
    const element = document.createElement('tr');
    element.innerHTML = `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-24" src="${cover}" alt="Cover of ${title}">
            </div>
        </div>
      </td>
      <td class="px-6 py-4">${title}</td>
      <td class="px-6 py-4">${votes}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        ${canVote
            ? `<a data-id="${id}" href="#" class="btn-vote text-indigo-600 hover:text-indigo-900">Vote!</a>`
            : 'no votes left'
        }
      </td>
    </tr>
    `;

    document.getElementById("movies").appendChild(element);
}

App = {
    account: null,
    web3Provider: null,
    contracts: {},

    init: async function () {
        if (window.ethereum) {
            // Modern dapp browsers
            App.web3Provider = window.ethereum;

            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("Accès au compte refusé à l'utilisateur");
            }
        } else if (window.web3) {
            // Look out for injected web3.js
            App.web3Provider = window.web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider(ganacheURL);
        }

        web3 = new Web3(App.web3Provider);

        let accounts = await web3.eth.getAccounts();
        App.account = accounts[0];

        await App.initContract();
    },

    initContract: async function () {
        const response = await fetch('Voting.json');
        const data = await response.json();

        App.contracts.Voting = TruffleContract(data);
        App.contracts.Voting.setProvider(App.web3Provider);

        await App.render();
        await App.listenOnEvents();
    },

    bindEvents: async function () {
        const newMovieForm = document.getElementById('form-new-movie');
        newMovieForm.addEventListener('submit', App.handleAddMovie);

        const voteButtons = document.getElementsByClassName('btn-vote');
        for (var i = 0; i < voteButtons.length; i++) {
            voteButtons[i].addEventListener('click', App.handleVote);
        }
    },

    listenForEvents: async function () {
        const instance = await App.contracts.Voting.deployed();

        instance.Voted({ fromBlock: 0 }).on('data', function (event) {
            App.render();
        }).on('error', console.error);

        instance.NewMovie({ fromBlock: 0 }).on('data', function (event) {
            console.log("Film ajouté");
        }).on('error', console.error);
    },

    render: async function () {
        document.getElementById("movies").innerHTML = "";

        const instance = await App.contracts.Voting.deployed();
        const moviesCount = (await instance.moviesCount.call()).toNumber();
        const userVotes = (await instance.votes(App.account)).toNumber();
        const maxVotesPerUser = (await instance.MAX_VOTES_PER_VOTER.call()).toNumber();

        for (let i = 1; i <= moviesCount; i++) {
            const movie = await instance.movies.call(i);
            const movieID = movie[0].toNumber();
            const userCanVote = userVotes < maxVotesPerUser;

            addRow(
                movieID,  // ID
                movie[1].toString(),  // Title
                movie[2].toString(),  // Cover
                movie[3].toNumber(),  // Votes
                userCanVote,
            );

            if (!userCanVote) {
                document.getElementById("form-new-movie").remove()
            }
        }

        await App.bindEvents();
    },

    handleVote: function (event) {
        event.preventDefault();

        const movieID = parseInt(event.target.dataset.id);

        App.contracts.Voting.deployed().then(function (instance) {
            instance.vote(movieID, { from: App.account }).then(function (address) {
                console.log(`Vote réussi sur ${movieID}`, address);
            }).catch(function (err) {
                console.error(err);
            });
        });

        return false;
    },

    handleAddMovie: function (event) {
        event.preventDefault();

        const inputs = event.target.elements;
        const title = inputs['title'].value;
        const cover = inputs['coverUrl'].value;

        App.contracts.Voting.deployed().then(function (instance) {
            instance.addMovie(title, cover, { from: App.account }).then(function () {
                console.log(`Le film a été ajouté avec succès ${title}`);
                event.target.reset();
            }).catch(function (err) {
                console.error(err);
            });
        }).catch(function (err) {
            console.error(err);
        });

        return false;
    }
};

window.addEventListener('load', function (event) {
    App.init();
});