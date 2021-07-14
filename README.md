                                                                PICKUP-FINDER

                                Pick-Up Finder is a web app that allows users to create local pick-up games in 40 
                                cities throughout Indiana. Once a game is created, it is available for others to search
                                for via city. Users can comment on any game to let the user know they would like to play
                                and the creator of the pick-up game can adjust the players needed accordingly. It also
                                features a User Profile component where users can view their entire catalog of created
                                games and comments and edit/delete both. 


                                Deployed link: http://tcg-pickup-server.herokuapp.com/

                                The app utilizes Javascript, Typescript, Sequelize, Material UI, and Styled-Components.

                                Users can create an account and login with their existing credentials, where their passwords
                                are hashed with bcrpytjs and securely stored in the database.

                                The app meets CRUD on two database tables: games and comments. Games are created with a POST,
                                displayed on the user profiles and search-by-city functionality with GET requests, players needed
                                updated with a PUT, and games can be deleted with DELETE. Comments are created with a POST, displayed
                                on each game with a GET, edited with a PUT, and deleted with DELETE. 

                                The sidebar is the navigation for the app and utilizes React-Router-Dom to display the links
                                to the components when clicked on. 

                                Thank you! I hope you like it!


