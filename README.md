# Between

*For the versions of yourself you don't post.*

A private, editorial journal prompt app for iPhone. See `docs/PRD.md` for the product, `docs/BUILD_PLAN.md`
for the roadmap, and `CLAUDE.md` for the project rules.

## Try it on your iPhone (no Xcode needed)

### One-time setup

1. **On your iPhone:** install **Expo Go** from the App Store.
2. **On your Mac:** install **Node.js**. Go to [nodejs.org](https://nodejs.org), download the **LTS** version, and run the installer.
3. **On your Mac:** open the **Terminal** app (press ⌘ Space, type "Terminal", press Return).
4. Check that `git` is available by typing this and pressing Return:
   ```bash
   git --version
   ```
   If a box pops up offering to install "command line developer tools", click **Install** and wait for it to finish.
   (This is a small download, not Xcode.)
5. Download the project. Copy and paste each line and press Return after each:
   ```bash
   cd ~/Documents
   git clone https://github.com/rosiirosado-bit/Between.git
   cd Between
   git checkout claude/app-coding-approach-wfl8wn
   npm install
   ```
   `npm install` takes a minute or two.

### Every time you want to try it

1. Open **Terminal** and go to the project, then fetch the latest changes:
   ```bash
   cd ~/Documents/Between
   git pull
   npm install
   ```
2. Start the app server:
   ```bash
   npx expo start
   ```
   A QR code appears in the Terminal window.
3. Make sure your iPhone and Mac are on the **same Wi-Fi**.
4. Open the iPhone **Camera**, point it at the QR code, and tap the banner that appears. Between opens in Expo Go.
5. When you're done, go back to Terminal and press **Control + C** to stop the server.

**If the phone can't connect** (for example on office or café Wi-Fi), stop the server with Control + C and run
`npx expo start --tunnel` instead. It may ask to install a small helper the first time; type `y`.

**To reload after changes:** shake the phone to open the Expo menu and tap **Reload**.

## For developers

```bash
npm install          # install dependencies
npx expo start       # dev server (Expo Go)
npm test             # unit and component tests
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run format       # Prettier
```

Add packages with `npx expo install <package>` (not `npm install <package>`), so versions match the Expo SDK.
