# Vouch This Art

Vouch This Art is a web chrome extension that "Vouch" image, giving users the ability to interact with images that's hosted anywhere in the web, whether in the form of simple "like" or leaving a message about the image that can be read by other users of the extension. Unlike normal "like" and comments with messages, "vouch" is a kind of interaction from the users that is more persistent and durable, as it stored on Pinata network.

Under the hood Vouch This Art uses Pinata as storage backend to store metadata regarding the image and the users. Images on the web pages first processed to get their hash inside web workers, so Vouch This Art can function across web domain. In the Pinata backend, metadata then will be stored in the kayvalues with both the image hash and information from users credential.
