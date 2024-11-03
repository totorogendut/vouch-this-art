# Vouch This Art

Vouch This Art is a web chrome extension that "Vouch" image, giving users the ability to interact with images that's hosted anywhere in the web, whether in the form of simple like or leaving a message about the image that can be read by other users of the extension. Unlike normal like and comments with messages, "vouch" is a kind of interaction from the users that is more persistent and durable, as it stored on Pinata network. Vouch This Art also stores Proof of Personhood when vouching images to Pinata server, which later can be used to verify the uploaded vouchs... although, verifying capability is currently disabled due to this extension has not yet implemented a proper auth mechanism.

Under the hood Vouch This Art uses Pinata as storage backend to store metadata regarding the image and the users. Images on the web pages first processed to get their hash inside web workers, so Vouch This Art can function across web domains. In the Pinata backend, metadata then will be stored in the kayvalues with both the image hash and user's id, as well as the full user credentials and other necessary informations as the JSON file body.

## Development

### Environment Variables

In folder `apps/backend`, put this in `.env` file

```
PINATA_JWT=XXXX
PUBLIC_GATEWAY_URL=XXX

# Vidos used for user credential verification but not available
# currently due to Vouch This Art has not yet implement proper auth mechanism
# (NOT MANDATORY)
VIDOS_VERIFIER_ENDPOINT=XXX
VIDOS_API_KEY=XXX
```

### Build

Vouch This Art uses Bun for development. 

```
cd apps/backend && bun start
```

For the extension, run the command below and load `apps/extensions/build` folder as unpacked extension in Chromium based browsers

```
cd apps/extensions && bun run build
```


### Notes

Made for [Decentralized Identity Foundation Hackathon 2024](https://difhackathon2024.devpost.com/) - Pinata track Proof of Personhood category.
