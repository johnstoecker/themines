'use strict';
const React = require('react');


class MinesPage extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>Mines</title>
                    Welcome to the mines.
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="/public/core.min.css" />
                    <link rel="stylesheet" href="/public/pages/mines.min.css" />
                    <link rel="shortcut icon" href="/public/media/favicon.ico" />
                </head>
                <body>
                    <div id="app-mount"></div>
                    <script src="/public/core.min.js"></script>
                    <script src="/public/pages/mines.min.js"></script>
                </body>
            </html>
        );
    }
}


module.exports = MinesPage;
