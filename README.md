# Ubiquity Mint Live Monitor - Proof of Concept

Link to deployed demo: https://ubiquity-mint-monitor-poc.netlify.app/

- Check last section for a guide on testing

We are always looking for ways to produce innovative tools for the NFT space in the Solana blockchain, and we have been researching ERC20 blockchains for a while. We have been planning to build a cross-chain NFT monitor and fraud analyzer that would not require you to connect your wallet.

Ubiquity API has now appeared. It's functionality support is still under development, especially for Solana, so we depend on other third party APIs until Ubiquity API can expand its support. However, this prototype of our platform idea is a good first example to show how easy it would be to use Ubiquity API in conjunction to other market APIs to build very fast, concrete and reliable solutions for the NFT space.

# Hackathon participants

### Nathaniel Acton

Marketing and Business Lead

- Twitter: https://twitter.com/nateacton
- Telegram: @nateacton

### Christian Guzman

Product design and software engineer

- Github: https://github.com/h-4vok
- Telegram: @h_4vok

### German Dario

Software engineering lead

- Github: https://github.com/germangp088
- Telegram: @germangp088

# About the team

Our team is also comprised of 4 additional developers, 2 marketing associates, 2 content managers and an array of freelance providers. However, for this particular project only the three of us have participated as the team is busy building other products.

# Technologies used

We developed by PoC for Solana where we have the most experience. We used the following technologies.

## List of technologies

### Frontend

- ReactJS
- Material UI
- Axios

### APIs

- Ubiquity API for Solana
- Solscan API

## How is technology used

We are using the Material UI layout library to quickly build layouts that are mobile responsive while also utilizing the very known styling of Material UI which is also known to end users.

ReactJS is obviously the underlaying library supporting all the rendering and instrumentation of all of our pages.

But this project would not be complete without interacting with the APIs. For Ubiquity API we are using the official @ubiquity/ubiquity-ts-client library from the official ubiquity npm registry (you will need to build the .npmrc file for this to work locally).

We are using AXIOS to interact with the Solscan API in order to obtain the owner of an NFT, the metadata and the image. This could be easily achieved with Ubiquity API but the NFT APIs currently are not supporting Solana.

## Specific places where @ubiquity/ubiquity-ts-client is used

Please head to the monitor.js file under src/lib/monitor

- Line 65 - Where we use Ubiquity API to understand which is the latest block number in the solana blockchain
- Line 80 - Most importantly, we use the Ubiquity API to obtain all the transactions within a specific block number

## How our application works and leverages Ubiquity API

Now that we understand where all the tech stack and where Ubiquity API is used, its time to understand how this prototype of a mint monitor work. We say prototype, as in a real life scenario more complexity and features would be taken into consideration.

When the user types a block number in the home page, or leaves the textbox blank, and clicks on GO, we will determinate which block number the user wants to start scanning from.

Here our live monitor starts and an algorithm can be observed in line 19 of the monitor.js file. Here we define in which block we will begin our search and then we will obtain such block. This block contains all of its transactions but it does not have all the data. However, we do not want to query the transaction data of every single transaction in this block as this would consume enormous resources.

Once the data is obtained, we send the block to the Distiller which is in the distiller.js file under src/lib.

Distiller loops quickly through the data and analyzes its contents. This is a very short and simple version of what the distiller would be, but it is good enough for the prototype. In this particular case we have identified a pattern where all NFT mints in Solana have exactly 6 events and the type of the second event is "create_account". When a transaction fulfills this criteria it does not immediatelly mean that this is an NFT mint, but all NFT mints have to succeed this criteria. All transactions like this are marked as transaction candidates and sent over to the NftDiscovery.

NftDiscovery is in nftDiscovery.js under src/lib. This object receives these transaction candidates and now, having a reduced subset of the block's transactions, it uses the Solscan API to retrieve this element as if it were an NFT. To do this, we have identified that the NFT token address is in the destination field of the second even of the transaction (which is, if you remember, the "create_account" event).

Using the Solscan API we obtain the data of the NFT in JSON format. If this were to be a valid NFT then we will be able to find the location of the json metadata of this NFT under data.data.metadata.data.uri

Using this URL, we run a simple GET with Axios and retrieve this JSON metadata. This contains, among other things, the name and the visual resource's uri of the NFT.

Finally we want to know who is the current owner of the token. We leverage Solscan again and use their specific API for this.

Once all is done, the data is put into a model and sent to the Observer. The Observer can be found in observer.js under src/lib/global.

The Observer lives globally within the application regardless of which route you started the application at, and will emit events every time it receives an NFT. These events are being listened to by the NFTHandler (you will see in this prototype that the Observer knows the NFTHandler. In a real life application there would be a complete decoupling) which in turn takes care of drawing every NFT information on the screen, allowing the user to interact with it as soon as possible.

Our algorithm goes back to the Monitor which will now work on the next block until all blocks have been checked, at which point it will retrieve the information of what is the newest latest block using the Ubiquity API, and proceed to loop again.

# About the coding practices

This was a quick prototype so please do not expect the best practices, nor SOLID principles nor Atomic Design, which are partially concepts we always use in non-prototype projects.

As we have mentioned in other sections, a real life application would require better attention to detail.

# This is not Solana exclusive

Our algorithm and design patterns using the Monitor, Distiller, NftDiscovery, Observer and NFTHandler are quite generic. We would need to build an abstract family interface of these and then potentially have specific implementations for ERC20 compatible blockchains, Solana and NEAR, which are all of the important players in the NFT space.

While implementation will change between blockchains, the algorithm is likely to stay untouched. Potentially classes like Monitor, Observer and NFTHandler will be the same. We would also have to build our own data model for representing NFTs as every blockchain has a different way of structuring this data. This is something the users and the UI should not care about.

# Recommended block numbers for testing:

The live monitor will pick anything from the current block if you input nothing on the home page. However, it's possible that there are no mintings happening at the time of monitoring.

Here are a couple of block numbers where we now there have been several active mints at the same time.

- 119798911
- 119798937

# Testing our application

Please go to https://ubiquity-mint-monitor-poc.netlify.app/ for a deployed version of this prototype.

## Home page

In the home page you will be asked to type the block number you wish to start monitoring from. _This is not something the real users would be doing_ but it is a way for us to have a quick testing scenario. Real users would be accesing our data live without the need to worry about block numbers or other blockchain intrisicancies.

We recommend using the block numbers we have quoted above which have been very active. However, you are welcome to try not typing anything which will start monitoring the blockchain at the current moment.

Once you click GO the monitor will begin

## Monitoring

The monitor will be exploring the blockchain in search of NFTs. Soon, NFTs will start popping up and have its information displayed for you. If you click on the NFT anywhere you will have a popup with more detailed info of this NFT, who is the current owner, what is the metadata of the element and an option to share this NFT in Twitter.

- Note: A lot more can and will be done. The idea is to identify trends, identify frauds, be able to catch a mint that is going to be successful while its happening, etc. Our business presentation includes a myriad of features that be built around this.

## Restarting

Since this is a prototype, we did not put a lot of effort in making it easy to restart the monitor. This would not be a functionality that users will need anyway.

We recommend you navigate again to the home page at https://ubiquity-mint-monitor-poc.netlify.app/#/ and then click F5 (otherwise it won't really reset as we are using ReactJS).
