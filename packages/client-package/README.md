# Invited API

Basic Invite Handling API and Package


## Usage

1. Go to [invited.vercel.app](https://invited.vercel.app) and create an account
2. Create a new project, and get the `apiToken`

**You have two choices, you can use the api directly or use the client package**

## [API Docs](https://invited.vercel.app/docs/api)

## [Client Docs](https://invited.vercel.app/docs/client)


### Install
```
yarn add invited axios
```

### Basic Usage

```ts

const invited = new Invited('apiTokenHere')

await invited.verify('example@example.com')

```


### Create Invite

```ts
const invite = await invited.create()
// https://invited.vercel.app/[slug]

// Can modify this URL in the constructor
const invited = new Invited('apiTokenHere', {baseUrl : "YOUR WEBSITE"})

```

### Consume Invite

```ts
await invited.consume('example@example.com','slug')
```


### Options

You can set any of the following options in the constructor

```ts
export type Options = {
  modal?: boolean
  baseUrl?: string
  darkMode?: boolean
  homeUrl?: string
  redirectUrl?: string
}
```

| Option | Default | Description | 
| --- | --- |----------- |
| modal | `true` | If a modal should show if the user is not invited
| darkMode | `true` | If the modal should be dark mode or not
| baseUrl | `invited.vercel.app` | The base url to which the slug is added
| homeUrl | `/` | THe url to return too on the modal
| redirectUrl | `undefined` | The url to redirect too after consume an invite