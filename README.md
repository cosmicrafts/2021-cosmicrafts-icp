# Cosmicrafts - Internet Computer Game

Welcome to Cosmicrafts, a blockchain-based game built on the Internet Computer. This project combines Unity WebGL with React frontend and Motoko backend canisters.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher, but v20+ requires legacy OpenSSL provider)
- **DFX** (Internet Computer SDK) - version 0.27.0 or higher
- **npm** or **yarn**
- **mops** (Motoko package manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd 2021-cosmicrafts-icp
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Initialize mops (Motoko package manager):**
   ```bash
   mops init
   ```
   - Select "Project" when prompted
   - Choose "no" for GitHub workflow setup

4. **Install Motoko dependencies:**
   ```bash
   mops install
   ```

## Project Structure

```
2021-cosmicrafts-icp/
├── src/
│   ├── cosmicrafts/          # Main Motoko canister
│   ├── cosmicrafts_assets/   # Frontend assets and React app
│   ├── score_token/          # Score token canister
│   └── nfts/                 # NFT-related modules
├── dfx.json                  # DFX configuration
├── mops.toml                 # Motoko dependencies
└── package.json              # Node.js dependencies
```

## Development Setup

### 1. Start the Local Internet Computer Replica

```bash
# Start the replica in the background
dfx start --background

# Or start in foreground (use Ctrl+C to stop)
dfx start
```

### 2. Generate Candid Interfaces

```bash
dfx generate
```

### 3. Fix Missing Candid JS Files (One-time setup)

The project requires a workaround for missing Candid JS files:

```bash
# Copy service.did.js to cosmicrafts.did.js in the .dfx directory
cp .dfx/local/canisters/cosmicrafts/service.did.js .dfx/local/canisters/cosmicrafts/cosmicrafts.did.js
```

### 4. Deploy the Project

```bash
dfx deploy
```

When prompted for initialization arguments for the score_token canister, use:
- Name: `Cosmicrafts`
- Symbol: `XP`
- Decimals: `8`
- Total Supply: `100000000`

## Running the Application

### Frontend Development Server

For development with hot reloading:

```bash
npm start
```

This will start a development server at `http://localhost:8080` that proxies API requests to the replica.

### Production Build

```bash
npm run build
```

### Accessing the Application

After deployment, your application will be available at:

- **Frontend**: `http://localhost:4943/?canisterId={asset_canister_id}`
- **Candid Interface**: `http://127.0.0.1:4943/?canisterId={candid_canister_id}&id={canister_id}`

## Troubleshooting

### Node.js Compatibility Issues

If you're using Node.js v17+ and encounter OpenSSL errors:

1. **The project is already configured** with `NODE_OPTIONS=--openssl-legacy-provider` in package.json
2. **For manual builds**, use:
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider npm run build
   ```

### Missing Candid Files

If you encounter "Module not found" errors for Candid JS files:

1. Run `dfx generate` to regenerate interfaces
2. Copy the missing file:
   ```bash
   cp .dfx/local/canisters/cosmicrafts/service.did.js .dfx/local/canisters/cosmicrafts/cosmicrafts.did.js
   ```
3. Rebuild: `npm run build`

### Asset Conflicts

If you see asset conflict errors during deployment:

1. Remove the dist directory: `rm -rf dist/`
2. The CopyPlugin has been removed from webpack.config.js to prevent conflicts
3. Redeploy: `dfx deploy`

## Canister IDs

After deployment, your canisters will have the following IDs:
- **cosmicrafts**: Main game logic canister
- **cosmicrafts_assets**: Frontend assets canister  
- **score_token**: Token management canister

## Development Notes

- The project uses **dfx 0.27.0** with modern Internet Computer features
- **Motoko warnings** about deprecated functions are expected and don't affect functionality
- **Security policy warnings** can be ignored for local development
- The frontend uses **React** with **Unity WebGL** integration
- Backend uses **Motoko** canisters for game logic and token management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with `dfx deploy`
5. Submit a pull request

## License

[Add your license information here]

## Support

For issues and questions:
- Check the [Internet Computer documentation](https://internetcomputer.org/docs/current/developer-docs/)
- Review the [Motoko language guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- Open an issue in this repository