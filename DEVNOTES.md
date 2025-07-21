#Dev Notes

This project leverages the Metropolitan Museum of NY's API to display art from the museums Asian Department, many of which is found in their Gallery 206.

Note: Their API only allows 80 calls per minute, and each page of items involves 6-7 calls, so if you refresh frequently or quickly go through multiple pages, you may get an error and need to wait and refresh.

Second note: Most of the time, the items that are returned have photos. However, sometimes, they do not. If you load the page and there are no images, I recommend a refresh to retrieve different objects that have images.

#Potential improvements

1. Design - I am not a designer, so this is a very rudimentary MVP type design and styling. More sophisticated design would be ideal.
3. The API does not provide any "alt tag" or "description" text that we could put in the alt tags. This isn't ideal. Since the pictures all are next to their titles, I have just set the alt tag to an empty string so the screenreader skips it (it'd be redundant to set the alt tag to the title when the title is right next to it).
4. Testing - I generally like to include snapshot and lighthouse tests, as well.
5. Browser testing - it'd be great to have a framework that allows for browser/integration tests, also.
6. Error alerts - Obviously, the browser alert isn't very pretty. A slicker modal for errors would be preferred.
7. File structure - in a larger app, I'd probably want simple/shared components (like the button) in one place, and components for a specific feature (like the Gallery) in another. However, there are so few components it did not seem worth it at this point.
