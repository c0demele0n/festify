This font was generated using a svg from nounproject
https://thenounproject.com/search/?q=playlist&i=1229062

It was then converted to a font using https://icomoon.io/

Tutorial was found at https://stackoverflow.com/a/40959150

Custom Icon is at 🌣 which is White Sun Emoji (U+1F323)

If you want to add another icon use icomoon tool, put the playlist icon at the
same place (U+1F323) and your new icons to the place you want. Then add it to
the bottom of the /pages/nac/nav.scss like this @include makeIcon(icon-playlist,
'\1f323'); <- here icon-playlist is the name used when using the icon and the
second argument is the unicode place

If you need the icon somewhere else than nav you should port the whole scss from
nav to global
