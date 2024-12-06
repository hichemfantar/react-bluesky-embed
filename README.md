# React Bluesky Embed

<a href="https://www.npmjs.com/package/react-bluesky-embed"><img alt="NPM version" src="https://img.shields.io/npm/v/react-bluesky-embed.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/hichemfantar/react-bluesky-embed/blob/main/license.md"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://bsky.app/profile/opensauced.bsky.social"><img alt="Join the community" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Bluesky&labelColor=000000&logoWidth=20"></a>
<a href="https://react-bluesky-embed.vercel.app/"><img alt="Read the documentation" src="https://img.shields.io/badge/Documentation-blue.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20"></a>
<a href="https://github.com/hichemfantar/react-bluesky-embed"><img alt="Star the repository" src="https://img.shields.io/badge/Star%20the%20repository-gold.svg?style=for-the-badge&logo=github&labelColor=000000&logoWidth=20"></a>
<a href="https://github.com/hichemfantar/react-bluesky-embed/fork"><img alt="Fork the repository" src="https://img.shields.io/badge/Fork%20the%20repository-fb923c.svg?style=for-the-badge&logo=forgejo&labelColor=000000&logoWidth=20"></a>

React Bluesky Embed allows you to embed post threads, profiles, and comments in your React application when using Next.js, Create React App, Vite, and more.

Profiles and comments support coming soon.

Adapters for Solid, Vue, Angular, and Svelte are coming soon.

![Banner](/apps/site/public/opengraph-image.png)

## Documentation

For documentation visit [react-bluesky-embed.vercel.app](https://react-bluesky-embed.vercel.app).

## Installation

```sh
npm i react-bluesky-embed
```

## Usage

```tsx
<PostThread
  params={{
    did: "did:plc:gru662w3omynujkgwebgeeof",
    rkey: "3lbirib5xnc2u",
  }}
  theme="dark"
  // set the depth to 1+ to show replies
  config={{
    depth: 6,
  }}
  // only show the replies
  hidePost={false}
/>
```

## Contributing

Visit our [contributing docs](https://react-bluesky-embed.vercel.app/contributing).
