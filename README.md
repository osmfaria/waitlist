[![GitHub package.json version](https://img.shields.io/github/package-json/v/osmfaria/waitlist)](https://img.shields.io/github/package-json/v/osmfaria/waitlist)
 
## :coffee: Waitlist

This is a compact, full-stack application designed to help businesses manage their waitlist more efficiently. The app uses the TablesReady external API to add users to the waitlist and keep it updated in real-time. However, since TablesReady does not provide a route to access the current waitlist, the app relies on consistent updates through webhooks and the server capabilities of nextjs to ensure the waitlist displayed in the app is always accurate. The webhooks update a parallel MongoDB database, which serves as a backup for the waitlist data and ensures that it is always up-to-date.

The waitlist can be used in a kiosk mode, allowing customers to add themselves to the list. This feature helps businesses automate their waitlist management process, saving time and resources. 

> Check the deployed [app](https://waitlist-redumbrella.vercel.app/).
<img src="./public/app-design.png" />


## Architecture

<img src="./public/diagram.png" />

## 💭 Features

:heavy_check_mark: The app uses webhooks to automatically update the internal waitlist whenever changes are made through the TablesReady external API.\
:heavy_check_mark: The app includes a Vercel cron job that automatically resets the waitlist at the end of each day.

## 💻 Tech stack

  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
