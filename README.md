# Chrome Extension for Teamwork Time-Tracking

## Installation

1. Clone this repo and `cd` into it.
1. Run `nvm use && npm i && npm run build`. This will generate the `/dist` folder.
1. In the Chrome browser, visit `chrome://extensions/`.
1. At the top right, turn on `Developer mode`.
1. Click `Load unpacked`.
1. Select the generated `/dist` directory.
1. You will now be able to see the extension in the list.

## Connect Account

1. Get your API Token key from Teamwork.com (More [information](https://apidocs.teamwork.com/guides/teamwork/getting-started-with-the-teamwork-com-api#getting-an-api-key))
    - In Teamwork.com, click your avatar in the bottom left.
    - Click "Edit my details".
    - Go to "API & Mobile".
    - Click on "Show your token".
    - Copy the "Key".
2. Click on the extension icon and you will be prompted with an API token field. Enter the API Token.
3. Click "Connect account".

## Known Issues

- This extension is kind of MVP, so some parts require improvements.
