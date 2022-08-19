# Localish

## Project description

Localish is a simple website using 3 models, all CRUD operations, full authentification and authorizaition process.

Developed with a mobile first approach, the back end uses Node and Express and the front end React.

Developed for market lovers and those who want support the local businesses by creating awarness of the small little markets every visitor should know of your city.

<div style="display: flex; justify-content:space-between; width=100%">
<img scr='https://res.cloudinary.com/dhdkj4oxv/image/upload/v1660909877/find-a-market/fgenxb40panltnyisnwf.jpg' alt='homepage'>
<img scr='https://res.cloudinary.com/dhdkj4oxv/image/upload/v1660910130/find-a-market/w7weyyxl8vr0xsxp0r9t.jpg' alt='homepage'>
</div>

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As a user I can sign up in the platform so that I can start creating saving favorite markets
-  **Login:** As a user I can login to the platform so that I can see my favorite markets and follow other users
-  **Logout:** As a user I can logout from the platform so no one else can use it
- **Profile:** As a user I can see the Markets I created and the users I follow as well as edit my profile data.
-  **Add markets** As a user I can add a market so that I can share it with the community
-  **List markets** As a user I want to all  markets so that I can choose one to visit
-  **See market details** As a user I want to see the markets details so I know where I can visit it.
-  **Review a market** As a user I can click on leave a review and give my input
-  **Search markets** As a user I want to search markets by name, location or any key so that I know if it´s already in the platform
-  **Add to favorites** As a user I want to add a market to favorite so that I can save the markets that I liked the most
-  **See my favorites** As a user I want to see my favorite restaurantes so that I can see the ones I liked the most
-   **Discover a market** As a user I can click on the dicovery Button and it will show me a new Marke for me to discover.
-  **Star a market** As I user I can make my opinion about a market base on the stars a Market has. The more people has saved the market as favourite, the more stars.

## Backlog
Sign up and login:
- Allow users to sign up using Google sign up and log in.

User profile:
- See the  profile from the users I  follow and their favorite markets. 
- Chat with the users I follow

Geo Location:
- See all markets in a map 

Multiple photos:
- Allo multiple upload of photos for the market details and display them using a picture carrousel

  
# Client

## Routes

- / - Home: Markets list
- /auth/signup - Signup form
- /auth/signin - Login form
- /markets/:id- Market details 
- /profile/ - My market and users I follow
- /profile/User - see and edit your preferences and user data
- /profile/favorites - my favorite markets
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Restaurants List Page (public only)
- Restaurant Create (user only)
- Restaurant Detail Page (public only)
- My Profile Page (user only)
- 404 Page (public)

## Components

- Autocomplete
- DeleteMarketAlert
- DisplayMyMarket
- Footer
- FooterPopover
- Forms
    - Form Create Market
    - Form Edit Market
    - Form Profile
    - Form SignIn 
    - Form SignUp
- Map
- Navbar
- NoSearchResults
- OneMarket
    - One Market
    - One Market Small
- ProtectedRoute
- Review
- Searchbar component


## IO


## Services

- Auth Service
  - service.signin
  - service.signup
  - service.logout
  - service.isLoggedIn
- Profile Service
  - service.fileUpload
- Market Service
  - service.marketPhotoUpload   
  - service.myMarkets

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Restaurant model

```
owner - ObjectID<User> // required
name - String // required
phone - String
address - String
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - restaurantId
- DELETE /user/me/favorite/:restaurantId
  - body: (empty)
- GET /restaurant
- POST /restaurant
  - body:
    - name
    - phone
    - address
- GET /restaurant/:id

  

## Links

### Trello/Kanban

[Link to trello board](https://trello.com/b/ht84XDC3/market-finder) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/begopla/find-a-market-client)
[Server repository Link](https://github.com/begopla/find-a-market-server)

[Deploy Link]
(https://localish.netlify.app/)
(https://localish.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)