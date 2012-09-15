md-pre
======

`md-pre` is a command line utility for quickly previewing Markdown documents in the browser. `md-pre` will convert your Markdown to HTML, write said HTML to a file located in a temp directory, and then open up that file in your default browser. The CSS used for the rendered Markdown is the same CSS that GitHub uses. 

Installation
------------

```
$ npm install -g md-pre
```

Usage
-----

```
$ md-pre --help
Usage: md-pre [options] file

Options:
  -d, --dir   directory generated HTML file will be placed    [default: "/tmp"]
  -o, --open  command to use to open the generated HTML file  [default: "open"]
  --verbose   md-pre will let you know what it's doing
```

Issues
------

Found a bug? Create an issue on GitHub.

https://github.com/jharding/md-pre/issues

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

License
-------

Copyright (c) 2012 [Jake Harding](http://thejakeharding.com)  
Licensed under the MIT License.
