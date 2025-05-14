<h1 align="center">
 HomeStay
</h1>

The Homestay Project is a web application that enables users to sign up and log in. Hosts can manage homestay listings, while guests can search and book properties by country and category. Guests can also leave reviews, and hosts can visually specify property locations on a map interface.

[View Demo](https://homestay-jewr.onrender.com/)





## Features

- Allow users to sign up and log in securely.
- Hosts can create, update, and delete homestay listings.
- Guests can search for properties based on country, category.
- Allow guests to leave reviews and ratings for homestays they have booked.
- Hosts can specify the geographic location of their properties visually on a map interface.



## Installation

Clone the repository:

```bash
 git clone https://github.com/aryanag7/homestay-project.git
```

Navigate to the project directory:
```bash
 cd homestay-project
```
Install dependencies:
```bash
npm install
```
Setting Up Environment Variables. Follow these steps to create and configure the .env file:
- Create a new file named .env in the root directory of the project.
- Copy and paste the following template into your .env file.
```bash
# Cloudinary Configuration
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret

# Mapbox Configuration
MAP_TOKEN=your_mapbox_token

# MongoDB Atlas Configuration
ATLASDB_URL=your_mongodb_atlas_url

# Session Secret
SECRET=your_session_secret
```
- Replace your_cloud_name, your_cloud_api_key, your_cloud_api_secret, your_mapbox_token, your_mongodb_atlas_url, and your_session_secret with your actual credentials obtained from the respective services.
- Save the .env file in the root directory of your project.
> **_NOTE:_** Ensure that you do not share your .env file or its contents publicly. Add .env to your .gitignore file to prevent it from being committed to version control.

  
## Screenshots

Homepage

<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/e8ec7c43-654f-453c-8376-36c71363d117"><br><br>
<br>

Listing Details

<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/ed7bda95-701c-4592-8119-4ad81f67b1ac">
<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/01b01b96-fd10-449b-9889-d4e04b8a1513"><br><br>
<br>

User Signup & Login

<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/f2f8b469-5050-403c-bc0a-8056c86e0f39">
<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/d501b323-11c1-4c9f-a7c2-d226fb4257d2"><br><br>
<br>

Filtering & Searching

<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/b81db34f-4006-4196-bc64-3b0ba20c3096">
<img width="800" alt="image" src="https://github.com/aryanag7/HomeStay/assets/62555290/26a0dfaa-a1fc-461d-977a-390c1435ce6d"><br><br>
<br>

## Tech Stack

- **Frontend:**
  - HTML/CSS
  - Bootstrap
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Atlas for database hosting)

- **Cloud Services:**
  - Cloudinary (for image storage and management)

- **Mapping:**
  - Mapbox (for visualizing property locations)


## Usage

- Register as a new user or log in with existing credentials.
- Explore available homestays by searching or browsing through listings.
- View detailed information about each homestay.
- Leave reviews and ratings for homestays you have booked.

## Contributing

Contributions to this project are welcome! To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/new-feature).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/new-feature).
- Submit a pull request.














